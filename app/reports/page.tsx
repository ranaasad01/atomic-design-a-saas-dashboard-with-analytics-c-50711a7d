"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FileText, Search, Filter, Download, RefreshCw, CheckCircle, Clock, XCircle, ChevronUp, ChevronDown, BarChart2, TrendingUp, AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type ReportStatus = "Completed" | "Pending" | "Failed";
type ReportType =
  | "Revenue"
  | "User Growth"
  | "Churn Analysis"
  | "Funnel"
  | "Cohort"
  | "Custom";

interface Report {
  id: string;
  name: string;
  type: ReportType;
  status: ReportStatus;
  createdBy: string;
  createdAt: string;
  duration: number; // seconds
  size: string;
}

type SortKey = keyof Pick<Report, "name" | "type" | "status" | "createdAt" | "duration">;
type SortDir = "asc" | "desc";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_REPORTS: Report[] = [
  { id: "r001", name: "Q2 Revenue Summary",        type: "Revenue",       status: "Completed", createdBy: "Abubakar A.", createdAt: "2024-06-30", duration: 14,  size: "2.4 MB" },
  { id: "r002", name: "Monthly Active Users",       type: "User Growth",   status: "Completed", createdBy: "Sara M.",     createdAt: "2024-06-28", duration: 9,   size: "1.1 MB" },
  { id: "r003", name: "Churn Deep Dive — June",     type: "Churn Analysis",status: "Completed", createdBy: "Abubakar A.", createdAt: "2024-06-27", duration: 22,  size: "3.8 MB" },
  { id: "r004", name: "Onboarding Funnel Report",   type: "Funnel",        status: "Pending",   createdBy: "James K.",    createdAt: "2024-06-26", duration: 0,   size: "—"      },
  { id: "r005", name: "Cohort Retention — May",     type: "Cohort",        status: "Completed", createdBy: "Sara M.",     createdAt: "2024-06-25", duration: 31,  size: "5.2 MB" },
  { id: "r006", name: "Custom KPI Export",          type: "Custom",        status: "Failed",    createdBy: "Abubakar A.", createdAt: "2024-06-24", duration: 0,   size: "—"      },
  { id: "r007", name: "ARR Projection Q3",          type: "Revenue",       status: "Completed", createdBy: "James K.",    createdAt: "2024-06-23", duration: 18,  size: "2.9 MB" },
  { id: "r008", name: "New Signup Funnel",          type: "Funnel",        status: "Completed", createdBy: "Sara M.",     createdAt: "2024-06-22", duration: 11,  size: "1.7 MB" },
  { id: "r009", name: "Weekly User Growth",         type: "User Growth",   status: "Pending",   createdBy: "Abubakar A.", createdAt: "2024-06-21", duration: 0,   size: "—"      },
  { id: "r010", name: "Churn Prediction Model",     type: "Churn Analysis",status: "Failed",    createdBy: "James K.",    createdAt: "2024-06-20", duration: 0,   size: "—"      },
  { id: "r011", name: "Enterprise Cohort Analysis", type: "Cohort",        status: "Completed", createdBy: "Sara M.",     createdAt: "2024-06-19", duration: 27,  size: "4.1 MB" },
  { id: "r012", name: "Custom Segment Export",      type: "Custom",        status: "Completed", createdBy: "Abubakar A.", createdAt: "2024-06-18", duration: 8,   size: "0.9 MB" },
  { id: "r013", name: "Q1 Revenue Recap",           type: "Revenue",       status: "Completed", createdBy: "James K.",    createdAt: "2024-06-17", duration: 16,  size: "2.6 MB" },
  { id: "r014", name: "Activation Funnel — June",   type: "Funnel",        status: "Pending",   createdBy: "Sara M.",     createdAt: "2024-06-16", duration: 0,   size: "—"      },
  { id: "r015", name: "Cohort LTV Report",          type: "Cohort",        status: "Completed", createdBy: "Abubakar A.", createdAt: "2024-06-15", duration: 35,  size: "6.0 MB" },
];

const TYPE_CHART_DATA = [
  { type: "Revenue",        count: 3, color: "#6366F1" },
  { type: "User Growth",    count: 2, color: "#8B5CF6" },
  { type: "Churn Analysis", count: 2, color: "#06B6D4" },
  { type: "Funnel",         count: 3, color: "#10B981" },
  { type: "Cohort",         count: 3, color: "#F59E0B" },
  { type: "Custom",         count: 2, color: "#F43F5E" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

function StatusBadge({ status }: { status: ReportStatus }) {
  const cfg: Record<ReportStatus, { icon: React.ReactNode; cls: string; label: string }> = {
    Completed: {
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
      label: "Completed",
    },
    Pending: {
      icon: <Clock className="w-3.5 h-3.5" />,
      cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
      label: "Pending",
    },
    Failed: {
      icon: <XCircle className="w-3.5 h-3.5" />,
      cls: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
      label: "Failed",
    },
  };
  const { icon, cls, label } = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

function TypePill({ type }: { type: ReportType }) {
  const colors: Record<ReportType, string> = {
    Revenue:        "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
    "User Growth":  "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    "Churn Analysis":"bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",
    Funnel:         "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Cohort:         "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    Custom:         "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${colors[type] ?? ""}`}>
      {type}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const t = useTranslations();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "All">("All");
  const [typeFilter, setTypeFilter] = useState<ReportType | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let rows = [...MOCK_REPORTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.createdBy.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      rows = rows.filter((r) => r.status === statusFilter);
    }

    if (typeFilter !== "All") {
      rows = rows.filter((r) => r.type === typeFilter);
    }

    rows.sort((a, b) => {
      let av: string | number = a[sortKey] ?? "";
      let bv: string | number = b[sortKey] ?? "";
      if (sortKey === "duration") {
        av = Number(av);
        bv = Number(bv);
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }, [search, statusFilter, typeFilter, sortKey, sortDir]);

  // Aggregate stats
  const total = MOCK_REPORTS.length;
  const completed = MOCK_REPORTS.filter((r) => r.status === "Completed").length;
  const failed = MOCK_REPORTS.filter((r) => r.status === "Failed").length;
  const pending = MOCK_REPORTS.filter((r) => r.status === "Pending").length;
  const successRate = Math.round((completed / total) * 100);
  const completedWithDuration = MOCK_REPORTS.filter((r) => r.duration > 0);
  const avgDuration =
    completedWithDuration.length > 0
      ? Math.round(
          completedWithDuration.reduce((s, r) => s + r.duration, 0) /
            completedWithDuration.length
        )
      : 0;

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col)
      return <ChevronUp className="w-3.5 h-3.5 opacity-20" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-indigo-500" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0918] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.35)]">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                  {t("reports.eyebrow")}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                {t("reports.heading")}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 text-pretty">
                {t("reports.subheading")}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(99,102,241,0.5)] transition-all duration-200 self-start sm:self-auto"
            >
              <RefreshCw className="w-4 h-4" />
              {t("reports.generate_btn")}
            </motion.button>
          </div>
        </motion.div>

        {/* ── Main Layout: Table + Sidebar ── */}
        <div className="flex flex-col xl:flex-row gap-6">

          {/* ── Left: Filters + Table ── */}
          <div className="flex-1 min-w-0">

            {/* Filter Bar */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-4 mb-4"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("reports.search_placeholder")}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ReportStatus | "All")}
                    className="pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="All">{t("reports.filter_all_status")}</option>
                    <option value="Completed">{t("reports.status_completed")}</option>
                    <option value="Pending">{t("reports.status_pending")}</option>
                    <option value="Failed">{t("reports.status_failed")}</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div className="relative">
                  <BarChart2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as ReportType | "All")}
                    className="pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="All">{t("reports.filter_all_type")}</option>
                    <option value="Revenue">Revenue</option>
                    <option value="User Growth">User Growth</option>
                    <option value="Churn Analysis">Churn Analysis</option>
                    <option value="Funnel">Funnel</option>
                    <option value="Cohort">Cohort</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {t("reports.showing_count", { count: filtered.length, total })}
                </span>
              </div>
            </motion.div>

            {/* Table */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-white/8">
                      {(
                        [
                          { key: "name",      label: t("reports.col_name")     },
                          { key: "type",      label: t("reports.col_type")     },
                          { key: "status",    label: t("reports.col_status")   },
                          { key: "createdAt", label: t("reports.col_date")     },
                          { key: "duration",  label: t("reports.col_duration") },
                        ] as { key: SortKey; label: string }[]
                      ).map(({ key, label }) => (
                        <th
                          key={key}
                          onClick={() => handleSort(key)}
                          className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors duration-150 select-none"
                        >
                          <span className="inline-flex items-center gap-1">
                            {label}
                            <SortIcon col={key} />
                          </span>
                        </th>
                      ))}
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("reports.col_size")}
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("reports.col_actions")}
                      </th>
                    </tr>
                  </thead>
                  <motion.tbody
                    key={`${search}-${statusFilter}-${typeFilter}-${sortKey}-${sortDir}`}
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence mode="popLayout">
                      {filtered.length === 0 ? (
                        <motion.tr variants={rowVariants}>
                          <td colSpan={7} className="px-4 py-16 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <AlertCircle className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                              <p className="text-sm text-slate-400 dark:text-slate-500">
                                {t("reports.empty_state")}
                              </p>
                            </div>
                          </td>
                        </motion.tr>
                      ) : (
                        filtered.map((report) => (
                          <motion.tr
                            key={report.id}
                            variants={rowVariants}
                            layout
                            whileHover={{ backgroundColor: "rgba(99,102,241,0.03)" }}
                            className="border-b border-slate-50 dark:border-white/5 last:border-0 group"
                          >
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-slate-900 dark:text-white leading-tight">
                                    {report.name}
                                  </p>
                                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                    {report.createdBy}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <TypePill type={report.type} />
                            </td>
                            <td className="px-4 py-3.5">
                              <StatusBadge status={report.status} />
                            </td>
                            <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400 tabular-nums">
                              {report.createdAt}
                            </td>
                            <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400 tabular-nums">
                              {report.duration > 0 ? `${report.duration}s` : "—"}
                            </td>
                            <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                              {report.size}
                            </td>
                            <td className="px-4 py-3.5">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={report.status !== "Completed"}
                                aria-label={t("reports.download_aria")}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </AnimatePresence>
                  </motion.tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Summary Panel ── */}
          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="xl:w-80 flex-shrink-0 flex flex-col gap-5"
          >

            {/* Aggregate Stats */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-5"
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t("reports.summary_heading")}
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: t("reports.stat_total"),
                    value: String(total),
                    sub: t("reports.stat_total_sub"),
                    color: "text-slate-900 dark:text-white",
                  },
                  {
                    label: t("reports.stat_success_rate"),
                    value: `${successRate}%`,
                    sub: `${completed} ${t("reports.stat_completed_of")} ${total}`,
                    color: "text-emerald-600 dark:text-emerald-400",
                  },
                  {
                    label: t("reports.stat_pending"),
                    value: String(pending),
                    sub: t("reports.stat_pending_sub"),
                    color: "text-amber-600 dark:text-amber-400",
                  },
                  {
                    label: t("reports.stat_failed"),
                    value: String(failed),
                    sub: t("reports.stat_failed_sub"),
                    color: "text-rose-600 dark:text-rose-400",
                  },
                  {
                    label: t("reports.stat_avg_duration"),
                    value: `${avgDuration}s`,
                    sub: t("reports.stat_avg_duration_sub"),
                    color: "text-indigo-600 dark:text-indigo-400",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    custom={i}
                    className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-white/6 last:border-0"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {stat.sub}
                      </p>
                    </div>
                    <span className={`text-xl font-bold tabular-nums ${stat.color}`}>
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Report Type Breakdown Chart */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-[#13112A] border border-slate-200/60 dark:border-white/8 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-5"
            >
              <div className="flex items-center gap-2 mb-5">
                <BarChart2 className="w-4 h-4 text-indigo-500" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t("reports.chart_heading")}
                </h2>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={TYPE_CHART_DATA}
                  layout="vertical"
                  margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                  barCategoryGap="28%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="rgba(148,163,184,0.15)"
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "#94A3B8" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="type"
                    tick={{ fontSize: 11, fill: "#94A3B8" }}
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(99,102,241,0.06)" }}
                    contentStyle={{
                      background: "rgba(19,17,42,0.95)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      fontSize: "12px",
                      color: "#e2e8f0",
                      boxShadow: "0 8px 24px -8px rgba(0,0,0,0.4)",
                    }}
                    formatter={(value: number) => [value, t("reports.chart_tooltip_label")]}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {TYPE_CHART_DATA.map((entry) => (
                      <Cell key={entry.type} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                {TYPE_CHART_DATA.map((d) => (
                  <div key={d.type} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {d.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-auto">
                      {d.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.aside>
        </div>
      </div>
    </main>
  );
}