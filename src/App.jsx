import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormRange from "react-bootstrap/FormRange";
import Row from "react-bootstrap/Row";

import { Canvas } from "./components/Canvas.jsx";
import { CharacterCode } from "./components/CharacterCode.jsx";
import { CharacterInput } from "./components/CharacterInput.jsx";

import {
  CHAR_CUSTOM_COUNT,
  CHARACTERS,
  getBlankCharacter,
} from "./characters.js";

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

  function resetCharacter(charID) {
    setCharacters((characters) =>
      characters.map((char, id) =>
        id === charID ? getBlankCharacter() : char,
      ),
    );
  }

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
          must be escaped. Further adaptation for C&nbsp;and Python code is
          required.
        </i>
      </p>
      <FormControl
        as="textarea"
        className="my-3"
        cols={MAX_WIDTH}
        onChange={(e) => setContent(e.target.value)}
        rows={MAX_HEIGHT}
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
          Skip it, try <code>\x08</code> instead, or send a&nbsp;single byte
          directly.
        </i>
      </p>
      <div className="custom-characters">
        {characters.slice(0, CHAR_CUSTOM_COUNT).map((pixels, id) => (
          <div className="custom-character" key={id}>
            <CharacterInput
              pixels={pixels}
              setPixel={(row, col, pixel) => updatePixel(id, row, col, pixel)}
            />
            <Button
              onClick={() => resetCharacter(id)}
              size="sm"
              variant="light"
            >
              Reset
            </Button>
            <CharacterCode pixels={pixels} />
          </div>
        ))}
      </div>
    </>
  );
}
