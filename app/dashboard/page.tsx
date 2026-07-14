"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpDown, ChevronUp, ChevronDown, Eye, ShoppingCart, CreditCard, RefreshCw } from 'lucide-react';
import {
  AreaChart,
  Area,
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
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { kpiCards, brandColors } from "@/lib/data";
import { useTranslations } from "next-intl";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, target: 40000 },
  { month: "Feb", revenue: 48500, target: 44000 },
  { month: "Mar", revenue: 51200, target: 48000 },
  { month: "Apr", revenue: 55800, target: 52000 },
  { month: "May", revenue: 59300, target: 56000 },
  { month: "Jun", revenue: 63100, target: 60000 },
  { month: "Jul", revenue: 68400, target: 64000 },
  { month: "Aug", revenue: 72900, target: 68000 },
  { month: "Sep", revenue: 76200, target: 72000 },
  { month: "Oct", revenue: 79800, target: 76000 },
  { month: "Nov", revenue: 82100, target: 80000 },
  { month: "Dec", revenue: 84320, target: 84000 },
];

const weeklyTrendData = [
  { day: "Mon", users: 1240, sessions: 1890 },
  { day: "Tue", users: 1380, sessions: 2100 },
  { day: "Wed", users: 1520, sessions: 2340 },
  { day: "Thu", users: 1290, sessions: 1980 },
  { day: "Fri", users: 1670, sessions: 2560 },
  { day: "Sat", users: 980,  sessions: 1420 },
  { day: "Sun", users: 860,  sessions: 1210 },
];

const trafficSourceData = [
  { name: "Organic Search", value: 38, color: "#6366F1" },
  { name: "Direct",         value: 24, color: "#8B5CF6" },
  { name: "Referral",       value: 18, color: "#06B6D4" },
  { name: "Social Media",   value: 12, color: "#10B981" },
  { name: "Email",          value: 8,  color: "#F59E0B" },
];

interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
}

const transactions: Transaction[] = [
  { id: "TXN-001", customer: "Lena Fischer",    email: "lena@example.com",    plan: "Pro",        amount: 149, status: "paid",    date: "2024-12-18" },
  { id: "TXN-002", customer: "Marcus Webb",     email: "marcus@example.com",  plan: "Enterprise", amount: 499, status: "paid",    date: "2024-12-17" },
  { id: "TXN-003", customer: "Priya Sharma",    email: "priya@example.com",   plan: "Starter",    amount: 49,  status: "pending", date: "2024-12-17" },
  { id: "TXN-004", customer: "James Okafor",    email: "james@example.com",   plan: "Pro",        amount: 149, status: "paid",    date: "2024-12-16" },
  { id: "TXN-005", customer: "Sofia Reyes",     email: "sofia@example.com",   plan: "Enterprise", amount: 499, status: "failed",  date: "2024-12-16" },
  { id: "TXN-006", customer: "Tomás Novak",     email: "tomas@example.com",   plan: "Pro",        amount: 149, status: "paid",    date: "2024-12-15" },
  { id: "TXN-007", customer: "Aisha Kamara",    email: "aisha@example.com",   plan: "Starter",    amount: 49,  status: "paid",    date: "2024-12-15" },
  { id: "TXN-008", customer: "Daniel Park",     email: "daniel@example.com",  plan: "Pro",        amount: 149, status: "pending", date: "2024-12-14" },
  { id: "TXN-009", customer: "Ingrid Larsson",  email: "ingrid@example.com",  plan: "Enterprise", amount: 499, status: "paid",    date: "2024-12-14" },
  { id: "TXN-010", customer: "Kwame Asante",    email: "kwame@example.com",   plan: "Starter",    amount: 49,  status: "paid",    date: "2024-12-13" },
];

// ─── KPI stat cards (override with dashboard-specific icons) ─────────────────

const dashboardKpis = [
  { id: "mrr",   label: "Monthly Revenue",  value: "$84,320",  change: 12.4,  icon: DollarSign, color: "indigo" },
  { id: "users", label: "Active Users",     value: "24,891",   change: 8.7,   icon: Users,      color: "violet" },
  { id: "arr",   label: "Annual Run Rate",  value: "$1.01M",   change: 14.2,  icon: TrendingUp, color: "cyan"   },
  { id: "churn", label: "Churn Rate",       value: "2.4%",     change: -0.3,  icon: Activity,   color: "emerald"},
];

const colorMap: Record<string, { bg: string; text: string; glow: string; border: string }> = {
  indigo:  { bg: "bg-indigo-500/10 dark:bg-indigo-500/15",  text: "text-indigo-600 dark:text-indigo-400",  glow: "rgba(99,102,241,0.25)",  border: "border-indigo-200/60 dark:border-indigo-500/20" },
  violet:  { bg: "bg-violet-500/10 dark:bg-violet-500/15",  text: "text-violet-600 dark:text-violet-400",  glow: "rgba(139,92,246,0.25)",  border: "border-violet-200/60 dark:border-violet-500/20" },
  cyan:    { bg: "bg-cyan-500/10 dark:bg-cyan-500/15",      text: "text-cyan-600 dark:text-cyan-400",      glow: "rgba(6,182,212,0.25)",   border: "border-cyan-200/60 dark:border-cyan-500/20"    },
  emerald: { bg: "bg-emerald-500/10 dark:bg-emerald-500/15",text: "text-emerald-600 dark:text-emerald-400",glow: "rgba(16,185,129,0.25)",  border: "border-emerald-200/60 dark:border-emerald-500/20"},
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white dark:bg-[#1A1830] border border-slate-200/60 dark:border-white/10 rounded-xl px-4 py-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)]">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-600 dark:text-slate-300 capitalize">{entry.name}:</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {typeof entry.value === "number" && entry.name === "revenue"
              ? `$${(entry.value ?? 0).toLocaleString("en-US")}`
              : (entry.value ?? 0).toLocaleString("en-US")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#13112A] p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10" />
        <div className="w-16 h-5 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>
      <div className="w-24 h-7 rounded-lg bg-slate-200 dark:bg-white/10 mb-2" />
      <div className="w-32 h-4 rounded bg-slate-100 dark:bg-white/5" />
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Transaction["status"] }) {
  const styles = {
    paid:    "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20",
    pending: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20",
    failed:  "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200/60 dark:border-red-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<keyof Transaction>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | Transaction["status"]>("all");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const sortedTransactions = useMemo(() => {
    const filtered = statusFilter === "all"
      ? transactions
      : transactions.filter((tx) => tx.status === statusFilter);
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const as = String(av ?? "");
      const bs = String(bv ?? "");
      return sortDir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });
  }, [sortKey, sortDir, statusFilter]);

  const handleSort = (key: keyof Transaction) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }: { col: keyof Transaction }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />;
    return sortDir === "asc"
      ? <ChevronUp className="w-3.5 h-3.5 text-indigo-500" />
      : <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />;
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0918] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">
              {t("dashboard.eyebrow")}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
              {t("dashboard.title")}
            </h1>
            <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {t("dashboard.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t("dashboard.live_badge")}
            </span>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-200">
              <RefreshCw className="w-3.5 h-3.5" />
              {t("dashboard.refresh")}
            </button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : dashboardKpis.map((kpi) => {
                const colors = colorMap[kpi.color] ?? colorMap.indigo;
                const Icon = kpi.icon;
                const isPositive = kpi.change >= 0;
                return (
                  <motion.div
                    key={kpi.id}
                    variants={scaleIn}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className={`rounded-2xl border ${colors.border} bg-white dark:bg-[#13112A] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)] transition-all duration-300 cursor-default`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          isPositive
                            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? "+" : ""}{kpi.change}%
                      </span>
                    </div>
                    <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {kpi.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{kpi.label}</p>
                  </motion.div>
                );
              })}
        </motion.div>

        {/* ── Revenue Area Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#13112A] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {t("dashboard.revenue_chart_title")}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {t("dashboard.revenue_chart_subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-500" />
                {t("dashboard.legend_revenue")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-violet-400 opacity-60" />
                {t("dashboard.legend_target")}
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8B5CF6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="target" stroke="#8B5CF6" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#gradTarget)" dot={false} />
              <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5} fill="url(#gradRevenue)" dot={false} activeDot={{ r: 5, fill: "#6366F1", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Line Chart + Donut Chart ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4"
        >
          {/* Weekly Trend Line Chart */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-3 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#13112A] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {t("dashboard.weekly_chart_title")}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {t("dashboard.weekly_chart_subtitle")}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyTrendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
                <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#6366F1", strokeWidth: 0 }} />
                <Line type="monotone" dataKey="sessions" stroke="#06B6D4" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#06B6D4", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Sources Donut */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#13112A] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {t("dashboard.traffic_chart_title")}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {t("dashboard.traffic_chart_subtitle")}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, ""]}
                  contentStyle={{
                    background: "var(--tooltip-bg, #fff)",
                    border: "1px solid rgba(148,163,184,0.2)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-3 space-y-2">
              {trafficSourceData.map((src) => (
                <li key={src.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: src.color }} />
                    {src.name}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">{src.value}%</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#13112A] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-slate-100 dark:border-white/8">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {t("dashboard.table_title")}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {t("dashboard.table_subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(["all", "paid", "pending", "failed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    statusFilter === s
                      ? "bg-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/8">
                  {(
                    [
                      { key: "id",       label: t("dashboard.col_id")       },
                      { key: "customer", label: t("dashboard.col_customer") },
                      { key: "plan",     label: t("dashboard.col_plan")     },
                      { key: "amount",   label: t("dashboard.col_amount")   },
                      { key: "status",   label: t("dashboard.col_status")   },
                      { key: "date",     label: t("dashboard.col_date")     },
                    ] as { key: keyof Transaction; label: string }[]
                  ).map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-150 select-none"
                    >
                      <span className="flex items-center gap-1.5">
                        {col.label}
                        <SortIcon col={col.key} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {sortedTransactions.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="hover:bg-slate-50 dark:hover:bg-white/3 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      {tx.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {tx.customer?.charAt(0) ?? "?"}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white leading-tight">{tx.customer}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{tx.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        tx.plan === "Enterprise"
                          ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200/60 dark:border-violet-500/20"
                          : tx.plan === "Pro"
                          ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-500/20"
                          : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-white/10"
                      }`}>
                        {tx.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900 dark:text-white">
                      ${(tx.amount ?? 0).toLocaleString("en-US")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400 text-xs">
                      {tx.date}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-white/8 flex items-center justify-between">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t("dashboard.table_showing", { count: sortedTransactions.length, total: transactions.length })}
            </p>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-200">
                <Eye className="w-3.5 h-3.5" />
                {t("dashboard.view_all")}
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_2px_8px_rgba(99,102,241,0.35)] transition-all duration-200">
                <CreditCard className="w-3.5 h-3.5" />
                {t("dashboard.export")}
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}