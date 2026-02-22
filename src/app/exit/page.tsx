"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Headphones, Play } from "lucide-react";
import { useState } from "react";

const VIDEO_ID = "N2x8zBTshrI";
const THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

function VideoPlayer() {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="relative aspect-video bg-black overflow-hidden group cursor-pointer shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            {/* Flame accent lines */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/25 to-transparent z-20 pointer-events-none" />
            <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-flame/25 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-flame/25 to-transparent z-20 pointer-events-none" />

            <AnimatePresence>
                {!playing && (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-10"
                        onClick={() => setPlaying(true)}
                    >
                        {/* Thumbnail */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={THUMB}
                            alt="Превью видео"
                            className="w-full h-full object-cover"
                        />

                        {/* Dark vignette overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                        {/* Flame glow behind button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute w-40 h-40 rounded-full bg-flame/10 blur-3xl group-hover:bg-flame/20 transition-all duration-500" />
                        </div>

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                {/* Outer ring */}
                                <div className="absolute inset-0 rounded-full border border-flame/30 scale-[1.35] group-hover:border-flame/60 group-hover:scale-[1.5] transition-all duration-500" />
                                {/* Main circle */}
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 border border-flame/60 group-hover:border-flame group-hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(255,204,102,0.25)] group-hover:shadow-[0_0_50px_rgba(255,204,102,0.5)]">
                                    <Play className="w-6 h-6 sm:w-7 sm:h-7 text-flame fill-flame ml-1" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom caption bar */}
                        <div className="absolute bottom-0 inset-x-0 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-t from-black/90 to-transparent flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-flame shrink-0" />
                            <p className="text-[11px] sm:text-xs font-manrope font-extralight text-foreground/60 tracking-[0.2em] uppercase">
                                Нажмите, чтобы воспроизвести
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual iframe — rendered when playing */}
            {playing && (
                <motion.iframe
                    key="iframe"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`}
                    title="Практическое руководство по Трансерфингу"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                />
            )}
        </div>
    );
}

const TG = "https://t.me/Zeland_Reality";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
});

const PAINS = [
    {
        icon: "◎",
        title: "Ощущение бессилия",
        body: "Вы делаете всё «правильно» — работаете, стараетесь, ищете. Но стена стоит. Мир будто не слышит.",
    },
    {
        icon: "◎",
        title: "Жизнь проходит мимо",
        body: "Пока вы снова «готовитесь» и «откладываете на потом» — что-то важное уходит. Ощущение, что поезд уже тронулся.",
    },
    {
        icon: "◎",
        title: "Плато без выхода",
        body: "Был прогресс, был рост — а потом всё замерло. Как невидимый потолок, который невозможно пробить усилием.",
    },
    {
        icon: "◎",
        title: "Выгорание от тяжёлого труда",
        body: "Вы выкладываетесь полностью. Но усталость копится быстрее, чем приходят результаты. Сил желать — уже нет.",
    },
];

const PARAGRAPHS = [
    "Пока вы находитесь в состоянии непрерывной борьбы, вы транслируете в зеркало мира лишь нужду, нехватку и колоссальное напряжение. Зеркало работает с безупречной точностью: в ответ Пространство Вариантов материализует для вас ту линию жизни, где за каждый шаг вперед приходится платить двойную цену. Это не злой рок. Это чистая механика энергоинформационного поля.",
    "Вы можете потратить ещё годы, пытаясь прогнуть мир своим Внутренним Намерением, используя исключительно силу воли. Но в этой битве вы лишь растратите свою свободную энергию, покорно отдав её маятникам. Итог всегда один — полное физическое и душевное истощение, состояние, когда нет сил даже желать. А можете выбрать другой путь — разжать пружину и позволить Внешнему Намерению выполнить эту работу за вас.",
    "Знать теорию Трансерфинга — недостаточно. Ваш разум настолько привык к суете, тревоге и достигаторству, что не отпустит мёртвую хватку контроля просто по вашему решению. Ему нужна новая, железобетонная точка опоры. Чтобы совершить осознанный Переход от тяжёлой битвы к состоянию спокойного позволения, необходимо перенастроить частоту вашей трансляции.",
];

const TRACKS = [
    "Настройка 1: Сброс напряжения и остановка маятника",
    "Настройка 2: Переход в позицию отстранённого Смотрителя",
    "Настройка 3: Активация Внешнего Намерения (переход в состояние «Я имею»)",
];

export default function ExitPage() {
    return (
        <div className="min-h-screen bg-deep-space text-foreground overflow-x-hidden">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative flex items-center justify-center px-5 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(255,204,102,0.08)_0%,_transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

                <div className="relative z-10 text-center max-w-3xl mx-auto py-20 sm:py-24">
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-[10px] sm:text-xs tracking-[0.35em] text-flame/60 uppercase mb-5 font-manrope font-extralight"
                    >
                        Трансерфинг реальности
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[1.75rem] sm:text-4xl md:text-5xl font-cormorant font-light text-foreground tracking-wide leading-[1.25] mb-3"
                    >
                        Практическое руководство для тех,<br className="hidden sm:block" /> кто устал бороться с жизнью
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[1.75rem] sm:text-4xl md:text-5xl font-cormorant font-light text-flame tracking-wide leading-[1.25] mb-10"
                    >
                        и готов получить своё по праву.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.9, ease: "circOut" }}
                        className="w-20 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent mx-auto"
                    />
                </div>
            </section>

            {/* ── БОЛИ ─────────────────────────────────────────────── */}
            <section className="py-10 sm:py-14 px-5 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-deep-space/60 to-black pointer-events-none" />

                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Intro */}
                    <motion.div {...fadeUp(0)} className="text-center mb-8 sm:mb-10">
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] text-foreground/35 uppercase font-manrope font-extralight mb-3">
                            Прочитайте — и узнайте себя
                        </p>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-cormorant font-light text-foreground/90 tracking-wide">
                            Если хотя бы один из этих пунктов — про вас...
                        </h2>
                    </motion.div>

                    {/* Pain cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                        {PAINS.map((pain, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: idx * 0.1,
                                    duration: 0.65,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group relative p-5 sm:p-6 bg-white/[0.03] border border-white/8 hover:border-flame/30 hover:bg-white/[0.05] transition-all duration-400"
                            >
                                {/* top accent line animates on hover */}
                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/0 to-transparent group-hover:via-flame/40 transition-all duration-500" />

                                <h3 className="text-base sm:text-lg font-cormorant font-light text-foreground/90 mb-2 leading-snug">
                                    {pain.title}
                                </h3>
                                <p className="text-[0.82rem] sm:text-sm font-manrope font-extralight text-foreground/50 leading-[1.7]">
                                    {pain.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Punch line */}
                    <motion.p
                        {...fadeUp(0.4)}
                        className="text-center text-base sm:text-lg md:text-xl font-cormorant font-light text-flame/90 leading-[1.6]"
                    >
                        ...значит, это именно для вас.
                    </motion.p>
                </div>
            </section>

            {/* ── ВИДЕО ────────────────────────────────────────────── */}
            <section className="py-10 sm:py-14 px-5 bg-black">
                <div className="max-w-2xl mx-auto">
                    <motion.div {...fadeUp(0)}>
                        <VideoPlayer />
                        <p className="text-center text-[11px] sm:text-xs text-foreground/35 font-manrope font-extralight tracking-[0.15em] mt-3 uppercase">
                            Посмотрите целиком — прежде чем двигаться дальше
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── ТЕКСТ ─────────────────────────────────────────────── */}
            <section className="py-12 sm:py-16 md:py-20 px-5 bg-deep-space relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />

                <div className="max-w-2xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-start gap-4 mb-8"
                    >
                        <span className="text-flame/25 font-cormorant text-[6rem] leading-[0.7] select-none shrink-0 mt-1">&ldquo;</span>
                        <div className="w-px self-stretch bg-flame/15 shrink-0" />
                    </motion.div>

                    <div className="space-y-6 sm:space-y-7">
                        {PARAGRAPHS.map((text, idx) => (
                            <motion.p
                                key={idx}
                                {...fadeUp(idx * 0.12)}
                                className="text-[0.95rem] sm:text-base md:text-lg font-manrope font-extralight text-foreground/75 leading-[1.85]"
                            >
                                {text}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
                        className="w-16 h-px bg-flame/30 mt-10 sm:mt-12"
                    />
                </div>
            </section>

            {/* ── ОФФЕР ─────────────────────────────────────────────── */}
            <section className="py-12 sm:py-16 md:py-20 px-5 bg-gradient-to-b from-black via-deep-space to-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,_rgba(255,204,102,0.06)_0%,_transparent_70%)] pointer-events-none" />

                <div className="max-w-2xl mx-auto relative z-10">

                    <motion.div {...fadeUp(0)} className="text-center mb-8 sm:mb-10">
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] text-flame/60 uppercase mb-3 font-manrope font-extralight">
                            Практический инструментарий
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-cormorant font-light text-foreground tracking-wide">
                            «Архитектура Позволения»
                        </h2>
                        <div className="w-12 h-px bg-flame/35 mx-auto mt-4" />
                    </motion.div>

                    <motion.div
                        {...fadeUp(0.1)}
                        className="border border-flame/15 bg-black/30 px-6 py-6 sm:px-7 sm:py-7 mb-6 sm:mb-8"
                    >
                        <p className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/75 leading-[1.85] mb-3">
                            Я подготовил для вас точечный алгоритм по выходу из сценария вечной борьбы. Это не мотивация. Это прикладная механика Трансерфинга для тех, кто готов перестать тратить энергию впустую.
                        </p>
                        <p className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/75 leading-[1.85]">
                            Я передаю вам эти материалы{" "}
                            <span className="text-flame font-normal">без оплаты</span>.{" "}
                            Всё необходимое для настройки вашей трансляции уже загружено в специальный Telegram-бот.
                        </p>
                    </motion.div>

                    <motion.p
                        {...fadeUp(0.15)}
                        className="text-[10px] sm:text-xs tracking-[0.28em] text-foreground/45 uppercase font-manrope font-extralight mb-5 sm:mb-6 text-center"
                    >
                        Что вы получите сразу после перехода:
                    </motion.p>

                    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">

                        {/* PDF */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex gap-4 p-5 sm:p-6 bg-black/40 border-l-[3px] border-flame/40 hover:border-flame transition-colors duration-300"
                        >
                            <div className="shrink-0 w-10 h-10 bg-flame/8 border border-flame/25 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-flame" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-base sm:text-lg font-cormorant font-light text-flame mb-1.5">
                                    PDF-Гайд «Демонтаж важности»
                                </h4>
                                <p className="text-[0.85rem] sm:text-sm font-manrope font-extralight text-foreground/65 leading-[1.75]">
                                    Краткая, пошаговая инструкция по обнаружению и экологичному снятию избыточных потенциалов в сфере финансов и самореализации. Вы найдёте ту самую невидимую «занозу», которая удерживает вас на плато.
                                </p>
                            </div>
                        </motion.div>

                        {/* Audio */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex gap-4 p-5 sm:p-6 bg-black/40 border-l-[3px] border-flame/40 hover:border-flame transition-colors duration-300"
                        >
                            <div className="shrink-0 w-10 h-10 bg-flame/8 border border-flame/25 flex items-center justify-center">
                                <Headphones className="w-4 h-4 text-flame" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-baseline gap-x-2 mb-1.5">
                                    <h4 className="text-base sm:text-lg font-cormorant font-light text-flame">
                                        Аудио-экскурс «Голос Намерения»
                                    </h4>
                                    <span className="text-[11px] font-manrope font-extralight text-foreground/40 tracking-wider">
                                        3 дорожки
                                    </span>
                                </div>
                                <p className="text-[0.85rem] sm:text-sm font-manrope font-extralight text-foreground/65 leading-[1.75] mb-4">
                                    Это не медитации. Аудио-настройки с личным сопровождением. В моменты тревоги, выгорания или страха за будущее — просто включите запись и остановите внутреннюю мыслемешалку.
                                </p>
                                <ul className="space-y-2">
                                    {TRACKS.map((track, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <span className="text-flame/50 text-[10px] mt-[5px] shrink-0">◆</span>
                                            <span className="text-[0.82rem] sm:text-sm font-manrope font-extralight text-foreground/60 leading-[1.65]">
                                                {track}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Final quote */}
                    <motion.div
                        {...fadeUp(0.2)}
                        className="text-center mb-8 sm:mb-10 px-2"
                    >
                        <p className="text-xl sm:text-2xl md:text-[1.7rem] font-cormorant font-light text-foreground/70 leading-[1.5] italic mb-2">
                            Мир не нужно завоевывать.
                        </p>
                        <p className="text-xl sm:text-2xl md:text-[1.7rem] font-cormorant font-light text-flame leading-[1.5]">
                            Ему нужно просто позволить дать вам то,<br className="hidden sm:block" /> что ваше по праву.
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        {...fadeUp(0.3)}
                        className="flex justify-center"
                    >
                        <button
                            onClick={() => window.open(TG, "_blank")}
                            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 border border-flame bg-flame/8 text-foreground hover:bg-flame hover:text-black transition-all duration-300 text-sm sm:text-base font-cormorant font-light tracking-[0.18em] uppercase overflow-hidden shadow-[0_0_30px_rgba(255,204,102,0.2)] hover:shadow-[0_0_50px_rgba(255,204,102,0.45)]"
                        >
                            <span className="relative z-10">Перейти в Telegram и забрать инструментарий</span>
                            <ArrowRight className="w-4 h-4 relative z-10 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="absolute inset-0 bg-gradient-to-r from-flame/0 via-flame/12 to-flame/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                        </button>
                    </motion.div>

                </div>
            </section>

            {/* ── FOOTER ────────────────────────────────────────────── */}
            <footer className="py-5 bg-black text-center border-t border-white/5">
                <p className="text-[11px] text-foreground/25 font-manrope font-extralight tracking-[0.2em] uppercase">
                    © {new Date().getFullYear()} КОД СМОТРИТЕЛЯ
                </p>
            </footer>

        </div>
    );
}
