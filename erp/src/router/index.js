import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
import store from '@/store';
Vue.use(Router);

const router = new Router({
    routes
});
router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title);
    let nowUrl = store.state.mutations.lastListUrl;
    if (from.meta.type === 'detail') {
        if (nowUrl && nowUrl !== to.name) {
            to.meta.isBack = false;
        } else {
            to.meta.isBack = true;
        }
    } else {
        if (to.meta.type === 'list') {
            store.commit('lastListUrl', to.name);
        }
        to.meta.isBack = false;
    }
    next();
});

router.afterEach((to, from, next) => {
    store.commit('updateBreadcrumb', to.name);
});

export default router;
