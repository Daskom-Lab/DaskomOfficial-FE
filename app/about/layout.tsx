export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col h-screen">
      <div className="inline-block max-w-7xl text-center justify-center">
        {children}
      </div>
    </section>
  );
}
