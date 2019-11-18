<template>
    <div class="loading">
        <span><i class="icon icon-loading"></i></span>
    </div>
</template>
<script>
export default {
    data () {
        return {};
    }
};
</script>
<style lang="scss" scoped>
    .loading {
        position: fixed;
        z-index: 999999;
        background-color: rgba(0, 0, 0, 0.5);
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            height: 70px;
            width: 70px;
            background-color: #fff;
            border-radius: $border-radius-small;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
                animation: rotate 2.6s linear infinite;
            }
        }
    }

    @keyframes rotate {
        0% {
            opacity: 0.7;
            transform: rotate(0deg);
        }
        100% {
            opacity: 1;
            transform: rotate(360deg)
        }
    }
</style>
