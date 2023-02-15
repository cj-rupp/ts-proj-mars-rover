import { DIRECTIONS, COMMANDS , Point, Orientation, Rover, Operation, Command} from "./types";
import { setNewPlateau, identifyRover, keepTabsOnRover, reportPlateau } from "./surface";
import { interpret, instructionsToOperations } from "./instruct";
import { applyCommand } from "./manoeuvre";
import { getReport } from "./vehicle";


let ROVER_ADDRESSEE: Rover;

export const readFile = (fileContents:string) => {
    /* split into lines */
    const inputLines: Array<string> = fileContents.split(/[\r?\n]+/g);
    const lineReports = inputLines.map((line) => { return readLine(line) });
    return lineReports;
}

export const readLine = (lineString:string) => {
    const plateauPattern = /^\s*(\d+)\s+(\d+)\s*$/;
    const roverStatePattern = new RegExp(`^\\s*(\\d+)\\s+(\\d+)\\s+([${[...DIRECTIONS].join("")}])\\s*`);
    const manoeuvresPattern = new RegExp(`^\\s*([${[...COMMANDS].join("")}]+)\\s*`);
    const plateauMatches = getMatchGroups(lineString, plateauPattern);
    if(plateauMatches) {
        setNewPlateau(parseInt(plateauMatches[0]), parseInt(plateauMatches[1]));
        return reportPlateau();
    }
    const roverStateMatches = getMatchGroups(lineString, roverStatePattern);
    if(roverStateMatches){
        const newLocation:Point = { x: parseInt(roverStateMatches[0]), 
                                    y: parseInt(roverStateMatches[1])};
        const relevantRover: (Rover|false) = identifyRover(newLocation, (roverStateMatches[2] as Orientation))
        if(relevantRover) {
            ROVER_ADDRESSEE = relevantRover;
        }
        return getReport(ROVER_ADDRESSEE);
    }
    const manoeuvresMatches = getMatchGroups(lineString, manoeuvresPattern);
    if(manoeuvresMatches) {
        const commandList: Array<Command> = interpret(manoeuvresMatches[0]);
        const manoeuvreList: Array<Operation> = instructionsToOperations(commandList);
        if(ROVER_ADDRESSEE !== undefined){
            const lastRover: Rover = manoeuvreList.reduce((rover:Rover,manoeuvre:Operation) => {
                const updatedRover: Rover = applyCommand(rover,manoeuvre);
                keepTabsOnRover(updatedRover);
                return updatedRover; 
            }, ROVER_ADDRESSEE);
            return getReport(lastRover);
        }
    }
}

export const getMatchGroups = (line: string, pattern: RegExp) => {
    const matchList = line.match(pattern);
    if(matchList){
        return matchList.slice(1);
    }
}