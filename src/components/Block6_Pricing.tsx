import { Check } from "lucide-react";

const plans = [
  {
    name: "Курс с поддержкой",
    button: "Начать с поддержкой — $95",
    message: "Здравствуйте, Вадим! Меня интересует самостоятельное прохождение практикума «Код Смотрителя». Хочу заниматься в своём темпе. Подскажите, как присоединиться?",
    subtitle: "Для тех, кто хочет идти самостоятельно и задавать вопросы по ходу",
    usd: "$95",
    rub: "7 900 ₽",
    featured: false,
    points: [
      "Все модули: видеоуроки, тексты и практические задания",
      "Постоянный доступ к учебным материалам",
      "Последовательное открытие уроков на учебной платформе",
      "Ваш темп и удобная продолжительность занятий",
      "Возможность задавать Вадиму и поддержке вопросы по урокам и заданиям",
    ],
    detail: "Подходит, если вам нужен понятный маршрут и возможность уточнить непонятное. Вы сами организуете занятия, а вопросы по материалам и практике обсуждаете по мере прохождения.",
  },
  {
    name: "Лично с Вадимом · 6 месяцев",
    button: "Обсудить сопровождение — $600",
    message: "Здравствуйте, Вадим! Меня интересует «Код Смотрителя» с персональным сопровождением. Хочу подробнее узнать о работе с вами: как она проходит и как можно присоединиться?",
    subtitle: "Для тех, кому важен подробный разбор своей ситуации и следующих шагов",
    usd: "$600",
    rub: "49 000 ₽",
    featured: true,
    points: [
      "Всё из формата «Курс с поддержкой»",
      "Постоянный доступ к учебным материалам",
      "Шесть месяцев персональной работы с Вадимом",
      "Подробный разбор ваших целей, ситуаций и препятствий",
      "Обсуждение наблюдений и применения практик",
      "Индивидуальные выходы на связь по договорённости и возможности",
    ],
    detail: "Подходит, если вы хотите разбирать с Вадимом не только уроки, но и детали своей ситуации. На протяжении шести месяцев вы возвращаетесь к запросу, обсуждаете трудности и уточняете следующие шаги. Формат и время индивидуального общения согласуются отдельно.",
  },
];

export default function Block6Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-gradient-to-b from-deep-space via-black to-deep-space px-5 py-20 text-foreground sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.23em] text-flame/80">Форматы участия</p>
          <h2 className="font-cormorant text-4xl leading-tight sm:text-5xl md:text-6xl">Выберите, какая поддержка нужна вам</h2>
          <p className="mt-6 font-manrope text-base leading-[1.85] text-foreground/70">Полная программа и ответы на вопросы доступны в обоих форматах. В базовом — помощь по урокам и заданиям. В персональном — ещё и шесть месяцев подробной работы с Вадимом над вашим запросом.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          {plans.map((plan) => (
            <article key={plan.name} className={plan.featured ? "relative flex h-full flex-col border border-flame/70 bg-black/60 p-6 sm:p-9" : "relative flex h-full flex-col border border-flame/25 bg-black/35 p-6 sm:p-9"}>
              <div className="mb-3 min-h-6 text-xs uppercase tracking-[0.18em] text-flame/85">{plan.featured ? "Более глубокое сопровождение" : "Основной формат"}</div>
              <h3 className="font-cormorant text-3xl leading-[1.12] text-foreground sm:text-4xl">{plan.name}</h3>
              <p className="mt-3 min-h-12 font-manrope text-base leading-[1.7] text-foreground/70">{plan.subtitle}</p>
              <div className="mt-6 border-y border-flame/20 py-5">
                <p className="font-cormorant text-5xl text-flame sm:text-6xl">{plan.usd}</p>
                <p className="mt-1 font-manrope text-base text-foreground/75">или {plan.rub}</p>
                <p className="mt-3 font-manrope text-xs leading-[1.65] text-foreground/70">Стоимость выбранного формата. Цены в долларах и рублях фиксированы.</p>
              </div>
              <ul className="my-7 space-y-4">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-manrope text-base leading-[1.7] text-foreground/85">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-flame" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mb-7 border-l border-flame/45 pl-4 font-manrope text-base leading-[1.85] text-foreground/80">{plan.detail}</p>
              <a href={`https://t.me/vadim_ze?text=${encodeURIComponent(plan.message)}`} target="_blank" rel="noopener noreferrer" className={plan.featured ? "mt-auto inline-flex min-h-13 items-center justify-center gap-2 border border-flame bg-flame px-4 py-3 text-center font-manrope text-base font-semibold text-black transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame" : "mt-auto inline-flex min-h-13 items-center justify-center gap-2 border border-flame bg-flame/10 px-4 py-3 text-center font-manrope text-base font-semibold text-foreground transition-colors hover:bg-flame hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame"}>
                {plan.button}
              </a>
              <p className="mt-3 text-center font-manrope text-xs leading-relaxed text-foreground/75">Откроется личный чат в Telegram с готовым сообщением. Его можно изменить перед отправкой.</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl border border-flame/20 bg-black/30 p-6 sm:p-8">
          <h3 className="font-cormorant text-2xl text-flame sm:text-3xl">Как происходит оплата</h3>
          <p className="mt-4 font-manrope text-base leading-[1.9] text-foreground/70 sm:text-base">Выберите формат и отправьте подготовленное сообщение в Telegram. В переписке уточним условия и удобную валюту, затем отправим ссылку на оплату. После подтверждения платежа вам помогут войти на учебную платформу. Дальше вы начинаете первый урок и продвигаетесь в собственном темпе.</p>
          <p className="mt-4 font-manrope text-xs leading-[1.8] text-foreground/75">Вадим и кураторская поддержка отвечают по мере возможности. Постоянный контакт в персональном формате означает возможность возвращаться к своему запросу на протяжении шести месяцев, а не круглосуточные ответы. Фиксированное число созвонов не заявлено. Доступ к учебным материалам остаётся постоянным.</p>
        </div>
      </div>
    </section>
  );
}