import {SHOWLOADING, HIDELOADING, UPDATEBREADCRUMB} from './type.js';

const state = {
    showLoading: false,
    isHeader: 1,
    // page：属于哪个页面；first:一级导航；second：二级导航；third：三级导航；fourth：四级导航；
    breadcrumb: {
        page: '',
        first: '',
        second: '',
        third: '',
        fourth: ''
    },
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
    [SHOWLOADING] (state) {
        state.showLoading = true;
    },
    [HIDELOADING] (state) {
        state.showLoading = false;
    },
    [UPDATEBREADCRUMB] (state, breadcrumb) {
        state.breadcrumb = breadcrumb;
    },
    updataIsHeader (state, isHeader) {
        state.isHeader = isHeader;
    },
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
    }
};

const getters = {
    socket (state) {
        return state.socket;
    },
    getUserinfo (state) {
        let userInfo = state.userInfo;
        if (!userInfo) {
            userInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
        }
        return userInfo;
    },
    showLoading (state) {
        return state.showLoading;
    },
    breadcrumb (state) {
        return state.breadcrumb;
    },
    isHeader (state) {
        return state.isHeader;
    }
};

export default {
    state, mutations, getters
};
