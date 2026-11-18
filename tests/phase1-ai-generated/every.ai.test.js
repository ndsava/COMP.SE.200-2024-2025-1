import { describe, test, expect, vi } from 'vitest'
import every from "../../src/every.js";

describe('every', () => {
  test('returns true when all elements satisfy the predicate', () => {
    const result = every([2, 4, 6], n => n % 2 === 0)

    expect(result).toBe(true)
  })

  test('returns false when at least one element fails the predicate', () => {
    const result = every([2, 4, 5, 6], n => n % 2 === 0)

    expect(result).toBe(false)
  })

  test('returns true for an empty array', () => {
    const result = every([], () => false)

    expect(result).toBe(true)
  })

  test('returns true when array is null', () => {
    const result = every(null, () => true)

    expect(result).toBe(true)
  })

  test('returns true when array is undefined', () => {
    const result = every(undefined, () => true)

    expect(result).toBe(true)
  })

  test('passes value, index and array to predicate', () => {
    const mockPredicate = vi.fn(() => true)
    const array = ['a']

    every(array, mockPredicate)

    expect(mockPredicate).toHaveBeenCalledWith('a', 0, array)
  })

  test('stops iterating after first false result', () => {
    const mockPredicate = vi.fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValue(true)

    const result = every([1, 2, 3], mockPredicate)

    expect(result).toBe(false)
    expect(mockPredicate).toHaveBeenCalledTimes(2)
  })

  test('works with Boolean predicate as shown in documentation', () => {
    const result = every([true, 1, null, 'yes'], Boolean)

    expect(result).toBe(false)
  })

  test('returns false when predicate always returns false', () => {
    const result = every([1, 2, 3], () => false)

    expect(result).toBe(false)
  })

  test('returns true when predicate always returns true', () => {
    const result = every([1, 2, 3], () => true)

    expect(result).toBe(true)
  })
})