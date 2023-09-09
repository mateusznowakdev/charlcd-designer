function PixelGrid() {
  const grid = [...Array(7)].map(() =>
    [...Array(5)].map(() => <input type="checkbox" />),
  );

  return <div className="pixel-grid">{grid}</div>;
}

export default function App() {
  return <PixelGrid />;
}
