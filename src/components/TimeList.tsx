import React, { useState, useEffect } from "react";
import TimeZone from "./TimeZone";
import cityToTimezone from "./Cities";

type CityItem = {
  city: string;
  timezone: string;
  favorite: boolean;
};

function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(/(?=[A-Z])| /)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const TimeList: React.FC = () => {
  // Step 1: create initial list
  const initialCities: CityItem[] = Object.entries(cityToTimezone)
    .slice(0, 15) // take only first 15 cities
    .map(([cityKey, tz]) => ({
      city: capitalizeWords(cityKey),
      timezone: tz as string,
      favorite: false,
    }));

  const [cities, setCities] = useState<CityItem[]>(initialCities);

  // Step 2: load favorites from localStorage and merge with initial cities
  useEffect(() => {
    const stored = localStorage.getItem("cities");
    if (stored) {
      try {
        const storedCities: CityItem[] = JSON.parse(stored);
        setCities((prev) =>
          prev.map((c) => {
            const match = storedCities.find(
              (s) => s.city.toLowerCase() === c.city.toLowerCase()
            );
            return match ? { ...c, favorite: match.favorite } : c;
          })
        );
      } catch {
        console.error("Failed to parse localStorage cities");
      }
    }
  }, []);

  // Step 3: toggle favorite
  const toggleFavorite = (cityName: string) => {
    setCities((prev) => {
      const updated = prev.map((c) =>
        c.city === cityName ? { ...c, favorite: !c.favorite } : c
      );

      // save all cities to localStorage (only favorites will have favorite=true)
      const toStore = updated.filter((c) => c.favorite);
      localStorage.setItem("cities", JSON.stringify(toStore));

      return updated;
    });
  };

  return (
    <section className="time-list-container">
      <section className="time-list-header">
        <h2> Popular cities current time:</h2>
      </section>

      {cities.map((c, i) => (
        <TimeZone
          key={i}
          timezone={c.timezone}
          city={c.city}
          favorite={c.favorite}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </section>
  );
};

export default TimeList;
