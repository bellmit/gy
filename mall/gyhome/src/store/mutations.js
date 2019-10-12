const state = {
    userInfo: {},
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
    setUserinfo (state, data) {
        state.userInfo = data;
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
    }
};

export default {
    state, mutations, getters
};
