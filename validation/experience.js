const validator = require('validator');
const isEmpty = require('./is-empty')


module.exports = function validateExperienceInput(data) {
    let errors = {};
    //KIem tra trong hay khong voi nhung truong requied
    //Kiem tra 3 truong can requied trong Expriend truoc tranh truong hop chua toan dau khaong trang vi ham validator khong chack duoc
    data.title = isEmpty(data.title) ? '' : data.title;
    data.company = isEmpty(data.company) ? '' : data.company;
    data.from = isEmpty(data.from) ? '' : data.from;
    //=============CHECK TITLE
    if (!validator.isLength(data.title, { min: 4, max: 30 })) {
        errors.title = 'Title must be between 4 and 30 characters';
    }
    if (validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }
    //Check Company
    if (validator.isEmpty(data.company)) {
        errors.company = ' Company  field is required';
    }
    //Check from
    if (validator.isEmpty(data.from)) {
        errors.from = 'From field is required';

    }
    //Chua Check la ngay hay khog
    // if(validator.isDa)



    //Dung Object literal
    return {
        errors,
        isValid: isEmpty(errors)
    }
}