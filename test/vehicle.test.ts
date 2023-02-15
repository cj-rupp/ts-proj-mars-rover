
import { getNewRover } from "../src/vehicle";

describe("getNewRover", () => {

    test('Expect getNewRover to return a well-formed rover', () => {
        expect(getNewRover(["request",'E',{ x:0, y:0 }, "operational"])).toEqual({
            location: { x:0, y:0 },
            name:"nomad",
            orientation: 'E',
            condition: "operational"
        });
        expect(getNewRover()).toEqual({
            location: { x:0, y:0 },
            name:"wanderer",
            orientation: 'E',
            condition: "operational"

        });
        expect(getNewRover(["request",'N',{ x:4, y:3 }, "operational"])).toEqual({
            location: { x:4, y:3 },
            name:"itinerant",
            orientation: 'N',
            condition: "operational"

        });
    });

});
    