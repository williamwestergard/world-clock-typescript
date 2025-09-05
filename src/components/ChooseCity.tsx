import { useState } from "react";
import TimeZone from "./TimeZone";
import cityToTimezone, { getTimezoneForCity } from "./Cities";


function TimeAndCity() {
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState<{ city: string; timezone: string }[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const capitalizeWords = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleSubmit = (cityName?: string) => {
    const inputCity = cityName || cityInput;
    const tz = getTimezoneForCity(inputCity);
    if (!tz) {
      alert("Unknown city!");
      return;
    }

    const formattedCity = capitalizeWords(inputCity);

    setCities((prev) => [...prev, { city: formattedCity, timezone: tz }]);
    setCityInput("");
    setSuggestions([]);
  };

  const handleInputChange = (value: string) => {
    setCityInput(value);

    if (value.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const lowerValue = value.toLowerCase();
    const matches = Object.keys(cityToTimezone)
      .filter((city) => city.startsWith(lowerValue))
      .slice(0, 5); // limit to 5 suggestions

    setSuggestions(matches);
  };

  return (
    <>
      <h1>World Clock</h1>
      <p>The time around the world.</p>


<section className="input-field-container">

<article className="input-and-button-flex">
  
      <input className="input-field"
        type="text"
        placeholder="Enter city (e.g., London)"
        value={cityInput}
        onChange={(e) => handleInputChange(e.target.value)}

      />
      <button  className="input-field-button"
        onClick={() => handleSubmit()}>
        Add City
      </button>
</article>
      {/* Suggestion dropdown */}
      {suggestions.length > 0 && (
        <ul className="input-field-suggestions"
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              style={{ padding: "5px", cursor: "pointer" }}
              onClick={() => handleSubmit(s)}
            >
              {capitalizeWords(s)}
            </li>
          ))}
        </ul>
      )}
      </section>

      <div style={{ marginTop: "40px" }}>
        {cities.map((c, index) => (
          <section className="time-zone-container" key={index}>
            <TimeZone timezone={c.timezone} city={c.city} />
          </section>
        ))}
      </div>
    </>
  );
}

export default TimeAndCity;
