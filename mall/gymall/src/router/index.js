import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
import store from '@/store';
import socket from '@/config/socket';

Vue.use(Router);

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title);
    if (to.name === 'shopHome' || to.name === 'shop-profile') {
        store.commit('updataIsHeader', true);
    } else {
        store.commit('updataIsHeader', false);
    }
    if (localStorage.getItem('userInfo')) {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        socket.init(user.id, user.companyId);
    }
    next();
});

export default router;
