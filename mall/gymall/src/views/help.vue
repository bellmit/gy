<template>
    <div class="help-wrap">
        <ul>
            <li v-for="(item, index) in helpList" :key="index">
                <img v-lazy="'http://www.chinayie.com/helpCenter/' + Number(index + 1) + '.jpg'" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            helpList: []
        };
    },
    created () {
        this.helpList.length = 58;
    },
    mounted () {
    },
    methods: {
    }
};
</script>

<style scoped lang="scss">
    .help-wrap{
        width: 1200px;
        margin: 10px auto;
        background-color: #fff;
        padding: 20px 200px;
        text-align: center;
        li{
            margin-bottom: 5px;
            &:last-child{
                margin-bottom: 0;
            }
        }
        img{
            width: 100%;
            height: auto;
            margin-bottom: 5px;
        }
    }
</style>
