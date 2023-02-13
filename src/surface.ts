import { point, plateau } from "./types";

let SURFACE:plateau;

export const origin:point = { x:0, y:0};

const apex:point = { x:15, y:15};

export const setNewPlateau = (top:number,right:number) => {
    const topRight: point = { x:top, y:right };
    const newPlateau:plateau = { apex:topRight, origin:origin };
    SURFACE = newPlateau;
    return newPlateau;
}

export const outOfBounds = (location:point) => (
    location.x > apex.x ||
    location.x < origin.x ||
    location.y > apex.y ||
    location.y < origin.y);

