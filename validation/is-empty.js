module.exports = function isEmpty(value) {
    return (value === undefined ||
        typeof value==='undefined'||
         value === null ||
         //chuoi rong hoac toan chua khoang trang
         (typeof value==='string' && value.trim().length===0))||
         //doi tuong rong khong chua key
         (typeof value==='object' && Object.keys(value).length===0)
}
