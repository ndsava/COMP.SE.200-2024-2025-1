import { describe, test, expect } from "vitest";
import toNumber from "../../src/toNumber.js";

describe('Function under test - toNumber()', () => {

    describe('with number values', () => {
        test('returns number as is', () => {
            expect(toNumber(3.2))
            .toBe(3.2)
        });

        test('returns integer as is', () => {
            expect(toNumber(42))
            .toBe(42)
        });

        test('returns zero', () => {
            expect(toNumber(0))
            .toBe(0)
        });

        test('returns negative number', () => {
            expect(toNumber(-5.5))
            .toBe(-5.5)
        });

        test('returns Infinity', () => {
            expect(toNumber(Infinity))
            .toBe(Infinity)
        });

        test('returns negative Infinity', () => {
            expect(toNumber(-Infinity))
            .toBe(-Infinity)
        });

        test('returns NaN', () => {
            expect(Number.isNaN(toNumber(NaN)))
            .toBe(true)
        });

        test('returns Number.MIN_VALUE', () => {
            expect(toNumber(Number.MIN_VALUE))
            .toBe(Number.MIN_VALUE)
        });

        test('returns Number.MAX_VALUE', () => {
            expect(toNumber(Number.MAX_VALUE))
            .toBe(Number.MAX_VALUE)
        });
    });

    describe('with string values', () => {
        test('converts numeric string to number', () => {
            expect(toNumber('3.2'))
            .toBe(3.2)
        });

        test('converts integer string to number', () => {
            expect(toNumber('42'))
            .toBe(42)
        });

        test('converts negative string to number', () => {
            expect(toNumber('-5.5'))
            .toBe(-5.5)
        });

        test('converts string with leading whitespace', () => {
            expect(toNumber('  42  '))
            .toBe(42)
        });

        test('converts string with tabs and newlines', () => {
            expect(toNumber('\t42\n'))
            .toBe(42)
        });

        test('returns NaN for non-numeric string', () => {
            expect(Number.isNaN(toNumber('abc')))
            .toBe(true)
        });

        test('converts empty string to 0', () => {
            expect(toNumber('')).toBe(0)
        });


        test('converts binary string', () => {
            expect(toNumber('0b1010'))
            .toBe(10)
        });

        test('converts octal string', () => {
            expect(toNumber('0o10'))
            .toBe(8)
        });

        test('returns NaN for bad hex string', () => {
            expect(Number.isNaN(toNumber('-0x1a')))
            .toBe(true)
        });

        test('converts positive hex string', () => {
            expect(toNumber('0x1a'))
            .toBe(26)
        });

        test('converts string with scientific notation', () => {
            expect(toNumber('1e3'))
            .toBe(1000)
        });
    });

    describe('with symbol values', () => {
        test('returns NaN for symbol', () => {
            expect(Number.isNaN(toNumber(Symbol('test'))))
            .toBe(true)
        });
    });

    describe('with object values', () => {
        test('converts object with valueOf method', () => {
            const obj = {
                valueOf: () => 42
            }
            expect(toNumber(obj))
            .toBe(42)
        });

        test('converts object with toString method', () => {
            const obj = {
                toString: () => '3.2'
            }
            expect(toNumber(obj))
            .toBe(3.2)
        });

        test('converts object with both valueOf and toString', () => {
            const obj = {
                valueOf: () => 42,
                toString: () => '3.2'
            }
            expect(toNumber(obj))
            .toBe(42)
        });

        test('returns NaN for object without numeric conversion', () => {
            expect(Number.isNaN(toNumber({})))
            .toBe(true)
        });

        test('converts Date object', () => {
            const date = new Date('2024-01-01')
            expect(toNumber(date))
            .toBe(date.getTime())
        });
    });

    describe('with boolean values', () => {
        test('converts true to 1', () => {
            expect(toNumber(true))
            .toBe(1)
        });

        test('converts false to 0', () => {
            expect(toNumber(false))
            .toBe(0)
        });
    });

    describe('with null and undefined', () => {
        test('converts null to 0', () => {
            expect(toNumber(null))
            .toBe(0)
        });

        test('returns NaN for undefined', () => {
            expect(Number.isNaN(toNumber(undefined)))
            .toBe(true)
        });
    });

    describe('with array values', () => {
        test('converts single element array to number', () => {
            expect(toNumber([42]))
            .toBe(42)
        });

        test('converts single string element array', () => {
            expect(toNumber(['3.2']))
            .toBe(3.2)
        });
        
        test('converts empty array to 0', () => {
            expect(toNumber([])).toBe(0)
        });

        test('returns NaN for multi-element array', () => {
            expect(Number.isNaN(toNumber([1, 2, 3])))
            .toBe(true)
        });
    });

    describe('edge cases', () => {
        test('converts string with only whitespace to 0', () => {
            expect(toNumber('   ')).toBe(0)
        });

        test('handles very large number string', () => {
            expect(toNumber('999999999999999999999'))
            .toBe(999999999999999999999)
        });

        test('handles very small number string', () => {
            expect(toNumber('0.000000001'))
            .toBe(0.000000001)
        });

        test('handles string with plus sign', () => {
            expect(toNumber('+42'))
            .toBe(42)
        });

        test('handles string with minus sign', () => {
            expect(toNumber('-42'))
            .toBe(-42)
        });
    });

    describe('documented examples', () => {
        test('toNumber(3.2) returns 3.2', () => {
            expect(toNumber(3.2))
            .toBe(3.2)
        });

        test('toNumber(Number.MIN_VALUE) returns 5e-324', () => {
            expect(toNumber(Number.MIN_VALUE))
            .toBe(5e-324)
        });

        test('toNumber(Infinity) returns Infinity', () => {
            expect(toNumber(Infinity))
            .toBe(Infinity)
        });

        test("toNumber('3.2') returns 3.2", () => {
            expect(toNumber('3.2'))
            .toBe(3.2)
        });
    });

});
