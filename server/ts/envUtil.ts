// If we get an argument of a type A. check that the same type argument is returned and not null
function isNull(arg:any) { return arg === null; }

// If we get an argument of a type A. check that the same type argument is returned and not undefined
function isUndefined(arg:any) { return typeof arg === "undefined"; }

// If we get an argument of a type A. Use isNull, isUndefined for value check
function isNullOrUndefined(arg:any) {
    return isNull(arg) || isUndefined(arg);
}

// If we get an argument of a type A. check that the same type argument is returned and is a string
function isString(arg:any) { return typeof arg === "string"; }

// If we get an argument of a type A. check that the same type argument is returned and not a string
function isNotString(arg:any) { return !isString(arg); }

// If we get an argument of a type A. check that the same type argument is returned and is not an empty string
function isEmptyString(arg:any) {
    return ((isNullOrUndefined(arg)) || (isString(arg) && arg === ""));
}

// If we get an argument of a type string. check that the same type argument is returned; a string, or null
function getKey(keyName:any) { return process.env[keyName] || null; }


export {isNotString, isEmptyString, getKey}