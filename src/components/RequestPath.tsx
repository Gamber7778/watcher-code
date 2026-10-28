"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
const paths = [
  {label:"Слишком много контроля", title:"Сначала — заметить напряжение", text:"Когда всё кажется решающим, даже небольшой шаг становится экзаменом. Можно начать с того, где значимость результата превращается в лишнее давление.", lesson:"1.9 · Параметры состояния: важность и допускаемость", module:1},
  {label:"Повторяется один сценарий", title:"Увидеть момент привычной реакции", text:"Знакомый разговор, ожидание, обида — и вы снова внутри той же истории. Первый шаг здесь связан с наблюдением: что происходит и как вы на это отвечаете.", lesson:"1.3 · Включение Смотрителя", module:1},
  {label:"Не понимаю, куда двигаться", title:"Вернуться к собственному выбору", text:"Когда хочется перемен, легко застрять между ожиданием и попыткой всё предусмотреть. Полезно различить, чего вы ждёте, что выбираете и какой шаг уже доступен.", lesson:"1.7 · Выбор вместо желания", module:1},
];
export default function RequestPath(){
 const [selected,setSelected]=useState(0);const path=paths[selected];
 return <section id="your-request" className="scroll-mt-24 border-y border-flame/15 bg-[#e8dfd0] px-5 py-16 text-[#28221a] sm:py-24">
  <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
   <div><p className="mb-4 font-manrope text-xs uppercase tracking-[0.2em] text-[#765321]">Ваш запрос — точка входа</p><h2 className="font-cormorant text-4xl leading-tight sm:text-5xl">Что сейчас<br />отзывается вам?</h2><p className="mt-5 max-w-sm font-manrope text-sm leading-[1.85] text-[#574a3a]">Не нужно сразу разбираться во всей программе. Посмотрите, с какой темы можно начать именно в вашей ситуации.</p>
   <div role="group" aria-label="Выберите близкую ситуацию" className="mt-7 flex flex-wrap gap-2">{paths.map((p,i)=><button key={p.label} type="button" aria-pressed={i===selected} onClick={()=>setSelected(i)} className={"min-h-11 rounded-full border px-4 py-3 font-manrope text-xs transition-colors "+(i===selected?'border-[#28221a] bg-[#28221a] text-[#fff2dc]':'border-[#8b7657]/40 hover:bg-white/40')}>{p.label}</button>)}</div></div>
   <div aria-live="polite" aria-atomic="true" className="flex flex-col justify-between border border-[#8b7657]/25 bg-white/35 p-7 sm:p-10"><div><span className="font-cormorant text-5xl italic text-[#9b763a]">0{selected+1}</span><h3 className="mt-5 font-cormorant text-3xl sm:text-4xl">{path.title}</h3><p className="mt-4 font-manrope text-sm leading-[1.9] text-[#574a3a]">{path.text}</p></div><a href={"#module-"+path.module} className="mt-8 flex items-center justify-between gap-5 border-t border-[#8b7657]/25 pt-5 font-manrope text-sm leading-relaxed text-[#624416]">{path.lesson}<ArrowUpRight className="shrink-0" size={20} aria-hidden="true" /></a></div>
  </div>
 </section>;
}
