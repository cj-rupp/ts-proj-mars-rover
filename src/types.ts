
export const DIRECTIONS = ['N','E','S','W'];

export const CAPABILITIES = ['operational','crashed'];

export type point = {x: number, y: number};

export type canvas = {origin: point, apex: point};

export type rover = {
    name: string;
    location: point;
    orientation: typeof DIRECTIONS[number];
    condition: typeof CAPABILITIES[number];
}

export type plateau = {
    apex: point,
    origin: point,
}
