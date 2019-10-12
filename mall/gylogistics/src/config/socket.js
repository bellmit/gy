// socket.io

import socketio from 'socket.io-client';
import store from '@/store';
console.log(store.state.mutations.socket);

let socket;

const receive = (type, data) => {
    let ind = store.state.mutations.socket.ind;
    store.commit('updateSocketType', type);
    store.commit('updateSocketMsg', data);
    store.commit('updateSocketInd', ++ind);
};

const send = (data) => {
    // 方法待定
    // socket.emit('update_online_count', data);
};

const connect = () => {
    store.commit('updateSocketStatus', 'success');
};

const disconnect = () => {
    store.commit('updateSocketStatus', 'fail');
};

const init = (userId = 1, companyId = 1) => {
    socket = socketio(process.env.SOCKETIO + '?userId=' + userId + '&companyId=' + companyId);
    socket.on('connect', () => {
        console.log('connect');
    });
    // 集采分销订单
    socket.on('order_status_notify', (val) => {
        console.log(val);
        let type = 1;
        receive(type, val);
    });
    // 发布新的询价单
    socket.on('enquiry_note_notify', (val) => {
        console.log(val);
        let type = 1;
        receive(type, val);
    });
    // 运输订单
    socket.on('transport_contract_notify', (val) => {
        console.log(val);
        let type = 1;
        receive(type, val);
    });
    // 消息
    socket.on('message_notify', (val) => {
        console.log(val);
        let type = 1;
        receive(type, val);
    });
    socket.on('connect', () => {
        connect();
    });
    socket.on('disconnect', () => {
        disconnect();
    });
};

export default {
    init,
    send
};
