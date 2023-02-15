import { readLine } from "../src/ui";

describe("readLine", () => {

    test('Expect getNewRover to return a well-formet rover', () => {
        expect(readLine("17 17")).toEqual([0,0,17,17])
    });

    test('Expect getNewRover to return a well-formet rover', () => {
        expect(readLine("5 7 N")).toEqual(["nomad", "N", { x: 5, y: 7}, "operational"]);
    });

    test('Expect getNewRover to return a well-formet rover', () => {
        expect(readLine("L")).toEqual(["nomad", "E", { x: 5, y: 7}, "operational"]);
    });
});