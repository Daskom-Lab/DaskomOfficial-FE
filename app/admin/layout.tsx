export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        {children}
      </div>
    </section>
  );
}
