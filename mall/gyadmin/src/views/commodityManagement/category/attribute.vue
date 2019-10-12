<template>
  <div class="attributenew">
    <div class="gy-h4">类目属性</div>
    <form action="javascript:;" name="categoryAdd" class="gy-form-box-14">
      <div class="top1">
        <el-row>
          <el-col :span="1"><span class="l">类目名称</span></el-col>
          <el-col :span="12">
            <span>{{info.categoryName}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="top2">
        <div class="box2" v-show="info.optionEntityList">
          <div>
            <el-row v-bind:key="index" v-for="(item,index) in info.optionEntityList" style="margin-bottom: 16px">
              <el-col :span="24">
                <div class="item">
                  <div class="q">属性</div>
                  <div class="w">{{item.optionName}}</div>
                  <div class="e">属性值</div>
                  <div class="r">{{item.optionDescription}}</div>
                  <div class="t">
                    <div>
                      <i @click="newdel(item.id)" class="iconfont icon-minus"></i>
                    </div>
                    <div>
                      <i @click="newadd" class="iconfont icon-add" v-show="index===info.optionEntityList.length-1"></i>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="top2" v-show="info.optionEntityList.length===0||!info.optionEntityList">
        <div class="box2">
          <div>
            <el-row style="margin-bottom: 20px">
              <el-col :span="24">
                <div class="item">
                  <div class="q">属性</div>
                  <div class="w"></div>
                  <div class="e">属性值</div>
                  <div class="r"></div>
                  <div class="t">
                    <div>
                      <i @click="newadd" class="iconfont icon-add"></i>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="form-group form-group-button">
        <button class="gy-button-extra" @click="addAttribute">确定</button>
      </div>
    </form>
    <!--新增的弹窗-->
    <el-dialog title="新增类目属性" :visible.sync="dialogFormVisible">
      <el-form>
        <div>
          <div class="search">
            <input type="text" placeholder="请输入" class="gy-input" v-model="cssearch">
            <span class="span1" @click="mysearch">搜索</span>
          </div>
          <div class="clear"></div>
          <div class="gy-table">
            <el-table
              :data="options.list"
              @row-click="selectBR"
              style="width: 100%">
              <el-table-column
                prop="optionName"
                label="属性">
              </el-table-column>
              <el-table-column
                prop="optionDescription"
                label="描述">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pagination-wrapper">
          <div class="pagination-total">共{{options.total}}条</div>
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="options.pageNum"
            :page-size="options.pageSize"
            :total="options.total"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-form>
      <!--<div slot="footer" class="dialog-footer">-->
      <!--<button class="gy-button-extra" @click="optionsClick">确 定</button>-->
      <!--</div>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
    data () {
        return {
            id: null,
            attributeList: '',
            info: {
                optionEntityList: []
            },
            options: [],
            categoryOptionEntityList: [],
            selectedOption: [],
            showAdd: false,
            dialogFormVisible: false,
            optionsID: '',
            isActiveId: false,
            optionEntityList: [],
            totalall: '',
            pageNum: 1,
            pageSize: 10,
            csdata: [],
            cssearch: ''
        };
    },
    created () {
        this.id = this.$route.query.id;
        // this.getInfo();
        this.getAttribute();
        this.getOption();
    },
    methods: {
        // 新增属性
        newadd () {
            this.dialogFormVisible = true;
            this.optionsID = '';
            this.csdata = {
                'pageNum': this.pageNum,
                'pageSize': 10,
                'data': {
                    'keywords': this.cssearch,
                    'valid': 1
                }
            };
            this.$http.post(this.$api.attribute.list, this.csdata).then((res) => {
                this.options = res.data.data;
            });
        },
        handleSizeChange (val) {
        },
        handleCurrentChange (val) {
            this.pageNum = val;
            this.newadd();
        },
        mysearch () {
            this.newadd();
        },
        selectBR (value) {
            this.info.optionEntityList.push({
                optionName: value.optionName,
                optionDescription: value.optionDescription,
                id: value.id
            });
            this.dialogFormVisible = false;
        },
        getAttribute () {
            this.$http.post(this.$api.attribute.list)
                .then((res) => {
                    this.attributeList = res.data.data.list;
                });
        },
        // 获取详情页的接口
        getOption () {
            this.$http.get(this.$api.category.detail + '/' + this.id + '/options')
                .then((res) => {
                    this.info = res.data.data;
                });
        },
        trClick (id) {
            this.isActiveId = id;
        },
        // 删除属性
        newdel (id) {
            for (let i = 0; i < this.info.optionEntityList.length; i++) {
                if (this.info.optionEntityList[i].id === id) {
                    this.info.optionEntityList.splice(i, 1);
                }
            }
        },
        addAttribute () {
            this.optionEntityList = [];
            for (let i = 0; i < this.info.optionEntityList.length; i++) {
                this.optionEntityList.push({
                    id: this.info.optionEntityList[i].id
                });
            }
            this.$http.put(this.$api.category.detail + '/' + this.id + '/options', {'optionEntityList': this.optionEntityList})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('保存成功');
                    }
                });
        }
    }
};
</script>
<style scoped lang="scss">
  @import '../../../styles/module/Items';
  .attributenew {
    .top1 {
      margin-top: 10px;
    }
    .top2 {
      margin-top: 10px;
      .box2 {
        margin-bottom: 10px;
        button {
          margin-left: 28%;
        }
      }
    }
    .active {
      background: lightgray;
    }
    i:hover {
      cursor: pointer;
    }
    .search {
      position: relative;
      width: 34%;
      margin-bottom: 10px;
      float: right;
      .span1 {
        position: absolute;
        top: 0;
        right: 2px;
      }
      .span1:hover {
        cursor: pointer;
      }
    }
  }

  .el-col-1 {
    width: 76px;
  }

  .form-group {
    text-align: right;
    margin: 0 14px 20px 0;
  }
</style>
