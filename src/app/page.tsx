'use client';

import { useState } from 'react';
import { House, GameState } from '@/types/house';
import SeatConfig from '@/components/SeatConfig';
import SortingCeremony from '@/components/SortingCeremony';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [houseSeats, setHouseSeats] = useState<House[]>([]);

  const handleStart = (houses: House[]) => {
    setHouseSeats(houses);
    setGameState('sorting');
  };

  const handleRestart = () => {
    setGameState('setup');
    setHouseSeats([]);
  };

  if (gameState === 'setup') {
    return <SeatConfig onStart={handleStart} />;
  }

  return <SortingCeremony houses={houseSeats} onRestart={handleRestart} />;
}
