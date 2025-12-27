"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Block1Awakening() {
    return (
        <section id="awakening" className="py-16 sm:py-20 md:py-24 px-4 bg-deep-space text-foreground flex justify-center relative overflow-hidden scroll-mt-20">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-deep-space to-black pointer-events-none opacity-60" />

            <div className="max-w-3xl w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 sm:mb-12"
                >
                    <p className="text-xs sm:text-sm tracking-[0.25em] text-flame/70 uppercase mb-3 sm:mb-4 font-manrope font-extralight">
                        Блок 1: Пробуждение
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cormorant font-light text-foreground tracking-wide">
                        ВАША ЖИЗНЬ ВАМ НЕ ПРИНАДЛЕЖИТ.
                    </h2>
                    <p className="text-xl sm:text-2xl md:text-3xl font-cormorant font-extralight text-flame/90 mt-3 sm:mt-4 tracking-wider">
                        Пока что.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-6 text-base sm:text-lg font-manrope font-extralight leading-[1.8] text-foreground/70"
                >
                    {/* Simple article-style text */}
                    <p>
                        Оглянитесь. Всё, что вас сейчас окружает — это декорации, которые вы не выбирали осознанно. 
                        События случаются с вами, а не для вас. Вы чувствуете вязкое сопротивление среды: 
                        стоит чего-то захотеть, как мир выставляет стену.
                    </p>

                    <p>
                        Это не карма. И не судьба. Это — <span className="text-flame">Сценарий</span>.
                    </p>

                    <p>
                        Вы спите наяву. И пока вы спите, Маятники (эгрегоры) используют вас как источник питания. 
                        Они подбрасывают вам ложные цели, чужие тревоги и искусственные желания. 
                        Вы бежите за горизонт, но остаетесь на месте, потому что пытаетесь изменить отражение в зеркале, 
                        касаясь самого стекла руками.
                    </p>

                    {/* Clean conclusion */}
                    <div className="pt-8 sm:pt-10 border-t border-flame/20 mt-10 sm:mt-12">
                        <p className="text-lg sm:text-xl md:text-2xl font-cormorant font-light text-foreground leading-[1.6] mb-8">
                            Хватит биться лбом о стену. Пора сделать шаг назад. В позицию Смотрителя.
                        </p>
                        
                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-center"
                        >
                            <button
                                onClick={() => {
                                    const artifactSection = document.querySelector('#artifact');
                                    if (artifactSection) {
                                        artifactSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border-2 border-flame/60 bg-black/40 backdrop-blur-md text-foreground hover:text-flame hover:border-flame hover:bg-flame/5 transition-all duration-300 uppercase tracking-[0.25em] text-xs sm:text-sm font-cormorant font-light overflow-hidden shadow-[0_0_25px_rgba(255,204,102,0.2)]"
                            >
                                <span className="relative z-10">Узнать больше</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-flame/0 via-flame/10 to-flame/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
