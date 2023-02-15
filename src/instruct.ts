import { Command, RoverState, Point, COMMANDS} from "./types";
import { move, turn } from "./manoeuvre";

const commandPattern = `^[${COMMANDS.join("")}]+`;

const isCommand = (possibleCommand:string): possibleCommand is Command => {
    const testCommands: Array<string> = [...COMMANDS];
    return testCommands.includes(possibleCommand);
}

export const interpret = (instructions:string) => {
    if(instructions.length === 0) { throw(new Error("No instructions provided"))}
    if(!instructions.match(commandPattern)) { throw(new Error("Unknown instruction submitted"))}
    const rawInstructionList:Array<string> = instructions.split("")
    return rawInstructionList.reduce(
        (trueCommands:Array<Command>,protoCommand:string) => {
            if(isCommand(protoCommand)) {
                trueCommands.push(protoCommand);
            }
            return trueCommands;
        }, []);
}

export const instructionsToOperations = (instructions:Array<Command>) => {
    const operationsList = instructions.map((instruction:Command) => {
        return (instruction === 'M') ? { toDo: move } : { toDo: turn, arg: instruction};
    })
    return operationsList;
}

export const report = (resultState:RoverState) => {
    const resultLocation:Point = resultState[2];
    return `${resultState[1]} ${resultLocation.x} ${resultLocation.x}`;
}