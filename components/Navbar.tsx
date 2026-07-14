"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, User, Activity } from 'lucide-react';
import { navLinks, APP_NAME } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const resolveHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0F0E1A]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              {t("nav.brand")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const href = resolveHref(link.href);
              return (
                <Link
                  key={link.href}
                  href={href}
                  onClick={
                    link.type === "anchor"
                      ? (e) => handleAnchorClick(e, link.href)
                      : undefined
                  }
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {t(`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}`)}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              aria-label={t("nav.notifications")}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200"
            >
              <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#0F0E1A]" />
            </button>
            <button
              aria-label={t("nav.profile")}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-[0_0_8px_rgba(99,102,241,0.3)] hover:shadow-[0_0_16px_rgba(99,102,241,0.5)] transition-all duration-200"
            >
              <User className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t("nav.menu")}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#0F0E1A]/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const href = resolveHref(link.href);
                return (
                  <Link
                    key={link.href}
                    href={href}
                    onClick={
                      link.type === "anchor"
                        ? (e) => handleAnchorClick(e, link.href)
                        : () => setMobileOpen(false)
                    }
                    className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {t(`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}`)}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}