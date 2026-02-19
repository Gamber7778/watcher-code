"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Block7Quiz() {
    return (
        <section className="py-20 sm:py-24 md:py-32 px-4 bg-foreground text-background relative overflow-hidden">
            {/* Elegant texture overlay */}
            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-multiply pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm tracking-[0.25em] text-wood/70 uppercase mb-4 sm:mb-6 font-manrope font-extralight">
                        Блок 7: Персональный Отбор
                    </p>
                    
                    {/* Main Title */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cormorant font-light text-background mb-6 sm:mb-8 tracking-wider">
                        ДИАГНОСТИКА ГОТОВНОСТИ
                    </h2>

                    {/* Introduction */}
                    <div className="mb-10 sm:mb-12 md:mb-14 max-w-3xl mx-auto space-y-6 sm:space-y-8">
                        <p className="text-lg sm:text-xl text-wood/80 font-manrope font-extralight leading-[1.8]">
                            Понимаете, каждый день приходят сотни сообщений. 
                            Люди рассказывают о том, на какой линии они сейчас застряли.
                        </p>
                        <p className="text-lg sm:text-xl text-wood/80 font-manrope font-extralight leading-[1.8]">
                            Одни готовы сместиться. Другие всё ещё цепляются за маятники. 
                            Кому-то это вообще не нужно — они просто собирают информацию.
                        </p>
                        <div className="bg-wood/15 border-2 border-wood/40 p-6 sm:p-8 rounded-lg">
                            <p className="text-base sm:text-lg text-background font-manrope font-extralight leading-[1.8]">
                                Этот практикум не для всех. 
                                Напишите напрямую, расскажите где вы сейчас находитесь. 
                                Это поможет определить вашу готовность к трансформации.
                            </p>
                        </div>
                    </div>

                    <p className="text-2xl sm:text-3xl font-cormorant font-light text-background mb-10 sm:mb-12 leading-[1.4]">
                        Как это работает:
                    </p>

                    {/* Process steps - simplified */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-14 max-w-3xl mx-auto text-left">
                        {[
                            { text: "Вы пишете в Telegram", sub: "Расскажите о вашей текущей линии" },
                            { text: "Проводится анализ готовности", sub: "Определение точки сборки" },
                            { text: "Оценка соответствия программе", sub: "Не всем это подходит" },
                            { text: "Если готовы — получаете доступ", sub: "Координация намерений" }
                        ].map((step, idx) => (
                            <div key={idx} className="bg-wood/10 border border-wood/30 p-5 sm:p-6">
                                <div className="text-3xl sm:text-4xl font-cormorant text-background mb-3">{idx + 1}</div>
                                <p className="text-sm sm:text-base font-manrope font-light text-background leading-[1.6] mb-2">
                                    {step.text}
                                </p>
                                <p className="text-xs sm:text-sm font-manrope font-extralight text-wood/60 italic">
                                    {step.sub}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        onClick={() => window.open('https://t.me/Vadim_Zelland_official', '_blank')}
                        whileHover={{ 
                            scale: 1.03,
                            boxShadow: "0 10px 40px rgba(62, 39, 35, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="group relative inline-flex items-center gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-wood text-foreground hover:bg-leather transition-all duration-300 uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm md:text-base font-cormorant font-semibold shadow-lg overflow-hidden"
                    >
                        <span className="relative z-10">Пройти Диагностику</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        
                        {/* Hover gradient effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-leather/50 to-wood opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    {/* Final message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-10 sm:mt-12 space-y-3 sm:space-y-4"
                    >
                        <p className="text-xl sm:text-2xl font-cormorant font-extralight text-wood/70 leading-[1.6]">
                            Если вы ещё здесь — значит что-то резонирует.
                        </p>
                        <p className="text-2xl sm:text-3xl font-cormorant font-light text-background leading-[1.4]">
                            Напишите. Определим вашу готовность.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
