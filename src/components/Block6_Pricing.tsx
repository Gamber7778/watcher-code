"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

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

                {/* Comparison Section */}
                <div className="mb-12 sm:mb-14 md:mb-16">
                    <p className="text-center text-lg sm:text-xl font-cormorant font-light text-foreground/80 mb-8 sm:mb-10">
                        Посмотрите на ситуацию с вершины:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                        {/* Standart Path */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-6 sm:p-8 border border-foreground/20 bg-black/30 opacity-60"
                        >
                            <h4 className="text-xl sm:text-2xl font-cormorant font-light text-foreground/70 mb-4 sm:mb-6">
                                Путь маятника
                            </h4>
                            <p className="text-sm sm:text-base font-manrope font-extralight text-foreground/60 mb-4 sm:mb-5">
                                Ежемесячный взнос без системы
                            </p>
                            <div className="space-y-2 mb-6 sm:mb-8 text-sm sm:text-base font-light text-foreground/60">
                                <p>$20/месяц × 6 месяцев</p>
                                <p className="text-xs sm:text-sm">Только доступ к сообществу</p>
                            </div>
                            <div className="text-3xl sm:text-4xl font-cormorant text-foreground/50 line-through decoration-flame/30">
                                $120
                            </div>
                            <p className="text-sm text-foreground/40 mt-2">(9420 руб)</p>
                        </motion.div>

                        {/* Watcher Path */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-6 sm:p-8 border-2 border-flame/50 bg-black/50 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-flame/50 via-flame to-flame/50" />
                            
                            <h4 className="text-xl sm:text-2xl font-cormorant font-light text-flame mb-4 sm:mb-6">
                                Путь Смотрителя
                            </h4>
                            <p className="text-sm sm:text-base font-manrope font-extralight text-foreground/80 mb-5 sm:mb-6">
                                Полный пакет с вечным доступом
                            </p>
                            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                {[
                                    "Вечный доступ к системе «Код Смотрителя»",
                                    "Набор «Трансляции» (Аудио-настройки)",
                                    "6 МЕСЯЦЕВ жизни в поле «Пространство за Гранью»"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-light text-foreground/90">
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-flame shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="text-5xl sm:text-6xl font-cormorant text-flame font-light">
                                $85
                            </div>
                            <p className="text-base sm:text-lg text-foreground/80 mt-2">(6670 руб)</p>
                        </motion.div>
                    </div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto bg-black/40 border border-flame/30 p-8 sm:p-10 md:p-12"
                >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-cormorant font-light text-foreground mb-8 sm:mb-10 leading-[1.4]">
                        СЕГОДНЯ ОТКРЫВАЕТСЯ ЛИНИЯ ЖИЗНИ
                    </h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-cormorant font-light text-flame mb-8 sm:mb-10 leading-[1.4]">
                        где вы получаете больше, затрачивая меньше
                    </p>
                    
                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 mb-8 sm:mb-10 leading-[1.7] max-w-2xl mx-auto">
                        Это не скидка. Это принцип Трансерфинга в действии.
                    </p>
                    
                    <div className="inline-block px-8 py-6 bg-black/30 border border-flame/30">
                        <p className="text-xl sm:text-2xl font-cormorant font-light text-foreground leading-[1.5]">
                            Это не покупка.
                        </p>
                        <p className="text-xl sm:text-2xl font-cormorant font-light text-flame mt-3">
                            Это Вклад в вашу Свободу.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
