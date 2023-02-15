import { readLine, readFile } from "../src/ui";
import { resetNaming } from "../src/vehicle";

const dummyFile1 = "17 17\n\n5 7 N\n\nR";
const dummyFile2 = "25 12\n\n10 4 S\n\nMMLMM";
const dummyFile3 = "25 12\n\n10 4 S\n\nMMLMM\n\n14 0 N\n\nMMLMM";

describe("readFile", () => {

    test('Expect readFile to return results for each input line', () => {
        expect(readFile(dummyFile1)).toEqual( [
            [0,0,17,17],
            ["nomad", "N", { x: 5, y: 7}, "operational"],
            ["nomad", "E", { x: 5, y: 7}, "operational"]
        ]);
        expect(readFile(dummyFile2)).toEqual( [
            [0,0,25,12],
            ["nomad", "S", { x: 10, y: 4}, "operational"],
            ["nomad", "E", { x: 12, y: 2}, "operational"]
        ]);
        expect(readFile(dummyFile3)).toEqual( [
            [0,0,25,12],
            ["nomad", "S", { x: 10, y: 4}, "operational"],
            ["nomad", "E", { x: 12, y: 2}, "operational"],
            ["wanderer", "N", { x: 14, y: 0}, "operational"],
            ["wanderer", "W", { x: 12, y: 2}, "operational"]
        ]);
    });
});

describe("readLine", () => {

    resetNaming();

    test('Expect readLine of dimensions to return coordinates of new plateau', () => {
        expect(readLine("17 17")).toEqual([0,0,17,17])
    });

    test('Expect readLine of initial location to return initial state of rover', () => {
        expect(readLine("5 7 N")).toEqual(["nomad", "N", { x: 5, y: 7}, "operational"]);
    });

    test('Expect readLine of commands string to return state of rover after manoeuvres', () => {
        expect(readLine("R")).toEqual(["nomad", "E", { x: 5, y: 7}, "operational"]);
    });
});