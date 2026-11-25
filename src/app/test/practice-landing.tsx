"use client";

import { useState, type ReactNode } from "react";
import { Check, Clock3, FileText, Focus, MessageCircle, Plus, Sparkles } from "lucide-react";
import PracticeVideo from "./practice-video";
import s from "./practice.module.css";

const TELEGRAM = "https://t.me/vadim_official_z";
const GUIDE_LINK = `${TELEGRAM}?text=${encodeURIComponent("Здравствуйте! Хочу получить бесплатный гайд «Работа без постоянного контроля» и план практики на 7 дней.")}`;
const examples = [
  { label: "Клиент молчит", situation: "Отправил предложение. Ответа нет. Снова открываю переписку и думаю о скидке.", assumption: "«Цена слишком высокая. Я потеряю заказ».", action: "Завтра в 11:00 уточню, когда удобно вернуться к решению по предложению.", release: "До этого момента проверяю ответ в обычные рабочие окна и занимаюсь текущим проектом.", question: "Удалось вернуться к работе без постоянных проверок?" },
  { label: "Всё делаю сам", situation: "Передал задачу сотруднику, но проверяю каждую деталь и переделываю за него.", assumption: "«Без меня всё будет сделано неправильно».", action: "Сегодня согласую результат, срок и одну промежуточную точку проверки.", release: "Между проверками не вмешиваюсь без новой информации. Срочные вопросы обсудим отдельно.", question: "Сохранилось качество без проверки каждого действия?" },
  { label: "Беру лишнее", situation: "Клиент просит ещё одну доработку. Соглашаюсь, хотя на неё снова уйдёт весь вечер.", assumption: "«Если обсужу условия, клиент больше не вернётся».", action: "До начала работы уточню объём и предложу согласовать новый срок или отдельную стоимость.", release: "Не обещаю дополнительную работу, пока не проверю текущие договорённости и свою загрузку.", question: "Получилось обсудить условия до начала работы?" },
];
const faqs = [
  ["Нужно ли знать Трансерфинг?", "Нет. В практике есть понятная последовательность и заполненный пример. Идеи наблюдения и снижения важности объясняются через обычные рабочие ситуации."],
  ["Сколько времени потребуется?", "На первый разбор запланируйте около 15 минут. Затем попробуйте выбранное действие в течение недели. Каждый день заполнять большой отчёт не нужно."],
  ["Что я получу бесплатно?", "Гайд в PDF на пяти страницах: короткую практику, заполненный пример, фразы для рабочих разговоров, шаблон своей карты и план на 7 дней. Чтобы запросить гайд, перейдите в Telegram и отправьте команде готовое сообщение. Покупка не требуется."],
  ["Это личная консультация?", "Это самостоятельная практика. Вы выбираете ситуацию и заполняете карту. Если захотите узнать о дополнительной поддержке, можно обратиться к команде в Telegram."],
  ["А если контроль действительно необходим?", "Сохраните проверки, от которых зависят качество, сроки и безопасность. В практике вы ищете повторные действия, которые уже не дают новой информации. Условия работы и срочные сигналы лучше согласовать заранее."],
  ["Что будет после бесплатной практики?", "Вы сможете пользоваться материалом самостоятельно или познакомиться с практикумом «Код Смотрителя». Программа и форматы поддержки доступны отдельно. Покупка для получения PDF не нужна."],
];

function GuideLink({ placement, className, children }: { placement: string; className: string; children: ReactNode }) {
  return <a href={GUIDE_LINK} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track("practice_telegram_click", placement)}>{children}</a>;
}

function Mark() { return <span className={s.brandMark} aria-hidden="true"><span /></span>; }
function track(event: string, placement: string) {
  const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
  analytics.gtag?.("event", event, { content_name: "work_without_constant_control", placement });
}

export default function PracticeLanding() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];

  return <div className={s.page}>
    <a href="#content" className={s.skip}>К содержанию</a>
    <header className={s.header}>
      <a href="/" className={s.brand}><Mark /><span>Код Смотрителя<small>Трансерфинг в повседневной жизни</small></span></a>
      <nav aria-label="Навигация по практике"><a href="#inside">Что внутри гайда</a><a href="#example">Пример результата</a><GuideLink placement="header" className={s.headerCta}>Получить гайд</GuideLink></nav>
    </header>

    <main id="content">
      <section className={`${s.hero} ${s.wrap}`} aria-label="Бесплатная практика для работы">
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>Для специалистов и владельцев своего дела</p>
          <h1>Вы уже умеете<br />зарабатывать.</h1>
          <p className={s.heroQuestion}>Но почему работа забирает<br />всё больше сил?</p>
        </div>
        <div className={s.heroVideo} id="video">
          <div className={s.videoEyebrow}><span>РАБОТА БЕЗ ПОСТОЯННОГО КОНТРОЛЯ</span><span>Видео о практике</span></div>
          <PracticeVideo />
          <div className={s.videoSignature}><Mark /><div><span className={s.signatureName}>Код Смотрителя</span><span className={s.signatureCaption}>Практика по идеям Трансерфинга</span></div><span className={s.signatureAside}>От наблюдения<br />к своему решению</span></div>
        </div>
        <div className={s.heroAction}>
          <p className={s.heroDescription}>Начните с одной ситуации, которую трудно отпустить. Бесплатный гайд поможет отделить факты от опасений и составить свой план действий на 7 дней.</p>
          <GuideLink placement="hero" className={s.primary}><MessageCircle size={18} />Получить бесплатный гайд</GuideLink>
          <p className={s.ctaNote}>В Telegram · PDF-гайд + карта действий на 7 дней</p>
        </div>
      </section>

      <div className={s.benefitsStrip}><div className={s.wrap}><div><Clock3 size={23} strokeWidth={1.2} /><p><strong>15 минут для себя</strong><span>Разобрать одну рабочую ситуацию</span></p></div><div><MessageCircle size={23} strokeWidth={1.2} /><p><strong>Готовые формулировки</strong><span>Для клиента, команды и рабочих границ</span></p></div><div><Focus size={23} strokeWidth={1.2} /><p><strong>Понятный следующий шаг</strong><span>Что попробовать на этой неделе</span></p></div></div></div>

      <section className={`${s.section} ${s.wrap}`} id="situations">
        <div className={s.sectionIntro}><p className={s.eyebrow}>Знакомый рабочий день</p><h2>Дело не заканчивается,<br /><em>когда вы закрываете ноутбук.</em></h2><p>Иногда больше всего сил забирает то, что продолжается в голове. Посмотрите, какая ситуация ближе вам.</p></div>
        <div className={s.situations}>
          {[
            ["Клиент ещё не ответил.", "А вы уже меняете предложение.", "Снова открываете переписку, ищете ошибку и думаете о скидке до того, как услышали возражение."],
            ["Задача делегирована.", "Но остаётся у вас в голове.", "Проверяете каждый этап, переделываете детали и в итоге снова делаете всё сами."],
            ["Попросили совсем немного.", "И рабочий вечер снова занят.", "Согласиться оказывается проще, чем обсудить объём, новый срок или стоимость."],
            ["Следующий шаг понятен.", "Но вы ещё готовитесь.", "Отправить предложение, обсудить условия, запустить услугу — сначала хочется всё предусмотреть."],
          ].map(([title, accent, body]) => <article key={title}><span className={s.situationSign} aria-hidden="true" /><h3>{title}<br /><span>{accent}</span></h3><p>{body}</p></article>)}
        </div>
        <p className={s.sectionFoot}>Для начала достаточно <strong>одного недавнего эпизода.</strong></p>
      </section>

      <section className={`${s.section} ${s.wrap}`} id="example">
        <div className={s.exampleGrid}>
          <div className={s.exampleIntro}><p className={s.eyebrow}>Что останется после практики</p><h2>Ваша ситуация.<br /><em>Ваше решение.</em></h2><p>Вы закончите практику с заполненной картой: что происходит, на что вы можете повлиять и что сделаете дальше.</p><div className={s.casePicker} aria-label="Выберите пример рабочей ситуации">{examples.map((item, i) => <button key={item.label} type="button" aria-pressed={i === selected} onClick={() => setSelected(i)}>{item.label}</button>)}</div><p className={s.smallNote}>Выберите пример и посмотрите, как выглядит готовая карта. Это учебные ситуации.</p><GuideLink placement="example" className={s.exampleCta}>Получить гайд и составить свою карту</GuideLink></div>
          <div className={s.resultCard} aria-live="polite" aria-atomic="true"><div className={s.resultHeader}><span>КАРТА СЛЕДУЮЩЕГО ШАГА</span><Focus size={23} strokeWidth={1} /></div><h3>{example.label}</h3><div className={s.resultRow}><span>Что происходит</span><p>{example.situation}</p></div><div className={s.resultRow}><span>Что я додумываю</span><p>{example.assumption}</p></div><div className={s.resultAction}><span><Check size={16} /> Мой следующий шаг</span><p>{example.action}</p></div><div className={s.resultRow}><span>Что перестаю повторять</span><p>{example.release}</p></div><div className={s.resultCheck}><Clock3 size={18} /><p><strong>Через неделю проверю</strong>{example.question}</p></div></div>
        </div>
      </section>

      <section className={s.insideSection} id="inside"><div className={`${s.wrap} ${s.insideGrid}`}>
        <div className={s.guideVisual}>
          <div className={s.guideOrbit} aria-hidden="true" />
          <div className={s.workbook}>
            <div className={s.bookSpine} /><div className={s.bookTop}><Mark /><span>КОД СМОТРИТЕЛЯ</span></div>
            <span className={s.bookLabel}>ПРАКТИЧЕСКИЙ ГАЙД</span>
            <h2>Работа<br />без постоянного<br /><em>контроля</em></h2>
            <div className={s.bookLine} /><p>Верните внимание<br />тому, что зависит от вас.</p>
            <div className={s.bookSeal}><Focus size={28} strokeWidth={.8} /><span>НАБЛЮДЕНИЕ<br />НАМЕРЕНИЕ · ДЕЙСТВИЕ</span></div>
            <div className={s.bookBottom}>ПО ИДЕЯМ ТРАНСЕРФИНГА <span>PDF · 5 СТРАНИЦ</span></div>
          </div>
          <div className={s.guideInsert}><span>ВАША КАРТА НА 7 ДНЕЙ</span><strong>Мой следующий шаг</strong><p>Что я сделаю · Когда · Что проверю</p><div aria-hidden="true" /><div aria-hidden="true" /><small>Одна ситуация. Одно решение.</small></div>
          <p className={s.guideMockupNote}>Гайд + заполняемая карта + план на неделю</p>
        </div>
        <div><p className={s.eyebrow}>Ваш первый шаг в Трансерфинге</p><h2>Меньше прокручивать.<br /><em>Яснее действовать.</em></h2><p className={s.insideDescription}>Гайд «Работа без постоянного контроля» — короткая практика для момента, когда мыслей о работе уже больше, чем самой работы.</p><ul className={s.contentsList}>{[
          ["Посмотреть глазами Смотрителя", "Записать, что действительно произошло, и заметить, что вы уже успели додумать."],
          ["Снизить избыточную важность", "Разделить полезное участие и повторные проверки, которые не дают новой информации."],
          ["Перевести намерение в действие", "Выбрать свой шаг. Внутри — пример и фразы для разговора с клиентом или командой."],
          ["Составить план на 7 дней", "Определить срок, попробовать новую реакцию и вернуться к карте с результатом."],
        ].map(([title, text]) => <li key={title}><Check size={18} /><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul>
          <div className={s.guideReceive}><GuideLink placement="contents" className={s.primary}><MessageCircle size={18} />Забрать гайд в Telegram</GuideLink><p className={s.ctaNote}>Бесплатно. Откроется чат с готовым запросом —<br />останется отправить сообщение.</p></div>
        </div>
      </div></section>

      <section className={`${s.section} ${s.wrap}`}>
        <div className={s.centerIntro}><p className={s.eyebrow}>Как пройти практику</p><h2>От ситуации — <em>к своему решению.</em></h2></div>
        <div className={s.steps}>
          <article><div className={s.stepIcon}><FileText size={25} strokeWidth={1.3} /></div><h3>Выберите эпизод</h3><p>Возьмите один недавний момент: переписку с клиентом, дополнительную просьбу или задачу, которую трудно отпустить.</p><span>Одна конкретная ситуация</span></article>
          <article><div className={s.stepIcon}><Focus size={25} strokeWidth={1.3} /></div><h3>Заполните карту</h3><p>Посмотрите, что произошло на самом деле, что вы предполагаете и какое действие может помочь сейчас.</p><span>Около 15 минут на разбор</span></article>
          <article><div className={s.stepIcon}><Sparkles size={25} strokeWidth={1.3} /></div><h3>Попробуйте в работе</h3><p>Назначьте срок, сделайте выбранный шаг и вернитесь к карте. Что изменилось? Что стоит сохранить?</p><span>Одна неделя на проверку</span></article>
        </div>
      </section>

      <section className={`${s.courseSection} ${s.wrap}`}><div><p className={s.eyebrow}>Если захочется продолжить</p><h2>Одна практика — начало.<br /><em>Дальше можно идти с поддержкой.</em></h2></div><div><p>В практикуме «Код Смотрителя» вы возвращаетесь к своему запросу через уроки и задания: замечаете привычную реакцию, снижаете лишнее напряжение и пробуете следующие действия.</p><p>Программа и форматы поддержки описаны отдельно. Начните с бесплатного материала и посмотрите, насколько вам подходит такой подход.</p><a href="/course" className={s.textLink}>Познакомиться с практикумом</a></div></section>

      <section className={`${s.section} ${s.wrap} ${s.faqSection}`}><div><p className={s.eyebrow}>Перед началом</p><h2>Возможно,<br /><em>вы хотите уточнить.</em></h2></div><div className={s.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>

      <section className={s.finalSection}><div className={s.finalGlow} aria-hidden="true" /><div className={`${s.wrap} ${s.finalGrid}`}>
        <div className={s.finalGuide} aria-hidden="true"><span>КОД СМОТРИТЕЛЯ</span><Focus size={42} strokeWidth={.7} /><strong>Работа<br />без постоянного<br /><em>контроля</em></strong><small>ПРАКТИЧЕСКИЙ ГАЙД · PDF</small></div>
        <div><p className={s.eyebrow}>Заберите гайд и начните с малого</p><h2>Одна ситуация.<br /><em>Семь дней на новый шаг.</em></h2><p>Возьмите то, что занимает ваши мысли сейчас.<br />Откройте гайд — и найдите действие,<br />которое действительно зависит от вас.</p><GuideLink placement="final" className={s.primary}><MessageCircle size={18} />Получить гайд и план на 7 дней</GuideLink><span className={s.ctaNote}>Бесплатно в Telegram · около 15 минут на первый разбор</span><span className={s.finalNote}>Нажмите кнопку и отправьте готовое сообщение команде.</span></div>
      </div></section>
    </main>

    <footer className={`${s.footer} ${s.wrap}`}><a href="/" className={s.brand}><Mark /><span>Код Смотрителя</span></a><p>Практические материалы по идеям Трансерфинга</p><a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Связаться с командой</a></footer>

  </div>;
}
