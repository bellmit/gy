<template>
    <div class="my-wrap">
      <div class="advanced-search" :class="{'show-advance': showAdvance}" v-show="showAdvance">
        <div>
          <el-row :gutter="40">
            <el-col class="martop" :span="12">
              <el-row>
                <el-col :span="4">托运方</el-col>
                <el-col :span="19">
                  <input @click="blur11" type="text" class="gy-input" v-model="consignorId2" @keyup.enter="onelist1click">
                </el-col>
                <el-col :span="1"><i class="iconfont icon-mySearch"  @click="onelist1click"></i></el-col>
                <ul class="listul"  v-show="onelist1Show">
                  <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                    {{item.companyName}}
                  </li>
                  <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
                </ul>
              </el-row>
            </el-col>
            <el-col class="martop" :span="12"  v-if='searchType==0'>
              <el-row>
                <el-col :span="4">承运商</el-col>
                <el-col :span="19">
                  <input @click="blur22" type="text" class="gy-input" v-model="carrierId2" @keyup.enter="onelist1click2">
                </el-col>
                <el-col :span="1"> <i class="iconfont icon-mySearch"  @click="onelist1click2"></i></el-col>
                <ul class="listul"  v-show="onelist2Show">
                  <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                    {{item.companyName}}
                  </li>
                  <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
                </ul>
              </el-row>
            </el-col>
            <el-col class="martop" :span="12">
              <el-row>
                <el-col :span="4">装货地</el-col>
                <el-col :span="10">
                  <el-select v-model="searchData.loadProvinceId" placeholder="请选择省份" @change="provinceChange(0)" class="fl province">
                  <el-option
                    v-for="item in sendProvinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                </el-col>
                <el-col :span="9">
                  <el-select v-model="searchData.loadAreaId" placeholder="请选择城市" class="fr city">
                    <el-option
                      v-for="item in sendCityList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="martop" :span="12">
              <el-row>
                <el-col :span="4">卸货地</el-col>
                <el-col :span="9">
                  <el-select v-model="searchData.unloadProvinceId" placeholder="请选择省份" @change="provinceChange(1)" class="fl province">
                  <el-option
                    v-for="item in loadProvinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                </el-col>
                <el-col :span="10">
                  <el-select v-model="searchData.unloadAreaId" placeholder="请选择城市" class="fr city">
                  <el-option
                    v-for="item in loadCityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="martop" :span="12">
              <el-row>
                <el-col :span="4">期望支付方式</el-col>
                <el-col :span="19">
                  <el-select v-model="searchData.freightPaymentType" placeholder="不限">
                    <el-option
                      v-for="item in paymentType"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="martop" :span="12">
              <el-row>
                <el-col :span="4">期望签约方式</el-col>
                <el-col :span="19">
                  <el-select v-model="searchData.consignmentSignType" placeholder="不限">
                  <el-option
                    v-for="item in signType"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="martop" :span="12">
              <el-row>
                <el-col :span="4">装货日期</el-col>
                <el-col :span="8">
                    <el-date-picker
                    v-model="searchData.estimatedLoadingDateStart"
                    class="form-date"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-col>
                <el-col :span="3" style="text-align: center"><span class="form-line">至</span></el-col>
                <el-col :span="8">
                  <el-date-picker
                  v-model="searchData.estimatedLoadingDateEnd"
                  class="form-date"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                </el-col>
                <el-col :span="1" v-if="searchType !== 0"><i class="iconfont icon-search cl" @click="handleSearch"></i></el-col>
              </el-row>
            </el-col>
            <el-col class="martop" :span="12" v-if="searchType === 0">
              <el-row>
                <el-col :span="4">四流审核</el-col>
                <el-col :span="19">
                  <el-select v-model="searchData.billStatus" placeholder="请选择">
                    <el-option
                      v-for="item in $constant.auditStatusListTrans"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="1"><i class="iconfont icon-search cl" @click="handleSearch"></i></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 导出 -->
      <div class="button-wrap" v-if="searchType === 0 || searchType === 3">
          <button class="gy-button-extra" @click="exportDoc">导出</button>
      </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            carrierId2: null,
            consignorId2: null,
            searchData: {
                billStatus: null,
                carrierId: null,
                estimatedLoadingDateStart: null,
                estimatedLoadingDateEnd: null,
                loadProvinceId: null,
                loadAreaId: null,
                unloadProvinceId: null,
                unloadAreaId: null,
                consignorId: null,
                consignmentSignType: null,
                freightPaymentType: null,
                consignmentNoteCode: null,
                consignmentNoteStatus: null,
                keywords: null
            },
            tradeCompanyList: [],
            carrierCompanyList: [],
            sendProvinceList: [],
            sendCityList: [],
            loadProvinceList: [],
            loadCityList: [],
            paymentType: [
                {
                    id: 0,
                    value: '在线支付'
                },
                {
                    id: 1,
                    value: '线下支付'
                }
            ],
            signType: [
                {
                    id: 0,
                    value: '在线签约'
                },
                {
                    id: 1,
                    value: '线下签约'
                }
            ],
            searchApi: [
                {
                    list: this.$api.transport.orderList,
                    status: this.$api.transport.orderStatus
                },
                {
                    list: this.$api.transport.bidList,
                    status: this.$api.transport.bidStatus
                }
            ],
            onelist1Show: false,
            onelist2Show: false,
            onelist1: [],
            onelist2: []
        };
    },
    props: ['keywords', 'consignmentNoteStatus', 'showAdvance', 'searchInfo', 'advance', 'searchType', 'countStatus'],
    created () {
        this.getTradeCompany();
        this.getProvince();
        this.getCarrierCompany();
    },
    methods: {
        // 导出
        exportDoc () {
            this.searchData.keywords = this.keywords;
            this.searchData.consignmentNoteStatus = (this.consignmentNoteStatus || this.consignmentNoteStatus === 0) ? this.consignmentNoteStatus : null;
            this.$http.post(this.$api.transport.consignmentsExport, this.searchData, {responseType: 'blob'}).then(res => {
                if (res.data.size > 0) {
                    this.download(res.data);
                    return;
                }
                this.$message.error('没有文件可下载');
            });
        },
        format (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        download (data) {
            let blob = new Blob([data]);
            let y, m, d, date, time;
            date = new Date();
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            time = y + '' + this.format(m) + '' + this.format(d);
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                navigator.msSaveBlob(blob, `${time}运输订单列表.xls`);
            } else {
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', `${time}运输订单列表.xls`);
                document.body.appendChild(link);
                link.click();
            }
        },
        onelist1click () {
            var that = this;
            that.onelist1Show = true;
            that.$http.post(that.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.consignorId2
            })
                .then(function (res) {
                    that.onelist1 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            that.searchData.consignorId = '';
        },
        onelist1click2 () {
            var that = this;
            that.onelist2Show = true;
            that.$http.post(that.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 2, // 1:交易公司  2：承运商
                'name': this.carrierId2
            })
                .then(function (res) {
                    that.onelist2 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            that.searchData.carrierId = '';
        },
        onelist1select (item) {
            var that = this;
            that.consignorId2 = item.companyName;
            that.searchData.consignorId = item.companyId;
            that.onelist1Show = false;
        },
        onelist1select2 (item) {
            var that = this;
            that.carrierId2 = item.companyName;
            that.searchData.carrierId = item.companyId;
            that.onelist2Show = false;
        },
        blur11 () {
            this.consignorId2 = '';
            this.onelist1Show = false;
            this.searchData.consignorId = '';
        },
        blur22 () {
            this.carrierId2 = '';
            this.onelist2Show = false;
            this.searchData.carrierId = '';
        },
        getTradeCompany () {
            this.$http.get(this.$api.transport.tradeCompany)
                .then(res => {
                    this.tradeCompanyList = res.data.data;
                });
        },
        getCarrierCompany () {
            this.$http.get(this.$api.transport.carryierCompany)
                .then(res => {
                    this.carrierCompanyList = res.data.data;
                });
        },
        getProvince () {
            this.$http.get(this.$api.offers.newAddress + '0')
                .then(res => {
                    this.sendProvinceList = res.data.data;
                    this.loadProvinceList = res.data.data;
                });
        },
        provinceChange (t) {
            if (t === 0) {
                this.sendCityList = [];
                this.searchData.loadAreaId = null;
                this.$http.get(this.$api.offers.newAddress + this.searchData.loadProvinceId)
                    .then(res => {
                        this.sendCityList = res.data.data;
                    });
                return;
            }
            this.loadCityList = [];
            this.searchData.unloadAreaId = null;
            this.$http.get(this.$api.offers.newAddress + this.searchData.unloadProvinceId)
                .then(res => {
                    this.loadCityList = res.data.data;
                });
        },
        handleSearch () {
            this.searchData.keywords = this.keywords;
            this.$emit('update:advance', this.searchData);
            this.$http.post(this.searchApi[this.searchType].list, {
                data: this.searchData,
                pageNum: 1,
                pageSize: 10
            })
                .then(res => {
                    this.$emit('update:searchInfo', res.data.data);
                    this.$http.post(this.searchApi[this.searchType].status, this.searchData)
                        .then(r => {
                            this.$emit('update:countStatus', r.data.data);
                        });
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .button-wrap {
        font-size: 0;
        padding: 15px 0 8px;
        display: inline-block;
        width: 100%;
        text-align: right;
    }
    .advanced-search{
        clear: both;
        padding:15px 0 0 14px;
        .gy-form{
            transition: all 0.8s;
            padding: 20px 0 0 20px;
            position: relative;
            .gy-form-group{
                padding-right: 40px;
            }
            .form-date{
                width: 47%;
            }
            .form-line{
                display: inline-block;
                width: 6%;
                text-align: center;
            }
            .address{
                padding-bottom: 1px;
                .province, .city{
                    width: 48%;
                }
            }
            .icon-search{
                position: absolute;
                right: 0;
                bottom: 10px;
            }
        }
        &.show-advance{
        }
      .listul{
        background-color: #fff;
        width: 79.16667%;
        max-height: 145px;
        position: absolute;
        top: 30px;
        z-index: 9;
        border: 1px solid #e6eaea;
        border-top: none;
        margin-left: 16.66667%;
        overflow: auto;
        li{
          padding: 5px 10px;
        }
        li:hover{
          cursor: pointer;
          background-color: #f5f7fa;
          color: #4a90e2;
        }
      }
      .martop{
        margin-top: 15px;
      }
    }
    .icon-mySearch{
      position: absolute;
      top:0;
      right:30px;
    }
</style>
