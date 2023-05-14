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
exports.getCurrentCommitId = exports.generateContentDiff = exports.generateDiffs = void 0;
var child_process_1 = require("child_process");
function generateDiffs(sourceBranch, targetBranch, 
// file: string,
config) {
    return __awaiter(this, void 0, void 0, function () {
        var command, ignoreFiles, stdout, files, reviewableFiles, diffs, _i, reviewableFiles_1, file, diff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    command = "/usr/bin/git diff ".concat(sourceBranch, "..").concat(targetBranch, " --name-only");
                    ignoreFiles = config.review.ignoreFiles || [];
                    return [4 /*yield*/, execAsync(command)];
                case 1:
                    stdout = _a.sent();
                    files = stdout.trim().split("\n");
                    reviewableFiles = selectReviewableFiles(files, ignoreFiles);
                    diffs = [];
                    _i = 0, reviewableFiles_1 = reviewableFiles;
                    _a.label = 2;
                case 2:
                    if (!(_i < reviewableFiles_1.length)) return [3 /*break*/, 5];
                    file = reviewableFiles_1[_i];
                    return [4 /*yield*/, generateContentDiff(sourceBranch, targetBranch, file, config)];
                case 3:
                    diff = _a.sent();
                    diffs.push({ file: file, diff: diff });
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, diffs];
            }
        });
    });
}
exports.generateDiffs = generateDiffs;
function generateContentDiff(sourceBranch, targetBranch, file, config) {
    return __awaiter(this, void 0, void 0, function () {
        var diffArgs, command, stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    diffArgs = config.code.gitDiffOArgs || "";
                    command = "/usr/bin/git diff ".concat(diffArgs, " ").concat(targetBranch, "..").concat(sourceBranch, " -- \"").concat(file, "\"");
                    return [4 /*yield*/, execAsync(command)];
                case 1:
                    stdout = _a.sent();
                    return [2 /*return*/, stdout];
            }
        });
    });
}
exports.generateContentDiff = generateContentDiff;
function selectReviewableFiles(files, ignoreFiles) {
    return files.filter(function (file) {
        if (ignoreFiles.includes(file)) {
            return false;
        }
        // Add more conditions if required.
        return true;
    });
}
function execAsync(command) {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(command, function (error, stdout, stderr) {
            if (error) {
                reject(new Error("Error: ".concat(error.message)));
            }
            else if (stderr) {
                reject(new Error("Stderr: ".concat(stderr)));
            }
            else {
                resolve(stdout);
            }
        });
    });
}
function getCurrentCommitId() {
    return execAsync("/usr/bin/git rev-parse HEAD");
}
exports.getCurrentCommitId = getCurrentCommitId;
