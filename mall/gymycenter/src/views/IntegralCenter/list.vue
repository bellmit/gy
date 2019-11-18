<template>
  <div class="">
      <div class="new-title-public clearfix">
        <span class="title">我的兑换单</span>
      </div>
      <div class="integralList">
          <table>
              <thead>
              <tr class="title">
                  <th style="width:260px">兑换信息</th>
                  <th style="width:100px">数量</th>
                  <th style="width:150px">兑换单状态</th>
                  <th style="width:150px">总积分</th>
                  <th style="width:90px">操作</th>
              </tr>
              <!--<tr style="height: 15px"><td colspan="5"></td></tr>-->
              </thead>
              <tbody v-if="orders.length !== 0">
              <template v-for="(item, index) in orders">
                  <tr class="list-head" :key="item.orderNum">
                      <td colspan="5">
                          <div class="left"><span>兑换单编号：</span>{{item.pointNoteCode}}</div>
                          <div class="right"><span>兑换单日期：</span>{{item.createdDate | date(item.createdDate)}}</div>
                      </td>
                  </tr>
                  <tr :key="index" class="list">
                      <td>
                          <div>
                              <div v-if="item.odrPointNoteItemModelList.length !== 0" class="content">
                                  <img style="width: 60px" :src="item.odrPointNoteItemModelList[0].redemptionFilePath" alt="">
                                  <div class="text">{{item.odrPointNoteItemModelList[0].redemptionName}}</div>
                              </div>
                          </div>
                      </td>
                      <td>
                          <div v-if="item.odrPointNoteItemModelList.length !== 0">{{item.odrPointNoteItemModelList[0].redemptionPrice}}积分X{{item.odrPointNoteItemModelList[0].redemptionQuantity}}</div>
                      </td>
                      <td>
                          <div>
                              <div>{{orderStatus[item.status]}}</div>
                              <div><a href="javascript:;" v-if="item.status !== 1" class="gy-button-view" @click="showItem(index)">跟踪</a></div>
                          </div>
                      </td>
                      <td>
                          <div>
                              <div class="point">
                                  {{item.gross}}积分
                              </div>
                          </div>
                      </td>
                      <td>
                          <div>
                              <a class="gy-button-view" @click="showdetail(item.id)">查看</a>
                              <a v-if="item.status === 3" @click="deleteItem(item.id)" class="gy-button-view">删除</a>
                          </div>
                      </td>
                  </tr>
                  <tr style="height: 10px" :key="item.date"><td colspan="5"></td></tr>
              </template>
              </tbody>
          </table>
           <div v-if="orders.length === 0" class="null-msg">没有找到可显示的数据...</div>
          <div class="departmentName">共 {{total}} 条记录</div>
        <el-pagination
          v-if="orders.length !== 0"
          background
          layout="prev, pager, next"
          style="margin: 20px 0 30px 0;"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :total=total>
        </el-pagination>
      </div>
      <el-dialog
          title="跟踪物流"
          :visible.sync="dialogVisible"
          width="40%"
          :close-on-click-modal="false" :close-on-press-escape="false"
          custom-class="point-diallog">
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
      </el-dialog>
  </div>
</template>

<script>
export default {
    name: 'list',
    data () {
        return {
            total: 0,
            orderStatus: ['', '待发货', '配送中', '交易完成'],
            orders: [
                {
                    'id': null,
                    'pointNoteCode': null,
                    'status': null,
                    'gross': null,
                    'provinceId': null,
                    'provinceName': null,
                    'cityId': null,
                    'cityName': null,
                    'districtId': null,
                    'districtName': null,
                    'address': null,
                    'postCode': null,
                    'transactionDate': null,
                    'receiveName': null,
                    'receivePhone': null,
                    'ictAddressId': null,
                    'lgsExpressCompanyId': null,
                    'logisticsNumber': null,
                    'logisticsInfo': null,
                    'confirmDate': null,
                    'valid': null,
                    'createdBy': null,
                    'updatedBy': null,
                    'createdDate': null,
                    'updatedDate': null,
                    'odrPointNoteItemModelList': [{
                        createdBy: null,
                        createdDate: null,
                        id: null,
                        odrPointNoteId: null,
                        prdRedemptionId: null,
                        redemptionCode: null,
                        redemptionFilePath: null,
                        redemptionName: null,
                        redemptionPrice: null,
                        redemptionQuantity: null,
                        redemptionTotalAmount: null,
                        redemptionUnit: null,
                        updatedBy: null,
                        updatedDate: null,
                        valid: null
                    }]
                }
            ],
            logistics: {
                logisticsName: '',
                logisticsNumber: '',
                list: []
            },
            dialogVisible: false,
            page: {
                pageNum: 1, // 当前页数
                pageSize: 10
            }
        };
    },
    created () {
        this.getorderlist();
    },
    methods: {
        // 获取订单列表
        getorderlist () {
            this.$http.post(this.$api.point.orderList, this.page).then((res) => {
                if (res.data.code === 0) {
                    this.orders = res.data.data.list;
                    this.total = res.data.data.total;
                }
            });
        },
        // 翻页
        handleCurrentChange (e) {
            this.page.pageNum = e;
            this.getorderlist();
        },
        // 删除订单
        deleteItem (id) {
            let query = {
                id: id
            };
            this.$alert('您确定要删除该兑换单吗？', '提示', {
                confirmButtonClass: 'point-warning',
                customClass: 'point-msgTitle'
            }).then(() => {
                this.$http.post(this.$api.point.deleteOrder, query).then((res) => {
                    if (res.data.code === 0) {
                        this.getorderlist();
                    }
                });
            });
        },
        // 追踪
        showItem (idx) {
            let query = {
                lgsExpressCompanyId: this.orders[idx].lgsExpressCompanyId, // id
                logisticsNumber: this.orders[idx].logisticsNumber // 单号
            };
            this.$http.post(this.$api.point.logistics, query).then((res) => {
                if (res.data.code === 0) {
                    this.logistics.logisticsName = res.data.data.name;
                    this.logistics.logisticsNumber = res.data.data.nu;
                    this.logistics.list = res.data.data.data.reverse();
                    this.logistics.logisticsNumber = this.orders[idx].logisticsNumber;
                    this.dialogVisible = true;
                }
            });
        },
        // 查看详情
        showdetail (id) {
            this.$router.push({
                name: 'pointlistdetail',
                query: {
                    ordernum: id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
  .el-card__header {
    padding: 10px 20px;
  }
  .title{
      font-weight: bold;
  }
  .integralList{
      padding:20px;
      .null-msg {
            width: 100%;
            height: 39px;
            line-height: 39px;
            border: 1px solid #f2f2f2;
            text-align: center;
       }
  }
  table {
      width: 100%;
      border-collapse: collapse;
      td {
          color: $color-main;
          text-align: center;
          font-size: 12px;
          border: 0;
          vertical-align: middle;
      }
      .list-head {
          background: #fbfbfc;
          border: 1px solid $color-border;
          border-bottom: 0;
          td {
              padding: 10px;
          }
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
          height: 80px;
          border: 1px solid $color-border;
          border-top: 0;
          vertical-align: top;
      }
      .title {
          background-color: #EEF3F8;
          border: 0;
      }
      .title th{
          padding: 8px;
          font-weight: bold;
      }
      .content {
          display: flex;
          padding: 10px;
          border-right: 1px solid $color-border;
          img {
              flex: 0 0 56px;
              padding: 0 10px;
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
      .point {
          color: $color-highlight;
      }
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
                    flex:0 0 150px
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
</style>
<style lang="scss">
    .point-warning {
        color: #fff;
        background-color: $color-highlight!important;
        border-color: $color-highlight!important;
    }
    .point-msgTitle .el-message-box__header {
        border-bottom: 1px solid $color-border;
    }
    .point-diallog .el-dialog__header {
        border-bottom: 1px solid $color-border;
    }
</style>
