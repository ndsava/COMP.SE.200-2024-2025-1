import { describe, test, expect } from "vitest";
import every from "../../src/every.js";

describe('Phase1 planned test - every()', () => {
    describe('basic functionality', () => {
        test('returns true when all elements satisfy condition', () => {
            expect(every([2,4,6], x => x % 2 === 0 ))
            .toBe(true)
        });
        test('returns false when last element fails the condition', () => {
            expect(every([2,4,5], x => x % 2 === 0 ))
            .toBe(false)
        });
        test('returns false when first element fails the condition', () => {
            expect(every([1,4,6], x => x % 2 === 0 ))
            .toBe(false)
        });
        // VIRHE test planissa, tämän tulee palauttaa true kun tyhjä array inputtina, lukee funkun kuvauksessa
        test('returns true when empty array given as input', () => {
            expect(every([], x => x === true ))
            .toBe(true)
        });
      
        test('returns false when input is null', () => {
            expect(every(null, x => x === true ))
            .toBe(false)
        });
    })

    describe('edge cases', () => {
          // Tämä ymmärretty väärin test plania tehdessä
        test('returns true when input is null', () => {
            expect(every(null, () => false))
            .toBe(true)
        });
 // seuraavat ei löydy test planista:
        test('returns true when input is undefined', () => {
            expect(every(undefined, () => false))
            .toBe(true)
        });

        test('returns true with single element that passes', () => {
            expect(every([5], (num) => num > 0))
            .toBe(true)
        });

        test('returns false with single element that fails', () => {
            expect(every([5], (num) => num < 0))
            .toBe(false)
        });
    });
}); 