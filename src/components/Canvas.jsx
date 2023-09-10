import { useEffect } from "react";

import { CHAR_HEIGHT, CHAR_WIDTH } from "../characters.js";

export function Canvas({ characters, content, height, width }) {
  const SCALE = 4;

  useEffect(() => {
    try {
      content = eval("`" + content + "`");
    } catch {
      content = "Invalid text!";
    }

    content = content.split("\n");

    const displayWidth = (CHAR_WIDTH + 1) * width + 1;
    const displayHeight = (CHAR_HEIGHT + 1) * height + 1;

    const targetCanvas = document.getElementById("character-canvas");
    targetCanvas.width = displayWidth * SCALE;
    targetCanvas.height = displayHeight * SCALE;

    const canvas = document.createElement("canvas");
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const context = canvas.getContext("2d");

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const id = context.getImageData(
          x * (CHAR_WIDTH + 1) + 1,
          y * (CHAR_HEIGHT + 1) + 1,
          CHAR_WIDTH,
          CHAR_HEIGHT,
        );

        const chr = (content[y] || [])[x] || " ";
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
  }, [characters, content, height, width]);

  return (
    <div>
      <canvas id="character-canvas"></canvas>
    </div>
  );
}
