import { rover, point, DIRECTIONS, CAPABILITIES, roverState, orientation } from "./types";
import { origin } from "./surface";

const candidateNames: Array<string> = [
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

const defaultState: roverState = ["request",'E',{ x:0, y:0 }, CAPABILITIES[0]];

export const getNewRover = (initialState:roverState=defaultState) => {
    const [sender, initialOrientation, initialLocation, initialCondition] = initialState;
    const nextName: (string|undefined) = candidateNames.shift();

    if(nextName && sender === "request") {
        const nextRover: rover =  {
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