/**
 * 工具类的全局函数定义
 */
/* excel导出功能 url地址，pa参数 */
let downloadFile = function (that, url, pa, name) {
    that.$http({
        method: 'post',
        url: url,
        responseType: 'blob',
        data: pa
    }).then(res => {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'}, name);
        let objectUrl = URL.createObjectURL(blob);
        window.location.href = objectUrl;
    });
};
export default {
    downloadFile
};
