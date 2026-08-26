"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string; icon?: ReactNode };
}) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 sm:px-10 h-20 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: "var(--text)" }}>
          {title}
        </h1>
        {description && (
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm font-medium transition-colors"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          {action.icon}
          {action.label}
        </Link>
      )}
    </div>
  );
}
