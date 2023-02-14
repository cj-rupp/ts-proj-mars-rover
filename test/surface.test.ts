import { setNewPlateau } from "../src/surface";
describe("setNewPlateau", () => {

    test('Expect setNewPlateau to throw an exception, if plateau apex coordinate do not exceed origin', () => {
        expect(() => setNewPlateau(0,-7)).toThrow(Error("Plateau specification too small to contain a rover"));
        expect(() => setNewPlateau(-7,0)).toThrow(Error("Plateau specification too small to contain a rover"));
        expect(() => setNewPlateau(17,-7)).toThrow(Error("Plateau specification too small to contain a rover"));
        expect(() => setNewPlateau(-7,17)).toThrow(Error("Plateau specification too small to contain a rover"));
    });

    test('Expect setNewPlateau to return plateau object with appropriate origin and apex', () => {
        expect(setNewPlateau(15,15)).toEqual({ apex: { x:15, y:15 },
                                                    origin: { x:0, y:0 }});
    });
});

