"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
function getTx(rootDir, txid) {
    return readFileAsync(rootDir + "/" + txid + ".json");
}
exports.getTx = getTx;
function readFileAsync(path) {
    return new Promise(function (res, rej) { return fs_1.default.exists(path, function (exists) { return !exists ? res("null") : fs_1.default.readFile(path, function (err, data) {
        if (err)
            return rej(err);
        if (!data)
            return rej("couldn't read file " + path);
        return res(data.toString());
    }); }); });
}
exports.readFileAsync = readFileAsync;
