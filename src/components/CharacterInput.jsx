export function CharacterInput({ pixels, setPixel }) {
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
