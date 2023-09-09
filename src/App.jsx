import { useEffect, useState } from "react";

const CHARACTER_COUNT = 4;
const ROW_COUNT = 8;
const COLUMN_COUNT = 5;

function CustomCharacter({ pixels, setPixel }) {
  return (
    <div className="custom-char">
      {pixels.map((pixel, pixelID) => (
        <input
          checked={pixel}
          key={pixelID}
          onChange={(e) => setPixel(pixelID, e.target.checked)}
          type="checkbox"
        />
      ))}
    </div>
  );
}

export default function App() {
  const [characters, setCharacters] = useState([]);

  function initializeCharacters() {
    setCharacters(
      [...Array(CHARACTER_COUNT)].map(() =>
        Array(COLUMN_COUNT * ROW_COUNT).fill(false),
      ),
    );
  }

  function updatePixel(charID, pixelID, value) {
    setCharacters((characters) =>
      characters.map((char, id) =>
        id === charID
          ? char.map((pixel, id) => (id === pixelID ? value : pixel))
          : char,
      ),
    );
  }

  useEffect(initializeCharacters, []);

  return (
    <div className="custom-chars">
      {characters.map((pixels, id) => (
        <CustomCharacter
          key={id}
          pixels={pixels}
          setPixel={(row, col, pixel) => updatePixel(id, row, col, pixel)}
        />
      ))}
    </div>
  );
}
