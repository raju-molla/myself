import Sidebar from "./component/Sidebar";

// Auth is enforced in src/middleware.ts, which checks the admin_token JWT
// cookie for every request under /admin (except /admin/login) and redirects
// unauthenticated visitors there.
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
