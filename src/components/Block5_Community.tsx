"use client";

import { motion } from "framer-motion";
import { MessageCircle, UserCheck, TrendingUp, Users2, Sparkles } from "lucide-react";

export default function Block5Community() {
    return (
        <section id="community" className="py-20 sm:py-24 md:py-28 px-4 bg-deep-space text-foreground relative overflow-hidden scroll-mt-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-deep-space to-black opacity-60 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-14 md:mb-16"
                >
                    <p className="text-xs sm:text-sm tracking-[0.25em] text-flame/70 uppercase mb-3 sm:mb-4 font-manrope font-extralight">
                        Блок 5: Ваше Главное Преимущество
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-light text-foreground mb-6 sm:mb-8 tracking-wide">
                        ПЕРСОНАЛЬНОЕ СОПРОВОЖДЕНИЕ
                    </h2>
                    <p className="text-lg sm:text-xl font-manrope font-light text-foreground/85 max-w-2xl mx-auto leading-[1.7] mb-5 sm:mb-6">
                        В одиночку трансформироваться трудно.
                    </p>
                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/65 max-w-2xl mx-auto leading-[1.7]">
                        Поэтому на период прохождения вы получаете <span className="text-flame font-normal">прямую поддержку и внимание Зеланда на каждом шаге</span>.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-black/40 border border-flame/30 p-6 sm:p-8 md:p-10 relative overflow-hidden"
                >
                    {/* Elegant glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,204,102,0.05)_0%,_transparent_70%)] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="text-center mb-8 sm:mb-10">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Sparkles className="w-6 h-6 text-flame" />
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-cormorant font-light text-flame tracking-wide">
                                    ЗАКРЫТОЕ СОПРОВОЖДЕНИЕ
                                </h3>
                                <Sparkles className="w-6 h-6 text-flame" />
                            </div>
                            <p className="text-xl sm:text-2xl font-cormorant font-extralight text-foreground/90 mb-5 sm:mb-6">
                                «Трансформация под личным контролем Зеланда»
                            </p>
                            <div className="inline-block px-5 py-3 bg-gradient-to-r from-flame/20 via-flame/10 to-flame/20 border-2 border-flame/40 text-flame text-sm sm:text-base font-light rounded-lg">
                                ✦ Персональная поддержка на весь период прохождения
                            </div>
                        </div>

                        <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 text-center max-w-2xl mx-auto leading-[1.7] mb-10 sm:mb-12 italic">
                            Это не просто курс — это пространство трансформации, где каждый ваш шаг отслеживается и корректируется в реальном времени.
                        </p>

                        <div className="space-y-5 sm:space-y-6">
                            {[
                                { 
                                    icon: UserCheck, 
                                    title: "Личное внимание Вадима Зеланда", 
                                    desc: "Я лично отслеживаю ваш прогресс, даю обратную связь и корректирую траекторию движения на каждом этапе." 
                                },
                                { 
                                    icon: MessageCircle, 
                                    title: "Обсуждение личных изменений", 
                                    desc: "Вы сможете обсудить со мной и сообществом те изменения, которые происходят с вами в процессе применения практик." 
                                },
                                { 
                                    icon: TrendingUp, 
                                    title: "Закрепление трансформации", 
                                    desc: "Поддержка нужна не только для старта, но и для фиксации результата. Я помогу закрепить новые паттерны мышления и поведения." 
                                },
                                { 
                                    icon: Users2, 
                                    title: "Закрытая группа единомышленников", 
                                    desc: "Вы окажетесь в окружении людей, которые проходят тот же путь трансформации. Обмен опытом, поддержка и синергия намерений." 
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-4 sm:gap-5 p-5 sm:p-6 bg-gradient-to-r from-black/50 to-black/30 border-l-4 border-flame/60 hover:border-flame hover:bg-black/60 transition-all duration-300"
                                >
                                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-flame/10 border-2 border-flame/40 flex items-center justify-center">
                                        <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-flame" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg sm:text-xl font-cormorant font-light text-flame mb-2 sm:mb-3">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm sm:text-base font-manrope font-extralight text-foreground/70 leading-[1.7]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom emphasis */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-flame/20"
                        >
                            <p className="text-center text-base sm:text-lg font-cormorant font-light text-foreground/80 leading-[1.7] max-w-3xl mx-auto">
                                <span className="text-flame text-lg sm:text-xl">Важно:</span> Это не массовый продукт. 
                                Каждый участник получает персональное внимание. 
                                Именно поэтому трансформация работает — вы не остаетесь один на один с материалом, 
                                <span className="text-flame"> вас ведут от точки А до точки Б</span>.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
