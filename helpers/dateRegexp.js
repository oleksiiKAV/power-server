
const dateRegexp = /^([0-2]\d|3[01])-(0[1-9]|1[0-2])-(20[0-9]{2})$/;
// const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
// const passwordRegexp = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;
const emailRegexp = /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegexp = /^(?=(?:.*[a-zA-Z]){6})(?=.*\d).*$/


module.exports = {
    dateRegexp,
    emailRegexp,
    passwordRegexp
};
