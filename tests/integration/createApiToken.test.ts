import * as nock from 'nock'
import { describe } from 'riteway'
import { Frost } from '../../src/Frost'
import { Path, Network } from '../../src/utils/utils'

describe('Frost createApiToken()', async (should: any) => {
  const { assert } = should('')
  const host = 'https://api.frost.po.et'

  const config = {
    email: 'test@test.com',
    password: 'test',
    timeout: 0,
    host,
  }

  {
    const serverResponse = { apiToken: '1' }
    const token = 'test'

    // TODO: we have to do it with the real network, no mock
    nock(host)
      .post(Path.TOKENS)
      .reply(200, serverResponse)

    const frost = new Frost(config)

    const actual = await frost.createApiToken(token)
    const expected = serverResponse

    assert({
      given: 'a status code of 200',
      should: 'return an object with the expected apiToken',
      actual,
      expected,
    })
  }

  {
    const serverResponse = { apiToken: '1' }
    const token = 'test'
    let requestBody = {}

    nock(host)
      .post(Path.TOKENS, (body: {}) => {
        requestBody = body
        return body
      })
      .reply(200, serverResponse)

    const frost = new Frost(config)
    await frost.createApiToken(token)

    const actual = requestBody
    const expected = {}

    assert({
      given: 'a request without a network property',
      should: 'return an empty object for the request body',
      actual,
      expected,
    })
  }

  {
    const serverResponse = { apiToken: '1' }
    const token = 'test'
    let requestBody = {}

    nock(host)
      .post(Path.TOKENS, (body: {}) => {
        requestBody = body
        return body
      })
      .reply(200, serverResponse)

    const frost = new Frost(config)
    await frost.createApiToken(token, Network.MAINNET)

    const actual = requestBody
    const expected = { network: Network.MAINNET }

    assert({
      given: `a request with the ${Network.MAINNET} network property`,
      should: `return an object with { network: '${Network.MAINNET}' } for the request body`,
      actual,
      expected,
    })
  }

  {
    const token = 'test'

    nock(host)
      .post(Path.TOKENS)
      .reply(500)

    const frost = new Frost(config)

    let actual = ''
    const expected = 'string'

    try {
      await frost.createApiToken(token)
    } catch (e) {
      actual = typeof e
    }

    assert({
      given: 'a status code of 500',
      should: `return a string`,
      actual,
      expected,
    })
  }
})
