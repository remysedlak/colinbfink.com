function MoreTemplatePage({ title }) {
  return (
    <section className="textured-background min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-10">
      <div className="text-center flex flex-col" style={{ gap: "calc(var(--space-phi) * 0.75)" }}>
        <h1 className="text-4xl italic font-bold">{title}</h1>
        <p className="text-xl leading-relaxed">Content coming soon.</p>
      </div>
    </section>
  );
}

export default MoreTemplatePage;
