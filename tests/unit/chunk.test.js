import { describe, test, expect } from "vitest";
import chunk from "../../src/chunk.js";

describe('Function under test - chunk()', () => {

    describe('basic functionality', () => {
        test('splits array into chunks of specified size', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 2))
            .toEqual([['a', 'b'], ['c', 'd']])
        });

        test('handles remaining elements in final chunk', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 3))
            .toEqual([['a', 'b', 'c'], ['d']])
        });

        test('returns array of single elements with size 1', () => {
            expect(chunk([1, 2, 3], 1))
            .toEqual([[1], [2], [3]])
        });

        test('returns entire array as single chunk when size equals length', () => {
            expect(chunk([1, 2, 3, 4], 4))
            .toEqual([[1, 2, 3, 4]])
        });
    });

    describe('size parameter', () => {
        test('uses default size of 1 when not specified', () => {
            expect(chunk([1, 2, 3]))
            .toEqual([[1], [2], [3]])
        });

        test('handles size larger than array length', () => {
            expect(chunk([1, 2, 3], 10))
            .toEqual([[1, 2, 3]])
        });

        test('handles size of 2', () => {
            expect(chunk([1, 2, 3, 4, 5], 2))
            .toEqual([[1, 2], [3, 4], [5]])
        });

        test('handles size of 5', () => {
            expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))
            .toEqual([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
        });
    });

    describe('edge cases', () => {
        test('returns empty array when input is empty', () => {
            expect(chunk([], 2))
            .toEqual([])
        });

        test('returns empty array when input is null', () => {
            expect(chunk(null, 2))
            .toEqual([])
        });

        test('returns empty array when input is undefined', () => {
            expect(chunk(undefined, 2))
            .toEqual([])
        });

        test('returns empty array when size is 0', () => {
            expect(chunk([1, 2, 3], 0))
            .toEqual([])
        });

        test('returns empty array when size is negative', () => {
            expect(chunk([1, 2, 3], -5))
            .toEqual([])
        });
    });

    describe('different data types', () => {
        test('works with string array', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 2))
            .toEqual([['a', 'b'], ['c', 'd']])
        });

        test('works with number array', () => {
            expect(chunk([1, 2, 3, 4, 5], 2))
            .toEqual([[1, 2], [3, 4], [5]])
        });

        test('works with object array', () => {
            expect(chunk([{ id: 1 }, { id: 2 }, { id: 3 }], 2))
            .toEqual([[{ id: 1 }, { id: 2 }], [{ id: 3 }]])
        });

        test('works with mixed type array', () => {
            expect(chunk([1, 'a', true, null], 2))
            .toEqual([[1, 'a'], [true, null]])
        });
    });

    describe('documented examples', () => {
        test("chunk(['a', 'b', 'c', 'd'], 2) returns [['a', 'b'], ['c', 'd']]", () => {
            expect(chunk(['a', 'b', 'c', 'd'], 2))
            .toEqual([['a', 'b'], ['c', 'd']])
        });

        test("chunk(['a', 'b', 'c', 'd'], 3) returns [['a', 'b', 'c'], ['d']]", () => {
            expect(chunk(['a', 'b', 'c', 'd'], 3))
            .toEqual([['a', 'b', 'c'], ['d']])
        });
    });

});
