import { move, turn } from "../src/manoeuvre";
import { interpret } from "../src/instruct";
import { rover, point, command } from "../src/types";

let dummy:point;

describe("interpret", () => {

    test('Expect interpret to throw an exception if command string is empty', () => {
        expect(() => {interpret("")}).toThrow("No instructions provided");
    });

    test('Expect interpret to return a list of manoeuvre objects', () => {
        expect(interpret("LMR")).toEqual([
            { toDo: turn, arg: 'L'},
            { toDo: move },
            { toDo: turn, arg: 'R'},
        ]);
        
        expect(interpret("MML")).toEqual([
            { toDo: move },
            { toDo: move },
            { toDo: turn, arg: 'L'},
        ]);

        
        expect(interpret("MRM")).toEqual([
            { toDo: move },
            { toDo: turn, arg: 'R'},
            { toDo: move },
        ])
    });
});