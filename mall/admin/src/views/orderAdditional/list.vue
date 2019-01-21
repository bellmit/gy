<template>
  <div class="commodity-main order-list my-order-list">
    <!-- <div slot="header" class="clearfix">
        <span class="title">订单列表</span>
    </div> -->
    <!-- <gy-company-select v-model="company"></gy-company-select> -->
    <div class="selected">
      <ul>
        <li :class="{ active: newIndex===0 }" @click="toggleTabs(0)">全部</li>
        <li :class="{ active: newIndex===4 }" @click="toggleTabs(4)">有效({{orderData.finishCount}})</li>
        <li :class="{ active: newIndex===5 }" @click="toggleTabs(5)">失效({{orderData.invalidCount}}) </li>
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
      <el-form label-width="105px" size="mini">
        <el-row :gutter="40">
          <el-col :span="10">
            <el-row>
              <el-col :span="4">
                卖方公司
              </el-col>
              <el-col :span="19">
                <input @click="blur11" type="text" class="gy-input" v-model="CompaniesCony" @keyup.enter="onelist1click">
              </el-col>
                <ul class="listul"  v-show="onelist1Show">
                  <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                    {{item.companyName}}
                  </li>
                  <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
                </ul>
              <el-col :span="1">
                <i class="iconfont icon-search"  @click="onelist1click"></i>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="4">
                买方公司
              </el-col>
              <el-col :span="19">
                <input @click="blur22" type="text" class="gy-input" v-model="buyCompaniesCony" @keyup.enter="onelist1click2">
              </el-col>
              <ul class="listul"  v-show="onelist2Show">
                <li v-for="(item2,index) in onelist2" :key="index" @click="onelist1select2(item2)" v-if="onelist2.length>0">
                  {{item2.companyName}}
                </li>
                <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
              </ul>
              <el-col :span="1">
                <i class="iconfont icon-search"  @click="onelist1click2"></i>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="40" style="margin-top: 20px">
          <el-col :span="10">
            <el-form-item label="订单日期">
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
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="4">交割仓库</el-col>
              <el-col :span="19"><input type="text" v-model="deliveryWarehouseName"></el-col>
              <el-col :span="1"><i class="iconfont icon-search" @click.stop.prevent="search"></i></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="export">
      <button type="button" @click="$router.push({ name: 'orderAdditionalAdd'})" class="gy-button-extra">补录</button>
      <button type="button" class="gy-button-normal" @click='search(1)'>导出</button>
    </div>
    <div>
      <table class="gy-table">
        <thead>
          <tr class="title">
            <th style="width:280px">商品</th>
            <th style="width:243px">卖方公司</th>
            <th style="width:243px">买方公司</th>
            <th>总金额</th>
            <th style="width:100px">状态</th>
            <th style="width:90px">操作</th>
          </tr>
        </thead>
        <tbody v-for="(item , index) in orderList" :key="index">
        <tr class="update-title">
          <td colspan="8">单号：{{item.odrOrderSn}} <i class="iconfont icon-copy" @click="copy"></i><span class="right">{{item.createdDate |date}}</span></td>
        </tr>
        <tr >
          <td class="tleft">
            <div class="img-box" ><img :src=item.skuPictureUrl alt=""></div>
            <div class="info-box">{{item.skuName}}<br>{{item.intCurrencyMark}}{{item.skuPrice|numToCash}}元/吨{{item.infUnitOfMeasureDisplayName}}<br>{{item.skuQuantity | numToCash(3)}}{{item.infUnitOfMeasureDisplayName}}
            </div>
          </td>
          <td  class="tleft">{{item.sellerCompanyName}}<br>{{item.sellerContact}}<br>{{item.sellerContactMobile}}</td>
          <td  class="tleft">{{item.buyerCompanyName}}<br>{{item.buyerContact}}<br>{{item.buyerContactMobile}}</td>
          <td>{{item.totalAmount}}元</td>
          <td>{{item.orderStatus |orderState}}</td>
          <td>
            <div class="btns-group">
              <span @click="goPage(item)" class="gy-button-view">查看</span>
              <span v-if="item.orderStatus !==5" @click="cancel(item)" class="gy-button-view">取消</span>
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
          <span>{{item.operateDate|date}}</span><span>{{item.orderMsg}}</span><span>{{item.operateName}}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import gyCompanySelect from '@/components/company-select';

export default {
    components: {
        gyCompanySelect
    },
    data () {
        return {
            company: '',
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
                }
            },
            log: {
                visible: false
            },
            logData: [],
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
            phone: null,
            url: null,
            orderList: '',
            orderData: '',
            onelist1Show: false,
            onelist2Show: false,
            onelist1: [],
            onelist2: []
        };
    },
    created () {
        // this.getCompanies();
        this.searchList();
    },
    mounted () {
        // this.phone = JSON.parse(localStorage.userInfo).phone;
        // this.url = 'http://trade.chinayie.net/im/index.html#type=0&username=' + this.phone + '&touser=1';
        // console.log(localStorage);
    },
    methods: {
        // 注释获取全部公司
        // 修改全部公司获得接口
        onelist1click () {
            this.onelist1Show = true;
            this.$http.post(this.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.CompaniesCony
            })
                .then((res) => {
                    this.onelist1 = res.data.data;
                })
                .catch(() => {
                    console.log('出错了');
                });
            this.parameter.data.sellerCompanyId = '';
        },
        onelist1click2 () {
            this.onelist2Show = true;
            this.$http.post(this.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.buyCompaniesCony
            })
                .then((res) => {
                    this.onelist2 = res.data.data;
                })
                .catch(() => {
                    console.log('出错了');
                });
            this.parameter.data.buyerCompanyId = '';
        },
        onelist1select (item) {
            this.CompaniesCony = item.companyName;
            this.parameter.data.sellerCompanyId = item.companyId;
            this.onelist1Show = false;
        },
        onelist1select2 (item) {
            this.buyCompaniesCony = item.companyName;
            this.parameter.data.buyerCompanyId = item.companyId;
            this.onelist2Show = false;
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
        searchList (state) {
            this.$http.post(this.$api.matchmak.listMatchmak, this.parameter)
                .then((res) => {
                    this.orderData = res.data.data;
                    this.orderList = res.data.data.matchOrderlist;
                    this.total = res.data.data.total;
                });
        },
        search (state) { // 搜索
            this.parameter.data.orderStatus = this.stateCode;
            this.parameter.data.keyword = this.keywords;
            this.parameter.data.deliveryType = this.deliveryType;
            this.parameter.data.deliveryWarehouseName = this.deliveryWarehouseName;
            this.parameter.data.createdBeginDate = new Date(this.createDate[0]).getTime();
            this.parameter.data.createdEndDate = new Date(this.createDate[1]).getTime();
            this.searchList(this.parameter);
            if (state === 1) {
                this.$tools.downloadFile(this, 'platform/v1/orders/matchListExport', this.parameter.data);
            }
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index;
            this.stateCode = index;
            this.parameter.data.orderStatus = index;
            this.searchList(this.parameter);
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.searchList(this.parameter);
        },
        cancel (data) {
            this.$http.post(this.$api.matchmak.cancelMatchmak, {id: data.id})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.searchList();
                    }
                });
        },
        exportMank () {
            this.$http.post(this.$api.matchmak.exportMatchmank)
                .then((res) => {

                });
        },
        journal () {
            this.$http.post(this.$api.matchmak.journalMatchmank)
                .then((res) => {
                });
        },
        querySearch (queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        copy (data) {
        },
        handleSelect (item) {
            this.offerItemList.prdSkuId = item.goodsId;
            this.offerItemList.skuCode = item.goodsCode;
            this.offerItemList.skuName = item.value;
        },
        Warehouse () {
            this.$http.get(this.$api.offers.goods + '?keywords=').then((res) => {
                if (res.data.code === 0) {
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].goodsName;
                        param.goodsCode = res.data.data[i].goodsCode;
                        param.goodsId = res.data.data[i].goodsId;
                        this.restaurants.push(param);
                        param = {};
                    }
                }
            });
        },
        // getCompanies () {
        //     let that = this;
        //     that.$http.get(that.$api.orders.creatOrderCompanies)
        //         .then((res) => {
        //             that.Companies = res.data.data;
        //         }).catch(() => {
        //             console.log('出错了');
        //         });
        // },
        // chooseCompanies () {
        //     var that = this;
        //     that.parameter.data.sellerCompanyId = this.CompaniesCony;
        // },
        // buychooseCompanies () {
        //     var that = this;
        //     that.parameter.data.buyerCompanyId = this.buyCompaniesCony;
        // },
        goPage (data) {
            this.$router.push({name: 'orderAdditionalDetail', query: {orderId: data.id}});
        },
        logDetail (item) {
        // 发获取日志的接口
            this.$http.get(this.$api.orders.matchOrder + item.id)
                .then((res) => {
                    this.logData = res.data.data;
                    this.log.visible = true;
                }).catch(() => {
                    console.log('出错了');
                });
        }
        // clear () {
        //     this.CompaniesCony = '';
        //     this.buyCompaniesCony = '';
        //     this.createDate = '';
        //     this.deliveryWarehouseName = '';
        //     this.parameter.data.sellerCompanyId = '';
        //     this.parameter.data.buyerCompanyId = '';
        // }
    }
};
</script>

<style lang="scss">
  .my-order-list {
    padding-top: 15px;
    .export {
      float: right;
      margin-bottom: 10px;
      margin-top: 20px;
    }
  }
  @import './../../styles/module/OrderList';
</style>
