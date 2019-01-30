import axios from 'axios';
import http from '../http';

// --------------------------------------- 类目
// 获取类目
const getCategory = () => {
    return new Promise((resolve, reject) => {
        http.get(`/platform/point/v1/categories`).then(result => {
            const res = result.data;
            const category = res.map(item => ({
                id: item.id,
                name: item.categoryName,
                description: item.categoryDescription,
                count: item.count
            }));
            resolve(category);
        }).catch(err => {
            reject(err);
        });
    });
};
// 新增类目
const saveCategory = (info) => {
    return new Promise((resolve, reject) => {
        const category = {
            id: info.id,
            categoryName: info.name,
            categoryDescription: info.description
        };
        http.post(`/platform/point/v1/categories`, category).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};
// 编辑类目
const editCategory = (info) => {
    return new Promise((resolve, reject) => {
        const category = {
            id: info.id,
            categoryName: info.name,
            categoryDescription: info.description
        };
        http.put(`/platform/point/v1/categories`, category).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};
// 删除类目
const delCategory = id => {
    return new Promise((resolve, reject) => {
        http.put(`/platform/point/v1/categories/logicDel`, { id }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};

// -------------------------------------- 兑换品
// 获取兑换品
const getGoods = ({
    name,
    status,
    categoryId,
    pageSize = 10,
    pageNum = 1
}) => {
    return new Promise((resolve, reject) => {
        http.post('/platform/point/v1/redemptions/search', {
            data: {
                keywords: name,
                prdCategoryId: categoryId,
                status
            },
            pageNum,
            pageSize
        }).then(result => {
            const data = result.data;
            const page = {
                pageNum: data.pageNum,
                pageSize: data.pageSize,
                total: data.total
            };
            resolve({ page, list: data.list });
        }).catch(err => {
            reject(err);
        });
    });
};
const getGoodsStatus = ({
    name,
    status
}) => {
    return new Promise((resolve, reject) => {
        http.post('/platform/point/v1/redemptions/count', {
            keywords: name
        }).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// 查看兑换品详情
const getGoodsDetail = id => {
    return new Promise((resolve, reject) => {
        http.get(`/platform/point/v1/redemptions/${id}`).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// 编辑兑换品
const editGoods = params => {
    return new Promise((resolve, reject) => {
        http.put('/platform/point/v1/redemptions', params).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};
// 添加兑换品
const addGoods = params => {
    return new Promise((resolve, reject) => {
        http.post('/platform/point/v1/redemptions', params).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};

// ------------------------------------ 兑换单
// 获取兑换单列表
const getOrders = (option) => {
    return new Promise((resolve, reject) => {
        http.post('/platform/point/v1/odrPointNote/search', option).then(result => {
            const data = result.data;
            const page = {
                pageSize: data.pageSize,
                pageNum: data.pageNum,
                total: data.total
            };
            const order = data.list.map(item => ({
                id: item.id,
                pointNoteCode: item.pointNoteCode,
                receiveName: item.receiveName,
                receivePhone: item.receivePhone,
                createdDate: item.createdDate,
                gross: item.gross,
                status: item.status,
                odrPointNoteItemModelList: item.odrPointNoteItemModelList.length ? item.odrPointNoteItemModelList : [{ redemptionName: 'testName', redemptionQuantity: 'testCount' }]
            }));
            resolve({
                page,
                order
            });
        }).catch(err => {
            reject(err);
        });
    });
};
// 获取兑换单详情
const getOrder = (id) => {
    return new Promise((resolve, reject) => {
        http.get(`/platform/point/v1/odrPointNote/search/${id}`).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// 新增兑换单
const addOrder = (info) => {
    return new Promise((resolve, reject) => {
        http.post('/platform/point/v1/odrPointNote').then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};
// 修改兑换单
const updateOrder = (info) => {
    return new Promise((resolve, reject) => {
        http.put('/platform/point/v1/odrPointNote').then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};
// 删除兑换单
const delOrder = (id) => {
    return new Promise((resolve, reject) => {
        http.post('/platform/point/v1/odrPointNote/delete', { id }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};
const getOrderStatus = (option) => {
    return new Promise((resolve, reject) => {
        http.post('platform/point/v1/odrPointNote/getStatusCount', option).then(result => {
            const data = result.data;
            resolve({
                waiting: data.waiting || data.statusCount1,
                sent: data.sent || data.statusCount2,
                done: data.done || data.statusCount3
            });
        }).catch(err => {
            reject(err);
        });
    });
};

// ------------------------------------ 发货管理
// 获取发货列表
const getShipments = (option) => {
    return new Promise((resolve, reject) => {
        http.post('platform/point/v1/deliveries/search', option).then(result => {
            const data = result.data;
            const page = {
                pageSize: data.pageSize,
                pageNum: data.pageNum,
                total: data.total
            };
            const order = data.list.map(item => ({
                id: item.id,
                pointNoteCode: item.pointNoteCode,
                receiveName: item.receiveName,
                receivePhone: item.receivePhone,
                createdDate: item.createdDate,
                provinceName: item.provinceName,
                cityName: item.cityName,
                districtName: item.districtName,
                address: item.address,
                gross: item.gross,
                status: item.status,
                odrPointNoteItemModelList: item.odrPointNoteItemModelList.length ? item.odrPointNoteItemModelList : [{ redemptionName: 'testName', redemptionQuantity: 'testCount' }]
            }));
            resolve({ page, order });
        }).catch(err => {
            reject(err);
        });
    });
};
// 获取快递公司信息
const getExpressCompanies = () => {
    return new Promise((resolve, reject) => {
        http.get('platform/point/v1/expressCompanies').then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    });
};
// 获取物流信息
const getLogistics = () => {
    return new Promise((resolve, reject) => {
        http.post('platform/v1/expressCompanies/info').then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};
// 发货
const shipments = (option) => {
    return new Promise((resolve, reject) => {
        http.put('platform/point/v1/deliveries', option).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};

// 上传文件
const uploadFile = (file) => {
    const formData = new FormData();
    const headers = {
        'Content-Type': 'multipart/form-data'
    };
    formData.append('file', file);
    formData.append('storage', 'platform-mgmt');

    return new Promise((resolve, reject) => {
        axios.post('/platform/v1/uploadImage', formData, headers).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};

export default {
    uploadFile,
    getCategory, // 类目管理
    saveCategory,
    editCategory,
    delCategory,
    getGoods, // 兑换品管理
    getGoodsStatus,
    getGoodsDetail,
    editGoods,
    addGoods,
    getOrders, // 兑换单管理
    getOrder,
    addOrder,
    updateOrder,
    delOrder,
    getOrderStatus,
    getShipments, // 发货管理
    getExpressCompanies,
    getLogistics,
    shipments
};
