import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Block3Architecture from "@/components/Block3_Architecture";
import Block6Pricing from "@/components/Block6_Pricing";

const steps = [
  { number: "01", title: "Открываете программу", text: "Двигаетесь по урокам в своём темпе. К материалам можно возвращаться: доступ остаётся постоянным." },
  { number: "02", title: "Пробуете на своём опыте", text: "После тем идут домашние задания. Вы наблюдаете привычные реакции и переносите принципы Трансерфинга в обычную жизнь." },
  { number: "03", title: "Задаёте вопросы", text: "В обоих форматах есть живая обратная связь по материалам. Ответы приходят по мере возможности." },
  { number: "04", title: "Собираете свою практику", text: "Связываете наблюдение, уменьшение важности, намерение и действие. В персональном формате работа с Вадимом продолжается шесть месяцев." },
];

const questions = [
  { q: "Это книга, записи или полноценный курс?", a: "Это последовательный практикум: уроки, домашние задания и обратная связь по возникающим вопросам. Вы пробуете принципы Трансерфинга в своей жизни." },
  { q: "Я уже читал книги. Зачем мне эта программа?", a: "Книги помогают понять идеи. Курс предлагает маршрут практики, задания и возможность обсудить вопрос, когда в собственной ситуации теория перестаёт быть очевидной." },
  { q: "Мой запрос — деньги, отношения или поиск себя. Подойдёт ли мне?", a: "Программа единая: наблюдение, важность, намерение и координация. Эти принципы применяются к разным жизненным темам. Конкретный внешний результат не гарантируется." },
  { q: "В самостоятельном формате мне будут отвечать?", a: "Да. По урокам можно задавать вопросы без формального ограничения их количества. Это живые ответы по мере возможности, а не круглосуточная автоматическая поддержка." },
  { q: "Что означает шесть месяцев персональной работы?", a: "Вадим глубже разбирает с вами ваши цели, наблюдения, препятствия и применение материала к жизненным ситуациям в течение шести месяцев. Доступ к урокам остаётся постоянным." },
  { q: "Как оплатить и получить доступ?", a: "Напишите в Telegram, выберите формат и валюту. Ссылку на оплату отправят в переписке. После проверки платежа помогут получить доступ к платформе." },
  { q: "Можно ли проходить в своём темпе?", a: "Да. Важнее понимание и применение, чем скорость. Вы можете возвращаться к заданиям и урокам, когда потребуется." },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full overflow-x-hidden bg-deep-space text-foreground">
        <HeroSection />

        <section id="about" className="scroll-mt-20 border-t border-flame/10 bg-gradient-to-b from-black via-deep-space to-deep-space px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.23em] text-flame/80">О чём этот практикум</p>
            <h2 className="font-cormorant text-4xl font-light leading-[1.06] sm:text-5xl md:text-6xl">Проснуться внутри собственного сценария</h2>
            <div className="mt-9 space-y-6 font-manrope text-base font-light leading-[1.9] text-foreground/75 sm:text-lg">
              <p>Иногда кажется, что жизнь требует только одного: ещё сильнее стараться, всё контролировать и не допускать ошибок. Вы меняете обстоятельства, а знакомый сценарий возвращается.</p>
              <p>Трансерфинг предлагает посмотреть глубже. Сначала заметить, <span className="text-flame">как именно вы реагируете</span>. Затем уменьшить лишнюю важность, выбрать собственное направление и научиться действовать без постоянной внутренней борьбы.</p>
              <p>Для этого я собрал «Код Смотрителя» — последовательную программу из уроков и практических заданий. Мы разбираем не отвлечённую «идеальную жизнь», а реальные моменты: разговоры, работу, решения, страхи, цели и повторяющиеся реакции.</p>
            </div>
            <div className="mt-10 border-l border-flame/60 pl-5 font-cormorant text-2xl italic leading-relaxed text-flame sm:text-3xl">
              Не нужно побеждать отражение. Сначала стоит заметить, какой образ вы ему показываете.
            </div>
          </div>
        </section>

        <Block3Architecture />

        <section id="how" className="scroll-mt-20 bg-black/70 px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-xs uppercase tracking-[0.23em] text-flame/80">Как проходит обучение</p>
              <h2 className="font-cormorant text-4xl font-light leading-tight sm:text-5xl md:text-6xl">От понимания — к собственной практике</h2>
              <p className="mt-6 font-manrope text-base leading-[1.8] text-foreground/65">К материалам можно возвращаться, а вопросы обсуждать с живым человеком. Вы идёте в своём темпе, без гонки за количеством пройденных уроков.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <div key={step.number} className="border border-flame/20 bg-deep-space p-6 sm:p-8">
                  <p className="font-cormorant text-4xl text-flame/80">{step.number}</p>
                  <h3 className="mt-4 font-cormorant text-2xl text-foreground sm:text-3xl">{step.title}</h3>
                  <p className="mt-4 font-manrope text-sm font-light leading-[1.85] text-foreground/70 sm:text-base">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Block6Pricing />

        <section id="faq" className="scroll-mt-20 border-t border-flame/10 bg-gradient-to-b from-deep-space to-black px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs uppercase tracking-[0.23em] text-flame/80">Перед началом</p>
            <h2 className="mb-10 font-cormorant text-4xl font-light sm:text-5xl">Вопросы о программе</h2>
            <div className="space-y-3">
              {questions.map((item) => (
                <details key={item.q} className="group border border-flame/20 bg-black/35 px-5 py-4 open:border-flame/45 sm:px-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-cormorant text-xl leading-snug text-foreground marker:hidden sm:text-2xl">
                    {item.q}
                    <span aria-hidden="true" className="shrink-0 font-manrope text-2xl font-light text-flame transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-3 pt-4 font-manrope text-sm font-light leading-[1.85] text-foreground/70 sm:text-base">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-12 border border-flame/30 bg-flame/5 px-6 py-8 text-center sm:p-10">
              <p className="font-cormorant text-2xl text-foreground sm:text-3xl">Остался вопрос именно о вашей ситуации?</p>
              <p className="mx-auto mt-3 max-w-xl font-manrope text-sm leading-[1.8] text-foreground/65">Напишите мне в Telegram. Можно обсудить запрос, уточнить программу и спокойно выбрать формат.</p>
              <a href="https://t.me/vadim_official_z" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center border border-flame bg-flame px-8 py-3 font-manrope text-sm font-semibold tracking-wide text-black transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame">Написать в Telegram</a>
            </div>
          </div>
        </section>

        <footer className="border-t border-flame/10 bg-black px-5 py-10 text-center font-manrope text-xs text-foreground/40">
          © {new Date().getFullYear()} Код Смотрителя. Программа практического изучения принципов Трансерфинга.
        </footer>
      </main>
    </>
  );
}