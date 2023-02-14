
export const DIRECTIONS = ['N','E','S','W'] as const;

export type Orientation = typeof DIRECTIONS[number];

export const ROTATIONS = ['Z','L','B','R'] as const;

export type LegalTurn = ('L'|'R');

export const COMMANDS = ['L','R','M'] as const;

export type Command = typeof COMMANDS[number];

export const CAPABILITIES = ['operational','crashed'] as const;

export type Condition = typeof CAPABILITIES[number];

export type Point = {x: number, y: number};

export type Canvas = {origin: Point, apex: Point};

export type Rover = {
    name: string;
    location: Point;
    orientation: Orientation;
    condition: Condition;
}

export type RoverState = [string, Orientation, Point, Condition];

export type Plateau = {
    apex: Point,
    origin: Point,
}
