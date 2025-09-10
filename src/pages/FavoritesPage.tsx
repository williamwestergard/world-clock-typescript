import { useState, useEffect } from "react";
import TimeZone from "../components/TimeZone";

type CityItem = {
  city: string;
  timezone: string;
  favorite: boolean;
};

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<CityItem[]>([]);

  // ✅ Load favorites from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("cities");
    if (stored) {
      const allCities: CityItem[] = JSON.parse(stored);
      const favs = allCities.filter((c) => c.favorite);
      setFavorites(favs);
    }
  }, []);

  // ✅ Toggle favorite (also updates localStorage)
  const toggleFavorite = (cityName: string) => {
    setFavorites((prev) =>
      prev.filter((c) => c.city !== cityName) // remove from list
    );

    const stored = localStorage.getItem("cities");
    if (stored) {
      const updated = JSON.parse(stored).map((c: CityItem) =>
        c.city === cityName ? { ...c, favorite: !c.favorite } : c
      );
      localStorage.setItem("cities", JSON.stringify(updated));
    }
  };

  return (
    <section style={{  height: "100vh" }}>
      <h2>Favorites Cities</h2>
      {favorites.length === 0 ? (
        <p>No city selected</p>
      ) : (
        favorites.map((c) => (
          <TimeZone
            key={c.city}
            city={c.city}
            timezone={c.timezone}
            favorite={c.favorite}
            onToggleFavorite={toggleFavorite}
          />
        ))
      )}
    </section>
  );
};

export default FavoritesPage;
