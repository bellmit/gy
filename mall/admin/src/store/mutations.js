import {SHOWLOADING, HIDELOADING} from './type.js';

const state = {
    showLoading: false,
    breadcrumb: String
};

const mutations = {
    [SHOWLOADING] (state) {
        state.showLoading = true;
    },
    [HIDELOADING] (state) {
        state.showLoading = false;
    },
    updateBreadcrumb (state, breadcrumb) {
        state.breadcrumb = breadcrumb;
    }
};

const getters = {
    showLoading (state) {
        return state.showLoading;
    },
    breadcrumb (state) {
        return state.breadcrumb;
    }
};

export default {
    state, mutations, getters
};
