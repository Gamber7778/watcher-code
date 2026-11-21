export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-deep-space px-5 pb-14 pt-32 sm:min-h-[90svh] sm:pb-20 sm:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: 'url("/main_photo_1.png")' }} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/10 to-black/30" />
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-6 text-sm uppercase tracking-[0.22em] text-flame">Код Смотрителя · Практикум Трансерфинга</p>
        <h1 className="max-w-3xl font-cormorant text-5xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">Заметьте свой сценарий.<br /><span className="text-flame">Начните действовать иначе.</span></h1>
        <p className="mt-7 max-w-2xl text-base leading-[1.8] text-foreground sm:text-lg">Если знакомые ситуации повторяются, одного понимания бывает мало. На практикуме вы учитесь замечать свои реакции, снижать лишнее напряжение и делать конкретные шаги в своей жизни.</p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/85">Видеоуроки и тексты · Практические задания · Обратная связь<br />На учебной платформе, в вашем темпе.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#video" className="inline-flex min-h-13 items-center justify-center border border-flame bg-flame px-7 py-4 text-base font-semibold text-black transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame">Посмотреть видео · 1:15</a>
          <a href="#pricing" className="inline-flex min-h-13 items-center justify-center border border-foreground/40 bg-black/40 px-7 py-4 text-base text-foreground hover:border-flame hover:text-flame focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame">Выбрать формат участия</a>
        </div>
        <p className="mt-5 text-sm text-foreground/75">Полная программа с поддержкой — $95 / 7 900 ₽</p>
      </div>
    </section>
  );
}
