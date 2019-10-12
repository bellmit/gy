/**
 * 工具类的全局函数定义
 */
/* excel导出功能 url地址，data参数 msg 提示信息 */
let downloadFile = function (that, url, data, fileName, msg = '没有文件可下载') {
    that.$http.post(url, data, {responseType: 'blob', timeout: 60000}).then(res => {
        if (res.data.size > 0) {
            var blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                navigator.msSaveBlob(blob, fileName);
            } else {
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            }
            return;
        }
        that.$message.error(msg);
    });
};
// 手机号验证
const verifyMobile = function (value) {
    if (!(/^1[3456789]\d{9}$/.test(value))) {
        return false;
    } else {
        return true;
    }
};

// 身份证号验证
const verifyIdCard = function (code) {
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code))) {
        return false;
    } else {
        return true;
    }
};

const numToCash = function (value, num = 2) {
    // 返回处理后的值
    value = parseFloat(value);
    if (value === null || value === undefined || value === '' || value === 0 || value === !NaN || !value) {
        value = 0;
        return value.toFixed(num);
    } else {
        value = value.toFixed(num);
        let end = value.split('.')[1];
        let start = value.split('.')[0];
        let arr = [];

        start = start.split('').reverse();
        start.map(function (elem, index) {
            arr.push(elem);
            if (index % 3 === 2 && index !== value.length - 1 && index !== start.length - 1) {
                arr.push(',');
            }
        });

        start = arr.reverse().join('');
        if (!num) {
            return start;
        }
        return start + '.' + end;
    }
};
// 文件上传时专用，根据文件路径或名称获取文件类型，(目前支持图片/pdf/word/excel)
let getFileTypeAlias = function (resName) {
    let fileTypeAlias = null;
    let fileName = resName.toLowerCase();
    if (fileName.lastIndexOf('.pdf') > 1) {
        fileTypeAlias = 'pdf';
    } else if (fileName.lastIndexOf('.doc') > 1 || fileName.lastIndexOf('.docx') > 1) {
        fileTypeAlias = 'word';
    } else if (fileName.lastIndexOf('.xls') > 1 || fileName.lastIndexOf('.xlsx') > 1) {
        fileTypeAlias = 'excel';
    } else {
        // 默认为图片，除非以后要支持其他格式
        fileTypeAlias = 'img';
    }
    return fileTypeAlias;
};

const dbCheckItem = (item, checks) => {
    if (checks && checks.length > 0 && checks.includes(item.id)) {
        checks.map((id, idx) => {
            item.id === id && checks.splice(idx, 1);
        });
        return;
    }
    checks.push(item.id);
};

export default {
    downloadFile,
    verifyMobile,
    verifyIdCard,
    numToCash,
    getFileTypeAlias,
    dbCheckItem
};
