import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[780px] items-center overflow-hidden bg-black px-5 pb-12 pt-32 sm:min-h-[850px] sm:px-8 lg:min-h-[900px] lg:py-40">
      <div className="absolute inset-0 -z-20 lg:left-[28%]">
        <Image src="/main_photo_1.png" alt="" fill priority sizes="(min-width: 1024px) 72vw, 100vw" quality={80} className="object-cover object-center opacity-55 lg:opacity-85" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/65 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-deep-space to-transparent" />
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-7 font-manrope text-xs uppercase tracking-[0.22em] text-flame">Практикум Трансерфинга</p>
          <h1 className="font-cormorant text-6xl font-light leading-[0.95] tracking-tight text-foreground sm:text-8xl lg:text-[108px]">Код<br /><span className="italic text-flame">Смотрителя</span></h1>
          <p className="mt-8 max-w-lg font-cormorant text-2xl leading-snug text-foreground sm:text-3xl">Когда привычный сценарий повторяется,<br className="hidden sm:block" /> начните с того, что можете заметить.</p>
          <p className="mt-5 max-w-md font-manrope text-sm leading-[1.9] text-foreground/75 sm:text-base">Уроки, домашние задания и живая обратная связь — чтобы связать идеи Трансерфинга с вашей жизнью: решениями, отношениями и тем, к чему вы стремитесь.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#your-request" className="inline-flex min-h-12 items-center gap-3 bg-flame px-6 py-4 font-manrope text-sm font-semibold text-black transition-colors hover:bg-foreground">С чего начать <ArrowDown size={17} aria-hidden="true" /></a>
            <a href="#architecture" className="inline-flex min-h-12 items-center gap-3 border border-foreground/30 bg-black/20 px-6 py-4 font-manrope text-sm text-foreground hover:border-flame">Посмотреть программу <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <p className="mt-10 border-l border-flame/40 pl-4 font-manrope text-xs leading-relaxed text-foreground/60">В своём темпе. С вниманием к своему запросу.<br />Без необходимости менять всю жизнь за один день.</p>
        </div>
      </div>
    </section>
  );
}
