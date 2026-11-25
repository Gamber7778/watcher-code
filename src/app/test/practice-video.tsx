"use client";

import Script from "next/script";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import s from "./practice.module.css";

type TimeEvent = { seconds: number; duration: number };
type Player = {
  ready(): Promise<void>;
  play(): Promise<void>;
  pause(): Promise<void>;
  getDuration(): Promise<number>;
  setCurrentTime(time: number): Promise<number>;
  setMuted(muted: boolean): Promise<boolean>;
  on(event: string, handler: (data: TimeEvent) => void): void;
  off(event: string, handler: (data: TimeEvent) => void): void;
};
type VimeoWindow = Window & { Vimeo?: { Player: new (element: HTMLIFrameElement) => Player } };
const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export default function PracticeVideo() {
  const frame = useRef<HTMLIFrameElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const [sdk, setSdk] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState("");
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [posterLoaded, setPosterLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/practice-video", { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (!data) return;
        if (data.thumbnailUrl) setPosterUrl(data.thumbnailUrl);
        if (data.duration > 0) setDuration(data.duration);
      }).catch(() => { /* The local cover is already visible. */ });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const Vimeo = (window as VimeoWindow).Vimeo;
    if (!sdk || !Vimeo || !frame.current) return;
    let active = true;
    const instance = new Vimeo.Player(frame.current);
    player.current = instance;
    const onPlay = () => { if (active) { setPlaying(true); setStarted(true); setError(""); } };
    const onPause = () => { if (active) setPlaying(false); };
    const onTime = (data: TimeEvent) => { if (active) { setSeconds(data.seconds); setDuration(data.duration); } };
    const onLoaded = () => {
      instance.getDuration().then(length => { if (active && length > 0) setDuration(length); }).catch(() => {});
    };
    const onError = () => { if (active) setError("Видео пока недоступно для просмотра. Вы можете начать с практики ниже."); };
    instance.on("play", onPlay);
    instance.on("pause", onPause);
    instance.on("ended", onPause);
    instance.on("timeupdate", onTime);
    instance.on("loaded", onLoaded);
    instance.on("error", onError);
    instance.ready().then(async () => {
      const length = await instance.getDuration();
      if (active) { if (length > 0) setDuration(length); setReady(true); }
    }).catch(onError);
    const onFullscreen = () => setFullscreen(document.fullscreenElement === container.current);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      active = false;
      instance.off("play", onPlay); instance.off("pause", onPause);
      instance.off("ended", onPause); instance.off("timeupdate", onTime); instance.off("error", onError);
      instance.off("loaded", onLoaded);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, [sdk]);

  const toggle = async () => {
    if (!ready || !player.current) return;
    try { if (playing) await player.current.pause(); else await player.current.play(); }
    catch { setError("Видео пока недоступно для просмотра. Вы можете начать с практики ниже."); }
  };
  const toggleMute = async () => {
    try { await player.current?.setMuted(!muted); setMuted(!muted); }
    catch { setError("Не удалось изменить звук. Проверьте громкость устройства."); }
  };
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (container.current?.requestFullscreen) await container.current.requestFullscreen();
      else setFullscreen(!fullscreen);
    } catch { setFullscreen(!fullscreen); }
  };

  return <>
    <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" onReady={() => setSdk(true)} onError={() => setError("Не удалось загрузить видео. Проверьте соединение и обновите страницу.")} />
    <div ref={container} className={`${s.player} ${fullscreen ? s.playerExpanded : ""}`}>
      <div className={s.videoScreen}>
        {!started && <div className={s.videoPoster}>
          <Image src="/main_photo_1.png" alt="Обложка практики «Работа без постоянного контроля»" fill priority sizes="(max-width: 800px) calc(100vw - 40px), 680px" className={s.videoPosterImage} />
          {/* Vimeo returns its own CDN URL; keep the local cover until it loads. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {posterUrl && <img src={posterUrl} alt="" className={`${s.videoPosterImage} ${posterLoaded ? s.posterReady : s.posterPending}`} onLoad={() => setPosterLoaded(true)} onError={() => { setPosterUrl(null); setPosterLoaded(false); }} />}
        </div>}
        <iframe ref={frame} style={{ visibility: started ? "visible" : "hidden" }} src="https://player.vimeo.com/video/1249935380?controls=0&keyboard=0&title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&pip=0&dnt=1&playsinline=1&autopause=0&player_id=0&app_id=58479&autoplay=0&loop=0" title="Презентация от Вадима" referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; encrypted-media" tabIndex={-1} aria-hidden="true" />
        <button type="button" className={`${s.videoOverlay} ${playing ? s.videoPlaying : ""} ${started ? s.videoStarted : ""}`} onClick={toggle} disabled={!ready || Boolean(error && !ready)} aria-label={playing ? "Приостановить видео" : "Смотреть видео"}>
          {!playing && <><span className={s.playCircle}><Play size={26} fill="currentColor" /></span><span className={s.videoCoverTitle}>{started ? "Продолжить просмотр" : "Работа без постоянного контроля"}</span><span className={s.videoCoverCaption}>{error ? "Видео пока недоступно" : ready ? duration > 0 ? `${time(duration)} · смотреть видео` : "Смотреть видео о практике" : "Подключаем видео…"}</span></>}
        </button>
      </div>
      {started && <div className={s.videoControls}>
        <button type="button" onClick={toggle} disabled={!ready} aria-label={playing ? "Пауза" : "Воспроизвести"}>{playing ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}</button>
        <span className={s.videoTime}>{time(seconds)}</span>
        <input type="range" min={0} max={duration || 1} step={0.1} value={seconds} disabled={!ready} aria-label="Позиция видео" aria-valuetext={`${time(seconds)} из ${time(duration)}`} onChange={e => { const value = Number(e.target.value); setSeconds(value); player.current?.setCurrentTime(value).catch(() => setError("Не удалось перемотать видео. Попробуйте ещё раз.")); }} />
        <span className={s.videoTime}>{time(duration)}</span>
        <button type="button" onClick={toggleMute} disabled={!ready} aria-label={muted ? "Включить звук" : "Выключить звук"}>{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
        <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? "Выйти из полноэкранного режима" : "На весь экран"}>{fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}</button>
      </div>}
      {error && <p className={s.videoError} role="status">{error}</p>}
    </div>
  </>;
}
