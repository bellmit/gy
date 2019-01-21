import Vue from 'vue';
import Router from 'vue-router';
import { MessageBox } from 'element-ui';
import routes from './router';
import store from '@/store';

Vue.use(Router);

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    store.dispatch('setShowLoading');
    if (to.meta.title !== '登录' && !localStorage.getItem('userInfoClient')) {
        store.dispatch('setHideLoading');
        MessageBox.alert('请先登录', '提示')
            .then(() => {
                next({name: 'login'});
            });
        return;
    }
    next();
});

router.afterEach((to, from, next) => {
    store.dispatch('setHideLoading');
    store.commit('updateBreadcrumb', to.name);
    store.commit('setTitle', to.meta.title);
    // console.log(to);
    if (to.params.title) {
        store.commit('setTitle', to.params.title);
    }
    if (to.params.title) {
        store.commit('setTitle', to.params.title);
    }
});
export default router;
