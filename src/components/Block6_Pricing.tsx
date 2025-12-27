"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function Block6Pricing() {
    return (
        <section id="pricing" className="py-20 sm:py-24 md:py-28 px-4 bg-deep-space text-foreground scroll-mt-20">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-14 md:mb-16"
                >
                    <p className="text-xs sm:text-sm tracking-[0.25em] text-flame/70 uppercase mb-3 sm:mb-4 font-manrope font-extralight">
                        Блок 6: Закон Равновесия
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-light text-foreground mb-6 sm:mb-8 tracking-wide">
                        ЭНЕРГООБМЕН
                    </h2>
                    <p className="text-lg sm:text-xl font-manrope font-light text-foreground/80 max-w-2xl mx-auto leading-[1.7]">
                        Деньги — это энергия.
                    </p>
                    <p className="text-xl sm:text-2xl font-cormorant font-light text-flame max-w-2xl mx-auto mt-5 sm:mt-6 leading-[1.5]">
                        Истинный Творец не арендует. Он — владеет.
                    </p>
                </motion.div>

                {/* Pricing Options */}
                <div className="max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16">
                    
                    {/* Main Package */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-6 sm:p-8 border-2 border-flame/50 bg-black/50 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-flame/50 via-flame to-flame/50" />
                        
                        <h4 className="text-xl sm:text-2xl font-cormorant font-light text-flame mb-4 sm:mb-6">
                            «Код Смотрителя»
                        </h4>
                        <p className="text-sm sm:text-base font-manrope font-extralight text-foreground/80 mb-5 sm:mb-6">
                            Полный пакет трансформации
                        </p>
                        <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                            {[
                                "Вечный доступ к системе «Код Смотрителя»",
                                "Полный набор аудио «Трансляции» (голос Зеланда)",
                                "Закрытый практикум с обсуждением этапов",
                                "Поддержка группы практикующих"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-light text-foreground/90">
                                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-flame shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="text-5xl sm:text-6xl font-cormorant text-flame font-light mb-2">
                            $95
                        </div>
                        <p className="text-base sm:text-lg text-foreground/80">(≈ 9 025 ₽)</p>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="bg-black/40 border border-flame/30 p-8 sm:p-10 md:p-12 mb-8 sm:mb-10">
                        <div className="inline-block px-6 py-4 sm:px-8 sm:py-6 bg-gradient-to-r from-flame/10 via-flame/5 to-flame/10 border-2 border-flame/40 mb-8 sm:mb-10">
                            <p className="text-xl sm:text-2xl md:text-3xl font-cormorant font-light text-foreground leading-[1.5]">
                                Это не покупка.
                            </p>
                            <p className="text-xl sm:text-2xl md:text-3xl font-cormorant font-light text-flame mt-3 sm:mt-4">
                                Это Вклад в вашу Свободу.
                            </p>
                        </div>
                        
                        <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 leading-[1.8] max-w-2xl mx-auto mb-8 sm:mb-10">
                            Вы не тратите энергию. Вы перенаправляете её в русло, 
                            которое вернёт вам многократно больше — <span className="text-flame">не деньгами, а самой реальностью</span>.
                        </p>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => window.open('https://buy.stripe.com/your-link', '_blank')}
                        className="group relative inline-flex items-center gap-3 px-10 sm:px-12 py-5 sm:py-6 border-2 border-flame bg-flame/10 backdrop-blur-md text-foreground hover:text-black hover:bg-flame transition-all duration-300 uppercase tracking-[0.25em] text-base sm:text-lg font-cormorant font-light overflow-hidden shadow-[0_0_40px_rgba(255,204,102,0.4)] hover:shadow-[0_0_60px_rgba(255,204,102,0.6)]"
                    >
                        <span className="relative z-10">Получить «Код Смотрителя»</span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
