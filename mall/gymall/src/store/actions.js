import * as types from './type.js';

export default {
    showloader: (context) => {
        context.commit(types.SHOWLOADING);
    },
    hideloader: (context) => {
        context.commit(types.HIDELOADING);
    }
};
