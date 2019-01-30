<template>
  <div class="commodity-main detail" id='mTable'>
    <div class="gy-h4">{{id ? '产品编辑' : '产品添加'}}</div>
    <form action="javascript:;" name="productAdd" class="gy-form-box-14">
      <div class="gy-form">
        <el-row :gutter="60">
          <el-col :span="12">
            <el-row>
              <el-col :span="3" class="label"> <span>产品名称</span></el-col>
              <el-col :span="20"> <input type="text" class="gy-input" placeholder="请输入产品名称" v-model="productData.productName"></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="3" class="label"><span>后台类目</span></el-col>
              <el-col :span="20">
                <el-cascader style="width: 100%;"
                             change-on-select
                             :options="lmlists"
                             v-model="lmlistsvalue"
                             @change="handleChange">
                </el-cascader>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="mytop" :gutter="60">
          <el-col :span="12">
            <el-row>
              <el-col :span="3" class="label"><span>前台类目</span></el-col>
              <el-col :span="20">
                <el-cascader style="width: 100%"
                             change-on-select
                             :options="lmlists2"
                             v-model="lmlistsvalue2"
                             @change="handleChange2">
                </el-cascader>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col  :span="3" class="label"><span>cas号</span></el-col>
              <el-col :span="20"><input type="text" class="gy-input" placeholder="请输入cas号" v-model="productData.casNo"></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="mytop" :gutter="60">
          <el-col :span="12">
            <el-row>
              <el-col :span="3" class="label">
                <span>分子式</span>
              </el-col>
              <el-col :span="20">
                <input type="text" class="gy-input" placeholder="请输入分子式" v-model="productData.molecularFormula">
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="3" class="label">
                <span>中文别名</span>
              </el-col>
              <el-col :span="20">
                <input type="text" class="gy-input" placeholder="请输入中文别名" v-model="productData.cnAlias">
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="mytop" :gutter="60">
          <el-col :span="12">
            <el-row>
              <el-col :span="3" class="label">
                <span>英文全称</span>
              </el-col>
              <el-col :span="20">
                <input type="text" placeholder="请输入英文全称" class="gy-input" v-model="productData.enFullName">
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="3" class="label">
                <span>英文简称</span>
              </el-col>
              <el-col :span="20">
                <input type="text" placeholder="请输入英文简称" class="gy-input" v-model="productData.enAbbreviation">
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="mytop" :gutter="60">
          <!--<el-col :span="10">-->
            <!--&lt;!&ndash;<el-row>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-col :span="4">&ndash;&gt;-->
                <!--&lt;!&ndash;<span>SKU规则</span>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-col :span="20">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-select v-model="productData.skuNoRuleId" placeholder="请选择">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-option&ndash;&gt;-->
                    <!--&lt;!&ndash;v-for="item in skuList"&ndash;&gt;-->
                    <!--&lt;!&ndash;:key="item.id"&ndash;&gt;-->
                    <!--&lt;!&ndash;:label="item.skuNoRuleName"&ndash;&gt;-->
                    <!--&lt;!&ndash;:value="item.id">&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
          <!--</el-col>-->
          <el-col :span="12">
            <el-row>
              <el-col :span="3">
                <span>产品图片</span>
              </el-col>
              <el-col :span="20">
                <div class="upload-box">
                  <el-upload
                    action="api"
                    list-type="picture-card"
                    :file-list="fileLists"
                    :http-request="uploadImg"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
          <el-row>
          <el-col  :span="3">
          <span>产品状态</span>
          </el-col>
          <el-col :span="20">
          <div>
          <input type="radio" v-model="productData.valid" value="1" name="status" checked><span>可用</span>
          <input type="radio" v-model="productData.valid" value="0" name="status"><span>不可用</span>
          </div>
          </el-col>
          </el-row>
          </el-col>
        </el-row>
        <el-row class="mytop" :gutter="60">
          <!--<el-col :span="10">-->
            <!--<el-row>-->
              <!--<el-col  :span="4">-->
                <!--<span>产品状态</span>-->
              <!--</el-col>-->
              <!--<el-col :span="20">-->
                <!--<div>-->
                  <!--<input type="radio" v-model="productData.valid" value="1" name="status" checked><span>可用</span>-->
                  <!--<input type="radio" v-model="productData.valid" value="0" name="status"><span>不可用</span>-->
                <!--</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</el-col>-->
          <el-col>
            <el-row>
              <el-col  :span="1" style="width: 73.33px"> <span>产品描述</span></el-col>
              <el-col  :span="17"><textarea placeholder="请输入产品描述" class="gy-textarea" v-model="productData.productDescription"></textarea></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="mytop2">
          <el-col :span="24"><button class="gy-button-extra" @click="add">{{id ? '编辑' : '添加'}}</button></el-col>
        </el-row>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    data () {
        return {
            id: '',
            productData: {
                productName: '',
                valid: 1,
                productDescription: '',
                productUrlList: [],
                skuNoRuleId: '',
                cnAlias: '',
                enFullName: '',
                enAbbreviation: '',
                molecularFormula: '',
                casNo: ''
            },
            categoryIds: [],
            catalogueId: [],
            categoryList: '',
            skuList: [],
            imgBaseUrl: '',
            isReupload: false,
            receptionList: '',
            lmlists: [],
            lmlistsvalue: [],
            lmlists2: [],
            lmlistsvalue2: [],
            jcvalue1: '',
            jcvalue2: [],
            fileLists: []
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.init();
    },
    methods: {
        init () {
            this.id && this.getDetail();
            this.getCategoryList();
            this.getSkuList();
            this.getParentList();
            this.childSearchList();
            this.childSearchList2();
            // this.imgBaseUrl = process.env.IMG_ROOT;
        },
        // 查询类目以及子类目
        childSearchList () {
            this.$http.get(this.$api.category.list + '?categoryId=' + '')
                .then(res => {
                    let data = res.data.data;
                    for (let i = 0; i < data.length; i++) {
                        data[i]['label'] = data[i].categoryName;
                        data[i]['value'] = data[i].id;
                        data[i]['children'] = data[i].categoryList;
                        if (data[i]['value'] === this.jcvalue1) {
                            this.lmlistsvalue.push(data[i]['value']);
                        }
                        if (data[i].children !== null) {
                            for (let j = 0; j < data[i].children.length; j++) {
                                data[i].children[j]['label'] = data[i].children[j].categoryName;
                                data[i].children[j]['value'] = data[i].children[j].id;
                                if (data[i].children[j]['value'] === this.jcvalue1) {
                                    this.lmlistsvalue.push(data[i]['value']);
                                    this.lmlistsvalue.push(data[i].children[j]['value']);
                                }
                            }
                        } else {
                            data[i].children = [];
                        }
                    }
                    this.lmlists = data;
                });
        },
        handleChange (value) {
            this.categoryIds = [];
            this.categoryIds = value[value.length - 1];
        },
        // 查询类目以及子类目
        childSearchList2 () {
            this.$http.get(this.$api.receptionCategory.list + '?categoryId=' + '')
                .then(res => {
                    let data = res.data.data;
                    for (let i = 0; i < data.length; i++) {
                        data[i]['label'] = data[i].catalogueName;
                        data[i]['value'] = data[i].id;
                        data[i]['children'] = data[i].catalogueModelList;
                        if (data[i]['value'] === this.jcvalue2) {
                            this.lmlistsvalue2.push(data[i]['value']);
                        }
                        if (data[i].children !== null) {
                            for (let j = 0; j < data[i].children.length; j++) {
                                data[i].children[j]['label'] = data[i].children[j].catalogueName;
                                data[i].children[j]['value'] = data[i].children[j].id;
                                if (data[i].children[j]['value'] === this.jcvalue2) {
                                    this.lmlistsvalue2.push(data[i]['value']);
                                    this.lmlistsvalue2.push(data[i].children[j]['value']);
                                }
                            }
                        } else {
                            data[i].children = [];
                        }
                    }
                    this.lmlists2 = data;
                });
        },
        handleChange2 (value) {
            this.catalogueId = [];
            this.catalogueId = value[value.length - 1];
        },
        getCategoryList () {
            this.$http.get(this.$api.category.detail)
                .then((res) => {
                    this.categoryList = res.data.data;
                });
        },
        getSkuList () {
            this.$http.post(this.$api.sku.list)
                .then((res) => {
                    this.skuList = res.data.data.list;
                    this.productData.skuNoRuleId = this.skuList[0].id;
                });
        },
        uploadImg (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.upload.img, formData, headers)
                .then((res) => {
                    this.productData.productUrlList.push(res.data);
                    this.isReupload = true;
                });
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        getDetail () {
            this.$http.get(this.$api.product.add + '/' + this.id)
                .then((res) => {
                    let r = res.data.data;
                    if (r.productUrlList === null) {
                        r.productUrlList = [];
                    }
                    this.productData = r;
                    for (let i = 0; i < r.productUrlList.length; i++) {
                        this.fileLists.push({'url': r.productUrlList[i]});
                    }
                    this.jcvalue1 = r.categoryIds[0];
                    this.jcvalue2 = r.catalogueId;
                });
        },
        handleRemove (file, fileList) {
            for (let i = 0; i < this.productData.productUrlList.length; i++) {
                if (this.productData.productUrlList[i] === file.url) {
                    this.productData.productUrlList.splice(i, 1);
                }
            }
        },
        add () {
            if (this.productData.productName === '') {
                this.$message.error('请填写产品名称');
                return;
            }
            this.productData.categoryIds = [this.lmlistsvalue[this.lmlistsvalue.length - 1]];
            this.productData.catalogueId = this.lmlistsvalue2[this.lmlistsvalue2.length - 1];
            if (this.productData.categoryIds[0] === undefined) {
                this.$message.error('请选择后台类目', '提示');
                return;
            }
            if (!this.productData.catalogueId) {
                this.$message.error('请选择前台类目', '提示');
                return;
            }
            if (this.id) {
                this.productData.id = this.id;
                this.$http.put(this.$api.product.add, this.productData)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.$message.success('编辑成功', '提示');
                            this.$router.push({path: 'list'});
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                return;
            }
            this.$http.post(this.$api.product.add, this.productData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('添加成功', '提示');
                        this.$router.push({path: 'list'});
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getParentList () {
            this.$http.get(this.$api.category.detail + '?keywords=')
                .then((res) => {
                    this.receptionList = res.data.data;
                });
        }
    }
};
</script>
<style  lang="scss" scoped>
.gy-form {
  padding: 4px 14px 0 0;
}
.label {
  padding-top: 5px;
}
.mytop{
  margin-top: 12px;
}
.mytop2{
  margin: 20px 0;
  button{
    float: right;
  }
}
</style>
