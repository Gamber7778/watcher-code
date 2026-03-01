"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Headphones, Play } from "lucide-react";
import { useState } from "react";

const VIDEO_ID = "ol4eY8LEaEE";
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
                        <img
                            src={THUMB}
                            alt="Превью видео"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute w-40 h-40 rounded-full bg-flame/10 blur-3xl group-hover:bg-flame/20 transition-all duration-500" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
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
                    title="Как отключить маятники в условиях кризиса"
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

const PAINS = [
    {
        title: "Паника от новостей",
        body: "Вы открываете ленту — и каждый заголовок сжимает грудь. Вы не можете не читать, и не можете читать спокойно.",
    },
    {
        title: "Полная потеря контроля",
        body: "Привычный мир рушится. Ощущение, что от вас ничего не зависит — и это бессилие парализует сильнее любой угрозы.",
    },
    {
        title: "Думскроллинг как ловушка",
        body: "Вы скроллите ленту в надежде найти там успокоение. Но с каждым прочитанным словом страх только сжимается крепче.",
    },
    {
        title: "Коллективное поле страха",
        body: "Вокруг — тревога, разговоры о худшем. Вы чувствуете, что вас затягивает в чужую панику, даже если вы держитесь.",
    },
];

const PARAGRAPHS = [
    "Один из самых частых вопросов: «Как отключить маятники в условиях войны, кризиса и тотального хаоса?». Вы видите, как привычный мир рушится, испытываете панику и абсолютное бессилие перед обстоятельствами.",
    "Запомните: вы не можете отключить глобальные деструктивные маятники. Их цель — питаться энергией вашего страха, боли и отчаяния. Чем больше вы анализируете негативные новости, тем больше энергии вы им отдаёте, превращаясь в покорную батарейку для Системы.",
    "Но вы можете стать для них невидимками. Если вы опустошите себя от страха, снизите важность и перейдёте в состояние отстранённого Смотрителя — маятник провалится в пустоту. Ему не за что будет вас зацепить. Я объясню механику того, как сохранить свой личный слой мира в безопасности, когда внешний мир сходит с ума.",
];

const BONUSES = [
    {
        icon: "pdf" as const,
        title: "Памятка Смотрителя: «Экстренный сброс»",
        subtitle: "3 шага, чтобы остановить панику и не отдать энергию маятнику хаоса",
        body: "Алгоритм скорой помощи. Как только накатывает ужас от новостей — применяете технику физического и ментального разотождествления. Механика: как перевести взгляд с «экрана» внешних событий на себя в зрительном зале.",
        tracks: null,
    },
    {
        icon: "pdf" as const,
        title: "Инструкция: «Информационный фильтр»",
        subtitle: "Как читать новости, оставаясь невидимкой для Системы",
        body: "Не уход в лес — а правила взаимодействия с матрицей. Как скользить по информации, не вовлекаясь эмоционально. Как отличать факты от крючков, за которые маятник цепляет вашу важность.",
        tracks: null,
    },
    {
        icon: "audio" as const,
        title: "Аудио-настройка: «Капсула безопасности»",
        subtitle: "Формирование защитного слоя вашего мира · 10–15 минут",
        body: "Транс-погружение, направленное на создание амальгамы «Мой мир заботится обо мне». Уводит из коллективного поля страха в личную энергоинформационную капсулу. Транслируйте спокойствие — и линия жизни сместится туда, где глобальные катаклизмы проходят по касательной.",
        tracks: [
            "Выход из коллективного поля тревоги",
            "Формирование личного защитного слоя",
            "Трансляция спокойствия как навык Смотрителя",
        ],
    },
    {
        icon: "audio" as const,
        title: "Практика: «Выход из зрительного зала»",
        subtitle: "Техника Провала Маятника · руководство в реальном времени",
        body: "Голос ведёт вас через процесс: вот вы видите пугающую новость → ловите свой страх → осознаёте крючок маятника → делаете вдох и пропускаете энергию мимо себя, оставляя пустоту. Маятник проваливается.",
        tracks: null,
    },
];

export default function Exit3Page() {
    return (
        <div className="min-h-screen bg-deep-space text-foreground overflow-x-hidden">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative flex items-center justify-center px-5 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(255,204,102,0.07)_0%,_transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

                <div className="relative z-10 text-center max-w-3xl mx-auto pt-14 pb-10 sm:py-24">
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-[9px] sm:text-xs tracking-[0.3em] text-flame/55 uppercase mb-4 font-manrope font-extralight"
                    >
                        Трансерфинг реальности
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 1, ease: EASE }}
                        className="text-[1.55rem] sm:text-4xl md:text-5xl font-cormorant font-light text-foreground tracking-wide leading-[1.3] mb-2"
                    >
                        Как отключить маятники
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
                        className="text-[1.55rem] sm:text-4xl md:text-5xl font-cormorant font-light text-flame tracking-wide leading-[1.3] mb-7"
                    >
                        в условиях кризиса и хаоса.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
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
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.6, ease: EASE }}
                                className="group relative px-4 py-4 sm:p-6 bg-white/[0.03] border border-white/[0.07] hover:border-flame/30 hover:bg-white/[0.05] transition-all duration-300"
                            >
                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/0 to-transparent group-hover:via-flame/35 transition-all duration-500" />
                                <h3 className="text-[0.95rem] sm:text-lg font-cormorant font-light text-foreground/90 mb-1.5 leading-snug">
                                    {pain.title}
                                </h3>
                                <p className="text-[0.78rem] sm:text-sm font-manrope font-extralight text-foreground/45 leading-[1.65]">
                                    {pain.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        {...fadeUp(0.35)}
                        className="text-center text-[1.05rem] sm:text-lg md:text-xl font-cormorant font-light text-flame/85 leading-[1.5]"
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

            {/* ── ТЕКСТ ПОД ВИДЕО ───────────────────────────────────── */}
            <section className="py-8 sm:py-10 px-5 bg-black">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        {...fadeUp(0)}
                        className="border border-flame/10 bg-white/[0.02] px-6 py-6 sm:px-8 sm:py-7 text-center"
                    >
                        <p className="text-[1.05rem] sm:text-xl md:text-2xl font-cormorant font-light text-foreground/80 leading-[1.55] mb-3">
                            Вы не можете отменить глобальные события.
                        </p>
                        <div className="w-8 h-px bg-flame/30 mx-auto mb-3" />
                        <p className="text-[0.88rem] sm:text-base font-manrope font-extralight text-foreground/50 leading-[1.8]">
                            Но вы можете выйти из-под их удара. Получите инструменты энергетической защиты
                            и научитесь проваливать маятники кризиса, сохраняя свой слой мира в безопасности.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── ОСНОВНОЙ ТЕКСТ ────────────────────────────────────── */}
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
                            «Невидимка для Системы»
                        </h2>
                        <div className="w-12 h-px bg-flame/35 mx-auto mt-4" />
                    </motion.div>

                    <motion.div
                        {...fadeUp(0.1)}
                        className="border border-flame/15 bg-black/30 px-6 py-6 sm:px-7 sm:py-7 mb-6 sm:mb-8"
                    >
                        <p className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/75 leading-[1.85] mb-3">
                            Я подготовил для вас точечный инструментарий энергетической защиты в условиях внешнего хаоса. Не теория выживания — прикладная механика Трансерфинга для тех, кто хочет оставаться Смотрителем, когда всё вокруг рушится.
                        </p>
                        <p className="text-[0.9rem] sm:text-base font-manrope font-extralight text-foreground/75 leading-[1.85]">
                            Я передаю вам эти материалы{" "}
                            <span className="text-flame font-normal">без оплаты</span>.{" "}
                            Всё загружено в специальный Telegram-бот.
                        </p>
                    </motion.div>

                    <motion.p
                        {...fadeUp(0.15)}
                        className="text-[10px] sm:text-xs tracking-[0.28em] text-foreground/45 uppercase font-manrope font-extralight mb-5 sm:mb-6 text-center"
                    >
                        Что вы получите сразу после перехода:
                    </motion.p>

                    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                        {BONUSES.map((bonus, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 + 0.1, duration: 0.6, ease: EASE }}
                                className="flex gap-4 p-5 sm:p-6 bg-black/40 border-l-[3px] border-flame/40 hover:border-flame transition-colors duration-300"
                            >
                                <div className="shrink-0 w-10 h-10 bg-flame/8 border border-flame/25 flex items-center justify-center">
                                    {bonus.icon === "pdf" ? (
                                        <FileText className="w-4 h-4 text-flame" />
                                    ) : (
                                        <Headphones className="w-4 h-4 text-flame" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base sm:text-lg font-cormorant font-light text-flame mb-0.5">
                                        {bonus.title}
                                    </h4>
                                    <p className="text-[11px] sm:text-xs font-manrope font-extralight text-foreground/40 tracking-wider mb-2">
                                        {bonus.subtitle}
                                    </p>
                                    <p className="text-[0.85rem] sm:text-sm font-manrope font-extralight text-foreground/65 leading-[1.75]">
                                        {bonus.body}
                                    </p>
                                    {bonus.tracks && (
                                        <ul className="space-y-2 mt-4">
                                            {bonus.tracks.map((track, tIdx) => (
                                                <li key={tIdx} className="flex items-start gap-2.5">
                                                    <span className="text-flame/50 text-[10px] mt-[5px] shrink-0">◆</span>
                                                    <span className="text-[0.82rem] sm:text-sm font-manrope font-extralight text-foreground/60 leading-[1.65]">
                                                        {track}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Координация намерения */}
                    <motion.div
                        {...fadeUp(0.2)}
                        className="mb-8 sm:mb-10 border border-flame/15 bg-black/40 px-6 py-6 sm:px-8 sm:py-7 relative overflow-hidden"
                    >
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/30 to-transparent" />
                        <p className="text-[0.88rem] sm:text-base font-manrope font-extralight text-foreground/55 leading-[1.9] mb-4">
                            Вы продолжаете скроллить ленту новостей в надежде найти там успокоение. Но с каждым прочитанным словом лишь туже затягиваете петлю на своей шее. Система питается вашим страхом. Пока вы боитесь — вы включены в её цепь.
                        </p>
                        <p className="text-[0.88rem] sm:text-base font-manrope font-extralight text-foreground/55 leading-[1.9] mb-4">
                            Глобальные события вам не подвластны. Но ваш личный слой мира — это ваша территория. Я не предлагаю закрыть глаза. Я предлагаю перестать быть кормом.
                        </p>
                        <p className="text-base sm:text-lg font-cormorant font-light text-flame/80 tracking-wide">
                            Либо вы — Смотритель. Либо — батарейка для чужой игры.
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
