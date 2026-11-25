"use client";

import { useRef, useState } from "react";
import { Check, Clock3, Download, FileText, Focus, MessageCircle, Plus, Sparkles, X } from "lucide-react";
import PracticeVideo from "./practice-video";
import s from "./practice.module.css";

const PDF = "/practices/work-without-constant-control.pdf";
const TELEGRAM = "https://t.me/vadim_official_z";
const examples = [
  { label: "Клиент молчит", situation: "Отправил предложение. Ответа нет. Снова открываю переписку и думаю о скидке.", assumption: "«Цена слишком высокая. Я потеряю заказ».", action: "Завтра в 11:00 уточню, когда удобно вернуться к решению по предложению.", release: "До этого момента проверяю ответ в обычные рабочие окна и занимаюсь текущим проектом.", question: "Удалось вернуться к работе без постоянных проверок?" },
  { label: "Всё делаю сам", situation: "Передал задачу сотруднику, но проверяю каждую деталь и переделываю за него.", assumption: "«Без меня всё будет сделано неправильно».", action: "Сегодня согласую результат, срок и одну промежуточную точку проверки.", release: "Между проверками не вмешиваюсь без новой информации. Срочные вопросы обсудим отдельно.", question: "Сохранилось качество без проверки каждого действия?" },
  { label: "Беру лишнее", situation: "Клиент просит ещё одну доработку. Соглашаюсь, хотя на неё снова уйдёт весь вечер.", assumption: "«Если обсужу условия, клиент больше не вернётся».", action: "До начала работы уточню объём и предложу согласовать новый срок или отдельную стоимость.", release: "Не обещаю дополнительную работу, пока не проверю текущие договорённости и свою загрузку.", question: "Получилось обсудить условия до начала работы?" },
];
const faqs = [
  ["Нужно ли знать Трансерфинг?", "Нет. В практике есть понятная последовательность и заполненный пример. Идеи наблюдения и снижения важности объясняются через обычные рабочие ситуации."],
  ["Сколько времени потребуется?", "На первый разбор запланируйте около 15 минут. Затем попробуйте выбранное действие в течение недели. Каждый день заполнять большой отчёт не нужно."],
  ["Что я получу бесплатно?", "PDF на пяти страницах: короткую практику, заполненный пример, фразы для рабочих разговоров, шаблон своей карты и план на 7 дней. Файл можно сохранить сразу, без оплаты и регистрации."],
  ["Это личная консультация?", "Это самостоятельная практика. Вы выбираете ситуацию и заполняете карту. Если захотите узнать о дополнительной поддержке, можно обратиться к команде в Telegram."],
  ["А если контроль действительно необходим?", "Сохраните проверки, от которых зависят качество, сроки и безопасность. В практике вы ищете повторные действия, которые уже не дают новой информации. Условия работы и срочные сигналы лучше согласовать заранее."],
  ["Что будет после бесплатной практики?", "Вы сможете пользоваться материалом самостоятельно или познакомиться с практикумом «Код Смотрителя». Программа и форматы поддержки доступны отдельно. Покупка для получения PDF не нужна."],
];

function Mark() { return <span className={s.brandMark} aria-hidden="true"><span /></span>; }
function track(event: string, placement: string) {
  const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
  analytics.gtag?.("event", event, { content_name: "work_without_constant_control", placement });
}

export default function PracticeLanding() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const example = examples[selected];
  const openPractice = (placement: string) => { track("practice_cta_click", placement); dialog.current?.showModal(); };

  return <div className={s.page}>
    <a href="#content" className={s.skip}>К содержанию</a>
    <header className={s.header}>
      <a href="/" className={s.brand}><Mark /><span>Код Смотрителя<small>Трансерфинг в повседневной жизни</small></span></a>
      <nav aria-label="Навигация по практике"><a href="#inside">О практике</a><a href="#example">Пример результата</a><button onClick={() => openPractice("header")} className={s.headerCta}>Получить бесплатно</button></nav>
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
          <p className={s.heroVideoNote}>Посмотрите видео. Затем разберите <strong>одну свою ситуацию.</strong></p>
        </div>
        <div className={s.heroAction}>
          <p className={s.heroDescription}>Бесплатная практика поможет разобрать ситуацию с клиентом, задачей или командой — и составить план следующего шага на 7 дней.</p>
          <button className={s.primary} onClick={() => openPractice("hero")}>Получить практику бесплатно</button>
          <p className={s.ctaNote}>PDF и карта действий · без регистрации</p>
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
          <div className={s.exampleIntro}><p className={s.eyebrow}>Что останется после практики</p><h2>Ваша ситуация.<br /><em>Ваше решение.</em></h2><p>Вы закончите практику с заполненной картой: что происходит, на что вы можете повлиять и что сделаете дальше.</p><div className={s.casePicker} aria-label="Выберите пример рабочей ситуации">{examples.map((item, i) => <button key={item.label} type="button" aria-pressed={i === selected} onClick={() => setSelected(i)}>{item.label}</button>)}</div><p className={s.smallNote}>Выберите пример и посмотрите, как выглядит готовая карта. Это учебные ситуации.</p><button className={s.exampleCta} onClick={() => openPractice("example")}>Составить свою карту</button></div>
          <div className={s.resultCard} aria-live="polite" aria-atomic="true"><div className={s.resultHeader}><span>КАРТА СЛЕДУЮЩЕГО ШАГА</span><Focus size={23} strokeWidth={1} /></div><h3>{example.label}</h3><div className={s.resultRow}><span>Что происходит</span><p>{example.situation}</p></div><div className={s.resultRow}><span>Что я додумываю</span><p>{example.assumption}</p></div><div className={s.resultAction}><span><Check size={16} /> Мой следующий шаг</span><p>{example.action}</p></div><div className={s.resultRow}><span>Что перестаю повторять</span><p>{example.release}</p></div><div className={s.resultCheck}><Clock3 size={18} /><p><strong>Через неделю проверю</strong>{example.question}</p></div></div>
        </div>
      </section>

      <section className={s.insideSection} id="inside"><div className={`${s.wrap} ${s.insideGrid}`}>
        <div className={s.workbook}><div className={s.bookSpine} /><div className={s.bookTop}><Mark /><span>КОД СМОТРИТЕЛЯ</span></div><span className={s.bookLabel}>ПРАКТИКА ДЛЯ РАБОТЫ</span><h2>Работа<br />без постоянного<br /><em>контроля</em></h2><div className={s.bookLine} /><p>Одна рабочая ситуация.<br />Одно решение.<br />План на 7 дней.</p><div className={s.bookBottom}>ПРАКТИЧЕСКИЙ МАТЕРИАЛ <span>PDF / 5 СТРАНИЦ</span></div></div>
        <div><p className={s.eyebrow}>Всё необходимое для первого шага</p><h2>Материал, с которым<br /><em>можно работать.</em></h2><p className={s.insideDescription}>Сохраните практику на телефон. Заполните карту в заметках или на бумаге — как вам удобнее.</p><ul className={s.contentsList}>{[
          ["Короткая практика", "Отделить факты от предположений и найти действие, которое зависит от вас."],
          ["Пример и готовые фразы", "Как обсудить условия, передать задачу и договориться о рабочих часах."],
          ["Ваша карта действий", "Одна страница с решением, сроком и нужной точкой проверки."],
          ["План на 7 дней", "Попробовать новый шаг, заметить результат и скорректировать подход."],
        ].map(([title, text]) => <li key={title}><Check size={18} /><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul><button className={s.primary} onClick={() => openPractice("contents")}>Забрать бесплатную практику</button><p className={s.ctaNote}>PDF доступен сразу. Покупка не требуется.</p></div>
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

      <section className={s.finalSection}><div className={s.finalGlow} aria-hidden="true" /><div className={s.wrap}><p className={s.eyebrow}>Начните со своей ситуации</p><h2>Не обязательно решать всё.<br /><em>Выберите следующий шаг.</em></h2><p>Что сделать. Что обсудить.<br />Что перестать постоянно перепроверять.</p><button className={s.primary} onClick={() => openPractice("final")}>Получить практику и план на 7 дней</button><span className={s.ctaNote}>Бесплатный PDF · около 15 минут · можно начать сегодня</span></div></section>
    </main>

    <footer className={`${s.footer} ${s.wrap}`}><a href="/" className={s.brand}><Mark /><span>Код Смотрителя</span></a><p>Практические материалы по идеям Трансерфинга</p><a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Связаться с командой</a></footer>

    <dialog ref={dialog} className={s.dialog} aria-label="Получить бесплатную практику" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className={s.dialogContent}><button className={s.closeDialog} onClick={() => dialog.current?.close()} aria-label="Закрыть"><X size={23} /></button><div className={s.dialogIcon}><FileText size={30} strokeWidth={1.2} /></div><p className={s.eyebrow}>Ваша практика готова</p><h2>Один шаг.<br /><em>На вашей стороне.</em></h2><p>Сохраните материал и выберите ситуацию. На четвёртой странице — карта, которую вы заполните для себя.</p><a href={PDF} download="Работа-без-постоянного-контроля.pdf" className={s.primary} onClick={() => track("practice_pdf_download", "dialog")}><Download size={19} />Скачать практику · PDF</a><span className={s.ctaNote}>5 страниц · бесплатно · без регистрации</span><div className={s.dialogContact}><MessageCircle size={18} /><p>Хотите уточнить формат поддержки?<a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Напишите команде в Telegram</a></p></div></div>
    </dialog>
  </div>;
}
