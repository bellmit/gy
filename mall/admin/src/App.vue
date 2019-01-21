<template>
    <div class="container-fluid">
        <transition name="fade">
            <gy-loading v-show="showLoading"></gy-loading>
        </transition>
        <router-view
          keep-alive
          transition
          transition-mode="out-in">
        </router-view>
    </div>
</template>

<script>
import gyLoading from './components/gyloading.vue';
import {mapGetters} from 'vuex';

export default {
    data () {
        return {};
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

.container-fluid {
  width: 100%;
  height: 100%;
}
</style>
