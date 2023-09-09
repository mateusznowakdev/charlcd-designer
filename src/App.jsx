import { useState } from "react";

function CustomCharacter() {
  const COLUMN_COUNT = 5;
  const ROW_COUNT = 8;

  const [pixels, setPixels] = useState(
    Array(COLUMN_COUNT * ROW_COUNT).fill(false),
  );

  function updatePixel(e, id) {
    setPixels((pixels) =>
      pixels.map((pixel, pixelID) =>
        pixelID === id ? e.target.checked : pixel,
      ),
    );
  }

  const grid = [...Array(ROW_COUNT).keys()].map((key1) =>
    [...Array(COLUMN_COUNT).keys()].map((key2) => {
      const id = key1 * COLUMN_COUNT + key2;

      return (
        <input
          checked={pixels[id]}
          key={id}
          onChange={(e) => updatePixel(e, id)}
          type="checkbox"
        />
      );
    }),
  );

  return <div className="custom-char">{grid}</div>;
}

export default function App() {
  return (
    <div className="custom-chars">
      <CustomCharacter />
      <CustomCharacter />
      <CustomCharacter />
      <CustomCharacter />
      <CustomCharacter />
      <CustomCharacter />
      <CustomCharacter />
      <CustomCharacter />
    </div>
  );
}
