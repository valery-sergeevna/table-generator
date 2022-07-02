export const generateKey = (value) => {
    return `${ value }_${ new Date().getTime() }`;
}