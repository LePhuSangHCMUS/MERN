const validator = require('validator');
const isEmpty = require('./is-empty')


module.exports = function validateEducationInput(data) {
    let errors = {};
    //KIem tra trong hay khong voi nhung truong requied
    //Kiem tra 3 truong can requied trong Expriend truoc tranh truong hop chua toan dau khaong trang vi ham validator khong chack duoc
    data.school = isEmpty(data.school) ? '' : data.school;
    data.degree = isEmpty(data.degree) ? '' : data.degree;
    data.fieldofstudy = isEmpty(data.fieldofstudy) ? '' : data.fieldofstudy;
    data.from = isEmpty(data.from) ? '' : data.from;
    //=============CHECK SCHOOL
    if (validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }
    //Check Degree
    if (validator.isEmpty(data.degree)) {
        errors.degree = ' Degree  field is required';
    }
    //Check Fields Of Study
    if (validator.isEmpty(data.from)) {
        errors.from = 'From field is required';

    }
    //Check Fields Of Study
    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Fieldofstudy field is required';

    }


    //Dung Object literal
    return {
        errors,
        isValid: isEmpty(errors)
    }
}