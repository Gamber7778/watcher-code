"use client";

import { useRef, useState } from "react";

// Same H.264 rendition as /exit, including its original poster.
const videoRoot = "https://res.cloudinary.com/dimfmfhbt/video/upload";
const videoPath = "v1786895640/-1509310536239356047_midol9";
const videoSrc = `${videoRoot}/vc_h264,q_auto/${videoPath}.mp4`;

export default function CourseVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  return (
    <section id="video" aria-labelledby="video-title" className="scroll-mt-24 border-t border-flame/20 bg-black px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-flame">Начните с видео · 1 мин 15 сек</p>
          <h2 id="video-title" className="font-cormorant text-4xl leading-tight sm:text-5xl">Когда привычный способ больше не помогает</h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">Посмотрите короткое видео, затем познакомьтесь с практикумом: как устроены уроки, что вы будете пробовать и какая поддержка вам подходит.</p>
        </div>
        <div className="overflow-hidden rounded-sm border border-flame/35 bg-deep-space shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
          <video ref={video} src={videoSrc} poster={`${videoRoot}/so_2,q_auto/${videoPath}.jpg`} controls playsInline preload="none" aria-label="Вводное видео о Трансерфинге" className="aspect-video w-full object-contain" onError={() => setFailed(true)} onLoadedData={() => setFailed(false)} />
        </div>
        {failed && <div role="status" className="mt-4 border border-flame/30 p-5 text-base leading-relaxed">
          <p>Видео не загрузилось. Вы можете повторить попытку или продолжить знакомство с программой ниже.</p>
          <button type="button" onClick={() => { setFailed(false); video.current?.load(); }} className="mt-3 min-h-11 underline underline-offset-4 text-flame">Загрузить видео ещё раз</button>
        </div>}
        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-foreground/75">Дальше — видеоуроки, тексты и задания, которые вы применяете к собственной ситуации.</p>
          <a href="#how" className="inline-flex min-h-12 shrink-0 items-center justify-center border border-flame/50 px-6 py-3 text-base text-flame hover:bg-flame/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame">Как проходит обучение</a>
        </div>
      </div>
    </section>
  );
}
