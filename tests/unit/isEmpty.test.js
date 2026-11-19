import { describe, test, expect } from "vitest";
import isEmpty from "../../src/isEmpty.js";

describe('Function under test - isEmpty()', () => {

    describe('null and undefined', () => {
        test('returns true when value is null', () => {
            expect(isEmpty(null))
            .toBe(true)
        });

        test('returns true when value is undefined', () => {
            expect(isEmpty(undefined))
            .toBe(true)
        });
    });

    describe('primitive values', () => {
        test('returns true when value is boolean true', () => {
            expect(isEmpty(true))
            .toBe(true)
        });

        test('returns true when value is boolean false', () => {
            expect(isEmpty(false))
            .toBe(true)
        });

        test('returns true when value is number 1', () => {
            expect(isEmpty(1))
            .toBe(true)
        });

        test('returns true when value is number 0', () => {
            expect(isEmpty(0))
            .toBe(true)
        });

        test('returns true when value is NaN', () => {
            expect(isEmpty(NaN))
            .toBe(true)
        });
    });

    describe('arrays', () => {
        test('returns true when array is empty', () => {
            expect(isEmpty([]))
            .toBe(true)
        });

        test('returns false when array has elements', () => {
            expect(isEmpty([1, 2, 3]))
            .toBe(false)
        });

        test('returns false when array has single element', () => {
            expect(isEmpty([1]))
            .toBe(false)
        });

        test('returns false when array contains null', () => {
            expect(isEmpty([null]))
            .toBe(false)
        });

        test('returns false when array contains undefined', () => {
            expect(isEmpty([undefined]))
            .toBe(false)
        });
    });

    describe('strings', () => {
        test('returns true when string is empty', () => {
            expect(isEmpty(''))
            .toBe(true)
        });

        test('returns false when string has content', () => {
            expect(isEmpty('abc'))
            .toBe(false)
        });

        test('returns false when string has single character', () => {
            expect(isEmpty('a'))
            .toBe(false)
        });

        test('returns false when string has spaces', () => {
            expect(isEmpty('   '))
            .toBe(false)
        });
    });

    describe('objects', () => {
        test('returns true when object is empty', () => {
            expect(isEmpty({}))
            .toBe(true)
        });

        test('returns false when object has properties', () => {
            expect(isEmpty({ a: 1 }))
            .toBe(false)
        });

        test('returns false when object has multiple properties', () => {
            expect(isEmpty({ a: 1, b: 2, c: 3 }))
            .toBe(false)
        });

        test('returns false when object has null value', () => {
            expect(isEmpty({ a: null }))
            .toBe(false)
        });

        test('returns false when object has undefined value', () => {
            expect(isEmpty({ a: undefined }))
            .toBe(false)
        });

        test('returns true when object has only non-enumerable properties', () => {
            const obj = {}
            Object.defineProperty(obj, 'a', { value: 1, enumerable: false })
            expect(isEmpty(obj))
            .toBe(true)
        });
    });

    describe('maps', () => {
        test('returns true when map is empty', () => {
            expect(isEmpty(new Map()))
            .toBe(true)
        });

        test('returns false when map has entries', () => {
            const map = new Map()
            map.set('a', 1)
            expect(isEmpty(map))
            .toBe(false)
        });

        test('returns false when map has multiple entries', () => {
            const map = new Map()
            map.set('a', 1)
            map.set('b', 2)
            expect(isEmpty(map))
            .toBe(false)
        });
    });

    describe('sets', () => {
        test('returns true when set is empty', () => {
            expect(isEmpty(new Set()))
            .toBe(true)
        });

        test('returns false when set has values', () => {
            const set = new Set()
            set.add(1)
            expect(isEmpty(set))
            .toBe(false)
        });

        test('returns false when set has multiple values', () => {
            const set = new Set()
            set.add(1)
            set.add(2)
            expect(isEmpty(set))
            .toBe(false)
        });
    });

    describe('array-like objects', () => {
        test('returns true when arguments object is empty', () => {
            function testFunc() {
                return isEmpty(arguments)
            }
            expect(testFunc())
            .toBe(true)
        });

        test('returns false when arguments object has values', () => {
            function testFunc() {
                return isEmpty(arguments)
            }
            expect(testFunc(1, 2, 3))
            .toBe(false)
        });
    });

    describe('documented examples', () => {
        test('isEmpty(null) returns true', () => {
            expect(isEmpty(null))
            .toBe(true)
        });

        test('isEmpty(true) returns true', () => {
            expect(isEmpty(true))
            .toBe(true)
        });

        test('isEmpty(1) returns true', () => {
            expect(isEmpty(1))
            .toBe(true)
        });

        test('isEmpty([1, 2, 3]) returns false', () => {
            expect(isEmpty([1, 2, 3]))
            .toBe(false)
        });

        test("isEmpty('abc') returns false", () => {
            expect(isEmpty('abc'))
            .toBe(false)
        });

        test("isEmpty({ 'a': 1 }) returns false", () => {
            expect(isEmpty({ a: 1 }))
            .toBe(false)
        });
    });

});
