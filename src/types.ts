
export const DIRECTIONS = ['N','E','S','W'];

export type orientation = typeof DIRECTIONS[number];

export const ROTATIONS = ['Z','L','B','R'];

export const COMMANDS = ['L','R','M'];

export type command = typeof COMMANDS[number];

export const CAPABILITIES = ['operational','crashed'];

export type condition = typeof CAPABILITIES[number];

export type point = {x: number, y: number};

export type canvas = {origin: point, apex: point};

export type rover = {
    name: string;
    location: point;
    orientation: orientation;
    condition: condition;
}

export type plateau = {
    apex: point,
    origin: point,
}
