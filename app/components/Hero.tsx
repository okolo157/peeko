export default function Hero({
  text,
  description,
}: {
  text: string;
  description: string;
}) {
  return (
    <div className="mb-12 md:mb-16 text-center">
      <h2
        className="relative text-4xl md:text-5xl lg:text-7xl tracking-tight mb-3 md:mb-4"
        style={{
          fontFamily: "var(--font-orbitron)",
          fontWeight: 700,
          letterSpacing: "0.1em",
        }}
      >
        <span className="relative inline-block">
          <span className="absolute top-0 left-0 text-white/40 -translate-x-0.5 -translate-y-0.5 animate-[shimmer_3s_ease-in-out_infinite]">
            {text}
          </span>
          <span className="absolute top-0 left-0 text-white/40 translate-x-0.5 translate-y-0.5 animate-[shimmer_3s_ease-in-out_infinite_reverse]">
            {text}
          </span>
          <span className="absolute inset-0 text-white blur-sm opacity-60 animate-pulse">
            {text}
          </span>
          <span className="relative text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-100 to-white animate-[gradient_8s_ease-in-out_infinite] bg-size-[200%_auto]">
            {text}
          </span>
        </span>
      </h2>
      <p
        className="text-zinc-400 text-lg md:text-xl tracking-wide max-w-2xl mx-auto px-4"
        style={{
          fontFamily: "var(--font-waiting-for-the-sunrise)",
          fontWeight: 400,
        }}
      >
        {description}
      </p>
    </div>
  );
}
