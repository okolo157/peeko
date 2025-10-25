import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="mb-12 md:mb-16 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-4">
              <span
                className="font-bold"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                ABOUT
              </span>
            </h1>
            <p
              className="text-zinc-400 text-lg md:text-xl tracking-wide max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-waiting-for-the-sunrise)" }}
            >
              Photographer, Visual Storyteller, Dreamer
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Profile Image */}
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-zinc-800">
              <Image
                src="/peekologo.jpg"
                alt="Peeko"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div
              className="space-y-6 text-zinc-300 leading-relaxed text-center"
              style={{ fontFamily: "var(--font-waiting-for-the-sunrise)" }}
            >
              <p className="text-lg">
                Welcome to my world, where fleeting moments are captured through
                a lens that observes and feels.
              </p>
              <p>
                Years behind the camera have taught me to see beauty in the
                overlooked. Every frame tells a story, waiting to unfold.
              </p>
              <p>
                Each shot is intentional—crafted with attention to light,
                composition, and the subtle emotions that make it alive.
              </p>
              <p>
                Rooted in Nigeria 🇳🇬 yet speaking a language beyond borders, I
                pursue moments, colors, and feelings that linger long after the
                shutter clicks.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-zinc-800">
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  6+
                </div>
                <div className="text-sm text-zinc-400 uppercase tracking-wide">
                  Years
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  10+
                </div>
                <div className="text-sm text-zinc-400 uppercase tracking-wide">
                  Countries
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  100+
                </div>
                <div className="text-sm text-zinc-400 uppercase tracking-wide">
                  Projects
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  5K+
                </div>
                <div className="text-sm text-zinc-400 uppercase tracking-wide">
                  Photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
