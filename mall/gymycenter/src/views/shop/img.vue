<template>
    <div class="order lic shop-img">
        <div class="new-title-public">
            图片管理
        </div>
        <div class="none-shop" v-if="!isShoped">
            <img src="../../assets/images/noneshop.png" alt="">
            <p>开通店铺可以获得更多的优惠</p>
            <button class="gy-button-extra" @click="goOpenShop">我要开通店铺</button>
        </div>
        <div class="shop-im-main" v-else>
            <!--搜索区域-->
            <form action="javascript:;">
                <div class="gy-form my-form">
                    <div class="query clearfix">
                        <div class="more fr cursor" @click="advancedSearch=!advancedSearch">
                            <span>高级搜索</span>
                            <i slot="suffix" class="iconfont" :class="advancedSearch ? 'icon-arrow-up' : 'icon-arrow-down'"></i>
                        </div>
                        <div class="iptbox fr">
                            <input class="ipt" v-model="searchForm.typeOrTitle" type="text"
                                   placeholder="请输入图片分类/标题"/>
                            <i  @click="remarkSearch" class="iconfont icon-search"></i>
                        </div>
                    </div>
                    <!--高级搜索内容-->
                    <div v-if="advancedSearch" style="overflow: hidden;margin-bottom: 20px">
                        <div class="gy-form-group">
                            <div class="l" style="padding-left: 14px;">图片状态</div>
                            <label>
                                <input type="radio" v-model="searchForm.active" name="payway" value="">
                                <span class="new-label">全部</span>
                            </label>
                            <label style="margin-left: 10px;">
                                <input type="radio" v-model="searchForm.active" name="payway" value="1">
                                <span class="new-label">有效</span>
                            </label>
                            <label style="margin-left: 10px;">
                                <input type="radio" v-model="searchForm.active" name="payway" value="0">
                                <span class="new-label">无效</span>
                            </label>
                        </div>
                        <div class="gy-form-group last-group">
                            <div class="l">说明</div>
                            <input placeholder="请输入" class="gy-input" v-model="searchForm.remark">
                            <i @click="remarkSearch" class="iconfont icon-search"></i>
                        </div>
                    </div>
                    <div class="my-form-button">
                        <button class="gy-button-extra" @click="addADImg">新增首页广告图</button>
                        <button class="gy-button-normal" @click="addProductImg">新增产品分类图</button>
                        <button class="gy-button-normal" :disabled="isDisabled" @click="imgEdit"
                                :class="{disabledColor: isDisabled}">编辑
                        </button>
                        <button class="gy-button-normal" @click="imgDelete">删除</button>
                    </div>
                </div>
            </form>
            <!--表格区域-->
            <div class="my-table">
                <el-table
                    class="gy-table"
                    :data="table"
                    stripe
                    @select="selectTab"
                    @select-all="selectTabAll"
                    @selection-change="selectCancel"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        type="selection"
                        width="80px">
                    </el-table-column>
                    <el-table-column
                        prop="typeStr"
                        label="图片分类">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="图片标题">
                    </el-table-column>
                    <el-table-column
                        prop="redirectionTo"
                        label="图片链接"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="sortOrder"
                        label="图片排序">
                    </el-table-column>
                    <el-table-column
                        prop="active"
                        label="图片状态">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="说明">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog class="newAddGg" title="新增首页广告图" :visible.sync="isADDialog" :close-on-click-modal="false">
            <form action="javascript:;">
                <div class="gy-form imgForm clearfix">
                    <div class="gy-form-group">
                        <span class="l">图片标题</span>
                        <input class="gy-input" v-model="imgADForm.title" placeholder="请输入图片标题">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">轮播排序</span>
                        <input class="gy-input" type="number" v-model="imgADForm.sortOrder" placeholder="请输入数字作为显示顺序">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">图片链接目标</span>
                        <input class="gy-input" v-model="imgADForm.redirectionTo" placeholder="请输入图片链接地址">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">状态</span>
                        <label class="btn-right"><input type="radio" v-model="imgADForm.active" name="payway" value="1">有效</label>
                        <label><input type="radio" v-model="imgADForm.active" name="payway" value="0">无效</label>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">图片</span>
                        <el-upload
                            action="api"
                            class="my-upload anewH"
                            drag
                            ref="upload1"
                            :limit="1"
                            list-type="picture-card"
                            :on-remove="BannerRemove"
                            :http-request="uploadImg"
                            :file-list="fileImgList">
                            <div class="uoloadInfo">
                                <div class="uploadBtn">点击选择图片</div>
                                <span class="uploadTips">或将文件拖到这里</span>
                            </div>
                        </el-upload>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">说明</span>
                        <input placeholder="请输入" class="gy-input" v-model="imgADForm.remark">
                    </div>
                </div>
            </form>
            <div class="gy-form-button">
                <button class="gy-button-extra btn-right" @click="submitAD">保存</button>
                <button class="gy-button-normal" @click="isADDialog = false">取消</button>
            </div>
        </el-dialog>

        <!--productDialog-->

        <!-- @close="diaClose(imgProductForm)" -->
        <el-dialog class="newAddProduct" title="新增产品分类图" :visible.sync="isProductDialog" :close-on-click-modal="false">
            <form action="javascript:;">
                <div class="gy-form imgForm clearfix">
                    <div class="gy-form-group">
                        <span class="l">产品分类标题</span>
                        <input class="gy-input" v-model="imgProductForm.title" placeholder="请输入产品分类标题">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">产品分类排序</span>
                        <input class="gy-input" type="number" v-model="imgProductForm.sortOrder"
                               placeholder="请输入数字作为显示顺序">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">产品分类</span>
                        <el-cascader style="width: 100%"
                            ref="cascader"
                            :options="treeData"
                            change-on-select
                            v-model="treeids"
                            @change="treeChange"
                            placeholder="请选择产品分类"></el-cascader>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">状态</span>
                        <label class="btn-right"><input type="radio" v-model="imgProductForm.active" name="payway" value="1">有效</label>
                        <label><input type="radio" v-model="imgProductForm.active" name="payway" value="0">无效</label>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">图片</span>
                        <el-upload
                            ref="upload2"
                            action="api"
                            class="my-upload anewH"
                            drag
                            :limit="1"
                            list-type="picture-card"
                            :on-remove="BannerRemove1"
                            :http-request="uploadImg1"
                            :file-list="fileImgList">
                            <div class="uoloadInfo">
                                <div class="uploadBtn">点击选择图片</div>
                                <span class="uploadTips">或将文件拖到这里</span>
                            </div>
                        </el-upload>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">说明</span>
                        <input placeholder="请输入" class="gy-input" v-model="imgProductForm.remark">
                    </div>
                </div>
            </form>
            <div class="gy-form-button">
                <button class="gy-button-extra btn-right" @click="submitProduct">保存</button>
                <button class="gy-button-normal" @click="isProductDialog = false">取消</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            advancedSearch: false,
            searchForm: {
                active: null,
                remark: null,
                typeOrTitle: null
            },
            table: [],
            // 首页广告
            imgADForm: {
                title: null,
                redirectionTo: null,
                sortOrder: null,
                active: 1,
                remark: null,
                type: 0, // 图片类型 0
                absoluteUrl: null
            },
            // 产品分类
            imgProductForm: {
                title: null,
                catalogueName: null,
                catalogueId: null, // tree分类的节点id
                type: 1, // 图片类型 1
                sortOrder: null,
                active: 1,
                remark: null,
                absoluteUrl: null
            },
            // tree默认值
            treeName: [],
            i: 0,
            treeData: [],
            // 当前选中table item
            tabRowItem: {},
            delete: {
                idList: [],
                userId: null
            },
            isDisabled: false,
            isShowTree: false,
            isEdit: false,
            isADDialog: false,
            isProductDialog: false,
            fileImgList: [],
            testImgList: [
                {
                    title: null,
                    url: null
                }
            ],
            treeVals: [],
            treeids: [],
            isShoped: false
        };
    },
    created () {
        this.initList();
    },
    methods: {
        // tabelList
        initList () {
            let that = this;
            localStorage.getItem('userInfo') && (this.isShoped = JSON.parse(localStorage.getItem('userInfo')).shopsetup === 1);
            that.isDisabled = false;
            that.$http.post(that.$api.shop.ImgRegulatelist, this.searchForm)
                .then(res => {
                    let data = res.data.data;
                    if (data !== []) {
                        for (let i = 0; i < data.length; i++) {
                            data[i]['typeStr'] = data[i].type;
                            data[i].active === 0 ? data[i].active = '无效' : data[i].active = '有效';
                            data[i].typeStr === 0 ? data[i].typeStr = '首页广告图' : data[i].typeStr = '产品分类图';
                        }
                    }
                    that.table = data;
                });
        },
        remarkSearch () {
            this.initList();
        },
        goOpenShop () {
            this.$http.put(this.$api.point.openShop, {
                usrCompanyId: this.companyId,
                shopsetup: 1
            }).then(res => {
                if (res.data.code === 0) {
                    let userinfo = JSON.parse(localStorage.getItem('userInfo'));
                    userinfo.shopsetup = 1;
                    localStorage.setItem('userInfo', JSON.stringify(userinfo));
                    this.isShoped = true;
                    return;
                }
                this.$message.error(res.data.message);
            });
        },
        // 产品分类类目 拆解重组
        initTree () {
            let that = this;
            that.$http.put(that.$api.shop.treeList).then(res => {
                let data = res.data.data;
                for (let i = 0; i < data.length; i++) {
                    data[i]['label'] = data[i].catalogueName;
                    data[i]['value'] = data[i].id;
                    data[i]['children'] = data[i].catalogueModelList;
                    if (data[i].children !== null) {
                        for (let j = 0; j < data[i].children.length; j++) {
                            data[i].children[j]['label'] = data[i].children[j].catalogueName;
                            data[i].children[j]['value'] = data[i].children[j].id;
                        }
                    } else {
                        data[i].children = [];
                    }
                }
                this.treeData = data;
            });
        },
        getCascaderObj (val, opt) {
            return val.map(function (value, index, array) {
                for (var itm of opt) {
                    if (itm.value === value) {
                        opt = itm.children;
                        return itm;
                    }
                }
                return null;
            });
        },
        // tree 当前项
        treeChange (val) {
            this.imgProductForm.catalogueId = val[val.length - 1];
            this.treeVals = this.getCascaderObj(val, this.treeData);
            this.imgProductForm.catalogueName = this.treeVals[this.treeVals.length - 1].catalogueName;
        },
        // 新增首页广告图
        addADImg () {
            this.isEdit = false;
            this.isADDialog = true;
            this.clear('AD');
        },
        // 新增产品分类图
        addProductImg () {
            this.isEdit = false;
            this.initTree();// 分类tree赋值
            this.isProductDialog = true;
            this.clear('product');
        },
        // 编辑图片
        imgEdit () {
            this.isEdit = true;
            // 编辑时 图片重新赋值
            this.testImgList[0].title = this.tabRowItem.title;
            this.testImgList[0].url = this.tabRowItem.absoluteUrl;
            this.fileImgList = this.testImgList;
            if (this.tabRowItem.type === 0) {
                // 广告图dia
                this.imgADForm = Object.assign({}, this.tabRowItem);
                this.isADDialog = true;
                this.imgADForm.active = this.tabRowItem.active === '有效' ? 1 : 0;
            }
            // 产品图dia
            if (this.tabRowItem.type === 1) {
                this.initTree();// 分类tree赋值
                let that = this;
                // catalogues
                that.$http.get(that.$api.shop.catalogues + that.tabRowItem.catalogueId)
                    .then(function (res) {
                        // 上传成功之后 返回的服务器地址
                        if (res.data.code === 0) {
                            let data = res.data.data;
                            let arr = [data.parentCatalogue[0].id, data.id];
                            that.treeids = arr;
                        }
                    });
                this.imgProductForm = Object.assign({}, this.tabRowItem);
                this.isProductDialog = true;
                this.imgProductForm.active = this.imgProductForm.active === '有效' ? 1 : 0;
            }
            // }
        },
        // 删除图片
        imgDelete () {
            if (this.delete.idList.length !== 0) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let arr = [];
                    this.delete.idList.forEach(function (i, idx) {
                        arr.push(i.id);
                    });
                    this.delete.idList = arr;

                    let that = this;
                    that.$http.post(that.$api.shop.delete, this.delete)
                        .then(function (res) {
                            if (res.data.code === 0) {
                                that.initList();
                            }
                        });
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
        // 上传首页广告图
        uploadImg (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            formData.append('type', 0);
            formData.append('fileName', file.file.name);
            that.$http.post(that.$api.shop.imgUploadFile, formData, headers)
                .then(function (res) {
                    // 上传成功之后 返回的服务器地址
                    if (res.data.code === 0) {
                        that.imgADForm.absoluteUrl = res.data.data.absoluteUrl;
                    }
                });
        },
        // 上传产品分类图
        uploadImg1 (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            formData.append('type', 1);
            formData.append('fileName', file.file.name);
            that.$http.post(that.$api.shop.imgUploadFile, formData, headers)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.imgProductForm.absoluteUrl = res.data.data.absoluteUrl;
                    }
                });
        },
        BannerRemove (file) {
            console.log(file.name);
        },
        BannerRemove1 (file) {
            console.log(file.name);
        },
        // 公用提交表单
        submitForm (url, form, dialog) {
            let that = this;
            if (!this.check(form, dialog)) {
                return false;
            }
            that.$http.post(url, form)
                .then(function (res) {
                    if (res.data.code === 0) {
                        dialog === 0 ? that.isADDialog = false : that.isProductDialog = false;
                        that.initList();
                    }
                });
        },
        // 提交广告表单
        submitAD () {
            let that = this;
            this.isEdit === true ? this.submitForm(that.$api.shop.imgEdit, that.imgADForm, 0) : this.submitForm(that.$api.shop.saveImgForm, that.imgADForm, 0);
        },
        // 提交产品分类form
        submitProduct () {
            let that = this;
            this.isEdit === true ? this.submitForm(that.$api.shop.imgEdit, that.imgProductForm, 1) : this.submitForm(that.$api.shop.saveImgForm, that.imgProductForm, 1);
        },
        // 勾选单行
        selectTab (v) {
            this.delete.idList = v;
            if (v.length !== 0) {
                this.tabRowItem = v[v.length - 1];
            }
            v.length > 1 ? this.isDisabled = true : this.isDisabled = false;
        },
        // 勾选全选
        selectTabAll (v) {
            this.delete.idList = v;
            v.length > 1 ? this.isDisabled = true : this.isDisabled = false;
        },
        // 勾选变换
        selectCancel (v) {
            if (v.length === 0) {
                this.tabRowItem = {};
            }
        },
        // 验证
        check (form, type) {
            if (form.title == null) {
                type === 0 ? this.$message.error('图片标题不能为空') : this.$message.error('产品分类标题不能为空');
                return false;
            }
            if (form.sortOrder == null) {
                type === 0 ? this.$message.error('轮播排序能为空') : this.$message.error('产品分类排序不能为空');
                return false;
            }
            if (type === 0) {
                if (form.redirectionTo == null) {
                    this.$message.error('图片链接目标不能为空');
                    return false;
                }
            }
            if (type === 1) {
                if (form.catalogueId == null) {
                    this.$message.error('产品分类不能为空');
                    return false;
                }
            }
            if (form.absoluteUrl == null) {
                type === 0 ? this.$message.error('请选择图片') : this.$message.error('请选择图片');
                return false;
            }
            return true;
        },
        clear (type) {
            if (type === 'AD') {
                let form = {
                    absoluteUrl: null,
                    active: 1,
                    redirectionTo: null,
                    remark: null,
                    sortOrder: null,
                    title: null,
                    type: 0
                };
                this.fileImgList = [];
                this.imgADForm = Object.assign({}, form);
            }
            if (type === 'product') {
                let form = {
                    title: null,
                    catalogueName: null,
                    catalogueId: null,
                    type: 1,
                    sortOrder: null,
                    active: 1,
                    remark: null,
                    absoluteUrl: null
                };
                this.fileImgList = [];
                this.treeids = [];
                this.imgProductForm = Object.assign({}, form);
            }
        }
    }
};
</script>
<style lang="scss">
    .lic {
        .my-upload .el-upload {
            line-height: 30px !important;
            height: 104px !important;
        }
        .el-upload-list--picture-card .el-upload-list__item {
            width: 104px;
            height: 104px;
        }
        .my-upload {
            width: 100%;
            .el-upload {
                width: 25%;
                position: relative;
                .el-upload-dragger {
                    width: 100%;
                    height: 104px !important;
                    border: 1px solid $color-border;
                    border-radius: 0px;
                }
            }
        }
        .newAddGg{
            .el-dialog__body{
                padding: 0 0 30px 0;
            }
        }
        .newAddProduct{
            .gy-form{
                padding: 0;
            }
            .el-dialog__body{
                padding: 10px 10px 25px 10px;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .new-label{
        color: #666666;
    }
    .last-group {
        position: relative;
        .iconfont {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
    .none-shop {
        text-align: center;
        padding-top: 50px;
        font-size: 12px;
        img{
            width: 68px;
        }
        button{
            margin-top: 10px;
        }
    }
    .shop-img {
        .search {
            overflow: hidden;
            i {
                position: absolute;
                right: 0;
                bottom: 15px;
                font-weight: bold;
                color: $color-black;
                line-height: 1;
            }
        }
        .anewH {
            height: 104px;
            display: inline-block;
        }
        .header {
            padding: 10px 20px;
            border-bottom: 1px solid #ebeef5;
            box-sizing: border-box;
            .title {
                color: $color-title;
                font-size: 16px;
                margin-right: 24px;
            }
        }
        .my-form {
            padding: 20px 16px 0;
            .cursor {
                cursor: pointer;
            }
            .my-form-button {
                text-align: right;
                padding-bottom: 10px;
                button {
                    margin-right: 8px;
                }
                button:last-child {
                    margin-right: 0;
                }
            }
            .query {
                margin: 0 10px 20px;
                .iptbox {
                    display: inline-block;
                    width: 216px;
                    border-bottom: 1px solid #b5b5b5;
                    .ipt {
                        border: none;
                        display: inline-block;
                        width: 190px;
                    }
                    ipt::-webkit-input-placeholder {
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
                    color: #666;
                    margin-left: 10px;
                    i{
                        margin-left:5px;
                        vertical-align: top;
                    }
                }
            }
            .tips {
                color: $color-minor;
            }
        }
        .my-table {
            padding: 0 16px 14px;
        }
        .imgForm {
            .ifImg {
                height: 100px;
                width: 100px;
                margin-bottom: 0;
                vertical-align: middle;
                overflow: hidden;
                border: 1px solid #c0ccda;
                border-radius: 6px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin: 0 8px 8px 0;
                display: inline-block;
            }
            .my-tree {
                z-index: 999;
            }
            .uoloadInfo {
                border: 2px dashed $color-border;
                width: 90%;
                height: 80px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
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
                /*<!--.uploadTips {-->*/
                /*<!--position: relative;-->*/
                /*<!--top: -20%;-->*/
                /*<!--}-->*/
            }
        }
        .disabledColor {
            background-color: $color-light;
        }
    }
</style>
