import { isNotString, isEmptyString, getKey } from './envUtil.js';
// Use string checks to validate apiKeys
function validateKey(key) {
    return isNotString(key) || isEmptyString(key);
}
// Get the key and validate
function getApiKey(keyName) {
    const key = getKey(keyName);
    if (validateKey(key)) {
        throw new Error(`Unable to retrieve key: ${keyName}`);
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
export default getApiCreds;
//# sourceMappingURL=apiUtil.js.map