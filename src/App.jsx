import { useEffect, useState } from "react";

const CHARACTER_COUNT = 4;
const ROW_COUNT = 8;
const COLUMN_COUNT = 5;

function CustomCharacter({ pixels, setPixels }) {
  function updatePixel(id, value) {
    setPixels(pixels.map((pixel, pixelID) => (pixelID === id ? value : pixel)));
  }

  const grid = pixels.map((pixel, id) => (
    <input
      checked={pixels[id]}
      key={id}
      onChange={(e) => updatePixel(id, e.target.checked)}
      type="checkbox"
    />
  ));

  return <div className="custom-char">{grid}</div>;
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

  function updateCharacter(id, value) {
    setCharacters((characters) =>
      characters.map((c, cID) => (cID === id ? value : c)),
    );
  }

  useEffect(initializeCharacters, []);

  return (
    <div className="custom-chars">
      {characters.map((c, cID) => (
        <CustomCharacter
          key={cID}
          pixels={c}
          setPixels={(pixels) => updateCharacter(cID, pixels)}
        />
      ))}
    </div>
  );
}
