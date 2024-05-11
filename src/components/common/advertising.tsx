import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface Ad {
  url: string;
  image: string;
  alt: string;
  description?: string;
}

const ads: Ad[] = [
  {
    url: "https://open.spotify.com/intl-es",
    image: "/images/ad.jpg",
    alt: "Spotify",
    description: "Escucha música en Spotify"
  },
  {
    url: "https://www.youtube.com",
    image: "/images/ad2.png",
    alt: "YouTube",
    description: "Mira vídeos en YouTube"
  },
  {
    url: "https://www.netflix.com/se/",
    image: "/images/ad3.png",
    alt: "Netflix",
    description: "Disfruta de series y películas en Netflix"
  }
];

const Advertising: React.FC = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prevAd) => (prevAd + 1) % ads.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const adToShow = ads[currentAd % ads.length];

  if (!adToShow) {
    return null; // Si el anuncio actual no está definido, no renderizar nada
  }

  return (
    <div className="flex items-center justify-center">
      <div key={adToShow.url} className="text-center">
        <a href={adToShow.url} target="_blank" rel="noopener noreferrer">
          <Image
            src={adToShow.image}
            alt={adToShow.alt}
            width={200}
            height={100}
            className="mx-auto"
          />
        </a>
        {adToShow.description && <p>{adToShow.description}</p>}
      </div>
    </div>
  );
};

export default Advertising;
