'use client';

import { useState, useRef } from 'react';
import { House } from '@/types/house';
import HouseEmblem from './HouseEmblem';

interface SortingCeremonyProps {
  houses: House[];
  onRestart: () => void;
}

export default function SortingCeremony({ houses, onRestart }: SortingCeremonyProps) {
  const [availableSeats, setAvailableSeats] = useState(() => 
    houses.reduce((acc, house) => ({ ...acc, [house.name]: house.seats }), {} as Record<string, number>)
  );
  const [lastSorted, setLastSorted] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const totalRemainingSeats = Object.values(availableSeats).reduce((sum, count) => sum + count, 0);

  const askSortingHat = () => {
    if (totalRemainingSeats === 0 || isAnimating) return;

    setIsAnimating(true);
    
    // Get houses with available seats
    const availableHouses = houses.filter(house => availableSeats[house.name] > 0);
    
    // Randomly select a house
    const randomIndex = Math.floor(Math.random() * availableHouses.length);
    const selectedHouse = availableHouses[randomIndex];

    // Simulate thinking time
    setTimeout(() => {
      setLastSorted(selectedHouse.name);
      setAvailableSeats(prev => ({
        ...prev,
        [selectedHouse.name]: prev[selectedHouse.name] - 1
      }));
      
      // Play audio if available (placeholder for now)
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Audio play failed - this is fine for now
        });
      }
      
      setIsAnimating(false);
    }, 2000);
  };

  const getHouseByName = (name: string) => houses.find(house => house.name === name);

  if (totalRemainingSeats === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white p-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8 text-yellow-400 font-magic">
            Sorting Complete!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            All students have been sorted into their houses.
          </p>
          <button
            onClick={onRestart}
            className="w-full py-3 px-6 rounded-lg font-bold text-lg bg-yellow-600 hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl transition-colors"
          >
            Start New Ceremony
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-yellow-400 font-magic">
            Sorting Ceremony
          </h1>
          <p className="text-lg text-gray-300">
            Students remaining: <span className="text-yellow-400 font-bold">{totalRemainingSeats}</span>
          </p>
        </div>

        {/* Last sorted announcement */}
        {lastSorted && !isAnimating && (
          <div className="mb-8 p-6 bg-gray-800 rounded-lg border-2 border-yellow-400 animate-pulse">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-magic">
                {lastSorted}!
              </h2>
              <HouseEmblem houseName={lastSorted} className="w-32 h-32 mx-auto" />
            </div>
          </div>
        )}

        {/* Sorting Hat Button */}
        <div className="text-center mb-8">
          <button
            onClick={askSortingHat}
            disabled={isAnimating}
            className={`w-full py-4 px-6 rounded-lg font-bold text-xl transition-all duration-300 ${
              isAnimating 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-amber-700 hover:bg-amber-600 text-yellow-100 shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isAnimating ? '🎩 Thinking...' : '🎩 Ask Sorting Hat'}
          </button>
        </div>

        {/* House seats display */}
        <div className="space-y-4">
          {houses.map((house) => (
            <div 
              key={house.name} 
              className={`${house.bgColor} rounded-lg p-4 border-2 ${house.borderColor} ${
                availableSeats[house.name] === 0 ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HouseEmblem houseName={house.name} className="w-12 h-12" />
                  <h3 className={`text-lg font-bold ${house.textColor}`}>
                    {house.name}
                  </h3>
                </div>
                <div className={`text-lg font-bold ${house.textColor}`}>
                  {availableSeats[house.name]} seats
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onRestart}
            className="text-gray-400 hover:text-white underline transition-colors"
          >
            Restart Ceremony
          </button>
        </div>

        {/* Audio placeholder */}
        <audio
          ref={audioRef}
          preload="none"
          className="hidden"
        >
          {/* Audio source will be added when you provide the files */}
        </audio>
      </div>
    </div>
  );
}