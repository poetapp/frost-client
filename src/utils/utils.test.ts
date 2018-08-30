import { describe } from 'riteway'

import { StringifySecure, isEmptyObject } from './utils'

describe('StringifySecure', async (should: any) => {
  const { assert } = should()
  assert({
    given: 'empty object',
    should: 'return empty object in string',
    actual: StringifySecure({}),
    expected: '{}',
  })

  assert({
    given: 'object',
    should: 'return object as a string',
    actual: StringifySecure({ key: 'value', key2: 'value2' }),
    expected: '{"key":"value","key2":"value2"}',
  })

  assert({
    given: 'object with undefined values',
    should: 'return empty object as a string',
    actual: StringifySecure({ key: undefined, key2: undefined }),
    expected: '{}',
  })
})

describe('isEmptyObject', async (should: any) => {
  const { assert } = should()

  {
    const actual = isEmptyObject({})
    const expected = true

    assert({
      given: 'empty object',
      should: 'return true',
      actual,
      expected,
    })
  }

  {
    const actual = isEmptyObject({ key: 'value' })
    const expected = false

    assert({
      given: 'object with one key',
      should: 'return false',
      actual,
      expected,
    })
  }
})
