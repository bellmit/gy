<template>
    <div class="container-fluid">
        <!-- <gy-header></gy-header>
        <router-view
          keep-alive
          transition
          transition-mode="out-in">
        </router-view>
        <gy-footer></gy-footer> -->
        <gy-header :page="currentPage"></gy-header>
        <router-view
          keep-alive
          transition
          transition-mode="out-in">
        </router-view>
        <gy-footer></gy-footer>
        <transition name="fade">
            <gy-loading v-show="showLoading"></gy-loading>
        </transition>
    </div>
</template>

<script>
import gyLoading from '../../gypublic/src/components/gyloading.vue';
import gyHeader from '../../gypublic/src/components/gyheader.vue';
import gyFooter from '../../gypublic/src/components/gyfooter.vue';
import {mapGetters} from 'vuex';

export default {
    data () {
        return {
            currentPage: '商城'
        };
    },
    components: {
        gyLoading,
        gyHeader,
        gyFooter
    },
    computed: mapGetters([
        'showLoading'
    ]),
    mounted () {
        // console.log(this.$route.meta.isShowHead);
    }
};
</script>

<style lang="scss">
    @import './styles/app';
</style>
