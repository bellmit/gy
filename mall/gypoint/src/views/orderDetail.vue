<template>
  <div class="order-list">
    <div class="nav">
        <span>
          <span>商城首页</span>
          <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        </span>
      <span>兑换单详情</span>
    </div>
    <div class="collect">
      <div class="box">
        <div class="title">收货信息</div>
        <div class="content">
          <div class="item">
            <div class="left">姓名</div>
            <div class="right">{{collect.name}}</div>
          </div>
          <div class="item">
            <div class="left">手机号</div>
            <div class="right">{{collect.phone}}</div>
          </div>
          <div class="item">
            <div class="left">收货地址</div>
            <div class="right">{{collect.address}}</div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="title">兑换单信息</div>
        <div class="content">
          <div class="item">
            <div class="left">兑换单编号</div>
            <div class="right">{{collect.num}}</div>
          </div>
          <div class="item">
            <div class="left">兑换时间</div>
            <div class="right">{{collect.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg">
      <div class="p-20">
        <div class="head">
          商品信息
        </div>
        <div>
          <table style="margin-top: 0;">
            <thead>
            <tr class="title">
              <td style="width:260px">兑换信息</td>
              <td style="width:100px">数量</td>
              <td style="width:100px">单价</td>
              <td style="width:150px">订单状态</td>
              <td style="width:150px">总积分</td>
            </tr>
            </thead>
            <tbody>
            <tr class="list">
              <td>
                <div>
                  <div class="content">
                    <img :src="orders.imgUrl" alt="">
                    <div class="text">{{orders.text}}</div>
                  </div>
                </div>
              </td>
              <td>
                <div>{{orders.pointNum}}</div>
              </td>
              <td>
                <div>{{orders.price}}积分</div>
              </td>
              <td>
                <div>
                  <div>{{orders.orderStatus}}</div>
                </div>
              </td>
              <td>
                <div>
                  <div>
                    {{orders.pointTotal}}积分
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <div class="total">总价:{{orders.priceTotal}}积分</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="p-20">
        <div class="head">
          物流公司
        </div>
        <div v-if="isHasCollect" style="padding-top: 15px;">
        <div class="wrapper">
          <div class="title">物流公司:</div>
          <div class="text">圆通</div>
        </div>
        <div class="wrapper">
          <div class="title">物流单号:</div>
          <div class="text">1794516841346516464</div>
        </div>
        <div class="wrapper">
          <div class="title">物流详情:</div>
          <div class="text">
            <div class="list-item" v-for="item in logistics" :key="item.date">
              <div class="list-icon">
                <div></div>
              </div>
              <div class="list-date">{{item.date}}</div>
              <div>{{item.status}}</div>
            </div>
          </div>
        </div>
        </div>
        <div v-else>
          <div>暂无物流信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'orderDetail',
    data () {
        return {
            collect: {
                name: 'tt',
                phone: '18545456565',
                address: '上海市闵行区',
                num: '123648131351',
                date: '2018-07-06 11:38:30'
            },
            orders: {
                orderNum: '1234567890',
                date: '2018-05-28 15:34',
                imgUrl: '',
                text: 'IPOMEX手机64G 128G 白色 玫瑰金/2018新品上市/限时积分换购',
                pointNum: '1',
                orderStatus: '配送中',
                pointTotal: '5000',
                price: '500',
                priceTotal: '5000'
            },
            logistics: [
                {
                    date: '2018-07-06 14:20:52',
                    status: '您的兑换单开始处理'
                },
                {
                    date: '2018-07-06 14:29:52',
                    status: '您的兑换单待配货'
                },
                {
                    date: '2018-07-06 15:20:52',
                    status: '您的包裹已出库'
                },
                {
                    date: '2018-07-06 15:44:52',
                    status: '您的包裹已出库'
                },
                {
                    date: '2018-07-06 16:20:52',
                    status: '您的包裹已出库'
                },
                {
                    date: '2018-07-06 16:54:52',
                    status: '您的包裹已出库'
                },
                {
                    date: '2018-07-06 16:58:52',
                    status: '您的包裹已出库'
                },
                {
                    date: '2018-07-06 17:20:52',
                    status: '您的包裹已出库'
                }
            ],
            dialogVisible: false,
            isHasCollect: false
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
  .order-list {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 50px;
    .nav {
      padding: 5px 0;
      color: $color-light;
      span:last-child {
        color: #333;
      }
    }
    .head {
      padding: 5px 0;
      font-size: 15px;
      color: #333;
      font-weight: 600;
    }
    .bg {
      background: #fff;
    }
  }

  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    td {
      padding: 5px 20px;
      color: $color-main;
      text-align: left;
      font-size: 12px;
      border: 0;
      vertical-align: middle;
    }
    .list-head {
      background: #fbfbfc;
      border: 1px solid $color-border;
      border-bottom: 0;
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
      border: 1px solid $color-border;
      border-top: 0;
      vertical-align: top;
    }
    .title {
      background-color: #EEF3F8;
      border: 0;
    }
    .content {
      display: flex;
      padding: 10px;
      img {
        flex: 0 0 56px;
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
    .total {
      text-align: right;
      font-size: 15px;
      font-weight: 600;
    }
  }

  .wrapper {
    display: flex;
    .title {
      flex: 0 0 70px;
    }
    .text {
      flex: 1;
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
          flex: 0 0 150px
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

  .collect {
    display: flex;
    padding: 15px 20px;
    margin-bottom: 15px;
    text-align: left;
    background: #fff;
    .box {
      flex: 1;
      .title {
        height: 40px;
        font-size: 15px;
        color: #333;
        font-weight: 600;
      }
      .content {
        height: 90px;
        .item {
          height: 30px;
          display: flex;
          .left {
            flex: 0 0 120px;
            font-weight: 600;
          }
          .right {
            flex: 1;
          }
        }
      }
    }
  }

  .p-20 {
    padding: 20px;
  }
</style>
<style lang="scss">
  .point-warning {
    color: #fff;
    background-color: $color-highlight !important;
    border-color: $color-highlight !important;
  }

  .point-msgTitle .el-message-box__header {
    border-bottom: 1px solid $color-border;
  }

  .point-diallog .el-dialog__header {
    border-bottom: 1px solid $color-border;
  }
</style>
