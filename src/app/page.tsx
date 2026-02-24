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
          <p className="text-xs sm:text-sm">© {new Date().getFullYear()} КОД СМОТРИТЕЛЯ. Все права защищены.</p>
        </div>
      </footer>
    </main>
    </>
  );
}
