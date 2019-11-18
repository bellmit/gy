<template>
  <div class="my-order-list shipping">
    <div class="selected">
      <ul>
        <li :class="{ active: newIndex===99 }" @click="toggleTabs(99)">全部({{dataCount99}})</li>
        <li :class="{ active: newIndex===1 }" @click="toggleTabs(1)">待受理({{dataCount1}})</li>
        <li :class="{ active: newIndex===2 }" @click="toggleTabs(2)">已受理({{dataCount2}}) </li>
        <li :class="{ active: newIndex===3 }" @click="toggleTabs(3)">已拒绝({{dataCount3}})</li>
      </ul>
      <div class="right">
        <div class="search-box" style="width: 260px">
          <input  style="width: 212px;border: none" type="search" v-model="keywords" placeholder="请输入品名/申请人/申请人手机号">
          <button style="width: 40px" @click="search2">
            <i class="iconfont icon-search"></i>
          </button>
        </div>
        <span class="search-btn"  @click="toggleSelect =!toggleSelect">高级搜索<i class="iconfont icon-arrow-down"></i></span>
      </div>
    </div>
    <div v-show="toggleSelect" style="padding: 10px 20px">
      <el-row :gutter="60">
        <el-col :span="12" class="my-top">
          <el-row>
            <el-col :span="4">货主公司</el-col>
            <el-col :span="19">
              <input type="text" v-model="deliveryWarehouseName">
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" class="my-top rebox">
          <el-row>
            <el-col :span="4">起始港</el-col>
            <el-col :span="19">
              <input @click="blur11" type="text" class="gy-input" v-model="CompaniesCony" @keyup.enter="onelist1click">
            </el-col>
            <el-col :span="1" class="abbox">
              <i class="iconfont icon-mySearch"  @click="onelist1click"></i>
            </el-col>
            <ul class="listul"  v-show="onelist1Show">
              <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                {{item.harbourName}}
              </li>
              <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
            </ul>
          </el-row>
        </el-col>
        <el-col :span="12" class="my-top rebox">
          <el-row>
            <el-col :span="4">目的港</el-col>
            <el-col :span="19">
              <input @click="blur22" type="text" class="gy-input" v-model="buyCompaniesCony" @keyup.enter="onelist1click2">
            </el-col>
            <el-col :span="1"  class="abbox"> <i class="iconfont icon-mySearch"  @click="onelist1click2"></i></el-col>
            <ul class="listul"  v-show="onelist2Show">
              <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                {{item.harbourName}}
              </li>
              <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
            </ul>
          </el-row>
        </el-col>
        <el-col :span="12" class="my-top">
          <el-row>
            <el-col :span="4">期望发货日期</el-col>
            <el-col :span="19" style="margin-top: -10px;">
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
        <el-col :span="12" class="my-top">
          <el-row>
            <el-col :span="4">申请时间</el-col>
            <el-col :span="19" style="margin-top: -10px;">
              <el-date-picker
                      v-model="createDate2"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder = '开始时间'
                      end-placeholder= '结束时间'
                      :picker-options="pickerOptions">
              </el-date-picker>
            </el-col>
            <el-col :span="1" class="my-search">
            <i @click="search" class="iconfont icon-search"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <table class="gy-table">
        <thead>
        <tr>
          <th style="width:100px">适装品种</th>
          <th style="width:100px">数量(吨)</th>
          <th style="width:120px">期望发货日期</th>
          <th style="width:100px">意向价格(元)</th>
          <th style="width:100px">起始港</th>
          <th style="width:100px">目的港</th>
          <th style="width:100px">货主公司</th>
          <th style="width:100px">联系人姓名</th>
          <th style="width:100px">联系人手机</th>
          <th style="width:120px">申请时间</th>
          <th style="width:100px">状态</th>
          <th style="width:100px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(items, ind ) in data.list" :key="ind">
          <td style="width:100px">{{items.skuName}}</td>
          <td style="width:100px;text-align: right">{{items.skuQuantity}}</td>
          <td style="width:120px">{{items.estimatedLoadingDate|date}}</td>
          <td style="width:100px;text-align: right">{{items.intentPrice==0?'面议':items.intentPrice}}</td>
          <td style="width:100px">{{items.loadWrhHarbourName}}</td>
          <td style="width:100px">{{items.unloadWrhHarbourName}}</td>
          <td style="width:100px">{{items.consignorName}}</td>
          <td style="width:100px">{{items.contact}}</td>
          <td style="width:100px">{{items.contactMobile}}</td>
          <td style="width:120px">{{items.createdDate|date}}</td>
          <td style="width:100px">{{items.approveStatus}}</td>
          <td style="width:100px">
              <span class="gy-button-view" @click="acceptCase(items.id)" v-if="items.approveStatus == '待受理'">受理</span>
              <span class="gy-button-view"  @click="refuseCase(items.id)" v-if="items.approveStatus == '待受理'">拒绝</span>
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
  </div>
</template>

<script>export default {
    data () {
        return {
            dataCount99: '',
            dataCount1: '',
            dataCount2: '',
            dataCount3: '',
            offerCode: '',
            searchCode: '', // 查询订单号
            skuName: '', // 查询品名
            CompaniesCony: '',
            buyCompaniesCony: '',
            deliveryWarehouseName: '',
            restaurants: [],
            createDate: [], // 存时间
            createDate2: [], // 存时间
            Companies: [],
            total: 0, // 总条数
            pageNum: 1, // 当前条数
            newIndex: 99,
            keywords: '', // 品名或单号
            toggleSelect: false, // 高级搜索显示隐藏
            stateCode: '', // 存订单状态
            data: {},
            WarehouseName: '', // 存仓库名
            sellerCompanyId: '',
            parameter: {
                pageNum: 0,
                pageSize: 10,
                data: {
                    keywords: '', // 模糊查询 品名-联系人-联系电话
                    consignorId: '', // 贸易商公司id  贸易商必传，后台不传
                    approveStatus: '', // 受理状态 1:未受理 2已受理 3:已拒绝
                    loadWrhHarbourName: '', // 起始港口名
                    unloadWrhHarbourName: '', // 目的港口名
                    createdDateStart: '', // 开始时间
                    createdDateEnd: ''// 结束时间
                }
            },
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
    },
    methods: {
    // 修改全部公司获得接口
        onelist1click () {
            var that = this;
            that.onelist1Show = true;
            that.$http.post(that.$api.harbour.search, {
                'harbourName': this.CompaniesCony
            }).then(function (res) {
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
            that.$http.post(that.$api.harbour.search, {
                'harbourName': this.CompaniesCony
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
            that.CompaniesCony = item.harbourName;
            // that.parameter.data.loadWrhHarbourName = item.harbourName;
            that.onelist1Show = false;
        },
        onelist1select2 (item) {
            var that = this;
            that.buyCompaniesCony = item.harbourName;
            // that.parameter.data.unloadWrhHarbourName = item.harbourName;
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
            this.parameter.data.approveStatus = this.stateCode;
            this.parameter.data.keywords = this.keywords;
            this.parameter.data.consignorName = this.deliveryWarehouseName;
            this.parameter.data.loadWrhHarbourName = this.CompaniesCony;
            this.parameter.data.unloadWrhHarbourName = this.buyCompaniesCony;
            if (this.createDate) {
                this.parameter.data.estimatedLoadingDateStart = new Date(this.createDate[0]).getTime();
                this.parameter.data.estimatedLoadingDateEnd = new Date(this.createDate[1]).getTime();
            } else {
                this.parameter.data.estimatedLoadingDateStart = '';
                this.parameter.data.estimatedLoadingDateEnd = '';
            }
            if (this.createDate2) {
                this.parameter.data.createdDateStart = new Date(this.createDate2[0]).getTime();
                this.parameter.data.createdDateEnd = new Date(this.createDate2[1]).getTime();
            } else {
                this.parameter.data.createdDateStart = '';
                this.parameter.data.createdDateEnd = '';
            }
            this.getInfo(this.parameter);
        },
        // 单独搜索单号
        search2 () {
            this.parameter.data.approveStatus = this.stateCode;
            this.parameter.data.keywords = this.keywords;
            this.parameter.data.consignorName = '';
            this.parameter.data.loadWrhHarbourName = '';
            this.parameter.data.unloadWrhHarbourName = '';
            this.parameter.data.estimatedLoadingDateStart = '';
            this.parameter.data.estimatedLoadingDateEnd = '';
            this.parameter.data.createdDateStart = '';
            this.parameter.data.createdDateEnd = '';
            this.getInfo(this.parameter);
        },
        toggleTabs (index) { // 状态筛选
            console.log(index);
            if (index === 99) {
                this.newIndex = 99;
                this.stateCode = '';
                this.parameter.data.approveStatus = '';
            } else {
                this.newIndex = index;
                this.stateCode = index;
                this.parameter.data.approveStatus = index;
            }
            // 0：上架，1：下架，2：作废
            this.getInfo(this.parameter);
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.getInfo(this.parameter);
        },
        getInfo (state) { // 获取信息
            let that = this;
            that.$http.post(this.$api.transport.enquiryIntentSearch, that.parameter).then((res) => {
                if (res.data.code === 0) {
                    that.data = res.data.data;
                    that.total = res.data.data.total;
                    that.pageNum = res.data.data.pageNum;
                    for (let i = 0; i < that.data.list.length; i++) {
                        console.log(that.data.list[i].approveStatus);
                        if (that.data.list[i].approveStatus === 1) {
                            that.data.list[i].approveStatus = '待受理';
                        } else if (that.data.list[i].approveStatus === 2) {
                            that.data.list[i].approveStatus = '已受理';
                        } else if (that.data.list[i].approveStatus === 3) {
                            that.data.list[i].approveStatus = '已拒绝';
                        }
                    //     请确认是否受理
                    }
                }
            });
            //    获取数量
            that.$http.post(this.$api.transport.enquiryIntentCount, that.parameter.data).then((res) => {
                if (res.data.code === 0) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].approveStatus === 1) {
                            that.dataCount1 = res.data.data[i].count;
                        } else if (res.data.data[i].approveStatus === 2) {
                            that.dataCount2 = res.data.data[i].count;
                        } else if (res.data.data[i].approveStatus === 3) {
                            that.dataCount3 = res.data.data[i].count;
                        } else if (res.data.data[i].approveStatus === 99) {
                            that.dataCount99 = res.data.data[i].count;
                        }
                    }
                }
            });
        },
        acceptCase (id) {
            let that = this;
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>请确认是否受理?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                that.$http.post(this.$api.transport.enquiryStatusData, {
                    'id': id, // 意向单id
                    'approveStatus': 2 // 受理状态 受理状态 1:未受理 2已受理 3:已拒绝
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.getInfo();
                    }
                });
            }).catch(() => {
            });
        },
        refuseCase (id) {
            let that = this;
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>请确认是否拒绝?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                that.$http.post(this.$api.transport.enquiryStatusData, {
                    'id': id, // 意向单id
                    'approveStatus': 3 // 受理状态 受理状态 1:未受理 2已受理 3:已拒绝
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.getInfo();
                    }
                });
            }).catch(() => {
            });
        }
    }
};
</script>
<style  lang="scss" scoped>
.shipping{
  .listul{
    background-color: #fff;
    width: 83%;
    max-height: 200px;
    overflow: auto;
    position: absolute;
    left: 1px;
    top: 31px;
    z-index: 9;
    border: 1px solid #e6eaea;
    border-top: none;
    margin-left: 16.5%;
    li{
      padding: 5px 10px;
    }
    li:hover{
      cursor: pointer;
      background-color: #f5f7fa;
      color: #4a90e2;
    }
  }
  .my-search{
    margin-left: 5px;
    i:hover{
      cursor: pointer;
    }
  }
  .my-top{
    margin-top: 10px;
  }
  .selected {
    margin-top: 20px;
    padding-bottom: 15px;
    overflow: hidden;
    .right{
      float: right;
    }
    ul li {
      float: left;
      padding: 0 5px;
      cursor: pointer;
      &.active {
        color: $color-a-active;
        border-bottom: 2px solid $color-a-active
      }
    }
    ul li:not(:first-child) {
      position:relative;
      margin-left: 10px;
    }
    .search-btn{
      margin-right:14px;
      color: #666;
    }
    .search-btn:hover{
      cursor: pointer;
    }
    .search-box {
      display: inline-block;
      width: 216px;
      font-size: 14px !important;
      border-bottom: 1px solid #e7ecf1;
      input {
        width: 140px;
        height: 30px;
        color: $color-minor;
        border: none;
      }
      button {
        display:inline-block;
        width: 60px;
        color: $color-minor;
        border: none;
        background-color: #fff;
        text-align: right;
      }
      span {
        color: $color-minor;
        padding-left: 20px
      }
    }
  }
  .rebox{
    position: relative;
    .abbox{
      position: absolute;
      top: 0px;
      right: -5px;
    }
  }
  .icon-mySearch{
    position: absolute;
    top:0;
    right:43px;
  }
  .icon-search{
    position: absolute;
    top:0;
    right:0;
  }
}
</style>
