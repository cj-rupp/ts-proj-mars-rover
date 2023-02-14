import { command, roverState, point, COMMANDS} from "./types";
import { move, turn } from "./manoeuvre";

const isCommand = (possibleCommand:string): possibleCommand is command => {
    const testCommands: Array<string> = [...COMMANDS];
    return testCommands.includes(possibleCommand);
}

export const interpret = (instructions:string) => {
    if(instructions.length === 0) { throw(new Error("No instructions provided"))}
    const rawInstructionList:Array<string> = instructions.split("")
    const instructionList:Array<command> = rawInstructionList.reduce(
        (trueCommands:Array<command>,protoCommand:string) => {
            if(isCommand(protoCommand)) {
                trueCommands.push(protoCommand);
            };
            return trueCommands;
        }, []);
    const operationsList = instructionList.map((instruction:command) => {
        return (instruction === 'M') ? { toDo: move } : { toDo: turn, arg: instruction};
    })
    return operationsList;
}

export const report = (resultState:roverState) => {
    const resultLocation:point = resultState[2];
    return `${resultState[1]} ${resultLocation.x} ${resultLocation.x}`;
}