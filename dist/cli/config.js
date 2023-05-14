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
exports.prepareConfig = exports.readConfig = exports.fileExists = void 0;
var js_yaml_1 = __importDefault(require("js-yaml"));
var fs_1 = require("fs");
var DEFAULT_PROMPT = "Your task is to act as a code reviewer, and review a pull request by analyze the git diff. You need to summarize the changes made, identify potential issues related to logic and runtime issue, check that is the pull request is good to merge or not.\nInstructions:\n- Review the output of git diff for the pull request \n- Summarize the changes made, and what was added, removed, or modified in a bullet list\n- Please ignore all change related to ui, style, formatting, and comments\n- Identify potential issues related to logic and runtime errors in a bullet list\n- Output as a markdown document, with the following structure:\n{output}\n- The response sentences are no longer than 16 words each\n- Remember to keep the response sentences short, no longer than 16 words each:\n- Keep the response document as short as possible\n- Focus on items mentioned in the following code review checklist:\n{checklist}";
var DEFAULT_SUMMARY = "\n    ## What Changed:\n    - Summarize the changes made in general.\n    - Describe what was added, removed, or modified in a bullet list.\n\n    ## What's Wrong:\n    - Identify any issues or problems in the code.\n    - Point out any potential errors, bugs, or inconsistencies.\n    - Highlight any potential risks or side effects.\n\n    ## What Could be Improved:\n    - Suggest improvements or optimizations that could be made.\n    - Provide feedback on coding style, naming convention, and best practices.\n    - Point out areas where the code could be made more maintainable.\n\n    ## Mergeable: YES/NO or Review Needed ";
var DEFAULT_CHECKLIST = "\n    + Verify adherence to Single Responsibility Principle (SRP) and Don't Repeat Yourself (DRY) principle.\n    + Ensure all error scenarios are covered in the code.\n    + Check for clear and helpful error messages.\n    + Review for graceful error handling.\n    + Verify secure storage of sensitive data and credentials.\n    + Check external libraries and packages are up-to-date.\n    + Ensure protection against common security vulnerabilities.";
var DEFAULT_CONFIG = {
    output: "console",
    openai: {
        endpoint: "https://api.openai.com/v1/chat/completions",
        model: "gpt-3.5-turbo",
        apiKey: "",
    },
    code: {
        gitDiffOArgs: "",
    },
    review: {
        prompt: DEFAULT_PROMPT,
        checklist: DEFAULT_CHECKLIST,
        summary: DEFAULT_SUMMARY,
        ignoreFiles: [],
    },
};
function fileExists(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.stat(filePath)];
                case 1:
                    stats = _a.sent();
                    return [2 /*return*/, stats.isFile()];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fileExists = fileExists;
function readConfig(configFile) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContents, config, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.readFile(configFile, "utf8")];
                case 1:
                    fileContents = _a.sent();
                    config = js_yaml_1.default.load(fileContents);
                    if (!config) {
                        throw new Error("Config file is empty");
                    }
                    return [2 /*return*/, config];
                case 2:
                    error_2 = _a.sent();
                    throw new Error("Error reading config file");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.readConfig = readConfig;
function prepareConfig(configFile, options) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = DEFAULT_CONFIG;
                    return [4 /*yield*/, fileExists(configFile)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, readConfig(configFile)];
                case 2:
                    config = _a.sent();
                    _a.label = 3;
                case 3:
                    if (options.output) {
                        config.output = options.output;
                    }
                    if (options.model) {
                        config.openai = __assign({}, config.openai);
                    }
                    if (options.aiToken) {
                        config.openai.apiKey = options.aiToken;
                    }
                    if (options.bitbucketToken) {
                        config.bitbucket = __assign(__assign({}, config.bitbucket), { accessToken: options.bitbucketToken });
                    }
                    if (options.githubToken) {
                        config.github = __assign(__assign({}, config.github), { accessToken: options.githubToken });
                    }
                    if (options.diffArgs) {
                        config.code = __assign(__assign({}, config.code), { gitDiffOArgs: options.diffArgs });
                    }
                    if (options.projectSlug) {
                        config.code = __assign(__assign({}, config.code), { projectSlug: options.projectSlug });
                    }
                    if (options.repoSlug) {
                        config.code = __assign(__assign({}, config.code), { repoSlug: options.repoSlug });
                    }
                    if (options.githubToken) {
                        config.github = __assign(__assign({}, config.github), { accessToken: options.githubToken });
                    }
                    return [2 /*return*/, config];
            }
        });
    });
}
exports.prepareConfig = prepareConfig;
