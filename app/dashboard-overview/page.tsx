"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, Download, RefreshCw, Eye, ShoppingCart, Star, Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 48500, expenses: 30000, profit: 18500 },
  { month: "Mar", revenue: 51200, expenses: 31500, profit: 19700 },
  { month: "Apr", revenue: 46800, expenses: 29000, profit: 17800 },
  { month: "May", revenue: 59300, expenses: 34000, profit: 25300 },
  { month: "Jun", revenue: 63100, expenses: 36000, profit: 27100 },
  { month: "Jul", revenue: 71400, expenses: 38500, profit: 32900 },
  { month: "Aug", revenue: 68900, expenses: 37000, profit: 31900 },
  { month: "Sep", revenue: 74200, expenses: 40000, profit: 34200 },
  { month: "Oct", revenue: 79800, expenses: 42000, profit: 37800 },
  { month: "Nov", revenue: 82100, expenses: 43500, profit: 38600 },
  { month: "Dec", revenue: 84320, expenses: 45000, profit: 39320 },
];

const userGrowthData = [
  { week: "W1", new: 320, returning: 1840, churned: 42 },
  { week: "W2", new: 410, returning: 2010, churned: 38 },
  { week: "W3", new: 380, returning: 2200, churned: 55 },
  { week: "W4", new: 520, returning: 2380, churned: 31 },
  { week: "W5", new: 490, returning: 2540, churned: 47 },
  { week: "W6", new: 610, returning: 2720, churned: 29 },
  { week: "W7", new: 580, returning: 2890, churned: 36 },
  { week: "W8", new: 720, returning: 3100, churned: 22 },
];

const channelData = [
  { name: "Organic Search", value: 38, color: "#6366F1" },
  { name: "Direct", value: 24, color: "#8B5CF6" },
  { name: "Referral", value: 18, color: "#06B6D4" },
  { name: "Social Media", value: 12, color: "#10B981" },
  { name: "Paid Ads", value: 8, color: "#F59E0B" },
];

const conversionData = [
  { stage: "Visitors", count: 48200, rate: 100 },
  { stage: "Sign-ups", count: 9640, rate: 20 },
  { stage: "Trial", count: 3856, rate: 8 },
  { stage: "Paid", count: 1542, rate: 3.2 },
  { stage: "Retained", count: 1234, rate: 2.6 },
];

const recentTransactions = [
  { id: "TXN-8821", customer: "Meridian Corp", plan: "Enterprise", amount: 2400, status: "completed", date: "Dec 18" },
  { id: "TXN-8820", customer: "Stackflow Inc", plan: "Pro", amount: 149, status: "completed", date: "Dec 18" },
  { id: "TXN-8819", customer: "Novalabs", plan: "Pro", amount: 149, status: "pending", date: "Dec 17" },
  { id: "TXN-8818", customer: "Brightpath", plan: "Starter", amount: 49, status: "completed", date: "Dec 17" },
  { id: "TXN-8817", customer: "Orion Systems", plan: "Enterprise", amount: 2400, status: "failed", date: "Dec 16" },
  { id: "TXN-8816", customer: "Vantage AI", plan: "Pro", amount: 149, status: "completed", date: "Dec 16" },
  { id: "TXN-8815", customer: "Clearview Tech", plan: "Starter", amount: 49, status: "completed", date: "Dec 15" },
];

const topProducts = [
  { name: "Enterprise Plan", revenue: 48000, users: 20, growth: 18.2 },
  { name: "Pro Plan", revenue: 26700, users: 179, growth: 12.4 },
  { name: "Starter Plan", revenue: 9620, users: 196, growth: 7.1 },
];

const kpiStats = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$84,320",
    change: 12.4,
    icon: DollarSign,
    color: "indigo",
    sparkline: [62, 68, 71, 65, 74, 78, 84],
  },
  {
    id: "users",
    label: "Active Users",
    value: "24,891",
    change: 8.7,
    icon: Users,
    color: "violet",
    sparkline: [18, 19, 21, 20, 22, 23, 25],
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "2.4%",
    change: -0.3,
    icon: TrendingDown,
    color: "cyan",
    sparkline: [3.1, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4],
  },
  {
    id: "nps",
    label: "Net Promoter Score",
    value: "72",
    change: 5.0,
    icon: Star,
    color: "emerald",
    sparkline: [58, 61, 63, 65, 68, 70, 72],
  },
];

const colorMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
  indigo: {
    bg: "bg-indigo-500/10 dark:bg-indigo-500/15",
    text: "text-indigo-600 dark:text-indigo-400",
    ring: "ring-indigo-500/20",
    glow: "rgba(99,102,241,0.15)",
  },
  violet: {
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    text: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-500/20",
    glow: "rgba(139,92,246,0.15)",
  },
  cyan: {
    bg: "bg-cyan-500/10 dark:bg-cyan-500/15",
    text: "text-cyan-600 dark:text-cyan-400",
    ring: "ring-cyan-500/20",
    glow: "rgba(6,182,212,0.15)",
  },
  emerald: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/20",
    glow: "rgba(16,185,129,0.15)",
  },
};

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; cls: string }> = {
  completed: { label: "Completed", icon: CheckCircle, cls: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10" },
  pending: { label: "Pending", icon: Clock, cls: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10" },
  failed: { label: "Failed", icon: AlertCircle, cls: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10" },
};

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const fill = `${pts.join(" ")} ${w},${h} 0,${h}`;
  const color = positive ? "#6366F1" : "#06B6D4";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill={`url(#sg-${positive})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#1A1830] border border-slate-200/60 dark:border-white/10 rounded-xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-xs">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-500 dark:text-slate-400 capitalize">{entry.name}:</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {typeof entry.value === "number" ? entry.value.toLocaleString("en-US") : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardOverviewPage() {
  const t = useTranslations();
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "90d" | "1y">("1y");
  const [activeChart, setActiveChart] = useState<"revenue" | "users">("revenue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ranges: Array<"7d" | "30d" | "90d" | "1y"> = ["7d", "30d", "90d", "1y"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0918] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold ring-1 ring-indigo-500/20">
                <Activity className="w-3 h-3" />
                {t("dashboard.live")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t("dashboard.title")}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("dashboard.subtitle")}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-xl p-1">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeRange === r
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
              <Download className="w-3.5 h-3.5" />
              {t("dashboard.export")}
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
              <RefreshCw className="w-3.5 h-3.5" />
              {t("dashboard.refresh")}
            </button>
          </motion.div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {kpiStats.map((kpi) => {
            const Icon = kpi.icon;
            const c = colorMap[kpi.color] ?? colorMap["indigo"];
            const isPositive = kpi.change >= 0;
            const isChurn = kpi.id === "churn";
            const good = isChurn ? !isPositive : isPositive;
            return (
              <motion.div
                key={kpi.id}
                variants={scaleIn}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_-12px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg} ring-1 ${c.ring}`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${
                      good
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                        : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10"
                    }`}
                  >
                    {good ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(kpi.change)}%
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(`kpi.${kpi.id}`)}</p>
                    <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{kpi.value}</p>
                  </div>
                  {mounted && (
                    <div className="opacity-80">
                      <MiniSparkline data={kpi.sparkline} positive={good} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Revenue / Users Area Chart — spans 2 cols */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">{t("chart.revenue_title")}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t("chart.revenue_sub")}</p>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 rounded-xl p-1">
                {(["revenue", "users"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveChart(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeChart === tab
                        ? "bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    {t(`chart.tab_${tab}`)}
                  </button>
                ))}
              </div>
            </div>
            {mounted && (
              <ResponsiveContainer width="100%" height={240}>
                {activeChart === "revenue" ? (
                  <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                    <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: "#6366F1" }} />
                    <Area type="monotone" dataKey="profit" stroke="#06B6D4" strokeWidth={2} fill="url(#profGrad)" dot={false} activeDot={{ r: 4, fill: "#06B6D4" }} />
                  </AreaChart>
                ) : (
                  <BarChart data={userGrowthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                    <Bar dataKey="new" fill="#6366F1" radius={[4, 4, 0, 0]} maxBarSize={28} />
                    <Bar dataKey="returning" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={28} />
                    <Bar dataKey="churned" fill="#F87171" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Traffic Channels Pie */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-1">{t("chart.channels_title")}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{t("chart.channels_sub")}</p>
            {mounted && (
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, ""]} contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid rgba(148,163,184,0.2)" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="space-y-2 mt-2">
              {channelData.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ch.color }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{ch.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{ch.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Conversion Funnel + Top Plans Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          {/* Conversion Funnel */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-1">{t("chart.funnel_title")}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{t("chart.funnel_sub")}</p>
            <div className="space-y-3">
              {conversionData.map((stage, i) => {
                const widths = [100, 20, 8, 3.2, 2.6];
                const colors = ["#6366F1", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"];
                return (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{(stage.count ?? 0).toLocaleString("en-US")}</span>
                        <span className="text-xs font-semibold" style={{ color: colors[i] }}>{stage.rate}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${widths[i]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: colors[i] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Top Plans */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-3 bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">{t("chart.plans_title")}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t("chart.plans_sub")}</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            {mounted && (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="#6366F1" radius={[0, 6, 6, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {topProducts.map((p) => (
                <div key={p.name} className="bg-slate-50 dark:bg-white/4 rounded-xl p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 truncate">{p.name}</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">${(p.revenue ?? 0).toLocaleString("en-US")}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{p.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Transactions Table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/6">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">{t("table.title")}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t("table.subtitle")}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
                <Filter className="w-3.5 h-3.5" />
                {t("table.filter")}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
                <Eye className="w-3.5 h-3.5" />
                {t("table.view_all")}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/6">
                  {[t("table.col_id"), t("table.col_customer"), t("table.col_plan"), t("table.col_amount"), t("table.col_status"), t("table.col_date")].map((col) => (
                    <th key={col} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(recentTransactions ?? []).map((tx, i) => {
                  const sc = statusConfig[tx.status] ?? statusConfig["pending"];
                  const StatusIcon = sc.icon;
                  return (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="border-b border-slate-50 dark:border-white/4 hover:bg-slate-50/60 dark:hover:bg-white/3 transition-colors duration-150 group"
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{tx.id}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {tx.customer?.charAt(0) ?? "?"}
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{tx.customer}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400">
                          {tx.plan}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          ${(tx.amount ?? 0).toLocaleString("en-US")}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.cls}`}>
                          <StatusIcon className="w-3 h-3" />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{tx.date}</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 flex items-center justify-between border-t border-slate-100 dark:border-white/6">
            <p className="text-xs text-slate-400 dark:text-slate-500">{t("table.showing")}</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all duration-200 ${
                    p === 1
                      ? "bg-indigo-600 text-white"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}