"use client";

import { motion } from "framer-motion";
import { Check, Crown, ArrowRight } from "lucide-react";

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
                    
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

                    {/* VIP Package */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 sm:p-8 border-2 border-flame bg-gradient-to-br from-black/70 to-black/50 relative overflow-hidden group"
                    >
                        {/* Premium badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-flame text-black px-3 py-1.5 rounded-full text-xs font-bold uppercase">
                            <Crown className="w-3 h-3" />
                            VIP
                        </div>

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,204,102,0.1)_0%,_transparent_70%)] pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-flame via-amber to-flame animate-pulse" />
                        
                        <h4 className="text-xl sm:text-2xl font-cormorant font-light text-flame mb-2">
                            Личное ведение Зеланда
                        </h4>
                        <p className="text-lg sm:text-xl font-cormorant font-extralight text-flame/80 mb-5 sm:mb-6">
                            + 1.5 месяца персональной работы
                        </p>
                        
                        <div className="bg-flame/10 border border-flame/30 p-4 mb-5 sm:mb-6 rounded-lg">
                            <p className="text-sm font-manrope font-light text-flame/90 flex items-center gap-2">
                                <Crown className="w-4 h-4" />
                                Только 5 мест
                            </p>
                        </div>

                        <p className="text-sm sm:text-base font-manrope font-extralight text-foreground/80 mb-5 sm:mb-6 leading-[1.7]">
                            После завершения группового практикума — дополнительные 1.5 месяца личного сопровождения. 
                            Индивидуальная работа с вашим прогрессом и закрепление изменений.
                        </p>

                        <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                            {[
                                "Всё из основного пакета",
                                "Личная обратная связь от Зеланда",
                                "Индивидуальная корректировка практик",
                                "Закрепление трансформации 1 на 1"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-light text-foreground/90">
                                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-flame shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="border-t border-flame/30 pt-5 sm:pt-6">
                            <div className="text-5xl sm:text-6xl font-cormorant text-flame font-light mb-2">
                                $600
                            </div>
                            <p className="text-base sm:text-lg text-foreground/80">(≈ 57 000 ₽)</p>
                        </div>
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

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                        <button
                            onClick={() => window.open('https://buy.stripe.com/your-link', '_blank')}
                            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border-2 border-flame bg-flame/10 backdrop-blur-md text-foreground hover:text-black hover:bg-flame transition-all duration-300 uppercase tracking-[0.25em] text-sm sm:text-base font-cormorant font-light overflow-hidden shadow-[0_0_30px_rgba(255,204,102,0.3)]"
                        >
                            <span className="relative z-10">Получить «Код Смотрителя»</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        <button
                            onClick={() => window.open('https://buy.stripe.com/your-vip-link', '_blank')}
                            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border-2 border-flame/60 bg-black/60 backdrop-blur-md text-flame hover:text-black hover:border-flame hover:bg-flame transition-all duration-300 uppercase tracking-[0.25em] text-sm sm:text-base font-cormorant font-light overflow-hidden"
                        >
                            <Crown className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">VIP Личное ведение</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
