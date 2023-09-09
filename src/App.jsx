function PixelGrid() {
  const COLUMN_COUNT = 5;
  const ROW_COUNT = 8;

  const grid = [...Array(ROW_COUNT).keys()].map((key1) =>
    [...Array(COLUMN_COUNT).keys()].map((key2) => (
      <input key={key1 * COLUMN_COUNT + key2} type="checkbox" />
    )),
  );

  return <div className="pixel-grid">{grid}</div>;
}

export default function App() {
  return <PixelGrid />;
}
