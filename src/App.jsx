import { useState } from "react";

import { Canvas } from "./components/Canvas.jsx";
import { CharacterInput } from "./components/CharacterInput.jsx";
import { CharacterCode } from "./components/CharacterCode.jsx";

import { CHAR_CUSTOM_COUNT, CHARACTERS } from "./characters.js";

export default function App() {
  const [characters, setCharacters] = useState(CHARACTERS);
  const [height, setHeight] = useState(2);
  const [width, setWidth] = useState(16);

  const [content, setContent] = useState("");

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
      <Canvas
        characters={characters}
        content={content}
        height={height}
        width={width}
      />
      <p>
        Enter the text as if it was a JS string limited by backticks (
        <code>``</code>):
      </p>
      <textarea
        cols={20}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        value={content}
      ></textarea>
      <p>
        Width:
        <input
          type="range"
          min={0}
          max={20}
          onChange={(e) => setWidth(+e.target.value)}
          value={width}
        />
        {width}
      </p>
      <p>
        Height:
        <input
          type="range"
          min={0}
          max={4}
          onChange={(e) => setHeight(+e.target.value)}
          value={height}
        />
        {height}
      </p>
      <p>Custom characters:</p>
      <div className="custom-characters">
        {characters.slice(0, CHAR_CUSTOM_COUNT).map((pixels, id) => (
          <div className="custom-character" key={id}>
            <CharacterInput
              pixels={pixels}
              setPixel={(row, col, pixel) => updatePixel(id, row, col, pixel)}
            />
            <CharacterCode pixels={pixels} />
          </div>
        ))}
      </div>
    </>
  );
}
