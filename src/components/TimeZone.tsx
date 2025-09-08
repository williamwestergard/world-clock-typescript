import { useState, useEffect } from "react";
import Clock from "./analog-clock/AnalogClock";

type TimeZoneProps = {
  timezone: string;
  city: string;
  format24Hour?: boolean;
  favorite: boolean;
  onToggleFavorite: (city: string) => void;
};

export function TimeZone({ timezone, city, format24Hour = true,  favorite,
  onToggleFavorite, }: TimeZoneProps) {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [showAnalog, setShowAnalog] = useState(false); // toggle state

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour12: !format24Hour,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now);

      setTime(formattedTime);

      const formattedDay = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(now);

      setDay(formattedDay);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone, format24Hour]);

  return (
    <section className="time-zone-container">
      <section className="time-zone-card">
        <article className="city-and-day">
          <h2>{city}</h2>
          <p>{day}</p>
        </article>

        <article className="time-container">
          {showAnalog ? (
            <Clock timezone={timezone} />
          ) : (
            <h1>{time}</h1>
          )}
        </article>

        {/* Toggle Button */}
        <button
          onClick={() => setShowAnalog((prev) => !prev)}
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {showAnalog ? "Show Digital" : "Show Analog"}
        </button>

<button
  onClick={() => onToggleFavorite(city)}
  style={{
    marginTop: "10px",
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: favorite ? "gold" : "lightgray",
    border: "none",
    borderRadius: "8px",
  }}
>
  {favorite ? "★ Favorite" : "☆ Add Favorite"}
</button>


      </section>
      
    </section>
  );
}

export default TimeZone;
