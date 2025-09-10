// src/pages/CityPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeZone from "../components/TimeZone";
import { getTimezoneForCity } from "../components/Cities";

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
  // decode in case you used encodeURIComponent when navigating
  const rawCity = cityName ? decodeURIComponent(cityName) : undefined;
  const cityDisplay = rawCity ? capitalizeWords(rawCity) : undefined;
  const tz = rawCity ? getTimezoneForCity(rawCity) : undefined;

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Load favorite status for this city from localStorage
  useEffect(() => {
    if (!rawCity) return;
    const stored = localStorage.getItem("cities");
    if (!stored) {
      setIsFavorite(false);
      return;
    }

    try {
      const parsed: CityItem[] = JSON.parse(stored);
      const found = parsed.find(
        (c) => c.city.toLowerCase() === cityDisplay!.toLowerCase()
      );
      setIsFavorite(Boolean(found && found.favorite));
    } catch (err) {
      console.error("Failed to parse cities from localStorage", err);
      setIsFavorite(false);
    }
  }, [rawCity, cityDisplay]);

  // Optional: keep page in sync if another tab updates localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== "cities") return;
      if (!rawCity) return;
      const stored = localStorage.getItem("cities");
      if (!stored) {
        setIsFavorite(false);
        return;
      }
      try {
        const parsed: CityItem[] = JSON.parse(stored);
        const found = parsed.find(
          (c) => c.city.toLowerCase() === cityDisplay!.toLowerCase()
        );
        setIsFavorite(Boolean(found && found.favorite));
      } catch {
        setIsFavorite(false);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
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
      // still favorite → just flip the flag
      list[idx] = { ...list[idx], favorite: true };
    } else {
      // unfavorited → remove from list entirely
      list.splice(idx, 1);
    }

    localStorage.setItem(key, JSON.stringify(list));
    setIsFavorite(newFavorite);
  } else {
    // not in list yet → add as favorite
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
  <TimeZone
  timezone={tz}
  city={capitalizeWords(rawCity)}
  favorite={isFavorite}
  onToggleFavorite={toggleFavorite}
/>
    </section>
  );
}

export default CityPage;
