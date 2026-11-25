import { describe, test, expect, vi } from "vitest";
import reduce from "../../src/reduce.js";

describe('Function under test - reduce()', () => {

    describe('basic functionality with arrays', () => {
        test('reduces array to sum with initial accumulator', () => {
            expect(reduce([1, 2], (sum, n) => sum + n, 0))
            .toBe(3)
        });

        test('reduces array to sum without initial accumulator', () => {
            expect(reduce([1, 2, 3], (sum, n) => sum + n))
            .toBe(6)
        });

        test('reduces array to product', () => {
            expect(reduce([1, 2, 3, 4], (product, n) => product * n, 1))
            .toBe(24)
        });

        test('reduces array to concatenated string', () => {
            expect(reduce(['a', 'b', 'c'], (str, char) => str + char, ''))
            .toBe('abc')
        });
    });

    describe('basic functionality with objects', () => {
        test('reduces object to grouped values by key', () => {
            const result = reduce({ a: 1, b: 2, c: 1 }, (result, value, key) => {
                (result[value] || (result[value] = [])).push(key)
                return result
            }, {})
            expect(result).toEqual({ 1: ['a', 'c'], 2: ['b'] })
        });

        test('reduces object to sum of values', () => {
            expect(reduce({ a: 1, b: 2, c: 3 }, (sum, value) => sum + value, 0))
            .toBe(6)
        });

        test('reduces object to count of properties', () => {
            expect(reduce({ a: 1, b: 2, c: 3 }, (count) => count + 1, 0))
            .toBe(3)
        });
    });

    describe('iteratee arguments', () => {
        test('passes accumulator, value, index, and array to iteratee', () => {
            const iteratee = vi.fn((acc, val, idx, arr) => acc + val)
            reduce([1, 2, 3], iteratee, 0)
            
            expect(iteratee).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3])
            expect(iteratee).toHaveBeenCalledWith(1, 2, 1, [1, 2, 3])
            expect(iteratee).toHaveBeenCalledWith(3, 3, 2, [1, 2, 3])
        });

        test('passes accumulator, value, key, and object to iteratee for objects', () => {
            const iteratee = vi.fn((acc, val, key) => {
                acc[key] = val
                return acc
            })
            reduce({ a: 1, b: 2 }, iteratee, {})
            
            expect(iteratee).toHaveBeenCalled()
            expect(iteratee.mock.calls[0][1]).toBe(1)
            expect(iteratee.mock.calls[0][2]).toBe('a')
        });
    });

    describe('with initial accumulator', () => {
        test('uses provided initial accumulator value', () => {
            expect(reduce([1, 2, 3], (sum, n) => sum + n, 10))
            .toBe(16)
        });

        test('uses initial accumulator as empty array', () => {
            const result = reduce([1, 2, 3], (arr, n) => {
                arr.push(n * 2)
                return arr
            }, [])
            expect(result).toEqual([2, 4, 6])
        });

        test('uses initial accumulator as empty object', () => {
            const result = reduce([1, 2, 3], (obj, n, idx) => {
                obj[idx] = n
                return obj
            }, {})
            expect(result).toEqual({ 0: 1, 1: 2, 2: 3 })
        });
    });

    describe('without initial accumulator', () => {
        test('uses first element as initial accumulator for array', () => {
            expect(reduce([1, 2, 3], (sum, n) => sum + n))
            .toBe(6)
        });

        test('uses first value as initial accumulator for object', () => {
            const result = reduce({ a: 1, b: 2, c: 3 }, (sum, value) => sum + value)
            expect(result).toBe(6)
        });

        test('returns single element when array has one element', () => {
            expect(reduce([5], (sum, n) => sum + n))
            .toBe(5)
        });
    });

    describe('with different data types', () => {
        test('reduces array of strings', () => {
            expect(reduce(['hello', ' ', 'world'], (str, word) => str + word, ''))
            .toBe('hello world')
        });

        test('reduces array of objects', () => {
            const users = [
                { name: 'Alice', age: 25 },
                { name: 'Bob', age: 30 },
                { name: 'Charlie', age: 35 }
            ]
            const result = reduce(users, (sum, user) => sum + user.age, 0)
            expect(result).toBe(90)
        });

        test('reduces array of mixed types', () => {
            expect(reduce([1, '2', 3], (acc, val) => acc + String(val), ''))
            .toBe('123')
        });
    });

    describe('edge cases', () => {
        test('handles empty array with initial accumulator', () => {
            expect(reduce([], (sum, n) => sum + n, 0))
            .toBe(0)
        });

        test('handles empty object with initial accumulator', () => {
            expect(reduce({}, (sum, value) => sum + value, 0))
            .toBe(0)
        });

        test('handles single element array without initial accumulator', () => {
            expect(reduce([42], (sum, n) => sum + n))
            .toBe(42)
        });

        test('handles array with null values', () => {
            expect(reduce([1, null, 3], (sum, n) => sum + (n || 0), 0))
            .toBe(4)
        });

        test('handles array with undefined values', () => {
            expect(reduce([1, undefined, 3], (sum, n) => sum + (n || 0), 0))
            .toBe(4)
        });
    });

    describe('complex transformations', () => {
        test('builds object from array', () => {
            const result = reduce([1, 2, 3], (obj, n) => {
                obj[`key${n}`] = n * 10
                return obj
            }, {})
            expect(result).toEqual({ key1: 10, key2: 20, key3: 30 })
        });

        test('flattens nested array', () => {
            const result = reduce([[1, 2], [3, 4], [5]], (flat, arr) => {
                return flat.concat(arr)
            }, [])
            expect(result).toEqual([1, 2, 3, 4, 5])
        });

        test('groups array elements by predicate', () => {
            const result = reduce([1, 2, 3, 4, 5], (groups, n) => {
                const key = n % 2 === 0 ? 'even' : 'odd'
                groups[key].push(n)
                return groups
            }, { even: [], odd: [] })
            expect(result).toEqual({ even: [2, 4], odd: [1, 3, 5] })
        });
    });

    describe('documented examples', () => {
        test('reduce([1, 2], (sum, n) => sum + n, 0) returns 3', () => {
            expect(reduce([1, 2], (sum, n) => sum + n, 0))
            .toBe(3)
        });

        test("reduce({ 'a': 1, 'b': 2, 'c': 1 }, ...) groups by value", () => {
            const result = reduce({ a: 1, b: 2, c: 1 }, (result, value, key) => {
                (result[value] || (result[value] = [])).push(key)
                return result
            }, {})
            expect(result).toEqual({ 1: ['a', 'c'], 2: ['b'] })
        });
    });

});
