const state = {
    showLoading: false,
    userInfo: {},
    breadcrumb: String,
    title: String,
    newIndex: 1
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
    setTitle (state, title) {
        state.title = title;
    },
    setNewIndex  (state, newIndex) {
        state.newIndex = newIndex;
    }
};

const getters = {
    showLoading (state) {
        return state.showLoading;
    },
    getUserinfo (state) {
        let userInfo = state.userInfo;
        if (!userInfo) {
            userInfo = JSON.parse(window.localStorage.getItem('userInfoClient') || null);
        }
        return userInfo;
    },
    breadcrumb (state) {
        return state.breadcrumb;
    },
    title (state) {
        return state.title;
    },
    newIndex (state) {
        return state.newIndex;
    }
};

export default {
    state, mutations, getters
};
