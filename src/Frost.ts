import fetch from 'node-fetch'
import { Path, Method } from './utils/utils'

export interface Configuration {
  readonly host: string
  readonly email?: string
  readonly password?: string
}

export interface WorkAttributes {
  readonly name: string
  readonly datePublished: string
  readonly dateCreated: string
  readonly author: string
  readonly tags: string
  readonly content: string
}

export class Frost {
  private email: string
  private password: string
  private host: string
  private token: string

  constructor(config: Configuration) {
    this.email = config.email
    this.password = config.password
    this.host = config.host
    this.token = ''
  }

  async create(
    email?: string,
    password?: string
  ): Promise<{ token: string } | string> {
    try {
      const options = {
        method: Method.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email || this.email,
          password: password || this.password
        })
      }

      const response = await fetch(`${this.host}${Path.ACCOUNT}`, options)

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async login(email?: string, password?: string): Promise<object | string> {
    try {
      if (!this.host) throw new Error('Should set the host url')

      const options = {
        method: Method.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email || this.email,
          password: password || this.password
        })
      }

      const response = await fetch(`${this.host}${Path.LOGIN}`, options)

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async verify(link: string): Promise<string> {
    try {
      const options = {
        method: Method.GET,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(link, options)

      if (response.ok) return response.text()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async forgotPassword(email?: string): Promise<string> {
    try {
      const options = {
        method: Method.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email
        })
      }

      const response = await fetch(
        `${this.host}${Path.PASSWORD_RESET}`,
        options
      )

      if (response.ok) return response.text()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async changePassword(token: string, password: string): Promise<string> {
    try {
      const options = {
        method: Method.POST,
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify({
          password
        })
      }

      const response = await fetch(
        `${this.host}${Path.PASSWORD_CHANGE}`,
        options
      )

      if (response.ok) return response.text()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async work(
    token: string,
    work: WorkAttributes
  ): Promise<WorkAttributes | string> {
    try {
      const options = {
        method: Method.POST,
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify(work)
      }

      const response = await fetch(`${this.host}${Path.WORK}`, options)

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  async getWork(
    token: string,
    workId: string
  ): Promise<WorkAttributes | string> {
    try {
      const options = {
        method: Method.POST,
        headers: {
          'Content-Type': 'application/json',
          token
        }
      }

      const response = await fetch(
        `${this.host}${Path.WORK}/${workId}`,
        options
      )

      if (response.ok) return response.json()

      throw await response.text()
    } catch (e) {
      throw e
    }
  }

  getToken() {
    return this.token
  }
}
