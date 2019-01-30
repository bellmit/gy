<template>
    <div class="list-resources new-date-format">
        <div class="new-title-public">
            商城资源
        </div>
        <div class="selected">
            <ul>
                <li :class="{ active: newIndex==0 }" @click="toggleTabs(0)">全部</li>
                <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)">已上架({{data.putOnShelves}})</li>
                <li :class="{ active: newIndex==2 }" @click="toggleTabs(2)">已下架({{data.pullOffShelves}})</li>
                <!--<li :class="{ active: newIndex==3 }" @click="toggleTabs(3)">已作废({{data.blankOut}})</li>-->
            </ul>
            <div class="right">
                <div class="search-box">
                    <input type="search" v-model="keywords" placeholder="请输入资源单号/品名">
                    <i  @click="search" class="iconfont icon-search"></i>
                    <!--<button @click="search">搜索</button>-->
                </div>
                <span class="search-btn" @click="toggleSelect=!toggleSelect">高级搜索<i
                    class="iconfont icon-arrow-down"></i></span>
            </div>
        </div>
        <div class="selected-box" v-show="toggleSelect">
            <el-form>
                <el-row style="margin-top: 10px" :gutter="60">
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="4" class="left_spanmy">发布日期</el-col>
                            <el-col :span="20" class="cjsj">
                                <el-date-picker
                                    v-model="beginDate"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="endDate">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="4" class="left_spanmy">交割库</el-col>
                            <el-col :span="20"><input placeholder="请输入" type="text" v-model="deliveryWarehouseName"></el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px;margin-bottom: 20px" :gutter="60">
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
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="4" class="left_spanmy">促销方式</el-col>
                            <el-col :span="20">
                                <el-select v-model="promoType" placeholder="请选择">
                                    <el-option
                                        v-for="item in promoTypeOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <i class="iconfont icon-search my_i" @click.stop.prevent="search"></i>
            </el-form>
        </div>
        <div class="mytable">
            <div class="right my_right">
                <router-link to="/resources/add">
                    <button class="gy-button-extra mtbtn-left">发布资源单</button>
                </router-link>
                <button v-if="newIndex!=1&&newIndex!=3" class="gy-button-normal mtbtn-left" @click="batchOperation(0)">批量上架</button>
                <button v-if="newIndex!=2&&newIndex!=3" class="gy-button-normal mtbtn-left" @click="batchOperation(1)">批量下架</button>
            </div>
            <table>
                <tr class="title">
                    <td style="width:5%"></td>
                    <td style="width:25%">商品</td>
                    <td style="width:11.5%">可供量</td>
                    <td style="width:11.5%">最小起订量</td>
                    <td style="width:11.5%">单价</td>
                    <td style="width:11.5%">交割日期</td>
                    <td style="width:11.5%">促销方式</td>
                    <td style="width:11.5%">操作</td>
                </tr>
                <tbody v-for="(sub , index) in list" :key=index>
                <tr class="update-date">
                    <td colspan="8"> <span style="color: #999">单号：</span>{{sub.odrOfferSn}}<span
                        class="right">发布日期：{{sub.createdDate|date}}</span></td>
                </tr>
                <tr class="item">
                    <td style="width:5%"><input type="checkbox" v-model="itemId" :value="sub.id"></td>
                    <td class="tleft" style="width:25%">
                        <div class="img-box"><img :src=sub.skuPictureUrl alt=""></div>
                        <div class="info-box">{{sub.skuName}}<br>{{sub.offerStatus == 0 ? '已上架':sub.offerStatus ==
                            1? '已下架' : '已作废' }}<br>{{sub.deliveryWarehouseName}}
                        </div>
                    </td>
                    <td style="width:11.5%">{{sub.skuQuantity|numToCash(3)}}{{sub.infUnitOfMeasureDisplayName}}</td>
                    <td style="width:11.5%">
                        <template v-if="sub.skuMinQuantity">
                            {{sub.skuMinQuantity}}{{sub.infUnitOfMeasureDisplayName}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </td>
                    <td class="price" style="width:11.5%">
                        <template v-if="sub.skuPrice">
                            {{sub.intCurrencyMark}}{{sub.skuPrice |numToCash}}元
                        </template>
                        <template v-else>
                            面议
                        </template>
                    </td>
                    <td class="tleft" v-if="sub.deliveryDateFlag === 3" style="width:11.5%;text-align: center">{{sub.deliveryDateText}}</td>
                    <td class="tleft" v-else-if="sub.deliveryDateFlag === 2"  style="width:11.5%;text-align: center">{{sub.deliveryBeginDate|date}}以前</td>
                    <td class="tleft" v-else style="width:11.5%;text-align: center">{{sub.deliveryBeginDate|date}}到{{sub.deliveryEndDate|date}}</td>
                    <td style="width:11.5%">
                        <template v-if="sub.promoType==0">无</template>
                        <template v-else-if="sub.promoType==1">热销</template>
                        <template v-else-if="sub.promoType==2">推荐</template>
                        <template v-else-if="sub.promoType==3">降价</template>
                        <template v-else-if="sub.promoType==4">优惠</template>
                    </td>
                    <td style="width:11.5%">
                        <!--offerStatus０代表上架，1代表下架，2代表作废-->
                        <template v-if="sub.offerStatus==0">
                            <a class="gy-button-view" @click="updateState(1,sub.id)">下架</a><br>
                        </template>
                        <template v-if="sub.offerStatus==1">
                            <a class="gy-button-view" @click="updateState(0,sub.id)">上架</a><br>
                            <!--<router-link :to="{name:'createResources', query:{offerId: sub.id}}" class="gy-button-view"> </router-link><br>-->
                        </template>
                        <router-link :to="{name:'resourcesDetail', query:{offerId: sub.id}}" class="gy-button-view">
                            详情
                        </router-link>
                        <br>
                        <router-link :to="{name:'createOrder', query:{offerId: sub.id}}" v-if="sub.offerStatus==0"
                                     class="gy-button-view">发起订单
                        </router-link>
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
            keywords: '',
            searchCode: '', // 查询订单号
            skuName: '', // 查询品名
            beginDate: [], // 查询开始时间
            endDate: '',
            total: 0, // 总条数
            pageNum: 1,
            newIndex: 0,
            itemId: [],
            sellerCompanyId: JSON.parse(localStorage.getItem('userInfo')).companyId,
            parameter: {
                data: {
                    sellerCompanyId: this.sellerCompanyId,
                    flag: 2
                }
            },
            toggleSelect: false, // 高级搜索显示隐藏
            list: [],
            data: {
                pageSize: 0, // 显示条数
                pageNum: 0, // 当前页数
                putOnShelves: 0, // 已上架条数
                pullOffShelves: 0, // 已下架条数
                blankOut: 0, // 作废条数
                offerStatus: 0, // 供应单状态
                deliveryBeginDate: '',
                deliveryEndDate: ''
            },
            promoType: '',
            deliveryWarehouseName: '',
            deliveryType: '',
            deliveryTypeOption: [
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            promoTypeOption: [{
                value: 0,
                label: '无'
            },
            {
                value: 1,
                label: '热销'
            },
            {
                value: 2,
                label: '推销'
            },
            {
                value: 3,
                label: '降价'
            },
            {
                value: 4,
                label: '优惠'
            }],
            datas: {
                offerIdList: []
            },
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
            }
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
        // 批量上下架
        batchOperation (state) {
            this.datas.offerIdList = this.itemId;
            this.datas.offerStatus = state;
            if (this.datas.offerIdList.length) {
                this.updateStates(this.datas);
                return false;
            } else {
                this.$message('请选中要操作的资源单');
            }
        },
        search () { // 搜索
            this.parameter.pageNum = this.pageNum;
            this.parameter.data.keyword = this.keywords;
            this.parameter.data.deliveryType = this.deliveryType;
            this.parameter.data.promoType = this.promoType;
            this.parameter.data.sellerCompanyId = this.sellerCompanyId;
            this.parameter.data.deliveryWarehouseName = this.deliveryWarehouseName;
            console.log(this.beginDate);
            if (this.beginDate === null) {
                this.parameter.data.createdBeginDate = '';
                this.parameter.data.createdEndDate = '';
            } else {
                this.parameter.data.createdBeginDate = this.beginDate[0].getTime();
                this.parameter.data.createdEndDate = this.beginDate[1].getTime();
            }
            this.getInfo(this.parameter);
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index;
            // 0：上架，1：下架，2：作废
            this.offerStatus = index >= 1 ? index - 1 : '';
            this.parameter.data.offerStatus = this.offerStatus;
            this.parameter.data.sellerCompanyId = this.sellerCompanyId;
            this.getInfo(this.parameter);
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.parameter.data.offerStatus = this.offerStatus;
            this.getInfo(this.parameter);
        },
        getInfo (state) { // 获取信息
            let that = this;
            this.parameter.pageNum = this.pageNum;
            this.parameter.data.offerStatus = this.offerStatus;
            this.parameter.data.flag = 2;
            this.parameter.data.sellerCompanyId = this.sellerCompanyId;
            that.$http.post(this.$api.offers.list, this.parameter).then(function (res) {
                if (res.data.code === 0) {
                    let result = res.data.data;
                    that.list = result.list;
                    that.data = result;
                    that.total = result.total;
                    that.pageNum = result.pageNum;
                    that.parameter.data = {};
                    that.skuName = '';
                    that.offerCode = '';
                }
            });
        },
        updateState (status, parm) {
            let that = this;
            console.log(parm);
            that.datas.offerIdList.push(parm);
            that.datas.offerStatus = status;
            that.updateStates(that.datas);
        },
        updateStates (status) {
            // 0：上架，1：下架，2：作废
            let that = this;
            that.$http.post(that.$api.offers.state, that.datas).then(function (res) {
                if (res.data.code === 0) {
                    that.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                    that.parameter.data.offerStatus = that.newIndex === 1 ? 0 : that.newIndex === 2 ? 1 : '';
                    that.getInfo(that.parameter);
                }
                that.itemId = [];
                that.datas.offerIdList = [];
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .list-resources {
        .iconfont {
            vertical-align: middle
        }
        .right {
            float: right
        }
        .selected {
            overflow: hidden;
            padding: 20px 30px 20px 16px;
            ul{
                overflow: hidden;
                float: left;
                margin-top: 3px;
            }
            li {
                float: left;
                padding: 0 6px;
                color: #666666;
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
                position: relative;
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
                    float: left;
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
        .selected-box {
            position: relative;
            padding: 0 30px;
            .cjsj{
                margin-top: -10px;
            }
            .my_i{
                position: absolute;
                top: 41px;
                right: 10px;
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
            tr.update-date td {
                background: #fbfbfc;
                text-align: left;
                padding: 0 16px 0;
                border: 0;
                vertical-align: middle;
                height: 39px;
                line-height: 39px;
            }
            tr.update-title i {
                cursor: pointer
            }
            td.tleft {
                text-align: left;
                padding-left: 10px;
            }
        }
        .item td:not(:first-child) {
            padding: 12px;
            border-top: 0;
            border-bottom: 0;
        }

        td.price {
            color: $color-a-active
        }
        td .img-box {
            float: left;
            margin-right: 20px;
            width: 58px;
            height: 58px;
            img {
                width: 58px;
                height: 58px;
                border: 1px solid $color-border;
            }
        }
        .info-box {
            padding-left: 78px;
            line-height: 19px;
        }
        .mytable{
            padding: 0 16px;
            .title{
                font-weight: bold;
                border: 1px solid #e7ecf1;
            }
            tbody{
                border: 1px solid #e7ecf1;
            }
            .my_right{
                padding-bottom: 10px;
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
        .mtbtn-left{
            margin-right: 8px;
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
