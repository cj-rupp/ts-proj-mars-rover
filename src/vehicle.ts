import { rover, DIRECTIONS, CAPABILITIES } from "./types";
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

export const getNewRover = () => {
    const nextName: (string|undefined) = candidateNames.shift();

    if(nextName) {
        const nextRover: rover =  {
            name: nextName,
            location: origin,
            orientation: DIRECTIONS[1],
            condition: CAPABILITIES[0]
        }
        return nextRover;
    }
    else {
        throw(new Error("Rover supply exhausted"));
    }
}