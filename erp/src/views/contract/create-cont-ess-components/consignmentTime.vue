<template>
    <div v-if="isShow">
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>提/交货时间</div>
                <div class="essential-text">
                    <el-select v-model="orderData.consignmentTime" placeholder="请选择">
                        <el-option v-for="item in list" :key="item.id"
                                    :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="essential-text" v-if="orderData.paymentType === 0">
                    <el-select v-model="orderData.consignmentTimeText" placeholder="请选择">
                        <el-option v-for="item in list1" :key="item.name"
                                    :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="essential-row" v-if="orderData.paymentType === 0 && orderData.consignmentTime && orderData.consignmentTimeText">
            <div class="essential-item">
                <div class="essential-title"></div>
                <!-- 先款后货 -->
                <div class="essential-text">
                    <!-- 卖方收款后 -->
                    <span v-if="orderData.consignmentTime === 1">
                        {{ orderData.consignmentTimeText }}个工作日内完成交货
                    </span>
                    <!-- 买方付款后 -->
                    <span v-if="orderData.consignmentTime === 2">
                        {{ orderData.consignmentTimeText }}个工作日内提货
                    </span>
                </div>
            </div>
        </div>
        <div class="essential-row" v-if="orderData.paymentType === 1 && orderData.consignmentTime">
            <div class="essential-item">
                <div class="essential-title"></div>
                <!-- 先货后款 -->
                <div class="essential-text">
                    <!-- 卖方送货 -->
                    <span v-if="orderData.consignmentTime === 3">
                        货到达买方指定地点，买方付款后卸货
                    </span>
                    <!-- 卖方送货 -->
                    <div v-if="orderData.consignmentTime === 4">
                        买方提货后<el-select style="width: 30%;" v-model="orderData.consignmentTimeText" placeholder="请选择">
                            <el-option v-for="item in list1" :key="item.name"
                                        :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>个工作日内完成付款
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        compData: Object,
        orderData: Object
    },
    data () {
        return {
            isShow: true,
            list: [],
            list1: [],
            arr1: [
                {
                    id: 1,
                    name: '卖方收款后'
                },
                {
                    id: 2,
                    name: '买方付款后'
                }
            ],
            arr2: [
                {
                    id: 3,
                    name: '卖方送货'
                },
                {
                    id: 4,
                    name: '买方自提'
                }
            ]
        };
    },
    watch: {
        // 付款方式改变
        'orderData.paymentType' (newV, oldV) {
            this.list = newV === 0 ? this.arr1 : this.arr2;
            if (newV === 0 || newV === 1) {
                this.$set(this.orderData, 'consignmentTime', null);
                this.$set(this.orderData, 'consignmentTimeText', null);
            }
            if (newV === -1) {
                this.isShow = false;
                this.orderData.consignmentTime = null;
                this.orderData.consignmentTimeText = null;
            } else {
                this.isShow = true;
            }
        }
    },
    mounted () {
        for (let i = 0; i < 31; i++) {
            this.list1.push(
                {
                    name: i
                }
            );
        }
        this.list = this.arr1;
    },
    methods: {
    }
};
</script>
