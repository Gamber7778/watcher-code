"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Maximize2, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const VIDEO_ID = "N2x8zBTshrI";
const THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

function VideoPlayer() {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="relative aspect-video bg-black overflow-hidden group cursor-pointer shadow-[0_0_80px_rgba(0,0,0,0.9)]">
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={THUMB} alt="Превью видео" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute w-40 h-40 rounded-full bg-flame/10 blur-3xl group-hover:bg-flame/20 transition-all duration-500" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                                <div className="absolute inset-0 rounded-full border border-flame/30 scale-[1.35] group-hover:border-flame/60 group-hover:scale-[1.5] transition-all duration-500" />
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 border border-flame/60 group-hover:border-flame group-hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(255,204,102,0.25)] group-hover:shadow-[0_0_50px_rgba(255,204,102,0.5)]">
                                    <Play className="w-6 h-6 sm:w-7 sm:h-7 text-flame fill-flame ml-1" />
                                </div>
                            </motion.div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-t from-black/90 to-transparent flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-flame shrink-0" />
                            <p className="text-[11px] sm:text-xs font-manrope font-extralight text-foreground/60 tracking-[0.2em] uppercase">
                                Нажмите, чтобы воспроизвести
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.75, ease: EASE },
});

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKey);
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close button — large touch target */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center bg-white/[0.08] border border-white/[0.15] text-foreground/70 hover:text-foreground hover:bg-white/[0.14] active:scale-95 transition-all duration-200"
                aria-label="Закрыть"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Tap anywhere hint — mobile only */}
            <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] font-manrope font-extralight text-foreground/25 tracking-[0.2em] uppercase sm:hidden">
                Нажмите в любое место, чтобы закрыть
            </p>

            <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full flex items-center justify-center p-4 sm:p-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-full w-auto h-auto object-contain shadow-[0_0_100px_rgba(0,0,0,0.9)]"
                    style={{ maxHeight: "calc(100vh - 80px)" }}
                />
            </motion.div>
        </motion.div>
    );
}

function GuideImage({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <motion.div
                {...fadeUp(0)}
                className="my-8 sm:my-10 w-full relative cursor-pointer group overflow-hidden"
                onClick={() => setOpen(true)}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.012]"
                    quality={90}
                />
                {/* Badge — always visible on mobile, hover on desktop */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/65 border border-white/[0.12] px-2.5 py-1.5
                    sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-300">
                    <Maximize2 className="w-3 h-3 text-flame/70" />
                    <span className="text-[9px] sm:text-[10px] font-manrope font-extralight text-foreground/55 tracking-[0.18em] uppercase">
                        Увеличить
                    </span>
                </div>
            </motion.div>

            <AnimatePresence>
                {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
            </AnimatePresence>
        </>
    );
}

function ChapterDivider() {
    return (
        <div className="flex items-center gap-4 my-10 sm:my-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-flame/20" />
            <span className="text-flame/30 text-xs tracking-[0.3em]">◆</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-flame/20" />
        </div>
    );
}

function PullQuote({ text }: { text: string }) {
    return (
        <motion.div {...fadeUp(0)} className="my-8 sm:my-10 pl-5 border-l-[2px] border-flame/35">
            <p className="text-[1.1rem] sm:text-xl md:text-2xl font-cormorant font-light text-foreground/70 leading-[1.6] italic">
                {text}
            </p>
        </motion.div>
    );
}

const PAINS = [
    { title: "Ощущение бессилия", body: "Вы делаете всё «правильно» — работаете, стараетесь, ищете. Но стена стоит. Мир будто не слышит." },
    { title: "Жизнь проходит мимо", body: "Пока вы снова «готовитесь» и «откладываете на потом» — что-то важное уходит. Ощущение, что поезд уже тронулся." },
    { title: "Плато без выхода", body: "Был прогресс, был рост — а потом всё замерло. Как невидимый потолок, который невозможно пробить усилием." },
    { title: "Выгорание от тяжёлого труда", body: "Вы выкладываетесь полностью. Но усталость копится быстрее, чем приходят результаты. Сил желать — уже нет." },
];

export default function ExitPage() {
    return (
        <div className="min-h-screen bg-deep-space text-foreground overflow-x-hidden">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative flex items-center justify-center px-5 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(255,204,102,0.08)_0%,_transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
                <div className="relative z-10 text-center max-w-3xl mx-auto pt-14 pb-10 sm:py-24">
                    <motion.p
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                        className="text-[9px] sm:text-xs tracking-[0.3em] text-flame/55 uppercase mb-4 font-manrope font-extralight"
                    >
                        Трансерфинг реальности
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 1, ease: EASE }}
                        className="text-[1.55rem] sm:text-4xl md:text-5xl font-cormorant font-light text-foreground tracking-wide leading-[1.3] mb-2"
                    >
                        Практическое руководство для тех, кто устал бороться с жизнью
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
                        className="text-[1.55rem] sm:text-4xl md:text-5xl font-cormorant font-light text-flame tracking-wide leading-[1.3] mb-7"
                    >
                        и готов получить своё по праву.
                    </motion.p>
                    <motion.div
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.9, ease: "circOut" }}
                        className="w-14 h-px bg-gradient-to-r from-transparent via-flame/45 to-transparent mx-auto"
                    />
                </div>
            </section>

            {/* ── БОЛИ ─────────────────────────────────────────────── */}
            <section className="pt-6 pb-10 sm:py-14 px-5 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-deep-space/60 to-black pointer-events-none" />
                <div className="max-w-2xl mx-auto relative z-10">
                    <motion.div {...fadeUp(0)} className="text-center mb-5 sm:mb-8">
                        <p className="text-[9px] sm:text-xs tracking-[0.28em] text-foreground/30 uppercase font-manrope font-extralight mb-2.5">
                            Прочитайте — и узнайте себя
                        </p>
                        <h2 className="text-[1.2rem] sm:text-2xl md:text-3xl font-cormorant font-light text-foreground/85 tracking-wide leading-[1.3]">
                            Если хотя бы один из этих пунктов — про вас...
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 mb-6 sm:mb-10">
                        {PAINS.map((pain, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.6, ease: EASE }}
                                className="group relative px-4 py-4 sm:p-6 bg-white/[0.03] border border-white/[0.07] hover:border-flame/30 hover:bg-white/[0.05] transition-all duration-300"
                            >
                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/0 to-transparent group-hover:via-flame/35 transition-all duration-500" />
                                <h3 className="text-[0.95rem] sm:text-lg font-cormorant font-light text-foreground/90 mb-1.5 leading-snug">{pain.title}</h3>
                                <p className="text-[0.78rem] sm:text-sm font-manrope font-extralight text-foreground/45 leading-[1.65]">{pain.body}</p>
                            </motion.div>
                        ))}
                    </div>
                    <motion.p {...fadeUp(0.35)} className="text-center text-[1.05rem] sm:text-lg md:text-xl font-cormorant font-light text-flame/85 leading-[1.5]">
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

            {/* ── ГАЙД: ОБЛОЖКА ────────────────────────────────────── */}
            <section className="pt-10 pb-6 px-5 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,_rgba(255,204,102,0.05)_0%,_transparent_70%)] pointer-events-none" />
                <div className="max-w-2xl mx-auto relative z-10">
                    <motion.div
                        {...fadeUp(0)}
                        className="border border-flame/20 bg-white/[0.02] px-6 py-8 sm:px-10 sm:py-10 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/15 to-transparent" />

                        <div className="inline-flex items-center gap-2.5 mb-5">
                            <FileText className="w-3.5 h-3.5 text-flame/60" />
                            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-flame/60 uppercase font-manrope font-extralight">
                                PDF-Гайд · Часть I
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-cormorant font-light text-foreground tracking-wide leading-[1.25] mb-3">
                            «Сброс важности: Искусство скольжения»
                        </h2>

                        <p className="text-[0.88rem] sm:text-base font-cormorant font-light text-foreground/50 italic leading-[1.6] max-w-lg mx-auto">
                            Как перестать воевать с отражением, растворить избыточные потенциалы и позволить дверям открыться самим.
                        </p>

                        <div className="w-10 h-px bg-flame/30 mx-auto mt-6" />
                    </motion.div>
                </div>
            </section>

            {/* ── ГАЙД: ТЕЛО ───────────────────────────────────────── */}
            <section className="py-10 sm:py-14 px-5 bg-deep-space relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

                <div className="max-w-[680px] mx-auto relative z-10">

                    {/* Вводная цитата */}
                    <motion.div {...fadeUp(0)} className="mb-8 sm:mb-10 text-center">
                        <p className="text-[0.9rem] sm:text-base md:text-lg font-cormorant font-light text-foreground/60 italic leading-[1.8]">
                            Вы держите в руках не просто инструкцию. Это ключи от вашей свободы.
                            Здесь нет мотивационных призывов или жёстких правил. То, что вы прочтёте ниже —
                            это способ проснуться в сновидении наяву и вспомнить, кто вы есть на самом деле.
                        </p>
                    </motion.div>

                    <ChapterDivider />

                    {/* ── ВВЕДЕНИЕ ── */}
                    <motion.div {...fadeUp(0)} className="mb-2">
                        <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-flame/45 uppercase font-manrope font-extralight mb-3">
                            Введение
                        </p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-cormorant font-light text-foreground/90 leading-[1.3] mb-6">
                            Иллюзия борьбы
                        </h3>
                    </motion.div>

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-5">
                        Вы привыкли гордиться своей усталостью. С самого детства вам внушали правило: чтобы чего-то достичь, нужно тяжело трудиться, преодолевать препятствия и выгрызать своё место под солнцем. Вам кажется, что чем больше усилий вы прикладываете, тем ближе цель.
                    </motion.p>

                    <PullQuote text="Но остановитесь на мгновение и посмотрите на результат. Принесла ли вам эта битва счастье?" />

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-5">
                        Мир — это дуальное зеркало. Оно лишь безупречно отражает ваше отношение к нему. Когда вы стоите перед зеркалом с напряжённым лицом и сжатыми кулаками, пытаясь силой прогнуть реальность, зеркало отражает именно это — борьбу. Вы транслируете в мир: «Мне тяжело, я должен бороться», и Пространство Вариантов покорно реализует для вас линию жизни, полную препятствий.
                    </motion.p>

                    <GuideImage src="/guide-img-1.png" width={1280} height={720} alt="Мир как зеркало: трансляция борьбы и закон равновесных сил" />

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-5">
                        В Трансерфинге действует неумолимый закон: там, где появляется избыточное напряжение (важность), возникают равновесные силы Вселенной. Их единственная задача — устранить перекос. Чем сильнее вы чего-то вожделеете, чем больше боитесь потерять деньги или статус, тем активнее равновесные силы будут отбрасывать вас назад. Вы сами создаёте ветер, который задувает ваше пламя.
                    </motion.p>

                    <PullQuote text="Перестаньте биться лбом в стекло, когда рядом открыта дверь." />

                    <ChapterDivider />

                    {/* ── ГЛАВА 1 ── */}
                    <motion.div {...fadeUp(0)} className="mb-2">
                        <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-flame/45 uppercase font-manrope font-extralight mb-3">
                            Глава 1
                        </p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-cormorant font-light text-foreground/90 leading-[1.3] mb-6">
                            Диагностика: Где вы вцепились в реальность мёртвой хваткой?
                        </h3>
                    </motion.div>

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-6">
                        Избыточный потенциал — это невидимая энергетическая петля. Пока она затянута, вы не можете двигаться вперёд. Ваша энергия уходит не на достижение цели, а на кормление деструктивных маятников — структур, которые питаются вашим страхом, гневом и сомнениями.
                    </motion.p>

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/55 leading-[1.9] mb-6 italic">
                        Чтобы растворить узел, его нужно сначала увидеть. Где именно вы нарушили равновесие?
                    </motion.p>

                    {/* Две карточки типов важности */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {[
                            {
                                num: "I",
                                title: "Внутренняя важность",
                                sub: "Гордыня или уничижение",
                                body: "«Я должен быть безупречным», «Я докажу им всем, чего я стою», «У меня нет права на ошибку». Равновесные силы щелкнут по носу, создав ситуацию, где вы неизбежно ошибётесь.",
                            },
                            {
                                num: "II",
                                title: "Внешняя важность",
                                sub: "Идеализация цели",
                                body: "«Эта сделка — вопрос моей жизни и смерти», «Без этого проекта я никто». Вы ставите цель на пьедестал. А то, что стоит на пьедестале, всегда недосягаемо.",
                            },
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                                className="p-5 sm:p-6 bg-white/[0.025] border border-white/[0.07] border-t-[2px] border-t-flame/35"
                            >
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-[1.6rem] font-cormorant text-flame/30 leading-none">{card.num}</span>
                                    <div>
                                        <p className="text-[0.9rem] sm:text-base font-cormorant font-light text-foreground/90 leading-snug">{card.title}</p>
                                        <p className="text-[10px] font-manrope font-extralight text-foreground/35 tracking-wider mt-0.5">{card.sub}</p>
                                    </div>
                                </div>
                                <p className="text-[0.8rem] sm:text-sm font-manrope font-extralight text-foreground/55 leading-[1.75]">{card.body}</p>
                            </motion.div>
                        ))}
                    </div>

                    <GuideImage src="/guide-img-2.png" width={1280} height={720} alt="Схема: два вида избыточного потенциала" />

                    {/* Практика: Тест Смотрителя */}
                    <motion.div
                        {...fadeUp(0)}
                        className="border border-flame/15 bg-black/30 px-6 py-6 sm:px-7 sm:py-7 mb-8 relative"
                    >
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/30 to-transparent" />
                        <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-flame/50 uppercase font-manrope font-extralight mb-4">
                            Практика · Тест Смотрителя
                        </p>
                        <p className="text-[0.88rem] sm:text-sm font-manrope font-extralight text-foreground/60 leading-[1.85] mb-5">
                            Взгляните на свою жизнь отстранённо, как зритель в кинотеатре. Ответьте на 3 вопроса предельно честно:
                        </p>
                        <div className="space-y-4">
                            {[
                                "О чём я думаю перед сном, когда не могу уснуть? — Там находится ваш самый сильный страх потери.",
                                "Что вызывает во мне самое сильное раздражение в моей работе или бизнесе? — Там маятники качают из вас энергию.",
                                "Если завтра мой главный план рухнет, почувствую ли я, что моя жизнь закончена? — Если да — ваша хватка смертельна, и равновесные силы уже готовятся.",
                            ].map((q, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <span className="text-flame/50 font-cormorant text-lg leading-none mt-0.5 shrink-0">{idx + 1}.</span>
                                    <p className="text-[0.85rem] sm:text-sm font-manrope font-extralight text-foreground/65 leading-[1.8]">{q}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <ChapterDivider />

                    {/* ── ГЛАВА 2 ── */}
                    <motion.div {...fadeUp(0)} className="mb-2">
                        <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-flame/45 uppercase font-manrope font-extralight mb-3">
                            Глава 2
                        </p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-cormorant font-light text-foreground/90 leading-[1.3] mb-6">
                            Таинство Сброса: Смирение с поражением
                        </h3>
                    </motion.div>

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-5">
                        Чтобы получить желаемое, нужно сначала искренне от него отказаться. Это не значит сложить лапки и ничего не делать. Это значит отказаться от вожделения цели, оставив лишь спокойное намерение её иметь.
                    </motion.p>

                    <PullQuote text="Намерение — это решимость иметь и действовать, очищенная от сомнений и страха потерпеть неудачу. Как стакан воды: вы не боитесь, что не сможете его выпить, вы просто берёте и пьёте." />

                    <GuideImage src="/guide-img-3.png" width={1280} height={720} alt="Глава 2: Таинство сброса — смирение с поражением" />

                    {/* Алгоритм сброса */}
                    <motion.div
                        {...fadeUp(0)}
                        className="border border-flame/15 bg-black/30 px-6 py-6 sm:px-7 sm:py-7 mb-8 relative"
                    >
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/30 to-transparent" />
                        <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-flame/50 uppercase font-manrope font-extralight mb-5">
                            Алгоритм сброса важности
                        </p>
                        <div className="space-y-5">
                            {[
                                {
                                    step: "01",
                                    title: "Проживите крах",
                                    body: "В своём воображении представьте самый худший сценарий. Ваш бизнес закрылся. Проект провалился. Вы потеряли всё, за что так держались.",
                                },
                                {
                                    step: "02",
                                    title: "Найдите страховку",
                                    body: "Что вы будете делать в этом худшем сценарии? Пойдёте работать по найму? Начнёте всё с нуля? Найдите там, на дне, точку опоры. Заранее постелите себе соломку.",
                                },
                                {
                                    step: "03",
                                    title: "Смиритесь",
                                    body: "Скажите себе искренне: «Да, может случиться и так. Ну и ладно. Это не конец. Я просто пойду другим путём».",
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 sm:gap-5">
                                    <span className="text-[1.5rem] sm:text-[1.8rem] font-cormorant text-flame/20 leading-none shrink-0 mt-0.5">{item.step}</span>
                                    <div>
                                        <p className="text-[0.9rem] sm:text-base font-cormorant font-light text-foreground/85 mb-1.5">{item.title}</p>
                                        <p className="text-[0.82rem] sm:text-sm font-manrope font-extralight text-foreground/55 leading-[1.8]">{item.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-8">
                        В этот самый момент происходит магия. Как только вы внутренне позволяете себе проиграть, хватка равновесных сил мгновенно ослабевает. Пружина разжимается. Зеркало мира теряет точку опоры для создания проблем, и препятствия растворяются сами собой. Вы чувствуете колоссальное облегчение. Вы свободны.
                    </motion.p>

                    <ChapterDivider />

                    {/* ── ГЛАВА 3 ── */}
                    <motion.div {...fadeUp(0)} className="mb-2">
                        <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-flame/45 uppercase font-manrope font-extralight mb-3">
                            Глава 3
                        </p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-cormorant font-light text-foreground/90 leading-[1.3] mb-6">
                            Практика «Сдача в аренду»: Деяние без деяния
                        </h3>
                    </motion.div>

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-5">
                        Многие спрашивают: «Если я сброшу важность, я же лягу на диван и перестану действовать?». Ответ кроется в великой практике Трансерфинга — «Сдаче себя в аренду».
                    </motion.p>

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-6">
                        Вы не бросаете работу и не уходите в горы. Вы продолжаете делать всё то же самое, но меняете внутреннее состояние. Вы становитесь Смотрителем. Вы сдаёте себя в аренду как наёмного исполнителя. Ваши руки делают работу безупречно, ваш мозг решает задачи — но ваша Душа спокойна и отстранена.
                    </motion.p>

                    {/* место для визуала — Смотритель в зрительном зале */}

                    <div className="space-y-3 mb-8">
                        {[
                            { trigger: "Вас критикуют?", response: "Вы спокойно наблюдаете: «Интересно, этот маятник пытается меня зацепить». И не отдаёте энергию." },
                            { trigger: "Случился кризис?", response: "Вы не впадаете в панику, а смотрите на него как на изменение декораций в спектакле: «Посмотрим, какую пользу я могу из этого извлечь»." },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                                className="flex gap-0 border-l-[2px] border-flame/25 pl-5 py-1"
                            >
                                <div>
                                    <p className="text-[0.88rem] sm:text-sm font-cormorant font-light text-flame/70 mb-1">{item.trigger}</p>
                                    <p className="text-[0.82rem] sm:text-sm font-manrope font-extralight text-foreground/60 leading-[1.8]">{item.response}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <PullQuote text="Нет страха. Нет нетерпения. Только спокойное, размеренное движение переставления ног в направлении выбранной цели." />

                    <ChapterDivider />

                    {/* ── ЭПИЛОГ ── */}
                    <motion.div {...fadeUp(0)} className="mb-2">
                        <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-flame/45 uppercase font-manrope font-extralight mb-3">
                            Эпилог
                        </p>
                    </motion.div>

                    <motion.p {...fadeUp(0)} className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.9] mb-6">
                        Теперь вы знаете главный секрет. Сбросив важность, вы остановили сопротивление реальности. Вы перестали тратить жизненные силы на борьбу с ветряными мельницами. Вы, наконец, вышли на стартовую прямую.
                    </motion.p>

                    <motion.div
                        {...fadeUp(0.1)}
                        className="text-center py-8 sm:py-10"
                    >
                        <p className="text-xl sm:text-2xl md:text-[1.8rem] font-cormorant font-light text-foreground/65 leading-[1.5] italic mb-2">
                            Мир не нужно завоевывать.
                        </p>
                        <p className="text-xl sm:text-2xl md:text-[1.8rem] font-cormorant font-light text-flame leading-[1.5]">
                            Ему нужно просто позволить дать вам то,<br className="hidden sm:block" /> что ваше по праву.
                        </p>
                    </motion.div>

                    {/* место для финальной иллюстрации */}

                    {/* ── CTA ── */}
                    <motion.div {...fadeUp(0.15)} className="mt-4 flex justify-center">
                        <button
                            onClick={() => window.open(TG, "_blank")}
                            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 border border-flame bg-flame/8 text-foreground hover:bg-flame hover:text-black transition-all duration-300 text-sm sm:text-base font-cormorant font-light tracking-[0.18em] uppercase overflow-hidden shadow-[0_0_30px_rgba(255,204,102,0.2)] hover:shadow-[0_0_50px_rgba(255,204,102,0.45)]"
                        >
                            <span className="relative z-10">Продолжить в Telegram</span>
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
