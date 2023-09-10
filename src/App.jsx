import { useState } from "react";

import { Canvas } from "./components/Canvas.jsx";
import { CharacterInput } from "./components/CharacterInput.jsx";
import { CharacterCode } from "./components/CharacterCode.jsx";

import { CHAR_CUSTOM_COUNT, CHARACTERS } from "./characters.js";

export default function App() {
  const MIN_WIDTH = 1;
  const DEFAULT_WIDTH = 16;
  const MAX_WIDTH = 40;

  const MIN_HEIGHT = 1;
  const DEFAULT_HEIGHT = 2;
  const MAX_HEIGHT = 8;

  const [characters, setCharacters] = useState(CHARACTERS);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const [content, setContent] = useState("");
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

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
        cursorX={cursorX}
        cursorY={cursorY}
        height={height}
        width={width}
      />
      <p>
        Enter the text as if it was a JS string limited by backticks (
        <code>``</code>):
      </p>
      <textarea
        cols={MAX_WIDTH}
        onChange={(e) => setContent(e.target.value)}
        rows={MAX_HEIGHT}
        value={content}
      ></textarea>
      <p>
        Width:
        <input
          min={MIN_WIDTH}
          max={MAX_WIDTH}
          onChange={(e) => setWidth(+e.target.value)}
          type="range"
          value={width}
        />
        {width}
      </p>
      <p>
        Height:
        <input
          min={MIN_HEIGHT}
          max={MAX_HEIGHT}
          onChange={(e) => setHeight(+e.target.value)}
          type="range"
          value={height}
        />
        {height}
      </p>
      <p>
        Cursor X position:
        <input
          min={0}
          max={MAX_WIDTH}
          onChange={(e) => setCursorX(+e.target.value)}
          type="range"
          value={cursorX}
        />
        {cursorX}
      </p>
      <p>
        Cursor Y position:
        <input
          min={0}
          max={MAX_HEIGHT}
          onChange={(e) => setCursorY(+e.target.value)}
          type="range"
          value={cursorY}
        />
        {cursorY}
      </p>
      <p>
        Custom characters (<code>\x00</code> ... <code>\x07</code>):
      </p>
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
