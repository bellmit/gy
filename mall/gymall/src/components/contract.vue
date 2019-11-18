<template>
    <div class="pop-contract" v-show="showContract">
        <div class="pop-main">
            <iframe :src="file" frameborder="0" id="contractIframe"></iframe>
            <span class="button-contract">
                <button class="gy-button-extra" @click="handleChapter" v-show="showBtn">盖章</button><button class="gy-button-normal" @click="hideContract">关闭</button>
            </span>
        </div>
        <span class="mask" @click="hideContract"></span>
    </div>
</template>

<script>
export default {
    name: 'contract',
    props: {
        file: String,
        showContract: {
            type: Boolean,
            default: false
        },
        showBtn: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        hideContract () {
            this.$emit('update:showContract', false);
        },
        handleChapter () {
            this.$emit('handlechapter', '');
        }
    }
};
</script>

<style lang="scss" scoped>
    .pop-contract{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        left: 0;
        top: 0;
        .pop-main{
            background-color: #fff;
            height: 650px;
            width: 800px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -325px 0 0 -400px;
            z-index: 2;
        }
        iframe{
            height: 600px;
            width: 100%;
            border: none;
        }
        .button-contract{
            text-align: center;
            display: block;
            padding-top: 5px;
            button{
                margin: 0 10px;
            }
        }
        .mask{
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            background-color: #000;
            opacity: 0.6;
            cursor: pointer;
            position: absolute;
            z-index: 1;
        }
    }
</style>
