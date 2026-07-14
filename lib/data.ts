export const APP_NAME = "Abubakar";
export const APP_TAGLINE = "Analytics that move your business forward.";
export const APP_ACCENT = "#6366F1";

export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export const navLinks: NavLink[] = [
  { label: "Overview",   href: "/",          type: "route"  },
  { label: "Dashboard",  href: "/dashboard", type: "route"  },
  { label: "Analytics",  href: "/analytics", type: "route"  },
  { label: "Reports",    href: "/reports",   type: "route"  },
  { label: "Settings",   href: "/settings",  type: "route"  },
];

export interface KpiCard {
  id: string;
  label: string;
  value: string;
  change: number;
  unit: string;
}

export const kpiCards: KpiCard[] = [
  { id: "mrr",     label: "Monthly Recurring Revenue", value: "84,320",  change: 12.4,  unit: "$" },
  { id: "users",   label: "Active Users",              value: "24,891",  change: 8.7,   unit: ""  },
  { id: "churn",   label: "Churn Rate",                value: "2.4",     change: -0.3,  unit: "%"  },
  { id: "arr",     label: "Annual Run Rate",           value: "1.01M",   change: 14.2,  unit: "$" },
  { id: "nps",     label: "Net Promoter Score",        value: "72",      change: 5.0,   unit: ""  },
  { id: "cac",     label: "Customer Acq. Cost",        value: "148",     change: -6.1,  unit: "$" },
];

export type ThemeColor = {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
};

export const brandColors: ThemeColor = {
  primary:   "#6366F1",
  secondary: "#8B5CF6",
  accent:    "#06B6D4",
  muted:     "#94A3B8",
};