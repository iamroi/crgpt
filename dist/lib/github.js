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
exports.postCommentToGithubPRFile = exports.postCommentToGithubPR = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var strings_1 = require("../utils/strings");
var git_1 = require("./git");
function postCommentToGithubPR(result, config, prId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, repoSlug, projectSlug, _b, endpoint, accessToken, apiEndpoint, apiUrl, commitId, _i, _c, fileReview;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!config.github) {
                        throw new Error("GitHub configuration is not provided");
                    }
                    _a = config.code, repoSlug = _a.repoSlug, projectSlug = _a.projectSlug;
                    _b = config.github, endpoint = _b.endpoint, accessToken = _b.accessToken;
                    if (!accessToken) {
                        throw new Error("GitHub access token is not provided");
                    }
                    apiEndpoint = endpoint ||
                        "https://api.github.com/repos/${projectSlug}/${repoSlug}/pulls/${prId}/comments";
                    apiUrl = (0, strings_1.parseStringTemplate)(apiEndpoint, { projectSlug: projectSlug, repoSlug: repoSlug, prId: prId });
                    return [4 /*yield*/, (0, git_1.getCurrentCommitId)()];
                case 1:
                    commitId = _d.sent();
                    _i = 0, _c = result.reviews;
                    _d.label = 2;
                case 2:
                    if (!(_i < _c.length)) return [3 /*break*/, 5];
                    fileReview = _c[_i];
                    return [4 /*yield*/, postCommentToGithubPRFile(fileReview, apiUrl, commitId, accessToken)];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log("Posted ".concat(result.reviews.length, " comments to GitHub PR"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.postCommentToGithubPR = postCommentToGithubPR;
function postCommentToGithubPRFile(fileReview, apiUrl, commitId, accessToken) {
    return __awaiter(this, void 0, void 0, function () {
        var bodyData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bodyData = {
                        body: fileReview.review,
                        commit_id: commitId,
                        path: fileReview.file,
                    };
                    return [4 /*yield*/, (0, node_fetch_1.default)(apiUrl, {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(accessToken),
                                Accept: "application/vnd.github.v3+json",
                                "Content-Type": "application/json",
                                "X-GitHub-Api-Version": "2022-11-28",
                            },
                            body: JSON.stringify(bodyData),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error posting comment to GitHub PR: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.postCommentToGithubPRFile = postCommentToGithubPRFile;
