import { useState } from "react";

import { Canvas } from "./components/Canvas.jsx";
import { CharacterInput } from "./components/CharacterInput.jsx";
import { CharacterCode } from "./components/CharacterCode.jsx";

import { CHAR_CUSTOM_COUNT, CHARACTERS } from "./characters.js";

export default function App() {
  const [characters, setCharacters] = useState(CHARACTERS);
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
      <Canvas characters={characters} content={content} />
      <p>
        Enter the text as if it was a JS string limited by backticks (
        <code>``</code>):
      </p>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
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
