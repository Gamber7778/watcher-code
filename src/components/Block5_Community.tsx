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
                        Блок 5: Суть Практикума
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-light text-foreground mb-6 sm:mb-8 tracking-wide">
                        ЗАКРЫТЫЙ ПРАКТИКУМ
                    </h2>
                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 max-w-3xl mx-auto leading-[1.8] italic">
                        Каждый день приходят сотни сообщений. Люди рассказывают о своих изменениях. 
                        Или о том, что не получилось — из-за непонимания, из-за того, что не хватило внимания в нужный момент.
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
                                    СИСТЕМА ТРАНСФОРМАЦИИ С СОПРОВОЖДЕНИЕМ
                                </h3>
                                <Sparkles className="w-6 h-6 text-flame" />
                            </div>
                            <p className="text-lg sm:text-xl font-cormorant font-extralight text-foreground/90 mb-6 sm:mb-8 leading-[1.6]">
                                Формируется закрытая группа для Практикума. 
                                Не для всех — для тех, кто готов.
                            </p>
                        </div>

                        <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 text-center max-w-3xl mx-auto leading-[1.8] mb-10 sm:mb-12">
                            Для этой группы выделяется отдельное внимание. 
                            Не потому что «так надо». Потому что практика показывает — <span className="text-flame">когда есть внимание, человек меняется</span>. 
                            Когда есть возможность обсудить каждый этап, понять, что произошло, — тогда это работает.
                        </p>

                        <div className="space-y-5 sm:space-y-6">
                            {[
                                { 
                                    icon: MessageCircle, 
                                    title: "Обсуждение каждого этапа", 
                                    desc: "После прохождения модуля — обсуждение. Что изменилось? Где возникли вопросы? Обратная связь даётся не потому что «так положено», а потому что без этого люди застревают." 
                                },
                                { 
                                    icon: UserCheck, 
                                    title: "Персональное внимание", 
                                    desc: "Для этой группы выделяется отдельное время и внимание. Это не громкие слова — это структура, которая даёт понимание максимальному количеству участников." 
                                },
                                { 
                                    icon: Users2, 
                                    title: "Отобранная группа практикующих", 
                                    desc: "Это не массовый поток. Это отобранные участники Практикума. Люди, которые реально практикуют, а не просто читают. Вы окажетесь среди тех, кто меняет свою реальность прямо сейчас." 
                                },
                                { 
                                    icon: TrendingUp, 
                                    title: "Смещение линии жизни", 
                                    desc: "Сотни сообщений каждый день показывают: люди знают теорию, но застревают в практике. Задача — помочь вам сместиться на ту линию, где изменения уже происходят. Не объяснить снова, а сместить." 
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
                            <p className="text-center text-base sm:text-lg font-manrope font-extralight text-foreground/75 leading-[1.8] max-w-3xl mx-auto mb-6">
                                Группа структурирована так, чтобы каждый элемент системы работал на вашу трансформацию. 
                                Вы не будете блуждать в материале в одиночку — <span className="text-flame">вы перейдёте на линию тех, кто уже меняется</span>.
                            </p>
                            <p className="text-center text-base sm:text-lg font-cormorant font-light text-foreground/80 leading-[1.8] max-w-3xl mx-auto">
                                Когда Смотритель включён, когда вы находитесь в окружении тех, кто тоже практикует, — 
                                линия жизни сдвигается естественно. Это не усилие. Это <span className="text-flame">координация с течением вариантов</span>.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
