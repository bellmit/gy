<template>
    <div class="lic AD">
        <!-- crumbs -->
        <!-- <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>推广</el-breadcrumb-item>
                <el-breadcrumb-item>广告管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
            <!-- h1 -->
            <div class="gy-h3">广告管理</div>
            <!-- 模糊搜索 -->
            <div class="gy-form my-form">
              <div class="query clearfix">
                <div class="more fr cursor" @click="advancedSearch=!advancedSearch">
                  <span>高级搜索</span>
                  <i slot="suffix" class="el-icon-arrow-down"></i>
                </div>
                <div class="iptbox fr">
                  <input class="ipt" v-model="search.title" type="text" placeholder="请输入标题"/>
                  <span class="search" @click="dimSearch">搜索</span>
                </div>
              </div>
            </div>
            <!--高级搜索内容-->
            <div v-if="advancedSearch" class="advancedSearch clearfix">
              <div class="gy-form-group">
                <span class="l">广告分类</span>
                <el-select v-model="search.position">
                  <el-option
                    v-for="item in positionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l">广告状态</span>
                <label><input type="radio" v-model="searchState" name="payway" value="A">全部</label>
                <label><input type="radio" v-model="searchState" name="payway" value="1">有效</label>
                <label><input type="radio" v-model="searchState" name="payway" value="0">无效</label>
              </div>
              <div class="gy-form-group search cl">
                <span class="l">说明</span>
                <i class="iconfont icon-search" @click="classSearch"></i>
                <input class="gy-input" v-model="search.description">
              </div>
            </div>
            <!-- 事件区域 -->
            <div class="gy-form-button">
              <button class="gy-button-normal" @click="add">新增</button>
              <button class="gy-button-normal" :disabled="isDisabled" @click="edit(tabRowItem)" :class="{disabledColor: isDisabled}">编辑</button>
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
                <el-table-column prop="position" label="广告分类" width="300px">
                   <template slot-scope="scope">
                    <span>{{ scope.row.position | positionADType }}</span>
                  </template>
                </el-table-column>
                <!--  -->
                <el-table-column prop="title" label="广告标题"></el-table-column>
                <!--  -->
                <el-table-column label="广告链接" prop="linkUrl" width="300"></el-table-column>
                <!--  -->
                <el-table-column prop="display" label="广告排序"></el-table-column>
                <!--  -->
                <el-table-column label="广告状态">
                  <template slot-scope="scope">
                    <span>{{ scope.row.state | imgStatus}}</span>
                  </template>
                </el-table-column>
                <!--  -->
                <el-table-column prop="description" label="说明"></el-table-column>
                <!--  -->
              </el-table>
            </div>
            <!-- dialog -->
            <el-dialog title="新增广告" :visible.sync="isDialog" :close-on-click-modal="false">
              <form>
                <div class="gy-form clearfix">
                  <!--  -->
                  <div class="gy-form-group">
                    <span class="l">广告分类</span>
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
                  <div class="gy-form-group">
                    <span class="l">轮播排序</span>
                    <input class="gy-input" v-model="form.display" placeholder="请输入数字作为显示顺序">
                  </div>
                  <!--  -->
                  <div class="gy-form-group">
                    <span class="l">广告标题</span>
                    <input class="gy-input" v-model="form.title" placeholder="请输入标题">
                  </div>
                  <!--  -->
                  <div class="gy-form-group">
                    <span class="l">状态</span>
                    <label><input type="radio" v-model="form.state" value="1">有效</label>
                    <label><input type="radio" v-model="form.state" value="0">无效</label>
                  </div>
                  <!--  -->
                  <div class="gy-form-group cl">
                    <span class="l">广告链接目标</span>
                    <input class="gy-input" v-model="form.linkUrl" placeholder="请输入链接地址">
                  </div>
                  <!--  -->
                  <div class="gy-form-group">
                    <span class="l">说明</span>
                    <input class="gy-input" v-model="form.description">
                  </div>
                  <!--  -->
                  <div class="gy-form-group single-row">
                    <span class="l">图片</span>
                    <el-upload
                      ref="upload"
                      action="api"
                      class="my-upload anewH"
                      drag
                      :limit="1"
                      list-type="picture-card"
                      :http-request="uploadImg"
                      :file-list="form.fileImgList">
                      <div class="uoloadInfo">
                        <div class="uploadBtn">点击选择图片</div>
                        <span class="uploadTips">或将文件拖到这里</span>
                      </div>
                    </el-upload>
                  </div>
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
                    @current-change="sizeChange"
                    :current-page.sync="search.pageNo"
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
            advancedSearch: false,
            searchState: 'A',
            // 高级搜索
            search: {
                pageNo: 1,
                pageSize: 10,
                state: '', // 广告状态
                position: null, // 广告分类
                description: null, // 说明
                title: null, // 模糊搜索内容
                total: null // 总条数
            },
            // tab当前行
            tabRowItem: {},
            table: [],
            // 编辑按钮的状态
            isDisabled: false,
            // 删除列表
            deleInfo: {
                list: [],
                userId: null
            },
            params: {},
            isDialog: false,
            btnType: '',
            form: {
                position: null,
                display: null,
                title: null,
                state: 1,
                linkUrl: null,
                description: null,
                imageUrl: null
            },
            // 广告分类
            positionList: [
                {
                    value: 0,
                    label: '-'
                }, {
                    value: 1,
                    label: '平台首页环腰广告'
                }, {
                    value: 2,
                    label: '商城首页推荐位广告'
                }, {
                    value: 3,
                    label: '积分商城广告'
                }
            ]
        };
    },
    mounted () {
        // 初始化页面数据
        this.get(this.$api.market.ADList, this.search);
    },
    methods: {
        // 改变页码
        sizeChange (val) {
            this.search.pageNo = val;
            this.get(this.$api.market.ADList, this.search);
        },
        // 模糊搜索
        dimSearch () {
            this.get(this.$api.market.ADList, this.search);
        },
        // 高级搜索
        classSearch () {
            this.get(this.$api.market.ADList, this.search);
        },
        // 上传广告图
        uploadImg (file) {
            const me = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            formData.append('fileName', file.file.name);
            me.$http.post(me.$api.market.ADImguploade, formData, headers)
                .then(function (res) {
                    // 上传成功之后 返回的服务器地址
                    if (res.data.code === 0) {
                        me.form.imageUrl = res.data.data;
                    }
                });
        },
        // 公用获取数据
        get (url, params) {
            const me = this;
            if (me.searchState === 'A') {
                params.state = null;
            } else {
                params.state = Number(me.searchState);
            }
            me.$http.post(url, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        let resData = res.data.data.advertisingManagements;
                        me.search.total = res.data.data.total;
                        me.table = resData;
                        if (res.data.total !== 0) {
                            let list = res.data.data.advertisingManagements;
                            list.forEach(item => {
                                item['fileImgList'] = [];
                                item.fileImgList.push({
                                    url: item.imageUrl
                                });
                            });
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 公用提交请求
        post (url, params) {
            const me = this;
            me.$http.post(url, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        if (me.btnType === 'add' || me.btnType === 'edit') {
                            me.isDialog = false;
                        }
                        me.get(me.$api.market.ADList, me.search);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 新增
        add () {
            this.clear();
            this.btnType = 'add';
            this.isDialog = true;
        },
        // 编辑
        edit (row) {
            this.form = row;
            this.btnType = 'edit';
            this.isDialog = true;
        },
        // 删除
        dele () {
            if (this.deleInfo.list.length !== 0) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.post(this.$api.market.ADDelete, this.deleInfo);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        // 提交
        submit () {
            if (!this.check()) return false;
            if (this.btnType === 'add') {
                this.post(this.$api.market.ADSave, this.form);
            } else {
                this.post(this.$api.market.ADEdit, this.form);
            }
            this.$refs.upload.clearFiles();
        },
        // 勾选单行
        selectTab (v) {
            this.deleInfo.list = v;
            if (v.length !== 0) {
                this.tabRowItem = v[v.length - 1];
            }
            v.length > 1 ? this.isDisabled = true : this.isDisabled = false;
        },
        // 勾选全选
        selectTabAll (v) {
            this.deleInfo.list = v;
            v.length > 1 ? this.isDisabled = true : this.isDisabled = false;
        },
        // 表单校验
        check () {
            console.log(this.form);
            if (this.form.position === null) {
                this.$message.error('广告分类不能为空');
                return false;
            }
            if (this.form.title === null) {
                this.$message.error('广告标题不能为空');
                return false;
            }
            if (this.form.linkUrl === null) {
                this.$message.error('广告链接目标不能为空');
                return false;
            }
            if (this.form.imageUrl === null) {
                this.$message.error('请上传图片');
                return false;
            }
            // if (this.form.display === null) {
            //     this.$message.error('轮播排序不能为空');
            //     return false;
            // }
            if (this.form.display !== null && this.form.display !== '' && !/^\d+$/.test(this.form.display)) {
                this.$message.error('轮播排序只能为0或正整数');
                return false;
            }
            if (this.form.state === null) {
                this.$message.error('状态不能为空');
                return false;
            }
            return true;
        },
        // 清空表单
        clear () {
            let resetForm = {
                position: null,
                display: null,
                title: null,
                state: 1,
                linkUrl: null,
                description: null,
                imageUrl: null
            };
            this.form = Object.assign({}, resetForm);
            // this.$refs.upload.clearFiles();
        }
    }
};
</script>
<style lang="scss">
  .lic {
      .my-upload .el-upload {
          line-height: 30px!important;
          height: 104px!important;
      }
    .el-upload-list--picture-card .el-upload-list__item {
        width: 104px;
        height: 104px;
    }
    .my-upload {
      width: 100%;
      .el-upload {
        width: 30%;
        position: relative;
        .el-upload-dragger {
          width: 100%;
          height: 104px!important;
          border: 1px solid $color-border;
          border-radius: 0px;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
    .AD {
        .container {
            padding: 26px 36px;
            .uoloadInfo {
              border: 2px dashed $color-border;
              width: 90%;
              height: 80px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              text-align: center;
              padding-top: 15px;
              .uploadBtn {
                width: 129px;
                height: 25px;
                coursor: pointer;
                margin: 0 auto;
                line-height: 25px;
                color: $color-white;
                text-align: center;
                background-color: $color-extra;
              }
            }
            .anewH {
              height: 104px;
              display: inline-block;
            }
            .search{
              i{
                position: absolute;
                right: 0;
                bottom: 15px;
                font-weight: bold;
                color: $color-black;
                line-height: 1;
              }
            }
            .gy-form-group {
              padding: 10px 20px 10px 90px;
              .l {
                width: 100px;
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
                  width: 230px;
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
              }
            }
            .advancedSearch {
              width: 80%;
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
    }
    .clearfix:after {
      content:"";
      display: block;
      clear:both;
    }
</style>
