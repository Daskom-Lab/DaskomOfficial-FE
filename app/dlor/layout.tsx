export default function DlorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col h-screen">
      <div className="inline-block max-w-7xl text-center pt-8 justify-center">
        {children}
      </div>
    </section>
  );
}
