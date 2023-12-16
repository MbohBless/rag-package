"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CustomError(message) {
    var _status = 500;
    var error = new Error(message);
    error.status = function (code) {
        _status = Number(code) || 500;
        return this;
    };
    Object.defineProperty(error, 'statusCode', { get: function () { return _status; } });
    return error;
}
exports.default = CustomError;
