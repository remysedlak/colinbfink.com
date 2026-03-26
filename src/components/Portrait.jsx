import { useEffect, useState } from "react";

const PORTRAIT_SRC = "/Portrait.webp";

function Portrait() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().finally(() => {
          if (!cancelled) {
            setIsLoaded(true);
          }
        });
      } else if (!cancelled) {
        setIsLoaded(true);
      }
    };

    img.onerror = () => {
      if (!cancelled) {
        setIsLoaded(true);
      }
    };

    img.src = PORTRAIT_SRC;

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="flex flex-col max-w-2xl items-center text-center"
      style={{ gap: "calc(var(--space-1) * 1.1)" }}
    >
      <div
        className="relative size-75"
        style={{ marginTop: "var(--space-phi)", marginBottom: "calc(var(--space-phi) * 0.75)" }}
      >
        <div
          className={`absolute inset-0 rounded-full bg-gray-200 shadow-md transition-opacity duration-300 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={PORTRAIT_SRC}
          alt="Colin B. Fink"
          className={`size-75 object-cover rounded-full shadow-md transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          width="300"
          height="300"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <h1 className="text-4xl italic font-bold text-center">Colin B. Fink</h1>
      <h2 className="text-2xl text-center">Writer | Director | Editor</h2>
    </div>
  );
}
export default Portrait;
