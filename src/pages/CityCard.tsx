// src/components/CityCard.tsx
import { useEffect, useState } from "react";
import Clock from "../components/analog-clock/AnalogClock"; // 👈 reuse your existing clock

type CityCardProps = {
  city: string;
  timezone: string;
  favorite: boolean;
  onToggleFavorite: (city: string) => void;
};

function CityCard({ city, timezone, favorite, onToggleFavorite }: CityCardProps) {
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [showAnalog, setShowAnalog] = useState(false); // 👈 same toggle state

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const formattedDay = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(now);

      setTime(formattedTime);
      setDay(formattedDay);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="city-card">
      <h1 className="city-card-title">{city}</h1>
      <p className="city-card-date">{day}</p>

      <div className="city-card-time">
        {showAnalog ? (
          <Clock timezone={timezone} /> // 👈 same analog clock component
        ) : (
          <h2>{time}</h2>
        )}
      </div>

      <div className="city-card-actions">
         <button
          className="city-card-toggle"
          onClick={() => setShowAnalog((prev) => !prev)}
        >
          {showAnalog ? "Show Digital" : "Show Analog"}
        </button>
        <button
          className="city-card-fav"
          onClick={() => onToggleFavorite(city)}
          style={{ backgroundColor: favorite ? "gold" : "lightgray" }}
        >
          {favorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
        </button>

       
      </div>
    </div>
  );
}

export default CityCard;
