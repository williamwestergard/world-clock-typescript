import React, { useState } from "react";
import TimeZone from "./TimeZone";
import cityToTimezone from "./Cities";

type CityItem = {
  city: string;
  timezone: string;
  favorite: boolean;
};

const TimeList: React.FC = () => {
  // Convert cityToTimezone object into an array of {city, timezone}
const initialCities: CityItem[] = Object.entries(cityToTimezone).map(
  ([cityKey, tz]) => ({
    city: capitalizeWords(cityKey),
    timezone: tz as string,   // 👈 force type
    favorite: false,
  })
);

  const [cities, setCities] = useState<CityItem[]>(initialCities);

  const toggleFavorite = (cityName: string) => {
    setCities((prev) =>
      prev.map((c) =>
        c.city === cityName ? { ...c, favorite: !c.favorite } : c
      )
    );
  };

  // Helper to capitalize
  function capitalizeWords(str: string) {
    return str
      .toLowerCase()
      .split(/(?=[A-Z])| /) // split on uppercase or space
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Sort so favorites show first (optional)
  const sortedCities = [...cities].sort(
    (a, b) => Number(b.favorite) - Number(a.favorite)
  );

  return (
    <div>
      <h1>World Clock List</h1>
      {sortedCities.map((c, i) => (
        <TimeZone
          key={i}
          timezone={c.timezone}
          city={c.city}
          favorite={c.favorite}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default TimeList;
