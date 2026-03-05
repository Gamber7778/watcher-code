"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CARDS = [
    {
        id: "borba",
        num: "01",
        tag: "Иллюзия борьбы",
        teaser: "Устал пробивать стены и выгорать",
        image: "/enter-1.png",
        imageAlt: "Иллюзия борьбы",
        body: "Ваша сжатая пружина важности лишь блокирует результат. Вы тратите жизнь на битву с зеркалом реальности, вместо того чтобы просто протянуть руку и взять своё. Здесь лежат инструменты для демонтажа важности. Узнайте, как получать желаемое на волне удачи, а не через надрыв.",
        href: "/exit",
    },
    {
        id: "dolg",
        num: "02",
        tag: "Иллюзия долга",
        teaser: "Отдаю энергию другим в ущерб себе",
        image: "/enter-2.png",
        imageAlt: "Иллюзия долга",
        body: "Ваша энергия стала кормушкой для чужих маятников. А навязанное чувство вины — это крючок, за который вас держат. Здесь находится ваш «Щит пустоты». Получите точные слова и практики, чтобы экологично отсечь вампиров и вернуть себе право на свою жизнь.",
        href: "/exit1",
    },
    {
        id: "haos",
        num: "03",
        tag: "Иллюзия хаоса",
        teaser: "Страх за будущее и потеря контроля",
        image: "/enter-3.png",
        imageAlt: "Иллюзия хаоса",
        body: "Глобальные маятники затянули вас в коллективное поле паники. Вы не можете отменить внешние события, но можете стать для них невидимкой. Здесь находится SOS-алгоритм экстренного сброса. Научитесь сохранять свой слой мира в безопасности, когда всё вокруг сходит с ума.",
        href: "/exit3",
    },
];

function DoorCard({
    card, isOpen, onToggle, index,
}: {
    card: typeof CARDS[number]; isOpen: boolean; onToggle: () => void; index: number;
}) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.1, duration: 0.6, ease: EASE }}
            className={`relative border transition-all duration-400 ${
                isOpen ? "border-flame/50" : "border-white/12 hover:border-white/25"
            }`}
        >
            {/* Flame top line when open */}
            <motion.div
                className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-flame to-transparent pointer-events-none"
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />

            {/* ── CLOSED ROW ── */}
            <button
                onClick={onToggle}
                className="w-full text-left flex items-center gap-4 px-5 py-5 sm:px-6 sm:py-6 group"
                aria-expanded={isOpen}
            >
                {/* Number */}
                <span className={`shrink-0 text-[0.75rem] font-manrope font-extralight tracking-[0.15em] transition-colors duration-300 ${isOpen ? "text-flame" : "text-foreground/30"}`}>
                    {card.num}
                </span>

                {/* Divider */}
                <div className={`shrink-0 w-px h-8 transition-colors duration-300 ${isOpen ? "bg-flame/40" : "bg-white/10"}`} />

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p className={`text-[0.95rem] sm:text-[1.05rem] font-cormorant font-light leading-snug transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/80"}`}>
                        {card.tag}
                    </p>
                    <p className={`text-[0.78rem] sm:text-[0.82rem] font-manrope font-extralight mt-0.5 transition-colors duration-300 ${isOpen ? "text-foreground/55" : "text-foreground/40"}`}>
                        {card.teaser}
                    </p>
                </div>

                {/* Arrow circle */}
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                            ? "border-flame bg-flame/15 text-flame"
                            : "border-white/20 text-foreground/45 group-hover:border-white/40 group-hover:text-foreground/70"
                    }`}
                >
                    <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
            </button>

            {/* ── OPEN CONTENT ── */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.3 } }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-7">
                            <div className="w-full h-px bg-flame/15 mb-5" />

                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
                                className="w-full overflow-hidden mb-5 border border-white/[0.07]"
                            >
                                <Image
                                    src={card.image}
                                    alt={card.imageAlt}
                                    width={800}
                                    height={450}
                                    className="w-full h-auto block"
                                    quality={88}
                                />
                            </motion.div>

                            {/* Body text */}
                            <motion.p
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.22, duration: 0.45, ease: EASE }}
                                className="text-[0.85rem] sm:text-[0.92rem] font-manrope font-extralight text-foreground/70 leading-[1.9] mb-5"
                            >
                                {card.body}
                            </motion.p>

                            {/* CTA */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                onClick={() => router.push(card.href)}
                                className="group relative w-full flex items-center justify-center gap-3 py-4 border border-flame bg-flame/8 text-foreground hover:bg-flame hover:text-black transition-all duration-300 text-[0.82rem] sm:text-sm font-cormorant font-light tracking-[0.2em] uppercase overflow-hidden shadow-[0_0_20px_rgba(255,204,102,0.15)] hover:shadow-[0_0_40px_rgba(255,204,102,0.45)]"
                            >
                                <span className="relative z-10">Выбрать эту линию жизни</span>
                                <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                <span className="absolute inset-0 bg-gradient-to-r from-flame/0 via-flame/12 to-flame/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function EnterPage() {
    const [openId, setOpenId] = useState<string | null>(null);
    const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

    return (
        <div className="bg-deep-space text-foreground overflow-x-hidden">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative flex items-center justify-center px-5 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_50%,_rgba(255,204,102,0.07)_0%,_transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

                <div className="relative z-10 text-center max-w-lg mx-auto pt-14 pb-10 sm:pt-20 sm:pb-14">
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                        className="text-[9px] sm:text-[10px] tracking-[0.4em] text-flame/50 uppercase mb-5 font-manrope font-extralight"
                    >
                        Трансерфинг реальности
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.9, ease: EASE }}
                        className="text-[1.7rem] sm:text-4xl font-cormorant font-light text-foreground tracking-wide leading-[1.2] mb-3"
                    >
                        Три двери.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
                        className="text-[1.7rem] sm:text-4xl font-cormorant font-light text-flame tracking-wide leading-[1.2] mb-5"
                    >
                        Одна ведёт к вашей линии жизни.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.45, duration: 0.7 }}
                        className="text-[0.82rem] sm:text-sm font-manrope font-extralight text-foreground/50 leading-[1.85]"
                    >
                        Смотритель не торопится — он выбирает осознанно.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ delay: 0.65, duration: 0.9, ease: "circOut" }}
                        className="w-12 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent mx-auto mt-6"
                    />
                </div>
            </section>

            {/* ── CARDS ────────────────────────────────────────────── */}
            <section className="pt-4 pb-8 px-4 sm:px-6 bg-black">
                <div className="max-w-xl mx-auto">

                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex items-center gap-3 mb-4 sm:mb-5"
                    >
                        <div className="flex-1 h-px bg-white/8" />
                        <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-flame/65 uppercase font-manrope font-light shrink-0">
                            Выберите свою точку входа
                        </p>
                        <div className="flex-1 h-px bg-white/8" />
                    </motion.div>

                    {/* Card list */}
                    <div className="flex flex-col gap-2.5">
                        {CARDS.map((card, i) => (
                            <DoorCard
                                key={card.id}
                                card={card}
                                index={i}
                                isOpen={openId === card.id}
                                onToggle={() => toggle(card.id)}
                            />
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-[9px] font-manrope font-extralight text-foreground/25 tracking-[0.18em] text-center mt-6 uppercase"
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
