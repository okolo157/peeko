"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Instagram, Twitter } from "lucide-react";

export default function Booking() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true);
  };

  const handleSocialClick = (username: string, url: string) => {
    if (confirm(`Do you want to visit @${username}?`)) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
                Book a Session
              </span>
            </h1>
            <p
              className="text-zinc-400 max-w-2xl mx-auto mt-4"
              style={{ fontFamily: "var(--font-waiting-for-the-sunrise)" }}
            >
              Whether it’s portraits, landscapes, or collaborations, let’s
              create something timeless together. Fill the form below to book
              your session.
            </p>
          </div>

          {/* Booking Form */}
          {success && (
            <p className="text-green-400 text-center mb-6">
              Your booking request has been sent successfully!
            </p>
          )}
          <form
            className="bg-zinc-900 p-8 shadow-md space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-400 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3  bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white"
                  required
                />
              </div>
              <div>
                <label className="block text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-3  bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-2">Phone</label>
              <input
                type="tel"
                placeholder="+234 800 000 0000"
                className="w-full p-3  bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-2">
                Type of Session
              </label>
              <select className="w-full p-3  bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white">
                <option>Portrait</option>
                <option>Event</option>
                <option>Commercial</option>
                <option>Collaboration</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 mb-2">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full p-3  bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-2">
                Additional Notes
              </label>
              <textarea
                placeholder="Anything else you want me to know..."
                className="w-full p-3  bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white"
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 hover:bg-zinc-100 transition-colors"
            >
              Submit Booking
            </button>
          </form>

          {/* Optional Social Links */}
          <div className="text-center pt-12 border-t border-zinc-800 mt-12">
            <h3
              className="text-white font-medium mb-6"
              style={{ fontFamily: "var(--font-waiting-for-the-sunrise)" }}
            >
              Follow My Work
            </h3>
            <div className="flex justify-center gap-6">
              <button
                onClick={() =>
                  handleSocialClick(
                    "peeko.hd",
                    "https://instagram.com/peeko.hd"
                  )
                }
                className="text-zinc-400 flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram />
              </button>
              <button
                onClick={() =>
                  handleSocialClick("peeko.hd", "https://twitter.com/peeko.hd")
                }
                className="text-zinc-400 flex items-center gap-2 hover:text-white transition-colors"
              >
                <Twitter />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
