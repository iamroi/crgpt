"use strict";
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
exports.runCRGPTCLI = exports.runCRGPT = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var bitbucket_1 = require("./bitbucket");
var github_1 = require("./github");
var markdown_1 = require("./markdown");
var stdout_1 = require("./stdout");
var git_1 = require("./git");
function postDiffToEndpoint(diffData, config) {
    return __awaiter(this, void 0, void 0, function () {
        var endpointUrl, apiKey, promptTml, checklist, summary, prompt, response, data, choices, message, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!config.openai) {
                        throw new Error('Error: OpenAI config not found');
                    }
                    endpointUrl = config.openai.endpoint;
                    apiKey = config.openai.apiKey;
                    promptTml = config.review.prompt;
                    checklist = config.review.checklist;
                    summary = config.review.summary;
                    prompt = promptTml.replace('{checklist}', checklist).replace('{output}', summary);
                    return [4 /*yield*/, (0, node_fetch_1.default)(endpointUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(apiKey),
                            },
                            body: JSON.stringify({
                                model: config.openai.model || 'gpt-3.5-turbo',
                                messages: [
                                    {
                                        role: 'system',
                                        content: prompt,
                                    },
                                    {
                                        role: 'user',
                                        content: diffData,
                                    },
                                ],
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error posting diff to endpoint: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    choices = data.choices;
                    message = choices[0].message;
                    content = message.content;
                    return [2 /*return*/, content];
            }
        });
    });
}
function processDiffs(diffData, config, prId) {
    return __awaiter(this, void 0, void 0, function () {
        var results, _i, diffData_1, _a, file, diff, review, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    results = [];
                    _i = 0, diffData_1 = diffData;
                    _b.label = 1;
                case 1:
                    if (!(_i < diffData_1.length)) return [3 /*break*/, 7];
                    _a = diffData_1[_i], file = _a.file, diff = _a.diff;
                    console.log("Processing file: ".concat(file));
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, processDiff(diff, config)];
                case 3:
                    review = _b.sent();
                    results.push({ file: file, review: review });
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.error("Failed to process file ".concat(file, ": ").concat(error_1));
                    results.push({ file: file, review: "Couldn't process review ".concat(error_1) });
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/, results];
            }
        });
    });
}
function processDiff(diff, config) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, postDiffToEndpoint(diff, config)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_2 = _a.sent();
                    throw new Error("Failed to post diff to endpoint: ".concat(error_2));
                case 3: return [2 /*return*/];
            }
        });
    });
}
function summarizeCRContent(results, config) {
    return __awaiter(this, void 0, void 0, function () {
        var header, fileSummaries, content;
        return __generator(this, function (_a) {
            header = '# Code Review Summary:';
            fileSummaries = results
                .map(function (_a) {
                var file = _a.file, review = _a.review;
                return "### ".concat(file, "\n  \n").concat(review);
            })
                .join('\n\n');
            content = "".concat(header, "\n\n").concat(fileSummaries);
            return [2 /*return*/, {
                    title: 'Code Review Summary',
                    content: content,
                    summary: '',
                    reviews: results,
                }];
        });
    });
}
function runCRGPT(options, config) {
    return __awaiter(this, void 0, void 0, function () {
        var sourceBranch, targetBranch, file, prId, diffData, diff, results, commentContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sourceBranch = options.sourceBranch, targetBranch = options.targetBranch, file = options.file, prId = options.prId;
                    console.log("Source Branch: ".concat(sourceBranch));
                    console.log("Target Branch: ".concat(targetBranch));
                    if (!sourceBranch || !targetBranch) {
                        throw new Error('Error: Please provide sourceBranch, targetBranch as command line arguments.');
                    }
                    if (!file) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, git_1.generateContentDiff)(sourceBranch, targetBranch, file, config)];
                case 1:
                    diff = _a.sent();
                    diffData = [{ file: file, diff: diff }];
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, git_1.generateDiffs)(sourceBranch, targetBranch, config)];
                case 3:
                    diffData = _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, processDiffs(diffData, config, prId)];
                case 5:
                    results = _a.sent();
                    return [4 /*yield*/, summarizeCRContent(results, config)];
                case 6:
                    commentContent = _a.sent();
                    return [2 /*return*/, commentContent];
            }
        });
    });
}
exports.runCRGPT = runCRGPT;
function runCRGPTCLI(options, config) {
    return __awaiter(this, void 0, void 0, function () {
        var prId, commentContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prId = options.prId;
                    return [4 /*yield*/, runCRGPT(options, config)];
                case 1:
                    commentContent = _a.sent();
                    if (!(config.output == 'bitbucket' && config.bitbucket && prId)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, bitbucket_1.postCommentToBitbucketPR)(commentContent, config, prId)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 3:
                    if (!(config.output == 'github' && config.github && prId)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, github_1.postCommentToGithubPR)(commentContent, config, prId)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 5:
                    if (!(config.output == 'file' && config.file)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, markdown_1.writeCodeReviewToFile)(commentContent, config)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    (0, stdout_1.printCodeReviewToConsole)(commentContent);
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.runCRGPTCLI = runCRGPTCLI;
