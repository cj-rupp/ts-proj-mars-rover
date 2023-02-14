import { Point, DIRECTIONS, ROTATIONS, Orientation, LegalTurn } from "./types";
import { outOfBounds } from "./surface";

const directionalIncrementTable = new Map([
    ['N', { x:0, y:1 }],
    ['E', { x:1, y:0 }],
    ['S', { x:0, y:-1 }],
    ['W', { x:-1, y:0 }],
]);

export const move = (cardinalPoint:Orientation, location:Point) => {
    if(cardinalPoint.length === 0 || !DIRECTIONS.includes(cardinalPoint)){
        throw(new Error("No Direction provided"));
    }
    const increment:(Point|undefined) = directionalIncrementTable.get(cardinalPoint);
    if(increment) {
        const nextPoint:Point = {
                                x: (location.x + increment.x),
                                y: (location.y + increment.y)
                                } 
        return ((outOfBounds(nextPoint)) ? false : nextPoint);
    }
    else {
        console.log("This line should never be reached");
    }
}

export const turn = (currentOrientation:Orientation, turnInstruction:LegalTurn) => {
    return DIRECTIONS[(DIRECTIONS.indexOf(currentOrientation) +
        ROTATIONS.indexOf(turnInstruction) ) % DIRECTIONS.length ];
}