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
const utils_1 = require("./utils");
riteway_1.describe('StringifySecure', (assert) => __awaiter(this, void 0, void 0, function* () {
    assert({
        given: 'an empty object',
        should: 'return an empty object as a string',
        actual: utils_1.StringifySecure({}),
        expected: '{}',
    });
    assert({
        given: 'an object',
        should: 'return the object as a string',
        actual: utils_1.StringifySecure({ key: 'value', key2: 'value2' }),
        expected: '{"key":"value","key2":"value2"}',
    });
    assert({
        given: 'an object with only undefined values',
        should: 'return an empty object as a string',
        actual: utils_1.StringifySecure({ key: undefined, key2: undefined }),
        expected: '{}',
    });
}));
riteway_1.describe('isEmptyObject', (assert) => __awaiter(this, void 0, void 0, function* () {
    {
        const actual = utils_1.isEmptyObject({});
        const expected = true;
        assert({
            given: 'an empty object',
            should: 'return true',
            actual,
            expected,
        });
    }
    {
        const actual = utils_1.isEmptyObject({ key: 'value' });
        const expected = false;
        assert({
            given: 'an object with one key',
            should: 'return false',
            actual,
            expected,
        });
    }
}));
