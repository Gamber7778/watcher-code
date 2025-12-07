"use client";

import { motion } from "framer-motion";
import { MessageCircle, Lightbulb, Shield, Users } from "lucide-react";

export default function Block5Community() {
    return (
        <section className="py-20 sm:py-24 md:py-28 px-4 bg-deep-space text-foreground relative overflow-hidden">
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
                        ЗАКРЫТОЕ СООБЩЕСТВО
                    </h2>
                    <p className="text-lg sm:text-xl font-manrope font-light text-foreground/85 max-w-2xl mx-auto leading-[1.7] mb-5 sm:mb-6">
                        В одиночку проснуться трудно.
                    </p>
                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/65 max-w-2xl mx-auto leading-[1.7]">
                        Поэтому вместе с «Артефактом» вы получаете доступ в <span className="text-flame font-normal">Закрытое Сообщество</span>.
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
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-cormorant font-light text-flame mb-3 sm:mb-4 tracking-wide">
                                🗝 ЗАКРЫТЫЙ КАНАЛ
                            </h3>
                            <p className="text-xl sm:text-2xl font-cormorant font-extralight text-foreground/90 mb-3 sm:mb-4">
                                «ПРОСТРАНСТВО ЗА ГРАНЬЮ»
                            </p>
                            <div className="inline-block px-4 py-2 bg-flame/10 border border-flame/30 text-flame text-xs sm:text-sm font-light">
                                Доступ на 6 месяцев включен в стоимость
                            </div>
                        </div>

                        <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 text-center max-w-2xl mx-auto leading-[1.7] mb-10 sm:mb-12">
                            Это чистая зона, где мы координируем коллективное Намерение.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                            {[
                                { icon: MessageCircle, title: "Прямой контакт", desc: "Я, Вадим Зеланд, незримо (и зримо) присутствую в этом поле." },
                                { icon: Lightbulb, title: "Ответы и Разборы", desc: "Я даю пояснения к практикам, корректирую вектор и отвечаю на вопросы." },
                                { icon: Shield, title: "Инсайты момента", desc: "То, что приходит в потоке \"здесь и сейчас\" и не публикуется в книгах." },
                                { icon: Users, title: "Среда", desc: "Вы окажетесь среди Вершителей, а не Спящих." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-4 p-4 sm:p-5 bg-black/30 border border-flame/20"
                                >
                                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-flame/10 border border-flame/30 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-flame" />
                                    </div>
                                    <div>
                                        <h4 className="text-base sm:text-lg font-cormorant font-light text-foreground mb-2 sm:mb-3">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm sm:text-base font-manrope font-extralight text-foreground/65 leading-[1.7]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
