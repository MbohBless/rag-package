"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format_results_full = exports.format_results = void 0;
var format_results = function (results) {
    var result = results.map(function (result, index) { return "<item index=".concat(index, ">\n<page_content>\n").concat(result, "\n</page_content></item>"); }).join('\n');
    return result;
};
exports.format_results = format_results;
var format_results_full = function (results) {
    return "<search_results>\n".concat((0, exports.format_results)(results), "\n</search_results>");
};
exports.format_results_full = format_results_full;
