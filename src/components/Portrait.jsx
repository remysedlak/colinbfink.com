function Portrait() {
  return (
    <div
      className="flex flex-col max-w-2xl items-center text-center"
      style={{ gap: "calc(var(--space-1) * 1.1)" }}
    >
      <img
        src="/Portrait.webp"
        alt="Colin B. Fink"
        className="bg-gray-200 size-75 object-cover rounded-full shadow-md"
        style={{ marginTop: "var(--space-phi)", marginBottom: "calc(var(--space-phi) * 0.75)" }}
      />
      <h1 className="text-4xl italic font-bold text-center">Colin B. Fink</h1>
      <h2 className="text-2xl text-center">Writer | Director | Editor</h2>
    </div>
  );
}
export default Portrait;
