<template>
    <div class="container-fluid">
        <template v-if="routeName === 'header'">
            <gy-header :page="currentPage"></gy-header>
        </template>
        <template v-else-if="routeName === 'footer'">
            <gy-footer></gy-footer>
        </template>
        <template v-else>
            <gy-header :page="currentPage"></gy-header>
            <router-view
                keep-alive
                transition
                transition-mode="out-in">
            </router-view>
            <gy-footer v-if="currentRoute === 'login' || currentRoute === 'register' || currentRoute === 'news'"></gy-footer>
            <transition name="fade">
                <gy-loading v-show="showLoading"></gy-loading>
            </transition>
        </template>
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
            routeName: '',
            currentPage: '我的'
        };
    },
    components: {
        gyLoading,
        gyHeader,
        gyFooter
    },
    computed: {
        ...mapGetters(['showLoading', 'currentRoute'])
    },
    watch: {
        '$route' (to, from) {
            this.routeName = to.name;
        }
    }
};
</script>

<style lang="scss">
    @import './styles/app';
</style>
