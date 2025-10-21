'use client';

import { useState } from 'react';
import { House } from '@/types/house';
import { houses } from '@/data/houses';
import HouseEmblem from './HouseEmblem';

interface SeatConfigProps {
  onStart: (houseSeats: House[]) => void;
}

export default function SeatConfig({ onStart }: SeatConfigProps) {
  const [seats, setSeats] = useState<Record<string, number>>(
    houses.reduce((acc, house) => ({ ...acc, [house.name]: 5 }), {})
  );

  const handleSeatChange = (houseName: string, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setSeats(prev => ({ ...prev, [houseName]: numValue }));
  };

  const handleStart = () => {
    const totalSeats = Object.values(seats).reduce((sum, count) => sum + count, 0);
    if (totalSeats === 0) return;

    const housesWithSeats = houses.map(house => ({
      ...house,
      seats: seats[house.name]
    }));
    
    onStart(housesWithSeats);
  };

  const totalSeats = Object.values(seats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-yellow-400 font-magic">
            Sorting Ceremony
          </h1>
          <p className="text-lg text-gray-300">
            Set the number of seats for each house
          </p>
        </div>

        <div className="space-y-6">
          {houses.map((house) => (
            <div 
              key={house.name} 
              className={`${house.bgColor} rounded-lg p-4 border-2 ${house.borderColor}`}
            >
              <div className="flex items-center space-x-4">
                <HouseEmblem houseName={house.name} className="w-16 h-16" />
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${house.textColor} mb-2`}>
                    {house.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <label className={`${house.textColor} text-sm`}>
                      Seats:
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={seats[house.name]}
                      onChange={(e) => handleSeatChange(house.name, e.target.value)}
                      className="w-20 px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">
            Total seats: <span className="text-yellow-400 font-bold">{totalSeats}</span>
          </p>
          <button
            onClick={handleStart}
            disabled={totalSeats === 0}
            className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-colors ${
              totalSeats === 0 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl'
            }`}
          >
            Start Sorting Ceremony
          </button>
        </div>
      </div>
    </div>
  );
}