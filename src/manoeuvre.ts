import { point, DIRECTIONS} from "./types";
import { outOfBounds } from "./surface";

const directionalIncrementTable = new Map([
    ['N', { x:0, y:1 }],
    ['E', { x:1, y:0 }],
    ['S', { x:0, y:-1 }],
    ['W', { x:-1, y:0 }],
]);

export const move = (cardinalPoint:string, location:point) => {
    if(cardinalPoint.length === 0 || !DIRECTIONS.includes(cardinalPoint)){
        throw(new Error("No Direction provided"));
    }
    let dummy:point;/* 
    if(location === dummy) {
        throw(new Error("No Direction provided"));
    } */
    const increment:(point|undefined) = directionalIncrementTable.get(cardinalPoint);
    if(increment) {
        const nextPoint:point = {
                                x: (location.x + increment.x),
                                y: (location.y + increment.y)
                                } 
        return ((outOfBounds(nextPoint)) ? false : nextPoint);
    }
    else {
        console.log("This line should never be reached");
    }
}