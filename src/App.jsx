import { useEffect, useState } from "react";

import {
  CHAR_COUNT_H,
  CHAR_COUNT_V,
  CHAR_CUSTOM_COUNT,
  CHAR_HEIGHT,
  CHAR_WIDTH,
  CHARACTERS,
} from "./characters.js";

function bitArrayToRowArrays(arr) {
  return [...arr.keys()]
    .filter((id) => id % CHAR_WIDTH === 0)
    .map((id) => arr.slice(id, id + CHAR_WIDTH));
}

function bitArrayToString(arr) {
  return "0b" + arr.map((value) => +value).join("");
}

function CharacterCanvas({ characters }) {
  const DISPLAY_WIDTH = (CHAR_WIDTH + 1) * CHAR_COUNT_H + 1;
  const DISPLAY_HEIGHT = (CHAR_HEIGHT + 1) * CHAR_COUNT_V + 1;
  const SCALE = 4;

  useEffect(() => {
    const targetCanvas = document.getElementById("character-canvas");
    targetCanvas.width = DISPLAY_WIDTH * SCALE;
    targetCanvas.height = DISPLAY_HEIGHT * SCALE;

    const canvas = document.createElement("canvas");
    canvas.width = DISPLAY_WIDTH;
    canvas.height = DISPLAY_HEIGHT;

    const context = canvas.getContext("2d");

    for (let y = 0; y < CHAR_COUNT_V; y++) {
      for (let x = 0; x < CHAR_COUNT_H; x++) {
        const id = context.getImageData(
          x * (CHAR_WIDTH + 1),
          y * (CHAR_HEIGHT + 1),
          CHAR_WIDTH,
          CHAR_HEIGHT,
        );

        const data = characters[0];

        for (let i = 0; i < data.length; i++) {
          id.data[i * 4] = data[i] ? 0 : 224;
          id.data[i * 4 + 1] = data[i] ? 0 : 224;
          id.data[i * 4 + 2] = data[i] ? 0 : 224;
          id.data[i * 4 + 3] = 255;
        }

        context.putImageData(id, x * (CHAR_WIDTH + 1), y * (CHAR_HEIGHT + 1));
      }
    }

    const targetCanvasContext = targetCanvas.getContext("2d");
    targetCanvasContext.imageSmoothingEnabled = false;
    targetCanvasContext.drawImage(
      canvas,
      0,
      0,
      targetCanvas.width,
      targetCanvas.height,
    );
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
        {characters.slice(0, CHAR_CUSTOM_COUNT).map((pixels, id) => (
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
