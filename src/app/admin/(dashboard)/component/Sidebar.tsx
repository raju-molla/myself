"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  GitBranch,
  ExternalLink,
  TerminalSquare,
  Layers,
  MessageSquare,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/blogs", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/opensource", label: "Open Source", icon: GitBranch },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/content", label: "Site Content", icon: Layers },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className="hidden md:flex md:flex-col w-64 shrink-0 min-h-screen border-r"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center gap-2 px-6 h-16 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <TerminalSquare size={20} style={{ color: "var(--accent)" }} />
        <span className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
          Admin
        </span>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 font-mono text-sm">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors"
              style={{
                background: active ? "var(--accent-soft)" : "transparent",
                color: active ? "var(--accent-strong)" : "var(--text-muted)",
                border: `1px solid ${active ? "var(--border-strong)" : "transparent"}`,
              }}
            >
              <Icon size={16} />
              <span className="tracking-wide">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: "var(--border)" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 text-xs font-mono rounded-md"
          style={{ color: "var(--text-faint)" }}
        >
          <ExternalLink size={14} />
          View live site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-mono rounded-md"
          style={{ color: "var(--signal)" }}
        >
          <LogOut size={14} />
          Log out
        </button>
      </div>
    </aside>
  );
}
