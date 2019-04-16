<template>
  <div class="client">
    <div class="client-tit-box">
    <div class="padding">
        {{title}}
    </div>
    </div>
    <div class="page-b">
        <!-- 搜索 -->
        <div class="search-wrap">
            <div class="search-btn">
                <span class="l"><input v-model="search.keywords" type="text" placeholder="请输入关键信息"><i class="iconfont icon-search" @click="getCustom"></i></span>
                <span @click="isShowSearch = !isShowSearch" class="search-h">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
            </div>
            <div class="clearfix">
                <div class="search-form" v-if="isShowSearch">
                    <div class="gy-form-group">
                        <span class="l">客户名称</span>
                        <input v-model="search.data.customerName" class="gy-input" type="text" placeholder="请输入">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">客户编号</span>
                        <input v-model="search.data.customerId" class="gy-input" type="text" placeholder="请输入">
                    </div>
                    <div class="gy-form-group cl">
                        <span class="l">主营产品</span>
                        <input v-model="search.data.products" class="gy-input" type="text" placeholder="请输入">
                    </div>
                    <div class="gy-form-group" v-if="pageType === '2'">
                        <span class="l">客户经理</span>
                        <el-select v-model="search.data.followUserId">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                            v-for="(item, index) in managerlist"
                            :key="index"
                            :label="item.userName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">企业类型</span>
                        <el-select v-model="search.data.companyType">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                            v-for="(item, index) in companyTypes"
                            :key="index"
                            :label="item.dictName"
                            :value="item.dictId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">企业规模</span>
                        <el-select v-model="search.data.customerScale">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                            v-for="(item, index) in customerScales"
                            :key="index"
                            :label="item.dictName"
                            :value="item.dictId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group last" v-if="Number(pageType) !== 3">
                        <span class="l">客户状态</span>
                        <el-select v-model="search.data.customerStatus">
                            <!-- <el-option label="全部" value=""></el-option> -->
                            <el-option
                            v-for="(item, index) in customerStatuss"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">企业认证</span>
                        <el-select v-model="search.data.authStatus">
                            <el-option
                            v-for="(item, index) in authStatusList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="searchicon" @click="turnPage(1)"><i class="iconfont icon-search"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 功能键 -->
        <div class="clearfix">
            <div class="button-wrap">
                <button class="gy-button-extra" @click="jump(0)" v-if="Number(pageType) !== 1">新增</button>
                <button :class="Number(pageType) === 1 ? 'gy-button-extra' : 'gy-button-normal'" @click="dialogVisible(idS(list), '请选择要删除的客户', dialog.type = 0, dialog.title = '提示')">删除</button>
                <button class="gy-button-normal" @click="dialogVisible(null, dialog.title = '导入客户', dialog.type = 1)" v-if="Number(pageType) !== 1">导入</button>
                <button class="gy-button-normal" @click="exportDoc" v-if="isCrmCustomersExport === '1'">导出</button>
                <button class="gy-button-normal" @click="dialogVisible(idS(list), '请选择客户', dialog.type = 2)" v-if="isCrmCustomersChangeManager === '1'">
                    <span v-if="pageType === '2'">更换客户经理</span>
                    <span v-else>指派客户经理</span>
                </button>
                <button class="gy-button-normal" @click="dialogVisible(null, dialog.title = '自定义列表', dialog.type = 3)">自定义列表</button>
            </div>
        </div>
        <!-- 动态列表 -->
        <div class="table-box table-wrap">
            <table class="gy-table">
                <thead>
                    <tr>
                        <th>
                            <input name="" type="checkbox" :checked="isAll" @click="allCheck(list)" />
                        </th>
                        <th>客户编号</th>
                        <th v-for="(item, index) in titleList" :key="index">{{item.cnName}}</th>
                        <th>操作</th>
                    </tr>
                </thead>

                <tbody v-if="list.length !== 0">
                    <tr v-for="(items, index) in list" :key="index">
                        <td class="text-c">
                            <input name="" type="checkbox" :checked="items.check" @click="baseSelect(items, list)" />
                        </td>
                        <td v-for="(item, idx) in items" :key="idx" v-show="idx > 0" :class="{'text-r': titleList[idx - 2] && titleList[idx - 2].fieldType === 3}">
                            <span v-if="titleList[idx - 2] && titleList[idx - 2].fieldType === 4">
                                <span v-if="item !== '-'">{{item | date}}</span>
                                <span v-else>{{'-'}}</span>
                            </span>
                            <span v-else-if="titleList[idx - 2] && titleList[idx - 2].fieldType === 3">
                                <span v-if="item">{{item | numToCash(4)}}</span>
                                <span v-else>{{'-'}}</span>
                            </span>
                            <span class="nowrap" v-else-if="titleList[idx - 2] && titleList[idx - 2].enName === 'products'">{{item}}</span>
                            <span v-else>{{item || '-'}}</span>
                        </td>
                        <td class="last-td">
                            <!-- 由于数据结构的问题 items[0]不会变动 为id -->
                            <button class="gy-button-view" @click="jump(1, items.id)">查看</button>
                            <button class="gy-button-view" @click="jump(2, items.id)">编辑</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="null-msg" v-if="list.length === 0">没有找到可显示的数据...</div>
        </div>
        <div class="total">共 {{total}} 条记录</div>
    </div>
    <!-- 分页 -->
    <el-pagination
        v-if="total !== 0"
        background
        :total="total"
        layout="prev, pager, next"
        width="margin-top: 40px;"
        :current-page="search.pageNum"
        @current-change="turnPage">
    </el-pagination>
    <!-- 弹出框 -->
    <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.open">
        <!-- 删除 -->
        <div class="dele-wrap" v-if="dialog.type === 0">
            <img src="../assets/images/warning.png" alt="">
            <div>请确认是否删除所选客户信息。</div>
        </div>
        <!-- 导入 -->
        <div class="upload-wrap" v-if="dialog.type === 1">
            <div>1、<a :href="http + '/crm/v1/customers/template/download'">点击下载导入数据模板</a> 将要导入的数据填充到数据导入模板文件中。</div>
                <div class="tips">
                    <p>注意事项：</p>
                    <p>1) 模板中的表头不可更改，表头行不可删除；</p>
                    <p>2) 单次导入的数据不超过10000条；</p>
                </div>
            <p>2、选择导入的数据文件</p>
            <el-upload
                    class="upload"
                    ref="clearUpload"
                    :limit="1"
                    accept=".xlsx,.xls"
                    action="api"
                    :file-list="fileList"
                    :before-remove="beforeRemove"
                    :http-request="upload">
                    <button class="gy-button-normal">选择文件</button>
                </el-upload>
        </div>
        <!-- 批量转移 -->
        <div class="transfer-box" v-if="dialog.type === 2">
            <div class="transfer-wrap clearfix">
                <div class="gy-form-group cl">
                    <span class="l"><span v-if="pageType === '2'">更换</span><span v-else>指派</span>客户经理</span>
                    <el-select v-model="userIds"
                        multiple
                        collapse-tags
                        width="margin-left: 20px;">
                        <el-option
                        v-for="(item, index) in managerlist"
                        :key="index"
                        :label="item.userName"
                        placeholder="请选择"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <p class="page-type">
                <span class="page-tips">温馨提示：</span>
                <span v-if="pageType === '2'">更换</span><span v-else>指派</span>客户经理后，该客户将由指定客户经理进行后续跟进。
            </p>
        </div>
        <!-- 自定义 -->
        <div class="custom-wrap" v-if="dialog.type === 3">
            <div class="item" v-for="(item, index) in minlist" :key="index">
                <label>
                    <input type="checkbox" :checked="item.checked" @click="item.checked = !item.checked" />
                    <span>{{item.cnName}}</span>
                </label>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <!-- 删除 -->
            <button v-if="dialog.type === 0" class="gy-button-extra" @click="submit(0)">确定</button>
            <!-- 导入 -->
            <button v-if="dialog.type === 1" class="gy-button-extra" @click="submit(1)">提交</button>
            <!-- 批量转移 -->
            <button v-if="dialog.type === 2" class="gy-button-extra" @click="submit(2)">确定</button>
            <!-- 自定义 -->
            <button v-if="dialog.type === 3" class="gy-button-extra" @click="submit(3)">确定</button>
            <button class="gy-button-normal" @click="dialog.open = false">取消</button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    props: {
        title: String,
        type: String // 2客户列表 1客户分配 3潜在客户
    },
    data () {
        return {
            http: null,
            pageType: this.type,
            file: null,
            fileList: [],
            isShowSearch: false,
            companyTypes: [], // 企业类型
            userIds: [], // 客户经理
            customerScales: [], // 企业规模
            customerStatuss: [ // 客户状态
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '潜在客户',
                    value: 0
                },
                {
                    label: '客户',
                    value: 3
                }
            ],
            authStatusList: [ // 客户状态
                {
                    label: '全部',
                    value: null
                },
                {
                    label: '待审核',
                    value: 1
                },
                {
                    label: '已通过',
                    value: 2
                },
                {
                    label: '已驳回',
                    value: 3
                }
            ],
            search: {
                pageNum: 1,
                pageSize: 10,
                keywords: '',
                data: {
                    customerId: null,
                    customerName: null,
                    followUserId: null,
                    companyType: null,
                    dataCategory: this.pageType, // 区分列表
                    products: null,
                    customerScale: null,
                    customerStatus: null,
                    moduleName: null
                }
            },
            total: null,
            list: [],
            titleList: [],
            minlist: [],
            isAll: false,
            isMinAll: false,
            dialog: {
                type: null,
                title: null,
                open: false
            },
            ths: [],
            isCrmCustomersExport: null, // 客户导出
            isCrmCustomersChangeManager: null, // 更换客户经理
            params: null, // 需要转移的客户
            managerlist: [], // 客户经理列表
            userInfo: null // 缓存中个人信息
        };
    },
    created () {
        this.init();
    },
    mounted () {
    },
    methods: {
        // 初始化
        init () {
            this.base();
            this.getCustom();
            this.getCustomerManager();
            this.getCompanyTypes();
            this.getMinList();
            this.getPersonScale();
        },
        // 页面初始准备
        base () {
            let user = localStorage.getItem('userInfo');
            if (user) {
                this.userInfo = JSON.parse(user);
            }
            // 查看权限表
            this.userInfo.permissions.forEach(e => {
                if (e === 'crm:customers:export') {
                    this.isCrmCustomersExport = '1';
                }
                if (e === 'crm:customers:changeManager') {
                    this.isCrmCustomersChangeManager = '1';
                }
            });
            // 潜在客户
            if (Number(this.pageType) === 3) {
                this.search.data.dataCategory = 2;
                this.search.data.customerStatus = 0;
                this.search.data.moduleName = 'potential_customers';
            } else {
                // 正式客户 客户分配
                this.search.data.dataCategory = this.pageType;
                this.search.data.moduleName = Number(this.pageType) === 2 ? 'customer_list' : 'customer_allocation_list';
            }
            this.http = process.env.API_ROOT_MAIN;
        },
        // 动态列表
        getCustom (isPageInit) {
            if (isPageInit) {
                this.search.pageNum = 1;
            }
            this.$http.post(this.$api.client.custom, this.search).then(res => {
                if (res.data.code === 0) {
                    res.data.data.data.list.forEach((e, idx) => {
                        e['check'] = false;
                        e['id'] = e[0];
                    });
                    this.list = res.data.data.data.list;
                    this.titleList = res.data.data.title;
                    this.total = res.data.data.data.total;
                    return;
                }
                this.$message.error(res.data.message);
            }).catch((e) => {
                console.log(e);
            });
        },
        // 自定义列表
        getMinList () {
            this.$http.get(`${this.$api.client.fieldList}?moduleName=${this.search.data.moduleName}`).then(res => {
                if (res.data.code === 0) {
                    this.minlist = res.data.data;
                    this.minlist.forEach(e => {
                        e['displaySort'] = 0;
                    });
                    return;
                }
                this.$message.error(res.data.message);
            }).catch((e) => {
                console.log(e);
            });
        },
        // 客户经理
        getCustomerManager () {
            this.$http.post(this.$api.client.operation, {companyId: this.userInfo.companyId}).then(res => {
                if (res.data.code === 0) {
                    this.managerlist = res.data.data;
                    return;
                }
                this.$message.error(res.data.message);
            }).catch((e) => {
                console.log(e);
            });
        },
        // 企业类型
        getCompanyTypes () {
            this.$http.get(this.$api.customer.dictionaryController + 'company_type').then(res => {
                if (res.data.code === 0) {
                    this.companyTypes = res.data.data;
                    return;
                }
                this.$message.error(res.data.message);
            }).catch((e) => {
                console.log(e);
            });
        },
        // 企业规模
        getPersonScale () {
            this.$http.get(this.$api.customer.dictionaryController + 'customer_scale').then(res => {
                if (res.data.code === 0) {
                    this.customerScales = res.data.data;
                    return;
                }
                this.$message.error(res.data.message);
            }).catch((e) => {
                console.log(e);
            });
        },
        // 初始化弹出框列表
        mininit () {
            this.minlist.forEach(e => {
                e['check'] = false;
            });
        },
        // 切换模态框
        dialogVisible (params, msg, type) {
            // 选中选项点击负责人
            (!params || params.length) && (this.dialog.open = true) && (this.params = params);
            if (!params || !this.msgWarning(params, msg)) return false;
            type === 2 && (this.dialog.title = this.pageType === '2' ? '更换客户经理' : '指派客户经理');
        },
        beforeRemove (file) {
            this.file = null;
        },
        // 全选
        allCheck (list) {
            this.isAll = !this.isAll;
            this.isAll ? this.for(true, list) : this.for(false, list);
        },
        minAllCheck () {
            this.isMinAll = !this.isMinAll;
        },
        // 基础遍历
        for (type, list) {
            list.forEach(item => {
                item.check = type;
            });
        },
        baseSelect (item, list) {
            item.check = !item.check;
            for (let e of list) {
                if (!e.check) {
                    this.isAll = false;
                    return;
                } else {
                    this.isAll = true;
                }
            }
        },
        confirm (params) {
            if (!this.msgWarning(params, '请选择客户')) return false;
            this.dialog.open = false;
        },
        // 0新增 1查看 2编辑
        jump (type, id) {
            if (type === 0) {
                if (this.title === '潜在客户') {
                    this.$router.push({name: 'addLurking'});
                } else {
                    this.$router.push({name: 'add'});
                }
            }
            if (type === 1) {
                this.$router.push({name: 'detail', query: {viewType: '1', id: id}});
            }
            if (type === 2) {
                this.$router.push({name: 'detail', query: {viewType: '2', id: id}});
            }
        },
        msgWarning (params, msg) {
            if (!params.length) {
                this.$message.warning(msg);
                return false;
            }
            return true;
        },
        // 获取选中的id
        idS (list) {
            let params = [];
            list.forEach(e => {
                if (e.check) {
                    params.push(e.id);
                }
            });
            return params;
        },
        // 切换分页
        turnPage (v) {
            this.search.pageNum = v;
            this.getCustom();
        },
        // 导入
        upload (file) {
            this.file = file;
        },
        // 导出
        exportDoc () {
            this.$http.post(this.$api.customer.export, this.search, {responseType: 'blob'}).then(res => {
                if (res.data.size > 0) {
                    this.download(res.data);
                    return;
                }
                this.$message.error('没有文件可下载');
            });
        },
        format (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        download (data) {
            let blob = new Blob([data]);
            let y, m, d, date, time;
            date = new Date();
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            time = y + '' + this.format(m) + '' + this.format(d);
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                if (Number(this.pageType) === 3) {
                    navigator.msSaveBlob(blob, `${time}潜在客户列表.xls`);
                } else {
                    navigator.msSaveBlob(blob, `${time}${Number(this.pageType) === 2 ? '客户列表' : '客户分配列表'}.xls`);
                }
            } else {
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                if (Number(this.pageType) === 3) {
                    link.setAttribute('download', `${time}潜在客户列表.xls`);
                } else {
                    link.setAttribute('download', `${time}${Number(this.pageType) === 2 ? '客户列表' : '客户分配列表'}.xls`);
                }
                document.body.appendChild(link);
                link.click();
            }
        },
        // 公用提交
        submit (type) {
            if (type === 0) {
                this.$http.delete(this.$api.client.delete, {data: {customerIds: this.params}}).then(res => {
                    if (res.data.code !== 0) {
                        this.$message.error(res.data.message);
                        return false;
                    }
                    this.getCustom();
                    this.dialog.open = false;
                    this.isAll = false;
                    this.$message.success(res.data.message);
                });
            }
            if (type === 1) {
                if (!this.file) {
                    this.$message.warning('请选择文件');
                    return false;
                }
                const _this = this;
                let formData = new FormData();
                let headers = {
                    'Content-Type': 'multipart/form-data'
                };
                formData.append('file', this.file.file);
                formData.append('storage', 'platform-mgmt');
                _this.$http.post(_this.$api.client.import, formData, headers)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            _this.getCustom();
                            _this.dialog.open = false;
                            _this.$message.success(res.data.message);
                            _this.fileList = [];
                            _this.file = null;
                            return;
                        }
                        _this.$message.error(res.data.message);
                    });
            }
            // 更换客户经理
            if (type === 2) {
                let msg = this.pageType === '2' ? '更换' : '指派';
                if (!this.userIds.length) {
                    this.$message.warning(`请选择要${msg}的客户经理`);
                    return false;
                }
                let params = {
                    customerIds: this.params,
                    userIds: this.userIds
                };
                this.$http.post(this.$api.client.changeManager, params).then(res => {
                    if (res.data.code !== 0) {
                        this.$message.error(res.data.message);
                        return false;
                    }
                    this.getCustom();
                    this.dialog.open = false;
                    this.$message.success(res.data.message);
                });
            }
            // 自定义
            if (type === 3) {
                let arr = [];
                this.minlist.forEach(e => {
                    e.checked && arr.push(e);
                });
                let params = {
                    definedFieldModels: arr,
                    moduleName: this.search.data.moduleName
                };
                this.$http.post(this.$api.client.configur, params).then(res => {
                    if (res.data.code !== 0) {
                        this.$message.error(res.data.message);
                        return false;
                    }
                    this.getCustom();
                    this.dialog.open = false;
                    this.$message.success(res.data.message);
                });
            }
        }
    }
};
</script>

<style scoped lang="scss">
.client {
    .client-tit-box {
        font-size: 16px;
        height: 35px;
        font-weight: bold;
        color: $color-title;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E7ECF1;
    }
    .total {
        margin: 20px 0;
        font-size: 12px;
        color: #666;
    }
    .search-wrap {
        padding: 20px 0;
        .search-btn {
            text-align: right;
            padding-right: 14px;
            .l {
                margin-right: 12px;
            }
            span {
                display: inline-block;
                position: relative;
                input {
                    padding-right: 20px;
                }
                .icon-search {
                    position: absolute;
                    right: 0;
                }
            }
        }
        .search-h {
            cursor: pointer;
        }
        .clearfix {
            .last {
                position: relative;
                .searchicon {
                    position: absolute;
                    right: 0;
                    bottom: 7px;
                    .icon-search:before {
                        color: #000;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    .button-wrap {
        float: right;
        font-size: 0;
        margin-bottom: 12px;
        button {
            margin-right: 10px;
        }
        button:last-child {
            margin-right: 0;
        }
    }
    .table-wrap {
        width: 1123px;
        overflow-x: auto;
        .gy-table {
            min-width: 100%;
            overflow: auto;
            td, th {
                white-space: nowrap;
            }
        }
    }
    .table-box {
        span {
            display: inline-block;
        }
        input, span {
            vertical-align: middle;
        }
    }
    .dele-wrap {
        img, div {
            display: inline-block;
            vertical-align: middle;
        }
    }
    .upload {
        display: inline-block;
    }
    .upload-wrap {
        margin: 0 auto;
        a {
            color: #409EFF;
            cursor: pointer;
        }
        .tips {
            margin: 15px 0;
        }
    }
    .transfer-box {
        .transfer-wrap {
            .gy-form-group {
                width: 80%;
                .l {
                    width: 100px;
                    padding-left: 7px;
                }
            }
        }
        .page-type {
            margin: 10px 0 0 8px;
        }
    }
    .custom-wrap {
        width: 100%;
        .item {
            width: 25%;
            margin-bottom: 10px;
            display: inline-block;
        }
    }
    .active {
        color: #E0370F;
        border-bottom: 1px solid #E0370F;
    }
    .page-type {
        font-size: 12px;
        color: #2A2A2A;
        line-height: 17px;
        .page-tips {
            color: #EEA443;
        }
    }
    .dialog-footer {
        button {
            margin-right: 10px;
        }
        button:last-child {
            margin-right: 0;
        }
    }
    .padding {
        padding: 0 16px;
    }
    .page-b {
        padding: 0 16px;
    }
    .nowrap {
        width: 150px;
        display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .last-td {
        text-align: center;
    }
    .null-msg {
        width: 100%;
        height: 39px;
        line-height: 39px;
        border: 1px solid #f2f2f2;
        border-top: 0;
        text-align: center;
    }
    .text-c {
        text-align: center;
    }
    .text-r {
        text-align: right;
    }
    /*.gy-form-group {*/
        /*padding-left: 119px;*/
        /*.l {*/
            /*width: 99px;*/
        /*}*/
    /*}*/
}
</style>
