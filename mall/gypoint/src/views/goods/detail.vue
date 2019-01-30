<template>
    <div class="goods-detail">
        <div class="crumbs">商城首页 > {{goods.categoryName}} > {{goods.redemptionName}}</div>
        <!-- 商品基础 -->
        <div class="base clearfix">
            <div class="l">
                <img :src="goods.filePath" alt="">
            </div>
            <div class="r">
                <div class="t">{{goods.redemptionName}}
                    <!-- 告罄 -->
                    <img v-if="goods.inventory === 0" src="../../assets/images/sell-out.png" alt="">
                </div>
                <p class="note"><strong>【重要提示】</strong>产品如有质量问题或使用咨询，请拨打售后服务热线：400-777-6777</p>
                <div class="c" v-if="goods.status === 1">
                    <div class="integral div">
                        <div class="item">
                            <span class="label">积分</span>
                            <em>{{goods.redemptionPrice}}</em>
                        </div>
                        <div class="item">
                            <span class="label">服务</span>
                            <em>由国烨积分商城发货，并提供相关服务</em>
                        </div>
                        <div class="item">
                            <span class="label">配送范围</span>
                            <em>全国</em>
                        </div>
                        <div class="item">
                            <span class="label">运费</span>
                            <em>免运费</em>
                        </div>
                    </div>
                    <div class="num div">
                        <span class="label">数量</span>
                        <div class="calculate">
                            <button class="sub" @click="sub(num)">-</button>
                            <span class="number">{{num}}</span>
                            <button class="add" @click="add(num)">+</button>
                        </div>
                    </div>
                    <div class="inv-num div">
                        <span class="label">库存：</span>{{goods.inventory}}
                    </div>
                </div>
                <!-- 下架 -->
                <div class="c soldout" v-if="goods.status === 0">
                    此兑换品已下架
                </div>
                <!-- 上架 -->
                <div class="b" v-if="goods.status === 1">
                    <button @click="exchange">立即兑换</button>
                </div>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="info">
            <div class="title">
                <div>兑换品详情</div>
            </div>
            <div class="wrap">
                <div class="explain" v-html="goods.description">
                    {{goods.description}}
                </div>
            </div>
        </div>
        <el-dialog
          title="提示"
          class="dialog"
          :visible.sync="isDialog"
          width="40%">
            <p>{{tips}}</p>
            <span slot="footer" class="dialog-footer">
          <button class="gy-button-extra" @click="isDialog = false">确 定</button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            goods: {}, // 商品详情信息
            num: 1,
            tips: '您的积分不足，无法兑换',
            isDialog: false
        };
    },
    mounted () {
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            const me = this;
            me.$http.get(me.$api.category.redemptions + me.$route.query.id)
                .then(res => {
                    if (res.data.code === 0) {
                        me.goods = Object.assign(res.data.data, {});
                    } else {
                        me.$alert(res.data.message);
                    }
                });
        },
        sub (v) {
            this.num = --v;
            if (this.num <= 0) {
                this.num = 0;
            }
        },
        add (v) {
            this.num = ++v;
        },
        // 立即兑换
        exchange () {
            const me = this;
            let params = {
                id: me.goods.id,
                count: me.num
            };
            me.$http.post(me.$api.category.check, params)
                .then(res => {
                    if (res.data.code === 0) {
                        me.$router.push({path: '/exchange', query: {id: me.goods.id, count: me.num}});
                    } else {
                        me.$alert(res.data.message, '出错了');
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .sub{
        transform: scale(2) !important;
    }
    .explain{
        text-align: center;
        img {
            max-width: 800px;
            display: block;
            margin: 0 auto;
        }
    }
</style>
