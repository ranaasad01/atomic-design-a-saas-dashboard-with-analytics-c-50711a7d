"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { navLinks, APP_NAME } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resolveHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const currentYear = 2024;

  return (
    <footer className="bg-white dark:bg-[#0A0918] border-t border-slate-200/60 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                {t("nav.brand")}
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: Github,   label: "GitHub"   },
                { icon: Twitter,  label: "Twitter"  },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              {t("footer.nav_heading")}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => {
                const href = resolveHref(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={href}
                      onClick={
                        link.type === "anchor"
                          ? (e) => handleAnchorClick(e, link.href)
                          : undefined
                      }
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {t(`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              {t("footer.legal_heading")}
            </h3>
            <ul className="space-y-2.5">
              {[
                { key: "footer.privacy", label: t("footer.privacy") },
                { key: "footer.terms",   label: t("footer.terms")   },
                { key: "footer.cookies", label: t("footer.cookies") },
              ].map(({ key, label }) => (
                <li key={key}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {t("footer.copyright", { year: currentYear, brand: APP_NAME })}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {t("footer.built_with")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}