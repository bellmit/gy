<template>
    <section class="nodata">
        <div class="main">
            <img src="../assets/images/nodata.png" alt="">
            <span>暂时还没有任何记录</span>
        </div>
    </section>
</template>
<script>
export default {
    data () {
        return {};
    }
};
</script>
<style lang="scss" scoped>
    .nodata {
        position: fixed;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background-color: #fff;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        img {
            width: 150px;
        }
        span {
            display: block;
            color: $color-gray;
            font-size: $small-font;
            margin-top: 20px;
        }
    }
</style>
