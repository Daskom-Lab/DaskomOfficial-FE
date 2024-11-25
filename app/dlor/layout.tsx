export default function DlorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <div className="inline-block max-w-7xl text-center pt-8 justify-center">
        {children}
      </div>
    </section>
  );
}