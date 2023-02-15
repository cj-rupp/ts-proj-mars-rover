import { move, turn } from "../src/manoeuvre";
import { origin } from "../src/surface";
import { getNewRover } from "../src/vehicle";

const dummyRover = getNewRover();

describe("move", () => {

    test('Expect move to return the next point in the appropriate direction', () => {
        expect(move.apply(dummyRover,['E', origin])).toEqual({ x:1, y:0 });
        expect(move.apply(dummyRover,['N', origin])).toEqual({ x:0 , y:1 });
        expect(move.apply(dummyRover,['S', { x:10, y:4 }])).toEqual({ x:10, y:3 });
        expect(move.apply(dummyRover,['W', { x:10, y:4 }])).toEqual({ x:9 , y:4 });
    });

    test('Expect move to return false, if the next point is out of bounds', () => {
        expect(move.apply(dummyRover,['W', origin])).toEqual(false);
        expect(move.apply(dummyRover,['S', origin])).toEqual(false);
    });

    test('Expect turn to return new heading', () => {
        expect(turn.apply(dummyRover,['W', 'R'])).toEqual('N');
        expect(turn.apply(dummyRover,['S', 'L'])).toEqual('E');
    });

});
    