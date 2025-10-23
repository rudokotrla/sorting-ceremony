"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { House } from "@/types/house";
import { houses } from "@/data/houses";
import HouseEmblem from "./HouseEmblem";

interface SeatConfigProps {
  onStart: (houseSeats: House[]) => void;
}

export default function SeatConfig({ onStart }: SeatConfigProps) {
  const [seats, setSeats] = useState<Record<string, number>>(
    houses.reduce((acc, house) => ({ ...acc, [house.name]: 2 }), {})
  );

  const handleSeatChange = (houseName: string, delta: number) => {
    setSeats((prev) => {
      const currentValue = prev[houseName];
      const newValue = Math.max(0, Math.min(50, currentValue + delta));
      return { ...prev, [houseName]: newValue };
    });
  };

  const handleStart = () => {
    const totalSeats = Object.values(seats).reduce(
      (sum, count) => sum + count,
      0
    );
    if (totalSeats === 0) return;

    const housesWithSeats = houses.map((house) => ({
      ...house,
      seats: seats[house.name],
    }));

    onStart(housesWithSeats);
  };

  const totalSeats = Object.values(seats).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 text-amber-100 tracking-wide">
            Sorting Ceremony
          </h1>
          <p className="text-lg text-slate-300">
            Set the number of seats for each house
          </p>
        </div>

        <div className="space-y-5">
          {houses.map((house) => (
            <div
              key={house.name}
              className={`${house.bgColor} rounded-2xl p-5 border ${house.borderColor} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center space-x-4">
                <HouseEmblem houseName={house.name} className="w-16 h-16" />
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${house.textColor} mb-3`}
                  >
                    {house.name}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <label className={`${house.textColor} text-sm opacity-80`}>
                      Seats:
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSeatChange(house.name, -1)}
                        disabled={seats[house.name] === 0}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          seats[house.name] === 0
                            ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                            : "bg-slate-600/70 hover:bg-slate-500/80 text-slate-200 hover:scale-105"
                        }`}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <div className="w-14 text-center">
                        <span className="text-white font-semibold text-lg">
                          {seats[house.name]}
                        </span>
                      </div>
                      <button
                        onClick={() => handleSeatChange(house.name, 1)}
                        disabled={seats[house.name] >= 50}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          seats[house.name] >= 50
                            ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                            : "bg-slate-600/70 hover:bg-slate-500/80 text-slate-200 hover:scale-105"
                        }`}
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-300 mb-5">
            Total seats:{" "}
            <span className="text-amber-200 font-semibold">{totalSeats}</span>
          </p>
          <button
            onClick={handleStart}
            disabled={totalSeats === 0}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
              totalSeats === 0
                ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-600/80 to-amber-500/80 hover:from-amber-500/90 hover:to-amber-400/90 text-amber-50 shadow-lg hover:shadow-amber-500/25 hover:scale-105"
            }`}
          >
            Start Sorting Ceremony
          </button>
        </div>
      </div>
    </div>
  );
}
