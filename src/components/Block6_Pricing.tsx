import { Check, ArrowUpRight } from "lucide-react";

const plans = [
  {
    name: "Самостоятельное прохождение",
    subtitle: "Полная программа с живой поддержкой",
    usd: "$95",
    rub: "7 900 ₽",
    featured: false,
    points: [
      "Все основные модули, уроки и домашние задания",
      "Постоянный доступ к учебным материалам",
      "Прохождение в удобном для вас темпе",
      "Вопросы по урокам без формального лимита",
      "Живые ответы по мере возможности",
    ],
    detail: "Вы самостоятельно изучаете программу и пробуете практики на своём опыте. Если возникает вопрос, можете написать и получить содержательный ответ. Это полноценный курс, а не сокращённая версия.",
  },
  {
    name: "Персональная работа с Вадимом",
    subtitle: "Шесть месяцев углублённого сопровождения",
    usd: "$600",
    rub: "49 000 ₽",
    featured: true,
    points: [
      "Всё содержание курса и домашние задания",
      "Постоянный доступ к учебным материалам",
      "Шесть месяцев персональной работы с Вадимом",
      "Разбор вашей ситуации, целей и препятствий",
      "Обсуждение наблюдений и применения практик",
      "Живая связь и ответы по мере возможности",
    ],
    detail: "Мы уделяем больше внимания именно вашей жизни. Возвращаемся к целям, разбираем сложные моменты, уточняем подход по мере продвижения. Вадим включается в работу лично в течение шести месяцев.",
  },
];

export default function Block6Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-gradient-to-b from-deep-space via-black to-deep-space px-5 py-20 text-foreground sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.23em] text-flame/80">Форматы участия</p>
          <h2 className="font-cormorant text-4xl font-light leading-tight sm:text-5xl md:text-6xl">Одна программа. Две глубины работы.</h2>
          <p className="mt-6 font-manrope text-base font-light leading-[1.85] text-foreground/70">В обоих форматах вы получаете сам курс, возможность задавать вопросы и живые ответы. Разница — в глубине персонального сопровождения, а не в качестве программы.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          {plans.map((plan) => (
            <article key={plan.name} className={plan.featured ? "relative flex h-full flex-col border border-flame/70 bg-black/60 p-6 sm:p-9" : "relative flex h-full flex-col border border-flame/25 bg-black/35 p-6 sm:p-9"}>
              <div className="mb-3 min-h-6 text-xs uppercase tracking-[0.18em] text-flame/85">{plan.featured ? "Более глубокое сопровождение" : "Основной формат"}</div>
              <h3 className="font-cormorant text-3xl leading-[1.12] text-foreground sm:text-4xl">{plan.name}</h3>
              <p className="mt-3 min-h-12 font-manrope text-sm font-light leading-[1.7] text-foreground/70">{plan.subtitle}</p>
              <div className="mt-6 border-y border-flame/20 py-5">
                <p className="font-cormorant text-5xl text-flame sm:text-6xl">{plan.usd}</p>
                <p className="mt-1 font-manrope text-base text-foreground/75">или {plan.rub}</p>
                <p className="mt-3 font-manrope text-xs leading-[1.65] text-foreground/45">Фиксированные цены в каждой валюте, без автоматического пересчёта</p>
              </div>
              <ul className="my-7 space-y-4">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-manrope text-sm font-light leading-[1.7] text-foreground/85">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-flame" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mb-7 border-l border-flame/45 pl-4 font-manrope text-sm font-light leading-[1.85] text-foreground/65">{plan.detail}</p>
              <a href="https://t.me/vadim_official_z" target="_blank" rel="noopener noreferrer" className={plan.featured ? "mt-auto inline-flex min-h-13 items-center justify-center gap-2 border border-flame bg-flame px-4 py-3 text-center font-manrope text-sm font-semibold text-black transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame" : "mt-auto inline-flex min-h-13 items-center justify-center gap-2 border border-flame bg-flame/10 px-4 py-3 text-center font-manrope text-sm font-semibold text-foreground transition-colors hover:bg-flame hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame"}>
                Выбрать формат в Telegram <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl border border-flame/20 bg-black/30 p-6 sm:p-8">
          <h3 className="font-cormorant text-2xl text-flame sm:text-3xl">Как происходит оплата</h3>
          <p className="mt-4 font-manrope text-sm font-light leading-[1.9] text-foreground/70 sm:text-base">Вы пишете мне в Telegram и называете выбранный формат и валюту. Я отправляю ссылку на оплату прямо в переписке. После подтверждения платежа вам помогают открыть доступ к программе. Не требуется сначала проходить отдельную семидневную практику.</p>
          <p className="mt-4 font-manrope text-xs leading-[1.8] text-foreground/50">Общение живое: я и кураторская поддержка отвечаем по мере возможности. Шесть месяцев относятся только к персональному сопровождению, а не к сроку доступа к учебным материалам. Конкретные жизненные результаты не гарантируются.</p>
        </div>
      </div>
    </section>
  );
}