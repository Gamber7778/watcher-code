"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lock, Unlock, CheckCircle2 } from "lucide-react";

interface Module {
    id: number;
    title: string;
    subtitle: string;
    intro: string;
    content: { title: string; desc: string }[];
}

const modules: Module[] = [
    {
        id: 1,
        title: "МОДУЛЬ 1: ТОЧКА СБОРКИ",
        subtitle: "Фундамент",
        intro: "Мы не идем от простого к сложному. Мы сразу даем ключи от всех дверей. Шоковая терапия пробуждением.",
        content: [
            { title: "Иллюзия Отражения", desc: "Почему вы получаете то, чего боитесь? Механика Дуального Зеркала. Как перестать кричать на свое отражение." },
            { title: "Включение Смотрителя", desc: "Техника мгновенного возвращения в осознанность. Позиция «НАД ситуацией»." },
            { title: "Секрет Внешнего Намерения", desc: "Главная тайна. Чем отличается «хотеть» (Внутреннее намерение — удел марионеток) от «вершить» (Внешнее намерение — привилегия Творца)." },
            { title: "Практика", desc: "«Декларация Свободы». Подписание контракта с самим собой об отказе от битвы." }
        ]
    },
    {
        id: 2,
        title: "МОДУЛЬ 2: ОБНУЛЕНИЕ ВАЖНОСТИ",
        subtitle: "Чистка канала",
        intro: "Прежде чем транслировать новое кино, нужно выключить старое. Пока вы полны страхов, энергия не потечет.",
        content: [
            { title: "Инвентаризация", desc: "Страхи, долги, обиды, чувство вины — это не ваши проблемы, это крючки маятников. Мы назовем их по имени и обесточим." },
            { title: "Психологическое Айкидо", desc: "Техники «Провала» и «Гашения» маятника. Как реагировать на негатив так, чтобы он проваливался в пустоту, а вы забирали его энергию." },
            { title: "Сдача себя в аренду", desc: "Искусство действовать безупречно, но отстраненно, не вовлекаясь эмоционально в чужую игру." }
        ]
    },
    {
        id: 3,
        title: "МОДУЛЬ 3: ГЕНЕРАТОР РЕАЛЬНОСТИ",
        subtitle: "Инструментарий",
        intro: "Самый мощный практический блок. Работа с метафизикой.",
        content: [
            { title: "Целевой Слайд", desc: "Ошибка 99% людей — они крутят кино о том, как они идут к цели. Мы научимся жить в кино, где всё уже случилось." },
            { title: "Косица Намерения", desc: "Секретная техника Тафти. Работа с энергетическим центром за спиной. Это кнопка «Пуск» для мгновенной подсветки кадра будущего." },
            { title: "Трансляция", desc: "Вы — радиоприемник. Перестаньте ловить чужие помехи. Начните транслировать частоту успеха, даже если пока находитесь в декорациях нужды." }
        ]
    },
    {
        id: 4,
        title: "МОДУЛЬ 4: КООРДИНАЦИЯ",
        subtitle: "Фиксация",
        intro: "Как не уснуть обратно и удержаться на Волне Удачи.",
        content: [
            { title: "Принцип Координации", desc: "Единственное правило, которое меняет линию жизни: любое событие, даже негативное, мы объявляем благоприятным." },
            { title: "Амальгама Реальности", desc: "Создание коротких формул самовнушения, настраивающих слой вашего мира на заботу о вас." },
            { title: "Движение по Течению", desc: "Как отпустить хватку контроля. Разум думает, что знает, как лучше, но он слеп. Течение вариантов всегда несет к оптимальному решению." }
        ]
    }
];

export default function Block3Architecture() {
    const [activeModule, setActiveModule] = useState<number | null>(null);

    return (
        <section id="architecture" className="py-20 sm:py-24 md:py-28 px-4 bg-deep-space text-foreground scroll-mt-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-14 md:mb-16"
                >
                    <p className="text-xs sm:text-sm tracking-[0.25em] text-flame/70 uppercase mb-3 sm:mb-4 font-manrope font-extralight">
                        Блок 3: Архитектура Системы
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-light text-foreground mb-6 sm:mb-8 tracking-wide">
                        АРХИТЕКТУРА СИСТЕМЫ
                    </h2>
                    <p className="text-base sm:text-lg font-manrope font-extralight text-foreground/70 max-w-2xl mx-auto italic leading-relaxed">
                        Вы получаете доступ к «КОД СМОТРИТЕЛЯ» — интерактивному руководству, которое перепрошивает ваше восприятие шаг за шагом.
                    </p>
                </motion.div>

                <div className="space-y-3 sm:space-y-4">
                    {modules.map((module) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: module.id * 0.1 }}
                            className={`border ${activeModule === module.id ? 'border-flame/50 bg-black/50' : 'border-flame/20 bg-black/30'} transition-all duration-300 overflow-hidden`}
                        >
                            <button
                                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none hover:bg-black/40 transition-colors"
                            >
                                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                                    {activeModule === module.id ? (
                                        <Unlock className="w-5 h-5 text-flame shrink-0" />
                                    ) : (
                                        <Lock className="w-5 h-5 text-flame/60 shrink-0" />
                                    )}
                                    <div className="flex-1">
                                        <h3 className={`text-lg sm:text-xl font-cormorant font-light tracking-wide ${activeModule === module.id ? 'text-foreground' : 'text-foreground/80'}`}>
                                            {module.title}
                                        </h3>
                                        <p className="text-xs uppercase tracking-wider text-flame/70 mt-1 font-extralight">{module.subtitle}</p>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-flame/60 transition-transform duration-300 shrink-0 ${activeModule === module.id ? 'rotate-180 text-flame' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {activeModule === module.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-flame/10">
                                            <p className="text-sm sm:text-base font-manrope font-extralight text-flame/70 italic mt-5 mb-6 sm:mb-7 leading-[1.7]">
                                                {module.intro}
                                            </p>
                                            <ul className="space-y-5 sm:space-y-6">
                                                {module.content.map((item, idx) => {
                                                    const isPractical = item.title.toLowerCase().includes('практика') || 
                                                                       item.title.toLowerCase().includes('сдача себя в аренду');
                                                    return (
                                                        <li key={idx} className={`space-y-2 ${isPractical ? 'relative pl-4 py-4 pr-4 bg-flame/5 border-l-4 border-flame rounded-r-lg' : ''}`}>
                                                            <div className="flex items-center gap-2">
                                                                {isPractical && (
                                                                    <CheckCircle2 className="w-5 h-5 text-flame shrink-0" />
                                                                )}
                                                                <p className={`font-light text-base sm:text-lg ${isPractical ? 'text-flame font-medium' : 'text-flame'}`}>
                                                                    {item.title}
                                                                </p>
                                                            </div>
                                                            <p className="text-foreground/65 font-manrope font-extralight text-sm sm:text-base leading-[1.7] pl-3 border-l border-flame/20">
                                                                {item.desc}
                                                            </p>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
