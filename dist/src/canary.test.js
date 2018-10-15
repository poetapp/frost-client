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
const canSing = (gas) => !gas;
riteway_1.describe('canary canSing()', (should) => __awaiter(this, void 0, void 0, function* () {
    const { assert } = should('');
    {
        const gasPresent = false;
        assert({
            given: 'no gas in the coal mine',
            should: 'sing',
            actual: canSing(gasPresent),
            expected: true,
        });
    }
    {
        const gasPresent = true;
        assert({
            given: 'gas in the coal mine',
            should: 'not sing',
            actual: canSing(gasPresent),
            expected: false,
        });
    }
}));
