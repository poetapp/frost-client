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
const riteway_1 = require("riteway");
const Frost_1 = require("./Frost");
const utils_1 = require("./utils/utils");
riteway_1.describe('Frost getOptions()', (assert) => __awaiter(this, void 0, void 0, function* () {
    for (const method of Object.keys(utils_1.Method)) {
        const currentMethod = utils_1.Method[method];
        {
            const actual = Frost_1.getOptions(currentMethod);
            const expected = {
                method: currentMethod,
                headers: { _headers: { 'content-type': ['application/json'] } },
            };
            assert({
                given: `the ${currentMethod} method`,
                should: `return an object with the method '${currentMethod}' and the header 'Content-Type': 'application/json'`,
                actual,
                expected,
            });
        }
    }
    {
        const actual = Frost_1.getOptions(utils_1.Method.POST, {}).headers;
        const expected = { _headers: { 'content-type': ['application/json'] } };
        assert({
            given: 'the post method and an empty object for a header',
            should: `return an object with the header 'Content-Type': 'application/json'`,
            actual,
            expected,
        });
    }
    {
        const token = { token: 'token' };
        const actual = Frost_1.getOptions(utils_1.Method.POST, token).headers;
        const expected = {
            _headers: { 'content-type': ['application/json'], token: ['token'] },
        };
        assert({
            given: 'the post method and an object containing a token key/value for a header',
            should: `return an object with the header 'Content-Type': 'application/json' and the token key/value`,
            actual,
            expected,
        });
    }
    {
        const actual = Frost_1.getOptions(utils_1.Method.POST, {}, {}).body;
        const expected = undefined;
        assert({
            given: 'the post method and an empty object for a body',
            should: 'return undefined for the body',
            actual,
            expected,
        });
    }
    {
        const network = { network: 'mainnet' };
        const actual = Frost_1.getOptions(utils_1.Method.POST, {}, network).body;
        const expected = '{"network":"mainnet"}';
        assert({
            given: 'the post method and a network object for a body',
            should: 'return a body with the network object',
            actual,
            expected,
        });
    }
}));
