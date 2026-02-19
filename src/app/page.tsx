import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Block1Awakening from "@/components/Block1_Awakening";
import Block2Artifact from "@/components/Block2_Artifact";
import Block3Architecture from "@/components/Block3_Architecture";
import Block4Audio from "@/components/Block4_Audio";
import Block5Community from "@/components/Block5_Community";
import Block5_5_Testimonials from "@/components/Block5_5_Testimonials";
import Block6Pricing from "@/components/Block6_Pricing";
import Block7Quiz from "@/components/Block7_Quiz";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-deep-space text-foreground overflow-x-hidden w-full relative isolate">
      <HeroSection />
      <Block1Awakening />
      <Block2Artifact />
      <Block3Architecture />
      <Block4Audio />
      <Block5Community />
      <Block5_5_Testimonials />
      <Block6Pricing />
      <Block7Quiz />

      <footer className="py-8 sm:py-10 md:py-12 bg-black text-center text-gray-600 font-manrope px-4">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 p-4 sm:p-6 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-400">Важное уведомление:</span> Данный проект представляет собой образовательный практикум, 
              основанный на принципах и методах Трансерфинга реальности Вадима Зеланда. Автор проекта не является 
              Вадимом Зеландом и не представляет его официально. Все материалы, практики и методики на данном 
              сайте — это личный анализ, интерпретация и практические разработки автора, основанные на изучении 
              работ В. Зеланда. Информация предоставляется исключительно в образовательных целях.
            </p>
          </div>
          <p className="text-xs sm:text-sm">© {new Date().getFullYear()} КОД СМОТРИТЕЛЯ. Все права защищены.</p>
        </div>
      </footer>
    </main>
    </>
  );
}
