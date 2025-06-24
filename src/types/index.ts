export interface Player {
  id: string;
  position: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

export interface TacticalArrow {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
}

export interface Position {
  x: number;
  y: number;
}