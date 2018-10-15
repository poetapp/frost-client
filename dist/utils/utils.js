"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serialize = require("serialize-javascript");
var Path;
(function (Path) {
    Path["HOST"] = "http://localhost:3000";
    Path["ACCOUNTS"] = "/accounts";
    Path["ACCOUNTS_VERIFY"] = "/accounts/verify";
    Path["ACCOUNTS_VERIFY_TOKEN"] = "/accounts/verify/:token";
    Path["LOGIN"] = "/login";
    Path["PASSWORD_RESET"] = "/password/reset";
    Path["PASSWORD_CHANGE"] = "/password/change";
    Path["PASSWORD_CHANGE_TOKEN"] = "/password/change/token";
    Path["WORKS"] = "/works";
    Path["TOKENS"] = "/tokens";
    Path["TOKENS_TOKENID"] = "/tokens/:tokenId";
    Path["ACCOUNTS_PROFILE"] = "/accounts/profile";
})(Path = exports.Path || (exports.Path = {}));
var Method;
(function (Method) {
    Method["POST"] = "post";
    Method["GET"] = "get";
    Method["PUT"] = "put";
    Method["DEL"] = "delete";
    Method["ALL"] = "all";
})(Method = exports.Method || (exports.Method = {}));
var Network;
(function (Network) {
    Network["LIVE"] = "live";
    Network["TEST"] = "test";
})(Network = exports.Network || (exports.Network = {}));
exports.StringifySecure = (data) => serialize(data, { isJSON: true });
exports.isEmptyObject = (o) => Object.keys(o).length === 0;
