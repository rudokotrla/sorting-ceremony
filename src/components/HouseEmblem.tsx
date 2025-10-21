import Image from "next/image";

interface HouseEmblemProps {
  houseName: string;
  className?: string;
}

export default function HouseEmblem({
  houseName,
  className = "w-24 h-24",
}: HouseEmblemProps) {
  const getImageSrc = (house: string) => {
    switch (house) {
      case "Gryffindor":
        return "/images/gryffindor.jpg";
      case "Hufflepuff":
        return "/images/hufflepuff.jpg";
      case "Ravenclaw":
        return "/images/ravenclaw.jpg";
      case "Slytherin":
        return "/images/slytherin.jpg";
      default:
        return "";
    }
  };

  const imageSrc = getImageSrc(houseName);

  if (!imageSrc) {
    return (
      <div
        className={`flex justify-center items-center ${className} bg-gray-600 rounded-full`}
      >
        <span className="text-gray-300 font-bold">?</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Image
        src={imageSrc}
        alt={`${houseName} house crest`}
        width={96}
        height={96}
        className={`${className} rounded-lg object-cover`}
        priority
      />
    </div>
  );
}
