import { describe } from 'riteway'
import { getOptions } from './Frost'
import { Method } from './utils/utils'

describe('Frost getOptions()', async (should: any) => {
  const { assert } = should('')

  for (const method of Object.keys(Method)) {
    const currentMethod = (Method as any)[method]
    {
      const actual = getOptions(currentMethod)
      const expected = {
        method: currentMethod,
        headers: { _headers: { 'content-type': ['application/json'] } },
      }

      assert({
        given: `getOptions with the method ${currentMethod}`,
        should: `return with the method: '${currentMethod}' and the header with 'Content-Type': 'application/json'`,
        actual,
        expected,
      })
    }
  }

  {
    const actual = getOptions(Method.POST, {}).headers
    const expected = { _headers: { 'content-type': ['application/json'] } }

    assert({
      given: 'getOptions with an object empty header',
      should: `return the header with 'Content-Type': 'application/json'`,
      actual,
      expected,
    })
  }

  {
    const token = { token: 'token' }

    const actual = getOptions(Method.POST, token).headers
    const expected = { _headers: { 'content-type': ['application/json'], token: ['token'] } }

    assert({
      given: 'getOptions with an object empty header',
      should: `return the header with 'Content-Type': 'application/json' and the object token`,
      actual,
      expected,
    })
  }

  {
    const actual = getOptions(Method.POST, {}, {}).body
    const expected: any = undefined

    assert({
      given: 'getOptions with an object empty body',
      should: 'be body undefined',
      actual,
      expected,
    })
  }

  {
    const network = { network: 'mainnet' }

    const actual = getOptions(Method.POST, {}, network).body
    const expected = '{"network":"mainnet"}'

    assert({
      given: 'getOptions with object network in the body',
      should: 'return body with the objet network',
      actual,
      expected,
    })
  }
})
