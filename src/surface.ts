import { point, plateau, roverState, rover, orientation } from "./types";
import { getNewRover, getReport } from "./vehicle";

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

export const roverLocations = new Map();
export const activeRovers = new Map();

export const identifyRover = (location:point,direction:orientation) => {
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
        const newState:roverState = ["request", direction, location, "operational"];
        const pristineRover:rover = getNewRover(newState);
        return pristineRover;
    }
}


export const keepTabsOnRover = (vehicle:rover) => {
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



