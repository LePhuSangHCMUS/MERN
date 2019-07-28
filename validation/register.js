const validator = require('validator');
const isEmpty = require('./is-empty')


module.exports = function validateRegisterInput(data) {
    let errors = {};
    //Ham validator khong check duoc toan khoang trang nen phai dung isEmpty
    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.password2 = isEmpty(data.password2) ? '' : data.password2;
    //=============CHECK NAME
    //Neu name va password co do dai it hon 6 hoac lon hon 20
    if (!validator.isLength(data.name, { min: 4, max: 20 })) {
        errors.name = 'Name must be between 4 and 30 characters';
    }
    //Ham nay chi check Empty khong check duoc toan khoang trang
        //Khong chi chua chu va so
        if (!validator.isAlphanumeric(data.name)) {
            errors.name = 'Name is contain letter and number';
    
        }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    //===============================================================
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
    //Check Pass Trung Nhau
    if(!validator.equals(data.password,data.password2)){
        errors.password2 = 'Password required is same';

    }
    //Dung Object literal
    return {
        errors,
        isValid: isEmpty(errors)
    }
}