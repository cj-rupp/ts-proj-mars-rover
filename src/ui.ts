import { DIRECTIONS, COMMANDS , Point, Orientation, Rover, Operation, Command} from "./types";
import { setNewPlateau, identifyRover } from "./surface";
import { interpret, instructionsToOperations } from "./instruct";
import { applyCommand } from "./manoeuvre";


let ROVER_ADDRESSEE: Rover;

const readFile = (fileContents:string) => {
    /* split into lines */
    const inputLines: Array<string> = fileContents.split(/\r?\n/g);
}

const readLine = (lineString:string) => {
    /* recognise command */
    const plateauPattern = /^\s*(\d+)\s+(\d+)\s*$/;
    const roverStatePattern = new RegExp(`^\s*(\d+)\s+(\d+)\s+([${[...DIRECTIONS].join("")}])\s*`);
    const manoeuvresPattern = new RegExp(`^\s*([${[...COMMANDS].join("")}]+)\s*`);
    if(lineString.match(plateauPattern)) {
        const plateauMatches = [...lineString.matchAll(plateauPattern)].slice(1)[0];
        setNewPlateau(parseInt(plateauMatches[0]), parseInt(plateauMatches[1]));
    }
    else if(lineString.match(roverStatePattern)){
        const roverStateMatches = [...lineString.matchAll(roverStatePattern)].slice(1)[0];
        const newLocation:Point = { x: parseInt(roverStateMatches[0]), 
                                    y: parseInt(roverStateMatches[1])};
        const relevantRover: (Rover|false) = identifyRover(newLocation, (roverStateMatches[2] as Orientation))
        if(relevantRover) {
            ROVER_ADDRESSEE = relevantRover;
        }
    }
    else if(lineString.match(manoeuvresPattern)) {
        const manoeuvresmatches = [...lineString.matchAll(manoeuvresPattern)].slice(1)[0];

        const commandList: Array<Command> = interpret(manoeuvresmatches[1]);
        const manoeuvreList: Array<Operation> = instructionsToOperations(commandList);
        if(ROVER_ADDRESSEE !== undefined){
            manoeuvreList.reduce((rover:Rover,manoeuvre:Operation) => {
              return applyCommand(rover,manoeuvre);  
            }, ROVER_ADDRESSEE);
        }
    }
    /* reject bad commands */
    /* send command */
}