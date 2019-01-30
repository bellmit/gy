<template>
    <div class="help-wrap">
        <ul>
            <li><img src="../assets/images/help/help1.jpg" alt=""></li>
            <li><img src="../assets/images/help/help2.jpg" alt=""></li>
            <li><img src="../assets/images/help/help3.jpg" alt=""></li>
            <li><img src="../assets/images/help/help4.jpg" alt=""></li>
            <li><img src="../assets/images/help/help5.jpg" alt=""></li>
            <li><img src="../assets/images/help/help6.jpg" alt=""></li>
            <li><img src="../assets/images/help/help7.jpg" alt=""></li>
            <li><img src="../assets/images/help/help8.jpg" alt=""></li>
            <li><img src="../assets/images/help/help9.jpg" alt=""></li>
            <li><img src="../assets/images/help/help10.jpg" alt=""></li>
            <li><img src="../assets/images/help/help11.jpg" alt=""></li>
            <li><img src="../assets/images/help/help12.jpg" alt=""></li>
            <li><img src="../assets/images/help/help13.jpg" alt=""></li>
            <li><img src="../assets/images/help/help14.jpg" alt=""></li>
            <li><img src="../assets/images/help/help15.jpg" alt=""></li>
            <li><img src="../assets/images/help/help16.jpg" alt=""></li>
            <li><img src="../assets/images/help/help17.jpg" alt=""></li>
            <li><img src="../assets/images/help/help18.jpg" alt=""></li>
            <li><img src="../assets/images/help/help19.jpg" alt=""></li>
            <li><img src="../assets/images/help/help20.jpg" alt=""></li>
            <li><img src="../assets/images/help/help21.jpg" alt=""></li>
            <li><img src="../assets/images/help/help22.jpg" alt=""></li>
            <li><img src="../assets/images/help/help23.jpg" alt=""></li>
            <li><img src="../assets/images/help/help24.jpg" alt=""></li>
            <li><img src="../assets/images/help/help25.jpg" alt=""></li>
            <li><img src="../assets/images/help/help26.jpg" alt=""></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            ruleForm: {
                account: '',
                password: '',
                rememberMe: false
            }
        };
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
