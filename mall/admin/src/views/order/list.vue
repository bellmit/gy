<template>
  <div class="commodity-main order-list my-order-list">
    <div class="selected">
      <ul>
        <li :class="{ active: newIndex===0 }" @click="toggleTabs(0)">全部</li>
        <li :class="{ active: newIndex===1 }" @click="toggleTabs(1)">签约({{data.signCount}})</li>
        <li :class="{ active: newIndex===2 }" @click="toggleTabs(2)">收款与交割({{data.collectionAndDeliveryCount}}) </li>
        <li :class="{ active: newIndex===3 }" @click="toggleTabs(3)">结算与复核({{data.settlementAndReviewCount}})</li>
        <li :class="{ active: newIndex===4 }" @click="toggleTabs(4)">已完成({{data.finishCount}}) </li>
        <li :class="{ active: newIndex===5 }" @click="toggleTabs(5)">已失效({{data.invalidCount}}) </li>
      </ul>
      <div class="right">
        <div class="search-box">
          <input type="search" v-model="keywords" placeholder="请输入品名/单号">
          <button @click="search">搜索</button>
        </div>
        <span class="search-btn"  @click="toggleSelect =!toggleSelect">高级搜索<i class="iconfont icon-arrow-down"></i></span>
      </div>
    </div>
    <div class="selected-box" v-show="toggleSelect">
        <el-row :gutter="40">
          <el-col :span="10">
              <el-row>
                 <el-col :span="4">卖方公司</el-col>
                 <el-col :span="18">
                   <input @click="blur11" type="text" class="gy-input" v-model="CompaniesCony" @keyup.enter="onelist1click">
                 </el-col>
                 <el-col :span="2">
                   <i class="iconfont icon-search"  @click="onelist1click"></i>
                 </el-col>
                  <ul class="listul"  v-show="onelist1Show">
                    <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                      {{item.companyName}}
                    </li>
                    <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
                  </ul>
              </el-row>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="4">买方公司</el-col>
              <el-col :span="18">
                <input @click="blur22" type="text" class="gy-input" v-model="buyCompaniesCony" @keyup.enter="onelist1click2">
              </el-col>
              <el-col :span="2"> <i class="iconfont icon-search"  @click="onelist1click2"></i></el-col>
                <ul class="listul"  v-show="onelist2Show">
                  <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                    {{item.companyName}}
                  </li>
                  <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
                </ul>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="40" style="margin-top: 15px;">
          <el-col :span="10">
            <el-row>
              <el-col :span="4">创建时间</el-col>
              <el-col :span="18">
                <el-date-picker
                v-model="createDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder = '开始时间'
                end-placeholder= '结束时间'
                :picker-options="pickerOptions">
              </el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="4">交割仓库</el-col>
              <el-col :span="18">
                <input type="text" v-model="deliveryWarehouseName">
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row  style="margin-top: 15px;" :gutter="40">
          <el-col :span="10">
              <el-row>
                <el-col :span="4">交付方式</el-col>
                <el-col :span="18">
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
          <el-col :span="10">
            <el-row>
              <el-col :span="4">付款方式</el-col>
              <el-col :span="18">
                <el-select v-model="transactionType" placeholder="请选择" >
                  <el-option
                    v-for="item in transactionOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1" :offset="1"><i class="iconfont icon-search" @click.stop.prevent="search"></i></el-col>
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
          <th style="width:280px">商品</th>
          <th style="width:243px">卖方公司</th>
          <th style="width:243px">买方公司</th>
          <th>总金额</th>
          <th style="width:100px">交付方式</th>
          <th>状态</th>
          <th style="width:90px">操作</th>
        </tr>
        </thead>
        <tbody v-for="(item , index) in data.orderList" :key="index">
          <tr class="update-title">
            <td colspan="8">单号：{{item.odrOrderSn}} <i class="iconfont icon-copy" @click="copy"></i>&nbsp;&nbsp; <span v-if="item.orderContractCode">合同编号:{{item.orderContractCode}}</span><span class="right">{{item.createdDate| date('hour')}}</span></td>
          </tr>
          <tr v-for="(items, ind ) in item.orderItemList" :key="ind" v-if="ind===0">
            <td class="tleft">
              <div class="img-box" ><img :src=items.skuPictureUrl alt=""></div>
              <div class="info-box">{{items.skuName}}<br>{{item.intCurrencyMark}}{{items.skuPrice|numToCash}}元/{{items.infUnitOfMeasureDisplayName}}<br>{{items.skuQuantity | numToCash(3)}}{{items.infUnitOfMeasureDisplayName}}
              </div>
            </td>
            <!-- TODO 突击修改 -->
            <!-- <span class="im-talk"><i class="iconfont icon-im"></i>和我联系</span> -->
            <td  class="tleft">{{item.sellerCompanyName}}<br>{{item.sellerContact}}<br>{{item.sellerContactMobile}}</td>
            <td  class="tleft">{{item.buyerCompanyName}}<br>{{item.buyerContact}}<br>{{item.buyerContactMobile}} </td>
            <td>{{item.intCurrencyMark}}{{items.skuTotalAmount|numToCash}}元</td>
            <td>{{item.deliveryType === 1 ? '买家自提' : item.deliveryType === 2? '卖家送货':'全部支持'}}</td>
            <td>
              <span v-if="item.orderStatus===1">签约</span>
              <span v-else-if="item.orderStatus===2">收款与交割</span>
              <span v-else-if="item.orderStatus===3">结算与复核</span>
              <span v-else-if="item.orderStatus===4">已完成</span>
              <span v-else-if="item.orderStatus===5">已失效</span>
            </td>
            <td>
              <div class="btns-group">
                <span @click="goPage(item)" class="gy-button-view">查看</span>
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
        <li><span>时间</span><span>操作</span><span>操作人</span></li>
        <li v-for="(item,index) in logData" :key =index>
          <span>{{item.createdDate|date}}</span><span>{{item.allowedFunctionsName}}</span><span>{{item.createdByName}}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>export default {
    data () {
        return {
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
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            transactionOption: [{
                value: 0,
                label: '先款后货'
            },
            {
                value: 1,
                label: '先货后款'
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
            onelist1Show: false,
            onelist2Show: false,
            onelist1: [],
            onelist2: []
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
    // console.log(localStorage);
    },
    methods: {
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
            })
                .then(function (res) {
                    that.onelist1 = res.data.data;
                    console.log(that.onelist1);
                }).catch(() => {
                    console.log('出错了');
                });
            that.parameter.data.sellerCompanyId = '';
        },
        onelist1click2 () {
            var that = this;
            that.onelist2Show = true;
            that.$http.post(that.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.buyCompaniesCony
            })
                .then(function (res) {
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
            this.parameter.data.orderStatus = this.stateCode;
            this.parameter.data.keyword = this.keywords;
            this.parameter.data.deliveryType = this.deliveryType;
            this.parameter.data.paymentType = this.transactionType;
            this.parameter.data.deliveryWarehouseName = this.deliveryWarehouseName;
            this.parameter.data.createdBeginDate = new Date(this.createDate[0]).getTime();
            this.parameter.data.createdEndDate = new Date(this.createDate[1]).getTime();
            this.getInfo(this.parameter);
            if (state === 1) {
                this.$tools.downloadFile(this, 'platform/v1/orders/listExport', this.parameter.data);
            }
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index;
            // 0：上架，1：下架，2：作废
            this.stateCode = index;
            this.parameter.data.orderStatus = index;
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
            that.$http.post(this.$api.orders.list, that.parameter).then(function (res) {
                if (res.data.code === 0) {
                    that.data = res.data.data;
                    that.total = res.data.data.total;
                    that.pageNum = res.data.data.pageNum;
                    console.log(res.data.data);
                }
            });
        },
        goPage (data) {
            this.$router.push({name: 'orderDetail', query: {orderId: data.id}});
        },
        goCancel (data) {
            let that = this;
            that.$http.post(that.$api.orders.sign, {
                orderId: data.id,
                allowedFunctionsId: 15,
                orderStatus: 0
            }).then(function (res) {
                that.getInfo();
            }).catch(() => {
                console.log('出错了');
            });
        },
        logDetail (item) {
            // 发获取日志的接口
            let that = this;
            that.$http.get(that.$api.orders.history + item.id + '/history')
                .then(function (res) {
                    that.logData = res.data.data;
                    that.log.visible = true;
                }).catch(() => {
                    console.log('出错了');
                });
        }
    }
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
      color: #e0370f;
      cursor: pointer;
      background-color: #e6eaea;
      border-radius: 5px;
      box-shadow: 0px 0px 10px 0px #666;
      cursor: pointer;
      span {
        display: block;
        height: 18px;
      }
      .iconfont{
        color:$color-highlight;
        padding-right:2px;
      }
    }
  }
</style>
