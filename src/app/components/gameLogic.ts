export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;
export const EMPTY_CELL = '';

export type TetrominoType = 'I' | 'O' | 'T' | 'L' | 'J' | 'S' | 'Z';

export interface GameState {
  grid: string[][];
  currentPiece: {
    type: TetrominoType;
    x: number;
    y: number;
    rotation: number;
  } | null;
  nextPiece: TetrominoType;
  score: number;
  level: number;
  lines: number;
  gameOver: boolean;
  isPlaying: boolean;
}

export const PIECES = {
  I: {
    color: 'bg-cyan-400 border-cyan-300',
    rotations: [[[1,1,1,1]],[[1],[1],[1],[1]],[[1,1,1,1]],[[1],[1],[1],[1]]]
  },
  O: {
    color: 'bg-yellow-400 border-yellow-300',
    rotations: [[[1,1],[1,1]],[[1,1],[1,1]],[[1,1],[1,1]],[[1,1],[1,1]]]
  },
  T: {
    color: 'bg-purple-400 border-purple-300',
    rotations: [[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]]
  },
  L: {
    color: 'bg-orange-400 border-orange-300',
    rotations: [[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]],[[0,0,1],[1,1,1]]]
  },
  J: {
    color: 'bg-blue-400 border-blue-300',
    rotations: [[[0,1],[0,1],[1,1]],[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]]]
  },
  S: {
    color: 'bg-green-400 border-green-300',
    rotations: [[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]],[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]]
  },
  Z: {
    color: 'bg-red-400 border-red-300',
    rotations: [[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]],[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]]
  }
};
