import { useEffect, useState } from "react";

import {
  CHARACTER_CUSTOM_COUNT,
  CHARACTER_HEIGHT,
  CHARACTER_WIDTH,
  CHARACTERS,
} from "./characters.js";

const CANVAS_CHARACTERS_H = 16;
const CANVAS_CHARACTERS_V = 2;

function bitArrayToRowArrays(arr) {
  return [...arr.keys()]
    .filter((id) => id % CHARACTER_WIDTH === 0)
    .map((id) => arr.slice(id, id + CHARACTER_WIDTH));
}

function bitArrayToString(arr) {
  return "0b" + arr.map((value) => +value).join("");
}

function CharacterCanvas({ characters }) {
  useEffect(() => {
    const canvas = document.getElementById("character-canvas");

    canvas.width = 512;
    canvas.height = 128;

    const context = canvas.getContext("2d");

    const data = characters[0];

    const secondCanvas = document.createElement("canvas");
    secondCanvas.width = 128;
    secondCanvas.height = 32;

    const sContext = secondCanvas.getContext("2d");

    for (let y = 0; y < CANVAS_CHARACTERS_V; y++) {
      for (let x = 0; x < CANVAS_CHARACTERS_H; x++) {
        const id = sContext.getImageData(
          x * (CHARACTER_WIDTH + 1),
          y * (CHARACTER_HEIGHT + 1),
          CHARACTER_WIDTH,
          CHARACTER_HEIGHT,
        );

        for (let i = 0; i < data.length; i++) {
          id.data[i * 4] = data[i] ? 0 : 255;
          id.data[i * 4 + 1] = data[i] ? 0 : 255;
          id.data[i * 4 + 2] = data[i] ? 0 : 255;
          id.data[i * 4 + 3] = 255;
        }

        sContext.putImageData(
          id,
          x * (CHARACTER_WIDTH + 1),
          y * (CHARACTER_HEIGHT + 1),
        );
      }
    }

    context.imageSmoothingEnabled = false;
    context.drawImage(secondCanvas, 0, 0, 512, 128);
  }, [characters]);

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
  const [characters, setCharacters] = useState(CHARACTERS);

  function updatePixel(charID, pixelID, value) {
    setCharacters((characters) =>
      characters.map((char, id) =>
        id === charID
          ? char.map((pixel, id) => (id === pixelID ? value : pixel))
          : char,
      ),
    );
  }

  return (
    <>
      <CharacterCanvas characters={characters} />
      <div className="custom-characters">
        {characters.slice(0, CHARACTER_CUSTOM_COUNT).map((pixels, id) => (
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
