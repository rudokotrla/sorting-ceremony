export interface House {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  seats: number;
}

export interface HouseSeat {
  house: string;
  availableSeats: number;
}

export type GameState = 'setup' | 'sorting' | 'completed';