"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ChevronDown, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const monthlyKpiData = [
  { month: "Jan", mrr: 62000, users: 18200, churn: 3.1, nps: 64, cac: 172 },
  { month: "Feb", mrr: 65400, users: 19100, churn: 2.9, nps: 66, cac: 165 },
  { month: "Mar", mrr: 68900, users: 20400, churn: 2.7, nps: 67, cac: 161 },
  { month: "Apr", mrr: 71200, users: 21300, churn: 2.6, nps: 68, cac: 158 },
  { month: "May", mrr: 74800, users: 22100, churn: 2.5, nps: 70, cac: 155 },
  { month: "Jun", mrr: 77300, users: 22900, churn: 2.5, nps: 71, cac: 152 },
  { month: "Jul", mrr: 79100, users: 23400, churn: 2.4, nps: 71, cac: 150 },
  { month: "Aug", mrr: 80600, users: 23900, churn: 2.4, nps: 72, cac: 149 },
  { month: "Sep", mrr: 81900, users: 24200, churn: 2.4, nps: 72, cac: 149 },
  { month: "Oct", mrr: 82700, users: 24500, churn: 2.4, nps: 72, cac: 148 },
  { month: "Nov", mrr: 83500, users: 24700, churn: 2.4, nps: 72, cac: 148 },
  { month: "Dec", mrr: 84320, users: 24891, churn: 2.4, nps: 72, cac: 148 },
];

const acquisitionChurnData = [
  { month: "Jan", newUsers: 2100, churned: 580, netGrowth: 1520 },
  { month: "Feb", newUsers: 2340, churned: 540, netGrowth: 1800 },
  { month: "Mar", newUsers: 2580, churned: 510, netGrowth: 2070 },
  { month: "Apr", newUsers: 2420, churned: 490, netGrowth: 1930 },
  { month: "May", newUsers: 2690, churned: 470, netGrowth: 2220 },
  { month: "Jun", newUsers: 2810, churned: 460, netGrowth: 2350 },
  { month: "Jul", newUsers: 2950, churned: 440, netGrowth: 2510 },
  { month: "Aug", newUsers: 3020, churned: 430, netGrowth: 2590 },
  { month: "Sep", newUsers: 2880, churned: 420, netGrowth: 2460 },
  { month: "Oct", newUsers: 3100, churned: 410, netGrowth: 2690 },
  { month: "Nov", newUsers: 3240, churned: 400, netGrowth: 2840 },
  { month: "Dec", newUsers: 3380, churned: 390, netGrowth: 2990 },
];

const sparklineData: Record<string, { v: number }[]> = {
  mrr: [
    { v: 62 }, { v: 65 }, { v: 69 }, { v: 71 }, { v: 75 }, { v: 77 },
    { v: 79 }, { v: 81 }, { v: 82 }, { v: 83 }, { v: 84 }, { v: 84 },
  ],
  users: [
    { v: 18 }, { v: 19 }, { v: 20 }, { v: 21 }, { v: 22 }, { v: 23 },
    { v: 23 }, { v: 24 }, { v: 24 }, { v: 25 }, { v: 25 }, { v: 25 },
  ],
  churn: [
    { v: 3.1 }, { v: 2.9 }, { v: 2.7 }, { v: 2.6 }, { v: 2.5 }, { v: 2.5 },
    { v: 2.4 }, { v: 2.4 }, { v: 2.4 }, { v: 2.4 }, { v: 2.4 }, { v: 2.4 },
  ],
  nps: [
    { v: 64 }, { v: 66 }, { v: 67 }, { v: 68 }, { v: 70 }, { v: 71 },
    { v: 71 }, { v: 72 }, { v: 72 }, { v: 72 }, { v: 72 }, { v: 72 },
  ],
  cac: [
    { v: 172 }, { v: 165 }, { v: 161 }, { v: 158 }, { v: 155 }, { v: 152 },
    { v: 150 }, { v: 149 }, { v: 149 }, { v: 148 }, { v: 148 }, { v: 148 },
  ],
  arr: [
    { v: 744 }, { v: 785 }, { v: 827 }, { v: 854 }, { v: 898 }, { v: 928 },
    { v: 949 }, { v: 967 }, { v: 983 }, { v: 992 }, { v: 1002 }, { v: 1012 },
  ],
};

const metricCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$84,320",
    change: 12.4,
    positive: true,
    sparkKey: "mrr",
    icon: DollarSign,
    color: "#6366F1",
  },
  {
    id: "users",
    label: "Active Users",
    value: "24,891",
    change: 8.7,
    positive: true,
    sparkKey: "users",
    icon: Users,
    color: "#8B5CF6",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "2.4%",
    change: -0.3,
    positive: true,
    sparkKey: "churn",
    icon: Activity,
    color: "#06B6D4",
  },
  {
    id: "nps",
    label: "Net Promoter Score",
    value: "72",
    change: 5.0,
    positive: true,
    sparkKey: "nps",
    icon: TrendingUp,
    color: "#10B981",
  },
  {
    id: "cac",
    label: "Customer Acq. Cost",
    value: "$148",
    change: -6.1,
    positive: true,
    sparkKey: "cac",
    icon: TrendingDown,
    color: "#F59E0B",
  },
  {
    id: "arr",
    label: "Annual Run Rate",
    value: "$1.01M",
    change: 14.2,
    positive: true,
    sparkKey: "arr",
    icon: DollarSign,
    color: "#EC4899",
  },
];

const DATE_RANGES = ["Last 3 months", "Last 6 months", "Last 12 months", "Year to date"];
const KPI_OPTIONS = ["mrr", "users", "churn", "nps", "cac"];
const KPI_LABELS: Record<string, string> = {
  mrr: "MRR ($)",
  users: "Active Users",
  churn: "Churn Rate (%)",
  nps: "NPS",
  cac: "CAC ($)",
};
const KPI_COLORS: Record<string, string> = {
  mrr: "#6366F1",
  users: "#8B5CF6",
  churn: "#06B6D4",
  nps: "#10B981",
  cac: "#F59E0B",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white dark:bg-[#1A1830] border border-slate-200/60 dark:border-white/10 rounded-xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-600 dark:text-slate-300 capitalize">{entry.name}:</span>
          <span className="font-semibold text-slate-900 dark:text-white ml-auto pl-4">
            {(entry.value ?? 0).toLocaleString("en-US")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Sparkline Card ───────────────────────────────────────────────────────────

function SparkCard({
  card,
}: {
  card: (typeof metricCards)[number];
}) {
  const Icon = card.icon;
  const data = sparklineData[card.sparkKey] ?? [];
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{card.label}</p>
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{card.value}</p>
        </div>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: card.color + "20" }}
        >
          <Icon className="w-4 h-4" style={{ color: card.color }} />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {card.positive ? (
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
        )}
        <span
          className={`text-xs font-semibold ${
            card.positive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {Math.abs(card.change)}%
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">vs last period</span>
      </div>

      <div className="h-14 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={card.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, fill: card.color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const t = useTranslations();
  const [dateRange, setDateRange] = useState<string>(DATE_RANGES[2]);
  const [selectedKpi, setSelectedKpi] = useState<string>("mrr");
  const [dateOpen, setDateOpen] = useState(false);
  const [kpiOpen, setKpiOpen] = useState(false);

  const monthsToShow = useMemo(() => {
    if (dateRange === DATE_RANGES[0]) return 3;
    if (dateRange === DATE_RANGES[1]) return 6;
    return 12;
  }, [dateRange]);

  const filteredMonthly = useMemo(
    () => monthlyKpiData.slice(-monthsToShow),
    [monthsToShow]
  );

  const filteredAcquisition = useMemo(
    () => acquisitionChurnData.slice(-monthsToShow),
    [monthsToShow]
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0918] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">
                {t("analytics.eyebrow")}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                {t("analytics.title")}
              </h1>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
                {t("analytics.subtitle")}
              </p>
            </div>

            {/* Filter Bar */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
              {/* Date Range Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setDateOpen((o) => !o); setKpiOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  {dateRange}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dateOpen ? "rotate-180" : ""}`} />
                </button>
                {dateOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1A1830] border border-slate-200/60 dark:border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] z-20 overflow-hidden">
                    {DATE_RANGES.map((r) => (
                      <button
                        key={r}
                        onClick={() => { setDateRange(r); setDateOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                          dateRange === r
                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* KPI Selector */}
              <div className="relative">
                <button
                  onClick={() => { setKpiOpen((o) => !o); setDateOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <Activity className="w-4 h-4 text-indigo-500" />
                  {KPI_LABELS[selectedKpi] ?? selectedKpi}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${kpiOpen ? "rotate-180" : ""}`} />
                </button>
                {kpiOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#1A1830] border border-slate-200/60 dark:border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] z-20 overflow-hidden">
                    {KPI_OPTIONS.map((k) => (
                      <button
                        key={k}
                        onClick={() => { setSelectedKpi(k); setKpiOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                          selectedKpi === k
                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                        }`}
                      >
                        {KPI_LABELS[k] ?? k}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Bar Chart: Monthly KPI Performance ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  {t("analytics.bar_chart_title")}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t("analytics.bar_chart_subtitle")}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: KPI_COLORS[selectedKpi] ?? "#6366F1" }}
                />
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {KPI_LABELS[selectedKpi] ?? selectedKpi}
                </span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredMonthly}
                  margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                  barSize={monthsToShow <= 6 ? 28 : 18}
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={KPI_COLORS[selectedKpi] ?? "#6366F1"} stopOpacity={1} />
                      <stop offset="100%" stopColor={KPI_COLORS[selectedKpi] ?? "#6366F1"} stopOpacity={0.55} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-white/5" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "currentColor" }}
                    className="text-slate-400 dark:text-slate-500"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "currentColor" }}
                    className="text-slate-400 dark:text-slate-500"
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    tickFormatter={(v: number) =>
                      v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                    }
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
                  <Bar
                    dataKey={selectedKpi}
                    fill="url(#barGrad)"
                    radius={[6, 6, 0, 0]}
                    name={KPI_LABELS[selectedKpi] ?? selectedKpi}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* ── Stacked Area Chart: Acquisition vs Churn ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  {t("analytics.area_chart_title")}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t("analytics.area_chart_subtitle")}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {[
                  { key: "newUsers", color: "#6366F1", label: t("analytics.legend_new") },
                  { key: "churned", color: "#F43F5E", label: t("analytics.legend_churned") },
                  { key: "netGrowth", color: "#10B981", label: t("analytics.legend_net") },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredAcquisition}
                  margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradChurned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradNet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-white/5" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "currentColor" }}
                    className="text-slate-400 dark:text-slate-500"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "currentColor" }}
                    className="text-slate-400 dark:text-slate-500"
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    tickFormatter={(v: number) =>
                      v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ display: "none" }} />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    name="New Users"
                    stroke="#6366F1"
                    strokeWidth={2}
                    fill="url(#gradNew)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#6366F1" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="churned"
                    name="Churned"
                    stroke="#F43F5E"
                    strokeWidth={2}
                    fill="url(#gradChurned)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#F43F5E" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="netGrowth"
                    name="Net Growth"
                    stroke="#10B981"
                    strokeWidth={2}
                    fill="url(#gradNet)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#10B981" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* ── Metric Cards with Sparklines ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              {t("analytics.metrics_title")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t("analytics.metrics_subtitle")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metricCards.map((card) => (
              <SparkCard key={card.id} card={card} />
            ))}
          </div>
        </motion.section>

        {/* ── Insight Strip ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-indigo-500/10 via-violet-500/8 to-cyan-500/10 dark:from-indigo-500/15 dark:via-violet-500/10 dark:to-cyan-500/15 border border-indigo-200/40 dark:border-indigo-500/20 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">
                  {t("analytics.insight_title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t("analytics.insight_body")}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" />
                  {t("analytics.insight_badge")}
                </span>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}