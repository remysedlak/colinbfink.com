function More() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-10"
      style={{ gap: "var(--space-phi)" }}
    >
      <h1 className="text-4xl italic font-bold text-center">More</h1>
      <div
        className="flex flex-col items-center max-w-3xl w-full text-center"
        style={{ gap: "calc(var(--space-phi) * 0.75)" }}
      >
        <p className="text-xl leading-relaxed">
          This page is under construction. Check back soon for more content!
        </p>
      </div>
    </div>
  );
}

export default More;
