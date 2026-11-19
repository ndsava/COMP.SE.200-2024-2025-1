import { describe, test, expect } from "vitest";
import toString from "../../src/toString.js";

describe('Function under test - toString()', () => {

    describe('with string values', () => {
        test('returns string as is', () => {
            expect(toString('hello'))
            .toBe('hello')
        });

        test('returns empty string', () => {
            expect(toString(''))
            .toBe('')
        });

        test('returns string with whitespace', () => {
            expect(toString('  hello world  '))
            .toBe('  hello world  ')
        });

        test('returns string with special characters', () => {
            expect(toString('!@#$%^&*()'))
            .toBe('!@#$%^&*()')
        });

        test('returns numeric string', () => {
            expect(toString('123'))
            .toBe('123')
        });
    });

    describe('with number values', () => {
        test('converts number to string', () => {
            expect(toString(42))
            .toBe('42')
        });

        test('converts decimal number to string', () => {
            expect(toString(3.14))
            .toBe('3.14')
        });

        test('converts zero to string', () => {
            expect(toString(0))
            .toBe('0')
        });

        test('converts negative number to string', () => {
            expect(toString(-42))
            .toBe('-42')
        });

        test('preserves sign of negative zero', () => {
            expect(toString(-0))
            .toBe('-0')
        });

        test('converts Infinity to string', () => {
            expect(toString(Infinity))
            .toBe('Infinity')
        });

        test('converts negative Infinity to string', () => {
            expect(toString(-Infinity))
            .toBe('-Infinity')
        });

        test('converts NaN to string', () => {
            expect(toString(NaN))
            .toBe('NaN')
        });

        test('converts scientific notation to string', () => {
            expect(toString(1e3))
            .toBe('1000')
        });
    });

    describe('with null and undefined', () => {
        test('returns empty string for null', () => {
            expect(toString(null))
            .toBe('')
        });

        test('returns empty string for undefined', () => {
            expect(toString(undefined))
            .toBe('')
        });
    });

    describe('with boolean values', () => {
        test('converts true to string', () => {
            expect(toString(true))
            .toBe('true')
        });

        test('converts false to string', () => {
            expect(toString(false))
            .toBe('false')
        });
    });

    describe('with array values', () => {
        test('converts array to comma-separated string', () => {
            expect(toString([1, 2, 3]))
            .toBe('1,2,3')
        });

        test('converts array with strings', () => {
            expect(toString(['a', 'b', 'c']))
            .toBe('a,b,c')
        });

        test('converts empty array to empty string', () => {
            expect(toString([]))
            .toBe('')
        });

        test('converts array with null values', () => {
            expect(toString([1, null, 3]))
            .toBe('1,,3')
        });

        test('converts array with undefined values', () => {
            expect(toString([1, undefined, 3]))
            .toBe('1,,3')
        });

        test('converts nested array', () => {
            expect(toString([1, [2, 3], 4]))
            .toBe('1,2,3,4')
        });

        test('converts array with mixed types', () => {
            expect(toString([1, 'two', true, null]))
            .toBe('1,two,true,')
        });

        test('converts array with objects', () => {
            const result = toString([{ id: 1 }, { id: 2 }])
            expect(result).toContain('[object Object]')
        });

        test('converts deeply nested array', () => {
            expect(toString([1, [2, [3, [4]]]]))
            .toBe('1,2,3,4')
        });
    });

    describe('with object values', () => {
        test('converts object to string', () => {
            const result = toString({ a: 1 })
            expect(result).toBe('[object Object]')
        });

        test('converts empty object to string', () => {
            const result = toString({})
            expect(result).toBe('[object Object]')
        });

        test('converts object with toString method', () => {
            const obj = {
                toString: () => 'custom'
            }
            expect(toString(obj))
            .toBe('custom')
        });

        test('converts Date object', () => {
            const date = new Date('2024-01-01T00:00:00Z')
            expect(toString(date))
            .toBe(date.toString())
        });

        test('converts RegExp object', () => {
            const regex = /test/gi
            expect(toString(regex))
            .toBe('/test/gi')
        });
    });

    describe('with symbol values', () => {
        test('converts symbol to string', () => {
            const sym = Symbol('test')
            expect(toString(sym))
            .toBe('Symbol(test)')
        });

        test('converts symbol without description', () => {
            const sym = Symbol()
            expect(toString(sym))
            .toBe('Symbol()')
        });
    });

    describe('edge cases', () => {
        test('handles very large number', () => {
            expect(toString(999999999999999999999))
            .toBe('999999999999999999999')
        });

        test('handles very small number', () => {
            expect(toString(0.000000001))
            .toBe('0.000000001')
        });

        test('handles array with negative zero', () => {
            expect(toString([-0]))
            .toBe('-0')
        });

        test('handles array with Infinity', () => {
            expect(toString([Infinity, -Infinity]))
            .toBe('Infinity,-Infinity')
        });

        test('handles array with NaN', () => {
            expect(toString([NaN]))
            .toBe('NaN')
        });
    });

    describe('documented examples', () => {
        test('toString(null) returns empty string', () => {
            expect(toString(null))
            .toBe('')
        });

        test('toString(-0) returns "-0"', () => {
            expect(toString(-0))
            .toBe('-0')
        });

        test("toString([1, 2, 3]) returns '1,2,3'", () => {
            expect(toString([1, 2, 3]))
            .toBe('1,2,3')
        });
    });

});
