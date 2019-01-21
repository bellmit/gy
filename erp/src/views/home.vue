<template>
    <div class="erp-home">
      <div class="page-bottom">
        <!-- 处理事项 -->
        <div class="card matter card-big">
          <div class="top">
            <div class="title l">事项管理</div>
            <div class="r">
              <ul class="m-l">
                <li :class="{'active': 0 === activeId}" @click="tabClick(0)">
                  <span>待办事项({{todoCount}})</span>
                </li>
                <li :class="{'active': 1 === activeId}" @click="tabClick(1)">
                  <span>已办事项({{doneCount}})</span>
                </li>
              </ul>
              <div class="m-r" @click="moreTodoListClick()">更多</div>
            </div>
          </div>
          <div class="bottom">
            <ul>
              <li v-for="(item, index) in todoList" :key="index">
                <span class="l"><a href="javascript:;" @click="gotoBizPage(item)">
                  <i v-if="item.targetBizType === 1" class="iconfont icon-element"></i>
                  <i v-else-if="item.targetBizType === 2 || item.targetBizType === 16 || item.targetBizType === 19" class="iconfont icon-contract"></i>
                  <i v-else-if="item.targetBizType === 7 || item.targetBizType === 8" class="iconfont icon-seledelivery"></i>
                  <i v-else-if="item.targetBizType === 4 || item.targetBizType === 6 || item.targetBizType === 11 || item.targetBizType === 17 || item.targetBizType === 14" class="iconfont icon-billing"></i>
                  <i v-else-if="item.targetBizType === 3 || item.targetBizType === 5 || item.targetBizType === 12 || item.targetBizType === 13" class="iconfont icon-receiptPayments1"></i>
                  <i v-else class="iconfont icon-element"></i>
                  {{activeId == 0 ? item.todoMsg : item.doneMsg}}</a></span>
                <span class="r">{{item.createdDate|date(2)}}</span>
              </li>
              <li v-if="todoList.length == 0">
                <span class="l">{{noTodoDesc}}</span>
                <span class="r"></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 预警消息 -->
        <div class="card warningMsg card-big">
          <div class="top">
            <div class="title l">预警消息</div>
            <div class="r">
              <div class="m-r" @click="moreAlarmListClick()">更多</div>
            </div>
          </div>
          <div class="bottom">
            <ul>
              <!-- 收付款 -->
              <li>
                <div class="min-title">
                  <i class="iconfont icon-receiptPayments"></i>
                  收款({{warningMsgObj.collectionPaymentCount}})
                </div>
                <div class="min-wrap">
                  <div class="min-item" v-for="(item, index) in warningMsgObj.receiptPayments" :key="index">
                    <span class="l">
                      <a href="javascript:;" @click="msgGoPage(item)">{{item.message}}</a>
                    </span>
                  </div>
                  <div class="min-item" v-if="warningMsgObj.receiptPayments.length == 0">
                    <span class="l">暂无收款预警消息</span>
                    <span class="r"></span>
                  </div>
                </div>
              </li>
              <!-- 货物交割 -->
              <li>
                <div class="min-title">
                  <i class="iconfont icon-goodsDelivery"></i>
                  货物交割({{warningMsgObj.deliveryAlarmingCount}})
                </div>
                <div class="min-wrap">
                  <div class="min-item" v-for="(item, index) in warningMsgObj.delivery" :key="index">
                    <span class="l">
                      <a href="javascript:;" @click="msgGoPage(item)">{{item.message}}</a>
                    </span>
                  </div>
                  <div class="min-item" v-if="warningMsgObj.delivery.length == 0">
                    <span class="l">暂无交割预警消息</span>
                    <span class="r"></span>
                  </div>
                </div>
              </li>
              <!-- 库存 -->
              <li>
                <div class="min-title">
                  <i class="iconfont icon-repertory"></i>
                  库存({{warningMsgObj.stockCount}})
                </div>
                <div class="min-wrap">
                  <div class="min-item" v-for="(item, index) in warningMsgObj.inventory" :key="index">
                    <span class="l">
                      <a href="javascript:;" @click="msgGoPage(item)">{{item.message}}</a>
                    </span>
                  </div>
                  <div class="min-item" v-if="warningMsgObj.inventory.length == 0">
                    <span class="l">暂无库存预警消息</span>
                    <span class="r"></span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 提醒消息 -->
        <div class="card msgTip card-small">
          <div class="top">
            <div class="title l">提醒消息</div>
            <div class="r">
              <ul class="m-l">
                <li :class="{'active': 0 === msgActiveId}" @click="msgtabClick(0)">
                  <span>提醒消息</span>
                </li>
                <li :class="{'active': 1 === msgActiveId}" @click="msgtabClick(1)">
                  <span>抄送消息</span>
                </li>
              </ul>
              <div class="m-r" @click="moreMsgListClick()">更多</div>
            </div>
          </div>
          <div class="bottom">
            <ul>
              <li v-for="(item, index) in msgList" :key="index">
                <span class="l"><a href="javascript:;" @click="gotoBizPage(item)">{{item.message}}</a></span>
                <span class="r">{{item.createdDate|date(2)}}</span>
              </li>
              <li v-if="msgList.length == 0">
                <span class="l">{{noMsgDesc}}</span>
                <span class="r"></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 快捷入口 -->
        <div class="card speedy card-small">
          <div class="top">
            <div class="title l">快捷入口</div>
          </div>
          <div class="bottom">
            <ul>
                <!-- if需求有变更 启用 -->
                <!-- <li v-for="(item, index) in speedyList" :key="index" :class="{'speedyActive': index === speedyActiveId}" @click="speedytabClick(index)">
                  <div @click="goToLink(item.linkTo)">
                      <i class="iconfont" :class="item.iconfont"></i>
                      <span class="text">{{item.value}}</span>
                  </div>
                </li> -->
                <li v-gy-auth="'to_create_cont_ess'">
                  <div @click="goToLink(speedyList[0].linkTo)">
                      <i class="iconfont" :class="speedyList[0].iconfont"></i>
                      <span class="text">{{speedyList[0].value}}</span>
                  </div>
                </li>
                <br>
                <li>
                  <div @click="goToLink(speedyList[1].linkTo)">
                      <i class="iconfont" :class="speedyList[1].iconfont"></i>
                      <span class="text">{{speedyList[1].value}}</span>
                  </div>
                </li>
                <li>
                  <div @click="goToLink(speedyList[2].linkTo)">
                      <i class="iconfont" :class="speedyList[2].iconfont"></i>
                      <span class="text">{{speedyList[2].value}}</span>
                  </div>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            to_create: 'g32ty43',
            todoCount: 0,
            doneCount: 0,
            todoList: [],
            msgList: [],
            noTodoDesc: '',
            noMsgDesc: '',
            tabs: [],
            msgTabs: [],
            // 预警消息
            warningMsgObj: {
                deliveryAlarmingCount: 0,
                collectionPaymentCount: 0,
                stockCount: 0,
                // 收付款
                receiptPayments: [],
                // 货物交割
                delivery: [],
                // 库存
                inventory: []
            },
            speedyList: [
                {
                    id: 0,
                    value: '新建合同要素',
                    iconfont: 'icon-createOrder',
                    linkTo: 'createEss'
                },
                {
                    id: 2,
                    value: '高频台账',
                    iconfont: 'icon-standingBook',
                    linkTo: 'transactionStanding'
                },
                {
                    id: 3,
                    value: '高频管控表',
                    iconfont: 'icon-control',
                    linkTo: 'control'
                }
            ],
            activeId: 0,
            msgActiveId: 0,
            speedyActiveId: null,
            msgTimer: null,
            axiosInstance: null
        };
    },
    methods: {
        jumpAlarm (activeId) {
            this.$router.push({name: 'homeMoreAlarmList', query: {activeId: activeId}});
        },
        goToLink (to) {
            this.$router.push({'name': to});
        },
        // 处理事项-更多
        moreTodoListClick () {
            this.$router.push({name: 'homeMoreTodoList', query: {activeId: this.activeId}});
        },
        // 更多消息
        moreMsgListClick () {
            this.$router.push({name: 'homeMoreMsgList', query: {activeId: this.msgActiveId}});
        },
        // 更多报警消息
        moreAlarmListClick () {
            this.$router.push({name: 'homeMoreAlarmList'});
        },
        tabClick (i) {
            this.activeId = i;
            this.todoList = this.tabs[i];
            if (i === 0 && this.todoList.length === 0) {
                this.noTodoDesc = '暂无待办事项';
            }
            if (i === 1 && this.todoList.length === 0) {
                this.noTodoDesc = '暂无已办事项';
            }
        },
        msgtabClick (i) {
            this.msgActiveId = i;
            this.msgList = this.msgTabs[i];
            if (i === 0 && this.msgList.length === 0) {
                this.noMsgDesc = '暂无提醒消息';
            }
            if (i === 1 && this.msgList.length === 0) {
                this.noMsgDesc = '暂无抄送消息';
            }
        },
        speedytabClick (i) {
            if (this.speedyList[i]) {
                this.speedyActiveId = this.speedyList[i].id;
            }
        },
        msgGoPage (item) {
            // 这里只有收付款/交割
            if (item.targetBizType === 40 || item.targetBizType === 41) {
                // 弹框
                this.$alert(item.message, '库存报警');
            } else if (item.targetBizType === 42 || item.targetBizType === 43) {
                // 去交割详情(临时库存保存时间报警/已过交割期报警)
                this.$router.push({name: 'deliveryDetail', query: {homeFromFlg: 1, id: item.contEssId, saleOrderId: item.saleOrderId, purchaseOrderId: item.purchaseOrderId}});
            } else if (item.targetBizType === 44) {
                // 去收付款详情(已过收款期报警)
                this.$router.push({name: 'paymentDetail', query: {homeFromFlg: 1, id: item.contEssId, sellerOrderId: item.saleOrderId, purchaseOrderId: item.purchaseOrderId}});
            }
        },
        gotoBizPage (todoInfo) {
            // 根据业务区分，去不同页面
            let todoId = todoInfo.id;
            let bizId = todoInfo.targetBizId;
            let bizType = todoInfo.targetBizType;
            let contEssId = todoInfo.contEssId;
            let saleOrderId = todoInfo.saleOrderId;
            let purchaseOrderId = todoInfo.purchaseOrderId;
            let doneFlg = todoInfo.doneFlg;
            let companyId = todoInfo.companyId;
            let actTaskId = todoInfo.actTaskId;
            if (todoInfo.subSysType !== 0) {
                // 去通用的审批页面
                this.$router.push({name: 'apprCreate', query: {homeFromFlg: 1, bizId: bizId, bizType: bizType, subSysType: todoInfo.subSysType, doneFlg: doneFlg, todoId: todoId, companyId: companyId}});
                return false;
            }

            if (bizType === 1) {
                // 合同要素审批
                this.$router.push({name: 'contEssDetail', query: {id: contEssId, homeFromFlg: 1, doneFlg: doneFlg}});
            } else if (bizType === 2 || bizType === 19) {
                // 合同审批
                this.$router.push({name: 'contractDetail', query: {id: contEssId, homeFromFlg: 1, doneFlg: doneFlg, actTaskId: actTaskId}});
            } else if (bizType === 16 && this.activeId === 0) {
                // 创建合同
                this.$router.push({name: 'createContract', query: {id: bizId, homeFromFlg: 1, doneFlg: doneFlg}});
            } else if (bizType === 16 && this.activeId === 1) {
                // 创建合同(已完成)，去合同详情
                this.$router.push({name: 'contractDetail', query: {id: bizId, homeFromFlg: 1, doneFlg: doneFlg}});
            } else if (bizType === 3 || bizType === 13) {
                // 付款审批 / 出纳付款
                this.$router.push({name: 'paymentBuy', query: {homeFromFlg: 1, homeBizType: bizType, payId: bizId, contEssId: contEssId, purchaseOrderId: purchaseOrderId}});
            } else if (bizType === 4 || bizType === 11 || bizType === 17) {
                // 开发票
                this.$router.push({name: 'auditOperation', query: {homeFromFlg: 1, homeBizType: bizType, id: contEssId, saleOrderId: saleOrderId, purchaseOrderId: purchaseOrderId, doneFlg: doneFlg, todoId: todoId}});
            } else if (bizType === 8) {
                // 销售交割复核
                this.$router.push({name: 'deliverySalesView', query: {homeFromFlg: 1, homeBizType: bizType, todoId: todoId, dlvItemId: bizId, contEssId: contEssId}});
            } else if (bizType === 5) {
                // 收款确认（财务出纳确认）
                this.$router.push({name: 'paymentSell', query: {homeFromFlg: 1, homeBizType: bizType, contEssId: contEssId, collId: bizId, todoId: todoId}});
            } else if (bizType === 6) {
                // 收票（财务出纳确认）
                this.$router.push({name: 'financialConfirmation', query: {homeFromFlg: 1, homeBizType: bizType, id: contEssId, saleOrderId: saleOrderId, purchaseOrderId: purchaseOrderId, doneFlg: doneFlg, todoId: todoId}});
            } else if (bizType === 45) {
                // 去收付款详情(已过付款期-提醒)
                this.$router.push({name: 'paymentDetail', query: {homeFromFlg: 1, id: contEssId, sellerOrderId: saleOrderId, purchaseOrderId: purchaseOrderId}});
            } else if (bizType === 25) {
                // 去分配执行人员
                this.$router.push({name: 'executionAllocation', query: {homeFromFlg: 1, id: contEssId}});
            } else if (bizType === 7) {
                // 采购交割复核
                this.$router.push({name: 'deliveryPurchaseView', query: {homeFromFlg: 1, homeBizType: bizType, todoId: todoId, dlvItemId: bizId, contEssId: contEssId}});
            }
        },
        retrieveWorkbenchInformation () {
            let me = this;
            this.getLastMsgList(1);

            // 收付款预警
            let hollowMoreObj = {
                pageNo: 1,
                pageSize: 3,
                msgType: 3,
                targetBizType: 2
            };
            this.$http.post(this.$api.workbench.getWbMsgList, hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    me.warningMsgObj.receiptPayments = res.data.data.rows;
                    me.warningMsgObj.collectionPaymentCount = res.data.data.total;
                }
            });
            // 交割预警
            hollowMoreObj = {
                pageNo: 1,
                pageSize: 3,
                msgType: 3,
                targetBizType: 1
            };
            this.$http.post(this.$api.workbench.getWbMsgList, hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    me.warningMsgObj.delivery = res.data.data.rows;
                    me.warningMsgObj.deliveryAlarmingCount = res.data.data.total;
                }
            });
            // 库存预警
            hollowMoreObj = {
                pageNo: 1,
                pageSize: 3,
                msgType: 3,
                targetBizType: 3
            };
            this.$http.post(this.$api.workbench.getWbMsgList, hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    me.warningMsgObj.inventory = res.data.data.rows;
                    me.warningMsgObj.stockCount = res.data.data.total;
                }
            });
        },
        getLastMsgList (isFromPage) {
            let me = this;
            if (me.axiosInstance == null) {
                me.axiosInstance = axios.create();
            }
            // 待办事项
            let hollowMoreObj = {
                pageNo: 1,
                pageSize: 10,
                doneFlg: 0
            };
            me.axiosInstance.post(this.$api.workbench.getWbTodoList, hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    me.tabs[0] = res.data.data.rows;
                    me.todoCount = res.data.data.total;
                    if (me.activeId === 0) {
                        me.todoList = me.tabs[me.activeId];
                    }
                    if (isFromPage) {
                        me.tabClick(0);
                    }
                }
            });
            // 已办事项
            hollowMoreObj = {
                pageNo: 1,
                pageSize: 10,
                doneFlg: 1
            };
            me.axiosInstance.post(this.$api.workbench.getWbTodoList, hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    me.tabs[1] = res.data.data.rows;
                    me.doneCount = res.data.data.total;
                    if (me.activeId === 1) {
                        me.todoList = me.tabs[me.activeId];
                    }
                }
            });

            // 提醒消息
            hollowMoreObj = {
                pageNo: 1,
                pageSize: 5,
                msgType: 1
            };
            me.axiosInstance.post(this.$api.workbench.getWbMsgList, hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    me.msgTabs[0] = res.data.data.rows;
                    if (me.msgActiveId === 0) {
                        me.msgList = me.msgTabs[me.msgActiveId];
                    }
                    if (isFromPage) {
                        me.msgtabClick(0);
                    }
                }
            });
            // 抄送消息
            hollowMoreObj = {
                pageNo: 1,
                pageSize: 5,
                msgType: 2
            };
            me.axiosInstance.post(this.$api.workbench.getWbMsgList, hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    me.msgTabs[1] = res.data.data.rows;
                    if (me.msgActiveId === 1) {
                        me.msgList = me.msgTabs[me.msgActiveId];
                    }
                }
            });
        }
    },
    mounted () {
        this.retrieveWorkbenchInformation();
        this.msgTimer = setInterval(this.getLastMsgList, 10000);
    },
    beforeDestroy () {
        if (this.msgTimer) {
            clearInterval(this.msgTimer);
        }
    }
};
</script>

<style lang="scss" scoped>
  .erp-home {
      .title {
        height: 50px;
        line-height: 50px;
        margin: 0 10px;
        font-size: 16px;
        color: #333333;
        border-bottom: 1px solid #E7ECF1;
      }
      .card {
        width: 100%;
        border-radius: 2px;
        border: 1px solid #E7ECF1;
      }
      .card-big {
        min-height: 390px;
      }
      .card-small {
        min-height: 225px;
      }
      .page-top, .page-bottom {
        width: 100%;
      }
      .page-top {
        ul {
          padding: 20px 10px 13px;
          text-align: center;
          width: 100%;
          li {
            width: 32%;
            height: 118px;
            margin-right: 1%;
            display: inline-block;
            vertical-align: middle;
            background-color: #ccc;
            text-align: right;
            position: relative;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            .r {
              color: #fff;
              position: absolute;
              top: 50%;
              right: 20px;
              transform: translateY(-50%);
              .num {
                font-size: 24px;
                line-height: 24px;
                margin-bottom: 5px;
              }
              .text {
                font-size: 14px;
                line-height: 14px;
              }
            }
          }
          li:nth-last-child(1) {
            margin-right: 0;
          }
        }
        .navs {
          .nav-1 {
            background-image: url("../assets/images/delivery.png");
          }
          .nav-2 {
            background-image: url("../assets/images/payments.png");
          }
          .nav-3 {
            background-image: url("../assets/images/inventory.png");
          }
        }
      }
      .page-bottom {
        padding: 0 16px;
        .card {
          vertical-align: top;
          margin-top: 16px;
          width: 49.5%;
          display: inline-block;
          .top {
            margin: 0 16px;
            border-bottom: 1px solid #E7ECF1;
            div, ul, li {
              display: inline-block;
            }
            .l {
              margin: 0;
              border-bottom: 0;
            }
            .r {
              margin-right: 1%;
              float: right;
              font-size: 14px;
              .m-l {
                li {
                  cursor: pointer;
                  height: 50px;
                  color: #333333;
                  line-height: 50px;
                  margin-right: 40px;
                }
                .active {
                  border-bottom: 2px solid $color-highlight;
                  span {
                    color: $color-highlight;
                  }
                }
              }
              .m-r {
                cursor: pointer;
                color: #666666;
                height: 50px;
                line-height: 50px;
              }
            }
          }
          .bottom {
            padding: 16px 20px;
            li {
              font-size: 14px;
              color: #666666;
              line-height: 14px;
              margin-bottom: 15px;
              .r {
                float: right;
              }
            }
            li:nth-last-child(1) {
              margin-bottom: 0;
            }
          }
        }
        .card:nth-child(odd) {
          width: 58.55%;
          margin-right: 1%;
        }
        .card:nth-child(even) {
          width: 40%
        }
        .matter {
          ul li {
            .l {
              width: 70%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              display: inline-block;
            }
          }
          .icon-element {
            color: #BAC3D0;
          }
          .icon-contract {
            color: #37C6D2;
          }
          .icon-seledelivery {
            color: #659BE0;
          }
          .icon-billing {
            color: #F1C40F;
          }
          .icon-receiptPayments1 {
            color: #ED6B75;
          }
          ul li {
            span {
              vertical-align: middle;
            }
          }
        }
        .warningMsg {
          li {
            margin-bottom: 0px !important;
            .min-title {
              font-size: 14px;
              color: #333333;
              line-height: 14px;
              .iconfont {
                width: 28px;
                display: inline-block;
                text-align: left;
              }
              .icon-receiptPayments {
                color: #FF6161;
                font-size: 25px;
              }
              .icon-goodsDelivery {
                color: #4C97FC;
                font-size: 20px;
              }
              .icon-repertory {
                color: #37C6D2;
                font-size: 20px;
              }
            }
            .min-wrap {
              padding: 6px 0 15px 0;
              .min-item {
                font-size: 12px;
                color: #666666;
                line-height: 14px;
                margin-bottom: 6px;
                margin-left: 33px;
                .l {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 100%;
                  display: inline-block;
                }
              }
            }
          }
        }
        .speedy {
          .bottom {
            padding: 16px 10px;
          }
          ul {
            li {
              width: 140px;
              display: inline-block;
              margin-right: 10px;
              cursor: pointer;
              border: 1px solid #E7ECF1;
              height: 45px;
              line-height: 45px!important;
              padding-left: 10px;
              border-radius: 3px;
              .text {
                font-size: 12px;
                color: #666666;
                vertical-align: middle;
              }
              .iconfont {
                vertical-align: middle;
                font-size: 18px;
                color: #FF6161;
              }
              .icon-createOrder {
                color: #4C97FC;
              }
            }
            li:nth-last-child(1) {
              margin-right: 0;
            }
            .speedyActive {
              border: 1px solid #e0370f!important;
            }
          }
        }
        .msgTip {
          ul li {
            .l {
              width: 73%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              display: inline-block;
            }
          }
        }
      }
  }
</style>
