// Route-group layout. Font loading and the <html>/<body> shell live in
// src/app/layout.tsx — this group previously duplicated them, which
// produced nested <html> tags. Keep this as a pure passthrough.
export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
