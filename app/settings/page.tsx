"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { User, Bell, Palette, GitBranch, CreditCard, Camera, Check, ChevronRight, Shield, Zap, Star, AlertCircle, Mail, Activity, Briefcase as Linkedin, Code2 as Github, MessageCircle as Twitter, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME, brandColors } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  badge?: string;
}

type SidebarCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

// ─── Sidebar categories ───────────────────────────────────────────────────────

const CATEGORIES: SidebarCategory[] = [
  { id: "profile",       label: "Profile",       icon: <User className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  { id: "appearance",    label: "Appearance",    icon: <Palette className="w-4 h-4" /> },
  { id: "integrations",  label: "Integrations",  icon: <GitBranch className="w-4 h-4" /> },
  { id: "billing",       label: "Billing",       icon: <CreditCard className="w-4 h-4" /> },
];

// ─── Accent color options ─────────────────────────────────────────────────────

const ACCENT_COLORS = [
  { id: "indigo",  label: "Indigo",  hex: "#6366F1" },
  { id: "violet",  label: "Violet",  hex: "#8B5CF6" },
  { id: "cyan",    label: "Cyan",    hex: "#06B6D4" },
  { id: "emerald", label: "Emerald", hex: "#10B981" },
  { id: "rose",    label: "Rose",    hex: "#F43F5E" },
  { id: "amber",   label: "Amber",   hex: "#F59E0B" },
];

// ─── Billing plans ────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "/ month",
    features: ["Up to 3 projects", "5 team members", "10 GB storage", "Basic analytics"],
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "/ month",
    features: ["Unlimited projects", "25 team members", "100 GB storage", "Advanced analytics", "Priority support"],
    current: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199",
    period: "/ month",
    features: ["Unlimited everything", "Unlimited team members", "1 TB storage", "Custom analytics", "Dedicated support", "SLA guarantee"],
    current: false,
  },
];

// ─── Toggle component ─────────────────────────────────────────────────────────

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        enabled ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Section: Profile ─────────────────────────────────────────────────────────

const panelVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function ProfileSection() {
  const t = useTranslations();
  const [form, setForm] = useState({
    firstName: "Abubakar",
    lastName: "Ibrahim",
    email: "abubakar@example.com",
    role: "Product Manager",
    company: "Abubakar Analytics",
    bio: "Building data-driven products that help teams make better decisions.",
    timezone: "UTC+1",
    language: "English",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("settings.profile.title")}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("settings.profile.subtitle")}</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-[0_4px_16px_rgba(99,102,241,0.35)]">
            {(form.firstName?.[0] ?? "A")}
          </div>
          <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
            <Camera className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">{t("settings.profile.avatar_label")}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t("settings.profile.avatar_hint")}</p>
          <button className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            {t("settings.profile.upload_btn")}
          </button>
        </div>
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { field: "firstName", label: t("settings.profile.first_name") },
          { field: "lastName",  label: t("settings.profile.last_name") },
          { field: "email",     label: t("settings.profile.email") },
          { field: "role",      label: t("settings.profile.role") },
          { field: "company",   label: t("settings.profile.company") },
          { field: "timezone",  label: t("settings.profile.timezone") },
        ].map(({ field, label }) => (
          <div key={field}>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">{label}</label>
            <input
              type="text"
              value={(form as Record<string, string>)[field] ?? ""}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
            />
          </div>
        ))}
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">{t("settings.profile.bio")}</label>
        <textarea
          rows={3}
          value={form.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)] transition-all duration-200"
        >
          {saved ? t("settings.profile.saved") : t("settings.profile.save_btn")}
        </motion.button>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium"
          >
            <Check className="w-4 h-4" />
            {t("settings.profile.changes_saved")}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section: Notifications ───────────────────────────────────────────────────

function NotificationsSection() {
  const t = useTranslations();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: "email_reports",   label: t("settings.notifications.email_reports"),   description: t("settings.notifications.email_reports_desc"),   enabled: true  },
    { id: "weekly_digest",   label: t("settings.notifications.weekly_digest"),   description: t("settings.notifications.weekly_digest_desc"),   enabled: true  },
    { id: "alert_threshold", label: t("settings.notifications.alert_threshold"), description: t("settings.notifications.alert_threshold_desc"), enabled: false },
    { id: "team_activity",   label: t("settings.notifications.team_activity"),   description: t("settings.notifications.team_activity_desc"),   enabled: true  },
    { id: "product_updates", label: t("settings.notifications.product_updates"), description: t("settings.notifications.product_updates_desc"), enabled: false },
    { id: "security_alerts", label: t("settings.notifications.security_alerts"), description: t("settings.notifications.security_alerts_desc"), enabled: true  },
  ]);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("settings.notifications.title")}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("settings.notifications.subtitle")}</p>
      </div>

      <div className="space-y-3">
        {settings.map((setting, i) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{setting.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{setting.description}</p>
              </div>
            </div>
            <Toggle enabled={setting.enabled} onChange={() => toggle(setting.id)} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Section: Appearance ──────────────────────────────────────────────────────

function AppearanceSection() {
  const t = useTranslations();
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");
  const [accentColor, setAccentColor] = useState("indigo");
  const [density, setDensity] = useState<"compact" | "comfortable" | "spacious">("comfortable");

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("settings.appearance.title")}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("settings.appearance.subtitle")}</p>
      </div>

      {/* Theme */}
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t("settings.appearance.theme_label")}</p>
        <div className="grid grid-cols-3 gap-3">
          {(["light", "dark", "system"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                theme === mode
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-500/40"
              }`}
            >
              <div className={`w-full h-12 rounded-lg mb-3 ${
                mode === "light"  ? "bg-gradient-to-br from-slate-100 to-slate-200" :
                mode === "dark"   ? "bg-gradient-to-br from-slate-800 to-slate-900" :
                                    "bg-gradient-to-br from-slate-200 to-slate-800"
              }`} />
              <p className="text-xs font-semibold capitalize text-slate-700 dark:text-slate-300">{t(`settings.appearance.theme_${mode}`)}</p>
              {theme === mode && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Accent color */}
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t("settings.appearance.accent_label")}</p>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setAccentColor(color.id)}
              title={color.label}
              className={`relative w-9 h-9 rounded-full transition-all duration-200 ${
                accentColor === color.id ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 scale-110" : "hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex, ringColor: color.hex }}
            >
              {accentColor === color.id && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {t("settings.appearance.accent_selected")}: <span className="font-medium capitalize text-slate-700 dark:text-slate-300">{accentColor}</span>
        </p>
      </div>

      {/* Density */}
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t("settings.appearance.density_label")}</p>
        <div className="flex gap-3">
          {(["compact", "comfortable", "spacious"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                density === d
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500/40"
              }`}
            >
              {t(`settings.appearance.density_${d}`)}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section: Integrations ────────────────────────────────────────────────────

function IntegrationsSection() {
  const t = useTranslations();
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "github",   name: "GitHub",    description: t("settings.integrations.github_desc"),   icon: <Github className="w-5 h-5" />,    connected: true,  badge: "Active" },
    { id: "slack",    name: "Slack",     description: t("settings.integrations.slack_desc"),    icon: <Activity className="w-5 h-5" />,  connected: false },
    { id: "twitter",  name: "Twitter",   description: t("settings.integrations.twitter_desc"),  icon: <Twitter className="w-5 h-5" />,   connected: false },
    { id: "linkedin", name: "LinkedIn",  description: t("settings.integrations.linkedin_desc"), icon: <Linkedin className="w-5 h-5" />,  connected: true,  badge: "Active" },
    { id: "zapier",   name: "Zapier",    description: t("settings.integrations.zapier_desc"),   icon: <Zap className="w-5 h-5" />,       connected: false },
    { id: "stripe",   name: "Stripe",    description: t("settings.integrations.stripe_desc"),   icon: <CreditCard className="w-5 h-5" />, connected: true, badge: "Active" },
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, connected: !item.connected, badge: !item.connected ? "Active" : undefined }
          : item
      )
    );
  };

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("settings.integrations.title")}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("settings.integrations.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {integrations.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.connected
                    ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500"
                    : "bg-slate-100 dark:bg-slate-700/60 text-slate-400"
                }`}>
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    {item.connected && item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => toggleIntegration(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  item.connected
                    ? "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_2px_6px_rgba(99,102,241,0.3)]"
                }`}
              >
                {item.connected ? t("settings.integrations.disconnect") : t("settings.integrations.connect")}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Section: Billing ─────────────────────────────────────────────────────────

function BillingSection() {
  const t = useTranslations();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("settings.billing.title")}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("settings.billing.subtitle")}</p>
      </div>

      {/* Current plan banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.4)]">
          <Star className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{t("settings.billing.current_plan_label")}: <span className="text-indigo-600 dark:text-indigo-400">Pro</span></p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t("settings.billing.renews")}: January 15, 2025</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-slate-900 dark:text-white">$49</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t("settings.billing.per_month")}</p>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PLANS.map((plan, i) => (
          <motion.button
            key={plan.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" }}
            whileHover={{ y: -2 }}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
              selectedPlan === plan.id
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-500/40"
            }`}
          >
            {plan.current && (
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white">
                {t("settings.billing.current_badge")}
              </span>
            )}
            <p className="text-sm font-bold text-slate-900 dark:text-white">{plan.name}</p>
            <div className="mt-1 flex items-baseline gap-0.5">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{plan.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Check className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.button>
        ))}
      </div>

      {/* Payment method */}
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t("settings.billing.payment_method")}</p>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{t("settings.billing.card_ending")} 4242</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t("settings.billing.expires")} 12/2026</p>
            </div>
          </div>
          <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            {t("settings.billing.update_card")}
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="p-4 rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">{t("settings.billing.cancel_title")}</p>
            <p className="text-xs text-red-600/80 dark:text-red-400/70 mt-0.5 leading-relaxed">{t("settings.billing.cancel_desc")}</p>
          </div>
          <button className="flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors">
            {t("settings.billing.cancel_btn")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("profile");

  const renderPanel = () => {
    switch (activeCategory) {
      case "profile":       return <ProfileSection />;
      case "notifications": return <NotificationsSection />;
      case "appearance":    return <AppearanceSection />;
      case "integrations":  return <IntegrationsSection />;
      case "billing":       return <BillingSection />;
      default:              return <ProfileSection />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0918] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>{t("settings.breadcrumb_home")}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">{t("settings.breadcrumb_settings")}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t("settings.page_title")}
          </h1>
          <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-sm">
            {t("settings.page_subtitle")}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="lg:w-60 flex-shrink-0"
          >
            <nav className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden">
              {CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                  whileHover={{ x: 2 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className={activeCategory === cat.id ? "text-indigo-500" : "text-slate-400 dark:text-slate-500"}>
                    {cat.icon}
                  </span>
                  {t(`settings.sidebar.${cat.id}`)}
                  {activeCategory === cat.id && (
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-indigo-400" />
                  )}
                </motion.button>
              ))}

              {/* Security shortcut */}
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
                  <Shield className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  {t("settings.sidebar.security")}
                </button>
                <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
                  <Sparkles className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  {t("settings.sidebar.upgrade")}
                </button>
              </div>
            </nav>
          </motion.aside>

          {/* Content panel */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0"
          >
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
              <AnimatePresence mode="wait">
                <motion.div key={activeCategory}>
                  {renderPanel()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}