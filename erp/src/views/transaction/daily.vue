<template>
    <div class="standingBook">
      <!-- 高级搜索 -->
      <div class="search-btn">
        <span @click="ShowSearch" class="search-h">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
      </div>
      <div class="my-search clearfix">
        <div class="gy-form-group">
          <span class="l">合同签订日期</span>
          <div class="searchDate">
            <div class="d">
              <el-date-picker
                v-model="search.contractSignedDateStart"
                type="date"
                placeholder="开始日期">
              </el-date-picker>
            </div>
            <div class="c">至</div>
            <div class="d">
              <el-date-picker
                v-model="search.contractSignedDateEnd"
                type="date"
                placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="gy-form-group" :class="{'last-active': !isShowSearch}">
            <span class="l">业务组</span>
            <el-select v-model="search.usrOrganizationId">
              <el-option
                v-for="(item, index) in organizationDate"
                :key="index"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
        </div>
        <div class="search-form" v-if="isShowSearch">
          <div class="gy-form-group cl">
            <span class="l">业务类型</span>
              <el-select v-model="search.bizType">
                <el-option
                  v-for="(item, index) in $constant.businessType4Erp"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div class="gy-form-group">
            <span class="l">业务操作人</span>
            <input type="text" placeholder="请输入" v-model="search.operationUserName">
          </div>
          <div class="gy-form-group">
            <span class="l">交割库</span>
              <el-select v-model="search.deliveryWarehouseName">
                <el-option
                  v-for="(item, index) in deliveryNamesData"
                  :key="index"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
          <div class="gy-form-group" v-if="this.activeId === 0">
            <span class="l">上游公司</span>
            <input type="text" placeholder="请输入" v-model="search.sellerCompanyName">
          </div>
          <div class="gy-form-group" v-if="this.activeId === 1">
            <span class="l">下游公司</span>
            <input type="text" placeholder="请输入" v-model="search.buyerCompanyName">
          </div>
          <div class="gy-form-group">
              <span class="l">实际交割库</span>
              <el-select v-model="search.realDeliveryWarehouseName">
                <el-option
                  v-for="(item, index) in deliveryNamesData"
                  :key="index"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
          <div class="gy-form-group">
            <span class="l">合同交割起始日</span>
            <div class="searchDate">
              <div class="d">
                <el-date-picker
                  v-model="search.contractDeliveredStartDateStart"
                  type="date"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div class="c">至</div>
              <div class="d">
                <el-date-picker
                  v-model="search.contractDeliveredStartDateEnd"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="gy-form-group">
            <span class="l">合同交割终止日</span>
            <div class="searchDate">
              <div class="d">
                <el-date-picker
                  v-model="search.contractDeliveredEndDateStart"
                  type="date"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div class="c">至</div>
              <div class="d">
                <el-date-picker
                  v-model="search.contractDeliveredEndDateEnd"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="gy-form-group" :class="{'last-active': isShowSearch}">
            <span class="l">我方公司</span>
            <input type="text" placeholder="请输入" v-model="search.ourCompanyName">
          </div>
        </div>
        <span class="searchicon" @click="submit()"><i class="iconfont icon-search"></i></span>
      </div>
      <!-- 报表切换 -->
      <div class="tabs cl">
        <ul>
          <li v-for="(item, index) in tabs" :key="index" :class="{'active': index === activeId}" @click="tabClick(index)">
            <span>{{item.value}}</span>
          </li>
        </ul>
        <div class="button-wrap">
          <button class="gy-button-extra" @click="excel()">下载Excel</button>
        </div>
      </div>
      <!-- 报表 -->
      <div class="div">
        <div class="my-table">
          <gy-upstream v-if="activeId === 0" ref="upstream" :searchForm = search></gy-upstream>
          <gy-downstream v-if="activeId === 1" ref="downstream" :searchForm = search></gy-downstream>
        </div>
      </div>
    </div>
</template>

<script>
import gyUpstream from './dailyDetails/upstream.vue';
import gyDownstream from './dailyDetails/downstream.vue';
export default {
    components: {
        gyUpstream,
        gyDownstream
    },
    data () {
        return {
            total: 30,
            checkAll: false,
            isIndeterminate: true,
            value: 1,
            dialogVisible: false,
            isShowSearch: false,
            search: {
                pageNum: 1,
                pageSize: 10,
                contractSignedDateStart: null,
                contractSignedDateEnd: null,
                usrOrganizationName: null,
                usrOrganizationId: null,
                bizType: null,
                bizTypeName: null,
                operationUserName: null,
                deliveryWarehouseName: null,
                realDeliveryWarehouseName: null,
                contractDeliveredStartDateStart: null,
                contractDeliveredStartDateEnd: null,
                contractDeliveredEndDateStart: null,
                contractDeliveredEndDateEnd: null,
                ourCompanyName: null
            },
            tabs: [
                {
                    id: '',
                    value: '上游采购合同',
                    data: null
                },
                {
                    id: 1,
                    value: '下游销售合同',
                    data: null
                }
            ],
            activeId: 0,
            deliveryNamesData: [], // 交割库and实际交割库
            organizationDate: [] // 业务组
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            // 交割库
            // this.basePost(this.$api.statement.deliveryNames, {}, this.deliveryNamesData);
            this.$http.post(this.$api.statement.deliveryNames, {})
                .then((res) => {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        data.forEach(e => {
                            e['value'] = e.deliveryWarehouseName;
                        });
                        this.deliveryNamesData = data;
                    }
                });
            // 业务组
            this.$http.get(this.$api.statement.organization)
                .then((res) => {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        data.forEach(e => {
                            e['label'] = e.name;
                            e['value'] = e.id;
                        });
                        this.organizationDate = data;
                    }
                });
        },
        ShowSearch () {
            this.isShowSearch = !this.isShowSearch;
        },
        tabClick (i) {
            this.activeId = i;
            console.log(this.activeId);
        },
        excel () {
            this.activeId === 0 ? this.$refs.upstream.excel(this.search) : this.$refs.downstream.excel(this.search);
        },
        submit () {
            this.activeId === 0 ? this.$refs.upstream.init(this.search) : this.$refs.downstream.init(this.search);
        }
    }
};
</script>
<style lang="scss" scoped>
  .standingBook .gy-form-group {
    padding: 6px 30px 6px 138px;
  }
  // .last-active {
  //   width: 48% !important;
  // }
</style>
<style lang="scss">

</style>
