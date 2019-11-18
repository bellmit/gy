// ======== 合同要素的输入验证
/**
 * 校验输入项目, 验证正常时返回null, 出错时返回错误提示信息
 *
 * @param propList 组件定义列表(参照表erp_cont_ess_prop_define)
 * @param orderInfo 上游或者下游订单信息
 * @param plusMsg 提示文字
 */
const checkInputItem = (propList, orderInfo, plusMsg) => {
    if (propList == null || propList === undefined || propList.length === 0) {
        return '请先选择交易产品';
    }
    for (let i = 0; i < propList.length; i++) {
        if (propList[i] == null || propList[i] === undefined || propList[i].isNecessary === 0) {
            continue;
        }
        let validateInfo = propList[i].validateInfo; // 里面会有多个字段
        if (validateInfo == null || validateInfo === undefined || validateInfo.length === 0) {
            continue;
        }
        let msg = validatePropertyValue(validateInfo, orderInfo, plusMsg);
        if (msg === undefined) {
            continue;
        }
        return msg;
    }
    return null;
};

/**
 * 根据校验规则，校验属性值是否满足规则
 * @param {*} validateInfo 校验规则信息(参照表erp_cont_ess_prop_define)
 * @param {*} orderInfo 上游或者下游订单信息
 * @param {*} plusMsg 提示文字
 */
const validatePropertyValue = (validateInfo, orderInfo, plusMsg) => {
    for (let j = 0; j < validateInfo.length; j++) {
        let keyInfo = validateInfo[j];
        let itemValue = orderInfo[keyInfo.propKey];
        let validateList = keyInfo.validateList;
        for (let l = 0; l < validateList.length; l++) {
            if (validateList[l].type === 'must') {
                // 必需验证
                if (itemValue === undefined || itemValue === null || itemValue === '') {
                    return validateList[l].msg + plusMsg;
                }
                if (itemValue.constructor === Array && itemValue.length === 0) {
                    return validateList[l].msg + plusMsg;
                }
            } else if (validateList[l].type === 'number') {
                // 数字验证
                if (itemValue === undefined || itemValue === null || itemValue === '') {
                    continue;
                }
                if (!/^(((\d*).\d+)|(\d+.(\d*)|\d+))$/.test(itemValue)) {
                    return validateList[l].msg + plusMsg;
                }
            }
        }
        let subValidateList = keyInfo.subValidateList;
        if (subValidateList === undefined || subValidateList === null || subValidateList.length === 0) {
            continue;
        }
        for (let l = 0; l < subValidateList.length; l++) {
            if (subValidateList[l].value === itemValue) {
                return validatePropertyValue(subValidateList[l].validateList, orderInfo, plusMsg);
            }
        }
    }
};

/**
 * 校验相互关联的输入项目, 验证正常时返回null, 出错时返回错误提示信息
 *
 * @param orderInfo 上游或者下游订单信息
 * @param plusMsg 提示文字
 */
const checkRelatedInputItem = (orderInfo, plusMsg) => {
    if (orderInfo.grade === '未评级') {
        return plusMsg + '交易公司未做准入，请先提交准入申请！';
    }
    if (orderInfo['skuPriceType'] === 1 || orderInfo['skuPriceType'] === 22) {
        if (!orderInfo['skuPrice']) {
            return '单价不能为空' + plusMsg;
        }
        if (Number(orderInfo['skuPrice']) === 0) {
            return '单价不能为0' + plusMsg;
        }
    }
    if (orderInfo['skuPriceType'] === 21) {
        if (orderInfo['depositType'] === 1) {
            return '公式计价-以合同为准情况下，保证金不能选择按比例' + plusMsg;
        }
    }
    if (orderInfo['depositType'] === 0) {
        orderInfo['depositRatio'] = 0;
        orderInfo['depositAmount'] = 0;
    }
    if (orderInfo['depositType'] === 1) {
        if (!orderInfo['depositRatio']) {
            return '保证金比例不能为空' + plusMsg;
        }
        if (Number(orderInfo['depositRatio']) === 0) {
            return '保证金比例不能为0' + plusMsg;
        }
    }
    if (orderInfo['depositType === 2']) {
        if (!orderInfo['depositAmount']) {
            return '保证金金额不能为空' + plusMsg;
        }
        if (Number(orderInfo['depositAmount']) === 0) {
            return '保证金金额不能为0' + plusMsg;
        }
    }
    if (!orderInfo['deliveryDateFlag']) {
        return '请先选择交割日期' + plusMsg;
    }
    if (!orderInfo['deliveryBeginDate']) {
        return '请选择' + (orderInfo['deliveryDateFlag'] === 2 ? '截止日期' : '开始日期') + plusMsg;
    }
    if (orderInfo['deliveryDateFlag'] === 1 && !orderInfo['deliveryEndDate']) {
        return '请选择结束日期' + plusMsg;
    }

    if (orderInfo['provideInvoiceType'] === 3 && (orderInfo['provideInvoiceDays'] === null || orderInfo['provideInvoiceDays'] === '')) {
        return '请填写发票日期' + plusMsg;
    }

    if (orderInfo['priceOfWeight']) {
        if (!orderInfo['chattingCompanyName'] || getStringBLen(orderInfo['chattingCompanyName']) > 50) {
            return '请填写下游撮合公司且长度不能超过50字符' + plusMsg;
        }
    }
    return null;
};

// 获取字符串长度
const getStringBLen = (str) => {
    if (str == null) return 0;
    if (typeof str !== 'string') {
        str += '';
    }
    return str.replace(/[^x00-xff]/g, '01').length;
};

/**
 * 判断输入项是否被修改了，若有修改则加入变更项列表
 *
 * @param fieldPropList 组件定义列表(参照表erp_cont_ess_prop_define)
 * @param orderInfo 上游或者下游订单信息(代表页面上的输入项)
 * @param originalOrderInfo 修改前的订单信息
 * @param updatedItemList 变更项列表
 */
const checkFieldUpdated = (fieldPropList, orderInfo, originalOrderInfo, updatedItemList) => {
    if (fieldPropList && fieldPropList.length > 0) {
        fieldPropList.forEach((prop, index) => {
            let varNameArray = prop.varNameList;
            if (varNameArray == null || varNameArray === undefined || varNameArray.length === 0) {
                return;
            }
            for (let i = 0; i < varNameArray.length; i++) {
                if (originalOrderInfo[varNameArray[i]] !== orderInfo[varNameArray[i]]) {
                    // 只要有一项是改变了，那就算是变更，直接传递所有改变的值
                    let updObj = {key: prop.propKey};
                    updObj.varList = [];
                    varNameArray.forEach(varName => {
                        let varInfo = {key: varName};
                        varInfo.oldVal = originalOrderInfo[varName];
                        varInfo.newVal = orderInfo[varName];
                        updObj.varList.push(varInfo);
                    });
                    updatedItemList.push(updObj);
                    break;
                }
            }
        });
    }
};

// 定义外部输出
export default {
    checkInputItem,
    checkRelatedInputItem,
    checkFieldUpdated
};
