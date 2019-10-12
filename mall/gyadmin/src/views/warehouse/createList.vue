<template>
  <div class="page createList">
    <div class="m-panel">
      <div class="selected">
        <div class="gy-h4">仓储公司详细信息</div>
        <div class="fr">
          <div class="search-box">
            <input type="search" v-model="searchName" placeholder="请输入企业名称">
            <button @click="getList"><i class="iconfont icon-search"></i></button>
          </div>
          <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i
            class="iconfont icon-arrow-down"></i></span>
        </div>
      </div>
      <div v-show="toggleSelect" class="gy-form-box-14 other">
        <div class="gy-form-group">
          <span class="l">仓储类型</span>
          <el-select v-model="warehouseType" placeholder="请选择">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group">
          <span class="l">企业性质</span>
          <el-select v-model="companyNatureIds" multiple placeholder="请选择">
            <el-option
              v-for="item in companyNatureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group">
          <span class="l">区域</span>
          <el-select v-model="areaCategoryId" placeholder="请选择">
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group">
          <span class="l">地址</span>
          <input v-model="address" placeholder="请输入" class="gy-input">
        </div>
        <div class="gy-form-group">
          <span class="l">联系人</span>
          <input v-model="contactPerson" placeholder="请输入" class="gy-input">
        </div>
        <div class="gy-form-group">
          <span class="l">联系手机号</span>
          <input v-model="contactMobile" placeholder="请输入" class="gy-input">
        </div>
        <div class="gy-form-group">
          <span class="l">状态</span>
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statussOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group">
          <span class="l">尽调负责人</span>
          <input v-model="surveyPrincipal" placeholder="请输入" class="gy-input">
        </div>
        <div class="gy-form-group">
          <span class="l">录入人</span>
          <input v-model="createdPerson" placeholder="请输入" class="gy-input">
        </div>
        <div class="gy-form-group">
          <span class="l">更新人</span>
          <input v-model="updatedPerson" placeholder="请输入" class="gy-input">
            <i class="iconfont icon-search i-search" @click="getList()"></i>
        </div>
      </div>
      <div class="btns-wrapper">
        <button class="gy-button-extra" v-if="isAuth('member:warehouseCompanyDetail:add')" @click="add">添加</button>
        <button class="gy-button-normal" @click="detail">查看</button>
        <button class="gy-button-normal" v-if="isAuth('member:warehouseCompanyDetail:edit')" @click="editAll">编辑
        </button>
        <button class="gy-button-normal" v-if="isAuth('member:warehouseCompanyDetail:approval')" @click="verifyAll">审核
        </button>
        <button class="gy-button-normal" v-if="isAuth('member:warehouseCompanyDetail:change')" @click="change">变更
        </button>
      </div>
      <table class="gy-table">
        <thead>
        <tr>
          <th style="text-align: center">#</th>
          <th style="width:250px">企业名称</th>
          <th>区域</th>
          <th style="width:204px">地址</th>
          <th>企业性质</th>
          <th>联系人</th>
          <th>联系电话</th>
          <th>仓储类型</th>
          <th>尽调负责人</th>
          <th>录入人</th>
          <th>更新人</th>
          <th>录入时间</th>
          <th>更新时间</th>
          <th>状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>
            <label class="u-checkbox">
              <input type="checkbox" v-model="checkModel" :value="item">
              <span></span>
            </label>
            {{item.id}}
          </td>
          <td>{{item.name}}</td>
          <td>{{areaCategoryOptions[item.areaCategoryId]}}</td>
          <td>
            {{item.address}}
          </td>
          <td>
            <span v-for="(items,ind) in item.companyNatureIds" :key="ind">
                {{companyNatureIdOptions[items]}}
            </span>
          </td>
          <td>
            {{item.contactPerson}}
          </td>
          <td>{{item.contactMobile}}</td>
          <td>{{warehouseTypeOptions[item.warehouseType]}}</td>
          <td>
            {{item.surveyPrincipal}}
          </td>
          <td>{{item.createdPerson}}</td>
          <td>{{item.updatedPerson}}</td>
          <td>{{item.createdDate|date}}</td>
          <td>{{item.updatedDate|date}}</td>
          <td>{{statusOptions[item.status]}}</td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper">
        <div class="pagination-total">共 {{total}} 条</div>
        <!-- 翻页 -->
        <el-pagination
          background
          :page-size="pageSize"
          :total="total"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          style="margin-top: 40px;"
          @current-change="turnPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            checkModels: '',
            statussOptions: [{
                value: null,
                label: '全部'
            }, {
                value: 0,
                label: '未审核'
            }, {
                value: 2,
                label: '已审核'
            }],
            warehouseOptions: [{
                value: null,
                label: '全部'
            }, {
                value: 1,
                label: '固体仓储'
            }, {
                value: 2,
                label: '液体仓储'
            }],
            companyNatureOptions: [{ // 企业性质
                value: 1,
                label: '国企'
            }, {
                value: 2,
                label: '央企'
            }, {
                value: 3,
                label: '上市'
            }, {
                value: 4,
                label: '民营'
            }, {
                value: 5,
                label: '外资'
            }, {
                value: 6,
                label: '合资'
            }],
            areaOptions: [{ // 区域分类
                value: 0,
                label: '全部'
            }, {
                value: 1,
                label: '东北'
            }, {
                value: 2,
                label: '华北'
            }, {
                value: 3,
                label: '华东'
            }, {
                value: 4,
                label: '华南'
            }, {
                value: 5,
                label: '华中'
            }, {
                value: 6,
                label: '西南'
            }],
            pageSize: 10,
            pageCount: 1,
            total: 0,
            currentPage: 1,
            name: null,
            list: [],
            address: null,
            toggleSelect: false,
            checkedAll: false,
            checkModel: [],
            areaCategoryId: null,
            companyNatureIds: [],
            contactPerson: null,
            contactMobile: null,
            status: null,
            createdPerson: null,
            updatedPerson: null,
            surveyPrincipal: null,
            username: '',
            searchName: null,
            searchUserName: '',
            searchValid: null,
            valid: null,
            warehouseType: null,
            companyTypeName: '',
            companyTypeList: [],
            companyType: '',
            statusOptions: ['未审核', '', '已审核'],
            areaCategoryOptions: ['', '东北', '华北', '华东', '华南', '华中', '西南'],
            companyNatureIdOptions: ['', '国企 ', '央企', '上市', '民营', '外资', '合资'],
            warehouseTypeOptions: ['', '固体仓储', '液体仓储']
        };
    },
    watch: {
        checkModel: {
            handler () {
                this.checkedAll = this.checkModel.length === this.list.length;
            },
            deep: true
        }
    },
    methods: {
        getCompanyType () {
            this.$http.get(this.$api.memberCompany.companyType)
                .then((res) => {
                    this.companyTypeList = res.data.data;
                });
        },
        add () { // 添加
            this.$router.push({name: 'warehouseAdd'});
        },
        change () { // 变更
            if (this.checkModel.length < 1) {
                this.$message.error('请先选择一项进行变更！');
                return false;
            }
            if (this.checkModel.length > 1) {
                this.$message.error('不能多选且只能选择一个变更项！');
            } else if (this.checkModel[0].status !== 2) {
                this.$message.error('您选择的未经过经审还不能变更！');
            } else {
                this.$router.push({name: 'warehouseAdd', query: {id: this.checkModel[0].id, typeId: 1}});
            }
        },
        detail () {
            if (this.checkModel.length < 1) {
                this.$message.error('请先选择一项进行查看！');
                return false;
            }
            if (this.checkModel.length > 1) {
                this.$message.error('不能多选，只能选择一项查看！');
            } else {
                this.$router.push({name: 'warehouseDetail', query: {id: this.checkModel[0].id}});
            }
        },
        editAll () {
            if (this.checkModel.length < 1) {
                this.$message.error('请先选择一项进行编辑！');
                return false;
            }
            if (this.checkModel.length > 1) {
                this.$message.error('不能多选且只能选择一个编辑项！');
            } else if (this.checkModel[0].status === 2) {
                this.$message.error('您选择的已经审核过了不能编辑！');
            } else {
                this.$router.push({name: 'warehouseAdd', query: {id: this.checkModel[0].id}});
            }
        },
        verifyAll () {
            if (this.checkModel.length < 1) {
                this.$message.error('请先选择一个审核项！');
                return false;
            }
            if (this.checkModel.length > 1) {
                this.$message.error('只能选择一个审核项！');
            } else if (this.checkModel[0].status === 2) {
                this.$message.error('您选择的已经审核过了');
            } else {
                this.$http.get(this.$api.warehouse.pass + this.checkModel[0].id + '/pass').then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.getList();
                    } else {
                        this.$message.error('统一信用资质证不存在');
                    }
                });
            }
        },
        getList () {
            let setPara = {
                'pageNum': this.currentPage,
                'pageSize': this.pageSize,
                data: {
                    'name': this.searchName,
                    'address': this.address,
                    'areaCategoryId': this.areaCategoryId,
                    'contactPerson': this.contactPerson,
                    'contactMobile': this.contactMobile,
                    'status': this.status,
                    'createdPerson': this.createdPerson,
                    'updatedPerson': this.updatedPerson,
                    'surveyPrincipal': this.surveyPrincipal,
                    'companyNatureIds': this.companyNatureIds,
                    'warehouseType': this.warehouseType
                }
            };
            // if (!this.isAuth('member:company:list')) return;
            this.$http.post(this.$api.warehouse.createList, setPara).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    // 设置分页信息
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.pageNum;
                    // 设置check
                    this.cancelCheck();
                }
            }).catch((e) => {
            });
        },
        turnPage (currentPage) {
            this.getList(currentPage);
        },
        cancelCheck () {
            this.checkedAll = false;
            this.checkModel = [];
        },
        changeState () {
            this.checkedAll = !this.checkedAll;
            this.checkModel = [];
            if (this.checkedAll) {
                this.list.forEach((obj) => {
                    this.checkModel.push(obj);
                });
            }
        }
    },
    created () {
        this.getList(1);
        this.getCompanyType();
    }
};
</script>
<style scoped lang="scss">
  .btns-wrapper {
    padding: 10px 0;
     text-align: right;
     button {
        margin-left: 8px;
     }
  }
  .gy-table {
     min-width: 1610px;
      td{
          line-height: 1.5;
      }
  }
  .el-row {
    color: #000000;
  }

  .eye-catching {
    height: 20px;
    text-align: center;
    span {
      color: #e59640;
    }
  }

  .selected {
    overflow: hidden;
    padding-bottom: 10px;
  }

  .selected-box {
    padding-top: 20px;
    .el-date-editor .el-range-separator {
      width: 25px;
    }
  }

  .search-btn {
    margin-right: 10px;
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

  .pr {
    position: relative;
    width: 95%;
    overflow: hidden;
  }

  .i-search {
    position: absolute;
    right: 0;
    bottom: 17px;
  }

  td {
    word-break: break-all;
  }

  .gy-form-group {
    padding-left: 80px;
    .l {
      width: 70px;
    }
  }

  .gy-form-group:nth-child(odd) {
    padding-right: 30px;
  }

  .gy-form-group:nth-child(even) {
    padding-left: 110px;
    .l {
      width: 100px;
      padding-left: 30px;
    }
  }
  .gy-form-box-14{
    padding:4px 0 12px 14px;
  }
</style>
<style lang="scss">
  .createList{
    .el-input__inner{
      height: 30px!important;
    }
  }
</style>
