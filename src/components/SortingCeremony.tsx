"use client";

import { useState, useRef, useEffect } from "react";
import { House } from "@/types/house";
import HouseEmblem from "./HouseEmblem";
import Image from "next/image";

interface SortingCeremonyProps {
  houses: House[];
  onRestart: () => void;
}

export default function SortingCeremony({
  houses,
  onRestart,
}: SortingCeremonyProps) {
  const [availableSeats, setAvailableSeats] = useState(() =>
    houses.reduce(
      (acc, house) => ({ ...acc, [house.name]: house.seats }),
      {} as Record<string, number>
    )
  );
  const [lastSorted, setLastSorted] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isAnnouncing, setIsAnnouncing] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const totalRemainingSeats = Object.values(availableSeats).reduce(
    (sum, count) => sum + count,
    0
  );

  // Effect to handle audio ended event
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedHouse) return;

    const handleThinkingEnd = () => {
      setLastSorted(selectedHouse.name);
      setAvailableSeats((prev) => ({
        ...prev,
        [selectedHouse.name]: prev[selectedHouse.name] - 1,
      }));
      setIsAnnouncing(true);

      // Play house-specific audio after thinking
      if (audioRef.current) {
        const audioFileName = selectedHouse.name.toLowerCase() + ".mp3";
        audioRef.current.src = `/audio/${audioFileName}`;
        audioRef.current.play().catch((error) => {
          console.log("House audio play failed:", error);
        });
      }

      setIsThinking(false);
      setSelectedHouse(null); // Clear selected house
    };

    audio.addEventListener("ended", handleThinkingEnd);

    // Cleanup function
    return () => {
      audio.removeEventListener("ended", handleThinkingEnd);
    };
  }, [selectedHouse]); // Re-run when selectedHouse changes

  // Effect to handle house announcement audio ending
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isAnnouncing) return;

    const handleAnnouncementEnd = () => {
      setIsAnnouncing(false);
    };

    audio.addEventListener("ended", handleAnnouncementEnd);

    // Cleanup function
    return () => {
      audio.removeEventListener("ended", handleAnnouncementEnd);
    };
  }, [isAnnouncing]); // Re-run when isAnnouncing changes

  const askSortingHat = () => {
    if (totalRemainingSeats === 0 || isThinking) return;

    setIsThinking(true);

    // Get houses with available seats
    const availableHouses = houses.filter(
      (house) => availableSeats[house.name] > 0
    );

    // Randomly select a house
    const randomIndex = Math.floor(Math.random() * availableHouses.length);
    const selectedHouse = availableHouses[randomIndex];

    // Set the selected house (this will trigger the useEffect)
    setSelectedHouse(selectedHouse);

    // Play thinking audio immediately
    if (audioRef.current) {
      const thinkingAudio =
        Math.random() < 0.5 ? "hat_thinking1.mp3" : "hat_thinking2.mp3";
      audioRef.current.src = `/audio/${thinkingAudio}`;

      audioRef.current.play().catch((error) => {
        console.log("Thinking audio play failed:", error);
        // If audio fails to play, fallback to timeout
        setTimeout(() => {
          setLastSorted(selectedHouse.name);
          setAvailableSeats((prev) => ({
            ...prev,
            [selectedHouse.name]: prev[selectedHouse.name] - 1,
          }));
          setIsThinking(false);
          setSelectedHouse(null);
        }, 2000);
      });
    }
  };

  if (totalRemainingSeats === 0 && !isAnnouncing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-10 text-amber-100 tracking-wide">
            Sorting Complete!
          </h1>
          <p className="text-xl text-slate-300 mb-10">
            All students have been sorted into their houses.
          </p>
          <button
            onClick={onRestart}
            className="w-full py-4 px-6 rounded-2xl font-semibold text-lg bg-gradient-to-r from-amber-600/80 to-amber-500/80 hover:from-amber-500/90 hover:to-amber-400/90 text-amber-50 shadow-lg hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300"
          >
            Start New Ceremony
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 text-amber-100 tracking-wide">
            Sorting Ceremony
          </h1>
          <p className="text-lg text-slate-300">
            Students remaining:{" "}
            <span className="text-amber-200 font-semibold">
              {totalRemainingSeats}
            </span>
          </p>
        </div>

        {/* Last sorted announcement */}
        {lastSorted && !isThinking && (
          <div className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-amber-500/30 backdrop-blur-sm shadow-xl animate-pulse">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-amber-200 mb-4 tracking-wide">
                {lastSorted}!
              </h2>
              <HouseEmblem
                houseName={lastSorted}
                className="w-32 h-32 mx-auto"
              />
            </div>
          </div>
        )}

        {/* Sorting Hat Button */}
        <div className="text-center mb-8">
          <button
            onClick={askSortingHat}
            disabled={isThinking || isAnnouncing}
            className={`flex gap-x-3 items-center justify-center w-full py-4 px-6 rounded-2xl font-semibold text-xl transition-all duration-300 ${
              isThinking || isAnnouncing
                ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-700/80 to-amber-600/80 hover:from-amber-600/90 hover:to-amber-500/90 text-amber-50 shadow-lg hover:shadow-amber-500/25 hover:scale-105"
            }`}
          >
            <Image
              src="/images/sorting_hat.png"
              alt="Sorting Hat"
              width={512}
              height={512}
              className="size-12"
            />
            <span>
              {isThinking
                ? "Thinking..."
                : isAnnouncing
                ? "Announcing..."
                : "Ask Sorting Hat"}
            </span>
          </button>
        </div>

        {/* House seats display */}
        <div className="space-y-4">
          {houses.map((house) => (
            <div
              key={house.name}
              className={`${house.bgColor} rounded-2xl p-5 border ${
                house.borderColor
              } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                availableSeats[house.name] === 0 ? "opacity-40" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HouseEmblem houseName={house.name} className="w-12 h-12" />
                  <h3 className={`text-lg font-semibold ${house.textColor}`}>
                    {house.name}
                  </h3>
                </div>
                <div className={`text-lg font-semibold ${house.textColor}`}>
                  {availableSeats[house.name]} seats
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onRestart}
            className="text-slate-400 hover:text-amber-200 underline transition-colors duration-200"
          >
            Restart Ceremony
          </button>
        </div>

        {/* Audio element for house announcements */}
        <audio ref={audioRef} preload="none" className="hidden" />

        {/* Preload all audio files for better performance */}
        <div className="hidden">
          <audio preload="metadata">
            <source src="/audio/hat_thinking1.mp3" type="audio/mpeg" />
          </audio>
          <audio preload="metadata">
            <source src="/audio/hat_thinking2.mp3" type="audio/mpeg" />
          </audio>
          <audio preload="metadata">
            <source src="/audio/gryffindor.mp3" type="audio/mpeg" />
          </audio>
          <audio preload="metadata">
            <source src="/audio/hufflepuff.mp3" type="audio/mpeg" />
          </audio>
          <audio preload="metadata">
            <source src="/audio/ravenclaw.mp3" type="audio/mpeg" />
          </audio>
          <audio preload="metadata">
            <source src="/audio/slytherin.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
}
