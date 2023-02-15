import { move, turn } from "../src/manoeuvre";
import { interpret, instructionsToOperations } from "../src/instruct";

describe("interpret", () => {

    test('Expect interpret to throw an exception if command string is empty', () => {
        expect(() => {interpret("")}).toThrow("No instructions provided");
    });

    test('Expect interpret to throw an exception input contains additional characters', () => {
        expect(() => {interpret("BLAM")}).toThrow("Unknown instruction submitted");
    });

    test('Expect interpret to return an array of command characters', () => {
        expect(interpret("LMR")).toEqual(['L','M','R']);
        expect(interpret("MML")).toEqual(['M','M','L']);
        expect(interpret("LMRMML")).toEqual(['L','M','R','M','M','L']);
    });
});


describe("instructionsToOperations", () => {

    test('Expect interpret to return a list of manoeuvre objects', () => {
        expect(instructionsToOperations(['L','M','R'])).toEqual([
            { toDo: turn, arg: 'L'},
            { toDo: move },
            { toDo: turn, arg: 'R'},
        ]);
        
        expect(instructionsToOperations(['M','M','L'])).toEqual([
            { toDo: move },
            { toDo: move },
            { toDo: turn, arg: 'L'},
        ]);

        
        expect(instructionsToOperations(['M','R','M'])).toEqual([
            { toDo: move },
            { toDo: turn, arg: 'R'},
            { toDo: move },
        ])
    });
});