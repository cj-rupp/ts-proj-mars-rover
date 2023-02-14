import { Point, Plateau, RoverState, Rover, Orientation } from "./types";
import { getNewRover, getReport } from "./vehicle";

let SURFACE:Plateau;

export const origin:Point = { x:0, y:0};

const apex:Point = { x:15, y:15};

export const setNewPlateau = (top:number,right:number) => {
    const topRight: Point = { x:top, y:right };
    const newPlateau: Plateau = { apex:topRight, origin:origin };
    SURFACE = newPlateau;
    return newPlateau;
}

export const outOfBounds = (location:Point) => (
    location.x > apex.x ||
    location.x < origin.x ||
    location.y > apex.y ||
    location.y < origin.y);

export const roverLocations = new Map();
export const activeRovers = new Map();

export const identifyRover = (location:Point,direction:Orientation) => {
    if(roverLocations.has(location)){
        const lastReport = roverLocations.get(location);
        if(lastReport && lastReport[1] === direction){
            const callSign = lastReport[0];
            if(activeRovers.has(callSign)){
                const identifiedRover = activeRovers.get(callSign);
                if(identifiedRover){
                    return identifiedRover;
                }
            }
            else {
                console.log("Lost track of rover!");
            }
        }
        else {
            console.log("Rover misidentified");
            return false;
        }
    }
    else {
        console.log("No rover at location");
        const newState:RoverState = ["request", direction, location, "operational"];
        const pristineRover:Rover = getNewRover(newState);
        return pristineRover;
    }
}


export const keepTabsOnRover = (vehicle:Rover) => {
    if(activeRovers.has(vehicle.name)) {
        const oldRover = activeRovers.get(vehicle.name);
        if(oldRover && roverLocations.has(oldRover.location)){
            const oldReport = roverLocations.get(oldRover.location);
            if(oldReport && oldReport[0] === vehicle.name){
                roverLocations.delete(oldRover.location);
            }
        }
    }
    const newReport = getReport(vehicle);
    activeRovers.set(vehicle.name,vehicle);
    roverLocations.set(vehicle.location, newReport);
}



