import { Rover, CAPABILITIES, RoverState } from "./types";
import { origin } from "./surface";

const nameBank: Array<string> = [
    "nomad",
    "wanderer",
    "itinerant",
    "traveller",
    "explorer",
    "swagmane",
    "hobo",
    "saddle tramp",
    "Roma",
    "Sinti",
    "bedouin",
    "tuareg"
]

let candidateNames = [...nameBank];

const defaultState: RoverState = ["request",'E', origin, CAPABILITIES[0]];

export const getNewRover = (initialState:RoverState=defaultState) => {
    const [sender, initialOrientation, initialLocation, initialCondition] = initialState;
    const nextName: (string|undefined) = candidateNames.shift();

    if(nextName && sender === "request") {
        const nextRover: Rover =  {
            name: nextName,
            location: initialLocation,
            orientation: initialOrientation,
            condition: initialCondition
        }
        return nextRover;
    }
    else {
        throw(new Error("Rover supply exhausted"));
    }
}

export const getReport = (relevantRover:Rover):RoverState => {
    return [relevantRover.name,
        relevantRover.orientation,
        relevantRover.location,
        relevantRover.condition];
}

export const resetNaming = () => {
    candidateNames = [...nameBank];
}