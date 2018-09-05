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
        given: `the ${currentMethod} method`,
        should: `return an object with the method '${currentMethod}' and the header 'Content-Type': 'application/json'`,
        actual,
        expected,
      })
    }
  }

  {
    const actual = getOptions(Method.POST, {}).headers
    const expected = { _headers: { 'content-type': ['application/json'] } }

    assert({
      given: 'the post method and an empty object for a header',
      should: `return an object with the header 'Content-Type': 'application/json'`,
      actual,
      expected,
    })
  }

  {
    const token = { token: 'token' }

    const actual = getOptions(Method.POST, token).headers
    const expected = { _headers: { 'content-type': ['application/json'], token: ['token'] } }

    assert({
      given: 'the post method and an object containing a token key/value for a header',
      should: `return an object with the header 'Content-Type': 'application/json' and the token key/value`,
      actual,
      expected,
    })
  }

  {
    const actual = getOptions(Method.POST, {}, {}).body
    const expected: any = undefined

    assert({
      given: 'the post method and an empty object for a body',
      should: 'return undefined for the body',
      actual,
      expected,
    })
  }

  {
    const network = { network: 'mainnet' }

    const actual = getOptions(Method.POST, {}, network).body
    const expected = '{"network":"mainnet"}'

    assert({
      given: 'the post method and a network object for a body',
      should: 'return a body with the network object',
      actual,
      expected,
    })
  }
})
