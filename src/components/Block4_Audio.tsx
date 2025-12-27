"use client";

import { motion } from "framer-motion";
import { Play, Pause, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";

export default function Block4Audio() {
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([null, null, null]);

    return (
        <section id="audio" className="py-24 px-4 bg-gradient-to-b from-deep-space via-black to-deep-space text-foreground scroll-mt-20">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-14 md:mb-16"
                >
                    <p className="text-xs sm:text-sm tracking-[0.25em] text-flame/70 uppercase mb-3 sm:mb-4 font-manrope font-extralight">
                        Блок 4: Аудио-пакет
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-light text-foreground mb-6 sm:mb-8 tracking-wide">
                        АУДИО-ПАКЕТ «ТРАНСЛЯЦИИ»
                    </h2>
                    <p className="text-lg sm:text-xl font-cormorant font-light text-foreground/80 max-w-2xl mx-auto mb-4">
                        Это не медитации. Это <span className="text-flame font-normal">Настройки Частоты</span>.
                    </p>
                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                        Каждый аудиофайл — это уникальная трехсоставная структура, созданная мной специально для этого Артефакта.
                    </p>
                    
                    {/* Structure explanation */}
                    <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto text-left">
                        <div className="bg-black/40 border border-flame/20 p-4 sm:p-5">
                            <div className="text-3xl sm:text-4xl font-cormorant text-flame mb-2">1</div>
                            <h4 className="text-sm sm:text-base font-cormorant font-light text-foreground mb-2">Живое Слово Зеланда</h4>
                            <p className="text-xs sm:text-sm font-manrope font-extralight text-foreground/70 leading-relaxed">
                                Мой личный опыт. Эссенция философии. Прямая речь о том, как я ощущаю этот мир.
                            </p>
                        </div>
                        <div className="bg-black/40 border border-flame/20 p-4 sm:p-5">
                            <div className="text-3xl sm:text-4xl font-cormorant text-flame mb-2">2</div>
                            <h4 className="text-sm sm:text-base font-cormorant font-light text-foreground mb-2">Инструктаж</h4>
                            <p className="text-xs sm:text-sm font-manrope font-extralight text-foreground/70 leading-relaxed">
                                Технические нюансы. Как именно выполнять практику "здесь и сейчас", чтобы разум не мешал.
                            </p>
                        </div>
                        <div className="bg-black/40 border border-flame/20 p-4 sm:p-5">
                            <div className="text-3xl sm:text-4xl font-cormorant text-flame mb-2">3</div>
                            <h4 className="text-sm sm:text-base font-cormorant font-light text-foreground mb-2">Погружение (Практика)</h4>
                            <p className="text-xs sm:text-sm font-manrope font-extralight text-foreground/70 leading-relaxed">
                                Голосовое ведение под бинауральные ритмы для глубокой работы с подсознанием.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12 md:mt-16">
                    {[
                        {
                            title: "«ПРОБУЖДЕНИЕ»",
                            subtitle: "Утро",
                            desc: "Запуск Внешнего намерения и формирование Амальгамы дня",
                            image: "/audio-1.jpg",
                            audio: "/audio/ai-1.mp3"
                        },
                        {
                            title: "«НУЛЕВАЯ ТОЧКА»",
                            subtitle: "SOS",
                            desc: "Экстренный сброс страха и Важности в стрессе",
                            image: "/audio-2.jpg",
                            audio: "/audio/ai-7.mp3"
                        },
                        {
                            title: "«ЦЕЛЕВОЙ КАДР»",
                            subtitle: "Вечер",
                            desc: "Глубокая работа с Косицей и Слайдом. Материализация",
                            image: "/audio-3.jpg",
                            audio: "/audio/ai-8.mp3"
                        }
                    ].map((item, idx) => {
                        const isPlaying = playingIndex === idx;
                        
                        const togglePlay = () => {
                            const audio = audioRefs.current[idx];
                            if (!audio) return;

                            if (isPlaying) {
                                audio.pause();
                                setPlayingIndex(null);
                            } else {
                                // Pause all other audio
                                audioRefs.current.forEach((a, i) => {
                                    if (a && i !== idx) {
                                        a.pause();
                                        a.currentTime = 0;
                                    }
                                });
                                audio.play();
                                setPlayingIndex(idx);
                            }
                        };

                        return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer border border-wood/30"
                            onClick={togglePlay}
                        >
                            {/* Hidden Audio Element */}
                            <audio
                                ref={(el) => { audioRefs.current[idx] = el; }}
                                src={item.audio}
                                onEnded={() => setPlayingIndex(null)}
                            />
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 sm:p-7 md:p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="mb-3 sm:mb-4">
                                        <span className="text-xs uppercase tracking-wider text-flame/90 mb-2 block font-extralight">{item.subtitle}</span>
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-cormorant font-light text-white flex-1 leading-tight">{item.title}</h3>
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-flame group-hover:border-flame group-hover:text-black transition-all duration-300 shrink-0">
                                                {isPlaying ? <Pause size={18} className="sm:w-5 sm:h-5" /> : <Play size={18} className="ml-0.5 sm:w-5 sm:h-5 sm:ml-1" />}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm sm:text-base text-foreground/90 font-manrope font-extralight opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                                        {item.desc}
                                    </p>

                                    {/* Audio Visualizer - Always visible on mobile, hover on desktop */}
                                    <div className="flex items-end gap-1 h-8 mt-4 opacity-40 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 sm:delay-200">
                                        {[...Array(15)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-flame/70 rounded-full"
                                                animate={isPlaying ? { height: ["20%", "60%", "30%", "80%", "20%"] } : { height: "20%" }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: isPlaying ? Infinity : 0,
                                                    repeatType: "loop",
                                                    delay: i * 0.08,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-16 sm:mt-20 text-center"
                >
                    <p className="text-lg sm:text-xl md:text-2xl font-cormorant font-light text-foreground/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-[1.6]">
                        Все аудио-настройки включены в <span className="text-flame">Артефакт Намерения</span>
                    </p>
                    <button
                        onClick={() => {
                            const pricingSection = document.querySelector('#pricing');
                            if (pricingSection) {
                                pricingSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border-2 border-flame/60 bg-black/40 backdrop-blur-md text-foreground hover:text-flame hover:border-flame hover:bg-flame/5 transition-all duration-300 uppercase tracking-[0.25em] text-xs sm:text-sm font-cormorant font-light overflow-hidden shadow-[0_0_25px_rgba(255,204,102,0.2)]"
                    >
                        <span className="relative z-10">Получить доступ</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-flame/0 via-flame/10 to-flame/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
