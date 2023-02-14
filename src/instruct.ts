import { Command, RoverState, Point, COMMANDS} from "./types";
import { move, turn } from "./manoeuvre";

const isCommand = (possibleCommand:string): possibleCommand is Command => {
    const testCommands: Array<string> = [...COMMANDS];
    return testCommands.includes(possibleCommand);
}

export const interpret = (instructions:string) => {
    if(instructions.length === 0) { throw(new Error("No instructions provided"))}
    const rawInstructionList:Array<string> = instructions.split("")
    const instructionList:Array<Command> = rawInstructionList.reduce(
        (trueCommands:Array<Command>,protoCommand:string) => {
            if(isCommand(protoCommand)) {
                trueCommands.push(protoCommand);
            }
            return trueCommands;
        }, []);
    const operationsList = instructionList.map((instruction:Command) => {
        return (instruction === 'M') ? { toDo: move } : { toDo: turn, arg: instruction};
    })
    return operationsList;
}

export const report = (resultState:RoverState) => {
    const resultLocation:Point = resultState[2];
    return `${resultState[1]} ${resultLocation.x} ${resultLocation.x}`;
}