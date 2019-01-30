<template>
    <div class="point-list">
        <div class="collect">
            <div class="box">
                <div class="title">收货信息</div>
                <div class="content">
                    <div class="item">
                        <div class="left">姓名</div>
                        <div class="right">{{orders.receiveName}}</div>
                    </div>
                    <div class="item">
                        <div class="left">手机号</div>
                        <div class="right">{{orders.receivePhone}}</div>
                    </div>
                    <div class="item">
                        <div class="left">收货地址</div>
                        <div class="right">{{orders.provinceName + orders.cityName + orders.districtName + orders.address}}</div>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="title">兑换单信息</div>
                <div class="content">
                    <div class="item">
                        <div class="left">兑换单编号</div>
                        <div class="right">{{orders.pointNoteCode}}</div>
                    </div>
                    <div class="item">
                        <div class="left">兑换时间</div>
                        <div class="right">{{orders.createdDate | date(orders.createdDate)}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg">
            <div class="p-20">
                <div class="head">
                    商品信息
                </div>
                <div>
                    <table style="margin-top: 0;" class="gy-table">
                        <thead>
                        <tr class="title">
                            <th style="width:260px">兑换信息</th>
                            <th style="width:100px">数量</th>
                            <th style="width:100px">单价</th>
                            <th style="width:150px">兑换单状态</th>
                            <th style="width:150px">总积分</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="list">
                            <td>
                                <div>
                                    <div class="content">
                                        <img :src="orders.odrPointNoteItemModelList[0].redemptionFilePath" alt="">
                                        <div class="text">{{orders.odrPointNoteItemModelList[0].redemptionName}}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>{{orders.odrPointNoteItemModelList[0].redemptionQuantity}}</div>
                            </td>
                            <td>
                                <div>{{orders.odrPointNoteItemModelList[0].redemptionPrice}}积分</div>
                            </td>
                            <td>
                                <div>
                                    <div>{{orderStatus[orders.status]}}</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div>
                                        {{orders.odrPointNoteItemModelList[0].redemptionTotalAmount}}积分
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="clearfix">
                        <span class="total">
                            总价:{{orders.odrPointNoteItemModelList[0].redemptionTotalAmount}}积分
                        </span>
                    </div>
                </div>
            </div>

            <div class="p-20">
                <div class="head">
                    物流公司
                </div>
                <div v-if="logistics.list.length !== 0" style="padding-top: 15px;">
                    <div class="wrapper">
                        <div class="title">物流公司:</div>
                        <div class="text">{{logistics.logisticsName}}</div>
                    </div>
                    <div class="wrapper">
                        <div class="title">物流单号:</div>
                        <div class="text">{{logistics.logisticsNumber}}</div>
                    </div>
                    <div class="wrapper">
                        <div class="title">物流详情:</div>
                        <div class="text">
                            <div class="list-item" v-for="item in logistics.list" :key="item.date">
                                <div class="list-icon">
                                    <div></div>
                                </div>
                                <div class="list-date">{{item.time}}</div>
                                <div>{{item.context}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div>暂无物流信息</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderDetail',
    data () {
        return {
            orderStatus: ['', '待发货', '配送中', '交易完成'],
            orders: {
                receiveName: null,
                receivePhone: null,
                provinceName: null,
                lgsExpressCompanyId: null,
                logisticsNumber: null,
                cityName: null,
                address: null,
                districtName: null,
                pointNoteCode: null,
                createdDate: null,
                status: null,
                odrPointNoteItemModelList: [
                    {
                        redemptionFilePath: null,
                        redemptionName: null,
                        redemptionQuantity: null,
                        redemptionPrice: null,
                        redemptionTotalAmount: null
                    }
                ]
            },
            logistics: {
                logisticsName: '',
                logisticsNumber: '',
                list: []
            },
            dialogVisible: false
        };
    },
    created () {
        // 获取订单信息
        let locationurl = location.href.split('?')[1];
        let ordernum;
        if (locationurl) {
            ordernum = locationurl.split('=')[1] ? locationurl.split('=')[1] : null;
            if (ordernum) {
                this.getDetail(ordernum);
            }
        }
    },
    methods: {
        // 获取订单详情
        getDetail (ordernum) {
            this.$http.get(this.$api.point.orderDetail + ordernum).then((res) => {
                if (res.data.code === 0) {
                    this.orders = res.data.data;
                    this.getlogistics();
                }
            });
        },
        // 获取物流信息
        getlogistics () {
            let query = {
                lgsExpressCompanyId: this.orders.lgsExpressCompanyId, // id
                logisticsNumber: this.orders.logisticsNumber // 单号
            };
            this.$http.post(this.$api.point.logistics, query).then((res) => {
                if (res.data.code === 0) {
                    this.logistics.logisticsName = res.data.data.name;
                    this.logistics.logisticsNumber = res.data.data.nu;
                    this.logistics.list = res.data.data.data.reverse();
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .point-list {
        margin: 0 auto;
        .head {
            padding: 5px 0;
            font-size: 15px;
            color: #333;
            font-weight: 600;
        }
        .bg {
            background: #fff;
        }
    }

    table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
        td {
            padding: 5px 20px;
            color: $color-main;
            text-align: left;
            font-size: 12px;
            border: 0;
            vertical-align: middle;
        }
        .list-head {
            background: #fbfbfc;
            border: 1px solid $color-border;
            border-bottom: 0;
            .left {
                float: left;
            }
            .right {
                float: right;
            }
            span {
                color: $color-minor;
            }
        }
        .list {
            border: 1px solid $color-border;
            border-top: 0;
            vertical-align: top;
        }
        .title {
            background-color: #EEF3F8;
            border: 0;
        }
        .content {
            display: flex;
            padding: 10px;
            img {
                flex: 0 0 56px;
                border: 1px solid $color-border;
                height: 56px;
            }
            .text {
                flex: 0 0 1;
                padding: 6px 0 0 15px;
                box-sizing: border-box;
                text-align: left;
            }
        }
    }
        .total {
            float: right;
            font-size: 15px;
            font-weight: 600;
        }
    .wrapper {
        display: flex;
        .title {
            flex: 0 0 70px;
        }
        .text {
            flex: 1;
            width: 100%;
            overflow: hidden;
            .list-item {
                display: flex;
                height: 40px;
                .list-icon {
                    flex: 0 0 3px;
                    box-sizing: border-box;
                    background-color: #e4e7ed;
                    margin: 1px 10px 7px 10px;
                    position: relative;
                    top: 16px;
                    border-radius: 15px;
                    div {
                        position: absolute;
                        left: -2px;
                        top: -7px;
                        width: 6px;
                        height: 6px;
                        border-radius: 15px;
                        background-color: #e4e7ed;
                    }
                }

                &:last-child .list-icon {
                    background: none;
                    div {
                        background: $color-highlight;
                    }
                }
                div:nth-child(2) {
                    flex: 0 0 150px
                }
                div:nth-child(3) {
                    flex: 1;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    .collect {
        display: flex;
        padding: 20px 16px 0;
        text-align: left;
        background: #fff;
        .box {
            flex: 1;
            .title {
                height: 40px;
                font-size: 15px;
                color: #333;
                font-weight: 600;
            }
            .content {
                height: 90px;
                .item {
                    height: 30px;
                    display: flex;
                    .left {
                        flex: 0 0 120px;
                        font-weight: 600;
                    }
                    .right {
                        flex: 1;
                    }
                }
            }
        }
    }

    .p-20 {
        padding: 30px 16px;
    }
</style>
<style lang="scss">
    .point-warning {
        color: #fff;
        background-color: $color-highlight !important;
        border-color: $color-highlight !important;
    }

    .point-msgTitle .el-message-box__header {
        border-bottom: 1px solid $color-border;
    }

    .point-diallog .el-dialog__header {
        border-bottom: 1px solid $color-border;
    }
</style>
