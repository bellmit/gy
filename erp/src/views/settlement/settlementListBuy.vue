<!-- 采购结算列表 -->
<template>
    <div class="payment-list">
        <div class="search-wrapper">
            <div class="search-form" :class="{'search-wrapper-open' : !isShowSearch}">
                <div class="gy-form-group">
                    <span class="l">合同要素ID</span>
                    <input type="text" v-model="search.contractEssenceId" placeholder="请输入合同要素ID">
                </div>
                <div class="gy-form-group">
                    <span class="l">产品名称</span>
                    <input type="text" placeholder="请输入产品名称" v-model="search.prdProductName">
                </div>
                <div class="gy-form-group">
                    <span class="l">状态</span>
                    <el-select v-model="search.settleStatus" placeholder="请选择" :clearable="true">
                        <el-option
                            v-for="item in $constant.odrSettlementStatus"
                            :key="item.status"
                            :label="item.name"
                            :value="item.status">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">结算时间</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker
                                v-model="search.startDate"
                                type="date"
                                value-format="timestamp"
                                placeholder="开始日期">
                            </el-date-picker>
                        </div>
                        <div class="c">至</div>
                        <div class="d">
                            <el-date-picker
                                v-model="search.endDate"
                                type="date"
                                @change="search.endDate = $tools.convertDateEnd(search.endDate)"
                                value-format="timestamp"
                                placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <template v-if="isShowSearch">
                    <div class="gy-form-group">
                        <span class="l">客户名称</span>
                        <input type="text" placeholder="请输入客户名称" v-model="search.customerCompanyName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">我方公司</span>
                        <el-select v-model="search.targetCorpName" placeholder="请选择" :clearable="true">
                            <el-option
                                v-for="item in targetCorpList"
                                :key="item.targetCorpId"
                                :label="item.targetCorpName"
                                :value="item.targetCorpId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">结算发起人</span>
                        <input type="text" placeholder="请输入结算发起人" v-model="search.launchName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">业务操作人</span>
                        <input type="text" placeholder="请输入业务操作人" v-model="search.businessManagerName">
                    </div>
                </template>
                <span class="searchicon" @click="getlist"><i class="iconfont icon-search"></i></span>
                <div class="clearfix"></div>
            </div>
            <span class="search-btn" @click="isShowSearch = !isShowSearch">高级搜索
                <i class="el-input__icon" :class="isShowSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i></span>
        </div>
        <div style="padding: 0 16px">
            <div class="gy-table">
                <el-table
                    :data="list"
                    style="width: 100%">
                    <el-table-column
                        fixed
                        label="ID"
                        width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.contractEssenceId}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="产品名称"
                        :show-overflow-tooltip="true"
                        width="110">
                        <template slot-scope="scope">
                            <span>{{scope.row.prodName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="客户名称"
                        :show-overflow-tooltip="true"
                        width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.sellerCompanyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="结算差额(元)"
                        class-name="amount-right-el"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{scope.row.settleBalance | numToCash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="合同金额(元)"
                        class-name="amount-right-el"
                        width="130">
                        <template slot-scope="scope">
                            <span v-if="scope.row.skuPriceType === 21 || scope.row.skuPriceType === 22">公式计价</span>
                            <span v-else>{{scope.row.totalAmount | numToCash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="已付款总额(元)"
                        class-name="amount-right-el"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{scope.row.hadPayAmount | numToCash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="结算总金额(元)"
                        class-name="amount-right-el"
                        width="130">
                        <template slot-scope="scope">
                            <span>{{scope.row.settleTotalAmount | numToCash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="合同数量(吨)"
                        class-name="amount-right-el"
                        width="110">
                        <template slot-scope="scope">
                            <span>{{scope.row.skuQuantity | numToQuantity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="已交货(吨)"
                        class-name="amount-right-el"
                        width="110">
                        <template slot-scope="scope">
                            <span>{{scope.row.alreadyDeliveryQuantity | numToQuantity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        :show-overflow-tooltip="true"
                        width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.settleStatus | orderSettlementStatus}} {{scope.row.currentTodoUserName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        width="160">
                        <template slot-scope="scope">
                            <span>{{scope.row.createdDate | date(1)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        class-name="operation-styles-el"
                        label="操作"
                        width="95">
                        <template slot-scope="scope">
                            <button type="button" class="gy-button-view view" @click="showDetail(scope.row)">查看</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 翻页 -->
        <el-pagination
            background
            :total="total"
            layout="prev, pager, next"
            style="margin-top: 40px;"
            :current-page.sync="search.pageNo"
            @current-change="turnPage">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userId: null,
            isShowSearch: false,
            search: {
                orderType: 1,
                contractEssenceId: null, // 合同要素ID
                prdProductName: null, // 产品名称
                settleStatus: null, // 状态
                startDate: null, // 结算时间(开始)
                endDate: null, // 结算时间(结束)
                customerCompanyName: null, // 客户名称
                targetCorpName: null, // 我方公司
                launchName: null, // 结算发起人
                businessManagerName: null, // 业务操作人
                pageNo: 1, // 页码（从1开始）默认1
                pageSize: 10 // 每页大小（未设置时取后台设置默认值）
            },
            list: [
                {
                    id: null, // 合同要素ID
                    buyerCompanyName: null, // 下游公司名称
                    sellerCompanyName: null, // 上游公司名称
                    shouldPaymentTotal: null, // 应付款金额
                    shouldCollectionTotal: null, // 应收款金额
                    hadPaymentTotal: null, // 已付款金额
                    hadCollectionTotal: null, // 已收款金额
                    needPaymentTotal: null, // 待付款金额
                    needCollectionTotal: null, // 待收款金额
                    paymentDate: null, // 付款日期 （格式：yyyy-MM-dd）
                    collectionDate: null, // 收款日期（格式：yyyy-MM-dd）
                    paymentStateStr: null, // 付款状态
                    collectionStateStr: null, // 收款状态
                    paymentCreatedDate: null, // 付款创建时间（格式：yyyy-MM-dd HH:mm:ss）
                    collectionCreatedDate: null, // 收款创建时间（格式：yyyy-MM-dd HH:mm:ss）
                    sellerOrderNumber: null, // 销售单号
                    sellerOrderId: null, // 销售ID
                    purchaseOrderNumber: null, // 采购单号
                    purchaseOrderId: null // 采购单号
                }
            ],
            total: null,
            targetCorpList: []
        };
    },
    methods: {
        getlist () {
            let that = this;
            that.search.userId = that.userId;
            that.$http.post(that.$api.settlement.getSettleList, that.search)
                .then((response) => {
                    if (response.data.code === 0) {
                        // 去结果画面
                        that.list = response.data.data.rows;
                        that.total = response.data.data.total;
                    } else {
                        that.$alert(response.data.code + ' ' + response.data.message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        turnPage (e) { // 分页切换
            this.search.pageNo = e;
            this.getlist();
        },
        showDetail (row) { // 结算详情
            let query = {
                contEssId: row.contractEssenceId, // 合同要素id
                purchaseOrderId: row.purchaseOrderId, // 采购订单ID
                targetBizId: row.id // 结算单ID
            };
            this.$router.push({name: 'settlementDetailBuy', query: query});
        },
        // 获取我方公司
        getRelatedCompany () {
            this.$http.get(this.$api.contract.getRelatedCompany).then((res) => {
                if (res.data.code === 0) {
                    this.targetCorpList = res.data.data.targetCorpList;
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    },
    activated () {
        if (!this.$route.meta.isBack) {
            this.search = {
                orderType: 1 //
            };
            this.getlist();
        }
        this.$route.meta.isBack = false;
    },
    mounted () {
        this.userId = JSON.parse(localStorage.getItem('userInfo')).id; // 登陆用户ID
        this.getRelatedCompany();
        // 获取采购结算详情
        this.getlist();
    }
};
</script>

<style lang="scss" scoped>
    .payment-list {
        /*padding: 0 16px;*/
    }

    .search-wrapper {
        padding: 47px 0 22px 0;
        position: relative;
        .gy-form-group {
            height: 46px;
            padding-left: 105px;
            .l {
                width: 102px;
            }
        }
        .searchDate {
            display: flex;
            position: relative;
            .d {
                flex: 1;
            }
            .c {
                flex: 0 0 30px;
                text-align: center;
            }
        }
        .search-btn {
            position: absolute;
            right: 30px;
            top: 20px;
            line-height: 1;
            cursor: pointer;
        }
        .el-input__icon {
            line-height: 1;
            width: 14px;
            margin-left: 5px;
        }
        .searchicon {
            position: absolute;
            right: 15px;
            bottom: 15px;
            line-height: 1;
        }
    }

    .search-wrapper-open {
        .gy-form-group:nth-child(even) {
            padding-right: 46px;
        }
    }

    .tab-wrapper {
        position: relative;
    }

    /deep/ .sort-caret {
        right: 0;
        top: 5px;
        bottom: auto;
        left: auto;
    }

    /deep/ .popover-name {
        position: relative;
    }

    /deep/ .text-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    /deep/ .payment-person {
        display: inline-block;
        max-width: 90px;
        padding: 0 10px;
        vertical-align: text-top;
        cursor: default;
    }
</style>
<style lang="scss">
    .payment-list {
        .el-table__body {
            .el-table__row {
                .operation-styles-el {
                    .cell {
                        text-align: center;
                    }
                }
            }
        }
        .cell {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .view {
                background-color: #fff;
            }
        }
        .gy-table tr.selected, .gy-table tr:hover {
            background-color: #fff;
        }
        .el-table__body tr.hover-row > td {
            background-color: #f9f9f9;
        }
    }

    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
        color: white;
        padding-left: 10px;
    }

    .bg-purple {
        background: #d3dce6;
        padding-left: 10px;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        height: 36px;
        line-height: 36px;
        background-color: #ecf5ff;
        span {
            min-width: 30px;
            display: inline-block;
            margin-left: 10px;
        }
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .el-table .cell {
        white-space: pre-line;
    }
</style>
