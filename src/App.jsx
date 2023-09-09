import { useState } from "react";

function PixelGrid() {
  const COLUMN_COUNT = 5;
  const ROW_COUNT = 8;

  const [pixels, setPixels] = useState(
    Array(COLUMN_COUNT * ROW_COUNT).fill(false),
  );

  function updatePixel(e, id) {
    setPixels((pixels) => {
      pixels[id] = e.target.checked;
      return [...pixels];
    });
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

  return <div className="pixel-grid">{grid}</div>;
}

export default function App() {
  return <PixelGrid />;
}
