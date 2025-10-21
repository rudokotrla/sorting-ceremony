interface HouseEmblemProps {
  houseName: string;
  className?: string;
}

export default function HouseEmblem({ houseName, className = "w-24 h-24" }: HouseEmblemProps) {
  const getEmblemSVG = (house: string) => {
    switch (house) {
      case 'Gryffindor':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <circle cx="50" cy="50" r="45" fill="#D3A625" stroke="#8B0000" strokeWidth="3"/>
            <polygon points="50,20 60,40 80,40 66,52 72,72 50,60 28,72 34,52 20,40 40,40" fill="#8B0000"/>
            <text x="50" y="85" textAnchor="middle" fontSize="8" fill="#8B0000" fontWeight="bold">G</text>
          </svg>
        );
      case 'Hufflepuff':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <circle cx="50" cy="50" r="45" fill="#EEE117" stroke="#000" strokeWidth="3"/>
            <polygon points="30,35 70,35 65,45 60,55 55,65 45,65 40,55 35,45" fill="#000"/>
            <circle cx="45" cy="45" r="3" fill="#EEE117"/>
            <circle cx="55" cy="45" r="3" fill="#EEE117"/>
            <text x="50" y="85" textAnchor="middle" fontSize="8" fill="#000" fontWeight="bold">H</text>
          </svg>
        );
      case 'Ravenclaw':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <circle cx="50" cy="50" r="45" fill="#222F5B" stroke="#D3A625" strokeWidth="3"/>
            <polygon points="35,25 50,15 65,25 60,35 55,45 50,50 45,45 40,35" fill="#D3A625"/>
            <polygon points="40,50 60,50 58,60 55,70 45,70 42,60" fill="#D3A625"/>
            <text x="50" y="85" textAnchor="middle" fontSize="8" fill="#D3A625" fontWeight="bold">R</text>
          </svg>
        );
      case 'Slytherin':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <circle cx="50" cy="50" r="45" fill="#2A623D" stroke="#C0C0C0" strokeWidth="3"/>
            <path d="M30,30 Q50,20 70,30 Q65,40 50,50 Q35,40 30,30" fill="#C0C0C0"/>
            <path d="M35,50 Q50,45 65,50 Q60,65 50,70 Q40,65 35,50" fill="#C0C0C0"/>
            <circle cx="42" cy="35" r="2" fill="#2A623D"/>
            <circle cx="58" cy="35" r="2" fill="#2A623D"/>
            <text x="50" y="85" textAnchor="middle" fontSize="8" fill="#C0C0C0" fontWeight="bold">S</text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <circle cx="50" cy="50" r="45" fill="#666" stroke="#ccc" strokeWidth="3"/>
            <text x="50" y="55" textAnchor="middle" fontSize="12" fill="#ccc" fontWeight="bold">?</text>
          </svg>
        );
    }
  };

  return <div className="flex justify-center">{getEmblemSVG(houseName)}</div>;
}