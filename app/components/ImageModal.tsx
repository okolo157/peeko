"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { Instagram, Maximize2 } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: {
    src: string;
    alt: string;
    description: string;
    location: string;
    camera?: string;
    instagram: string;
  };
}

export default function ImageModal({
  isOpen,
  onClose,
  photo,
}: ImageModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when modal opens
  const handleClose = () => {
    setIsFlipped(false);
    onClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-110 text-white hover:text-zinc-400 transition-colors"
        aria-label="Close"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Flip card container */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front - Image */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className=" w-full h-full bg-zinc-900  overflow-hidden shadow-2xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1536px"
                priority
              />

              {/* Flip button - centered, faint by default */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsFlipped(true)}
                  className="
      group 
      p-4 sm:p-6 
      rounded-full 
      bg-black/30 hover:bg-black/50 
      backdrop-blur-sm 
      transition-all duration-300 
      opacity-40 hover:opacity-100 
      focus:opacity-100
    "
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-white/80 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Back - Info */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black shadow-2xl p-8 flex flex-col justify-end overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Info Block */}
            <div className="max-w-sm text-white space-y-6">
              {/* Title */}
              <h3
                className="text-3xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-white"
                style={{
                  fontFamily: "var(--font-waiting-for-the-sunrise)",
                  fontWeight: 400,
                }}
              >
                {photo.alt}
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-lg text-zinc-300 leading-relaxed"
                style={{
                  fontFamily: "var(--font-waiting-for-the-sunrise)",
                  fontWeight: 400,
                }}
              >
                {photo.description}
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 text-zinc-400">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-waiting-for-the-sunrise)",
                    fontWeight: 400,
                  }}
                >
                  {photo.location}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <a
                  href={photo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-5 py-2 text-lg md:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    fontFamily: "var(--font-waiting-for-the-sunrise)",
                    fontWeight: 400,
                  }}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 ... (rest of path)" />
                  </svg>
                  <Instagram />
                  Instagram
                </a>

                <button
                  onClick={() => setIsFlipped(false)}
                  className="px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-lg md:text-2xl text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-waiting-for-the-sunrise)",
                    fontWeight: 400,
                  }}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
