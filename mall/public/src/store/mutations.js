const state = {
    userInfo: {}
};

const mutations = {
    setUserinfo (state, data) {
        state.userInfo = data;
    }
};

const getters = {
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
