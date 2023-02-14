
export const DIRECTIONS = ['N','E','S','W'] as const;

export type orientation = typeof DIRECTIONS[number];

export const ROTATIONS = ['Z','L','B','R'] as const;

export type legalTurn = ('L'|'R');

export const COMMANDS = ['L','R','M'] as const;

export type command = typeof COMMANDS[number];

export const CAPABILITIES = ['operational','crashed'] as const;

export type condition = typeof CAPABILITIES[number];

export type point = {x: number, y: number};

export type canvas = {origin: point, apex: point};

export type rover = {
    name: string;
    location: point;
    orientation: orientation;
    condition: condition;
}

export type roverState = [string, orientation, point, condition];

export type plateau = {
    apex: point,
    origin: point,
}
