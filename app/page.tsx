import Header from "./components/Header";
import Hero from "./components/Hero";
import PhotoGrid from "./components/PhotoGrid";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-32 pb-12">
        <div className="max-w-[95vw] mx-auto px-4 md:px-6">
          <Hero text="PEEKO" description="I move where the light feels right" />
          <PhotoGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
