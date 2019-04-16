import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
// import { MessageBox } from 'element-ui';
import store from '@/store';
import socket from '@/config/socket';

Vue.use(Router);

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title);
    if (!to.meta.unLogin && !localStorage.getItem('userInfo')) {
        location.href = `./#/login`;
        // MessageBox.alert('请先登录111', '提示')
        //     .then(() => {
        //         location.href = `./#/login`;
        //     });
        return;
    }

    if (localStorage.getItem('userInfo')) {
        let storage = JSON.parse(localStorage.getItem('userInfo'));
        socket.init(storage.id, storage.companyId);
    }
    next();
});

router.afterEach((to, from, next) => {
    store.commit('updateBreadcrumb', to.name);
});

router.afterEach((to, from, next) => {
});

export default router;
