<template>
    <div class="container-fluid">
        <template>
            <gy-header></gy-header>
        </template>
    </div>
</template>

<script>
import gyHeader from './components/gyheader.vue';

export default {
    data () {
        return {
        };
    },
    components: {
        gyHeader
    }
};
</script>

<style lang="scss">
    @import './styles/public';
</style>
