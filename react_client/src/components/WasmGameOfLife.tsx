import React, { useEffect, useRef } from 'react'

import { Universe, Cell } from 'wasm-game-of-life';
import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg.wasm';

const CELL_SIZE = 20; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#33FF33";

function WasmGameOfLife() {

  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    var canvasEl: HTMLCanvasElement;
    if (canvas.current) {
      canvasEl = canvas.current;
    }
    else return;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const universe = Universe.new();
    const width = universe.width();
    const height = universe.height();

    canvasEl.height = (CELL_SIZE + 1) * height + 1;
    canvasEl.width = (CELL_SIZE + 1) * width + 1;

    const renderLoop = () => {
      universe.tick();

      drawGrid();
      drawCells();

      requestAnimationFrame(renderLoop);
    }

    const getIndex = (row: number, column: number) => {
      return row * width + column;
    }

    const drawCells = () => {
      const cellsPtr = universe.cells();
      const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

      ctx.beginPath();

      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          const idx = getIndex(row, col);

          ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;
          ctx.fillRect(
            col * (CELL_SIZE + 1) + 1,
            row * (CELL_SIZE + 1) + 1,
            CELL_SIZE,
            CELL_SIZE
          )
        }
      }

      ctx.stroke();
    }

    const drawGrid = () => {
      ctx.beginPath();
      ctx.strokeStyle = GRID_COLOR;

      // Vertical lines
      for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
      }

      for (let j = 0; j <= height; j++) {
        ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * height + 1, j * (CELL_SIZE + 1) + 1);
      }

      ctx.stroke();
    }

    var handle = requestAnimationFrame(renderLoop);

    return () => {
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(handle);
    }
  });

  return (
    <div className='absolute p-5 top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
      <canvas ref={canvas} className="w-full h-full overflow-hidden bg-gray-800 text-white" id="game-of-life-canvas"></canvas>
    </div>
  )
}

export default WasmGameOfLife
