<template>
  <div class="commodity-main detail">
    <div class="gy-h4">{{receivedId ? '前台类目编辑' : '前台类目添加'}}</div>
    <form action="javascript:;" name="categoryAdd" class="gy-form-box-14">
      <el-row :gutter="60">
        <el-col :span="12">
          <el-row>
            <el-col :span="3" class="pt-5"><span class="l">类目名称</span></el-col>
            <el-col :span="21"><input type="text" v-model="addData.catalogueName" placeholder="请输入类目名称"></el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="3" class="pt-5"><span class="l">上级类目</span></el-col>
            <el-col :span="20">
              <el-cascader style="width: 100%"
                           change-on-select
                           :options="lmlists"
                           v-model="lmlistsvalue"
                           @change="handleChange">
              </el-cascader>
            </el-col>
            <el-col v-show="lmlistsvalue.length!==0" :span="1" class="editBtn">
              <i @click="lmlistsvalueDel" class="el-icon-error"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="60" style="margin-top: 15px">
        <el-col :span="12">
          <el-row>
            <el-col :span="3" class="pt-5">
              <span class="l">排序</span>
            </el-col>
            <el-col :span="21">
              <input type="text" placeholder="请输入排序" v-model="value">
              <!--<el-select v-model="value" placeholder="请选择">-->
              <!--<el-option-->
              <!--v-for="item in displayOrderList"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
              <!--</el-option>-->
              <!--</el-select>-->
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="3"><span class="l">类目状态</span></el-col>
            <el-col :span="21">
              <div>
                <label><input type="radio" v-model="addData.valid" value="1" name="status" checked>可用</label>
                <label><input type="radio" v-model="addData.valid" value="0" name="status">不可用</label>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="60" style="margin-top: 15px">
        <el-col :span="12">
          <el-row>
            <el-col :span="3"><span class="l">类目描述</span></el-col>
            <el-col :span="21"><textarea class="gy-textarea" placeholder="请输入类目描述" v-model="addData.catalogueDescription"></textarea></el-col>
          </el-row>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row style="margin: 20px 0;text-align: right">
        <el-col :span="24">
          <button class="gy-button-extra" @click="add">{{receivedId ? '编辑' : '添加'}}</button>
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
                catalogueDescription: '',
                catalogueName: '',
                catalogueLevel: '',
                valid: 1
            },
            parentCatalogue: [
                {}
            ],
            parentOptions: '',
            receivedId: null,
            displayOrderList: [
                {value: 0, label: '1'},
                {value: 1, label: '2'},
                {value: 2, label: '3'}
            ],
            value: '',
            lmlists: [],
            lmlistsvalue: [],
            lmlistsvalue2: []
        };
    },
    created () {
        // this.getParentList();
        this.receivedId = this.$route.query.id;
        this.receivedId && this.getDetail();
        this.getParentList();
        this.childSearchList();
    },
    methods: {
        // 查询类目以及子类目
        childSearchList () {
            this.$http.get(this.$api.receptionCategory.list + '?categoryId=' + '')
                .then(res => {
                    let data = res.data.data;
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        data[i]['label'] = data[i].catalogueName;
                        data[i]['value'] = data[i].id;
                        data[i]['children'] = data[i].catalogueModelList;
                        if (data[i]['value'] === this.lmlistsvalue2) {
                            this.lmlistsvalue.push(data[i]['value']);
                        }
                        if (data[i].children !== null) {
                            for (let j = 0; j < data[i].children.length; j++) {
                                data[i].children[j]['label'] = data[i].children[j].catalogueName;
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
            this.parentCatalogue = [];
            this.parentCatalogue = value[value.length - 1];
            console.log(value);
            console.log(this.mycevalue);
        },
        lmlistsvalueDel () {
            this.lmlistsvalue = [];
            this.parentCatalogue = '';
        },
        add: function () {
            let that = this;
            if (that.addData.catalogueName === '') {
                that.$alert('请填写类目名称', '提示');
                return;
            }
            // if (that.addData.parentCatalogue = 0) {
            //     that.$alert('请选择上级类目', '提示');
            //     return;
            // }
            // if (that.addData.catalogueDescription === '') {
            //     that.$alert('请填写类目描述', '提示');
            //     return;
            // }
            that.addData.displayOrder = that.value;
            let parent = [];
            if (that.lmlistsvalue.length === 0) {
                that.addData.catalogueIds = [];
            } else {
                parent[0] = that.parentCatalogue;
                that.addData.catalogueIds = parent;
            }
            if (that.receivedId) {
                that.addData.id = that.receivedId;
                that.$http.put(that.$api.receptionCategory.add, that.addData)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            that.$alert('编辑成功', '提示');
                            that.$router.push({path: 'list'});
                            return;
                        }
                        that.$alert(res.data.message, '出错了');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return;
            }
            that.$http.post(that.$api.receptionCategory.add, that.addData)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$alert('添加成功', '提示');
                        that.$router.push({path: 'list'});
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getParentList: function () {
            let that = this;
            that.$http.get(that.$api.category.detail + '?keywords=')
                .then(function (res) {
                    console.log(res.data.data);
                    that.parentOptions = res.data.data;
                });
        },
        getDetail: function () {
            let that = this;
            that.$http.get(that.$api.receptionCategory.detail + '/' + that.receivedId)
                .then(function (res) {
                    let r = res.data.data;
                    that.addData = {
                        catalogueDescription: r.catalogueDescription,
                        catalogueName: r.catalogueName,
                        catalogueLevel: r.catalogueLevel,
                        valid: r.valid
                    };
                    that.value = r.displayOrder;
                    if (r.parentCatalogue.length > 0) {
                        that.parentCatalogue = r.parentCatalogue[0].id;
                    } else {
                        that.parentCatalogue = r.parentCatalogue;
                    }
                    that.lmlistsvalue2 = r.catalogueIds[0];
                });
        }
    }
};
</script>
<style scoped lang="scss">
  .pt-5 {
    padding-top: 5px;
  }

  .editBtn:hover {
    cursor: pointer;
  }
</style>
