import http from '../http';

// -------------------------------- 会员等级
// 获取会员等级
const getLevels = () => {
    return new Promise((resolve, reject) => {
        http.get(`/platform/point/v1/memberLevels`).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// 编辑会员等级
const editLevel = (option) => {
    return new Promise((resolve, reject) => {
        http.put(`/platform/point/v1/memberLevels`, option).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};

// ----------------------------- 获取途径
// 获取积分规则列表
const getIntegralWays = () => {
    return new Promise((resolve, reject) => {
        http.get(`/point/v1/ictRule/list`).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// 积分获取规则查看
const getIntegralWay = (id) => {
    return new Promise((resolve, reject) => {
        http.get(`/point/v1/ictRule/${id}`).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// 积分获取规则编辑
const setIntegralWay = (option) => {
    return new Promise((resolve, reject) => {
        http.put(`/point/v1/ictRule`, option).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// ------------------------- 风险控制
// 获取风险控制
const getRisk = () => {
    return new Promise((resolve, reject) => {
        http.get(`/platform/point/v1/riskManage`).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// 设置风险控制
const setRisk = (option) => {
    return new Promise((resolve, reject) => {
        http.post(`/platform/point/v1/riskManage`, option).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};

export default {
    getLevels,
    editLevel,
    getIntegralWays,
    getIntegralWay,
    setIntegralWay,
    getRisk,
    setRisk
};
