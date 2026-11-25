import { describe, test, expect } from "vitest";
import filter from '../../src/filter.js';


describe ('Phase1 planned tests - filter()', () => {
    describe('basic functionality', () => {
        test('returns empty array when no matches exist', () => {
            expect(filter([1,2,3,4], x => x > 10))
            .toEqual([]);
        });
        test('returns only matching elements', () => {
            expect(filter([1,2,3,4], x => x > 2))
            .toEqual([3,4])
        });
        test('returns original content when all elements match condition', () => {
            expect(filter([1,2,3,4], x => x > 0))
            .toEqual([1,2,3,4])
        });
        test('returns empty array when input array is empty array', () => {
            expect(filter([], x => x > 0))
            .toEqual([])
        });        
    })
    describe('edge cases', () => {
        test('handles null array', () => {
            expect(filter(null, () => true))
            .toEqual([])
        });

        test('handles undefined array', () => {
            expect(filter(undefined, () => true))
            .toEqual([])
        });

        test('works with single element array', () => {
            expect(filter([5], (num) => num > 0))
            .toEqual([5])
        });

        test('returns empty array with single element that fails', () => {
            expect(filter([5], (num) => num < 0))
            .toEqual([])
        });

        test('preserves element order', () => {
            const result = filter([5, 2, 8, 1, 9], (num) => num > 3)
            expect(result).toEqual([5, 8, 9])
        });


    });



});