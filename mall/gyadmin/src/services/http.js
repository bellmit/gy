import axios from 'axios';

const SUCCESS_KEYS = [0]; // 成功状态码
const MAINTAIN_KEYS = [3000]; // 维护状态码
const UNAUTHORIZE_KEYS = [4000]; // 无权限状态码

const http = (url, init) => {
    return new Promise((resolve, reject) => {
        axios({
            url,
            ...init
        }).then(result => {
            const code = result.data.code;
            if (SUCCESS_KEYS.includes(code)) {
                resolve(result.data, result);
            } else if (MAINTAIN_KEYS.includes(code)) {
                reject(result);
            } else if (UNAUTHORIZE_KEYS.includes(code)) {
                reject(result);
            } else {
                console.log('%cunkonwn response code：%d', 'color: #ab00ff', code);
                reject(result);
            }
        }).catch(error => {
            console.log('%c%s error', 'color:red', url, error.toString());
            reject(error);
        });
    });
};

const get = (url, init) => {
    return http(url, {
        method: 'Get',
        params: init
    });
};

const post = (url, data) => {
    return http(url, {
        method: 'Post',
        data
    });
};

const put = (url, data) => {
    return http(url, {
        method: 'Put',
        data
    });
};

export default {
    get,
    post,
    put
};
