<template>
    <div class="transport-wrap order my-transport-wrap transport-wrap-list">
        <div class="gy-h4">
            运输订单
        </div>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="index" :class="{'selected': tabIdx === index}" @click="tabChange(index, index)"><a href="javascript:;">{{statusValue[index]}}(<span>{{tab}}</span>)</a></li>
            </ul>
            <div class="search-add">
                <div class="se-left11">
                    <input type="text" placeholder="请输入品名、订单号" v-model="orderData.data.keywords" class="gy-input" @keyup.13="handleSearch">
                    <i class="iconfont icon-search" @click="handleSearch"></i>
                </div>
                <div class="se-left2" @click="showAdvance = !showAdvance">
                    <span>高级搜索</span>
                    <i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}"></i>
                </div>
            </div>
            <transport-search :show-advance="showAdvance" :keywords="orderData.data.keywords" :consignmentNoteStatus="orderData.data.consignmentNoteStatus" :advance.sync="orderData.data" :search-info.sync="orderInfo" :search-type="searchType" :count-status.sync="statusList"></transport-search>
        </div>
        <consign-table :orderList="orderInfo.list" :theadList="theadList" :No="No"></consign-table>
        <div class="pagination-box" v-if="orderInfo.total > orderInfo.pageSize">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page.sync = "orderInfo.pageNum"
              :page-size="orderInfo.pageSize"
              :total="orderInfo.total"
              @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import consignTable from '@/components/consignTable';
import transportSearch from '@/components/transportSearch';
export default {
    data () {
        return {
            statusValue: ['签约中', '实施中', '结算中', '付款中', '已完成', '已失效'],
            tabIdx: -1,
            statusList: [],
            orderInfo: {
                list: {
                    enquiryNoteItemList: []
                }
            },
            orderData: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    carrierId: null,
                    consignmentNoteStatus: null,
                    consignorId: null,
                    keywords: null
                }
            },
            theadList: [
                {
                    id: 1,
                    value: '商品',
                    width: '15'
                },
                {
                    id: 2,
                    value: '托运方',
                    width: '10'
                },
                {
                    id: 3,
                    value: '承运商',
                    width: '10'
                },
                {
                    id: 4,
                    value: '装货地',
                    width: '15'
                },
                {
                    id: 5,
                    value: '卸货地',
                    width: '15'
                },
                {
                    id: 6,
                    value: '订单状态',
                    width: '5'
                },
                {
                    id: 8,
                    value: '四流审核',
                    width: '5'
                },
                {
                    id: 7,
                    value: '操作',
                    width: '5'
                }
            ],
            No: 0,
            showAdvance: false,
            searchType: 0
        };
    },
    components: {
        consignTable,
        transportSearch
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            // let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        this.getOrderList(1);
        this.getOrderStatus();
    },
    methods: {
        handleSearch () {
            this.getOrderList(1);
            this.getOrderStatus();
        },
        getOrderList (n) {
            this.orderData.pageNum = n;
            this.$http.post(this.$api.transport.orderList, this.orderData)
                .then(res => {
                    this.orderInfo = res.data.data;
                });
        },
        getOrderStatus () {
            this.$http.post(this.$api.transport.orderStatus, this.orderData.data)
                .then(res => {
                    this.statusList = res.data.data;
                });
        },
        tabChange (idx, status) {
            this.tabIdx = idx;
            this.orderData.data.consignmentNoteStatus = status;
            this.getOrderList(1);
        },
        handleCurrentChange (r) {
            this.getOrderList(r);
        }
    }
};
</script>
<style lang="scss" scoped>
  .my-transport-wrap {
    .t {
      padding: 0;
    }
    .order .t .tabs li.selected:after {
        height: 2px!important;
    }
  }
  .transport-wrap-list{
      .t{
          overflow: hidden;
          padding:0 0 12px 0;
          .tabs{
              li{
                  &.selected{
                      a{
                          color: #e59640;
                      }
                      &:after{
                          background-color: #e59640;
                          height: 2px;
                      }
                  }
                  a:hover, a.gy-link:hover{
                      color: #e59640;
                  }
              }
          }
      }
      .search-add{
          float: right;
          overflow: hidden;
          .se-left11{
              float: left;
              width: 252px;
              margin-right: 5px;
              border-bottom: 1px solid #b5b5b5;
              input{
                  border: none;
                  width: 220px;
              }
          }
          .se-left2{
              float: left;
              display: inline-block;
              margin-left: 2px;
              i{
                  vertical-align: top;
              }
          }
          .se-left2:hover{
              cursor: pointer;
          }
      }
      .gy-form{
          padding:0 0 0 20px;
          .gy-form-group{
              padding:8px 30px 8px 130px;
              .l{
                  width:162px;
                  top:8px;
              }
          }
          .height-new{
              padding:8px 30px 8px 75px;
              height:46px;
          }
          .my_add{
              position: absolute;
              top: 8px;
              right: 11px;
          }
      }
      .t .search .se-left11{
          width:180px;
          input{
              width:155px;
          }
      }
  }
</style>
