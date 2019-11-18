<template>
    <div class="marriedDeal-main">
        <!-- <a href="javascript:void(0)" @click="goim"></a> -->
        <list :isMain="true"></list>
    </div>
</template>

<script>
import list from '@/views/marriedDeal/order/list';
export default {
    data () {
        return {
        };
    },
    beforeCreate () {
        let firstMenu = localStorage.getItem('firstMenu');
        if (!(firstMenu && JSON.parse(firstMenu).isToLogin)) {
            this.$router.go(-1);
        }
    },
    components: {list}
};
</script>

<style scoped lang="scss">
</style>
