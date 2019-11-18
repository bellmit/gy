import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
// import { MessageBox } from 'element-ui';
import socket from '@/config/socket';
import store from '@/store';

Vue.use(Router);

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title);
    if (to.name === 'header' || to.name === 'footer') {
        next();
        return;
    }
    if (!to.meta.unLogin && !localStorage.getItem('userInfo')) {
        // MessageBox.alert('请先登录', '提示')
        //     .then(() => {
        //         location.href = `/my/#/login`;
        //     });
        location.href = `/my/#/login`;
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
    store.commit('setCurrentRoute', to.name);
});

export default router;
