import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTimezoneForCity } from "../components/Cities";
import CityCard from "./CityCard"; 

type CityItem = {
  city: string;
  timezone: string;
  favorite: boolean;
};

function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function CityPage() {
  const { cityName } = useParams<{ cityName: string }>();
  const rawCity = cityName ? decodeURIComponent(cityName) : undefined;
  const cityDisplay = rawCity ? capitalizeWords(rawCity) : undefined;
  const tz = rawCity ? getTimezoneForCity(rawCity) : undefined;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!rawCity) return;
    const stored = localStorage.getItem("cities");
    if (!stored) return;
    try {
      const parsed: CityItem[] = JSON.parse(stored);
      const found = parsed.find(
        (c) => c.city.toLowerCase() === cityDisplay!.toLowerCase()
      );
      setIsFavorite(Boolean(found && found.favorite));
    } catch {
      setIsFavorite(false);
    }
  }, [rawCity, cityDisplay]);

  const toggleFavorite = (cityArg?: string) => {
    if (!rawCity || !tz) return;

    const cityToUse = cityArg ? capitalizeWords(cityArg) : cityDisplay!;
    const key = "cities";
    const stored = localStorage.getItem(key);
    let list: CityItem[] = stored ? JSON.parse(stored) : [];

    const idx = list.findIndex(
      (c) => c.city.toLowerCase() === cityToUse.toLowerCase()
    );

    if (idx >= 0) {
      const newFavorite = !list[idx].favorite;
      if (newFavorite) {
        list[idx] = { ...list[idx], favorite: true };
      } else {
        list.splice(idx, 1);
      }
      localStorage.setItem(key, JSON.stringify(list));
      setIsFavorite(newFavorite);
    } else {
      const newEntry: CityItem = {
        city: cityToUse,
        timezone: tz,
        favorite: true,
      };
      list.push(newEntry);
      localStorage.setItem(key, JSON.stringify(list));
      setIsFavorite(true);
    }
  };

  if (!rawCity) return <p>No city selected</p>;
  if (!tz) return <p>Unknown city: {cityDisplay}</p>;

  return (
    <section style={{ padding: "20px" }}>
      <CityCard
        city={cityDisplay!}
        timezone={tz}
        favorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      
    </section>
  );
}

export default CityPage;
