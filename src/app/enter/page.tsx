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
        image: "/guide-img-1.png",
        imageAlt: "Мир как зеркало: трансляция борьбы",
        body: "Ваша сжатая пружина важности лишь блокирует результат. Вы тратите жизнь на битву с зеркалом реальности, вместо того чтобы просто протянуть руку и взять своё. Здесь лежат инструменты для демонтажа важности. Узнайте, как получать желаемое на волне удачи, а не через надрыв.",
        href: "/exit",
    },
    {
        id: "dolg",
        num: "II",
        tag: "ИЛЛЮЗИЯ ДОЛГА",
        teaser: "Отдаю энергию другим в ущерб себе",
        image: "/guide-img-2.png",
        imageAlt: "Сдача в аренду: щит пустоты",
        body: "Ваша энергия стала кормушкой для чужих маятников. А навязанное чувство вины — это крючок, за который вас держат. Здесь находится ваш «Щит пустоты». Получите точные слова и практики, чтобы экологично отсечь вампиров и вернуть себе право на свою жизнь.",
        href: "/exit1",
    },
    {
        id: "haos",
        num: "III",
        tag: "ИЛЛЮЗИЯ ХАОСА",
        teaser: "Страх за будущее и потеря контроля",
        image: "/guide-img-3.png",
        imageAlt: "Капсула безопасности",
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
            layout
            className={`relative overflow-hidden border transition-colors duration-500 ${
                isOpen
                    ? "border-flame/40 bg-white/[0.04]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.03]"
            }`}
        >
            {/* Top flame line — visible when open */}
            <motion.div
                className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-flame/60 to-transparent"
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />

            {/* ── HEADER (always visible) ── */}
            <button
                onClick={onToggle}
                className="w-full text-left px-5 py-5 sm:px-7 sm:py-6 flex items-center gap-4 sm:gap-5 group"
                aria-expanded={isOpen}
            >
                {/* Number */}
                <span
                    className={`shrink-0 text-[1.6rem] sm:text-[2rem] font-cormorant font-light leading-none transition-colors duration-400 ${
                        isOpen ? "text-flame/60" : "text-white/[0.12]"
                    }`}
                >
                    {card.num}
                </span>

                {/* Vertical divider */}
                <div className={`shrink-0 w-px self-stretch transition-colors duration-400 ${isOpen ? "bg-flame/25" : "bg-white/[0.07]"}`} />

                {/* Text block */}
                <div className="flex-1 min-w-0">
                    <p className={`text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-manrope font-extralight mb-1 transition-colors duration-400 ${isOpen ? "text-flame/60" : "text-foreground/30"}`}>
                        {card.tag}
                    </p>
                    <p className={`text-[0.95rem] sm:text-lg font-cormorant font-light leading-snug transition-colors duration-400 ${isOpen ? "text-foreground/90" : "text-foreground/55"}`}>
                        {card.teaser}
                    </p>
                </div>

                {/* Arrow indicator */}
                <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={`shrink-0 transition-colors duration-400 ${isOpen ? "text-flame/70" : "text-foreground/20"}`}
                >
                    <ArrowRight className="w-4 h-4" />
                </motion.span>
            </button>

            {/* ── CONTENT (animated) ── */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ height: { duration: 0.55, ease: EASE }, opacity: { duration: 0.4, ease: "easeOut" } }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-6 sm:px-7 sm:pb-8">
                            {/* Thin separator */}
                            <div className="w-full h-px bg-flame/10 mb-5 sm:mb-6" />

                            {/* Image + text layout */}
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 mb-6">
                                {/* Image */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
                                    className="sm:w-[42%] shrink-0 overflow-hidden relative"
                                >
                                    {/* Flame border glow */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,204,102,0.15)] z-10 pointer-events-none" />
                                    <Image
                                        src={card.image}
                                        alt={card.imageAlt}
                                        width={600}
                                        height={338}
                                        className="w-full h-auto block"
                                        quality={85}
                                    />
                                </motion.div>

                                {/* Text */}
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.28, duration: 0.55, ease: EASE }}
                                    className="flex flex-col justify-center"
                                >
                                    <p className="text-[0.88rem] sm:text-[0.95rem] font-manrope font-extralight text-foreground/65 leading-[1.9]">
                                        {card.body}
                                    </p>
                                </motion.div>
                            </div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.38, duration: 0.5, ease: EASE }}
                            >
                                <button
                                    onClick={() => router.push(card.href)}
                                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-9 sm:py-4 border border-flame/60 bg-flame/8 text-foreground hover:bg-flame hover:text-black transition-all duration-300 text-[0.8rem] sm:text-sm font-cormorant font-light tracking-[0.2em] uppercase overflow-hidden shadow-[0_0_20px_rgba(255,204,102,0.12)] hover:shadow-[0_0_40px_rgba(255,204,102,0.4)]"
                                >
                                    <span className="relative z-10">Выбрать эту линию жизни</span>
                                    <ArrowRight className="w-3.5 h-3.5 relative z-10 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                                    <span className="absolute inset-0 bg-gradient-to-r from-flame/0 via-flame/15 to-flame/0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out" />
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
        <div className="min-h-screen bg-deep-space text-foreground overflow-x-hidden">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative flex items-center justify-center px-5 overflow-hidden bg-black min-h-[55vw] sm:min-h-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,_rgba(255,204,102,0.09)_0%,_transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

                {/* Background texture lines */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,204,102,0.5) 40px)" }}
                />

                <div className="relative z-10 text-center max-w-2xl mx-auto pt-16 pb-12 sm:pt-24 sm:pb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                        className="text-[9px] sm:text-[10px] tracking-[0.4em] text-flame/45 uppercase mb-5 font-manrope font-extralight"
                    >
                        Трансерфинг реальности · Код Смотрителя
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 1, ease: EASE }}
                        className="text-[1.7rem] sm:text-4xl md:text-5xl font-cormorant font-light text-foreground tracking-wide leading-[1.25] mb-4"
                    >
                        Три двери.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
                        className="text-[1.7rem] sm:text-4xl md:text-5xl font-cormorant font-light text-flame tracking-wide leading-[1.25] mb-6"
                    >
                        Одна ведёт к вашей линии жизни.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.55, duration: 0.8 }}
                        className="text-[0.82rem] sm:text-sm font-manrope font-extralight text-foreground/35 leading-[1.9] max-w-sm mx-auto"
                    >
                        Загляните в каждую. Смотритель не торопится — он выбирает осознанно.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ delay: 0.75, duration: 1, ease: "circOut" }}
                        className="w-16 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent mx-auto mt-7"
                    />
                </div>
            </section>

            {/* ── ACCORDION ────────────────────────────────────────── */}
            <section className="py-10 sm:py-16 px-4 sm:px-6 bg-black relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-deep-space/50 to-black pointer-events-none" />

                <div className="max-w-2xl mx-auto relative z-10">

                    {/* Intro label */}
                    <motion.p
                        {...fadeUp(0)}
                        className="text-[9px] sm:text-[10px] tracking-[0.35em] text-foreground/25 uppercase font-manrope font-extralight text-center mb-6 sm:mb-8"
                    >
                        Выберите свою точку входа
                    </motion.p>

                    {/* Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
                        className="flex flex-col gap-2 sm:gap-3"
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
                        {...fadeUp(0.3)}
                        className="text-[10px] font-manrope font-extralight text-foreground/20 tracking-[0.18em] text-center mt-8 sm:mt-10 uppercase"
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
