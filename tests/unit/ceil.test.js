import { describe, test, expect } from "vitest";
import ceil from "../../src/ceil.js";

describe('Function under test - ceil()', () => {

    describe('basic functionality', () => {
        test('rounds up decimal to nearest integer', () => {
            expect(ceil(4.006))
            .toBe(5)
        });

        test('returns same number when already integer', () => {
            expect(ceil(5))
            .toBe(5)
        });

        test('handles zero correctly', () => {
            expect(ceil(0))
            .toBe(0)
        });
    });

    describe('precision parameter', () => {
        test('rounds up to specified decimal precision', () => {
            expect(ceil(6.004, 2))
            .toBe(6.01)
        });

        test('rounds up to one decimal place', () => {
            expect(ceil(6.123, 1))
            .toBe(6.2)
        });

        test('rounds up to nearest ten with negative precision', () => {
            expect(ceil(1234, -1))
            .toBe(1240)
        });

        test('rounds up to nearest hundred with negative precision', () => {
            expect(ceil(6040, -2))
            .toBe(6100)
        });

        test('rounds up to nearest thousand with negative precision', () => {
            expect(ceil(1234, -3))
            .toBe(2000)
        });
    });

    describe('negative numbers', () => {
        test('rounds up negative decimals correctly', () => {
            expect(ceil(-4.006))
            .toBe(-4)
        });

        test('rounds up negative numbers with decimal precision', () => {
            expect(ceil(-6.004, 2))
            .toBe(-6.00)
        });

        test('rounds up negative numbers with negative precision', () => {
            expect(ceil(-1234, -2))
            .toBe(-1200)
        });
    });

    describe('edge cases', () => {
        test('handles very small positive numbers', () => {
            expect(ceil(0.001))
            .toBe(1)
        });

        test('handles very large numbers', () => {
            expect(ceil(999999.1))
            .toBe(1000000)
        });

        test('handles numbers with many decimal places', () => {
            expect(ceil(1.123456789, 5))
            .toBe(1.12346)
        });
    });

    describe('documented examples', () => {
        test('ceil(4.006) returns 5', () => {
            expect(ceil(4.006))
            .toBe(5)
        });

        test('ceil(6.004, 2) returns 6.01', () => {
            expect(ceil(6.004, 2))
            .toBe(6.01)
        });

        test('ceil(6040, -2) returns 6100', () => {
            expect(ceil(6040, -2))
            .toBe(6100)
        });
    });

});
