import { Point, DIRECTIONS, ROTATIONS, Orientation, LegalTurn, Rover, Operation, Rotation, Displacement } from "./types";
import { outOfBounds, roverLocations } from "./surface";

const directionalIncrementTable = new Map([
    ['N', { x:0, y:1 }],
    ['E', { x:1, y:0 }],
    ['S', { x:0, y:-1 }],
    ['W', { x:-1, y:0 }],
]);

export const move:Displacement = (cardinalPoint:Orientation, location:Point) => {
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
        return false;
    }
}

export const turn:Rotation = (currentOrientation:Orientation, turnInstruction:LegalTurn) => {
    return DIRECTIONS[(DIRECTIONS.indexOf(currentOrientation) +
        ROTATIONS.indexOf(turnInstruction) ) % DIRECTIONS.length ];
}

export const applyCommand = (vehicle:Rover,  action:Operation) => {
    if('arg' in action && action.arg) {
        const nextDirection: Orientation = (action.toDo as Rotation).apply(vehicle, [vehicle.orientation, action.arg]);
        vehicle.orientation = nextDirection;
    }
    else{
        const nextLocation: (Point|false) = (action.toDo as Displacement).apply(vehicle, [vehicle.orientation, vehicle.location]);
        if(nextLocation && probe(nextLocation)) {
            vehicle.location = nextLocation;
        }
    }
    return vehicle;
}

export const probe = (probeSpace:Point) => {
    return ((roverLocations.has(probeSpace)) ? false : true);
}