"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envUtil_1 = require("./envUtil");
// Use string checks to validate apiKeys
function validateKey(key) {
    return (0, envUtil_1.isNotString)(key) || (0, envUtil_1.isEmptyString)(key);
}
// Get the key and validate
function getApiKey(keyName) {
    var key = (0, envUtil_1.getKey)(keyName);
    if (validateKey(key)) {
        throw new Error("Unable to retrieve key: ".concat(keyName));
    }
    return key;
}
//Allow function to be called from another file and get each key to be used.
function getApiCreds() {
    return {
        PRODUCTION: getApiKey("NODE_ENV"),
        MAIL_API_KEY: getApiKey("MAIL_API_KEY")
    };
}
exports.default = getApiCreds;
