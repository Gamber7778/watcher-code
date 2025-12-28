"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-end justify-center bg-deep-space text-foreground">
            <div className="absolute inset-0 z-0">
                {/* Main Hero Image - Full visibility */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("/main_photo_1.png")' }}
                />

                {/* Elegant gradient only at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                
                {/* Extra darkening at very bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10" />
            </div>

            <div className="relative z-20 text-center px-4 sm:px-6 md:px-8 h-full flex flex-col justify-between max-w-7xl mx-auto w-full py-16 sm:py-20 md:py-24">
                {/* Main Title - Elegant and Spacious */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="pt-8 sm:pt-12 md:pt-16"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-cormorant font-light text-foreground tracking-[0.2em] sm:tracking-[0.22em] md:tracking-[0.25em] uppercase leading-[1.1] mb-3 sm:mb-4 md:mb-5">
                        Код Смотрителя
                    </h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-cormorant font-extralight text-flame tracking-[0.2em] sm:tracking-[0.22em] md:tracking-[0.25em] uppercase leading-[1.2]">
                        «Артефакт Намерения»
                    </h2>
                </motion.div>

                {/* Spacer - allows photo to be visible in the middle */}
                <div className="flex-grow"></div>

                {/* Bottom Content Group */}
                <div className="pb-8 sm:pb-12 md:pb-16">
                    {/* Subtitle - Compact and Light */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto"
                    >
                        <p className="text-sm sm:text-base md:text-lg font-manrope font-light text-foreground tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                            Вы не можете изменить отражение, не изменив образ.
                            <br />
                            <span className="text-flame font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">Перестаньте бороться с зеркалом.</span>
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => {
                            const pricingSection = document.querySelector('#pricing');
                            if (pricingSection) {
                                pricingSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        whileHover={{ 
                            scale: 1.03,
                            boxShadow: "0 0 30px rgba(255, 204, 102, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="group relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 border border-flame/50 bg-black/40 backdrop-blur-md text-foreground hover:text-flame hover:border-flame transition-all duration-300 uppercase tracking-[0.25em] text-xs sm:text-sm font-cormorant font-light overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
                    >
                        <span className="relative z-10">Вход в Систему</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-flame/5 to-flame/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
