import { move } from "../src/manoeuvre";
import { origin } from "../src/surface";
import { Point, DIRECTIONS } from "../src/types";

describe("move", () => {

/*    test('Expect move to throw an exception if either argument is null', () => {
        expect(() => {move("", origin)}).toThrow("No Direction provided");
//        expect(() => move('E', dummy)).toThrow("No position provided");
    }); */

    test('Expect move return the next point in the appropriate direction', () => {
        expect(move('E', origin)).toEqual({ x:1, y:0 });
        expect(move('N', origin)).toEqual({ x:0 , y:1 });
    });

    test('Expect move return false, if the next point is out of bounds', () => {
        expect(move('W', origin)).toEqual(false);
        expect(move('S', origin)).toEqual(false);
    });

});
    