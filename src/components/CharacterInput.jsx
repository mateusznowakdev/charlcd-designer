import FormCheck from "react-bootstrap/FormCheck";

export function CharacterInput({ pixels, setPixel }) {
  return (
    <div className="custom-character-input">
      {pixels.map((pixel, pixelID) => (
        <FormCheck
          checked={pixel}
          key={pixelID}
          onChange={(e) => setPixel(pixelID, e.target.checked)}
        />
      ))}
    </div>
  );
}
