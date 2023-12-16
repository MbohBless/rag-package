"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorStore = exports.Searcher = exports.Tool = exports.SearchResults = exports.Embedder = exports.HybridEmbeddings = exports.SparseEmbeddingData = exports.Embedding = void 0;
var formatters_1 = require("../utils/formatters");
var Embedding = /** @class */ (function () {
    function Embedding(embedding, text) {
        this.embedding = embedding;
        this.text = text;
    }
    return Embedding;
}());
exports.Embedding = Embedding;
var SparseEmbeddingData = /** @class */ (function () {
    function SparseEmbeddingData(indices, values, max_index) {
        this.indices = indices;
        this.values = values;
        this.max_index = max_index;
    }
    return SparseEmbeddingData;
}());
exports.SparseEmbeddingData = SparseEmbeddingData;
var HybridEmbeddings = /** @class */ (function (_super) {
    __extends(HybridEmbeddings, _super);
    function HybridEmbeddings(embedding, text, sparse_embedding) {
        var _this = _super.call(this, embedding, text) || this;
        _this.sparse_embedding = sparse_embedding;
        return _this;
    }
    return HybridEmbeddings;
}(Embedding));
exports.HybridEmbeddings = HybridEmbeddings;
var Embedder = /** @class */ (function () {
    function Embedder(dim) {
        this.dim = dim;
    }
    return Embedder;
}());
exports.Embedder = Embedder;
var SearchResults = /** @class */ (function () {
    function SearchResults(content) {
        this.content = content;
    }
    return SearchResults;
}());
exports.SearchResults = SearchResults;
var Tool = /** @class */ (function () {
    function Tool(name) {
        this.name = name;
    }
    return Tool;
}());
exports.Tool = Tool;
var Searcher = /** @class */ (function (_super) {
    __extends(Searcher, _super);
    function Searcher(name, tool_description) {
        var _this = _super.call(this, name) || this;
        _this.tool_description = tool_description;
        return _this;
    }
    Searcher.prototype.search = function (text, limit) {
        var raw_search_results = this.raw_search(text, limit);
        var processed_search_results = this.process_raw_search_results(raw_search_results);
        var displayable = (0, formatters_1.format_results_full)(processed_search_results);
        return displayable;
    };
    return Searcher;
}(Tool));
exports.Searcher = Searcher;
var VectorStore = /** @class */ (function () {
    function VectorStore() {
    }
    return VectorStore;
}());
exports.VectorStore = VectorStore;
//
