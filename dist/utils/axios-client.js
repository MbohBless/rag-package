"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var axios_retry_1 = __importDefault(require("axios-retry"));
var createAxiosClient = function (baseURL, headers) {
    if (headers === void 0) { headers = {}; }
    var client = axios_1.default.create({
        baseURL: baseURL,
        headers: __assign({}, headers),
    });
    (0, axios_retry_1.default)(client, { retries: 3 });
    return client;
};
exports.default = createAxiosClient;
