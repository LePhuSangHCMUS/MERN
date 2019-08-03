const validator = require('validator');
const isEmpty = require('./is-empty')


module.exports = function validateProfileInput(data) {
    console.log('DataNe',data)
    let errors = {};
    //Kiem tra 3 truong can requied trong profile truoc tranh truong hop chua toan dau khaong trang vi ham validator khong chack duoc
    data.handle = isEmpty(data.handle) ? '' : data.handle;
    data.status = isEmpty(data.status) ? '' : data.status;
    data.skills = isEmpty(data.skills) ? '' : data.skills;
    //=============CHECK Hadle==NAME
    if (!validator.isLength(data.handle, { min: 4, max: 20 })) {
        errors.handle = 'Handle must be between 4 and 30 characters';
    }
    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Handle field is required';
    }
    //Check status- skills
    if (validator.isEmpty(data.skills)) {
        errors.skills = 'Skilss field is required';
    }
    if (validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';

    }
    //===============================================================
    //Nhung Cai khac co the khong can nen ta chie kiem tra tinh howp le url cua website hay khong thoi
    //Check facebook-youtube-instagram-twitter-gihub
    //Neu khong de trong ma nhap gi thif kiem tra
    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Not a valid URL'
        }
    }
    if (!isEmpty(data.social.youtube)) {
        if (!validator.isURL(data.social.youtube)) {
            errors.youtube = 'Not a valid URL'
        }
    }
    if (!isEmpty(data.social.facebook)) {
        if (!validator.isURL(data.social.facebook)) {
            errors.facebook = 'Not a valid URL'
        }
    }
    if(!isEmpty(data.social.twitter)){
        if(!validator.isURL(data.social.twitter)){
            errors.twitter='Not a valid URL'
        }
    }
    if(!isEmpty(data.social.linkedin)){
        if(!validator.isURL(data.social.linkedin)){
            errors.linkedin='Not a valid URL'
        }
    }
    if(!isEmpty(data.social.instagram)){
        if(!validator.isURL(data.social.instagram)){
            errors.instagram='Not a valid URL'
        }
    }



    //Dung Object literal
    return {
        errors,
        isValid: isEmpty(errors)
    }
}