const state = {
    breadcrumb: String,
    companyId: null
};

const mutations = {
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
