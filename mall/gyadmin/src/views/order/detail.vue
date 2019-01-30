<!--
    卖方
-->

<template>
    <div class="order-detail">
        <!--<div slot="header" class="clearfix">-->
            <!--<span>订单号：{{info.odrOrderSn}}</span>-->
            <!--<div class="bright">-->
                <!--<ul class="order-state">-->
                    <!--<li :class="{active:info.orderStatus===1}">签约 ></li>-->
                    <!--<li :class="{active:info.orderStatus===2}">付款与交割 ></li>-->
                    <!--<li :class="{active:info.orderStatus===3}">结算与复核 ></li>-->
                    <!--<li :class="{acitve:info.orderStatus===4}">完成</li>-->
                <!--</ul>-->
            <!--</div>-->
        <!--</div>-->
        <!--<gy-order-step ref="orderStep" @updateData="getInfo" :step-data="stepData" :quantity-issued="quantityIssued" :order-data="orderData"></gy-order-step>-->
        <div class="gy-h4"><i class="iconfont icon-info"></i>订单信息</div>
        <el-row>
            <el-col :span="24">
                <gy-order-info @showContract="showContract" :order-data="info"></gy-order-info>
            </el-col>
        </el-row>
        <div class="tabs">
            <el-tabs v-model="activeName">
                <el-tab-pane label="订单明细" name="first">
                    <gy-order-detail :order-data="info" :order-item-data="orderItemList"></gy-order-detail>
                </el-tab-pane>
                <el-tab-pane label="金额明细" name="second">
                    <gy-order-payment :order-no="info.odrOrderSn" user-type="sell"></gy-order-payment>
                </el-tab-pane>
                <el-tab-pane label="货物交割" name="three" >
                    <gy-order-transaction @updateQuantityIssued="updateQuantityIssued" :order-data="info" :order-id="orderId" user-type='sell'></gy-order-transaction>
                </el-tab-pane>
                <el-tab-pane label="物流明细" name="four">
                    <gy-order-logistic :order-id="orderId" user-type="sell"></gy-order-logistic>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import gyOrderInfo from './components/order-info';
import gyOrderPayment from './components/order-payment';
import gyOrderDetail from './components/order-detail';
import gyOrderTransaction from './components/order-transaction';
import gyOrderLogistic from './components/order-logistic';
export default {
    name: 'sales-order',
    components: { gyOrderInfo, gyOrderDetail, gyOrderPayment, gyOrderTransaction, gyOrderLogistic },
    data () {
        return {
            orderId: this.$route.query.orderId,
            activeName: 'first',
            stepData: {},
            orderData: {},
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            dialogFormVisible: false,
            orderStatusStepitem: {},
            orderStatusStepModel: {},
            isSign: true, // 只有签约时值为true
            info: {},
            quantityIssued: 0,
            item: [],
            orderItemList: [],
            outNum: '',
            itemList: [],
            stepList: [
                {
                    id: 1,
                    name: '确认',
                    active: true
                }
            ]
            // Model: {orderExecuteSubStatusModel:{}}
        };
    },
    created () {
        this.getInfo(); // 基础信息
    },
    methods: {
        getInfo () {
            let that = this;
            that.$http.get(that.$api.orders.detail + '/' + that.orderId).then(res => {
                if (res.data.code === 0) {
                    // let rsData = res.data.data;
                    // let currentStatusName = rsData.currentOrderExecuteStageModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel &&rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel.sellerWorkFlowStatus;
                    // let currentStatus = [
                    //     {
                    //         name: currentStatusName && currentStatusName.replace(/\\n/g, '<br>'),
                    //         remark: ''
                    //     }
                    // ];
                    // let list = [];
                    //
                    //
                    // if(rsData.currentOrderExecuteStageModel) {
                    //     if (rsData.currentOrderExecuteStageModel.id === 1) {
                    //         list = currentStatus;
                    //     } else {
                    //         let listData = [];
                    //         rsData.orderStatusHistoryModelList.map(item => {
                    //             item.name = item.sellerWorkFlowStatus;
                    //             listData.push(item)
                    //         });
                    //         listData = listData.filter(item => {
                    //             item.name = item.sellerWorkFlowStatus && item.sellerWorkFlowStatus.replace(/\\n/g, '<br />');
                    //             return rsData.currentOrderExecuteStageModel.id === item.orderExecuteStageId && item.sellerWorkFlowStatus
                    //         });
                    //         list = listData;
                    //     }
                    // }
                    // this.stepData = {
                    //     active: 0,
                    //     done: false,
                    //     title: rsData.currentOrderExecuteStageModel && rsData.currentOrderExecuteStageModel.name,
                    //     tips: rsData.currentOrderExecuteStageModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel.sellerMessage,
                    //     list: list,
                    //     btnList: (rsData.currentOrderExecuteStageModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel.allowedFunctionsModelList) || []
                    // };
                    // // this.orderData = Object.assign({orderType: "sell"}, rsData);

                    this.info = res.data.data;
                    that.orderItemList = res.data.data.orderItemList;
                    that.currentOrderExecuteStageModel = res.data.data.currentOrderExecuteStageModel;
                    that.select(that.currentOrderExecuteStageModel.allowedFunctionsModelList);
                } else {
                    that.$message('服务器繁忙');
                }
            });
        },
        dataFiter (res) { // 处理返回数据
            // let that = this;
            // that.info = res.data.data;
            // that.orderItemList = res.data.data.orderItemList;
            // that.Model = res.data.data.currentOrderExecuteStageModel;
            // that.select(that.Model.orderExecuteSubStatusModel.allowedFunctionsModelList);
        },
        select (state) {
            // let that = this;
            // for (var i = 0; i < state.length; i++) {
            //     if (state[i].tradeSide === '卖方') {
            //         that.btnList.push(state[i]);
            //     }
            // }
        },
        // uploadImg (file) {
        //     let that = this;
        //     let formData = new FormData();
        //     let headers = {
        //         'Content-Type': 'multipart/form-data'
        //     };
        //     formData.append('file', file.file);
        //     formData.append('storage', 'platform-mgmt');
        //     that.$http.post(that.$api.order.deliverUp, formData, headers)
        //         .then(function (res) {
        //             that.imageUrl = res.data;
        //             that.isReupload = true;
        //         });
        // },
        signOrder (data) {
            // this.$http.
        },
        updateQuantityIssued (data) {
            this.quantityIssued = data;
        },
        showContract () {
            // this.$refs.orderStep.buyerReviewContract();
        }
    }
};
</script>
<style  lang="scss">
    .icon-info {
        margin-right: 7px;
    }
    .order-detail{
        padding-bottom: 25px;
        .createPayment-status-right button{margin-left:3px}
        .el-card__header {
            padding: 10px 20px;
            .title {
                color: $color-title;
                font-size: 16px;
                font-weight: 700;
                margin-right: 24px
            }
        }
        .im-talk{ color:$color-highlight;
            cursor: pointer;
            padding-left:10px;
            .iconfont{
                color:$color-highlight;
                padding-right:2px;
            }
        }
        .iconfont{font-weight: lighter;color:$color-minor;}
        .sign .line{height:0;}
        .bright{float:right;}
        .order-state{
            li {
                float:left;
                width:auto;
                color:$color-minor;
                padding-left:6px;
                &.active{
                    color:$color-highlight
                }
            }
        }
        .billStatus {
            width: 30%;
            display: flex;
            padding:20px;
            min-height: 100px
        }
        .billStatus-active {
            margin-left: -10px;
        }
        .billStatus-unactive {
            position: relative;
            span {
                position: absolute;
                top: 17px;
                left: 64px;
                white-space: nowrap;
                color:$color-minor;
            }
        }
        .yel{
            color:$color-highlight
        }
        .base-info{
          padding: 0 14px;
          &:after {
            display: block;
            content: ' ';
            clear: both;
          }
        }
        .base-info dl,.dialog dl{
            width:50%;
            float:left;
            line-height: 30px;
            text-align: left;
            min-height: 42px;
            padding: 6px 0;
            margin:0;
            dt{
                width:84px;
                float:left;
                color:$color-title;
            };
            dd{
                float:left;
                color:$color-main;
                padding-left:10px;
                img{
                    width:30px;
                    height:30px;
                    margin-left:10px;
                    border:1px solid $color-border;
                    border-radius: $border-radius-small;
                    cursor:pointer;
                }
            }
        }
        .dialog dl dt{width:84px;}
        .el-dialog__body {padding-top:16px;}
        .order-step .step-active{float:left}
        .billStatus-active{
            position: absolute;
            width: 70px;
            text-align: center;
            margin-left: -24px;
            font-size: 10px;
            color:$color-minor;
        }
        .active .billStatus-active{
            color:#000;
        }
        .state-pannel{position:relative}
        .state-pannel .tips{position: absolute;bottom:0px;left:10px;color:#2A2A2A}
        .tips span:first-child{color:#EEA443}
        .tips span.bill{color:#4A90E2;padding-left:5px}
        .tips img{width:35px;height:35px;vertical-align: bottom;margin-left:10px;}
        .tabs,.dialog {
            margin-top: 16px;
            .el-tabs__item.is-active {
                position: relative;
                bottom: -1px;
                z-index: 20;
                box-sizing: border-box;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border: 1px solid $color-border;
                border-bottom: 1px solid #fff;
                color: $color-title;
            }

            .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
                padding-left: 20px;
            }

            .el-tabs--top .el-tabs__item.is-top:last-child {
                padding-right: 20px;
            }

            .el-tabs__item:hover {
                color: $color-title;
            }

            .el-tabs__item {
                color: $color-main;
            }

            .el-tabs__nav-wrap::after {
                height: 1px;
            }

            .el-tabs__active-bar {
                background-color: #fff;
            }
            .el-tabs__header{
                margin:0;
            }
            table{
                width:100%;
                border-collapse: collapse;
                border:1px solid $color-border;
                color:$color-main;
                font-size: $small-font;
            }
            table td{
                height:40px;
                line-height:16px;
                padding-left:10px;
            }
            table .ge td{
                line-height:20px;
            }
            .transaction tr:not(:first-child) td{border:1px solid $color-border}
            .transaction tr td{padding:10px }
            td .img-box{
                float:left;
                border:1px solid $color-border;
                margin-right:20px;
                img{
                    width:58px;
                    height:58px;
                }
            }
        }
        .total-detail{
            float:right;
            width:205px;
            margin:14px;
            dl{
                font-size:$small-font;
                color:$color-title;
                overflow: hidden;
                padding: 6px 0;
                height:26px;
                line-height: 1;
            }
            dl:last-child{
                font-size: $body-font-size;
                color:$color-title;
                font-weight:bold;
            }
            hr{
                height:1px;
                border:none;
                border-top:1px solid $color-border;
            }
            dt,dd{
                float:left;
                text-align: right;
            }
            dt{
                width:75px;
            }
            dd{
                text-align: left;
                margin-left:10px;
            }
        }
        .el-card__body{
            padding:10px 20px;
        }
        .dialog .base-info{overflow: hidden;margin-bottom:20px;}
        .dialog input{width:80px;}
        .dialog .el-upload--picture-card{
            width:40px;
            height:40px;
            line-height: 40px;
            i{font-size: 17px}
        }
        .dialog dl dd .el-upload-list__item{width:40px;height:40px;
            img{width:40px;height:40px;margin-left:0}
        }
    }
    .el-dialog__body{
        border-top:1px solid $color-border;
    }
</style>
