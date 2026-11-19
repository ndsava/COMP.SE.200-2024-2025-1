import { describe, test, expect } from "vitest";
import get from "../../src/get.js";

describe('Function under test - get()', () => {

    describe('basic functionality', () => {
        test('gets value at simple property path', () => {
            const object = { a: 1 }
            expect(get(object, 'a'))
            .toBe(1)
        });

        test('gets value at nested property path', () => {
            const object = { a: { b: { c: 3 } } }
            expect(get(object, 'a.b.c'))
            .toBe(3)
        });

        test('gets value from array using bracket notation', () => {
            const object = { a: [{ b: { c: 3 } }] }
            expect(get(object, 'a[0].b.c'))
            .toBe(3)
        });

        test('gets value using array path', () => {
            const object = { a: [{ b: { c: 3 } }] }
            expect(get(object, ['a', '0', 'b', 'c']))
            .toBe(3)
        });
    });

    describe('with defaultValue parameter', () => {
        test('returns defaultValue when path does not exist', () => {
            const object = { a: { b: { c: 3 } } }
            expect(get(object, 'a.b.d', 'default'))
            .toBe('default')
        });

        test('returns defaultValue when resolved value is undefined', () => {
            const object = { a: { b: { c: undefined } } }
            expect(get(object, 'a.b.c', 'default'))
            .toBe('default')
        });

        test('returns resolved value when it exists even if defaultValue provided', () => {
            const object = { a: { b: { c: 3 } } }
            expect(get(object, 'a.b.c', 'default'))
            .toBe(3)
        });

        test('returns defaultValue for deeply nested missing path', () => {
            const object = { a: { b: 1 } }
            expect(get(object, 'a.b.c.d.e', 'default'))
            .toBe('default')
        });
    });

    describe('with null and undefined objects', () => {
        test('returns defaultValue when object is null', () => {
            expect(get(null, 'a.b.c', 'default'))
            .toBe('default')
        });

        test('returns defaultValue when object is undefined', () => {
            expect(get(undefined, 'a.b.c', 'default'))
            .toBe('default')
        });

        test('returns undefined when object is null and no defaultValue', () => {
            expect(get(null, 'a.b.c'))
            .toBe(undefined)
        });

        test('returns undefined when object is undefined and no defaultValue', () => {
            expect(get(undefined, 'a.b.c'))
            .toBe(undefined)
        });
    });

    describe('with different data types', () => {
        test('gets value from object with string property', () => {
            const object = { name: 'John' }
            expect(get(object, 'name'))
            .toBe('John')
        });

        test('gets value from object with number property', () => {
            const object = { count: 42 }
            expect(get(object, 'count'))
            .toBe(42)
        });

        test('gets value from object with boolean property', () => {
            const object = { active: true }
            expect(get(object, 'active'))
            .toBe(true)
        });

        test('gets value from object with array property', () => {
            const object = { items: [1, 2, 3] }
            expect(get(object, 'items'))
            .toEqual([1, 2, 3])
        });

        test('gets value from object with object property', () => {
            const object = { user: { id: 1, name: 'John' } }
            expect(get(object, 'user'))
            .toEqual({ id: 1, name: 'John' })
        });
    });

    describe('with array paths', () => {
        test('gets value using array path notation', () => {
            const object = { a: { b: { c: 3 } } }
            expect(get(object, ['a', 'b', 'c']))
            .toBe(3)
        });

        test('gets value from array using numeric index in path array', () => {
            const object = { items: [10, 20, 30] }
            expect(get(object, ['items', '1']))
            .toBe(20)
        });

        test('gets nested array value using array path', () => {
            const object = { a: [{ b: [1, 2, 3] }] }
            expect(get(object, ['a', '0', 'b', '2']))
            .toBe(3)
        });
    });

    describe('edge cases', () => {
        test('returns 0 when value is 0', () => {
            const object = { a: 0 }
            expect(get(object, 'a', 'default'))
            .toBe(0)
        });

        test('returns empty string when value is empty string', () => {
            const object = { a: '' }
            expect(get(object, 'a', 'default'))
            .toBe('')
        });

        test('returns false when value is false', () => {
            const object = { a: false }
            expect(get(object, 'a', 'default'))
            .toBe(false)
        });

        test('returns null when value is null', () => {
            const object = { a: null }
            expect(get(object, 'a', 'default'))
            .toBe(null)
        });

        test('handles empty object', () => {
            expect(get({}, 'a.b.c', 'default'))
            .toBe('default')
        });
    });

    describe('documented examples', () => {
        test("get(object, 'a[0].b.c') returns 3", () => {
            const object = { a: [{ b: { c: 3 } }] }
            expect(get(object, 'a[0].b.c'))
            .toBe(3)
        });

        test("get(object, ['a', '0', 'b', 'c']) returns 3", () => {
            const object = { a: [{ b: { c: 3 } }] }
            expect(get(object, ['a', '0', 'b', 'c']))
            .toBe(3)
        });

        test("get(object, 'a.b.c', 'default') returns 'default'", () => {
            const object = { a: [{ b: { c: 3 } }] }
            expect(get(object, 'a.b.c', 'default'))
            .toBe('default')
        });
    });

});
