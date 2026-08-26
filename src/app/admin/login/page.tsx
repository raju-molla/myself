"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Lock, Mail } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl border p-8"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={22} style={{ color: "var(--accent)" }} />
          <h1 className="font-display text-xl font-semibold" style={{ color: "var(--text)" }}>
            Admin Login
          </h1>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Sign in to manage rajumolla.com
        </p>

        {error && (
          <div
            className="mb-5 px-4 py-2.5 rounded-md text-sm font-mono"
            style={{ background: "var(--signal-soft)", color: "var(--signal)" }}
          >
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-mono mb-1.5" style={{ color: "var(--text)" }}>
              <Mail size={14} /> Email
            </label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-4 py-2.5 outline-none"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
              placeholder="admin@rajumolla.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-mono mb-1.5" style={{ color: "var(--text)" }}>
              <Lock size={14} /> Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-2.5 outline-none"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2.5 rounded-md font-mono text-sm font-semibold disabled:opacity-50"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
