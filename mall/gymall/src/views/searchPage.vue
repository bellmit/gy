<template>
    <div class="search-page">
        <div class="search-page-content">
            <div class="search-page-content-query clearfix">
                <div class="clearfix search-page-content-query-delivery-mode fl">
                    <div class="fl search-page-querys-left">交付方式</div>
                    <div class="fl search-page-querys-right" @click="changeDeliveryType($event)">
                        <button mode="0" :class="[deliveryType === 0?'selected-mode':'']" @click="getOrderList(deliveryType = 0)">全部</button>
                        <button mode="1" :class="[deliveryType === 1?'selected-mode':'']" @click="getOrderList(deliveryType = 1)">买家自提</button>
                        <button mode="2" :class="[deliveryType === 2?'selected-mode':'']" @click="getOrderList(deliveryType = 2)">卖家送货</button>
                    </div>
                </div>
                <div class="search-page-content-query-more fr" @click="disflag = !disflag">
                    <span>高级搜索</span><i slot="suffix"
                        class="iconfont" :class="disflag ? 'icon-arrow-up' : 'icon-arrow-down'"></i>
                </div>
                <div class="search-page-content-query-iptbox fr">
                    <input class="search-page-content-query-iptbox-ipt" v-model="keywords" type="text"
                           placeholder="请输入品名、单号"/>
                    <i @click="getOrderList" class="iconfont icon-fangdajing" style="margin-left:14px;"></i>
                </div>
            </div>
            <div class="clearfixx clearfix" v-if="disflag">
                <div class="gy-form-group">
                    <span class="l">交割期</span>
                    <div class="">
                    <el-date-picker
                        v-model="deliveryPeriod"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp">
                    </el-date-picker>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">价格区间</span>
                    <div>
                        <input class="gy-input" style="width:48%;" v-model="minPrice" @keyup.native="checkPrice($event,'min')"
                                    placeholder="最低价">
                        <span>  -  </span>
                        <input style="width:48%;" class="gy-input" v-model="maxPrice"
                                    @keyup.native="checkPrice($event,'max')" placeholder="最高价">
                    </div>
                </div>
                <div class="gy-form-group clearfix">
                    <span class="l">交割库</span>
                    <div class="">
                        <input class="gy-input" v-model="deliveryWarehouse" placeholder="请输入">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">发布公司</span>
                    <div>
                        <input class="gy-input" v-model="sellerCompany" placeholder="请输入">
                        <i @click="getOrderList" class="iconfont icon-fangdajing"></i>
                    </div>
                </div>
            </div>
            <table class="gy-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>品名</th>
                        <th>
                            <div class="fl three-dot">数量(吨)</div>
                            <div class="arrows fl">
                                <i slot="suffix" class="el-icon-arrow-down" @click="QuantityClickl()"></i>
                                <i slot="suffix" class="el-icon-arrow-up" @click="QuantityClick()"></i>
                            </div>
                        </th>
                        <th>
                            <div class="fl three-dot">起订量(吨)</div>
                            <div class="arrows fl">
                                <i slot="suffix" class="el-icon-arrow-down" @click="MinQuantityClickl()"></i>
                                <i slot="suffix" class="el-icon-arrow-up" @click="MinQuantityClick()"></i>
                            </div>
                        </th>
                        <th>
                            <div class="fl three-dot">价格(元)</div>
                            <div class="arrows fl">
                                <i slot="suffix" class="el-icon-arrow-down" @click="PriceClickl()"></i>
                                <i slot="suffix" class="el-icon-arrow-up" @click="PriceClick()"></i>
                            </div>
                        </th>
                        <th>
                            <div class="fl three-dot">交割期</div>
                            <div class="arrows fl">
                                <i slot="suffix" class="el-icon-arrow-down" @click="BeginDateClickl()"></i>
                                <i slot="suffix" class="el-icon-arrow-up" @click="BeginDateClick()"></i>
                            </div>
                        </th>
                        <th>交割库</th>
                        <th>发布公司</th>
                        <th class="align-c">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in resultList" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.skuName}}</td>
                        <td class="text-r">{{item.skuQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">
                            <template v-if="item.skuMinQuantity">
                                {{item.skuMinQuantity || 0 | numToCash(3)}}
                            </template>
                            <template v-else>
                                -
                            </template>
                        </td>
                        <td class="text-r">
                            <template v-if="item.skuPrice">
                               {{item.skuPrice |numToCash}}{{item.skuPriceFlag == 1 ? "(可议价)" : ''}}
                            </template>
                            <template v-else>
                                面议
                            </template>
                        </td>
                        <td>
                            <span v-if="item.deliveryDateFlag ===3">{{item.deliveryDateText}}</span>
                            <span v-else-if="item.deliveryDateFlag === 2" >{{item.deliveryBeginDate|date}}以前</span>
                            <span v-else>{{item.deliveryBeginDate|date}}到{{item.deliveryEndDate|date}}</span>
                        </td>
                        <td>{{item.deliveryWarehouseName}}</td>
                        <td>
                            <span v-if="item.isPublic === 1">{{item.sellerCompanyName}}</span>
                        </td>
                        <td class="align-c">
                            <router-link :to="{name:'product-detail', query:{resourcesListId: item.id}}"
                                         class="gy-button-view">查看
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="departmentName">共 {{itemTotal}} 条记录</div>
            <el-pagination
              v-if="itemTotal !== 0"
              class="pagination-box"
              background
              @current-change="changeSelect"
              @size-change="sizeChange"
              layout="prev, pager, next"
              :current-page.sync="pageNo"
              :page-size="pageSize"
              :total="itemTotal">
            </el-pagination>
        </div>
    </div>

</template>

<script>
export default {
    name: 'search-page',
    data: function () {
        return {
            disflag: false,
            keywords: '',
            fullSearch: '',
            productId: '',
            catalogueId: '',
            startDate: '',
            endDate: '',
            itemTotal: 0,
            pageNo: 1,
            pageSize: 10,
            minPrice: '',
            maxPrice: '',
            deliveryWarehouse: '',
            sellerCompany: '',
            deliveryType: 0,
            orderByName: 0,
            orderByAmount: 0,
            orderBySkuMinQuantity: 0,
            orderByPrice: 0,
            orderByDeliveryDate: 0,
            resultList: [],
            deliveryPeriod: '',
            form: {},
            timeDefaultShow: ''
        };
    },
    created () {
        this.init();
    },
    watch: {
        $route: 'init'
    },
    methods: {
        init () {
            this.fullSearch = this.$route.query.fullSearch;
            if (this.fullSearch === undefined || this.fullSearch === null || this.fullSearch === 'null') {
                this.fullSearch = '';
            }
            this.keywords = this.$route.query.keyword;
            if (this.keyword === undefined || this.keyword === null || this.keyword === 'null') {
                this.keyword = '';
            }
            this.catalogueId = this.$route.query.catalogueId;
            if (this.catalogueId === undefined || this.catalogueId === null || this.catalogueId === 'null') {
                this.catalogueId = '';
            }
            this.productId = this.$route.query.productId;
            if (this.productId === undefined || this.productId === null || this.productId === 'null') {
                this.productId = '';
            }
            if (this.$route.query.fromkv) {
                this.form = this.$route.query;
                this.deliveryType = Number(this.form.payWay);
                this.disflag = true;
                this.deliveryWarehouse = this.form.warehouse;
                this.keywords = this.form.goodsName;
                this.deliveryPeriod = [this.form.startDate, this.form.endDate];
            }
            this.getOrderList();
        },
        // 排序 数量
        QuantityClick () {
            this.resultList = this.resultList.sort(this.compare('skuQuantity'));
        },
        QuantityClickl () {
            this.resultList = this.resultList.sort(this.comparel('skuQuantity'));
        },
        // 起订量
        MinQuantityClick () {
            this.resultList = this.resultList.sort(this.compare('skuMinQuantity'));
        },
        MinQuantityClickl () {
            this.resultList = this.resultList.sort(this.comparel('skuMinQuantity'));
        },
        // 价格
        PriceClick () {
            this.resultList = this.resultList.sort(this.compare('skuPrice'));
        },
        PriceClickl () {
            this.resultList = this.resultList.sort(this.comparel('skuPrice'));
        },
        // 日期
        BeginDateClick () {
            this.resultList = this.resultList.sort(this.compare('deliveryBeginDate'));
        },
        BeginDateClickl () {
            this.resultList = this.resultList.sort(this.comparel('deliveryBeginDate'));
        },
        comparel (pr) {
            return function (a, b) {
                let value1 = a[pr];
                let value2 = b[pr];
                return value1 - value2;
            };
        },
        compare (pr) {
            return function (a, b) {
                let value1 = a[pr];
                let value2 = b[pr];
                return value2 - value1;
            };
        },
        checkPrice (ev, type) {
            console.log('开始校验');
            if (type === 'min') {
                if (!/^[0-9]+\.?[0-9]*$/.test(this.minPrice)) {
                    this.minPrice = ev.target.value.replace(/[^\d]/g, '');
                }
            }
            if (type === 'max') {
                if (!/^[0-9]+\.?[0-9]*$/.test(this.maxPrice)) {
                    this.maxPrice = ev.target.value.replace(/[^\d]/g, '');
                }
            }
        },
        changeSelect (pageNo) {
            this.pageNo = pageNo;
            this.getOrderList();
        },
        sizeChange (val) {
            this.pageSize = val;
            this.getOrderList();
        },
        changeDeliveryType (e) {
            const target = e.target;
            if (target.nodeName.toLowerCase() === 'button') {
                this.deliveryType = Number(target.getAttribute('mode'));
            }
        },
        getOrderList () {
            if (this.minPrice !== '') {
                if (this.maxPrice !== '') {
                    if (parseInt(this.minPrice) > parseInt(this.maxPrice)) {
                        // this.$alert('最小价格应比最大价格小');
                        this.$confirm('最小价格应比最大价格小', '提示', {
                            confirmButtonText: '确定',
                            confirmButtonClass: 'gy-button-extra',
                            cancelButtonText: '取消',
                            cancelButtonClass: 'gy-button-normal',
                            type: 'warning'
                        });
                        return;
                    } else {
                        console.log('校验成功');
                    }
                }
            }
            const that = this;
            const url = that.$api.mallHome.offerSearch;
            var data = {
                deliveryType: that.deliveryType,
                keyword: that.keywords,
                fullSearch: that.fullSearch,
                productId: that.productId,
                topCatalogueId: that.catalogueId,
                minPrice: that.minPrice,
                maxPrice: that.maxPrice,
                deliveryWarehouseName: that.deliveryWarehouse,
                sellerCompany: that.sellerCompany,
                orderByName: that.orderByName,
                orderByAmount: that.orderByAmount,
                orderBySkuMinQuantity: that.orderBySkuMinQuantity,
                orderByPrice: that.orderByPrice,
                orderByDeliveryDate: that.orderByDeliveryDate,
                flag: 3
            };
            if (that.deliveryPeriod) {
                data['deliveryBeginDate'] = that.deliveryPeriod[0];
                data['deliveryEndDate'] = that.deliveryPeriod[1];
            }
            that.$http.post(url, {pageNum: that.pageNo, pageSize: that.pageSize, data}).then((res) => {
                const resData = res.data;
                if (resData.code === 0) {
                    that.resultList = resData.data.list;
                    that.itemTotal = resData.data.total;
                    return;
                }
                throw new Error(resData.message);
            }).catch((err) => console.log(err));
        }
    }
};
</script>

<style lang="scss" scoped>
    .search-page {
        background-color: #fff;
        margin-top: 10px;
        padding: 20px 0;
        .text-r {
            text-align: right;
        }
        .search-page-content {
            width: 1140px;
            margin: 0 auto;
            min-height: 500px;
        }
        .search-page-content-query{
            padding-right: 30px;
        }

        .search-page-content-query-delivery-mode {
            margin-top: 10px;
        }
        .clearfixx{
            margin-top: 20px;
            .gy-form-group{
                padding:8px 30px 8px 100px;
                height: 49px;
                .el-icon-arrow-down{
                    position: absolute;
                    top: 10px;
                    right: 30px;
                }
                .icon-fangdajing{
                    position: absolute;
                    top: 2px;
                    right: 5px;
                    cursor: pointer;
                }
            }
        }
        .search-page-querys-right {
            margin-left: 20px;
            button {
                color: #666666;
                font-size: 14px;
                background-color: rgba(0, 0, 0, 0);
                cursor: pointer;
                margin-right: 5px;
            }
            .selected-mode {
                font-size: 14px;
                color: #E0370F;
                height: 26px;
                padding: 0 5px;
                border-bottom: 2px solid #E0370F;
                line-height: 26px;
            }
        }

        .search-page-content-query-iptbox {
            border-bottom: 1px solid #E7ECF1;
            width: 270px;
        }

        .search-page-content-query-iptbox-ipt {
            border: none;
            display: inline-block;
            width: 230px;
        }

        .search-page-content-query-iptbox-ipt::-webkit-input-placeholder { /* WebKit browsers */
            font-size: 12px;
            color: #666666;
        }

        .search-page-content-query-iptbox-ipt:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-size: 12px;
            color: #666666;
        }

        .search-page-content-query-iptbox-ipt::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-size: 12px;
            color: #666666;
        }

        .search-page-content-query-iptbox-ipt:-ms-input-placeholder { /* Internet Explorer 10+ */
            font-size: 12px;
            color: #666666;
        }

        .search-page-content-query-iptbox-btn {
            display: inline-block;
            padding: 0 10px;
            cursor: pointer;
        }

        .search-page-content-query-more {
            cursor: pointer;
            color: #979797;
            margin-left: 10px;
        }

        .pagination-box {
        text-align: center;
        margin-top: 10px;
        }
        .gy-button-view {
        display: inline-block;
        width: 40px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        margin: 10px auto;
        padding: 0;
        }
        .arrows {
            position: relative;
            height: 25px;
            width: 20px;
            .el-icon-arrow-down {
                left: 4px;
                top: 13px;
                position: absolute;
                cursor: pointer;
            }
            .el-icon-arrow-up {
                left: 4px;
                top: 3px;
                position: absolute;
                cursor: pointer;
            }
        }
        .gy-table{
            margin-top: 40px;
            th{
                color: #666666;
                font-weight: bold;
                padding: 0 10px;
                height:40px;
                div{
                    float: none;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            td{
                padding: 0 10px;
            }
        }
    }

</style>
<style lang="scss">
.search-page{
    .el-input__inner{
            height: 30px;
    }
    .search-page {
        input[type=text], input[type=password], .gy-input, .gy-textarea, .gy-select {
        border-radius: 0;
        }
    }
   .el-range-separator, .el-input__icon{
            line-height: 24px;
    }
    .el-input__inner{
           height: 30px;
           font-size: 14px;
    }
   .search-page-content-query-more i{
        margin-left: 5px;
        vertical-align: top;
    }
}
.el-message-box__wrapper .el-button--primary{
    background:#e0370f;
    border-color:#e0370f;
}
</style>
