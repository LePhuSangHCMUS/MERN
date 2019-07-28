const validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateCommentInput(data) {

    let errors = {};

    //Kiem tra 3 truong can requied trong profile truoc tranh truong hop chua toan dau khaong trang vi ham validator khong chack duoc
    data.text = isEmpty(data.text) ? '' : data.text;

    if (!validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Text must be between 10 and 300 characters';

    }
    if (validator.isEmpty(data.text)) {
        errors.text = 'Text field is required'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}