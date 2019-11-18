<template>
  <div class="commodity-main list-resources">
    <div class="selected">
      <ul>
        <li :class="{ active: newIndex === 0 }" @click="toggleTabs(0)">全部</li>
        <li :class="{ active: newIndex === 1 }" @click="toggleTabs(1)">已上架({{data.putOnShelves}})</li>
        <li :class="{ active: newIndex === 2 }" @click="toggleTabs(2)">已下架({{data.pullOffShelves}})</li>
        <li :class="{ active: newIndex===3 }" @click="toggleTabs(3)">已作废({{data.blankOut}})</li>
      </ul>
      <div class="newSearch">
        <div class="right_div">
          <div class="right_div1">
            <div class="search" style="position:relative">
              <input type="search" v-model="keywords" placeholder="请输入资源单号/品名/公司名" class="gy-input">
              <i class="iconfont icon-search span1" @click="search"></i>
            </div>
          </div>
          <div class="right_div2" @click="toggleSelect=!toggleSelect">
            <span>高级搜索</span>
            <i class="iconfont icon-arrow-down"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="selected-box" v-show="toggleSelect">
      <el-form label-width="80px" size="mini">
        <div class="gy-form-group" style="height: 42px">
          <div class="l">发布日期</div>
          <el-date-picker
            v-model="beginDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="endDate">
          </el-date-picker>
        </div>
        <div class="gy-form-group">
          <div class="l">交割库</div>
          <input type="text" v-model="deliveryWarehouseName">
        </div>
        <div class="gy-form-group">
          <div class="l">交付方式</div>
          <el-select v-model="deliveryType" placeholder="请选择">
            <el-option
              v-for="item in deliveryTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group">
          <div class="l">促销方式</div>
          <el-select v-model="promoType" placeholder="请选择">
            <el-option
              v-for="item in promoTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
         <div class="gy-form-group">
          <div class="l">来源</div>
          <el-select v-model="parameter.data.offerOrigin" placeholder="请选择">
            <el-option
              v-for="item in offerOriginTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="gy-form-group">
          <div class="l">发布公司</div>
          <label>
            <input @click="blur11" type="text" class="gy-input"
                   v-model="companyName" @keyup.enter="onelist1click">
          </label>
          <i class="iconfont icon-mySearch" @click="onelist1click"></i>
          <ul class="listul" v-if="onelist1Show">
            <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)"
                v-if="onelist1.length>0">
              {{item.companyName}}
            </li>
            <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
          </ul>
          <i class="iconfont icon-search" style="right: 0" @click.stop.prevent="search"></i>
        </div>
      </el-form>
      <div class="clear"></div>
    </div>
    <div>
      <div class="right">
        <button type="button" class="gy-button-extra" @click="goNewPage('add')">新增资源</button>
        <button v-if="newIndex!==1 && newIndex !== 3" class="gy-button-normal" @click="batchOperation(0)">批量上架</button>
        <button v-if="newIndex!==2 && newIndex!==3" class="gy-button-normal" @click="batchOperation(1)">批量下架</button>
         <el-upload
              class="upload"
              ref="clearUpload"
              accept=".xlsx,.xls"
              action="api"
              :show-file-list="isShowFile"
              :http-request="upload">
              <button class="gy-button-normal">Excel导入</button>
        </el-upload>
        <button class="gy-button-normal" @click="templateDownload">Excel模版下载</button>
        <button class="gy-button-normal" @click='search(1)'>导出</button>
      </div>
      <table class="gy-table">
        <thead>
        <tr class="top">
          <th style="width:30px">
              <input type="checkbox" v-model="checkedAll" @click.stop="changeState">
          </th>
          <th style="width: 280px">商品</th>
          <th style="width:180px">发布公司</th>
          <th>可供量</th>
          <th>最小起订量</th>
          <th>单价</th>
          <th>交割日期</th>
          <th>促销方式</th>
          <th style="width:100px">操作</th>
        </tr>
        </thead>
        <tbody v-for="(sub , index) in list" :key=index>
        <!--<tr class="separated"><td colspan="8"></td></tr>-->
        <tr class="update-date">
          <td colspan="2">单号：{{sub.odrOfferSn}} <img v-if="sub.isTop == 2" style="width:40px; margin-left:10px;" src='../../../assets/images/top_icon.svg' alt=""> </td>
          <td colspan="7" style="text-align: right;padding-right:10px">发布时间：{{sub.createdDate|date('hour')}}</td>
        </tr>
        <tr class="item">
          <td><label>
            <input type="checkbox" v-model="itemId" :value="sub.id">
          </label></td>
          <td class="tleft" style="width:280px">
            <div class="img-box"><img :src=sub.skuPictureUrl alt=""></div>
            <div class="info-box">{{sub.skuName}}<br>{{sub.offerStatus === 0 ? '已上架':sub.offerStatus === 1? '已下架' :
              '已作废' }}<br>{{sub.deliveryWarehouseName}}
            </div>
          </td>
          <td class="tleft">{{sub.sellerCompanyName}}</td>
          <td class="align-r">{{sub.skuQuantity|numToCash(3)}}{{sub.infUnitOfMeasureDisplayName}}</td>
          <td class="align-r">
            <template v-if="sub.skuMinQuantity">
              {{sub.skuMinQuantity}}{{sub.infUnitOfMeasureDisplayName}}
            </template>
            <template v-else>
              -
            </template>
          </td>
          <td class="price align-r">
            <template v-if="sub.skuPrice">
             {{sub.skuPrice |numToCash}}元{{sub.skuPriceFlag == 1 ? "(可议价)" : ''}}
            </template>
            <template v-else>
              面议
            </template>
          </td>
          <td class="tleft" v-if="sub.deliveryDateFlag === 3">{{sub.deliveryDateText}}</td>
          <td class="tleft" v-else-if="sub.deliveryDateFlag === 2">{{sub.deliveryBeginDate|date}}以前</td>
          <td class="tleft" v-else>{{sub.deliveryBeginDate|date}}到{{sub.deliveryEndDate|date}}</td>
          <td class="tleft">
            <template v-if="sub.promoType === 0">无</template>
            <template v-else-if="sub.promoType === 1">热销</template>
            <template v-else-if="sub.promoType === 2">推荐</template>
            <template v-else-if="sub.promoType === 3">降价</template>
            <template v-else-if="sub.promoType === 4">优惠</template>
          </td>
          <td>
            <!--offerStatus０代表上架，1代表下架，2代表作废-->
            <template v-if="sub.offerStatus === 0">
              <span class="gy-button-view" @click="updateState(1,sub.id)">下架</span>
            </template>
            <template v-if="sub.offerStatus === 1">
              <span class="gy-button-view" @click="updateState(0,sub.id)">上架</span>
              <!--<router-link :to="{name:'createResources', query:{offerId: sub.id}}" class="gy-button-view"> </router-link><br>-->
            </template>
            <span @click="goNewPage('/resources/view', sub.id)"
                  class="gy-button-view">详情</span>
            <span @click="goNewPage('/order/add', sub.id)" v-if="sub.offerStatus === 0"
                  class="gy-button-view">发起订单
            </span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper">
        <div class="pagination-total">共{{total}}条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size=20
          :total=total>
        </el-pagination>
      </div>
    </div>
      <el-dialog
           width="400px"
           :visible.sync="dialogVisible"
           title = "上传进度"
           class="gy-dialog-title">
           {{uploadMsg}}
      </el-dialog>
  </div>
</template>
<script>export default {
    data () {
        return {
            keywords: '',
            dialogVisible: false,
            haveResult: false,
            searchTimer: '',
            uploadMsg: '',
            isShowFile: false,
            searchCode: '', // 查询订单号
            skuName: '', // 查询品名
            beginDate: [], // 查询开始时间
            endDate: '',
            total: 0, // 总条数
            pageNum: 1,
            newIndex: 0,
            itemId: [],
            companyList: [],
            // sellerCompanyId: 104,
            // sellerCompanyId: JSON.parse(localStorage.getItem('userInfo')).companyId,
            companyName: '',
            checkedAll: false,
            parameter: {
                data: {
                    flag: 1,
                    offerType: 1,
                    offerOrigin: ''
                },
                pageSize: 20
            },
            toggleSelect: false, // 高级搜索显示隐藏
            list: [],
            data: {
                pageSize: 0, // 显示条数
                pageNum: 0, // 当前页数
                putOnShelves: 0, // 已上架条数
                pullOffShelves: 0, // 已下架条数
                blankOut: 0, // 作废条数
                offerStatus: 0, // 供应单状态
                deliveryBeginDate: '',
                deliveryEndDate: ''
            },
            sellerCompanyId: '',
            promoType: '',
            deliveryWarehouseName: '',
            deliveryType: '',
            deliveryTypeOption: [
                {
                    value: 0,
                    label: '全部支持'
                },
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            offerOriginTypeOption: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 1,
                    label: '前台录入'
                },
                {
                    value: 2,
                    label: '后台录入'
                },
                {
                    value: 3,
                    label: '后台导入'
                }
            ],
            promoTypeOption: [{
                value: 0,
                label: '无'
            },
            {
                value: 1,
                label: '热销'
            },
            {
                value: 2,
                label: '推销'
            },
            {
                value: 3,
                label: '降价'
            },
            {
                value: 4,
                label: '优惠'
            }],
            datas: {
                offerIdList: []
            },
            goNewPage (url, offerId) {
                let routeUrl = this.$router.resolve({
                    path: url,
                    query: {offerId}
                });
                window.open(routeUrl.href, '_blank');
            },
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
            onelist1: [],
            onelist1Show: false
        };
    },
    created () {
        this.getInfo();
    // this.getCompany();
    },
    methods: {
        changeState (e) {
            this.checkedAll = !this.checkedAll;
            this.itemId = [];
            if (this.checkedAll) {
                this.list.forEach((obj) => {
                    this.itemId.push(obj.id);
                });
            }
        },
        onelist1click () {
            this.onelist1Show = true;
            this.$http.post(this.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.companyName
            })
                .then((res) => {
                    this.onelist1 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            this.sellerCompanyId = '';
        },
        download (data, fileName) {
            var blob = new Blob([data], {type: 'application/vnd.ms-excel;charset=utf-8'});
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                navigator.msSaveBlob(blob, fileName);
            } else {
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            }
        },
        templateDownload () {
            this.$http.get(this.$api.offers.templateDownload + 1, {responseType: 'blob', timeout: 60000}).then(res => {
                if (res.data) {
                    this.download(res.data, '供应列表资源单模版.xls');
                    return;
                }
                this.$message.error('没有数据可下载');
            });
        },
        upload (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('multipartFile', file.file);
            this.$http.post(this.$api.offers.seller, formData, headers)
                .then(function (res) {
                    res.data.code === 0 && that.searchResult(res.data.data.id);
                    res.data.code !== 0 && that.$message(res.data.message);
                });
        },
        searchResult (id) {
            this.$http.get(this.$api.offers.result + id)
                .then((res) => {
                    this.uploadMsg = res.data.data.message;
                    !this.dialogVisible && (this.dialogVisible = true);
                    if (res.data.data.status > 1) {
                        this.getInfo();
                        return;
                    }
                    clearTimeout(this.searchTimer);
                    this.searchTimer = setTimeout(() => {
                        this.dialogVisible === true && this.searchResult(id);
                    }, 5000);
                });
        },
        onelist1select (item) {
            this.companyName = item.companyName;
            this.sellerCompanyId = item.companyId;
            this.onelist1Show = false;
        },
        blur11 () {
            this.onelist1Show = false;
            this.companyName = '';
            this.sellerCompanyId = '';
        },

        // 批量上下架
        batchOperation (state) {
            this.datas.offerIdList = this.itemId;
            this.datas.offerStatus = state;
            if (this.datas.offerIdList.length) {
                // 批量上架
                if (this.datas.offerStatus === 0) {
                    this.updateStatesBatch(this.datas, this.$api.offers.batchUp);
                }
                // 批量下架
                if (this.datas.offerStatus === 1) {
                    this.updateStatesBatch(this.datas, this.$api.offers.batchDown);
                }
                if (this.datas.offerStatus === 2) {
                    this.updateStates(this.datas);
                }
            } else {
                this.$message.error('请选中要操作的资源单');
            }
        },
        handleSelectCompany (item) {
            this.sellerCompanyId = item.id;
        },
        querySearch1 (queryString, cb) {
            var restaurants = this.companyList;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        // getCompany () {
        //     this.$http.get(that.$api.orders.creatOrderCompanies).then((res) => {
        //         if (res.data.code === 0) {
        //             let param = {};
        //             for (let i = 0; i < res.data.data.length; i++) {
        //                 param.value = res.data.data[i].companyName;
        //                 param.id = res.data.data[i].companyId;
        //                 that.companyList.push(param);
        //                 param = {};
        //             }
        //         }
        //     });
        // },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        search (state) { // 搜索
            this.parameter.pageNum = this.pageNum;
            this.parameter.data.offerType = 1;
            this.parameter.data.keyword = this.keywords;
            this.parameter.data.deliveryType = this.deliveryType;
            this.parameter.data.promoType = this.promoType;
            this.parameter.data.sellerCompanyId = this.sellerCompanyId;
            this.parameter.data.deliveryWarehouseName = this.deliveryWarehouseName;
            if (this.beginDate === null) {

            } else {
                if (this.beginDate.length) {
                    this.parameter.data.createdBeginDate = this.beginDate[0].getTime();
                    this.parameter.data.createdEndDate = this.beginDate[1].getTime();
                }
            }
            this.getInfo(this.parameter);
            if (state === 1) {
                this.$tools.downloadFile(this, 'platform/v1/offers/exportExcel', this.parameter.data, '供应单.xls');
            }
        },
        toggleTabs (index) { // 状态筛选
            this.parameter.pageNum = this.pageNum;
            this.parameter.data.keyword = this.keywords;
            this.parameter.data.deliveryType = this.deliveryType;
            this.parameter.data.promoType = this.promoType;
            this.parameter.data.sellerCompanyId = this.sellerCompanyId;
            this.parameter.data.offerType = 1;
            this.parameter.data.deliveryWarehouseName = this.deliveryWarehouseName;
            if (this.beginDate === null) {

            } else {
                if (this.beginDate.length) {
                    this.parameter.data.createdBeginDate = this.beginDate[0].getTime();
                    this.parameter.data.createdEndDate = this.beginDate[1].getTime();
                }
            }
            this.newIndex = index;
            // 0：上架，1：下架，2：作废
            this.offerStatus = index >= 1 ? index - 1 : '';
            this.parameter.data.offerStatus = this.offerStatus;
            // this.parameter.data.sellerCompanyId = this.sellerCompanyId;
            this.getInfo(this.parameter);
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.parameter.data.offerType = 1;
            this.parameter.data.keyword = this.keywords;
            this.parameter.data.deliveryType = this.deliveryType;
            this.parameter.data.promoType = this.promoType;
            this.parameter.data.sellerCompanyId = this.sellerCompanyId;
            this.parameter.data.deliveryWarehouseName = this.deliveryWarehouseName;
            if (this.beginDate === null) {

            } else {
                if (this.beginDate.length) {
                    this.parameter.data.createdBeginDate = this.beginDate[0].getTime();
                    this.parameter.data.createdEndDate = this.beginDate[1].getTime();
                }
            }

            this.parameter.data.offerStatus = this.offerStatus;
            this.getInfo(this.parameter);
        },
        getInfo (state) { // 获取信息
            this.parameter.pageNum = this.pageNum;
            this.parameter.data.offerStatus = this.offerStatus;
            // if (!state) {
            //     this.parameter.data.sellerCompanyId = this.sellerCompanyId;
            // }
            this.parameter.data.flag = 1;
            this.$http.post(this.$api.offers.list, this.parameter).then((res) => {
                if (res.data.code === 0) {
                    let result = res.data.data;
                    this.list = result.list;
                    this.data = result;
                    this.total = result.total;
                    this.pageNum = result.pageNum;
                    // this.parameter.data = {};
                    this.skuName = '';
                    this.offerCode = '';
                }
            });
        },
        updateState (status, parm) {
            this.datas.offerIdList.push(parm);
            this.datas.offerStatus = status;
            // 上架
            if (this.datas.offerStatus === 0) {
                this.updateStatesd(this.datas, this.$api.offers.up);
            }
            // 下架
            if (this.datas.offerStatus === 1) {
                this.updateStatesd(this.datas, this.$api.offers.down);
            }
            if (this.datas.offerStatus === 2) {
                this.updateStates(this.datas);
            }
        },
        // 批量上架 下架
        updateStatesBatch (datas, url) {
            this.parameter.data.offerType = 1;
            this.$http.post(url, this.datas).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                    this.parameter.data.offerStatus = this.newIndex === 1 ? 0 : this.newIndex === 2 ? 1 : '';
                    this.getInfo();
                } else {
                    this.$message.error(res.data.message);
                }
                this.itemId = [];
                this.checkedAll = !this.checkedAll;
                this.datas.offerIdList = [];
            });
        },
        // 上架  下架
        updateStatesd (datas, url) {
            this.parameter.data.offerType = 1;
            this.$http.post(url, this.datas).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                    this.parameter.data.offerStatus = this.newIndex === 1 ? 0 : this.newIndex === 2 ? 1 : '';
                    this.getInfo();
                }
                this.itemId = [];
                this.datas.offerIdList = [];
            });
        },
        updateStates (status) {
            // 0：上架，1：下架，2：作废
            this.parameter.data.offerType = 1;
            this.$http.post(this.$api.offers.state, this.datas).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                    this.parameter.data.offerStatus = this.newIndex === 1 ? 0 : this.newIndex === 2 ? 1 : '';
                    this.getInfo();
                }
                this.itemId = [];
                this.datas.offerIdList = [];
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import './../../../styles/module/CMList';

.list-resources {
  margin-top: 15px;
  .iconfont {
    vertical-align: middle
  }
  .el-card__header {
    padding: 10px 20px;
    .title {
      color: $color-title;
      font-size: 16px;
      margin-right: 24px;
    }
  }

  .right {
    float: right;
    margin-bottom: 20px;
    .upload {
      display: inline-block;
    }
  }
  .el-autocomplete {
    width: 505px;
  }
  .selected {
    overflow: hidden;
    ul li {
      float: left;
      padding: 0 5px;
      cursor: default;
      &.active {
        color: $color-a-active;
        border-bottom: 1px solid $color-a-active
      }
    }
    ul li:not(:first-child) {
      position: relative;
      margin-left: 10px;
    }
    .search-btn {
      position: relative;
      margin-right: 10px;
      color: $color-minor;
    }
    .search-box {
      display: inline-block;
      width: 216px;
      border-bottom: 1px solid $color-light;
      input {
        width: 140px;
        height: 30px;
        color: $color-light;
        border: none;
        float: left;
      }
      button {
        display: inline-block;
        width: 60px;
        color: $color-main;
        border: none;
        background-color: #fff;
        text-align: right;
      }
      span {
        color: $color-light;
        padding-left: 20px
      }
    }
  }
  .selected-box {
    padding: 0 0 12px 14px;
    .el-input__inner {
      height:30px;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      .el-input__icon {
        line-height: 26px !important;
      }
    }
  }
  a.gy-button-view {
    display: inline-block;
    margin-top: 2px;
  }
  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    td {
      height: 35px;
      font-size: 12px;
      color: $color-main;
      text-align: center;
      .gy-button-view {
         margin-bottom: 5px;
      }
    }
    tr.top td {
      background-color: #D4D4D4;
    }
    tr:not(:first-child) {
      border: 1px solid $color-border;
    }
    tr.separated {
      border-left: 0;
      border-right: 0
    }
    tr.separated td {
      background-color: #fff;
      height: 16px;
    }
    .update-date td {
      background: #fbfbfc;
      text-align: left;
      padding-left: 10px
    }
    td.tleft {
      text-align: left;
    }
    td button:not(:first-child) {
      margin-top: 2px;
    }
  }
  .item td:not(:first-child) {
    padding: 12px;
    // border: 1px solid $color-border;
    border-top: 0;
    border-bottom: 0;
  }

  td.price {
    color: $color-a-active
  }
  td .img-box {
    float: left;
    margin-right: 20px;
    width: 58px;
    height: 58px;
    img {
      width: 58px;
      height: 58px;
      border: 1px solid $color-border;
    }
  }
  .info-box {
    padding-left: 78px;
    line-height: 19px;
  }
  .listul {
    background-color: #fff;
    width: calc(100% - 116px);
    max-height: 200px;
    overflow: auto;
    position: absolute;
    left: 95px;
    top: 32px;
    z-index: 9;
    border: 1px solid #e6eaea;
    border-top: none;
    li {
      padding: 5px 10px;
    }
    li:hover {
      cursor: pointer;
      background-color: #f5f7fa;
      color: #4a90e2;
    }
  }
  .icon-mySearch{
    position: absolute;
    top:0;
    right:38px;
  }
}

.gy-form-group {
   padding-left: 66px;
   .l {
      width: 56px;
   }
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 96px;
  .l {
    width: 86px;
    padding-left: 30px;
  }
}
</style>
<style lang="scss">
  .list-resources{
    .el-range-separator{
      line-height: 24px;
    }
    .el-dialog {
      margin-top: 40vh!important;
    }
    .el-dialog__body {
     padding: 50px 20px 70px;
    }
  }
</style>
