import { command } from "./types";
import { move, turn } from "./manoeuvre";

export const interpret = (instructions:string) => {
    if(instructions.length === 0) { throw(new Error("No instructions provided"))}
    const instructionList:Array<command> = instructions.split("");
    const operationsList = instructionList.map((instruction:command) => {
        return (instruction === 'M') ? { toDo: move } : { toDo: turn, arg: instruction};
    })
    return operationsList;
}