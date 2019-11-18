const state = {
    showLoading: false,
    lastListUrl: null,
    breadcrumb: String,
    userInfo: {}
};

const mutations = {
    lastListUrl (state, name) {
        state.lastListUrl = name;
    },
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
    }
};

const getters = {
    lastListUrl (state, name) {
        state.lastListUrl = name;
    },
    showLoading (state) {
        return state.showLoading;
    },
    breadcrumb (state) {
        return state.breadcrumb;
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
