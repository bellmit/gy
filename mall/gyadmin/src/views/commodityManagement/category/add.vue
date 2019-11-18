<template>
  <div class="commodity-main detail">
    <div class="gy-h4">{{categoryId ? '类目编辑' : '类目添加'}}</div>
    <form action="javascript:;" name="categoryAdd">
      <el-row :gutter="60">
        <el-col :span="12">
          <el-row>
            <el-col :span="3" class="pt-5"><span>类目名称</span></el-col>
            <el-col :span="21"><input type="text" v-model="addData.categoryName" placeholder="请输入类目名称"></el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="3" class="pt-5"><span class="l">上级类目</span></el-col>
            <el-col :span="21">
              <el-cascader style="width: 100%"
                           change-on-select
                           :options="lmlists"
                           v-model="lmlistsvalue"
                           @change="handleChange">
              </el-cascader>
            </el-col>
            <el-col v-show="lmlistsvalue.length !== 0" :span="1" class="editBtn">
              <i @click="lmlistsvalueDel" class="el-icon-error"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="60" style="margin-top: 20px">
        <el-col :span="12">
          <el-row>
            <el-col :span="3"><span>类目状态</span></el-col>
            <el-col :span="21">
              <label><input type="radio" v-model="addData.valid" value="1" name="status" checked>可用</label>
              <label><input type="radio" v-model="addData.valid" value="0" name="status">不可用</label>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="3"><span>类目描述</span></el-col>
            <el-col :span="21"><textarea class="gy-textarea" placeholder="请输入类目描述" v-model="addData.categoryDescription"></textarea></el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0;text-align: right">
        <el-col :span="24">
          <button class="gy-button-extra" @click="add">{{categoryId ? '编辑' : '添加'}}</button>
        </el-col>
      </el-row>
    </form>
  </div>
</template>

<script>
export default {
    data () {
        return {
            addData: {
                categoryDescription: '',
                categoryName: '',
                valid: 1,
                categoryIds: []
            },
            parentOptions: '',
            categoryId: null,
            lmlists: [],
            lmlistsvalue: [],
            lmlistsvalue2: []
        };
    },
    created () {
        this.getParentList();
        this.categoryId = this.$route.query.id;
        this.categoryId && this.getDetail();
        this.childSearchList();
    },
    methods: {
        // 查询类目以及子类目
        childSearchList () {
            this.$http.get(this.$api.category.list + '?categoryId=' + '')
                .then(res => {
                    let data = res.data.data;
                    for (let i = 0; i < data.length; i++) {
                        data[i]['label'] = data[i].categoryName;
                        data[i]['value'] = data[i].id;
                        data[i]['children'] = data[i].categoryList;
                        if (data[i]['value'] === this.lmlistsvalue2) {
                            this.lmlistsvalue.push(data[i]['value']);
                        }
                        if (data[i].children !== null) {
                            for (let j = 0; j < data[i].children.length; j++) {
                                data[i].children[j]['label'] = data[i].children[j].categoryName;
                                data[i].children[j]['value'] = data[i].children[j].id;
                                if (data[i].children[j]['value'] === this.lmlistsvalue2) {
                                    this.lmlistsvalue.push(data[i]['value']);
                                    this.lmlistsvalue.push(data[i].children[j]['value']);
                                }
                            }
                        } else {
                            data[i].children = [];
                        }
                    }
                    this.lmlists = data;
                }
                );
        },
        handleChange (value) {
            this.addData.categoryIds = [];
            this.addData.categoryIds = [value[value.length - 1]];
        },
        lmlistsvalueDel () {
            this.lmlistsvalue = [];
            this.addData.categoryIds = [];
        },
        getParentList () {
            this.$http.get(this.$api.category.detail + '?keywords=')
                .then((res) => {
                    this.parentOptions = res.data.data;
                });
        },
        add () {
            if (this.addData.categoryName === '') {
                this.$message.error('请填写类目名称', '提示');
                return;
            }
            if (this.categoryId) {
                this.addData.id = this.categoryId;
                this.$http.put(this.$api.category.add, this.addData)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.$message.success('编辑成功', '提示');
                            this.$router.push({path: 'list'});
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                this.$http.get(this.$api.category.add + '/' + this.addData.id)
                    .then((res) => {
                        if (res.data.code === 0) {
                        }
                    });
                return;
            }
            this.$http.post(this.$api.category.add, this.addData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('添加成功');
                        this.$router.push({path: 'list'});
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDetail () {
            this.$http.get(this.$api.category.detail + '/' + this.categoryId)
                .then((res) => {
                    let r = res.data.data;
                    this.addData = {
                        categoryDescription: r.categoryDescription,
                        categoryName: r.categoryName,
                        valid: r.valid,
                        categoryIds: r.categoryIds
                    };
                    this.lmlistsvalue2 = r.categoryIds[0];
                });
        }
    }
};
</script>
<style scoped lang="scss">
  .commodity-main {
     overflow: hidden;
  }
  .pt-5 {
     padding-top: 5px;
  }
</style>
