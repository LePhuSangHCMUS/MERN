const validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {

    let errors = {};

    //Kiem tra 3 truong can requied trong profile truoc tranh truong hop chua toan dau khaong trang vi ham validator khong chack duoc
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    //=================CHECK MAIL

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    //=================CHECK PASSWORD

    if (!validator.isLength(data.password,{min:6,max:20})) {
        errors.password = 'Password must be between 6 and 30 characters';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}