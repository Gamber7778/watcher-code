"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { name: "Пробуждение", href: "#awakening" },
        { name: "Артефакт", href: "#artifact" },
        { name: "Система", href: "#architecture" },
        { name: "Аудио", href: "#audio" },
        { name: "Сообщество", href: "#community" },
        { name: "Цены", href: "#pricing" },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-black/90 backdrop-blur-xl border-b border-flame/20 shadow-lg"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo */}
                        <motion.a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-flame/60 flex items-center justify-center group-hover:border-flame transition-colors duration-300">
                                <span className="text-flame text-sm sm:text-base font-cormorant font-light">КС</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xs sm:text-sm font-cormorant font-light tracking-[0.2em] text-foreground uppercase group-hover:text-flame transition-colors duration-300" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)' }}>
                                    Код Смотрителя
                                </h1>
                            </div>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {menuItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.href);
                                    }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="px-3 xl:px-4 py-2 text-xs xl:text-sm font-manrope font-extralight text-foreground/70 hover:text-flame tracking-wider uppercase transition-colors duration-300 relative group cursor-pointer"
                                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-flame group-hover:w-full transition-all duration-300"></span>
                                </motion.a>
                            ))}
                        </nav>

                        {/* CTA Button Desktop */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                const artifactSection = document.querySelector('#artifact');
                                if (artifactSection) {
                                    artifactSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="hidden lg:block px-5 xl:px-6 py-2 border border-flame/50 bg-black/40 backdrop-blur-md text-foreground hover:text-flame hover:border-flame transition-all duration-300 uppercase tracking-[0.2em] text-xs font-cormorant font-light cursor-pointer"
                            style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}
                        >
                            Войти
                        </motion.button>

                        {/* Mobile Menu Button - показуємо тільки коли меню закрите */}
                        {!isMobileMenuOpen && (
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden p-2 text-foreground hover:text-flame transition-colors duration-300"
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-50 lg:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-deep-space border-l border-flame/20 shadow-2xl overflow-y-auto"
                        >
                            {/* Close Button - абсолютно позиціонований зверху */}
                            <div className="sticky top-0 z-10 bg-deep-space/95 backdrop-blur-md border-b border-flame/10 px-6 py-4 flex justify-end">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-foreground hover:text-flame transition-colors duration-300 border border-flame/20 rounded-sm hover:border-flame hover:bg-flame/5"
                                    aria-label="Close menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 sm:p-8">
                                {/* Logo */}
                                <div className="mb-10">
                                    <h2 className="text-xl font-cormorant font-light tracking-[0.25em] text-flame uppercase">
                                        Код Смотрителя
                                    </h2>
                                    <p className="text-xs font-manrope font-extralight text-foreground/60 tracking-wider mt-2">
                                        Артефакт Намерения
                                    </p>
                                </div>

                                {/* Menu Items */}
                                <nav className="space-y-1">
                                    {menuItems.map((item, index) => (
                                        <motion.a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection(item.href);
                                            }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * index }}
                                            className="block px-4 py-3 text-base font-manrope font-extralight text-foreground/80 hover:text-flame hover:bg-flame/5 tracking-wider uppercase transition-all duration-300 border-l-2 border-transparent hover:border-flame cursor-pointer"
                                        >
                                            {item.name}
                                        </motion.a>
                                    ))}
                                </nav>

                                {/* CTA Button Mobile */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={() => {
                                        const artifactSection = document.querySelector('#artifact');
                                        if (artifactSection) {
                                            artifactSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full mt-8 px-6 py-3 border border-flame/50 bg-black/40 backdrop-blur-md text-foreground hover:text-flame hover:border-flame transition-all duration-300 uppercase tracking-[0.2em] text-sm font-cormorant font-light cursor-pointer"
                                >
                                    Войти в Систему
                                </motion.button>

                                {/* Footer Info */}
                                <div className="mt-12 pt-6 border-t border-flame/10">
                                    <p className="text-xs font-manrope font-extralight text-foreground/50 text-center">
                                        © {new Date().getFullYear()} КОД СМОТРИТЕЛЯ
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

