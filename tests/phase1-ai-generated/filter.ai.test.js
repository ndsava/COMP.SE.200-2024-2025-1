import { describe, test, expect, vi } from 'vitest'
import filter from '../../src/filter.js';

describe('filter', () => {
  test('returns elements that satisfy the predicate', () => {
    const result = filter([1, 2, 3, 4], n => n % 2 === 0)

    expect(result).toEqual([2, 4])
  })

  test('returns empty array when no elements satisfy the predicate', () => {
    const result = filter([1, 3, 5], n => n % 2 === 0)

    expect(result).toEqual([])
  })

  test('returns all elements when predicate always returns true', () => {
    const result = filter([1, 2, 3], () => true)

    expect(result).toEqual([1, 2, 3])
  })

  test('returns empty array when predicate always returns false', () => {
    const result = filter([1, 2, 3], () => false)

    expect(result).toEqual([])
  })

  test('returns empty array for an empty input array', () => {
    const result = filter([], () => true)

    expect(result).toEqual([])
  })

  test('returns empty array when array is null', () => {
    const result = filter(null, () => true)

    expect(result).toEqual([])
  })

  test('returns empty array when array is undefined', () => {
    const result = filter(undefined, () => true)

    expect(result).toEqual([])
  })

  test('passes value, index and array to predicate', () => {
    const mockPredicate = vi.fn(() => true)
    const array = ['a']

    filter(array, mockPredicate)

    expect(mockPredicate).toHaveBeenCalledWith('a', 0, array)
  })

  test('calls predicate once for each element', () => {
    const mockPredicate = vi.fn(() => true)

    filter([1, 2, 3, 4], mockPredicate)

    expect(mockPredicate).toHaveBeenCalledTimes(4)
  })

  test('supports filtering objects', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false }
    ]

    const result = filter(users, user => user.active)

    expect(result).toEqual([
      { user: 'barney', active: true }
    ])
  })

  test('does not modify the original array', () => {
    const original = [1, 2, 3, 4]

    filter(original, n => n > 2)

    expect(original).toEqual([1, 2, 3, 4])
  })

  test('returns a new array instance', () => {
    const original = [1, 2, 3]

    const result = filter(original, () => true)

    expect(result).not.toBe(original)
  })
})