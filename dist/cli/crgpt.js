#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var lib_1 = require("../lib");
var config_1 = require("./config");
var init_1 = require("./init");
var program = new commander_1.Command();
program
    .description("Run CRGPT on a pull request")
    .addArgument(new commander_1.Argument("<action>", "Action to perform")
    .choices(["init", "review", "diff", "desc"])
    .default("review", "Code review"))
    .option("-o, --output <output>", "output method")
    .option("-s, --source <source>", "Source branch name")
    .option("-t, --target <target>", "Target branch name")
    .option('-f, --file <file>', 'Single file path')
    .option("-d, --diff-args [diffArgs]", "Git diff arguments")
    .option("-p, --prId [prId]", "Pull request ID")
    .option("-m, --model [model]", "Openai model", "gpt-3.5-turbo")
    .option("-co, --commit [commitId]", "Commit ID")
    .option("-ps, --project-slug [projectSlug]", "Bitbucket project slug")
    .option("-rs, --repo-slug [repoSlug]", "Bitbucket repo slug")
    .option("-at, --ai-token [accessToken]", "Openai Access token")
    .option("-gt, --github-token [accessToken]", "Github Access token")
    .option("-bt, --bitbucket-token [accessToken]", "Bitbucket Access token")
    .option("-c, --config [config]", "Config file path", ".crgpt.yml")
    .action(function (action, options) { return __awaiter(void 0, void 0, void 0, function () {
    var prId, sourceBranch, targetBranch, file, configPath, _a, config, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                prId = options.prId, sourceBranch = options.source, targetBranch = options.target, file = options.file, configPath = options.config;
                _a = action;
                switch (_a) {
                    case "init": return [3 /*break*/, 1];
                    case "review": return [3 /*break*/, 3];
                    case "diff": return [3 /*break*/, 6];
                    case "desc": return [3 /*break*/, 7];
                }
                return [3 /*break*/, 8];
            case 1: return [4 /*yield*/, (0, init_1.initCRGPT)(configPath, options)];
            case 2:
                _b.sent();
                return [3 /*break*/, 9];
            case 3: return [4 /*yield*/, (0, config_1.prepareConfig)(configPath, options)];
            case 4:
                config = _b.sent();
                if (!sourceBranch || !targetBranch) {
                    throw new Error("Please provide source and target branch names");
                }
                return [4 /*yield*/, (0, lib_1.runCRGPTCLI)({ sourceBranch: sourceBranch, targetBranch: targetBranch, file: file, prId: prId }, config)];
            case 5:
                _b.sent();
                return [3 /*break*/, 9];
            case 6: throw new Error("Not implemented");
            case 7: throw new Error("Not implemented");
            case 8: throw new Error("Invalid action");
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _b.sent();
                console.error(error_1);
                process.exit(1);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
program.parse(process.argv);
