import * as fetch from 'isomorphic-fetch'
import { Path, Method, Network, StringifySecure, isEmptyObject } from './utils/utils'

export interface Configuration {
  readonly host: string
  readonly email?: string
  readonly password?: string
  readonly timeout?: number
}

export interface ClaimAttributes {
  readonly [key: string]: string
}

export interface WorkAttributes extends ClaimAttributes {
  readonly name: string
  readonly datePublished: string
  readonly dateCreated: string
  readonly author: string
  readonly tags?: string
  readonly text: string
}

export const getOptions = (method: Method, headers = {}, body?: object): RequestInit => ({
  method,
  headers: new Headers({
    'Content-Type': 'application/json',
    ...headers,
  }),
  ...(body && !isEmptyObject(body) ? { body: StringifySecure(body) } : {}),
})

export class Frost {
  private readonly email: string
  private readonly password: string
  private readonly host: string
  private readonly timeout: number

  constructor(config: Configuration) {
    this.email = config.email
    this.password = config.password
    this.host = config.host
    this.timeout = config.timeout || 10
  }

  timeoutPromise(): Promise<Response> {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => reject('That last request took too long. Please try again in a few seconds.'),
        1000 * this.timeout,
      )
    })
  }

  create(email?: string, password?: string): Promise<{ readonly token: string }> {
    const options = {
      method: Method.POST,
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: StringifySecure({
        email: email || this.email,
        password: password || this.password,
      }),
    }

    const request = fetch(`${this.host}${Path.ACCOUNTS}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  login(email?: string, password?: string): Promise<{ readonly token: string }> {
    if (!this.host) throw new Error('Should set the host url')

    const options = {
      method: Method.POST,
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: StringifySecure({
        email: email || this.email,
        password: password || this.password,
      }),
    }

    const request = fetch(`${this.host}${Path.LOGIN}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  sendEmailVerifyAccount(token: string): Promise<string> {
    const options = {
      method: Method.POST,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
    }

    const request = fetch(`${this.host}${Path.ACCOUNTS_VERIFY}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.text()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  verifyAccount(token: string): Promise<{ readonly token: string }> {
    const options = {
      method: Method.GET,
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }

    const request = fetch(`${this.host}${Path.ACCOUNTS_VERIFY}/${token}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  sendEmailForgotPassword(email?: string): Promise<string> {
    const options = {
      method: Method.POST,
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: StringifySecure({
        email: email || this.email,
      }),
    }

    const request = fetch(`${this.host}${Path.PASSWORD_RESET}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.text()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  changePassword(token: string, password: string, oldPassword: string): Promise<string> {
    const options = {
      method: Method.POST,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
      body: StringifySecure({
        password,
        oldPassword,
      }),
    }

    const request = fetch(`${this.host}${Path.PASSWORD_CHANGE}`, options)
    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.text()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  changePasswordWithToken(token: string, password: string): Promise<{ readonly token: string }> {
    const options = {
      method: Method.POST,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
      body: StringifySecure({
        password,
      }),
    }

    const request = fetch(`${this.host}${Path.PASSWORD_CHANGE_TOKEN}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  createWork(token: string, work: WorkAttributes): Promise<{ readonly workId: string }> {
    const options = {
      method: Method.POST,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
      body: StringifySecure(work),
    }

    const request = fetch(`${this.host}${Path.WORKS}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  getWork(token: string, workId: string): Promise<WorkAttributes> {
    const options = {
      method: Method.GET,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
    }

    const request = fetch(`${this.host}${Path.WORKS}/${workId}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  getWorks(token: string): Promise<ReadonlyArray<WorkAttributes>> {
    const options = {
      method: Method.GET,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
    }

    const request = fetch(`${this.host}${Path.WORKS}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  getApiTokens(token: string): Promise<{ readonly apiTokens: ReadonlyArray<string> }> {
    const options = {
      method: Method.GET,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
    }

    const request = fetch(`${this.host}${Path.TOKENS}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  async removeApiToken(token: string, tokenId: string): Promise<string> {
    const options = {
      method: Method.DEL,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
    }

    const request = fetch(`${this.host}${Path.TOKENS}/${tokenId}`, options)

    const response = await Promise.race([request, this.timeoutPromise()])
    if (response.ok) return response.text()
    throw await response.text()
  }

  async createApiToken(token: string, network?: Network): Promise<{ readonly apiToken: string }> {
    const options = getOptions(Method.POST, { token }, { network })
    const request = fetch(`${this.host}${Path.TOKENS}`, options)

    const response = await Promise.race([request, this.timeoutPromise()])
    if (response.ok) return response.json()
    throw await response.text()
  }

  getProfile(token: string): Promise<{ readonly createdAt: number; readonly verified: boolean }> {
    const options = {
      method: Method.GET,
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
    }

    const request = fetch(`${this.host}${Path.ACCOUNTS_PROFILE}`, options)

    return Promise.race([request, this.timeoutPromise()])
      .then(async (value: any) => {
        if (value.ok) return value.json()

        throw await value.text()
      })
      .catch(e => {
        throw e
      })
  }

  async postArchive(token: string, file: any) {
    const options = {
      method: Method.POST,
      headers: new Headers({
        token,
      }),
      body: file,
    }

    const result = await fetch(`${this.host}${Path.ARCHIVES}`, options)

    if (!result.ok)
      throw await result.text()

    return result.json()
  }

}
