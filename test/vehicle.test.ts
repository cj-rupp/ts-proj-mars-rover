
import { getNewRover } from "../src/vehicle";
import { origin } from "../src/surface";
import { rover, point } from "../src/types";

describe("getNewRover", () => {

    test('Expect getNewRover to return a well-formet rover', () => {
        expect(getNewRover(origin)).toEqual({
            name: "nomad",
            location: { x:0, y:0 },
            orientation: 'E',
            condition: "operational"

        });
    });

});
    