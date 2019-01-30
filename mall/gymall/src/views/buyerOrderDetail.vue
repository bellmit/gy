<template>
    <div class="order">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">采购订单</span>
                <span>订单号：2018052700058</span>
                <div class="right">
                    <ul class="order-state">
                        <li class="active">签约 ></li>
                        <li>收款与交割 ></li>
                        <li>结算与复核 ></li>
                        <li>完成</li>
                    </ul>
                </div>
            </div>
            <template>
                <div class="state-pannel">
                    <div class="createPayment-status createPayment-common clearfix">
                        <div class="createPayment-status-left">
                            <div class="">
                                <i class="iconfont icon-record"></i>
                                <span class="createPayment-status-left-tit">签约</span>
                            </div>
                            <div class="billStatus " :class="{sign: isSign}">
                                <step step="1" isActive="true">
                                    <div class="billStatus-active">待确认</div>
                                </step>
                            </div>
                            <p class="tips"><span>温馨提示：</span>卖家向您发起订单，请查阅并确认或驳回。 <span class="bill">合同预览</span><img :src=icon></p>
                        </div>
                        <div class="createPayment-status-right fr">
                            <button class="gy-button-extra">确认</button>
                            <button class="gy-button-normal">驳回</button>
                        </div>
                    </div>
                </div>
            </template>
            <!--<template v-if="display">-->
            <!--<div class="state-pannel">-->
            <!--<div class="createPayment-status createPayment-common clearfix">-->
            <!--<div class="createPayment-status-left">-->
            <!--<div class="">-->
            <!--<i class="iconfont icon-sign"></i>-->
            <!--<span class="createPayment-status-left-tit">收款与交割</span>-->
            <!--</div>-->
            <!--<div class="billStatus ">-->
            <!--<step step="1" isActive="true">-->
            <!--<div class="billStatus-active">待付保证金</div>-->
            <!--</step>-->
            <!--<step step="2" isRight="false">-->
            <!--<div class="billStatus-active billStatus-unactive"><span>待收货</span></div>-->
            <!--</step>-->
            <!--</div>-->
            <!--<p class="tips"><span>温馨提示：</span>-->
            <!--&lt;!&ndash;<span>订单已确认，根据合同约定，请支付保证金。</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span>您已创建付款单，请联系财务付款。</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span>您已支付保证金，等待卖家确认。</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span>卖家已确认收到保证金，等待卖家发货。</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span>卖家已发货，请签收<span class="bill">货物交割单</span><img :src=icon></span>&ndash;&gt;-->
            <!--<span>货物已签收完成，买家可继续付款或提醒卖家发货。</span>-->
            <!--</p>-->
            <!--</div>-->
            <!--<div class="createPayment-status-right fr">-->
            <!--&lt;!&ndash;<button class="gy-button-extra">付款</button>&ndash;&gt;-->
            <!--&lt;!&ndash;<button class="gy-button-extra">催发货</button>&ndash;&gt;-->
            <!--<template >-->
            <!--<button class="gy-button-normal">付款</button>-->
            <!--<button class="gy-button-extra">确认收货</button>-->
            <!--<button class="gy-button-normal">催发货</button>-->
            <!--</template>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</template>-->
            <!--<template >-->
            <!--<div class="state-pannel">-->
            <!--<div class="createPayment-status createPayment-common clearfix">-->
            <!--<div class="createPayment-status-left">-->
            <!--<div class="">-->
            <!--<i class="iconfont icon-sign"></i>-->
            <!--<span class="createPayment-status-left-tit">结算与复核状态</span>-->
            <!--</div>-->
            <!--<div class="billStatus ">-->
            <!--<step step="1" isActive="true" >-->
            <!--<div class="billStatus-active">结算</div>-->
            <!--</step>-->
            <!--<step step="2" isRight="false">-->
            <!--<div class="billStatus-active billStatus-unactive"><span>清余数</span></div>-->
            <!--</step>-->
            <!--</div>-->
            <!--<p class="tips"><span>温馨提示：</span>收款与交割已完成，请等待卖家发起结算。</p>-->
            <!--<p class="tips"><span>温馨提示：</span>卖家已发起结算，请确认。<span class="bill">结算明细</span></p>-->
            <!--<p class="tips"><span>温馨提示：</span>根据结算结果，请付余款。</p>-->
            <!--<p class="tips"><span>温馨提示：</span>您已支付余款，请等待卖家确认。</p>-->
            <!--</div>-->
            <!--<div class="createPayment-status-right fr">-->
            <!--<button class="gy-button-extra">确认</button>-->
            <!--<button class="gy-button-normal">驳回</button>-->
            <!--<button class="gy-button-extra">付款</button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</template>-->
        </el-card>
        <el-card class="box-card" style="margin-top:10px">
            <p class="state-title"><i class="iconfont icon-info"></i>  订单信息</p>
            <el-row>
                <el-col :span="24">
                    <div class="base-info">
                        <dl>
                            <dt>卖家</dt>
                            <dd>{{info.sellerCompanyName}} <span class="im-talk"><i class="iconfont icon-im"></i>和我联系</span></dd>
                        </dl>
                        <dl>
                            <dt>免仓期</dt>
                            <dd>{{info.warehouseFreeDays}}天</dd>
                        </dl>
                        <dl>
                            <dt>交付方式</dt>
                            <dd>{{info.deliveryType === 0 ? '买家自提、卖家代运都可以' : info.deliveryType === 1 ? '买家自提' : '卖家代运'}}</dd>
                        </dl>
                        <dl>
                            <dt>是否分批</dt>
                            <dd>{{info.isBatchDelivery === 0 ? '否' :'是'}}</dd>
                        </dl>
                        <dl>
                            <dt>溢短装</dt>
                            <dd>±{{info.shortOverflowRate}}%</dd>
                        </dl>
                        <dl>
                            <dt>付款方式</dt>
                            <dd>{{info.paymentType === 1 ? '线下转账' : '线上支付'}}</dd>
                        </dl>
                        <dl>
                            <dt>保证金</dt>
                            <dd>{{info.depositRatio}}%</dd>
                        </dl>

                        <dl>
                            <dt>追加保证金</dt>
                            <dd>跌{{info.depositRatioSubtract}}%保{{info.depositRatioAppend}}%</dd>
                        </dl>
                        <dl>
                            <dt>发票</dt>
                            <dd>{{info.provideInvoiceType ? '交割月发票':'交割次月' }}<img :src=icon></dd>
                        </dl>
                        <dl>
                            <dt>货源</dt>
                            <dd>字段没定--------</dd>
                        </dl>
                        <dl>
                            <dt>质量标准</dt>
                            <dd>字段没定--------</dd>
                        </dl>
                        <dl>
                            <dt>包装标准</dt>
                            <dd>字段没定--------</dd>
                        </dl>
                        <dl>
                            <dt>数量验收标准</dt>
                            <dd>字段没定--------</dd>
                        </dl>
                        <dl>
                            <dt>业务联系人</dt>
                            <dd>字段没定--------</dd>
                        </dl>
                        <dl>
                            <dt>合同编号</dt>
                            <dd>3647840<img :src=icon></dd>
                        </dl>
                        <dl>
                            <dt>业务联系方式</dt>
                            <dd>{{info.updatedDate| date}}</dd>
                        </dl>
                    </div>
                </el-col>
            </el-row>
            <div class="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="订单明细" name="first">
                        <table>
                            <tr>
                                <td>商品名称</td>
                                <td>单价</td>
                                <td>数量</td>
                                <td>交货期</td>
                                <td>交割地</td>
                                <td>总额</td>
                            </tr>
                            <tr v-for="(item, index) in orderItemList" :key="index">
                                <td>{{item.skuName}}</td>
                                <td>{{info.intCurrencyMark}}{{item.skuPrice}}万/{{item.infUnitOfMeasureDisplayName}}</td>
                                <td>{{item.skuQuantity}}{{item.infUnitOfMeasureDisplayName}}</td>
                                <td>{{item.deliveryBeginDate| date}}至{{item.deliveryEndDate|date}}</td>
                                <td>{{item.deliveryWarehouseName}}</td>
                                <td>{{info.intCurrencyMark}}{{item.skuTotalAmount}}万</td>
                            </tr>
                        </table>
                        <div class="total-detail">
                            <dl>
                                <dt>货款总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.settlementTotal}}万</dd>
                            </dl>
                            <dl>
                                <dt>保证金总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.depositAmount}}万</dd>
                            </dl>
                            <hr/>
                            <dl>
                                <dt>总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.totalAmount}}万</dd>
                            </dl>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="付款明细" name="third">
                        <table>
                            <tr>
                                <td>付款单号</td>
                                <td>付款日期</td>
                                <td>付款金额</td>
                                <td>付款类型</td>
                                <td>侍款单状态</td>
                                <td>操作</td>
                            </tr>
                            <tr>
                                <td>180021545</td>
                                <td>2018-05-21</td>
                                <td>¥20.00万</td>
                                <td>保证金</td>
                                <td>已支付</td>
                                <td><router-link :to="{name:'paymentInfo', query:''}"  class="yel">查看</router-link></td>
                            </tr>
                            <tr>
                                <td>180021545</td>
                                <td>2018-05-21</td>
                                <td>¥20.00万</td>
                                <td>保证金</td>
                                <td>已支付</td>
                                <td><router-link :to="{name:'paymentInfo', query:''}" class="yel">查看</router-link></td>
                            </tr>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="货物交割" name="fourth">
                        <table class="transaction">
                            <tr>
                                <td style="width:280px">商品</td>
                                <td>发货数量</td>
                                <td>签收数量</td>
                                <td style="width:228px">发货仓库</td>
                                <td>操作</td>
                            </tr>
                            <tbody>
                            <tr class="update-title">
                                <td colspan="6">单号:HZ1805521</td>
                            </tr>
                            <tr class="ge">
                                <td class="tleft">
                                    <div class="img-box">
                                        <img :src=src1 alt=""></div>
                                    二甘醇<br>¥1200元/吨<br>1500吨</td>
                                <td>150,000 <br></td>
                                <td>150,000</td>
                                <td>发货仓库：上海国烨化工品库<br>发货时间：2018-05-28  09:45:29<br>签收时间：2018-05-29  10:35:12</td>
                                <td>
                                    <button class="gy-button-normal">查看</button>
                                </td>
                            </tr>
                            <tr class="ge">
                                <td class="tleft"><div class="img-box"><img :src=src alt=""></div>柴油<br>¥1200元/吨<br>1500吨</td>
                                <td>150,000 <br></td>
                                <td>150,000</td>
                                <td>发货仓库：上海国烨化工品库<br>发货时间：2018-05-28  09:45:29<br>签收时间：2018-05-29  10:35:12</td>
                                <td>
                                    <button class="gy-button-normal">查看</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="物流明细" name="five">物流明细的内容</el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
    </div>
</template>

<script>
// import step from '../../components/step';
export default {
    name: 'sales-order',
    // components: { step },
    data () {
        return {
            activeName: 'first',
            // src1: require('../../assets/images/default1.jpg'),
            // src: require('../../assets/images/default.jpg'),
            // icon: require('../../assets/images/icon-piao.png'),
            isSign: true, // 只有签约时值为true
            info: {
            },
            item: [],
            orderItemList: []
        };
    },
    created () {
        let that = this;
        that.orderId = that.$route.query.oderId;
        that.getInfo();
        that.getPayDetail();
    },
    methods: {
        getInfo () {
            let that = this;
            that.$http.get(that.$api.sale.detail + '/' + that.orderId).then(function (res) {
                that.info = res.data.data;
                that.orderItemList = res.data.data.orderItemList;
            });
        },
        // getPayDetail (){},
        handleClick (tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style  lang="scss">
    .order{
        width: 1200px;
        height: auto;
        margin: 10px auto;
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
        .right{float:right;}
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
        .base-info{margin:10px;}
        .base-info dl{
            width:50%;
            float:left;
            font-size: $small-font;
            text-align: left;
            min-height: 30px;
            margin:0;
            dt{
                width:80px;
                float:left;
                margin: auto 10px;
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
        .tabs {
            margin-top:50px;
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
            table tr:nth-child(odd) td{
                background-color:#F2F3F7 ;
            }
            table tr:first-child td{
                padding-left:10px;
                height:40px;
                background-color:#EEF3F8 ;
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
            .transaction tr td{padding:10px;text-align: center;  }
            .transaction  tr.update-title td{background:#fbfbfc;text-align: left;padding:0 10px 0;}
            .transaction tr td.tleft{text-align: left;padding-left:10px;}
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
            width:230px;
            margin:20px;
            dl{
                font-size:$small-font;
                color:$color-title;
                overflow: hidden;
                height:26px;
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
                width:92px;
            }
            dd{
                width:88px;
                text-align: left;
                margin-left:44px;
            }
        }
        .el-card__body{
            padding:10px 20px;
        }
    }
</style>
