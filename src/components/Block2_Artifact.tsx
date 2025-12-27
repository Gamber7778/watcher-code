"use client";

import { motion } from "framer-motion";
import { Disc, Layers, Zap } from "lucide-react";

export default function Block2Artifact() {
    return (
        <section id="artifact" className="py-16 sm:py-20 md:py-24 px-4 bg-deep-space text-foreground relative overflow-hidden scroll-mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-xs sm:text-sm tracking-[0.25em] text-flame/70 uppercase mb-3 sm:mb-4 font-manrope font-extralight">
                        Блок 2: Суть Системы
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-light text-foreground mb-8 sm:mb-10 tracking-wide">
                        ЧТО ТАКОЕ «АРТЕФАКТ»
                    </h2>

                    <div className="space-y-6 text-base sm:text-lg font-manrope font-extralight leading-[1.8] text-foreground/70">
                        <p>
                            Я не предлагаю вам «курс». Курсы дают информацию, которая выветривается через неделю.
                        </p>
                        
                        <p>
                            Я не предлагаю вам «мануал». Мануалы лежат мертвым грузом на жестком диске.
                        </p>
                        
                        <div className="pt-8 sm:pt-10 border-t border-flame/20 mt-8 sm:mt-10">
                            <p className="text-2xl sm:text-3xl md:text-4xl text-flame font-cormorant font-light leading-[1.3] mb-3 sm:mb-4">
                                «КОД СМОТРИТЕЛЯ»
                            </p>
                            <p className="text-lg sm:text-xl text-foreground/90 font-cormorant font-extralight leading-[1.5]">
                                это Инструмент Взлома Реальности
                            </p>
                        </div>

                        <p className="pt-6 sm:pt-8">
                            Это живая система, созданная для того, чтобы вы могли <span className="text-flame">Взять свое</span>. 
                            Не добиться, не отвоевать, а именно взять. Спокойно и без напряжения. Как почту из ящика.
                        </p>

                        <p>
                            Здесь собрана эссенция Трансерфинга и техник Тафти. Только то, что работает безотказно. 
                            Без воды. Без лишней теории. Только физика многовариантного мира.
                        </p>
                    </div>
                </motion.div>

                {/* Visual Artifact */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center items-center"
                >
                    {/* Elegant Photo Display */}
                    <div className="relative w-80 h-96 md:w-96 md:h-[500px] border border-flame/30 rounded-lg shadow-[0_0_50px_rgba(255,204,102,0.15)] overflow-hidden group">
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: 'url("/main.png")' }}
                        />
                        
                        {/* Elegant gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                        
                        {/* Subtle golden glow effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,204,102,0.1)_0%,_transparent_70%)]" />

                        {/* Content overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 z-10 text-center p-8 bg-gradient-to-t from-black/60 to-transparent">
                            <h4 className="text-2xl sm:text-3xl font-cormorant font-light text-flame tracking-wide">«Артефакт Намерения»</h4>
                        </div>

                        {/* Elegant border glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(45deg,transparent_25%,rgba(255,204,102,0.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-[shimmer_3s_infinite]" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
