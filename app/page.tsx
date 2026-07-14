"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown, Users, Activity, BarChart2, Shield, Zap, Globe, Star, Check, ChevronRight, Sparkles } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { APP_NAME, APP_TAGLINE, kpiCards } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

const revenueData = [
  { month: "Jan", revenue: 52000, users: 18200, churn: 3.1 },
  { month: "Feb", revenue: 58000, users: 19400, churn: 2.9 },
  { month: "Mar", revenue: 61000, users: 20100, churn: 2.8 },
  { month: "Apr", revenue: 67000, users: 21300, churn: 2.6 },
  { month: "May", revenue: 72000, users: 22800, churn: 2.5 },
  { month: "Jun", revenue: 78000, users: 23500, churn: 2.4 },
  { month: "Jul", revenue: 84320, users: 24891, churn: 2.4 },
];

const channelData = [
  { channel: "Organic", value: 38 },
  { channel: "Paid", value: 27 },
  { channel: "Referral", value: 19 },
  { channel: "Direct", value: 16 },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "Nexus Labs",
    avatar: "https://imageio.forbes.com/specials-images/imageserve/5c928fa04bbe6f52641ab341/0x0.jpg?format=jpg&crop=2124,2123,x980,y756,safe&height=416&width=416&fit=bounds",
    quote:
      "Abubakar transformed how we track growth. We cut reporting time by 70% and finally have a single source of truth for every metric that matters.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Rivera",
    role: "CTO",
    company: "Stackflow",
    avatar: "http://tinabangel.com/wp-content/uploads/2015/04/MARCUS-RIVERA.png",
    quote:
      "The real-time dashboards are stunning. Our investors love the clarity, and our team ships faster because everyone sees the same data.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "VP Product",
    company: "Orbit SaaS",
    avatar: "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-1309092,resizemode-75,msid-122368466/industry/cons-products/fmcg/priya-nairs-playbook-how-hindustan-unilevers-new-ceo-built-global-brands-with-indian-roots.jpg",
    quote:
      "Setup took under an hour. Within a week we spotted a churn pattern we had missed for months. The ROI was immediate.",
    stars: 5,
  },
];

const features = [
  {
    id: "f1",
    icon: Activity,
    title: "Real-Time Metrics",
    description:
      "Live data streams update every 30 seconds. No more stale reports — see your business as it happens.",
    color: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.25)",
  },
  {
    id: "f2",
    icon: BarChart2,
    title: "Multi-Metric Dashboards",
    description:
      "Combine MRR, churn, NPS, CAC, and custom KPIs on a single canvas. Drag, resize, and save unlimited layouts.",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    id: "f3",
    icon: Zap,
    title: "Instant Alerts",
    description:
      "Set threshold-based alerts on any metric. Get notified via Slack, email, or webhook before small issues become big problems.",
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    id: "f4",
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. Role-based access, SSO, audit logs, and end-to-end encryption keep your data safe.",
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.25)",
  },
  {
    id: "f5",
    icon: Globe,
    title: "50+ Integrations",
    description:
      "Connect Stripe, HubSpot, Salesforce, Mixpanel, and more in one click. Your data, unified.",
    color: "from-orange-500 to-amber-600",
    glow: "rgba(249,115,22,0.25)",
  },
  {
    id: "f6",
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share dashboards, annotate data points, and build a shared understanding of performance across every team.",
    color: "from-pink-500 to-rose-600",
    glow: "rgba(236,72,153,0.25)",
  },
];

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    period: "mo",
    description: "Perfect for early-stage startups tracking core metrics.",
    features: [
      "5 dashboards",
      "10 data sources",
      "7-day data history",
      "Email alerts",
      "3 team members",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: 149,
    period: "mo",
    description: "For scaling teams that need depth and collaboration.",
    features: [
      "Unlimited dashboards",
      "50 data sources",
      "1-year data history",
      "Slack + email alerts",
      "20 team members",
      "Custom metrics",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    period: "mo",
    description: "Full power for large organizations with complex needs.",
    features: [
      "Unlimited everything",
      "Unlimited data sources",
      "Unlimited history",
      "Custom integrations",
      "Unlimited members",
      "SSO + SAML",
      "Dedicated CSM",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const statsBanner = [
  { value: "12,000+", label: "Companies" },
  { value: "$2.4B", label: "Revenue tracked" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9 / 5", label: "Customer rating" },
];

const chartVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HomePage() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"revenue" | "users" | "churn">(
    "revenue"
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabConfig = {
    revenue: {
      key: "revenue" as const,
      label: t("home.chart_tab_revenue"),
      color: "#6366F1",
      gradientId: "revenueGrad",
      formatter: (v: number) => `$${(v / 1000).toFixed(0)}k`,
    },
    users: {
      key: "users" as const,
      label: t("home.chart_tab_users"),
      color: "#06B6D4",
      gradientId: "usersGrad",
      formatter: (v: number) => `${(v / 1000).toFixed(1)}k`,
    },
    churn: {
      key: "churn" as const,
      label: t("home.chart_tab_churn"),
      color: "#F43F5E",
      gradientId: "churnGrad",
      formatter: (v: number) => `${v}%`,
    },
  };

  const active = tabConfig[activeTab];

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 bg-white dark:bg-[#0A0918]">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/8 dark:bg-violet-500/6 blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("home.hero_badge")}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] text-balance"
              >
                {t("home.hero_title_1")}{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
                  {t("home.hero_title_accent")}
                </span>{" "}
                {t("home.hero_title_2")}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg text-pretty"
              >
                {t("home.hero_subtitle")}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_4px_16px_rgba(99,102,241,0.35)] hover:shadow-[0_0_0_1px_rgba(99,102,241,0.4),0_6px_24px_rgba(99,102,241,0.45)] transition-all duration-300"
                >
                  {t("home.hero_cta_primary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300"
                >
                  {t("home.hero_cta_secondary")}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-10 flex items-center gap-6"
              >
                {[
                  t("home.hero_trust_1"),
                  t("home.hero_trust_2"),
                  t("home.hero_trust_3"),
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — live mini-dashboard preview */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="relative rounded-2xl bg-white dark:bg-[#13112A] border border-slate-200/80 dark:border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_24px_64px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_24px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 dark:border-white/8">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs text-slate-400 dark:text-slate-500 font-mono">
                    {t("home.preview_title")}
                  </span>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-3 gap-3 p-4">
                  {kpiCards.slice(0, 3).map((kpi) => (
                    <div
                      key={kpi.id}
                      className="rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/8 p-3"
                    >
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate">
                        {kpi.label}
                      </p>
                      <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                        {kpi.unit === "$" ? "$" : ""}
                        {kpi.value}
                        {kpi.unit === "%" ? "%" : ""}
                      </p>
                      <div
                        className={`mt-1 flex items-center gap-0.5 text-[10px] font-semibold ${
                          kpi.change >= 0
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }`}
                      >
                        {kpi.change >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {Math.abs(kpi.change)}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sparkline */}
                <div className="px-4 pb-4">
                  <div className="rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/8 p-3">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-2">
                      {t("home.preview_chart_label")}
                    </p>
                    {mounted && (
                      <ResponsiveContainer width="100%" height={80}>
                        <AreaChart
                          data={revenueData}
                          margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                        >
                          <defs>
                            <linearGradient
                              id="heroGrad"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#6366F1"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#6366F1"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#6366F1"
                            strokeWidth={2}
                            fill="url(#heroGrad)"
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-[#1A1830] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    {t("home.badge_mrr_label")}
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    +12.4%
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ─────────────────────────────────────────────────── */}
      <section className="bg-indigo-600 dark:bg-indigo-600/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {statsBanner.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <p className="text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-indigo-200 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LIVE CHART SECTION ───────────────────────────────────────────── */}
      <section
        id="analytics"
        className="py-24 md:py-32 bg-slate-50 dark:bg-[#0D0B1F]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide mb-4">
                {t("home.analytics_eyebrow")}
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
                {t("home.analytics_title")}
              </h2>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-pretty">
                {t("home.analytics_subtitle")}
              </p>
            </motion.div>

            {/* Tab switcher */}
            <motion.div
              variants={fadeIn}
              className="flex justify-center gap-2 mb-8"
            >
              {(["revenue", "users", "churn"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.4)]"
                      : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10"
                  }`}
                >
                  {tabConfig[tab].label}
                </button>
              ))}
            </motion.div>

            {/* Main chart */}
            <motion.div
              variants={chartVariant}
              className="rounded-2xl bg-white dark:bg-[#13112A] border border-slate-200/80 dark:border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_16px_48px_-8px_rgba(0,0,0,0.12)] p-6"
            >
              {mounted && (
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id={active.gradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={active.color}
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor={active.color}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(148,163,184,0.15)"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: "#94A3B8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94A3B8" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={active.formatter}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(15,14,26,0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "13px",
                      }}
                      formatter={(value: number) => [
                        active.formatter(value),
                        active.label,
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey={active.key}
                      stroke={active.color}
                      strokeWidth={2.5}
                      fill={`url(#${active.gradientId})`}
                      dot={{ fill: active.color, r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </motion.div>

            {/* Secondary charts row */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Bar chart */}
              <motion.div
                variants={slideInLeft}
                className="rounded-2xl bg-white dark:bg-[#13112A] border border-slate-200/80 dark:border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-6"
              >
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                  {t("home.chart_acquisition_title")}
                </h3>
                {mounted && (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                      data={channelData}
                      margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(148,163,184,0.15)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="channel"
                        tick={{ fontSize: 11, fill: "#94A3B8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#94A3B8" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `${v}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(15,14,26,0.95)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                        formatter={(v: number) => [`${v}%`, "Share"]}
                      />
                      <Bar
                        dataKey="value"
                        fill="#6366F1"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </motion.div>

              {/* Line chart */}
              <motion.div
                variants={slideInRight}
                className="rounded-2xl bg-white dark:bg-[#13112A] border border-slate-200/80 dark:border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-6"
              >
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                  {t("home.chart_churn_title")}
                </h3>
                {mounted && (
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart
                      data={revenueData}
                      margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(148,163,184,0.15)"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#94A3B8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#94A3B8" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `${v}%`}
                        domain={[2, 3.5]}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(15,14,26,0.95)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                        formatter={(v: number) => [`${v}%`, "Churn"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="churn"
                        stroke="#F43F5E"
                        strokeWidth={2.5}
                        dot={{ fill: "#F43F5E", r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-24 md:py-32 bg-white dark:bg-[#0A0918]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="max-w-2xl mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide mb-4">
                {t("home.features_eyebrow")}
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
                {t("home.features_title")}
              </h2>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed text-pretty">
                {t("home.features_subtitle")}
              </p>
            </motion.div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Large feature */}
              <motion.div
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="md:col-span-2 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/8 dark:to-violet-500/8 border border-indigo-100 dark:border-indigo-500/15 p-8 relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-indigo-400/10 blur-3xl"
                />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(99,102,241,0.35)]">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {features[0]?.title ?? ""}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                  {features[0]?.description ?? ""}
                </p>
              </motion.div>

              {/* Tall feature */}
              <motion.div
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-500/8 dark:to-purple-500/8 border border-violet-100 dark:border-violet-500/15 p-8 relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-violet-400/10 blur-3xl"
                />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(139,92,246,0.35)]">
                  <BarChart2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {features[1]?.title ?? ""}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {features[1]?.description ?? ""}
                </p>
              </motion.div>

              {/* Remaining 4 in a 2x2 */}
              {features.slice(2).map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.id}
                    variants={scaleIn}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="rounded-2xl bg-slate-50 dark:bg-white/4 border border-slate-100 dark:border-white/8 p-6 relative overflow-hidden group"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at 80% 20%, ${feat.glow}, transparent 70%)`,
                      }}
                    />
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 md:py-32 bg-slate-50 dark:bg-[#0D0B1F]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide mb-4">
                {t("home.testimonials_eyebrow")}
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
                {t("home.testimonials_title")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  custom={i}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  className="rounded-2xl bg-white dark:bg-[#13112A] border border-slate-200/80 dark:border-white/10 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: item.stars }).map((_, si) => (
                      <Star
                        key={si}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1 text-sm">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-500/20"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=6366F1&color=fff&size=80`;
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {item.role}, {item.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="py-24 md:py-32 bg-white dark:bg-[#0A0918]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide mb-4">
                {t("home.pricing_eyebrow")}
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
                {t("home.pricing_title")}
              </h2>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-pretty">
                {t("home.pricing_subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 items-start">
              {pricingPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-2xl p-8 relative overflow-hidden ${
                    plan.highlighted
                      ? "bg-indigo-600 border border-indigo-500 shadow-[0_4px_8px_rgba(99,102,241,0.2),0_24px_64px_-12px_rgba(99,102,241,0.4)]"
                      : "bg-slate-50 dark:bg-[#13112A] border border-slate-200/80 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
                  }`}
                >
                  {plan.highlighted && (
                    <div
                      aria-hidden
                      className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"
                    />
                  )}
                  {plan.highlighted && (
                    <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase mb-4">
                      {t("home.pricing_popular")}
                    </span>
                  )}
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      plan.highlighted
                        ? "text-white"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-5 ${
                      plan.highlighted
                        ? "text-indigo-200"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-1 mb-6">
                    <span
                      className={`text-4xl font-extrabold tracking-tight ${
                        plan.highlighted
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      ${plan.price}
                    </span>
                    <span
                      className={`text-sm mb-1.5 ${
                        plan.highlighted
                          ? "text-indigo-200"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                            plan.highlighted
                              ? "bg-white/20"
                              : "bg-indigo-100 dark:bg-indigo-500/15"
                          }`}
                        >
                          <Check
                            className={`w-2.5 h-2.5 ${
                              plan.highlighted
                                ? "text-white"
                                : "text-indigo-600 dark:text-indigo-400"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm ${
                            plan.highlighted
                              ? "text-indigo-100"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dashboard"
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-white text-indigo-600 hover:bg-indigo-50 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                        : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_2px_8px_rgba(99,102,241,0.3)]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 md:py-32 bg-slate-50 dark:bg-[#0D0B1F]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={scaleIn}
              className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 md:p-16 overflow-hidden shadow-[0_4px_8px_rgba(99,102,241,0.15),0_32px_80px_-16px_rgba(99,102,241,0.5)]"
            >
              <div
                aria-hidden
                className="absolute inset-0 overflow-hidden rounded-3xl"
              >
                <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />
              </div>

              <div className="relative">
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance"
                >
                  {t("home.cta_title")}
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="mt-4 text-lg text-indigo-200 max-w-xl mx-auto text-pretty"
                >
                  {t("home.cta_subtitle")}
                </motion.p>
                <motion.div
                  variants={fadeInUp}
                  className="mt-8 flex flex-wrap justify-center gap-3"
                >
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-indigo-600 font-bold text-sm hover:bg-indigo-50 shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300"
                  >
                    {t("home.cta_button_primary")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/analytics"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300"
                  >
                    {t("home.cta_button_secondary")}
                  </Link>
                </motion.div>
                <motion.p
                  variants={fadeIn}
                  className="mt-5 text-xs text-indigo-300"
                >
                  {t("home.cta_footnote")}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}