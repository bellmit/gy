export const paymentMethod = (transactionType, isBatchDelivery) => {
    let str = '';
    if (transactionType === 3) { str = '一次付清'; }
    if (transactionType === 0 && isBatchDelivery === 0) { str = '先款后货，全款全货'; }
    if (transactionType === 0 && isBatchDelivery === 1) { str = '先款后货，允许分批次发货，分批付款'; }
    if (transactionType === 1 && isBatchDelivery === 0) { str = '先货后款，全款全货'; }
    if (transactionType === 1 && isBatchDelivery === 1) { str = '先货后款，允许分批次发货，分批付款'; }
    return str;
};
