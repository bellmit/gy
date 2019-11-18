<template>
    <div class="deliveryDetail">
        <gy-contract :query="infomation"></gy-contract>
        <div v-if="purchaseList">
            <div class="title">采购交割</div>
            <div class="block-wrap clearfix">
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <span>{{purchaseList.sellerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库</span>
                    <span>{{purchaseList.deliveryWarehouseName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库地址</span>
                    <span>{{purchaseList.deliveryDetailedAddress}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">计划交割日期</span>
                    <span>{{purchaseList.planDeliveryDate}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">数量(吨)</span>
                    <span>{{purchaseList.skuQuantity|numToQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">待交割数量(吨)</span>
                    <span>{{purchaseList.surplusDeliveryQuantity|numToQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">免仓期(天)</span>
                    <span>{{purchaseList.warehouseFreeDays}}</span>
                </div>
            </div>
            <div class="title titleBottom">交割记录</div>
            <div class="deliver_padding_small">
                <el-table
                        :data="purchaseList.deliveryEntityList"
                        style="width: 100%"
                        class="gy-table">
                    <el-table-column
                            label="编号"
                            fixed
                            width="80"><template slot-scope="item">{{item.row.deliveryItemId}}</template>
                    </el-table-column>
                    <el-table-column
                            label="状态"
                            width="100"><template slot-scope="item">{{item.row.deliveryStatus | buyDeliveryItemState}}</template>
                    </el-table-column>
                    <el-table-column
                            label="交割凭证"
                            width="150">
                        <template slot-scope="item">
                            <i v-if="item.row.erpDeliveryFileModelList.length !== 0" class="iconfont icon-photo" @click="isShowImg(item.row.erpDeliveryFileModelList)"></i>
                            <i v-else class="iconfont icon-photo-null"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="本次交割数量(吨)"
                            class-name="amount-right-el"
                            width="150"><template slot-scope="item">{{item.row.deliveryQuantity|numToQuantity}}</template>
                    </el-table-column>
                    <el-table-column
                            label="实际交割日"
                            width="150"><template slot-scope="item">{{item.row.realDeliveryDate | date}}</template>
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            width="200"><template slot-scope="item">{{item.row.createdDate | date(1)}}</template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            class-name="operation-styles-el">
                        <template slot-scope="item">
                            <button class="gy-button-view view" @click="jumps(item.row)">查看</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div v-if="saleList">
            <div class="title titleXS">销售交割</div>
            <div class="block-wrap clearfix">
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <span>{{saleList.buyerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库</span>
                    <span>{{saleList.deliveryWarehouseName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库地址</span>
                    <span>{{saleList.deliveryDetailedAddress}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">计划交割日期</span>
                    <span>{{saleList.planDeliveryDate}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">数量(吨)</span>
                    <span>{{saleList.skuQuantity|numToQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">待交割数量(吨)</span>
                    <span>{{saleList.surplusDeliveryQuantity|numToQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">免仓期(天)</span>
                    <span>{{saleList.warehouseFreeDays}}</span>
                </div>
            </div>
            <div class="title titleBottom">交割记录</div>
            <div class="deliver_padding_small">
                <el-table
                        :data="saleList.deliveryEntityList"
                        style="width: 100%"
                        class="gy-table">
                    <el-table-column
                            label="编号"
                            fixed
                            width="80"><template slot-scope="item">{{item.row.deliveryItemId}}</template>
                    </el-table-column>
                    <el-table-column
                            label="状态"
                            width="100"><template slot-scope="item">{{item.row.deliveryStatus | sellDeliveryItemState}}</template>
                    </el-table-column>
                    <el-table-column
                            label="交割凭证"
                            width="150">
                        <template slot-scope="item">
                            <i v-if="item.row.erpDeliveryFileModelList.length !== 0" class="iconfont icon-photo" @click="isShowImg(item.row.erpDeliveryFileModelList)"></i>
                            <i v-else class="iconfont icon-photo-null"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="本次交割数量(吨)"
                            class-name="amount-right-el"
                            width="200"><template slot-scope="item">{{item.row.deliveryQuantity|numToQuantity}}</template>
                    </el-table-column>
                    <el-table-column
                            label="实际交割日"
                            width="200"><template slot-scope="item">{{item.row.realDeliveryDate | date}}</template>
                    </el-table-column>
                    <el-table-column
                            label="交叉交割"
                            width="100">
                        <template slot-scope="item">
                            <div v-if="item.row.acrossDelivery==1">是</div>
                            <div v-else>否</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="交叉采购合同"
                            width="160">
                        <template slot-scope="item">
                            <div v-if="item.row.acrossDelivery==1">
                                <i v-if="item.row.erpFileContractModelList.length !== 0" class="iconfont icon-photo" @click="isShowImg(item.row.erpFileContractModelList)"></i>
                                <i v-else class="iconfont icon-photo-null"></i>
                            </div>
                            <div v-else>—</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="交叉采购合同编号"
                            width="180">
                        <template slot-scope="item">
                            <div v-if="item.row.acrossDelivery==1">{{item.row.acrossContractNo}}</div>
                            <div v-else>—</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="换货仓库"
                        width="200"><template slot-scope="item">{{item.row.productWareHouse}}</template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            class-name="operation-styles-el"
                            label="操作">
                        <template slot-scope="item">
                            <button class="gy-button-view view" @click="jump(item.row)">查看</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 预览图片 -->
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyContract from '../components/contractBasic.vue';
import gyFileView from '../components/gyFileView';

export default {
    name: 'detail',
    components: {gyContract, gyFileView},
    data () {
        return {
            saleOrderId: null,
            purchaseOrderId: null,
            purchaseList: null,
            saleList: null,
            infomation: {},
            id: null
        };
    },
    created () {
        this.saleOrderId = this.$route.query.saleOrderId;
        this.purchaseOrderId = this.$route.query.purchaseOrderId;
        this.id = this.$route.query.id;
        let activeType = Number(this.$route.query.activeType);
        if (activeType === 2) {
            // 只查看采购交割
            this.purchase();
        } else if (activeType === 3) {
            // 只查看销售交割
            this.sale();
        } else {
            this.purchase();
            this.sale();
        }
        this.information();
    },
    methods: {
        // 查看合同
        isShowImg (list) {
            this.$refs.contFileView.open(list);
        },
        // 基本信息
        information () {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + that.id).then(function (res) {
                if (res.data.code === 0) {
                    that.infomation = res.data.data;
                }
            }).catch(function (res) {
                that.$message(res.data.message);
            });
        },
        // 采购
        purchase () {
            let that = this;
            if (that.purchaseOrderId == null || that.purchaseOrderId === undefined || that.purchaseOrderId === '' || that.purchaseOrderId === 'null') {
                console.log('交割详情 采购订单ID为空 合同要素id=' + that.id);
                return false;
            }
            that.$http.get(that.$api.delivery.getBuyDetail + '/' + that.purchaseOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.purchaseList = res.data.data;
                    }
                });
        },
        // 采购
        jumps (item) {
            let query = {
                contEssId: item.contractEssenceId,
                todoId: item.todoId,
                dlvItemId: item.deliveryItemId,
                homeFromFlg: 1,
                homeBizType: 8,
                doneFlg: 1
            };
            this.$router.push({name: 'deliveryPurchaseView', query: query});
        },
        // 销售
        jump (item) {
            let query = {
                contEssId: item.contractEssenceId,
                todoId: item.todoId,
                dlvItemId: item.deliveryItemId,
                homeFromFlg: 1,
                homeBizType: 8,
                doneFlg: 1
            };
            this.$router.push({name: 'deliverySalesView', query: query});
        },
        // 销售
        sale () {
            let that = this;
            if (that.saleOrderId == null || that.saleOrderId === undefined || that.saleOrderId === '' || that.saleOrderId === 'null') {
                console.log('交割详情 销售订单ID为空 合同要素id=' + that.id);
                return false;
            }
            that.$http.get(that.$api.delivery.getSellDetail + '/' + that.saleOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.saleList = res.data.data;
                    }
                });
        }
    }
};
</script>

<style scoped lang="scss">
    .deliveryDetail{
        width: 100%;
        height: 100%;
        padding-bottom: 30px;
        .deliver_padding{
            padding-left:30px;
        }
        .deliver_padding_small{
            padding:0 16px;
        }
        .icon-photo:before, .icon-photo-null:before {
          line-height: 1.08;
        }
        .title {
          font-size: 14px;
          color: #333333;
          margin: 20px 16px;
          font-weight: bold;
        }
        .titleTop{
            margin-top: 20px;
        }
        .titleXS{
            margin-top:40px;
        }
        .titleBottom{
            margin-bottom: 20px;
        }
    }
    .deliveryContractType {
      background-color: yellow;
    }
</style>
<style lang="scss" scoped>
  .deliveryDetail {
      .view {
        background-color: #fff;
      }
  }
</style>

<style lang="scss">
    .deliveryDetail {
        .el-tabs {
            .lll {
                width: 100%;
                height: 340px;
            }
        }
        .order-dialog {
            .el-dialog__header {
                font-weight: bold;
                padding: 0;
            }
            .el-dialog__body {
                margin: 10px 0;
                padding: 10px 20px;
            }
            .order-apply {
                h3 {
                    margin: 10px 0;
                }
            }
        }
        .el-dialog{
            .el-dialog__header {
                height:35px;
                line-height: 35px;
                padding:0 0 0 16px;
                border-bottom:1px solid #e6eaea;
            }
            .el-dialog__title{
                font-size: 16px;
                font-weight: bold;
                color:#333333;
            }
            .el-dialog__headerbtn{
                top:10px;
                right:16px;
            }
            .el-dialog__body{
                padding:30px;
            }
        }
        .el-table .cell{
            font-size: 12px;
            color:#666666;
        }
        .gy-table thead td, .gy-table thead th{
            font-weight: bold;
        }
        /*GYfrom padding修改*/
        .gy-form-group{
            padding:8px 30px 8px 144px;
            .l {
                width: 125px;
            }
        }
    }
</style>
