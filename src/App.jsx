import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormRange from "react-bootstrap/FormRange";
import Row from "react-bootstrap/Row";

import { Canvas } from "./components/Canvas.jsx";
import { CharacterCode } from "./components/CharacterCode.jsx";
import { CharacterInput } from "./components/CharacterInput.jsx";

import { CHAR_CUSTOM_COUNT, CHARACTERS } from "./characters.js";

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
          <Col xs={3}>
            Size ({width} x {height})
          </Col>
          <Col xs={6}>
            <FormRange
              min={0}
              max={MAX_WIDTH}
              onChange={(e) => setWidth(+e.target.value)}
              value={width}
            />
          </Col>
          <Col xs={3}>
            <FormRange
              min={0}
              max={MAX_HEIGHT}
              onChange={(e) => setHeight(+e.target.value)}
              value={height}
            />
          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3">
          <Col xs={3}>
            Cursor ({cursorX}, {cursorY})
          </Col>
          <Col xs={6}>
            <FormRange
              min={0}
              max={MAX_WIDTH}
              onChange={(e) => setCursorX(+e.target.value)}
              value={cursorX}
            />
          </Col>
          <Col xs={3}>
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
        Text, as if it was a JS string limited by backticks (<code>``</code>):
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
        Custom characters (<code>\x00</code> ... <code>\x07</code>):
      </p>
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
