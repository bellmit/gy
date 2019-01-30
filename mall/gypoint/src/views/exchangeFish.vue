<template>
    <div class="exchangeFish">
        <div class="exchangeFishs">
            <i class="iconfont icon-yanzhengchenggong" style="color: #2DB171;font-size: 32px;"></i>
            <h3>您已兑换成功</h3>
            <span class="exchangeAddress">兑换品将寄至:&nbsp;{{addressid.provinceName}}&nbsp;{{addressid.cityName}}&nbsp;{{addressid.districtName}}&nbsp;{{addressid.address}}&nbsp;{{addressid.receiveName}}&nbsp;{{addressid.receivePhone}}</span><br>
            <span class="exchange"><a :href="'/my/#/integral/detail?ordernum=' + pointNoteCode">兑换品兑换单详情</a></span>&nbsp;&nbsp;&nbsp;<span class="exchangeShu">|</span>&nbsp;&nbsp;&nbsp;<span class="exchange"><a href="/my/#/integral/list">我的兑换单</a></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'exchangeFish',
    data () {
        return {
            id: null,
            pointNoteCode: null,
            addressid: {}
        };
    },
    mounted () {
        this.id = this.$route.query.id;
        this.pointNoteCode = this.$route.query.pointNoteCode;
        this.Address();
    },
    methods: {
        Address () {
            let that = this;
            that.$http.get(that.$api.exchange.ictSearch + '/' + that.id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.addressid = res.data.data;
                        console.log(that.addressid);
                    }
                });
        }
    }
};
</script>

<style lang="scss">
    .exchangeFish{
        width: 1200px;
        height: 544px;
        margin: 20px auto 61px auto;
        text-align: center;
        background-color: $color-white;
        position: relative;
        .exchangeFishs{
            position: absolute;
            width: 100%;
            height: 210px;
            top: 130px;
            .exchangeAddress{
                display: inline-block;
                margin-top: 5px;
            }
            .exchange{
                display: inline-block;
                margin-top: 50px;
                cursor: pointer;
                a{
                    color: $color-extra;
                }
            }
            .exchangeShu{
                display: inline-block;
                color: $color-light;
                margin-top: 50px;
            }
        }
    }

</style>
