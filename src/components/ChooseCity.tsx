import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cityToTimezone, { getTimezoneForCity } from "./Cities";

function TimeAndCity() {
  const [cityInput, setCityInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

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

    // ✅ navigate to city page instead of appending
    navigate(`/city/${encodeURIComponent(formattedCity)}`);

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
      .slice(0, 5);

    setSuggestions(matches);
  };

  return (
    <>
      <section className="input-field-container">
        <article className="input-and-button-flex">
          <input
            className="input-field"
            type="text"
            placeholder="Enter city (e.g., London)"
            value={cityInput}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button className="input-field-button" onClick={() => handleSubmit()}>
            Search
          </button>
        </article>

        {/* Suggestion dropdown */}
        {suggestions.length > 0 && (
          <ul className="input-field-suggestions">
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
    </>
  );
}

export default TimeAndCity;
