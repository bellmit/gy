export const paymentMethod = (transactionType, isBatchDelivery) => {
    let str = '';
    if (transactionType === 3) {
        str = '一次付清';
    }
    if (transactionType === 0) {
        str = '先款后货';
    } else if (transactionType === 1) {
        str = '先货后款';
    } else if (transactionType === 10) {
        str = '担保交易';
    }
    if (str.trim() === '') {
        if (isBatchDelivery === 0) {
            str = '全款全货';
        } else if (isBatchDelivery === 1) {
            str = '允许分批次发货，分批付款';
        }
    } else {
        if (isBatchDelivery === 0) {
            str = str + '，全款全货';
        } else if (isBatchDelivery === 1) {
            str = str + '，允许分批次发货，分批付款';
        }
    }
    return str;
};
// tree 数据转换
export const treeDataTranslate = (data, id = 'id', pid = 'parentId') => { // 角色查询
    var res = [];
    var temp = {};
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i];
    }
    for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]['children']) {
                temp[data[k][pid]]['children'] = [];
            }
            if (!temp[data[k][pid]]['_level']) {
                temp[data[k][pid]]['_level'] = 1;
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1;
            temp[data[k][pid]]['children'].push(data[k]);
        } else {
            res.push(data[k]);
        }
    }
    return res;
};
