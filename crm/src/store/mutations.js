const state = {
    breadcrumb: String,
    companyId: null,
    socket: {
        // pending 连接中 success 成功 fail 失败
        status: 'pending',
        // 接受类型：order 订单
        type: 'order',
        msg: '',
        ind: 0
    }
};

const mutations = {
    updateSocketStatus (state, status) {
        state.socket.status = status;
    },
    updateSocketType (state, type) {
        state.socket.type = type;
    },
    updateSocketMsg (state, msg) {
        state.socket.msg = msg;
    },
    updateSocketInd (state, ind) {
        state.socket.ind = ind;
    },
    updateBreadcrumb (state, breadcrumb) {
        state.breadcrumb = breadcrumb;
    },
    updateCompanyId (state, companyId) {
        state.companyId = companyId;
    }
};

const getters = {
    breadcrumb (state) {
        return state.breadcrumb;
    },
    companyId (state) {
        return state.companyId;
    }
};

export default {
    state, mutations, getters
};
