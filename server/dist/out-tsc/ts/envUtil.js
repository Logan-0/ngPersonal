// If we get an argument of a type A. check that the same type argument is returned and not null
function isNull(arg) { return arg === null; }
// If we get an argument of a type A. check that the same type argument is returned and not undefined
function isUndefined(arg) { return typeof arg === "undefined"; }
// If we get an argument of a type A. Use isNull, isUndefined for value check
function isNullOrUndefined(arg) {
    return isNull(arg) || isUndefined(arg);
}
// If we get an argument of a type A. check that the same type argument is returned and is a string
function isString(arg) { return typeof arg === "string"; }
// If we get an argument of a type A. check that the same type argument is returned and not a string
function isNotString(arg) { return !isString(arg); }
// If we get an argument of a type A. check that the same type argument is returned and is not an empty string
function isEmptyString(arg) {
    return ((isNullOrUndefined(arg)) || (isString(arg) && arg === ""));
}
// If we get an argument of a type string. check that the same type argument is returned; a string, or null
function getKey(keyName) { return process.env[keyName] || null; }
export { isNotString, isEmptyString, getKey };
//# sourceMappingURL=envUtil.js.map