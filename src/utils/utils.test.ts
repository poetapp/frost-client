import { describe } from 'riteway'

import { StringifySecure, isEmptyObject } from './utils'

describe('StringifySecure', async (assert: any) => {
  assert({
    given: 'an empty object',
    should: 'return an empty object as a string',
    actual: StringifySecure({}),
    expected: '{}',
  })

  assert({
    given: 'an object',
    should: 'return the object as a string',
    actual: StringifySecure({ key: 'value', key2: 'value2' }),
    expected: '{"key":"value","key2":"value2"}',
  })

  assert({
    given: 'an object with only undefined values',
    should: 'return an empty object as a string',
    actual: StringifySecure({ key: undefined, key2: undefined }),
    expected: '{}',
  })
})

describe('isEmptyObject', async (assert: any) => {
  {
    const actual = isEmptyObject({})
    const expected = true

    assert({
      given: 'an empty object',
      should: 'return true',
      actual,
      expected,
    })
  }

  {
    const actual = isEmptyObject({ key: 'value' })
    const expected = false

    assert({
      given: 'an object with one key',
      should: 'return false',
      actual,
      expected,
    })
  }
})
