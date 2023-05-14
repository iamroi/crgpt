"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStringTemplate = void 0;
function indexProp(obj, is, value) {
    if (typeof is == "string")
        is = is.split(".");
    if (is.length == 1 && value !== undefined)
        return (obj[is[0]] = value);
    else if (is.length == 0)
        return obj;
    else
        return indexProp(obj[is[0]], is.slice(1), value);
}
function parseStringTemplate(str, obj) {
    return str.replace(/\$\{.+?\}/g, function (match) {
        return indexProp(obj, match);
    });
}
exports.parseStringTemplate = parseStringTemplate;
