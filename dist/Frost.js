"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const utils_1 = require("./utils/utils");
exports.getOptions = (method, headers = {}, body) => (Object.assign({ method, headers: new Headers(Object.assign({ 'Content-Type': 'application/json' }, headers)) }, (body && !utils_1.isEmptyObject(body) ? { body: utils_1.StringifySecure(body) } : {})));
class Frost {
    constructor(config) {
        this.email = config.email;
        this.password = config.password;
        this.host = config.host;
        this.timeout = config.timeout || 10;
    }
    timeoutPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject('That last request took too long. Please try again in a few seconds.'), 1000 * this.timeout);
        });
    }
    create(email, password) {
        const options = {
            method: utils_1.Method.POST,
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: utils_1.StringifySecure({
                email: email || this.email,
                password: password || this.password,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.ACCOUNTS}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    login(email, password) {
        if (!this.host)
            throw new Error('Should set the host url');
        const options = {
            method: utils_1.Method.POST,
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: utils_1.StringifySecure({
                email: email || this.email,
                password: password || this.password,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.LOGIN}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    sendEmailVerifyAccount(token) {
        const options = {
            method: utils_1.Method.POST,
            headers: new Headers({
                'Content-Type': 'application/json',
                token,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.ACCOUNTS_VERIFY}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.text();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    verifyAccount(token) {
        const options = {
            method: utils_1.Method.GET,
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.ACCOUNTS_VERIFY}/${token}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    sendEmailForgotPassword(email) {
        const options = {
            method: utils_1.Method.POST,
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: utils_1.StringifySecure({
                email: email || this.email,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.PASSWORD_RESET}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.text();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    changePassword(token, password, oldPassword) {
        const options = {
            method: utils_1.Method.POST,
            headers: new Headers({
                'Content-Type': 'application/json',
                token,
            }),
            body: utils_1.StringifySecure({
                password,
                oldPassword,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.PASSWORD_CHANGE}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.text();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    changePasswordWithToken(token, password) {
        const options = {
            method: utils_1.Method.POST,
            headers: new Headers({
                'Content-Type': 'application/json',
                token,
            }),
            body: utils_1.StringifySecure({
                password,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.PASSWORD_CHANGE_TOKEN}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    createWork(token, work) {
        const options = {
            method: utils_1.Method.POST,
            headers: new Headers({
                'Content-Type': 'application/json',
                token,
            }),
            body: utils_1.StringifySecure(work),
        };
        const request = fetch(`${this.host}${utils_1.Path.WORKS}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    getWork(token, workId) {
        const options = {
            method: utils_1.Method.GET,
            headers: new Headers({
                'Content-Type': 'application/json',
                token,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.WORKS}/${workId}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    getWorks(token) {
        const options = {
            method: utils_1.Method.GET,
            headers: new Headers({
                'Content-Type': 'application/json',
                token,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.WORKS}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    getApiTokens(token) {
        const options = {
            method: utils_1.Method.GET,
            headers: new Headers({
                'Content-Type': 'application/json',
                token,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.TOKENS}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
    removeApiToken(token, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: utils_1.Method.DEL,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    token,
                }),
            };
            const request = fetch(`${this.host}${utils_1.Path.TOKENS}/${tokenId}`, options);
            const response = yield Promise.race([request, this.timeoutPromise()]);
            if (response.ok)
                return yield response.text();
            throw yield response.text();
        });
    }
    createApiToken(token, network) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = exports.getOptions(utils_1.Method.POST, { token }, { network });
            const request = fetch(`${this.host}${utils_1.Path.TOKENS}`, options);
            const response = yield Promise.race([request, this.timeoutPromise()]);
            if (response.ok)
                return yield response.json();
            throw yield response.text();
        });
    }
    getProfile(token) {
        const options = {
            method: utils_1.Method.GET,
            headers: new Headers({
                'Content-Type': 'application/json',
                token,
            }),
        };
        const request = fetch(`${this.host}${utils_1.Path.ACCOUNTS_PROFILE}`, options);
        return Promise.race([request, this.timeoutPromise()])
            .then((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.ok)
                return yield value.json();
            throw yield value.text();
        }))
            .catch(e => {
            throw e;
        });
    }
}
exports.Frost = Frost;
