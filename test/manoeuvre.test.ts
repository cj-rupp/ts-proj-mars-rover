import { move } from "../src/manoeuvre";
import { origin } from "../src/surface";
import { getNewRover } from "../src/vehicle";
import { Point, DIRECTIONS, Rover } from "../src/types";

const dummyRover = getNewRover();

describe("move", () => {

/*    test('Expect move to throw an exception if either argument is null', () => {
        expect(() => {move("", origin)}).toThrow("No Direction provided");
//        expect(() => move('E', dummy)).toThrow("No position provided");
    }); */

    test('Expect move return the next point in the appropriate direction', () => {
        expect(move.apply(dummyRover,['E', origin])).toEqual({ x:1, y:0 });
        expect(move.apply(dummyRover,['N', origin])).toEqual({ x:0 , y:1 });
    });

    test('Expect move return false, if the next point is out of bounds', () => {
        expect(move.apply(dummyRover,['W', origin])).toEqual(false);
        expect(move.apply(dummyRover,['S', origin])).toEqual(false);
    });

});
    