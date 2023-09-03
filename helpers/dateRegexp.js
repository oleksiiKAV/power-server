
const dateRegexp = /^([0-2]\d|3[01])-(0[1-9]|1[0-2])-(20[0-9]{2})$/;
const emailRegexp = /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegexp = /^[a-zA-Z0-9]{6}[a-zA-Z0-9]*$/


module.exports = {
    dateRegexp,
    emailRegexp,
    passwordRegexp
};
