"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ImageModal from "./ImageModal";
import { Maximize2 } from "lucide-react";

import { photos } from "@/utils/photos";

export default function PhotoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(
    null
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Gyroscope effect for mobile
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const gamma = event.gamma || 0; // Left to right tilt (-90 to 90)
      const beta = event.beta || 0; // Front to back tilt (-180 to 180)

      // Normalize to smaller range for subtle effect
      const tiltX = Math.max(-8, Math.min(8, beta / 10));
      const tiltY = Math.max(-8, Math.min(8, gamma / 10));

      mobileCardRefs.current.forEach((card) => {
        if (card) {
          card.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
        }
      });
    };

    // Request permission for iOS 13+
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      "requestPermission" in DeviceOrientationEvent
    ) {
      (
        DeviceOrientationEvent as unknown as {
          requestPermission: () => Promise<string>;
        }
      )
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS devices
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    setHoveredIndex(null);
  };

  const handleTap = (index: number) => {
    setTappedIndex(index);
    setTimeout(() => setTappedIndex(null), 400);
  };

  return (
    <>
      {/* Mobile (Vertical Scroll) */}
      <div className="block lg:hidden px-4 md:px-6 space-y-6 pb-8">
        {photos.map((photo, index) => (
          <div
            key={index}
            ref={(el) => {
              mobileCardRefs.current[index] = el;
            }}
            className={`group relative w-full aspect-[4/5] overflow-hidden bg-zinc-900 transition-all duration-300 ${
              tappedIndex === index ? "scale-95" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
            onTouchStart={() => handleTap(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              sizes="100vw"
            />

            {/* Subtle Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Small Expand Icon (Non-blocking) */}
            <button
              onClick={() => setSelectedPhoto(photo)}
              className={`absolute top-3 right-3 p-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all ${
                tappedIndex === index ? "opacity-100 scale-110" : "opacity-90"
              } hover:opacity-100 active:scale-95`}
            >
              <Maximize2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Desktop (Horizontal Scroll with 4 per row) */}
      <div className="hidden lg:block relative -mx-6">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4">
          <div className="flex gap-6 px-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="group relative shrink-0 cursor-pointer w-[calc((100vw-6rem)/4)] h-[600px] overflow-hidden bg-zinc-900 transition-all duration-200 ease-out"
                style={{ transformStyle: "preserve-3d" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  <div
                    className={`px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white text-sm font-medium transition-all duration-300 ${
                      hoveredIndex === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90"
                    }`}
                  >
                    Click for More
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <ImageModal
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          photo={selectedPhoto}
        />
      )}
    </>
  );
}
