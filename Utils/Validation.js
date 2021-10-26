class Validation {
    static isNumber(value) {
        return /^\d+$/.test(value);
    }

    static isEmpty(value) {
        return (typeof value === 'string' && !value.trim())
            || typeof value === 'undefined'
            || value === null;
    }
}
