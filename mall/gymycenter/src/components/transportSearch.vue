<template>
    <div style="overflow: inherit" class="advanced-search" :class="{'show-advance': showAdvance}" v-show="showAdvance">
       <div class="trans_new">
           <el-row :gutter="60">
              <el-col class="my_top" :span="12" v-if="companyTypeId === 2">
                        <el-row class="new_dw">
                            <el-col class="l" :span="5">托运方</el-col>
                            <el-col :span="19">
                                <input placeholder="请输入" @click="blur11" type="text" class="gy-input" v-model="carrierIdV1" @keyup.enter="onelist1click1">
                            </el-col>
                            <el-col class="new_dw2" :span="1"><i class="iconfont icon-mySearch"  @click="onelist1click1"></i></el-col>
                            <ul class="listul"  v-show="onelist1Show">
                                <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select1(item)" v-if="onelist1.length>0">
                                    {{item.companyName}}
                                </li>
                                <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
                            </ul>
                        </el-row>
                    </el-col>
              <el-col class="my_top" :span="12" v-if="companyTypeId !== 2">
                  <el-row class="new_dw">
                      <el-col class="l" :span="5">承运商</el-col>
                      <el-col :span="19">
                          <input placeholder="请输入" @click="blur22" type="text" class="gy-input" v-model="carrierIdV2" @keyup.enter="onelist1click2">
                      </el-col>
                      <el-col class="new_dw2" :span="1"> <i class="iconfont icon-mySearch"  @click="onelist1click2"></i></el-col>
                      <ul class="listul"  v-show="onelist2Show">
                          <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                              {{item.companyName}}
                          </li>
                          <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
                      </ul>
                  </el-row>
              </el-col>
              <el-col class="my_top" :span="12" v-if="searchType === 3">
                        <el-row>
                            <el-col class="l"  :span="5">运输订单号</el-col>
                            <el-col :span="19"><input type="text" class="gy-input" v-model="searchData.consignmentNoteCode"></el-col>
                        </el-row>
                    </el-col>
              <el-col class="my_top" :span="12" v-if="searchType !== 3">
                        <el-row>
                            <el-col class="l" :span="5">装货日期</el-col>
                            <el-col :span="9">
                                <el-date-picker
                                v-model="searchData.estimatedLoadingDateStart"
                                class="form-date"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            </el-col>
                            <el-col :span="1" style="margin-top: 3px">至</el-col>
                            <el-col :span="9">
                                <el-date-picker
                                    v-model="searchData.estimatedLoadingDateEnd"
                                    class="form-date"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </el-col>
              <el-col class="my_top" :span="12" v-if="searchType !== 3">
                        <el-row>
                            <el-col class="l" :span="5">装货地</el-col>
                            <el-col :span="9">
                                <el-select v-model="searchData.loadProvinceId" placeholder="请选择省份" @change="provinceChange(0)"
                                           class="fl province">
                                    <el-option
                                        v-for="item in sendProvinceList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="10">
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
              <el-col class="my_top" :span="12" v-if="searchType !== 3">
                        <el-row>
                            <el-col class="l" :span="5">卸货地</el-col>
                            <el-col :span="9">
                                <el-select v-model="searchData.unloadProvinceId" placeholder="请选择省份" @change="provinceChange(1)"
                                           class="fl province">
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
              <el-col class="my_top" :span="12" v-if="searchType !== 1 && searchType !== 2 && searchType !== 3">
                        <el-row>
                            <el-col class="l" :span="5">期望支付方式</el-col>
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
              <el-col class="my_top" :span="12" v-if="searchType !== 1 && searchType !== 2 && searchType !== 3">
                  <el-row>
                      <el-col class="l" :span="5">期望签约方式</el-col>
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
           </el-row>
           <!--2 物流询价单 托运方 装货地 。。。   0 是运输订单  托运方 装货地 多了个期望方式。。。   3 运输结算单 只有两个   1承运商竞价-->
           <div class="new_myi" v-if="searchType === 1">
               <i class="iconfont icon-search cl" @click="handleSearch"></i>
           </div>
           <div class="new_myi2" v-if="searchType === 0">
               <i class="iconfont icon-search cl" @click="handleSearch"></i>
           </div>
           <div class="new_myi3" v-if="searchType === 3">
               <i class="iconfont icon-search cl" @click="handleSearch"></i>
           </div>
           <div class="new_myi4" v-if="searchType === 2">
               <i class="iconfont icon-search cl" @click="handleSearch"></i>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            carrierIdV1: '',
            carrierIdV2: '',
            searchData: {
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
                keywords: null
            },
            companyTypeId: null,
            companyList: [],
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
            companyId: null,
            companyApi: null,
            searchApi: [
                {
                    list: this.$api.transport.orderList,
                    status: this.$api.transport.orderStatus
                },
                {
                    list: this.$api.transport.enquiryList,
                    status: this.$api.transport.enquiryStatus
                },
                {
                    list: this.$api.transport.enquiryList,
                    status: this.$api.transport.bidStatus
                },
                {
                    list: this.$api.transport.chargeList,
                    status: this.$api.transport.chargeStatus
                }
            ],
            onelist1Show: false,
            onelist2Show: false,
            onelist1: [],
            onelist2: []
        };
    },
    props: ['keywords', 'showAdvance', 'searchInfo', 'advance', 'searchType', 'countStatus'],
    created () {
        this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
        this.companyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
        this.companyTypeId === 2 ? (this.searchData.carrierId = this.companyId) : (this.searchData.consignorId = this.companyId);
        this.getCompany();
        this.getProvince();
        console.log(this.searchType);
    },
    methods: {
        // 修改公司名称
        onelist1click1 () {
            var that = this;
            that.onelist1Show = true;
            that.$http.post(that.$api.order.creatOrderCompanies, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.carrierIdV1
            })
                .then(function (res) {
                    that.onelist1 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            that.searchData.consignorId = '';
        },
        onelist1select1 (item) {
            var that = this;
            that.carrierIdV1 = item.companyName;
            that.searchData.consignorId = item.companyId;
            that.onelist1Show = false;
        },
        blur11 () {
            this.onelist1Show = false;
            this.carrierIdV1 = '';
            this.searchData.consignorId = '';
        },
        onelist1click2 () {
            var that = this;
            that.onelist2Show = true;
            that.$http.post(that.$api.order.creatOrderCompanies, {
                'companyTypeId': 2, // 1:交易公司  2：承运商
                'name': this.carrierIdV2
            })
                .then(function (res) {
                    that.onelist2 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            that.searchData.carrierId = '';
        },
        onelist1select2 (item) {
            var that = this;
            that.carrierIdV2 = item.companyName;
            that.searchData.carrierId = item.companyId;
            that.onelist2Show = false;
        },
        blur22 () {
            this.onelist2Show = false;
            this.carrierIdV2 = '';
            this.searchData.carrierId = '';
        },
        //
        getCompany () {
            let api;
            api = this.companyTypeId === 2 ? this.$api.order.creatOrderCompanies : this.$api.order.logisticsCompanies;
            this.$http.get(api)
                .then(res => {
                    this.companyList = res.data.data;
                });
        },
        getProvince () {
            this.$http.get(this.$api.account.newArea + '/0')
                .then(res => {
                    this.sendProvinceList = res.data.data;
                    this.loadProvinceList = res.data.data;
                });
        },
        provinceChange (t) {
            if (t === 0) {
                this.sendCityList = [];
                this.searchData.loadAreaId = null;
                this.$http.get(this.$api.account.newArea + '/' + this.searchData.loadProvinceId)
                    .then(res => {
                        this.sendCityList = res.data.data;
                    });
                return;
            }
            this.loadCityList = [];
            this.searchData.unloadAreaId = null;
            this.$http.get(this.$api.account.newArea + '/' + this.searchData.unloadProvinceId)
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
    .advanced-search {
        clear: both;
        overflow: hidden;
        padding: 0 30px 10px;
        .l{
            color: $color-title;
        }
        .gy-form {
            transition: all 0.8s;
            padding: 20px 0 0 20px;
            position: relative;
            .gy-form-group {
                padding-right: 40px;
            }
            .form-date {
                width: 136px;
            }
            .form-line {
                display: inline-block;
                width: 18px;
                text-align: center;
            }
            .address {
                padding-bottom: 1px;
                .province, .city {
                    width: 48%;
                }
            }
        }
        &.show-advance {
        }
        .listul{
            background-color: #fff;
            width: 79%;
            max-height: 200px;
            overflow: auto;
            position: absolute;
            top: 30px;
            z-index: 9;
            border: 1px solid #e6eaea;
            border-top: none;
            margin-left: 20.8%;
            li{
                padding: 5px 10px;
            }
            li:hover{
                cursor: pointer;
                background-color: #f5f7fa;
                color: #4a90e2;
            }
        }
        .my_top{
            margin-bottom: 10px;
        }
        .new_dw{
            position: relative;
            .new_dw2{
                position: absolute;
                top: 0;
                right: 7px;
            }
        }
    }
    .trans_new{
        position: relative;
        .new_myi{
            position: absolute;
            top: 51%;
            right: -20px;
        }
        .new_myi2{
            position: absolute;
            top: 67%;
            right: -20px;
        }
        .new_myi3{
            position: absolute;
            top: 5%;
            right: -20px;
        }
        .new_myi4{
            position: absolute;
            top: 50%;
            right: -20px;
        }
    }
</style>
