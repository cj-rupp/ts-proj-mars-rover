import { setNewPlateau } from "../src/surface";
describe("setNewPlateau", () => {

    test('Expect setNewPlateau to return plateau object with appropriate origin and apex', () => {
        expect(setNewPlateau(15,15)).toEqual({ apex: { x:15, y:15 },
                                                    origin: { x:0, y:0 }});
    });
});

