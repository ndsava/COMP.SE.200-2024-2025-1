import { describe, test, expect } from "vitest";
import defaultTo from "../../src/defaultTo.js";

describe('Function under test - defaultTo()', () => {

    describe('basic functionality', () => {
        test('returns value when value is provided', () => {
            expect(defaultTo(1, 10))
            .toBe(1)
        });

        test('returns defaultValue when value is undefined', () => {
            expect(defaultTo(undefined, 10))
            .toBe(10)
        });

        test('returns defaultValue when value is null', () => {
            expect(defaultTo(null, 10))
            .toBe(10)
        });

        test('returns value when value is 0', () => {
            expect(defaultTo(0, 10))
            .toBe(0)
        });

        test('returns value when value is empty string', () => {
            expect(defaultTo('', 'default'))
            .toBe('')
        });
    });

    describe('with different value types', () => {
        test('returns number value', () => {
            expect(defaultTo(42, 10))
            .toBe(42)
        });

        test('returns string value', () => {
            expect(defaultTo('hello', 'default'))
            .toBe('hello')
        });

        test('returns boolean true', () => {
            expect(defaultTo(true, false))
            .toBe(true)
        });

        test('returns boolean false', () => {
            expect(defaultTo(false, true))
            .toBe(false)
        });

        test('returns object value', () => {
            const obj = { id: 1 }
            expect(defaultTo(obj, {}))
            .toBe(obj)
        });

        test('returns array value', () => {
            const arr = [1, 2, 3]
            expect(defaultTo(arr, []))
            .toBe(arr)
        });
    });

    describe('with different defaultValue types', () => {
        test('returns number as defaultValue', () => {
            expect(defaultTo(null, 42))
            .toBe(42)
        });

        test('returns string as defaultValue', () => {
            expect(defaultTo(undefined, 'default'))
            .toBe('default')
        });

        test('returns object as defaultValue', () => {
            const defaultObj = { id: 1 }
            expect(defaultTo(null, defaultObj))
            .toBe(defaultObj)
        });

        test('returns array as defaultValue', () => {
            const defaultArr = [1, 2, 3]
            expect(defaultTo(undefined, defaultArr))
            .toBe(defaultArr)
        });
    });


    describe('edge cases', () => {
        test('returns defaultValue when value is NaN', () => {
            expect(defaultTo(NaN, 10))
            .toBe(10)
        });

        test('returns value when defaultValue is null', () => {
            expect(defaultTo(5, null))
            .toBe(5)
        });

        test('returns defaultValue when both are null', () => {
            expect(defaultTo(null, null))
            .toBe(null)
        });

        test('returns defaultValue when both are undefined', () => {
            expect(defaultTo(undefined, undefined))
            .toBe(undefined)
        });

        test('handles negative numbers', () => {
            expect(defaultTo(-5, 10))
            .toBe(-5)
        });
    });

    describe('documented examples', () => {
        test('defaultTo(1, 10) returns 1', () => {
            expect(defaultTo(1, 10))
            .toBe(1)
        });

        test('defaultTo(undefined, 10) returns 10', () => {
            expect(defaultTo(undefined, 10))
            .toBe(10)
        });
    });

});
