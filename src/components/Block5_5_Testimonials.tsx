"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

interface Testimonial {
    id: number;
    name: string;
    location: string;
    date: string;
    rating: number;
    text: string;
    platform: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Анна Соколова",
        location: "Москва",
        date: "15 января 2025",
        rating: 5,
        text: "Это не просто курс — это перезагрузка сознания. После первого модуля я начала замечать, как реальность буквально подстраивается под мои намерения. Аудио-практики «Пробуждение» и «Целевой кадр» стали моим ежедневным ритуалом.",
        platform: "Проверенная покупка"
    },
    {
        id: 2,
        name: "Дмитрий Волков",
        location: "Санкт-Петербург",
        date: "3 февраля 2025",
        rating: 5,
        text: "Я прошел десятки тренингов по саморазвитию, но только здесь я понял, что все это время боролся с ветряными мельницами. Техника «Нулевая точка» спасла меня в критической ситуации на работе — я просто отпустил важность, и проблема решилась сама собой.",
        platform: "Проверенная покупка"
    },
    {
        id: 3,
        name: "Елена Кравцова",
        location: "Киев",
        date: "28 февраля 2025",
        rating: 5,
        text: "«Код Смотрителя» — это не информация, это опыт. Каждый модуль открывает новый уровень восприятия. Особенно зацепила работа с Косицей намерения — впервые почувствовала, что такое настоящая сила.",
        platform: "Проверенная покупка"
    },
    {
        id: 4,
        name: "Михаил Орлов",
        location: "Минск",
        date: "12 марта 2025",
        rating: 5,
        text: "Трансерфинг читал еще 10 лет назад, но только сейчас понял, как это работает на практике. Голосовые практики в аудио-пакете — это совершенно другой уровень погружения. Рекомендую всем, кто устал от теории.",
        platform: "Проверенная покупка"
    },
    {
        id: 5,
        name: "Ольга Белова",
        location: "Новосибирск",
        date: "7 апреля 2025",
        rating: 5,
        text: "Я скептик по натуре, но результаты говорят сами за себя. За месяц работы с Артефактом в моей жизни произошли три «случайных» события, которые кардинально изменили мою карьеру. Совпадение? Не думаю.",
        platform: "Проверенная покупка"
    },
    {
        id: 6,
        name: "Сергей Ковалев",
        location: "Екатеринбург",
        date: "19 апреля 2025",
        rating: 5,
        text: "Это не курс для новичков — это мастер-класс для тех, кто готов взять ответственность за свою реальность. Техника Координации работает безотказно, если следовать инструкциям. Благодарю за этот опыт.",
        platform: "Проверенная покупка"
    },
    {
        id: 7,
        name: "Виктория Морозова",
        location: "Казань",
        date: "5 мая 2025",
        rating: 5,
        text: "Никогда не писала отзывы, но здесь не могу молчать. После работы с модулем «Генератор реальности» у меня появилась квартира, о которой я мечтала 5 лет. Просто держала Слайд и отпустила. Магия? Нет. Технология.",
        platform: "Проверенная покупка"
    },
    {
        id: 8,
        name: "Александр Петров",
        location: "Ростов-на-Дону",
        date: "22 мая 2025",
        rating: 5,
        text: "Аудио-практика «Нулевая точка» — это скорая помощь для психики. Использую ее каждый раз, когда чувствую, что начинаю раскачивать маятник. Эффект мгновенный. Спасибо за такой инструмент.",
        platform: "Проверенная покупка"
    },
    {
        id: 9,
        name: "Наталья Иванова",
        location: "Краснодар",
        date: "10 июня 2025",
        rating: 5,
        text: "Я прошла путь от полного скептицизма до абсолютной уверенности в том, что я — творец своей реальности. Модуль «Точка сборки» перевернул мое мировоззрение. Теперь я не жертва обстоятельств, а Смотритель.",
        platform: "Проверенная покупка"
    },
    {
        id: 10,
        name: "Игорь Смирнов",
        location: "Воронеж",
        date: "3 июля 2025",
        rating: 5,
        text: "Работаю с Артефактом уже 6 месяцев. Это не разовая акция, это образ жизни. Техники встроились в мою ежедневную рутину так органично, что я уже не представляю, как жил без них. Рекомендую на 100%.",
        platform: "Проверенная покупка"
    },
    {
        id: 11,
        name: "Мария Лебедева",
        location: "Самара",
        date: "18 августа 2025",
        rating: 5,
        text: "Принцип Координации — это золото. Я начала применять его ко всем событиям в жизни, даже к самым неприятным. И знаете что? Они действительно начали работать на меня. Это не самовнушение, это работает.",
        platform: "Проверенная покупка"
    },
    {
        id: 12,
        name: "Артем Новиков",
        location: "Омск",
        date: "29 сентября 2025",
        rating: 5,
        text: "Я бизнесмен, и для меня важны результаты. За 3 месяца работы с «Кодом Смотрителя» мой доход вырос на 40%. Я не делал ничего сверхъестественного — просто перестал бороться и начал транслировать.",
        platform: "Проверенная покупка"
    },
    {
        id: 13,
        name: "Светлана Попова",
        location: "Уфа",
        date: "14 октября 2025",
        rating: 5,
        text: "Аудио-пакет «Трансляции» — это отдельное произведение искусства. Голос, музыка, смыслы — все сливается в единое целое. После каждой практики я выхожу обновленной. Это мой личный ритуал силы.",
        platform: "Проверенная покупка"
    },
    {
        id: 14,
        name: "Павел Соловьев",
        location: "Челябинск",
        date: "6 ноября 2025",
        rating: 5,
        text: "Читал Трансерфинг, смотрел видео, но только здесь все встало на свои места. Структура, практики, живой голос — это то, чего мне не хватало. Теперь я не просто знаю теорию, я живу ею.",
        platform: "Проверенная покупка"
    }
];

export default function Block5_5_Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = testimonials.length - 1;
            if (nextIndex >= testimonials.length) nextIndex = 0;
            return nextIndex;
        });
    };

    return (
        <section className="py-20 sm:py-24 md:py-28 px-4 bg-gradient-to-b from-black via-deep-space to-black text-foreground overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-14 md:mb-16"
                >
                    <p className="text-xs sm:text-sm tracking-[0.25em] text-flame/70 uppercase mb-3 sm:mb-4 font-manrope font-extralight">
                        Отзывы
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-light text-foreground mb-4 sm:mb-6 tracking-wide">
                        ЧТО ГОВОРЯТ СМОТРИТЕЛИ
                    </h2>
                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                        Реальные истории тех, кто прошел через Артефакт
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Testimonial Card */}
                    <div className="relative h-[400px] sm:h-[350px] md:h-[320px] flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute w-full"
                            >
                                <div className="bg-black/40 border border-flame/20 p-6 sm:p-8 md:p-10 max-w-3xl mx-auto backdrop-blur-sm">
                                    {/* Rating Stars */}
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-flame text-flame" />
                                        ))}
                                    </div>

                                    {/* Testimonial Text */}
                                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/90 leading-relaxed mb-6 sm:mb-8 italic">
                                        "{testimonials[currentIndex].text}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="flex items-center justify-between border-t border-flame/10 pt-4 sm:pt-5">
                                        <div>
                                            <p className="text-base sm:text-lg font-cormorant font-light text-foreground">
                                                {testimonials[currentIndex].name}
                                            </p>
                                            <p className="text-xs sm:text-sm font-manrope font-extralight text-foreground/60">
                                                {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                                            </p>
                                        </div>
                                        <div className="text-xs uppercase tracking-wider text-flame/70 font-extralight border border-flame/30 px-2 sm:px-3 py-1 rounded">
                                            {testimonials[currentIndex].platform}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
                        <button
                            onClick={() => paginate(-1)}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-flame/30 flex items-center justify-center text-flame/70 hover:bg-flame hover:text-black transition-all duration-300 backdrop-blur-sm"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        idx === currentIndex
                                            ? "bg-flame w-8"
                                            : "bg-flame/30 hover:bg-flame/50"
                                    }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => paginate(1)}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-flame/30 flex items-center justify-center text-flame/70 hover:bg-flame hover:text-black transition-all duration-300 backdrop-blur-sm"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* Counter */}
                    <div className="text-center mt-6 sm:mt-8">
                        <p className="text-xs sm:text-sm font-manrope font-extralight text-foreground/50">
                            {currentIndex + 1} / {testimonials.length}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

