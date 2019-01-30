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
    // console.log(to);
    if (!to.meta.unLogin && !localStorage.getItem('userInfo')) {
        MessageBox.alert('请先登录', '提示')
            .then(() => {
                window.location.replace('/');
            });
        return;
    }
    to.meta.title && (document.title = to.meta.title);
    store.commit('updateBreadcrumb', to.name);
    next();
});

export default router;
