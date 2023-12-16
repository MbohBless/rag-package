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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_client_1 = __importDefault(require("../../utils/axios-client"));
var types_1 = require("../types");
var logger_1 = __importDefault(require("../../utils/logger"));
var custom_error_1 = __importDefault(require("../../utils/custom-error"));
// create  the embedder 
var HuggingFaceEmbedder = /** @class */ (function (_super) {
    __extends(HuggingFaceEmbedder, _super);
    function HuggingFaceEmbedder(api_key, model_name) {
        var _this = _super.call(this, -1) || this;
        _this.model_name = model_name;
        _this.base_url = "https://api-inference.huggingface.co/models/".concat(model_name);
        _this.headers = { 'Authorization': "Bearer ".concat(api_key) };
        _this.config_url = "https://huggingface.co/".concat(_this.model_name, "/resolve/main/config.json");
        var configClient = (0, axios_client_1.default)(_this.config_url, {});
        logger_1.default.info("Fetching config from ".concat(_this.config_url));
        configClient.get(_this.config_url).then(function (response) {
            _this.dim = response.data['hidden_size'];
            logger_1.default.info("Config fetched from ".concat(_this.config_url, " with dim ").concat(_this.dim));
        }).catch(function (error) {
            logger_1.default.error("Error fetching config from ".concat(_this.config_url));
            logger_1.default.error(error);
            throw (0, custom_error_1.default)(error.message).status(error.statusCode || 500);
        });
        return _this;
    }
    HuggingFaceEmbedder.prototype.embed = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var embedded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.embed_batch([text])];
                    case 1:
                        embedded = _a.sent();
                        return [2 /*return*/, embedded[0]];
                }
            });
        });
    };
    HuggingFaceEmbedder.prototype.embed_batch = function (texts) {
        return __awaiter(this, void 0, void 0, function () {
            var client, data, response, embeddings, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = (0, axios_client_1.default)(this.base_url, this.headers);
                        data = { inputs: texts };
                        logger_1.default.info("Sending data to ".concat(this.base_url));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.post(this.base_url, data)];
                    case 2:
                        response = _a.sent();
                        logger_1.default.info("Data sent to ".concat(this.base_url));
                        embeddings = response.data;
                        if (!Array.isArray(embeddings)) {
                            throw (0, custom_error_1.default)("Embeddings are not of the format list").status(500);
                        }
                        if (embeddings.length !== texts.length) {
                            throw (0, custom_error_1.default)("Embeddings length does not match input length").status(500);
                        }
                        return [2 /*return*/, embeddings.map(function (embedding, index) {
                                return new types_1.Embedding(embedding, texts[index]);
                            })];
                    case 3:
                        error_1 = _a.sent();
                        logger_1.default.error("Error sending data to ".concat(this.base_url));
                        logger_1.default.error(error_1);
                        throw (0, custom_error_1.default)("There was an error working with the data").status(500);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // display all the parameters 
    HuggingFaceEmbedder.prototype.display = function () {
        return {
            model_name: this.model_name,
            base_url: this.base_url,
            headers: this.headers,
            config_url: this.config_url,
            dim: this.dim
        };
    };
    return HuggingFaceEmbedder;
}(types_1.Embedder));
exports.default = HuggingFaceEmbedder;
