const state = {
    showLoading: false,
    socket: {
        // pending 连接中 success 成功 fail 失败
        status: 'pending',
        // 接受类型：order 订单
        type: 'order',
        msg: '',
        ind: 0
    },
    loginBeforeRoute: Object,
    breadcrumb: String,
    userInfo: {},
    currentRoute: String,
    newIndex: 1,
    contentKey: new Date()
};

const mutations = {
    setShowLoading (state) {
        state.showLoading = true;
    },
    setHideLoading (state) {
        state.showLoading = false;
    },
    setUserinfo (state, data) {
        state.userInfo = data;
    },
    updateBreadcrumb (state, breadcrumb) {
        state.breadcrumb = breadcrumb;
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
    },
    updateLoginBeforeRoute (state, loginBeforeRoute) {
        state.loginBeforeRoute = loginBeforeRoute;
    },
    setCurrentRoute (state, route) {
        state.currentRoute = route;
    },
    setNewIndex (state, val) {
        state.newIndex = val;
    },
    updateContentKey (state, time) {
        state.contentKey = time;
    }
};

const getters = {
    showLoading (state) {
        return state.showLoading;
    },
    breadcrumb (state) {
        return state.breadcrumb;
    },
    socket (state) {
        return state.socket;
    },
    loginBeforeRoute (state) {
        return state.loginBeforeRoute;
    },
    getUserinfo (state) {
        let userInfo = state.userInfo;
        if (!userInfo) {
            userInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
        }
        return userInfo;
    },
    currentRoute (state) {
        return state.currentRoute;
    },
    newIndex (state) {
        return state.newIndex;
    },
    contentKey (state) {
        return state.contentKey;
    }
};

export default {
    state, mutations, getters
};
