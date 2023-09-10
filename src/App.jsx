import { useEffect, useState } from "react";

const CHARACTER_COUNT = 8;
const ROW_COUNT = 8;
const COLUMN_COUNT = 5;

function bitArrayToRowArrays(arr) {
  return [...arr.keys()]
    .filter((id) => id % COLUMN_COUNT === 0)
    .map((id) => arr.slice(id, id + COLUMN_COUNT));
}

function bitArrayToString(arr) {
  return "0b" + arr.map((value) => +value).join("");
}

function CharacterCanvas() {
  useEffect(() => {
    const canvas = document.getElementById("character-canvas");

    canvas.width = 256;
    canvas.height = 64;

    const context = canvas.getContext("2d");

    const id = context.getImageData(0, 0, COLUMN_COUNT, ROW_COUNT);

    const data = [
      false,
      true,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
    ];

    for (let i = 0; i < data.length; i++) {
      id.data[i * 4] = data[i] ? 0 : 255;
      id.data[i * 4 + 1] = data[i] ? 0 : 255;
      id.data[i * 4 + 2] = data[i] ? 0 : 255;
      id.data[i * 4 + 3] = 255;
    }

    context.putImageData(id, 0, 0);
  }, []);

  return (
    <div>
      <canvas id="character-canvas"></canvas>
    </div>
  );
}

function CustomCharacterInput({ pixels, setPixel }) {
  return (
    <div className="custom-character-input">
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

function CustomCharacterCode({ pixels }) {
  return (
    <div className="custom-character-code">
      {bitArrayToRowArrays(pixels)
        .map(bitArrayToString)
        .map((str) => str + ", ")
        .join("")}
    </div>
  );
}

function CustomCharacter({ pixels, setPixel }) {
  return (
    <div className="custom-character">
      <CustomCharacterInput pixels={pixels} setPixel={setPixel} />
      <CustomCharacterCode pixels={pixels} />
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
    <>
      <CharacterCanvas />
      <div className="custom-characters">
        {characters.map((pixels, id) => (
          <CustomCharacter
            key={id}
            pixels={pixels}
            setPixel={(row, col, pixel) => updatePixel(id, row, col, pixel)}
          />
        ))}
      </div>
    </>
  );
}
