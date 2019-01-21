<template>
    <div class="search-page">
        <div class="search-page-content">
            <div class="search-page-content-query clearfix">
                <div class="clearfix search-page-content-query-delivery-mode fl">
                    <div class="fl search-page-querys-left">提货方式</div>
                    <div class="fl search-page-querys-right" @click="changeDeliveryType($event)">
                        <button mode="0" :class="[deliveryType === 0?'selected-mode':'']">全部</button>
                        <button mode="1" :class="[deliveryType === 1?'selected-mode':'']">买家自提</button>
                        <button mode="2" :class="[deliveryType === 2?'selected-mode':'']">卖家送货</button>
                    </div>
                </div>
                <div class="search-page-content-query-more fr" @click="disflag = !disflag">
                    <span>高级搜索</span>
                    <i slot="suffix" class="el-icon-arrow-down"></i>
                </div>
                <div class="search-page-content-query-iptbox fr">
                    <input class="search-page-content-query-iptbox-ipt" v-model="keywords" type="text"
                           placeholder="请输入品名、单号"/>
                    <i @click="getOrderList" class="iconfont icon-fangdajing"></i>
                </div>
            </div>
            <div v-if="disflag">
                <div class="search-page-content-more-querys clearfix">
                    <div class="search-page-content-more-querys-left fl clearfix">
                        <span class="demonstration">交割期</span>
                        <el-date-picker
                          v-model="deliveryPeriod"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="timestamp">
                        </el-date-picker>
                    </div>
                    <div class="search-page-content-more-querys-right fl clearfix">
                        <div class="search-page-content-more-querys-left-tit fl">价格区间</div>
                        <div class="search-page-content-more-querys-left-content fl">
                            <el-input class="fl" v-model="minPrice" @keyup.native="checkPrice($event,'min')"
                                      placeholder="最低价"></el-input>
                            <span class="fl">  -  </span>
                            <el-input style="padding-left: 10px;" class="fl" v-model="maxPrice"
                                      @keyup.native="checkPrice($event,'max')" placeholder="最高价"></el-input>
                        </div>
                    </div>
                </div>
                <div class="search-page-content-more-querys clearfix">
                    <div class="search-page-content-more-querys-left fl clearfix">
                        <div class="search-page-content-more-querys-left-tit fl">交割库</div>
                        <div
                          class="search-page-content-more-querys-left-content search-page-content-more-querys-left-content-warehouse  fl">
                            <el-input class="fl" v-model="deliveryWarehouse"></el-input>
                            <i slot="suffix" class="el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <div class="search-page-content-more-querys-right fl clearfix">
                        <div class="search-page-content-more-querys-left-tit fl ">发布公司</div>
                        <div
                          class="search-page-content-more-querys-left-content search-page-content-more-querys-left-content-warehouse search-page-content-more-querys-left-content-compony fl">
                            <el-input class="fl" v-model="sellerCompany"></el-input>
                            <i slot="suffix" class="el-icon-arrow-down"></i>
                            <i @click="getOrderList" class="iconfont icon-fangdajing"></i>
                        </div>
                    </div>
                </div>
            </div>
            <table class="gy-table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>品名</td>
                        <td>
                            <div class="fl three-dot">数量 (吨)</div>
                            <div class="arrows fl">
                                <i slot="suffix" class="el-icon-arrow-down" @click="QuantityClickl()"></i>
                                <i slot="suffix" class="el-icon-arrow-up" @click="QuantityClick()"></i>
                            </div>
                        </td>
                        <td>
                            <div class="fl three-dot">起订量 (吨)</div>
                            <div class="arrows fl">
                                <i slot="suffix" class="el-icon-arrow-down" @click="MinQuantityClickl()"></i>
                                <i slot="suffix" class="el-icon-arrow-up" @click="MinQuantityClick()"></i>
                            </div>
                        </td>
                        <td>
                            <div class="fl three-dot">价格 (元)</div>
                            <div class="arrows fl">
                                <i slot="suffix" class="el-icon-arrow-down" @click="PriceClickl()"></i>
                                <i slot="suffix" class="el-icon-arrow-up" @click="PriceClick()"></i>
                            </div>
                        </td>
                        <td>
                            <div class="fl three-dot">交割期</div>
                            <div class="arrows fl">
                                <i slot="suffix" class="el-icon-arrow-down" @click="BeginDateClickl()"></i>
                                <i slot="suffix" class="el-icon-arrow-up" @click="BeginDateClick()"></i>
                            </div>
                        </td>
                        <td>交割库</td>
                        <td>发布公司</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in resultList" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.skuName}}</td>
                        <td>{{item.skuQuantity || 0 | numToCash(3)}}</td>
                        <td>
                            <template v-if="item.skuMinQuantity">
                                {{item.skuMinQuantity || 0 | numToCash(3)}}
                            </template>
                            <template v-else>
                                -
                            </template>
                        </td>
                        <td>
                            <template v-if="item.skuPrice">
                               {{item.skuPrice |numToCash}}元
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
                        <td>
                            <router-link :to="{name:'product-detail', query:{resourcesListId: item.id}}"
                                         class="gy-button-view">查看
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <el-pagination
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
    methods: {
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
                        this.$alert('最小价格应比最大价格小');
                        return;
                    } else {
                        console.log('校验成功');
                    }
                }
            }
            const that = this;
            const url = that.$api.mallHome.offerSearch;
            that.$http.post(url, {
                pageNum: that.pageNo,
                pageSize: that.pageSize,
                data: {
                    deliveryType: that.deliveryType,
                    keyword: that.keywords,
                    fullSearch: that.fullSearch,
                    productId: that.productId,
                    topCatalogueId: that.catalogueId,
                    deliveryBeginDate: that.deliveryPeriod[0],
                    deliveryEndDate: that.deliveryPeriod[1],
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
                }
            }).then((res) => {
                const resData = res.data;
                if (resData.code === 0) {
                    that.resultList = resData.data.list;
                    that.itemTotal = resData.data.total;
                    return;
                }
                throw new Error(resData.message);
            }).catch((err) => console.log(err));
        }
    },
    created () {
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
        this.getOrderList();
    },
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
            deliveryPeriod: ''
        };
    }
};
</script>

<style lang="scss" scoped>
    .search-page {
        background-color: #fff;
        margin-top: 10px;
        padding: 20px 0;
        .search-page-content {
            width: 1140px;
            margin: 0 auto;
        }
        .search-page-content-query-delivery-mode {
            margin-top: 10px;
        }
        .selected-mode {
            background: #4A90E2 !important;
            border-radius: 5px;
            font-size: 12px;
            color: #FFF;
            height: 26px;
            line-height: 26px;
        }
        .search-page-querys-right {
            margin-left: 20px;
            button {
                background-color: rgba(0, 0, 0, 0);
                cursor: pointer;
            }
        }

        .search-page-content-query-iptbox {
            border-bottom: 1px solid #E7ECF1;
            padding: 0 0 0 14px;
            width: 270px;
        }

        .search-page-content-query-iptbox-ipt {
            border: none;
            display: inline-block;
            width: 230px;
        }

        .search-page-content-query-iptbox-ipt::-webkit-input-placeholder { /* WebKit browsers */
            opacity: 0.5;
            font-size: 12px;
            color: #666666;
        }

        .search-page-content-query-iptbox-ipt:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            opacity: 0.5;
            font-size: 12px;
            color: #666666;
        }

        .search-page-content-query-iptbox-ipt::-moz-placeholder { /* Mozilla Firefox 19+ */
            opacity: 0.5;
            font-size: 12px;
            color: #666666;
        }

        .search-page-content-query-iptbox-ipt:-ms-input-placeholder { /* Internet Explorer 10+ */
            opacity: 0.5;
            font-size: 12px;
            color: #666666;
        }

        .search-page-content-query-iptbox-btn {
            display: inline-block;
            padding: 0 10px;
            cursor: pointer;
        }

        .search-page-content-query-more {
            color: #979797;
            margin-left: 20px;
        }

        .search-page-content-more-querys-left {
            width: 46%;
            .el-date-editor.el-input {
                width: 149px;
            }
        }
        .search-page-content-more-querys-left-tit {
            height: 32px;
            line-height: 32px;
        }
        .search-page-content-more-querys-left-content {
            margin-left: 20px;
            width: 314px;
        }
        .el-input {
            width: 49%;
        }
        .search-page-content-more-querys-right {
            margin-left: 10px;
        }
        .search-page-content-more-querys {
            margin-top: 20px;
        }
        .search-page-content-more-querys-left-content-warehouse {
            width: 314px;
            position: relative;
            .el-input {
                width: 100%;
            }
            .el-icon-arrow-down {
                position: absolute;
                right: 6px;
                top: 10px;
            }
        }
        .search-page-content-more-querys-left-content-compony {
            width: 314px;
            .icon-fangdajing {
                position: absolute;
                right: -20px;
                top: 3px;
            }
        }
        .icon-fangdajing {
            cursor: pointer;
        }

        .search-page-query-result {
            border: 1px solid #E7ECF1;
            margin: 20px 0;
        }
        .search-page-query-result-th {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background: rgba(238, 243, 248, 1);
        }
        .search-page-query-result-tb-item {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
        }
        .search-page-query-result-tb-item-colum {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    .result-item-width5 {
      width: 5%;
    }
    .result-item-width10 {
      width: 10%;
    }
    .result-item-width20 {
      width: 20%;
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
        .search-page-query-result-th-item-look {
            text-align: center;
        }
        .arrows {
            position: relative;
            height: 25px;
            width: 20px;
            .el-icon-arrow-down {
                left: 4px;
                top: 10px;
                position: absolute;
                cursor: pointer;
            }
            .el-icon-arrow-up {
                left: 4px;
                top: 0px;
                position: absolute;
                cursor: pointer;
            }
        }
        .hoveredRow {
            background: #F3F4F6;
        }
        .result-item-width20 {
            width: 20%;
        }
        .gy-table{
            margin-top: 40px;
        }
        .search-page-query-result-td{
            position: relative;
            .el-icon-arrow-downs {
                position: absolute;
                left: 58px;
                width: 12px;
                height: 12px;
            }
            .el-icon-arrow-ups{
                position: absolute;
                top: 19px;
                left: 58px;
                width: 12px;
                height: 12px;
            }
            .el-icon-arrow-downs-date {
                position: absolute;
                left: 72px;
                width: 12px;
                height: 12px;
            }
            .el-icon-arrow-ups-date{
                position: absolute;
                top: 19px;
                left: 72px;
                width: 12px;
                height: 12px;
            }
        }

      .gy-table thead td {
        background-color: #eef3f8;
      }
    }

</style>
<style lang="scss">
  .search-page-content-more-querys-left {
    .el-input__prefix {
      top: -4px;
    }
  }
  .search-page {
    input[type=text], input[type=password], .gy-input, .gy-textarea, .gy-select {
      border-radius: 0;
    }
  }
  .search-page-content-more-querys{
      .el-range-editor.el-input__inner{
        width: 314px;
        margin-left: 16px;
        border: 0;
        border-bottom: 1px solid #dcdfe6;
    }
  }
</style>
