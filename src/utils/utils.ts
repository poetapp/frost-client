export enum Path {
  HOST = 'http://localhost:3000',
  ACCOUNTS = '/accounts',
  ACCOUNTS_VERIFY = '/accounts/verify',
  ACCOUNTS_VERIFY_TOKEN = '/accounts/verify/:token',
  LOGIN = '/login',
  PASSWORD_RESET = '/password/reset',
  PASSWORD_CHANGE = '/password/change',
  PASSWORD_CHANGE_TOKEN = '/password/change/token',
  WORKS = '/works',
  TOKENS = '/tokens',
  TOKENS_TOKENID = '/tokens/:tokenId',
  ACCOUNTS_PROFILE = '/accounts/profile'
}

export enum Method {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DEL = 'delete',
  ALL = 'all'
}
