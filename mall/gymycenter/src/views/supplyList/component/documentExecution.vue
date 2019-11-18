<template>
    <!--单证执行信息-->
    <div>
        <div class="document-execution-info">
            <div class="title-wrapper"
                 @click="documentExecutionInfo = !documentExecutionInfo">
                <i class="iconfont icon-icon-fapiao"></i><span
                class="gy-h5">服务执行<i
                class="el-icon-arrow-down"
                :class="{'el-rotate' : documentExecutionInfo}"
            ></i></span>
            </div>
            <div class="document-execution-info-content" v-show="documentExecutionInfo">
                <div class="order-type">销售订单<a
                    class="gy-link" v-if="!supply.sellOrderModel"
                    @click="$router.push({name: 'reAdd', query: {orderId: $route.query.id, typeId: supply.scsAppModel.serviceTypeId === 2 ? 8 : 6}})"><i
                    class="el-icon-circle-plus-outline"></i>创建销售订单</a></div>
                <div style="margin-bottom: 15px" v-if="supply.sellOrderModel">
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <td style="width: 230px">商品</td>
                            <td style="width: 270px">买方公司</td>
                            <td style="width: 117px">总金额(元)</td>
                            <td style="width: 100px">交付方式</td>
                            <td style="width: 120px">状态</td>
                            <td style="width: 110px">操作</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="order-num">
                            <td colspan="6"><span style="color: #999">单号: </span>{{supply.sellOrderModel.odrOrderSn}}
                                <div class="fr" style="color: #999">{{supply.sellOrderModel.createdDate | date(1)}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: middle">
                                <div class="commodity">
                                    <div class="commodity-img"><img
                                        v-if="supply.sellOrderModel.orderItemList[0].skuPictureUrl"
                                        :src=supply.sellOrderModel.orderItemList[0].skuPictureUrl alt=""><div
                                        v-else style="width: 56px;height: 56px;border: 1px solid #f5f5f5"></div>
                                    </div>
                                    <div class="commodity-content">
                                        <div>{{supply.sellOrderModel.orderItemList[0].skuName}}<br>{{supply.sellOrderModel.orderItemList[0].intCurrencyMark}}
                                            {{supply.sellOrderModel.orderItemList[0].skuPrice|numToCash}} 元/{{supply.sellOrderModel.orderItemList[0].infUnitOfMeasureDisplayName}}
                                            <br>{{supply.sellOrderModel.orderItemList[0].skuQuantity
                                            | numToCash(3)}} {{supply.sellOrderModel.orderItemList[0].infUnitOfMeasureDisplayName}}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{{supply.sellOrderModel.buyerCompanyName}}</td>
                            <td class="align-r">{{supply.sellOrderModel.intCurrencyMark}}{{supply.sellOrderModel.orderItemList[0].skuTotalAmount|numToCash}}</td>
                            <td>{{supply.sellOrderModel.deliveryType === 1 ? '买家自提' : supply.sellOrderModel.deliveryType === 2? '卖家送货':'全部支持'}}</td>
                            <td>
                                <span v-if="supply.sellOrderModel.orderStatus===1">签约</span>
                                <span v-else-if="supply.sellOrderModel.orderStatus===2">收款与交割</span>
                                <span v-else-if="supply.sellOrderModel.orderStatus===3">结算与复核</span>
                                <span v-else-if="supply.sellOrderModel.orderStatus===4">已完成</span>
                                <span v-else-if="supply.sellOrderModel.orderStatus===5">已失效</span>
                            </td>
                            <td class="align-c">
                                <a @click="goPage(supply.sellOrderModel, false)" style="margin-bottom:5px;" class="gy-button-view">查看</a>
                                <div>
                                    <router-link target="_blank" :to="{ name: 'saleschaseBills',
                                        query: {odrOrderSn: supply.sellOrderModel.odrOrderSn, orderId: supply.sellOrderModel.id, showBillIcon: 3, supply: 1} }"
                                                 class="gy-button-view">单据监控
                                    </router-link>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="order-type">采购订单<a
                    class="gy-link" v-if="!supply.purchaseOrderModel"
                    @click="$router.push({name: 'reAdd', query: {orderId: $route.query.id, typeId: supply.scsAppModel.serviceTypeId === 2 ? 7 : 5}})"><i
                    class="el-icon-circle-plus-outline"></i>创建采购订单</a></div>
                <div style="margin-bottom: 10px" v-if="supply.purchaseOrderModel">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <td style="width: 230px">商品</td>
                        <td style="width: 270px">卖方公司</td>
                        <td style="width: 117px">总金额(元)</td>
                        <td style="width: 100px">交付方式</td>
                        <td style="width: 120px">状态</td>
                        <td style="width: 110px">操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="order-num">
                        <td colspan="6"> <span style="color: #999">单号:  </span>{{supply.purchaseOrderModel.odrOrderSn}} <span
                            class="fr" style="color: #999">{{supply.purchaseOrderModel.createdDate| date(1)}}</span></td>
                    </tr>
                    <tr>
                        <td>
                            <div class="commodity">
                                <div class="commodity-img"><img
                                    v-if="supply.purchaseOrderModel.orderItemList[0].skuPictureUrl"
                                    :src=supply.purchaseOrderModel.orderItemList[0].skuPictureUrl alt=""><div
                                    v-else style="width: 56px;height: 56px;border: 1px solid #f5f5f5"></div>
                                </div>
                                <div class="commodity-content">{{supply.purchaseOrderModel.orderItemList[0].skuName}}<br>{{supply.purchaseOrderModel.orderItemList[0].intCurrencyMark}}
                                    {{supply.purchaseOrderModel.orderItemList[0].skuPrice |numToCash}} 元/{{supply.purchaseOrderModel.orderItemList[0].infUnitOfMeasureDisplayName}}<br>
                                    {{supply.purchaseOrderModel.orderItemList[0].skuQuantity |numToCash(3)}} {{supply.purchaseOrderModel.orderItemList[0].infUnitOfMeasureDisplayName}}
                                </div>
                            </div>
                        </td>
                        <td>{{supply.purchaseOrderModel.sellerCompanyName}}</td>
                        <td class="align-r">{{supply.purchaseOrderModel.intCurrencyMark}}
                            {{supply.purchaseOrderModel.orderItemList[0].skuTotalAmount|numToCash}}</td>
                        <td>{{supply.purchaseOrderModel.deliveryType === 1 ? '买家自提' :
                            supply.purchaseOrderModel.deliveryType === 2? '卖家送货':'全部支持'}}</td>
                        <td>
                            <span v-if="supply.purchaseOrderModel.orderStatus===1">签约</span>
                            <span v-else-if="supply.purchaseOrderModel.orderStatus===2">收款与交割</span>
                            <span v-else-if="supply.purchaseOrderModel.orderStatus===3">结算与复核</span>
                            <span v-else-if="supply.purchaseOrderModel.orderStatus===4">已完成</span>
                            <span v-else-if="supply.purchaseOrderModel.orderStatus===5">已失效</span>
                        </td>
                        <td class="align-c">
                            <a @click="goPage(supply.purchaseOrderModel, true)" style="margin-bottom:5px;" class="gy-button-view">查看</a>
                            <div>
                                <router-link target="_blank" :to="{ name: 'purchaseBills', query: {odrOrderSn: supply.purchaseOrderModel.odrOrderSn, orderId: supply.purchaseOrderModel.id, showBillIcon: 3, supply: 1} }"
                                             class="gy-button-view">单据监控
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div class="gy-btn-group" v-if="supply.sellOrderModel && (supply.purchaseOrderModel || supply.scsAppModel.serviceTypeId === 3) && !supply.appDisposalModel && supply.scsAppModel.status < 40">
                    <button type="button" class="gy-button-extra" @click="setManagement(true)">发生违约</button><button
                    type="button" class="gy-button-normal" @click="enforcementDia">服务完成</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'documentExecution',
    props: {supply: Object},
    data () {
        return {
            documentExecutionInfo: true
        };
    },
    methods: {
        // 单证执行
        enforcement () {
            const params = {
                'id': this.$route.query.id,
                'status': 99
            };
            this.$http.put(this.$api.supply.enforcement, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        enforcementDia () {
            this.$confirm('是否确认该供应链服务已正常完成?', '服务完成', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.enforcement();
            }).catch(() => {
            });
        }
    },
    inject: ['setManagement', 'init', 'goPage'],
    filters: {
        date: function (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '--';
            }
            let y, m, d, date, h, ms, s, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            data = y + '-' + format(m) + '-' + format(d);
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            if (hour) {
                return data + ' ' + hours;
            } else {
                return data;
            }
            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .document-execution-info-content {
        .order-type {
            padding: 0 38px 8px;
            .gy-link {
                padding-left: 60px;
                cursor: pointer;
                i{
                    position: relative;
                    top: 2px;
                    font-size: 16px;
                    margin-right: 8px;
                }
            }
        }
        .gy-table {
            thead{
                tr{
                    td{
                        height: 36px;
                        line-height: 1;
                    }
                }
            }
            .order-num {
                background-color: #fbfbfc;
                height: 36px;
                &:hover, & > td {
                    padding: 0 16px;
                    vertical-align: middle;
                    background-color: #fbfbfc !important;
                    border:0;
                }
            }
            tbody {
                tr:hover, td:hover {
                    background-color: #fff;
                }
                td {
                    vertical-align: top;
                }
                .gy-button-view:not(:first-child){
                    margin-top: 3px;
                }
            }
        }
    }
    .title-wrapper {
        padding: 15px 16px 9px 20px!important;
        .iconfont {
            display: inline-block;
            width: 16px;
            margin-left: -6px;
            font-size: 14px;
        }
    }
</style>
