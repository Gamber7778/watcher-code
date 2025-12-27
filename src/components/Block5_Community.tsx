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
                        Блок 5: Почему я это делаю
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-light text-foreground mb-6 sm:mb-8 tracking-wide">
                        ЗАКРЫТЫЙ ПРАКТИКУМ
                    </h2>
                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 max-w-3xl mx-auto leading-[1.8] italic">
                        Каждый день мне пишут сотни сообщений. Люди рассказывают о своих изменениях. 
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
                                    Я ХОЧУ ПРОЙТИ ЭТОТ ПУТЬ ВМЕСТЕ С ВАМИ
                                </h3>
                                <Sparkles className="w-6 h-6 text-flame" />
                            </div>
                            <p className="text-lg sm:text-xl font-cormorant font-extralight text-foreground/90 mb-6 sm:mb-8 leading-[1.6]">
                                Поэтому я формирую закрытую группу для этого Практикума. 
                                Не для всех — для тех, кто готов.
                            </p>
                        </div>

                        <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 text-center max-w-3xl mx-auto leading-[1.8] mb-10 sm:mb-12">
                            Я буду выделять время на эту отдельную группу. 
                            Не потому что «так надо». Потому что я вижу — <span className="text-flame">когда есть внимание, человек меняется</span>. 
                            Когда есть возможность обсудить каждый этап, понять, что произошло, — тогда это работает.
                        </p>

                        <div className="space-y-5 sm:space-y-6">
                            {[
                                { 
                                    icon: MessageCircle, 
                                    title: "Обсуждение каждого этапа", 
                                    desc: "Вы прошли модуль — мы обсуждаем. Что изменилось? Где возникли вопросы? Я даю обратную связь не потому что «так положено», а потому что вижу — без этого люди застревают." 
                                },
                                { 
                                    icon: UserCheck, 
                                    title: "Я уделяю время лично", 
                                    desc: "По мере того как я буду выделять время на эту группу, вы почувствуете прогресс. Это не громкие слова — это то, что я планирую делать, потому что хочу дать понимание как можно большему числу людей." 
                                },
                                { 
                                    icon: Users2, 
                                    title: "Отобранная группа практикующих", 
                                    desc: "Это не массовый поток. Это люди, которых я отберу на этот Практикум. Люди, которые реально практикуют, а не просто читают. Вы окажетесь среди тех, кто меняет свою реальность прямо сейчас." 
                                },
                                { 
                                    icon: TrendingUp, 
                                    title: "Реальные изменения, а не теория", 
                                    desc: "Я не пытаюсь вам что-то «впарить». Я объясняю. Сотни сообщений каждый день показывают мне, где люди спотыкаются. И я хочу убрать эти препятствия — для вас и для тех, кто будет рядом." 
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
                                Я не стараюсь на каждом этапе по 100 раз отвечать на одно и то же. 
                                Всё будет сделано так, чтобы <span className="text-flame">вы действительно изменились</span>.
                            </p>
                            <p className="text-center text-base sm:text-lg font-cormorant font-light text-foreground/80 leading-[1.8] max-w-3xl mx-auto">
                                Группа закрытая. Отбор есть. Но если вы здесь — значит, вы понимаете. 
                                И я пройду этот путь вместе с вами.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
