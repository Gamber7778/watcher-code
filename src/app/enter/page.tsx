"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.75, ease: EASE },
});

const CARDS = [
    {
        id: "borba",
        num: "I",
        tag: "ИЛЛЮЗИЯ БОРЬБЫ",
        teaser: "Устал пробивать стены и выгорать",
        hint: "Демонтаж важности · Внешнее Намерение · Искусство скольжения",
        image: "/enter-1.png",
        imageAlt: "Иллюзия борьбы: человек бьётся в стену шипов рядом с открытой дверью",
        body: "Ваша сжатая пружина важности лишь блокирует результат. Вы тратите жизнь на битву с зеркалом реальности, вместо того чтобы просто протянуть руку и взять своё. Здесь лежат инструменты для демонтажа важности. Узнайте, как получать желаемое на волне удачи, а не через надрыв.",
        href: "/exit",
    },
    {
        id: "dolg",
        num: "II",
        tag: "ИЛЛЮЗИЯ ДОЛГА",
        teaser: "Отдаю энергию другим в ущерб себе",
        hint: "Щит пустоты · Провал маятника · Экологичные границы",
        image: "/enter-2.png",
        imageAlt: "Иллюзия долга: человек под грузом обязательств и щит пустоты",
        body: "Ваша энергия стала кормушкой для чужих маятников. А навязанное чувство вины — это крючок, за который вас держат. Здесь находится ваш «Щит пустоты». Получите точные слова и практики, чтобы экологично отсечь вампиров и вернуть себе право на свою жизнь.",
        href: "/exit1",
    },
    {
        id: "haos",
        num: "III",
        tag: "ИЛЛЮЗИЯ ХАОСА",
        teaser: "Страх за будущее и потеря контроля",
        hint: "Капсула безопасности · Невидимка для Системы · SOS-алгоритм",
        image: "/enter-3.png",
        imageAlt: "Иллюзия хаоса: истощение vs капсула безопасности Смотрителя",
        body: "Глобальные маятники затянули вас в коллективное поле паники. Вы не можете отменить внешние события, но можете стать для них невидимкой. Здесь находится SOS-алгоритм экстренного сброса. Научитесь сохранять свой слой мира в безопасности, когда всё вокруг сходит с ума.",
        href: "/exit3",
    },
];

function DoorCard({
    card,
    isOpen,
    onToggle,
}: {
    card: typeof CARDS[number];
    isOpen: boolean;
    onToggle: () => void;
}) {
    const router = useRouter();

    return (
        <motion.div
            layout="position"
            className={`relative overflow-hidden border transition-all duration-500 ${
                isOpen
                    ? "border-flame/70 bg-white/[0.06] shadow-[0_0_30px_rgba(255,204,102,0.08)]"
                    : "border-white/20 bg-white/[0.04] hover:border-flame/40 hover:bg-white/[0.06]"
            }`}
        >
            {/* Top flame accent */}
            <motion.div
                className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-flame to-transparent pointer-events-none"
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />

            {/* ── HEADER ── */}
            <button
                onClick={onToggle}
                className="w-full text-left flex items-stretch gap-0 group min-h-[80px] sm:min-h-[88px]"
                aria-expanded={isOpen}
            >
                {/* Thumbnail */}
                <div className="shrink-0 w-[64px] sm:w-[80px] relative overflow-hidden">
                    <Image
                        src={card.image}
                        alt=""
                        fill
                        className={`object-cover transition-all duration-500 ${isOpen ? "opacity-70 scale-105" : "opacity-40 group-hover:opacity-55"}`}
                        sizes="80px"
                        quality={60}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    {/* Number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-[1.4rem] sm:text-[1.7rem] font-cormorant font-light leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-colors duration-400 ${isOpen ? "text-flame" : "text-white/75"}`}>
                            {card.num}
                        </span>
                    </div>
                </div>

                {/* Text block */}
                <div className="flex-1 min-w-0 px-4 py-3.5 sm:px-5 sm:py-4 flex flex-col justify-center gap-1">
                    <p className={`text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-manrope font-light transition-colors duration-400 ${isOpen ? "text-flame" : "text-flame/75"}`}>
                        {card.tag}
                    </p>
                    <p className={`text-[0.95rem] sm:text-[1.05rem] font-cormorant font-light leading-snug transition-colors duration-400 ${isOpen ? "text-foreground" : "text-foreground/90"}`}>
                        {card.teaser}
                    </p>
                </div>

                {/* Right: arrow + badge */}
                <div className="shrink-0 flex flex-col items-center justify-center gap-2 px-3 sm:px-4">
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-400 ${
                            isOpen
                                ? "border-flame bg-flame/15 text-flame"
                                : "border-white/30 bg-white/[0.06] text-foreground/70 group-hover:border-flame/50 group-hover:text-flame/70"
                        }`}
                    >
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.div>
                    {!isOpen && (
                        <span className="text-[8px] font-manrope font-light text-foreground/60 tracking-[0.12em] uppercase inline-flex items-center px-2 py-0.5 border border-white/20 bg-white/[0.05] group-hover:border-flame/35 group-hover:text-foreground/80 transition-all duration-300">
                            открыть
                        </span>
                    )}
                </div>
            </button>

            {/* ── CONTENT (animated open) ── */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            height: { duration: 0.55, ease: EASE },
                            opacity: { duration: 0.35, ease: "easeOut" },
                        }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6">
                            {/* Separator */}
                            <div className="w-full h-px bg-gradient-to-r from-flame/50 via-flame/20 to-transparent mb-5" />

                            {/* Full image */}
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
                                className="relative w-full overflow-hidden mb-5"
                            >
                                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,204,102,0.12)] z-10 pointer-events-none" />
                                <Image
                                    src={card.image}
                                    alt={card.imageAlt}
                                    width={800}
                                    height={450}
                                    className="w-full h-auto block"
                                    quality={88}
                                />
                            </motion.div>

                            {/* Text */}
                            <motion.p
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
                                className="text-[0.88rem] sm:text-[0.95rem] font-manrope font-extralight text-foreground/80 leading-[1.9] mb-5"
                            >
                                {card.body}
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.33, duration: 0.45, ease: EASE }}
                            >
                                <button
                                    onClick={() => router.push(card.href)}
                                    className="group relative w-full inline-flex items-center justify-center gap-3 px-6 py-4 border border-flame bg-flame/12 text-foreground hover:bg-flame hover:text-black transition-all duration-300 text-[0.82rem] sm:text-sm font-cormorant font-light tracking-[0.2em] uppercase overflow-hidden shadow-[0_0_20px_rgba(255,204,102,0.2)] hover:shadow-[0_0_40px_rgba(255,204,102,0.5)]"
                                >
                                    <span className="relative z-10">Выбрать эту линию жизни</span>
                                    <ArrowRight className="w-3.5 h-3.5 relative z-10 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                                    <span className="absolute inset-0 bg-gradient-to-r from-flame/0 via-flame/15 to-flame/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function EnterPage() {
    const [openId, setOpenId] = useState<string | null>(null);
    const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

    return (
        <div className="bg-deep-space text-foreground overflow-x-hidden">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative flex items-center justify-center px-5 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,_rgba(255,204,102,0.08)_0%,_transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

                <div className="relative z-10 text-center max-w-2xl mx-auto pt-14 pb-10 sm:pt-22 sm:pb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                        className="text-[9px] sm:text-[10px] tracking-[0.4em] text-flame/45 uppercase mb-5 font-manrope font-extralight"
                    >
                        Трансерфинг реальности · Код Смотрителя
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 1, ease: EASE }}
                        className="text-[1.65rem] sm:text-4xl md:text-5xl font-cormorant font-light text-foreground tracking-wide leading-[1.25] mb-3"
                    >
                        Три двери.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
                        className="text-[1.65rem] sm:text-4xl md:text-5xl font-cormorant font-light text-flame tracking-wide leading-[1.25] mb-5"
                    >
                        Одна ведёт к вашей линии жизни.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.52, duration: 0.8 }}
                        className="text-[0.8rem] sm:text-sm font-manrope font-extralight text-foreground/55 leading-[1.9] max-w-xs mx-auto"
                    >
                        Нажмите на карточку — загляните внутрь и сделайте выбор.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 1, ease: "circOut" }}
                        className="w-14 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent mx-auto mt-6"
                    />
                </div>
            </section>

            {/* ── ACCORDION ────────────────────────────────────────── */}
            <section className="pt-5 pb-8 sm:pt-7 sm:pb-10 px-4 sm:px-6 bg-black relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-deep-space/50 to-black pointer-events-none" />

                <div className="max-w-2xl mx-auto relative z-10">

                    {/* Section heading */}
                    <motion.div
                        {...fadeUp(0)}
                        className="flex items-center gap-4 mb-5 sm:mb-7"
                    >
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-flame/25" />
                        <div className="text-center shrink-0">
                            <p className="text-[11px] sm:text-xs tracking-[0.3em] text-flame/80 uppercase font-manrope font-light">
                                Выберите свою точку входа
                            </p>
                            <p className="text-[9px] tracking-[0.18em] text-foreground/35 uppercase font-manrope font-extralight mt-1">
                                нажмите на карточку, чтобы раскрыть
                            </p>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-flame/25" />
                    </motion.div>

                    {/* Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
                        className="flex flex-col gap-2.5 sm:gap-3"
                    >
                        {CARDS.map((card) => (
                            <DoorCard
                                key={card.id}
                                card={card}
                                isOpen={openId === card.id}
                                onToggle={() => toggle(card.id)}
                            />
                        ))}
                    </motion.div>

                    {/* Bottom note */}
                    <motion.p
                        {...fadeUp(0.25)}
                        className="text-[10px] font-manrope font-extralight text-foreground/35 tracking-[0.18em] text-center mt-7 sm:mt-9 uppercase"
                    >
                        Все материалы передаются без оплаты
                    </motion.p>

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
