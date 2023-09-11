import { CHAR_WIDTH } from "../characters.js";

function bitArrayToRowArrays(arr) {
  return [...arr.keys()]
    .filter((id) => id % CHAR_WIDTH === 0)
    .map((id) => arr.slice(id, id + CHAR_WIDTH));
}

function bitArrayToString(arr) {
  return "0b" + arr.map((value) => +value).join("");
}

export function CharacterCode({ pixels }) {
  return (
    <div className="opacity-50 text-center">
      {bitArrayToRowArrays(pixels)
        .map(bitArrayToString)
        .map((str) => str + ", ")
        .join("")}
    </div>
  );
}
