<template>
  <div class="recommend">
    <!-- crumbs -->
    <!-- <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>推广</el-breadcrumb-item>
            <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div> -->
    <div class="container">
      <!-- h1 -->
      <div class="gy-h4">推荐管理</div>
      <!-- 模糊搜索 -->
      <div class="gy-form my-form" style="padding:0;">
        <div class="query clearfix">
          <div class="more fr cursor" @click="advancedSearch=!advancedSearch">
            <span>高级搜索</span>
            <i slot="suffix" class="el-icon-arrow-down"></i>
          </div>
          <div class="iptbox fr">
            <input class="ipt" v-model="search.queryCriteria" type="text" placeholder="请输入标题"/>
            <i class="iconfont icon-search" @click="dimSearch"></i>
          </div>
        </div>
      </div>
      <!--高级搜索内容-->
      <div v-if="advancedSearch" class="advancedSearch clearfix">
        <div class="gy-form-group">
          <span class="l">推荐项目</span>
          <el-select v-model="search.item" @change="checkByType">
            <el-option
              v-for="item in itemList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group">
          <span class="l">推荐状态</span>
          <label><input type="radio" v-model="searchStatus" name="payway" value="A">全部</label>
          <label><input type="radio" v-model="searchStatus" name="payway" value="1">有效</label>
          <label><input type="radio" v-model="searchStatus" name="payway" value="0">无效</label>
        </div>
        <div class="gy-form-group cl">
          <span class="l">推荐分类</span>
          <el-select v-model="search.position">
            <el-option
              v-for="item in positionList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group search">
          <span class="l">说明</span>
          <i class="iconfont icon-search" @click="classSearch"></i>
          <input class="gy-input" v-model="search.desc">
        </div>
      </div>
      <!-- 事件区域 -->
      <div class="btnGroup">
        <button class="gy-button-extra" @click="add">新增</button>
        <button class="gy-button-normal" :disabled="isDisabled" @click="edit" :class="{disabledColor: isDisabled}">编辑
        </button>
        <button class="gy-button-normal" @click="dele">删除</button>
      </div>
      <!--table-->
      <div class="my-table">
        <el-table
          class="gy-table"
          :data="table"
          stripe
          @select="selectTab"
          @select-all="selectTabAll"
          style="width: 100%">
          <!--  -->
          <el-table-column prop="id" type="selection" width="80px"></el-table-column>
          <!--  -->
          <el-table-column prop="position" label="推荐分类" width="300px">
            <template slot-scope="scope">
              <span>{{ scope.row.position | postionType}}</span>
            </template>
          </el-table-column>
          <!--  -->
          <el-table-column prop="title" label="推荐标题"></el-table-column>
          <!--  -->
          <el-table-column label="推荐项目" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.item | itemType}}</span>
            </template>
          </el-table-column>
          <!--  -->
          <el-table-column label="推荐项目内容" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.targetName}}</span>
            </template>
          </el-table-column>
          <!--  -->
          <el-table-column prop="displayOrder" label="推荐排序"></el-table-column>
          <!--  -->
          <el-table-column label="推荐状态">
            <template slot-scope="scope">
              <span>{{ scope.row.status | imgStatus}}</span>
            </template>
          </el-table-column>
          <!--  -->
          <el-table-column prop="desc" label="说明"></el-table-column>
          <!--  -->
        </el-table>
      </div>
      <!-- dialog -->
      <el-dialog :title="titleName" :visible.sync="isDialog" :close-on-click-modal="false" @close="close()">
        <!--推荐内容dialog-->
        <el-dialog title="选择商品" width="80%" :visible.sync="isDialog1" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
          <div class="dialogSearch clearfix">
            <div class="gy-form-group">
              <span class="l">品名</span>
              <input class="gy-input" v-model="search2.skuName">
            </div>
            <div class="gy-form-group">
              <span class="l">资源单号</span>
              <input class="gy-input" v-model="search2.offerSn">
            </div>
            <div class="gy-form-group cl">
              <span class="l">发布公司</span>
              <input class="gy-input"  v-model="search2.companyName">
            </div>
            <div class="gy-form-group search">
              <span class="l">交割库</span>
              <i class="iconfont icon-search" @click="getOfferList"></i>
              <input class="gy-input"  v-model="search2.warehouseName">
            </div>
          </div>
          <div class="recommend-eltable">
            <table class="gy-table">
              <thead class="tab-head">
              <tr>
                <th><div class="tab-td1">#</div></th>
                <th><div class="tab-td2">品名</div></th>
                <th><div class="tab-td3">数量</div></th>
                <th><div class="tab-td4">起订量</div></th>
                <th><div class="tab-td5">价格</div></th>
                <th><div class="tab-td6">交割期</div></th>
                <th><div class="tab-td7">有效时间</div></th>
                <th><div class="tab-td8">交割库</div></th>
                <th><div class="tab-td9">发布公司</div></th>
              </tr>
              </thead>
              <tbody class="tab-body">
              <tr v-for="(item, index) in gridCommodity" :key="index" class="tab-tbRow" @click="checkDialog(item)">
                <td>
                  <div class="tab-td1">{{item.id}}</div>
                </td>
                <td>
                  <div class="tab-td2">{{item.skuName}}</div>
                </td>
                <td>
                  <div class="tab-td3">{{item.skuQuantity}}</div>
                </td>
                <td>
                  <div class="tab-td4">{{item.skuMinQuantity}}</div>
                </td>
                <td>
                  <div class="tab-td5"><span v-if="item.skuPriceFlag ==2">面议</span>
                    <span v-else>{{item.skuPrice}}{{item.skuPriceFlag == 1 ? "(可议价)" : ''}}</span>
                  </div>
                </td>
                <td class="tab-td6" v-if="item.deliveryDateFlag === 3">{{item.deliveryDateText}}</td>
                <td class="tab-td6" v-else-if="item.deliveryDateFlag === 2" >{{item.deliveryBeginDate|date}}以前</td>
                <td class="tab-td6" v-else>{{item.deliveryBeginDate|date}}到{{item.deliveryEndDate|date}}</td>
                <!-- <td>
                  <div class="tab-td6">{{item.deliveryBeginDate}}</div>
                </td> -->
                <td>
                  <div class="tab-td7">{{item.expireDate | date('h')}}</div>
                </td>
                <td>
                  <div class="tab-td8">{{item.deliveryWarehouseName}}</div>
                </td>
                <td>
                  <div class="tab-td9">{{item.sellerCompanyName}}</div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-pagination
              background
              @current-change="changeSelectcommodity"
              :current-page.sync="search2.pageNum"
              :page-size="search2.pageSize"
              layout="prev, pager, next"
              :total="search2.total">
            </el-pagination>
          </div>
        </el-dialog>
        <!--推荐内容dialog-->
        <el-dialog title="选择公司" :visible.sync="isDialog2" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
          <div class="dialogSearch clearfix">
            <div class="gy-form-group gy-form-group1 search">
              <span class="l">公司名称</span>
              <i class="iconfont icon-search" @click="getCompanyList"></i>
              <input class="gy-input" v-model="search1.companyName">
            </div>
          </div>
          <div class="recommend-eltable1">
            <table class="gy-table">
              <thead class="tab-head">
              <tr>
                <th><div class="tab-td9">#</div></th>
                <th><div class="tab-td10">名称</div></th>
                <th><div class="tab-td11">描述</div></th>
              </tr>
              </thead>
              <tbody class="tab-body">
              <tr v-for="(item, index) in gridData" :key="index" class="tab-tbRow" @click="checkDialog(item)">
                <td>
                  <div class="tab-td9">{{item.id}}</div>
                </td>
                <td>
                  <div class="tab-td10">{{item.name}}</div>
                </td>
                <td>
                  <div class="tab-td11">{{item.profile}}</div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-pagination
              background
              :current-page.sync="search1.pageNum"
              :page-size="search1.pageSize"
              layout="prev, pager, next"
              :total="search1.total"
              @current-change="changeSelectshop">
            </el-pagination>
          </div>
        </el-dialog>
        <form>
          <div class="gy-form clearfix">
            <input type="hidden" v-model="form.id"/>
            <!--  -->
            <div class="gy-form-group">
              <span class="l">推荐项目</span>
              <el-select v-model="form.item" @change="checkitemList">
                <el-option
                  v-for="item in itemList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--  -->
            <div class="gy-form-group">
              <span class="l">推荐标题</span>
              <input class="gy-input" v-model="form.title" placeholder="请输入标题">
            </div>
            <!--  -->
            <div class="gy-form-group">
              <span class="l">推荐排序</span>
              <input class="gy-input" v-model="form.displayOrder" placeholder="请输入数字作为显示顺序">
            </div>
            <!--  -->
            <div class="gy-form-group">
              <span class="l">推荐状态</span>
              <label><input type="radio" v-model="form.status" value="1">有效</label>
              <label><input type="radio" v-model="form.status" value="0">无效</label>
            </div>
            <!--  -->
            <div class="gy-form-group cl">
              <span class="l">推荐分类</span>
              <el-select v-model="form.position">
                <el-option
                  v-for="item in positionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--  -->
            <div class="gy-form-group my-form-group">
              <span v-if="form.item === 4" class="l">资讯链接</span>
              <span v-else class="l">推荐项目内容</span>
              <!-- 4 资讯 -->
              <input v-if="form.item === 4" class="gy-input" type="text" v-model="form.itemInfo2" placeholder="请输入链接">
              <!-- 2 店铺 -->
              <div v-if="form.item === 2" class="gy-input" @click="openCompanyListDlg">{{form.itemInfo}}</div>
              <!-- 1 商品 -->
              <div v-if="form.item === 1" class="gy-input" @click="openOfferListDlg">{{form.itemInfo2}}</div>
            </div>
            <!--  -->
            <div class="gy-form-group">
              <span class="l">说明</span>
              <input class="gy-input" v-model="form.desc">
            </div>
            <!--  -->
          </div>
        </form>
        <div class="gy-form-button">
          <button class="gy-button-extra" @click="submit">保存</button>
          <button class="gy-button-normal" @click="isDialog = false">取消</button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          background
          @current-change="changeSelect"
          :current-page.sync="search.pageNum"
          :page-size="search.pageSize"
          layout="prev, pager, next"
          :total="search.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            editType: 0, // 1:新增 2:修改
            titleName: '',
            advancedSearch: false,
            searchStatus: 'A',
            itemInfoId: null,
            // 高级搜索
            search: {
                pageNum: 1,
                pageSize: 10,
                item: null, // 推荐项目
                status: '', // 推荐状态
                position: null, // 推荐分类
                desc: null, // 说明
                queryCriteria: null, // 模糊搜索内容
                total: null // 总条数
            },
            // 公司分页(店铺)
            search1: {
                pageNum: 1,
                pageSize: 10,
                companyName: '',
                total: null // 总条数
            },
            // 商品分页
            search2: {
                pageNum: 1,
                pageSize: 10,
                skuName: '',
                offerSn: '',
                companyName: '',
                warehouseName: '',
                total: null // 总条数
            },
            table: [],
            // 编辑按钮的状态
            isDisabled: false,
            // 当前选中table item
            tabRowItem: {},
            // 删除列表
            ids: [],
            isDialog: false,
            isDialog1: false,
            isDialog2: false,
            form: {
                id: null,
                position: null,
                title: null,
                displayOrder: null,
                status: 1,
                item: null,
                itemInfo: null,
                itemInfo2: null,
                targetId: null,
                desc: null
            },
            // 推荐分类
            positionList: this.$constant.positionList,
            // 推荐项目
            itemList: this.$constant.itemList,
            // 推荐项目内容
            itemInfoList: [],
            gridData: [], // 店铺
            gridCommodity: [], // 资源单
            isinformation: 3
            // expireDate 过期时间
        };
    },
    created () {
        // 初始化页面数据
        this.get(this.$api.market.recommendList, this.search);
        const me = this;
        me.$http.post(me.$api.memberCompany.list, {pageSize: 500})
            .then(function (res) {
                if (res.data.code === 0) {
                    me.itemInfoList = res.data.data.list;
                    me.itemInfoList.forEach(item => {
                        item['value'] = item.name;
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        checkByType (itemVal) {
            // 选择推荐项目时，过滤推荐分类
        },
        checkitemList (v) {
            switch (v) {
            case 0:
                this.positionList = this.$constant.positionList;
                break;
            case 1:
                this.positionList = this.$constant.positionListCommodity;
                break;
            case 2:
                this.positionList = this.$constant.positionListData;
                break;
            case 4:
                this.positionList = this.$constant.positionListInfo;
                break;
            default:
                this.positionList = this.$constant.positionList;
                break;
            }
            this.isinformation = v === 0 ? this.isinformation : v;
            this.form.itemInfo2 = null;
            this.form.position = null;
        },
        checkDialog (r) {
            if (this.form.item === 1) { // 商品
                this.form.itemInfo2 = r.id;
                this.form.targetId = r.id;
            } else { // 店铺
                this.form.itemInfo = r.id;
                this.itemInfoId = r.id;
                this.form.targetId = r.id;
            }
            this.isDialog1 = false;
            this.isDialog2 = false;
        },
        // 改变页码
        changeSelect (pageNo) {
            this.search.pageNum = pageNo;
            this.get(this.$api.market.recommendList, this.search);
        },
        // 商品改变页码
        changeSelectcommodity (pageNo) {
            this.search2.pageNum = pageNo;
            this.getOfferList();
        },
        // 店铺改变页码
        changeSelectshop (pageNo) {
            this.search1.pageNum = pageNo;
            this.getCompanyList();
        },
        // 模糊搜索
        dimSearch () {
            this.get(this.$api.market.recommendList, this.search);
        },
        // 高级搜索
        classSearch () {
            this.search.queryCriteria = null;
            this.get(this.$api.market.recommendList, this.search);
        },
        // 公用获取数据
        get (url, params) {
            const me = this;
            if (me.searchStatus === 'A') {
                params.status = null;
            } else {
                params.status = Number(me.searchStatus);
            }
            me.$http.post(url, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        let resData = res.data.data.recoList;
                        me.search.total = res.data.data.recoCount;
                        me.table = resData;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 公用提交请求
        post (url, params, type) {
            const me = this;
            if (type === 1) {
                me.$http.post(url, params)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            me.get(me.$api.market.recommendList, me.search);
                            me.isDialog = false;
                        } else {
                            me.$message.error(res.data.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            }
            if (type === 2) {
                me.$http.put(url, params)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            me.get(me.$api.market.recommendList, me.search);
                            me.isDialog = false;
                        } else {
                            me.$message.error(res.data.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            }
        },
        // 新增
        add () {
            this.clear();
            this.editType = 1;
            this.titleName = '新增推荐';
            this.isDialog = true;
        },
        // 编辑
        edit () {
            if (this.ids.length === 0) {
                this.$alert('请先选择后再编辑', '提示');
                return;
            } else if (this.ids.length > 1) {
                this.$alert('只能选择一项进行编辑', '提示');
                return;
            }
            this.editType = 2;
            const rData = this.ids[0];
            this.titleName = '编辑推荐';
            this.form.id = rData.id;
            this.form.position = rData.position;
            this.form.title = rData.title;
            this.form.displayOrder = rData.displayOrder;
            this.form.status = rData.status;
            this.form.item = rData.item;
            if (rData.item === 1) {
                this.form.itemInfo2 = rData.targetId;
            } else if (rData.item === 2) {
                this.form.itemInfo = rData.targetName;
            }
            this.form.targetId = rData.targetId;
            this.form.desc = rData.desc;
            this.isDialog = true;
        },
        // 删除
        dele () {
            if (this.ids.length === 0) {
                this.$alert('请先选择一项后再操作', '提示');
                return;
            }
            const me = this;
            this.$http.post(this.$api.market.recommendDelete, {list: this.ids})
                .then(function (res) {
                    if (res.data.code === 0) {
                        me.get(me.$api.market.recommendList, me.search);
                    }
                }).catch(function (error) {
                    this.$message.error(error);
                });
        },
        // 提交
        submit () {
            const me = this;

            // 要区分新增还是修改
            if (this.editType === 1) {
                if (this.form.item === 1) {
                    // 商品是2 input type = number
                    this.form.targetId = Number(this.form.itemInfo2);
                } else if (this.form.item === 2) {
                    // 店铺是2 获取到当前的商品的id
                    this.form.targetId = this.itemInfoId;
                }
            }
            console.log(me.form);
            me.form.displayOrder = Number(me.form.displayOrder);
            if (!this.check()) return false;
            this.post(this.$api.market.recommendSave, me.form, this.editType);
        },
        // 清空表单
        clear () {
            let resetForm = {
                position: null,
                title: null,
                displayOrder: null,
                status: 1,
                item: null,
                itemInfo: null,
                itemInfo2: null,
                desc: null
            };
            this.form = Object.assign({}, resetForm);
        },
        // 关闭
        close (form) {
        },
        // 勾选单行
        selectTab (v) {
        // 已勾选的信息数组
            this.ids = v;
            if (v.length !== 0) {
                // 获取当前行信息
                this.tabRowItem = v[v.length - 1];
            }
            v.length > 1 ? this.isDisabled = true : this.isDisabled = false;
        },
        // 勾选全选
        selectTabAll (v) {
            this.ids = v;
            console.log(this.ids);
            v.length > 1 ? this.isDisabled = true : this.isDisabled = false;
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        // 推荐项目内容为店铺时
        querySearch (queryString, cb) {
            let itemInfoList = this.itemInfoList;
            let results = queryString ? itemInfoList.filter(this.createFilter(queryString)) : itemInfoList;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        // current 推荐项目
        itemInfoSelect (item) {
            console.log(item.id);
            console.log(item.name);
            this.itemInfoId = item.id;
        },
        // 表单校验
        check () {
            if (this.form.position == null) {
                this.$message.error('推荐分类不能为空');
                return false;
            }
            if (this.form.title == null) {
                this.$message.error('推荐标题不能为空');
                return false;
            }
            if (this.form.displayOrder == null) {
                this.$message.error('推荐排序不能为空');
                return false;
            }
            if (this.form.status == null) {
                this.$message.error('推荐状态不能为空');
                return false;
            }
            if (this.form.item == null) {
                this.$message.error('推荐项目不能为空');
                return false;
            }
            if (this.form.targetId == null) {
                this.$message.error('推荐项目内容不能为空');
                return false;
            }
            return true;
        },
        // 获取商品（资源单）一览
        openOfferListDlg () {
            const me = this;
            me.isDialog1 = true;
            me.search2.skuName = '';
            me.search2.offerSn = '';
            me.search2.companyName = '';
            me.search2.warehouseName = '';

            me.getOfferList();
        },
        getOfferList () {
            const me = this;
            let params = {
                pageNum: me.search2.pageNum,
                pageSize: me.search2.pageSize,
                data: {
                    offerType: 1,
                    flag: 3, // 3 只查询已上架
                    keyword: me.search2.skuName,
                    offerSn: me.search2.offerSn,
                    sellerCompany: me.search2.companyName,
                    deliveryWarehouseName: me.search2.warehouseName
                }
            };

            me.$http.post(this.$api.offers.list, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        let resData = res.data.data;
                        me.gridCommodity = resData.list;
                        me.search2.total = resData.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 获取公司（店铺）一览
        openCompanyListDlg () {
            const me = this;
            me.isDialog2 = true;
            me.search1.companyName = '';

            me.getCompanyList();
        },
        // 获取公司（店铺）一览
        getCompanyList () {
            const me = this;
            let params = {
                pageNum: me.search1.pageNum,
                pageSize: me.search1.pageSize,
                name: me.search1.companyName
            };
            me.$http.post(me.$api.memberCompany.list, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        me.gridData = res.data.data.list;
                        me.search1.total = res.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
  .recommend {
    .container {
      .my-form-group {
        .inline-input {
          width: 100%;
        }
      }
      .search {
        i {
          position: absolute;
          right: 0;
          top: 7px;
          line-height: 1;
        }
      }
      .query {
        margin: 0 0 20px;
        .iptbox {
          border-bottom: 1px solid #E7ECF1;
          padding: 0 0 0 14px;
          width: 300px;
          .ipt {
            border: none;
            display: inline-block;
            width: 260px;
          }
          ipt::-webkit-input-placeholder { /* WebKit browsers */
            opacity: 0.5;
            font-size: 12px;
            color: #666666;
          }
          .search {
            display: inline-block;
            padding: 0 10px;
            cursor: pointer;
          }
        }
        .more {
          color: #979797;
          margin-left: 20px;
        }
        .cursor {
          cursor: pointer;
          color:#666;
          i{
            font-weight: bold;
          }
        }
      }
      .tips {
        color: $color-minor;
      }
      .my-table {
        margin-top: 10px;
      }
    }
    .disabledColor {
      background-color: $color-light;
    }
    .advancedSearch{
      padding: 0 0 12px 14px;
    }
    .btnGroup{
      text-align: right;
    }
    .gy-form-group{
      padding:0 30px 12px 80px;
    }
    .gy-form-group:nth-child(even) {
      padding-left: 105px;
      .l {
        width: 86px;
        padding-left: 30px;
      }
    }
  }

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }

  .el-table .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dialogSearch{
    width: 90%;
    .el-select {
      width: 100%;
    }
    i {
      position: absolute;
      right: 0;
      bottom: 15px;
      font-weight: bold;
      color: $color-black;
      line-height: 1;
    }
    .gy-form-group1 {
      width: 100%;
    }
  }

  .recommend-eltable {
    min-width: 500px;
    overflow: auto;
    tr:nth-child(even) td{
      background: $color-body-bg;
    }
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-td1 {
      width: 40px;
    }
    .tab-td2 {
      width: 120px;
    }
    .tab-td3 {
      width: 80px;
    }
    .tab-td4 {
      width: 80px;
    }
    .tab-td5 {
      width: 90px;
    }
    .tab-td6 {
      width: 200px;
    }
    .tab-td7 {
      width: 150px;
    }
    .tab-td8 {
      width: 100px;
    }
    .tab-td9 {
      width: 200px;
    }
  }
  .recommend-eltable1 {
    min-width: 300px;
    overflow: auto;
    tr:nth-child(even) td{
      background: $color-body-bg;
    }
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-td9 {
      width: 70px;
    }
    .tab-td10 {
      width: 200px;
    }
    .tab-td11 {
      width: 260px;
    }
  }
</style>
