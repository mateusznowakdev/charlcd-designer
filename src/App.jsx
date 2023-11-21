import ArrowRightLeft from "lucide-react/dist/esm/icons/arrow-right-left";
import ArrowUpFromLine from "lucide-react/dist/esm/icons/arrow-up-from-line";
import Share2 from "lucide-react/dist/esm/icons/share-2";
import Trash from "lucide-react/dist/esm/icons/trash";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormRange from "react-bootstrap/FormRange";
import Row from "react-bootstrap/Row";

import { Canvas } from "./components/Canvas.jsx";
import { CharacterCode } from "./components/CharacterCode.jsx";
import { CharacterInput } from "./components/CharacterInput.jsx";
import { ShareModal } from "./components/ShareModal.jsx";

import {
  CHAR_CUSTOM_COUNT,
  CHARACTERS,
  exportCharacter,
  getBlankCharacter,
  importCharacter,
} from "./characters.js";

const SAMPLE_DATA_URL =
  "?w=16&h=2&x=16&y=0" +
  "&text=%5Cx7F+%5B%5Cx00%5D+%5Cx01++%5Cx02++%5Cx03++%5Cx7E%0A+++Hot+%2832%5CxDFC%29" +
  "&data=10755815424%2C11073533952%2C11072994304%2C11073438720%2C0%2C0%2C0%2C0";
const BLANK_DATA_URL = "?";

function compareCharID(actual, expected) {
  return actual === expected || actual === expected + CHAR_CUSTOM_COUNT;
}

export default function App() {
  const DEFAULT_WIDTH = 16;
  const MAX_WIDTH = 40;

  const DEFAULT_HEIGHT = 2;
  const MAX_HEIGHT = 8;

  const [characters, setCharacters] = useState(CHARACTERS);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const [content, setContent] = useState("");
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const [shareURL, setShareURL] = useState(null);

  function resetCharacter(charID) {
    setCharacters((characters) =>
      characters.map((char, id) =>
        compareCharID(id, charID) ? getBlankCharacter() : char,
      ),
    );
  }

  function setCharacter(charID, value) {
    setCharacters((characters) =>
      characters.map((char, id) => (compareCharID(id, charID) ? value : char)),
    );
  }

  function swapCharacter(leftID) {
    const rightID = leftID + 1 < CHAR_CUSTOM_COUNT ? leftID + 1 : 0;

    setCharacters((characters) =>
      characters.map((char, id) => {
        if (compareCharID(id, leftID)) return characters[rightID];
        else if (compareCharID(id, rightID)) return characters[leftID];
        else return char;
      }),
    );
  }

  function updatePixel(charID, pixelID, value) {
    setCharacters((characters) =>
      characters.map((char, id) =>
        compareCharID(id, charID)
          ? char.map((pixel, id) => (id === pixelID ? value : pixel))
          : char,
      ),
    );
  }

  function importURLParameters() {
    const url = new URL(window.location.href);

    const width = Number.parseInt(url.searchParams.get("w"));
    if (!Number.isNaN(width)) setWidth(width);

    const height = Number.parseInt(url.searchParams.get("h"));
    if (!Number.isNaN(height)) setHeight(height);

    const cursorX = Number.parseInt(url.searchParams.get("x"));
    if (!Number.isNaN(cursorX)) setCursorX(cursorX);

    const cursorY = Number.parseInt(url.searchParams.get("y"));
    if (!Number.isNaN(cursorY)) setCursorY(cursorY);

    const content = url.searchParams.get("text") || "";
    setContent(content);

    const data = url.searchParams.get("data") || "";
    data.split(",").filter((raw, idx) => {
      const parsed = Number.parseInt(raw);
      if (!Number.isNaN(parsed)) {
        const bits = importCharacter(parsed);
        setCharacter(idx, bits);
      }
    });
  }

  function exportURLParameters() {
    const url = new URL(window.location.href);
    url.search = "";

    url.searchParams.append("w", width);
    url.searchParams.append("h", height);
    url.searchParams.append("x", cursorX);
    url.searchParams.append("y", cursorY);
    url.searchParams.append("text", content);

    const data = characters.slice(0, CHAR_CUSTOM_COUNT).map(exportCharacter);
    url.searchParams.append("data", data.join(","));

    return url.toString();
  }

  useEffect(() => {
    importURLParameters();
  }, []);

  return (
    <>
      <ShareModal
        content={content}
        setShareURL={() => setShareURL(null)}
        shareURL={shareURL}
      />
      <div className="d-flex justify-content-between">
        <Button
          className="mb-3"
          onClick={() => setShareURL(exportURLParameters())}
          title="Share data"
          variant="light"
        >
          <Share2 size={16} />
          Share Data
        </Button>
        <ButtonToolbar>
          <Button
            className="mb-3 ms-2"
            href={SAMPLE_DATA_URL}
            title="Load sample data"
            variant="light"
          >
            <ArrowUpFromLine size={16} />
            Load Sample
          </Button>
          <Button
            className="mb-3 ms-2"
            href={BLANK_DATA_URL}
            title="Clear"
            variant="light"
          >
            <Trash size={16} />
          </Button>
        </ButtonToolbar>
      </div>
      <Canvas
        characters={characters}
        content={content}
        cursorX={cursorX}
        cursorY={cursorY}
        height={height}
        width={width}
      />
      <Form>
        <FormGroup as={Row} className="mb-3">
          <Col xs={2}>
            Size ({width} x {height})
          </Col>
          <Col xs={8}>
            <FormRange
              min={0}
              max={MAX_WIDTH}
              onChange={(e) => setWidth(+e.target.value)}
              value={width}
            />
          </Col>
          <Col xs={2}>
            <FormRange
              min={0}
              max={MAX_HEIGHT}
              onChange={(e) => setHeight(+e.target.value)}
              value={height}
            />
          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3">
          <Col xs={2}>
            Cursor ({cursorX}, {cursorY})
          </Col>
          <Col xs={8}>
            <FormRange
              min={0}
              max={MAX_WIDTH}
              onChange={(e) => setCursorX(+e.target.value)}
              value={cursorX}
            />
          </Col>
          <Col xs={2}>
            <FormRange
              min={0}
              max={MAX_HEIGHT}
              onChange={(e) => setCursorY(+e.target.value)}
              value={cursorY}
            />
          </Col>
        </FormGroup>
      </Form>
      <p>
        Text, as if it were a JS string limited by <code>``</code> backticks
        <br />
        <i className="opacity-50">
          You can enter any character as a&nbsp;hex value <code>\x00</code> to{" "}
          <code>\xff</code>. Some symbols may look different, see the LCD docs.
        </i>
        <br />
        <i className="opacity-50">
          Standalone backticks <code>`</code> and backslashes <code>\</code>{" "}
          must be escaped. Further adaptation might be required.
        </i>
      </p>
      <FormControl
        as="textarea"
        className="my-3"
        cols={MAX_WIDTH}
        onChange={(e) => setContent(e.target.value)}
        rows={MAX_HEIGHT / 2}
        value={content}
      ></FormControl>
      <p>
        Custom characters
        <br />
        <i className="opacity-50">
          Using the Arduino IDE? C&nbsp;strings are null-terminated and will be
          truncated when <code>\x00</code> is present in a&nbsp;string.
        </i>
        <br />
        <i className="opacity-50">
          Skip it in your source code, try <code>\x08</code> instead, or send
          a&nbsp;single byte directly.
        </i>
      </p>
      <div className="custom-characters">
        {characters.slice(0, CHAR_CUSTOM_COUNT).map((pixels, id) => (
          <div className="custom-character" key={id}>
            <CharacterInput
              pixels={pixels}
              setPixel={(row, col, pixel) => updatePixel(id, row, col, pixel)}
            />
            <ButtonToolbar className="gap-1">
              <Button
                onClick={() => resetCharacter(id)}
                size="sm"
                title="Clear"
                variant="light"
              >
                <Trash size={16} />
              </Button>
              <Button
                onClick={() => swapCharacter(id)}
                size="sm"
                title="Swap with the next character"
                variant="light"
              >
                <ArrowRightLeft size={16} />
              </Button>
            </ButtonToolbar>
            <CharacterCode pixels={pixels} />
          </div>
        ))}
      </div>
    </>
  );
}
