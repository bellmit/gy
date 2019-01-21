<template>
    <div class="container-fluid">
        <router-view
          keep-alive
          transition
          transition-mode="out-in">
        </router-view>
        <transition name="fade">
            <gy-loading v-show="showLoading"></gy-loading>
        </transition>
    </div>
</template>

<script>
import gyLoading from '@/components/gyloading.vue';
import {mapGetters} from 'vuex';

export default {
    data () {
        return {
        };
    },
    components: {
        gyLoading
    },
    computed: mapGetters([
        'showLoading'
    ])
};
</script>

<style lang="scss">
    @import './styles/app';
</style>
