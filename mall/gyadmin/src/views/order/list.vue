<template>
  <div class="commodity-main order-list my-order-list">
    <div class="selected">
      <ul>
        <li v-for="item in tabs" :class="{ active: newIndex === item.idx }"
            @click="toggleTabs(item.idx)" :key="item.idx">{{item.type}}<template
          v-if="item.sta">({{data[item.sta]}})</template></li>
      </ul>
      <div class="right">
        <div class="search-box">
          <input type="search" style="width: 190px" v-model="keywords" placeholder="请输入品名/订单号/公司名">
          <i class="iconfont icon-search" @click="search"></i>
        </div>
        <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i
          class="iconfont icon-arrow-down"></i></span>
      </div>
    </div>
    <div class="selected-box" v-show="toggleSelect">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-row>
            <el-col :span="4">卖方公司</el-col>
            <el-col :span="19">
              <input @click="blur11" type="text" placeholder="请选择" class="gy-input" v-model="CompaniesCony" @keyup.enter="onelist1click">
            </el-col>
            <el-col :span="1">
              <i class="iconfont icon-mySearch" @click="onelist1click"></i>
            </el-col>
            <ul class="listul" v-show="onelist1Show">
              <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                {{item.companyName}}
              </li>
              <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
            </ul>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="4">买方公司</el-col>
            <el-col :span="19">
              <input @click="blur22" placeholder="请选择" type="text" class="gy-input" v-model="buyCompaniesCony"
                     @keyup.enter="onelist1click2">
            </el-col>
            <el-col :span="1"><i class="iconfont icon-mySearch" @click="onelist1click2"></i></el-col>
            <ul class="listul" v-show="onelist2Show">
              <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                {{item.companyName}}
              </li>
              <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
            </ul>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="40" style="margin-top: 15px;">
        <el-col :span="12">
          <el-row>
            <el-col :span="4">创建时间</el-col>
            <el-col :span="19">
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
        <el-col :span="12">
          <el-row>
            <el-col :span="4">交割仓库</el-col>
            <el-col :span="19">
              <input type="text" placeholder="请输入交割仓库" v-model="deliveryWarehouseName">
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;" :gutter="40">
        <el-col :span="12">
          <el-row>
            <el-col :span="4">交付方式</el-col>
            <el-col :span="19">
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
            <el-col :span="4">付款方式</el-col>
            <el-col :span="19">
              <el-select v-model="transactionType" placeholder="请选择">
                <el-option
                  v-for="item in transactionOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <!--<el-col :span="1" :offset="1"><i class="iconfont icon-search" @click.stop.prevent="search"></i></el-col>-->
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;" :gutter="40">
        <el-col :span="12">
          <el-row>
            <el-col :span="4">四流审核</el-col>
            <el-col :span="19">
              <el-select v-model="billStatus" placeholder="请选择">
                <el-option
                  v-for="item in $constant.auditStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1"><i class="iconfont icon-search" @click.stop.prevent="search" style="margin-left:10px;"></i></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="right" style="padding-bottom:8px">
        <button class="gy-button-extra" @click='search(1)'>导出</button>
      </div>
      <table class="gy-table">
        <thead>
        <tr class="title">
          <th style="width:200px">商品</th>
          <th style="width:243px">卖方公司</th>
          <th style="width:243px">买方公司</th>
          <th style="text-align: center">总金额(元)</th>
          <th style="width:100px">交付方式</th>
          <th style="text-align: center">订单状态</th>
          <th style="width:150px;text-align: center">四流审核</th>
          <th style="width:90px">操作</th>
        </tr>
        </thead>
        <tbody v-for="(item , index) in data.orderList" :key="index">
        <tr class="update-title">
          <td colspan="8">单号：{{item.odrOrderSn}} &nbsp; <span v-if="item.orderContractCode">合同编号:{{item.orderContractCode}}</span><span
            class="right">{{item.createdDate| date('hour')}}</span></td>
        </tr>
        <tr v-for="(items, ind ) in item.orderItemList" :key="ind" v-if="ind===0">
          <td class="tleft">
            <div class="img-box"><img :src=items.skuPictureUrl alt=""></div>
            <div class="info-box">{{items.skuName}}<br>
              {{item.intCurrencyMark}}{{items.skuPrice|numToCash}}元/{{items.infUnitOfMeasureDisplayName}}<br>
              {{items.skuQuantity | numToCash(3)}}{{items.infUnitOfMeasureDisplayName}}
            </div>
          </td>
          <!-- TODO 突击修改 -->
          <!-- <span class="im-talk"><i class="iconfont icon-im"></i>和我联系</span> -->
          <td class="tleft">{{item.sellerCompanyName}}</td>
          <td class="tleft">{{item.buyerCompanyName}}</td>
          <td class="align-r">{{item.intCurrencyMark}}{{items.skuTotalAmount | numToCash}}</td>
          <td>{{item.deliveryType === 1 ? '买家自提' : item.deliveryType === 2? '卖家送货':'全部支持'}}</td>
          <td>
            <span v-if="item.orderStatus === 1">签约</span>
            <span v-else-if="item.orderStatus === 2">收款与交割</span>
            <span v-else-if="item.orderStatus === 3">结算与复核</span>
            <span v-else-if="item.orderStatus === 4">已完成</span>
            <span v-else-if="item.orderStatus === 5">已失效</span>
          </td>
          <td>
            <span v-if="item.orderStatus === 4">
              {{item.billStatus | auditStatus}}
                 <br>
               <span v-if="item.billStatus == 1" v-html="formatDate(item.billUpdatedDate)">
               </span>
            </span>
            <span v-else>未提交</span>
          </td>
          <td>
            <div class="btns-group">
              <router-link :to="{name: 'orderDetail', query: {orderId: item.id}}" target="_blank" class="gy-button-view">查看</router-link>
              <template v-if="item.orderStatus === 4 && item.billStatus === 1">
                <span class="gy-button-view" @click="audit(item.id)">审核</span>
              </template>
              <span @click="goCancel(item)" class="gy-button-view">取消</span>
              <span @click="logDetail(item)" class="gy-button-view">日志</span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper">
        <div class="pagination-total">共 {{total}} 条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :total=total>
        </el-pagination>
      </div>
    </div>
    <el-dialog title="日志" :visible.sync="log.visible" :modal="false" width="500px">
      <ul class="log">
        <li class="liTitle"><span>时间</span><span>操作</span><span class="logName">操作人</span></li>
        <li v-for="(item,index) in logData" :key=index>
          <span>{{item.createdDate|date(1)}}</span><span>{{item.allowedFunctionsName}}</span><span class="logName">{{item.createdByName}}</span>
        </li>
      </ul>
    </el-dialog>
    <audit :auditStatusVisible="auditStatusVisible" :reason="2" @sub="doSub" @close="auditStatusVisible = false"></audit>
  </div>
</template>

<script>
import audit from '@/components/audit';
export default {
    data () {
        return {
            tabs: [
                {
                    type: '全部',
                    idx: 0
                },
                {
                    type: '签约',
                    idx: 1,
                    sta: 'signCount'
                },
                {
                    type: '收款与交割',
                    idx: 2,
                    sta: 'collectionAndDeliveryCount'
                },
                {
                    type: '结算与复核',
                    idx: 3,
                    sta: 'settlementAndReviewCount'
                },
                {
                    type: '已完成',
                    idx: 4,
                    sta: 'finishCount'
                },
                {
                    type: '已失效',
                    idx: 5,
                    sta: 'invalidCount'
                }
            ],
            log: {
                visible: false
            },
            logData: [],
            offerCode: '',
            searchCode: '', // 查询订单号
            skuName: '', // 查询品名
            CompaniesCony: '',
            buyCompaniesCony: '',
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
            sellerCompanyId: '',
            parameter: {
                pageNum: 1,
                data: {
                    // sellerCompanyId: this.sellerCompanyId
                    flag: 1
                }
            },
            transactionType: '',
            deliveryTypeOption: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            transactionOption: [
                {
                    value: '',
                    label: '全部'
                }, {
                    value: 0,
                    label: '先款后货'
                },
                {
                    value: 1,
                    label: '先货后款'
                },
                {
                    value: 10,
                    label: '担保交易'
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
            billStatus: null,
            onelist1Show: false,
            onelist2Show: false,
            onelist1: [],
            onelist2: [],
            auditStatusVisible: false,
            auditSub: {
                orderId: null,
                billStatus: null, // 单据状态
                billRemark: null // 审核原因
            }
        };
    },
    created () {
        this.getInfo();
        // this.getCompanies();
        this.Warehouse();
    },
    // TODO 突击修改
    mounted () {
    // this.phone = JSON.parse(localStorage.userInfo).phone;
    // this.url = 'http://trade.chinayie.net/im/index.html#type=0&username=' + this.phone + '&touser=1';
    },
    methods: {
        audit (orderId) {
            this.auditSub.orderId = orderId;
            this.auditStatusVisible = true;
        },
        // 审核提交
        doSub (query) {
            this.auditSub = Object.assign(this.auditSub, query);
            if (this.auditSub.myBillRemark) {
                this.auditSub.billRemark = this.auditSub.myBillRemark;
            }
            this.$http.post(this.$api.orders.audit, this.auditSub)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('审核成功');
                        this.auditSub.orderId = null;
                        this.auditStatusVisible = false;
                        this.search();
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        // TODO 突击修改
        // 在线聊天
        // chat () {
        //     window.open(this.url);
        // },
        // 注释获取全部公司
        // 修改全部公司获得接口
        onelist1click () {
            var that = this;
            that.onelist1Show = true;
            that.$http.post(that.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.CompaniesCony
            }).then((res) => {
                that.onelist1 = res.data.data;
            }).catch(() => {
                console.log('出错了');
            });
            that.parameter.data.sellerCompanyId = '';
        },
        formatDate (time) {
            if (!time) {
                return '--';
            }
            let y, m, d, date, h, ms, s, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            data = y + '-' + format(m) + '-' + format(d) + ' ';
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
            return data + '<br>' + hours;
        },
        onelist1click2 () {
            var that = this;
            that.onelist2Show = true;
            that.$http.post(that.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.buyCompaniesCony
            })
                .then((res) => {
                    that.onelist2 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            that.parameter.data.buyerCompanyId = '';
        },
        onelist1select (item) {
            var that = this;
            that.CompaniesCony = item.companyName;
            that.parameter.data.sellerCompanyId = item.companyId;
            that.onelist1Show = false;
        },
        onelist1select2 (item) {
            var that = this;
            that.buyCompaniesCony = item.companyName;
            that.parameter.data.buyerCompanyId = item.companyId;
            that.onelist2Show = false;
        },
        blur11 () {
            this.onelist1Show = false;
            this.CompaniesCony = '';
            this.parameter.data.sellerCompanyId = '';
        },
        blur22 () {
            this.onelist2Show = false;
            this.buyCompaniesCony = '';
            this.parameter.data.buyerCompanyId = '';
        },
        search (state) { // 搜索
            this.getInfo(this.parameter);
            if (state === 1) {
                this.$tools.downloadFile(this, 'platform/v1/orders/listExport', this.parameter.data);
            }
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index;
            // 0：上架，1：下架，2：作废
            this.stateCode = index;
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
        copy () {},
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
            this.parameter.data.billStatus = this.billStatus;
            this.parameter.data.orderStatus = this.stateCode;
            this.parameter.data.keyword = this.keywords;
            this.parameter.data.deliveryType = this.deliveryType;
            this.parameter.data.paymentType = this.transactionType;
            this.parameter.data.deliveryWarehouseName = this.deliveryWarehouseName;
            this.parameter.data.createdBeginDate = this.createDate ? new Date(this.createDate[0]).getTime() : null;
            this.parameter.data.createdEndDate = this.createDate ? new Date(this.createDate[1]).getTime() : null;
            that.$http.post(this.$api.orders.list, that.parameter).then(function (res) {
                if (res.data.code === 0) {
                    that.data = res.data.data;
                    that.total = res.data.data.total;
                    that.pageNum = res.data.data.pageNum;
                }
            });
        },
        goPage (data) {
            this.$router.push({name: 'orderDetail', query: {orderId: data.id}});
        },
        goCancel (data) {
            let that = this;
            this.$confirm('<span><i class="iconfont icon-message-error"></i>订单取消后将无法恢复, 是否确认?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                that.$http.post(that.$api.orders.sign, {
                    orderId: data.id,
                    allowedFunctionsId: 15,
                    orderStatus: 0
                }).then((res) => {
                    that.getInfo();
                }).catch(() => {
                    console.log('出错了');
                });
            }).catch(() => {
            });
        },
        logDetail (item) {
            // 发获取日志的接口
            let that = this;
            that.$http.get(that.$api.orders.history + item.id + '/history')
                .then((res) => {
                    that.logData = res.data.data;
                    that.log.visible = true;
                }).catch(() => {
                    console.log('出错了');
                });
        }
    },
    components: {audit}
};
</script>

<style lang="scss">
  @import './../../styles/module/OrderList';
  // TODO 突击修改
  .my-order-list {
    padding-top: 15px;
    .my-chat {
      position: fixed;
      left: 50%;
      margin-left: 610px;
      line-height: 40px;
      height: 40px;
      width: 40px;
      text-align: center;
      padding-right: 5px;
      color: #e59640;
      cursor: pointer;
      background-color: #e6eaea;
      border-radius: 5px;
      box-shadow: 0 0 10px 0 #666;
      span {
        display: block;
        height: 18px;
      }
      .iconfont{
        color:$color-highlight;
        padding-right:2px;
      }
    }
    .el-input__inner{
      height:30px;
    }
    .el-range-separator{
      line-height: 24px;
    }
    .icon-mySearch{
      position: relative;
      right:25px;
    }
    .selected-box{
      padding: 15px 0 12px 14px;
    }
    .selected .search-btn{
      cursor: pointer;
      color:#666;
    }
    .el-input__icon{
      line-height: 24px;
    }
    .el-col-4{
      line-height: 27px;
    }
    .liTitle{
      span{
        font-weight: bold;
      }
    }
  }
  .order-list .log{
    span{
      width:40%;
      padding-right:10px;
      vertical-align: middle;
    }
    .logName{
      width:20%;
    }
  }
</style>
