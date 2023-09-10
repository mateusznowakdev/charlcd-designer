import { useEffect } from "react";

import {
  CHAR_COUNT_H,
  CHAR_COUNT_V,
  CHAR_HEIGHT,
  CHAR_WIDTH,
} from "../characters.js";

export function Canvas({ characters, content }) {
  const DISPLAY_WIDTH = (CHAR_WIDTH + 1) * CHAR_COUNT_H + 1;
  const DISPLAY_HEIGHT = (CHAR_HEIGHT + 1) * CHAR_COUNT_V + 1;
  const SCALE = 4;

  useEffect(() => {
    try {
      content = eval('`' + content + '`');
    } catch {
      content = "Invalid text!";
    }

    content = (content + "\n\n").split("\n");

    const targetCanvas = document.getElementById("character-canvas");
    targetCanvas.width = DISPLAY_WIDTH * SCALE;
    targetCanvas.height = DISPLAY_HEIGHT * SCALE;

    const canvas = document.createElement("canvas");
    canvas.width = DISPLAY_WIDTH;
    canvas.height = DISPLAY_HEIGHT;

    const context = canvas.getContext("2d");

    for (let y = 0; y < CHAR_COUNT_V; y++) {
      for (let x = 0; x < CHAR_COUNT_H; x++) {
        const id = context.getImageData(
          x * (CHAR_WIDTH + 1) + 1,
          y * (CHAR_HEIGHT + 1) + 1,
          CHAR_WIDTH,
          CHAR_HEIGHT,
        );

        const chr = content[y][x] || " ";
        const chrCode = Math.min(chr.charCodeAt(0), characters.length - 1);
        const data = characters[chrCode];

        for (let i = 0; i < data.length; i++) {
          id.data[i * 4] = data[i] ? 0 : 240;
          id.data[i * 4 + 1] = data[i] ? 0 : 240;
          id.data[i * 4 + 2] = data[i] ? 0 : 240;
          id.data[i * 4 + 3] = 255;
        }

        context.putImageData(
          id,
          x * (CHAR_WIDTH + 1) + 1,
          y * (CHAR_HEIGHT + 1) + 1,
        );
      }
    }

    const targetCanvasContext = targetCanvas.getContext("2d");
    targetCanvasContext.imageSmoothingEnabled = false;
    targetCanvasContext.drawImage(
      canvas,
      0,
      0,
      targetCanvas.width,
      targetCanvas.height,
    );
  }, [characters, content]);

  return (
    <div>
      <canvas id="character-canvas"></canvas>
    </div>
  );
}
