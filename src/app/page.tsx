import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CourseVideo from "@/components/CourseVideo";
import Block3Architecture from "@/components/Block3_Architecture";
import Block6Pricing from "@/components/Block6_Pricing";

const situations = [
  { title: "Всё откладывается на потом", text: "Вы знаете, что хотите изменить, но ждёте сил, уверенности или подходящего момента.", practice: "Практика: заметить, что останавливает, и выбрать посильный следующий шаг." },
  { title: "Любая цель становится экзаменом", text: "Результат настолько важен, что страх ошибки и контроль забирают всё внимание.", practice: "Практика: снизить избыточную важность и увидеть альтернативы." },
  { title: "Слишком много чужих ожиданий", text: "Вы стараетесь соответствовать, но всё труднее понять, чего хотите сами.", practice: "Практика: отделить собственное направление от желания заслужить одобрение." },
];
const steps = [
  { title: "Заходите на учебную платформу", text: "После подтверждения оплаты получаете доступ к программе. Внутри — видеоуроки, текстовые материалы и практические задания в одном месте." },
  { title: "Продвигаетесь шаг за шагом", text: "Новые уроки, задания и модули открываются по мере прохождения. Вы последовательно переходите от наблюдения за собой к намерению и действиям." },
  { title: "Пробуете в своей жизни", text: "Выбираете собственный запрос и выполняете задания на его примере: в разговоре, рабочей ситуации или решении, которое давно откладывали." },
  { title: "Задаёте вопросы по ходу", text: "Если что-то непонятно или практика вызывает затруднение, вы можете написать и получить ответ. Вопросы по урокам можно обсуждать с Вадимом и кураторской поддержкой в обоих форматах." },
];
const results = [
  { title: "Пауза вместо автоматической реакции", text: "Замечать момент, когда вы снова начинаете спорить, тревожиться или всё контролировать, и выбирать следующий шаг осознанно." },
  { title: "Действие вместо бесконечной подготовки", text: "Разложить свой запрос на доступные действия и попробовать то, что раньше откладывали до идеального момента." },
  { title: "Своя цель вместо чужого сценария", text: "Яснее сформулировать, чего вы хотите, и замечать решения, которые принимаете только ради чужого одобрения." },
];
const questions = [
  { q: "Что именно я получу после оплаты?", a: "Доступ к учебной платформе с видеоуроками, текстовыми материалами и практическими заданиями. Уроки и модули открываются последовательно по мере прохождения. Учебные материалы остаются доступны, к пройденному можно возвращаться." },
  { q: "Сколько времени нужно выделять?", a: "Вы сами выбираете время и продолжительность занятий. Можно проходить материал небольшими частями или уделять практике больше времени. Общего обязательного темпа нет; новые этапы открываются по вашему продвижению, а не по расписанию группы." },
  { q: "Если я не пойму задание, мне помогут?", a: "Да. В обоих форматах можно задавать вопросы по урокам и выполнению практик, в том числе обращаться к Вадиму. Ответы поступают по мере возможности. Вы можете уточнить непонятное и продолжить работу, а не оставаться с вопросом один на один." },
  { q: "Чем отличаются форматы за $95 и $600?", a: "За $95 вы самостоятельно проходите полную программу и получаете ответы на вопросы по материалам и заданиям. За $600 добавляются шесть месяцев персональной работы с Вадимом: подробный разбор вашего запроса, препятствий и следующих шагов, обсуждение деталей по мере продвижения. Индивидуальные выходы на связь согласуются отдельно, по возможности; фиксированное число созвонов не заявлено." },
  { q: "Можно ли увидеть изменения ещё во время обучения?", a: "Задания устроены так, чтобы применять изученное сразу: заметить привычную реакцию, по-другому провести разговор или сделать отложенный шаг. Такие изменения можно отслеживать уже по ходу практики. Их темп и масштаб индивидуальны: покупка или просмотр уроков сами по себе не гарантируют перемен в доходе, отношениях или других обстоятельствах." },
  { q: "Я уже читал книги. Зачем мне практикум?", a: "Здесь идеи собраны в последовательность действий: изучить тему, выполнить задание на своём примере, задать вопрос и перейти дальше. Акцент — на применении того, что вы уже знаете, в повседневных ситуациях." },
  { q: "Мой запрос — деньги, отношения или поиск себя. Подойдёт ли мне?", a: "Вы можете взять такой запрос как тему для практики. Программа помогает исследовать собственные реакции, важность, цели и действия. Если сомневаетесь, напишите в Telegram до оплаты: обсудим вашу ситуацию и соответствие программы ожиданиям." },
  { q: "Как оплатить и начать?", a: "Выберите формат — откроется Telegram с подготовленным сообщением. Отправьте его, уточните детали и удобную валюту. Ссылку на оплату вы получите в переписке; после подтверждения платежа вам помогут открыть доступ к учебной платформе." },
  { q: "Доступ заканчивается через шесть месяцев?", a: "Нет. Шесть месяцев — срок персонального сопровождения в формате за $600. Доступ к учебным материалам постоянный в обоих форматах." },
];

export default function Home() {
  return <>
    <Header />
    <main className="min-h-screen w-full overflow-x-hidden bg-deep-space text-foreground">
      <HeroSection />
      <CourseVideo />
      <section id="about" className="scroll-mt-24 border-t border-flame/10 px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-flame">От вашего запроса — к практике</p>
          <h2 className="max-w-3xl font-cormorant text-4xl leading-tight sm:text-5xl">Узнаёте себя? С этим и будем работать.</h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.8] text-foreground/80">Если вы уже прошли диагностику, возьмите свой сценарий за отправную точку. Если нет — начните с ситуации, которая повторяется и которую вы хотите изменить.</p>
          <div className="mt-9 grid gap-4 md:grid-cols-3">{situations.map(item => <article key={item.title} className="border border-flame/20 bg-black/30 p-6">
            <h3 className="font-cormorant text-3xl leading-tight">{item.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">{item.text}</p>
            <p className="mt-5 border-t border-flame/20 pt-5 text-base leading-relaxed text-flame">{item.practice}</p>
          </article>)}</div>
        </div>
      </section>
      <section id="how" className="scroll-mt-24 bg-black/70 px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-flame">Как проходит обучение</p>
          <h2 className="max-w-3xl font-cormorant text-4xl leading-tight sm:text-5xl">Понятный маршрут. Ваш собственный темп.</h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.8] text-foreground/80">Смотрите видео, читаете объяснение, выполняете практику и задаёте вопросы. Вы сами решаете, сколько времени уделять занятиям.</p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">{steps.map(step => <article key={step.title} className="border border-flame/20 bg-deep-space p-6 sm:p-8">
            <h3 className="font-cormorant text-3xl leading-tight">{step.title}</h3>
            <p className="mt-4 text-base leading-[1.8] text-foreground/80">{step.text}</p>
          </article>)}</div>
          <p className="mt-7 border-l-2 border-flame pl-5 text-base leading-[1.8] text-foreground/85">Самостоятельное прохождение не означает, что вы остаётесь без поддержки. Если вопрос возникает в процессе — его можно обсудить. Для более глубокой работы с личной ситуацией есть персональный формат.</p>
        </div>
      </section>
      <section id="results" className="scroll-mt-24 border-y border-flame/15 bg-flame/5 px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-flame">Что меняется через практику</p>
          <h2 className="max-w-3xl font-cormorant text-4xl leading-tight sm:text-5xl">Переносите изученное в жизнь с первых заданий</h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.8] text-foreground/85">Не нужно ждать последнего модуля, чтобы начать действовать по-новому. Важный ориентир — конкретный поступок, разговор или решение, которое вы смогли изменить.</p>
          <div className="mt-9 grid gap-7 md:grid-cols-3">{results.map(item => <article key={item.title} className="border-t border-flame/40 pt-6">
            <h3 className="font-cormorant text-3xl leading-tight">{item.title}</h3>
            <p className="mt-4 text-base leading-[1.8] text-foreground/80">{item.text}</p>
          </article>)}</div>
          <div className="mt-10 border border-flame/25 bg-black/30 p-6 sm:p-8">
            <h3 className="font-cormorant text-3xl">Как замечать свой прогресс</h3>
            <p className="mt-4 text-base leading-[1.8] text-foreground/85">Перед началом запишите одну повторяющуюся ситуацию и свою обычную реакцию. После практики возвращайтесь к трём вопросам: что я заметил, что сделал иначе, что изменилось? Так у вас будут собственные наблюдения, с которыми можно прийти на разбор.</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">Темп и масштаб изменений индивидуальны и зависят от ситуации и применения практик. Мгновенный или одинаковый для всех результат не обещается.</p>
          </div>
          <a href="#pricing" className="mt-8 inline-flex min-h-12 items-center justify-center border border-flame bg-flame px-7 py-3 text-base font-semibold text-black hover:bg-foreground">Выбрать свою поддержку</a>
        </div>
      </section>
      <Block3Architecture />
      <Block6Pricing />
      <section id="faq" className="scroll-mt-24 border-t border-flame/10 bg-gradient-to-b from-deep-space to-black px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-flame">Перед началом</p>
          <h2 className="mb-10 font-cormorant text-4xl sm:text-5xl">Вопросы о программе</h2>
          <div className="space-y-3">{questions.map(item => <details key={item.q} className="group border border-flame/20 bg-black/35 px-5 py-4 open:border-flame/50 sm:px-7">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-cormorant text-2xl leading-snug marker:hidden">{item.q}<span aria-hidden="true" className="shrink-0 font-manrope text-2xl text-flame transition-transform group-open:rotate-45">+</span></summary>
            <p className="pb-3 pt-4 text-base leading-[1.8] text-foreground/85">{item.a}</p>
          </details>)}</div>
          <div className="mt-12 border border-flame/30 bg-flame/5 px-6 py-8 text-center sm:p-10">
            <h3 className="font-cormorant text-3xl sm:text-4xl">Начните со своей ситуации</h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-[1.8] text-foreground/85">Не уверены, какой формат выбрать? Напишите, что хотите изменить и какая поддержка вам нужна. Обсудим это до оплаты.</p>
            <a href="https://t.me/vadim_official_z" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center border border-flame bg-flame px-8 py-3 text-base font-semibold text-black hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame">Задать вопрос в Telegram</a>
          </div>
        </div>
      </section>
      <footer className="border-t border-flame/10 bg-black px-5 py-10 text-center text-sm text-foreground/65">© {new Date().getFullYear()} Код Смотрителя. Практикум по принципам Трансерфинга.</footer>
    </main>
  </>;
}
