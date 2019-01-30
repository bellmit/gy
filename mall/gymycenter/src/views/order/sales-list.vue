<template>
    <div class="order-list my-order-list new-date-format">
            <div class="new-title-public">
                销售订单
            </div>
            <div class="selected">
                <ul>
                    <li :class="{ active: newIndex==0 }" @click="toggleTabs(0)">全部</li>
                    <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)">签约({{data.signCount}})</li>
                    <li :class="{ active: newIndex==2 }" @click="toggleTabs(2)">
                        收款与交割({{data.collectionAndDeliveryCount}})
                    </li>
                    <li :class="{ active: newIndex==3 }" @click="toggleTabs(3)">
                        结算与复核({{data.settlementAndReviewCount}})
                    </li>
                    <li :class="{ active: newIndex==4 }" @click="toggleTabs(4)">已完成({{data.finishCount}})</li>
                    <li :class="{ active: newIndex==5 }" @click="toggleTabs(5)">已失效({{data.invalidCount}})</li>
                </ul>
                <div class="right">
                    <div class="search-box">
                        <input type="search" v-model="keywords" placeholder="请输入品名/单号">
                        <!--<button @click="search">搜索</button>-->
                        <i  @click="search" class="iconfont icon-search"></i>
                    </div>
                    <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i
                        class="iconfont icon-arrow-down"></i></span>
                </div>
            </div>
            <div class="selected-box" v-show="toggleSelect">
                <el-form>
                    <el-row :gutter="60">
                        <el-col :span="12">
                            <el-row class="newrel">
                                <el-col :span="4" class="left_spanmy">买方公司</el-col>
                                <el-col :span="20">
                                    <input placeholder="请输入" @click="blur22" type="text" class="gy-input" v-model="CompaniesCony" @keyup.enter="onelist1click2">
                                </el-col>
                                <el-col class="newabl" :span="1"> <i class="iconfont icon-mySearch"  @click="onelist1click2"></i></el-col>
                                <ul class="listul"  v-show="onelist2Show">
                                    <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                                        {{item.companyName}}
                                    </li>
                                    <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
                                </ul>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="4" class="left_spanmy">
                                    创建时间
                                </el-col>
                                <el-col :span="20" class="cjsj">
                                    <el-date-picker
                                        v-model="createDate"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder='开始时间'
                                        end-placeholder='结束时间'
                                        :picker-options="pickerOptions">
                                    </el-date-picker>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row  style="margin-top: 10px" :gutter="60">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="4" class="left_spanmy">付款方式</el-col>
                                <el-col :span="20">
                                    <el-select v-model="transactionType" placeholder="请选择">
                                        <el-option
                                            v-for="item in transactionOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="4" class="left_spanmy">交付方式</el-col>
                                <el-col :span="20">
                                    <el-select v-model="deliveryType" placeholder="请选择">
                                        <el-option
                                            v-for="item in deliveryTypeOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 9px" :gutter="60">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="4" class="left_spanmy">交割仓库</el-col>
                                <el-col :span="20">
                                    <input placeholder="请输入" type="text" v-model="deliveryWarehouseName">
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="search_btn">
                            <i class="iconfont icon-search" @click.stop.prevent="search"></i>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="mytable">
                <table>
                    <thead>
                    <tr class="title">
                        <td style="width:25%">商品</td>
                        <td style="width:15%">买方公司</td>
                        <td style="width:15%">总金额</td>
                        <td style="width:15%">交付方式</td>
                        <td style="width:15%">状态</td>
                        <td style="width:15%">操作</td>
                    </tr>
                    </thead>
                    <tbody v-for="(item , index) in data.orderList" :key="index">
                    <tr class="update-title">
                        <td colspan="6"> <span style="color: #999">单号：</span>{{item.odrOrderSn}} <span
                            class="right">{{item.createdDate| date('hour')}}</span></td>
                    </tr>
                    <tr v-for="(items, ind ) in item.orderItemList" :key="ind" v-if="ind===0">
                        <td style="width:25%" class="tleft myleft_dic">
                            <div class="img-box"><img :src=items.skuPictureUrl alt=""></div>
                            <div class="info-box">{{items.skuName}}<br>{{item.intCurrencyMark}}{{items.skuPrice|numToCash}}元/{{items.infUnitOfMeasureDisplayName}}<br>{{items.skuQuantity
                                | numToCash(3)}}{{items.infUnitOfMeasureDisplayName}}
                            </div>
                        </td>
                        <td style="width:15%" class="tleft">{{item.buyerCompanyName}}<br></td>
                        <td style="width:15%">{{item.intCurrencyMark}}{{items.skuTotalAmount|numToCash}}元</td>
                        <td style="width:15%">{{item.deliveryType === 1 ? '买家自提' : item.deliveryType === 2? '卖家送货':'全部支持'}}</td>
                        <td style="width:15%">
                            <span v-if="item.orderStatus===1">签约</span>
                            <span v-else-if="item.orderStatus===2">收款与交割</span>
                            <span v-else-if="item.orderStatus===3">结算与复核</span>
                            <span v-else-if="item.orderStatus===4">已完成</span>
                            <span v-else-if="item.orderStatus===5">已失效</span>
                        </td>
                        <td style="width:15%">
                            <a @click="goPage(item)" class="gy-button-view">查看</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="totaljl">
                    共{{data.total}}条记录
                </div>
                <div class="totalfy">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :total=total>
                    </el-pagination>
                </div>
            </div>
    </div>
</template>
<script>export default {
    data () {
        return {
            src: require('../../assets/images/default1.jpg'),
            offerCode: '',
            searchCode: '', // 查询订单号
            skuName: '', // 查询品名
            CompaniesCony: '',
            deliveryWarehouseName: '',
            restaurants: [],
            createDate: [], // 存时间
            Companies: [],
            total: 0, // 总条数
            pageNum: 1, // 当前条数
            newIndex: 0,
            keywords: '', // 品名或单号
            toggleSelect: false, // 高级搜索显示隐藏
            stateCode: '', // 存订单状态
            data: {},
            WarehouseName: '', // 存仓库名
            deliveryType: '',
            sellerCompanyId: JSON.parse(localStorage.getItem('userInfo')).companyId,
            parameter: {
                pageNum: 1,
                data: {
                    sellerCompanyId: this.sellerCompanyId,
                    flag: 2
                }
            },
            transactionType: '',
            deliveryTypeOption: [
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            transactionOption: [{
                value: 0,
                label: '先款后货'
            },
            {
                value: 1,
                label: '先货后款'
            }],
            state: {},
            seniorParam: {},
            pickerOptions: { // 日期
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            // TODO 突击修改
            phone: null,
            url: null,
            onelist2Show: false,
            onelist2: []
        };
    },
    created () {
        this.getInfo();
        // this.getCompanies();
        this.Warehouse();
    },
    // TODO 突击修改
    mounted () {
        this.phone = JSON.parse(localStorage.userInfo).phone;
        this.url = 'http://trade.chinayie.net/im/index.html#type=0&username=' + this.phone + '&touser=1';
        console.log(localStorage);
    },
    methods: {
        // 修改公司名称
        onelist1click2 () {
            var that = this;
            that.onelist2Show = true;
            that.$http.post(that.$api.order.creatOrderCompanies, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.CompaniesCony
            })
                .then(function (res) {
                    that.onelist2 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            that.parameter.data.buyerCompanyId = '';
        },
        onelist1select2 (item) {
            var that = this;
            that.CompaniesCony = item.companyName;
            that.parameter.data.buyerCompanyId = item.companyId;
            that.onelist2Show = false;
        },
        blur22 () {
            this.onelist2Show = false;
            this.CompaniesCony = '';
            this.parameter.data.buyerCompanyId = '';
        },
        // TODO 突击修改
        // 在线聊天
        chat () {
            window.open(this.url);
        },
        search () { // 搜索
            this.parameter.data.orderStatus = this.stateCode;
            this.parameter.data.keyword = this.keywords;
            this.parameter.data.deliveryType = this.deliveryType;
            this.parameter.data.paymentType = this.transactionType;
            this.parameter.data.deliveryWarehouseName = this.deliveryWarehouseName;
            if (this.createDate === null) {
                this.parameter.data.createdBeginDate = '';
                this.parameter.data.createdEndDate = '';
            } else {
                this.parameter.data.createdBeginDate = new Date(this.createDate[0]).getTime();
                this.parameter.data.createdEndDate = new Date(this.createDate[1]).getTime();
            }
            this.getInfo(this.parameter);
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index;
            // 0：上架，1：下架，2：作废
            this.stateCode = index;
            this.parameter.data.orderStatus = index;
            this.getInfo(this.parameter);
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.getInfo(this.parameter);
        },
        querySearch (queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        copy () {
        },
        handleSelect (item) {
            var that = this;
            that.offerItemList.prdSkuId = item.goodsId;
            that.offerItemList.skuCode = item.goodsCode;
            that.offerItemList.skuName = item.value;
        },
        Warehouse () {
            var that = this;
            this.$http.get(that.$api.offers.goods + '?keywords=').then(function (res) {
                if (res.data.code === 0) {
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].goodsName;
                        param.goodsCode = res.data.data[i].goodsCode;
                        param.goodsId = res.data.data[i].goodsId;
                        that.restaurants.push(param);
                        param = {};
                    }
                }
            });
        },
        getInfo (state) { // 获取信息
            let that = this;
            if (!state) {
                that.parameter.data.sellerCompanyId = that.sellerCompanyId;
            }
            that.$http.post(this.$api.sale.list, that.parameter).then(function (res) {
                console.log(res);
                if (res.data.code === 0) {
                    that.data = res.data.data;
                    that.total = res.data.data.total;
                    that.pageNum = res.data.data.pageNum;
                    console.log(res.data.data);
                } else {
                    that.$message(res.data.message);
                }
            });
        },
        goPage (data) {
            let name = data.orderStatus > 2 && data.orderStatus !== 5 ? 'sellerSettle' : 'salesDetail';

            this.$router.push({name: name, query: {orderId: data.id}});
        }
    }
};
</script>
<style lang="scss" scoped>
    .mytable{
        padding: 0 14px;
        .title{
            font-weight: bold;
            border: 1px solid #e7ecf1;
        }
        tbody{
            border: 1px solid #e7ecf1;
        }
    }
    .my-order-list {
        .search_btn{
            margin-left: -55px;
        }
        .newrel{
            .newabl{
                position: absolute;
                top: 0px;
                right: 7px;
            }
        }
        .base-info {
            margin: 10px;
        }
        .base-info dl {
            width: 50%;
            float: left;
            font-size: $small-font;
            text-align: left;
            min-height: 30px;
            margin: 0;
            dt {
                width: 80px;
                float: left;
                margin: auto 10px;
                color: $color-title;
                font-weight: bold;
            };
            dd {
                float: left;
                color: $color-main;
                padding-left: 10px;

                img {
                    width: 30px;
                    height: 20px;
                    margin-left: 10px;
                    border: 1px solid $color-border;
                    border-radius: $border-radius-small;
                    cursor: pointer;
                }
            }
        }
        .my-chat {
            position: fixed;
            left: 50%;
            margin-left: 610px;
            line-height: 40px;
            height: 40px;
            width: 40px;
            text-align: center;
            padding-right: 5px;
            color: #e0370f;
            cursor: pointer;
            background-color: #e6eaea;
            border-radius: 5px;
            box-shadow: 0px 0px 10px 0px #666;
            cursor: pointer;
            span {
                display: block;
                height: 18px;
            }
            .iconfont {
                color: $color-highlight;
                padding-right: 2px;
            }
        }
    }
    .order-list {
        .selected-box {
            padding: 0px 30px 30px;
            .cjsj{
                margin-top: -10px;
            }
        }
        .right {
            float: right
        }
        .selected {
            overflow: hidden;
            padding: 20px 16px;
            ul{
                overflow: hidden;
                float: left;
                margin-top: 3px;
            }
            li {
                float: left;
                padding: 0 6px;
                color: #666;
                &.active {
                    color: $color-a-active;
                    border-bottom: 1px solid $color-a-active
                }
            }
            li:hover{
                cursor: pointer;
            }
            ul li:not(:first-child) {
                position: relative;
                margin-left: 20px;
            }
            .search-btn {
                margin-right: 10px;
            }
            .search-btn:hover{
                cursor: pointer;
            }
            .search-box {
                display: inline-block;
                width: 216px;
                border-bottom: 1px solid $color-light;
                input {
                    width: 190px;
                    height: 30px;
                    color: $color-light;
                    border: none;
                }
                button {
                    display: inline-block;
                    width: 60px;
                    color: $color-main;
                    border: none;
                    background-color: #fff;
                    text-align: right;
                }
                span {
                    color: $color-light;
                    padding-left: 20px
                }
            }

        }
        table {
            width: 100%;
            border-collapse: collapse;
            td {
                color: $color-main;
                text-align: center;
                font-size: 12px
            }
            tr:not(:nth-child(2)) td {
                padding: 9px;
            }
            tr:first-child td {
                background-color: #EEF3F8;
                border: 0;
            }
            tr.update-title td {
                background: #fbfbfc;
                text-align: left;
                padding: 0 10px 0;
                border: 0;
                vertical-align: middle;
                height: 40px;
                line-height: 40px;
            }
            tr.update-title i {
                cursor: pointer
            }
            td.tleft {
                text-align: left;
                padding-left: 10px;
            }
        }
        td.price {
            color: $color-a-active
        }
        td .img-box {
            float: left;
            border: 1px solid $color-border;
            margin-right: 10px;
            width: 58px;
            height: 58px;
        }
        .myleft_dic{
            overflow: hidden;
            padding: 10px 0 10px 16px;
        }
        .myleft_dic .img-box{
            float: left;
        }
        td .img-box img {
            width: 100%;
            height: 100%;
        }
        .info-box {
            float: left;
            line-height: 19px;
            width: 140px;
        }
        .listul{
            background-color: #fff;
            width: 80%;
            max-height: 200px;
            overflow: auto;
            position: absolute;
            top: 30px;
            z-index: 9;
            border: 1px solid #e6eaea;
            border-top: none;
            margin-left: 20.5%;
            li{
                padding: 5px 10px;
            }
            li:hover{
                cursor: pointer;
                background-color: #f5f7fa;
                color: #4a90e2;
            }
        }
        .totaljl{
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
        .totalfy{
            margin-bottom: 30px;
        }
    }
</style>
<style lang="scss">
    .new-date-format{
        .el-date-editor{
            .el-range__icon{
                margin-top: 9px!important;
            }
            .el-range-input{
                margin-top: 8px!important;
                height: 25px!important;
            }
            .el-range-separator{
                margin-top: 9px!important;
            }
        }
    }
</style>
