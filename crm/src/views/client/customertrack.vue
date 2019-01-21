<template>
    <div class="customertrack">
        <div class="customertrack-tit">
            客户跟进
        </div>
         <div class="customertrack-warp">
            <div class="search-btn">
                <span class="l">
                    <input type="text" v-model="searchfrom.keywords" placeholder="请输入关键信息"><i class="iconfont icon-search" @click="getCollectionList()"></i>
                </span>
                <span @click="seniorSearch" class="search-h">高级搜索<i class="el-input__icon" :class="isSeniorSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
            </div>
            <div class="clearfixx clearfix">
                <div class="search-form" v-show="isSeniorSearch">
                    <div class="gy-form-group">
                        <span class="l">客户名称</span>
                        <!-- TODO -->
                        <input class="gy-input" v-model="searchfrom.customerName" placeholder="请输入" type="text">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">客户经理</span>
                        <el-select v-model="searchfrom.customerManagerId">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="item in customerManagerList"
                                :key="item.id"
                                :label="item.userName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group cl">
                        <span class="l">跟进状态</span>
                        <el-select v-model="searchfrom.trackStatusDictId">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="item in tradeModeOptionStatus"
                                :key="item.dictId"
                                :label="item.dictName"
                                :value="item.dictId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">跟进开始时间</span>
                        <div class="date-picker">
                            <el-date-picker
                                v-model="searchfrom.startDate"
                                type="datetime"
                                @focus="handleFocus"
                                :picker-options="startDateOptions"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">跟进结束时间</span>
                        <div class="date-picker">
                            <el-date-picker
                                v-model="searchfrom.endDate"
                                type="datetime"
                                @focus="handleFocus"
                                :picker-options="endDateOptions"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择">
                            </el-date-picker>
                            <span class="searchicon" @click="getCollectionList()"><i class="iconfont icon-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="customertrack-account-query-btns">
                <button class="gy-button-extra mr10" @click="addCustomer('add', '', customertit = '新增客户跟进')">新增</button>
                <button class="gy-button-normal" @click="deladdAll(customertit = '删除客户跟进')">删除</button>
            </div>
            <!-- 列表 -->
            <div class="table-box table-wrap">
                <table class="gy-table">
                    <thead>
                        <tr>
                            <th>
                                <input name="" type="checkbox" :checked="companySelectedList.length === followList.length && companySelectedList.length>0" @change="handleCheckAllChange" /><span>#</span>
                            </th>
                            <th>跟进时间</th>
                            <th>客户名称</th>
                            <th>联系人</th>
                            <th>联系人电话</th>
                            <th>跟进状态</th>
                            <th>跟进记录</th>
                            <th>客户经理</th>
                            <th>跟进人</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody v-if="followList.length !== 0">
                        <tr v-for="(item, index) in followList" :key="index">
                            <td class="wid70"><input name="" type="checkbox" :checked="companySelectedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)" /><span>{{index + 1}}</span></td>
                            <td class="wid150">{{item.trackDate?item.trackDate:"-"}}</td>
                            <td>{{item.customerName?item.customerName:"-"}}</td>
                            <td>{{item.contactUserName?item.contactUserName:"-"}}</td>
                            <td>{{item.contactUserMobile?item.contactUserMobile:"-"}}</td>
                            <td>{{item.trackStatusDictName?item.trackStatusDictName:"-"}}</td>
                            <td class="wid150"><span class="nowrap">{{item.content?item.content:"-"}}</span></td>
                            <td>
                                <span v-if="item.customerManagers.length !== 0" v-for="(itemList, indexList) in item.customerManagers" :key="indexList">{{itemList.userName}}
                                    <span v-if="item.customerManagers.length > indexList + 1 ">,</span>
                                </span>
                                <span v-if="item.customerManagers.length === 0">-</span>
                            </td>
                            <td>{{item.trackUserName?item.trackUserName:"-"}}</td>
                            <td>
                                <button class="gy-button-view" @click="addCustomer('look', item, customertit = '查看客户跟进')">查看</button>
                                <button class="gy-button-view" v-show="item.trackUserId===saveid" @click="addCustomer('save', item, customertit = '编辑客户跟进')">编辑</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="15" class="null-td" style="text-align:center">没有找到可显示的数据...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="departmentName" style="padding-left:16px;">共计{{itemTotal}}条记录</div>
            <div>
                <el-pagination
                    v-if="followList.length !== 0"
                    class="pagination-box"
                    style="margin: 20px 0 30px 0;"
                    background
                    @current-change="changeSelect"
                    @size-change="sizeChange"
                    layout="prev, pager, next"
                    :current-page.sync="pageNum"
                    :page-size="pageSize"
                    :total="itemTotal">
                </el-pagination>
            </div>
            <!-- 弹出框 -->
            <el-dialog :width="dialog.kwidth" class="addDialog AddressManagement" :title="customertit"
                    :visible.sync="dialogVisible">
                <!-- 删除 -->
                <div class="dele-wrap" v-if="dialog.type === 0">
                    <img src="../../assets/images/warning.png" alt="">
                    <div>请确认是否删除该条跟进信息。</div>
                </div>
                <!-- 开始 -->
                <div class="adrd-warp clearfix" v-if="dialog.type === 1">
                    <div class="gy-form-group" v-if="input_disabled">
                        <span class="l" :class="{'isrequired':!input_disabled}">客户经理</span>
                        <div class="nowrap">
                        <span v-if="addForm.customerManagers.length !== 0" v-for="(itemList, indexList) in addForm.customerManagers" :key="indexList">{{itemList.userName}}
                            <span v-if="addForm.customerManagers.length > indexList + 1 ">,</span>
                        </span>
                        <span v-if="addForm.customerManagers.length === 0">-</span>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l" :class="{'isrequired':!input_disabled}">客户名称</span>
                        <span class="nowrap" v-if="input_disabled">{{addForm.customerId}}</span>
                        <el-select v-if="!input_disabled" v-model="addForm.customerId" value-key="id" @change="customerSel" placeholder="请选择">
                            <el-option
                                v-for="item in tradeModeOptions"
                                :key="item.id"
                                :label="item.customerName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group">
                        <span class="l" :class="{'isrequired':!input_disabled}">跟进状态</span>
                        <span v-if="input_disabled">{{addForm.trackStatusDictName}}</span>
                        <el-select v-if="!input_disabled" v-model="addForm.trackStatusDictId">
                            <!-- <el-option label="全部" value=""></el-option> -->
                            <el-option
                                v-for="item in tradeModeOptionStatus"
                                :key="item.dictId"
                                :label="item.dictName"
                                :value="item.dictId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group">
                        <span class="l" :class="{'isrequired':!input_disabled}">联系人</span>
                        <span v-if="input_disabled">{{addForm.contactUserId}}</span>
                        <el-select v-if="!input_disabled" v-model="addForm.contactUserId" placeholder="请选择">
                            <el-option
                                v-for="itemcontacts in tradeModeOptionsList"
                                :key="itemcontacts.id"
                                :label="itemcontacts.contactName"
                                :value="itemcontacts.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group" v-if="input_disabled">
                        <span class="l" :class="{'isrequired':!input_disabled}">联系人电话</span>
                        <div class="nowrap">{{addForm.contactUserMobile}}</div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l" :class="{'isrequired':!input_disabled}">跟进时间</span>
                        <span v-if="input_disabled">{{addForm.trackDate}}</span>

                            <el-date-picker
                                v-if="!input_disabled"
                                v-model="addForm.trackDate"
                                type="datetime"
                                @focus="handleFocus"
                                :picker-options="startDateOptions"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择">
                            </el-date-picker>

                    </div>
                    <div class="gy-form-group" v-if="input_disabled">
                        <span class="l" :class="{'isrequired':!input_disabled}">跟进人</span>
                        <div class="nowrap">{{addForm.trackUserName}}</div>
                    </div>
                    <div class="gy-form-group single-row clearfix">
                        <span class="l" :class="{'isrequired':!input_disabled}">跟进记录</span>
                        <span v-if="input_disabled">{{addForm.content}}</span>
                        <textarea placeholder="请填写" class="gy-textarea" v-model="addForm.content" v-if="!input_disabled" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <!-- 结束 -->
                <div class="adddialog-footer" v-if="lookdispaly">
                    <span slot="footer" class="dialog-footer fr">
                        <!-- 新增确定 -->
                        <button class="gy-button-extra confirmations" v-if="dialog.type === 1" @click="notarizefloow('addform')">确定</button>
                        <!-- 删除确定 -->
                        <button class="gy-button-extra confirmations" v-if="dialog.type === 0" @click="romovefloow('addform')">确定</button>
                        <button class="gy-button-normal" @click="dialogVisible = false">取消</button>
                    </span>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import filters from '@/config/filter';
export default {
    name: 'customertrack',
    data () {
        return {
            isrequired: {
                input_disabled: false
            },
            lookdispaly: true,
            input_disabled: false,
            companySelectedList: [],
            checkAll: false,
            compileTrackId: '',
            customertit: '',
            removeId: '',
            companyId: JSON.parse(localStorage.getItem('userInfo')).companyId,
            saveid: JSON.parse(localStorage.getItem('userInfo')).id,
            dialogVisible: false,
            isSeniorSearch: false,
            dialog: {
                type: null,
                title: null,
                open: false,
                kwidth: null
            },
            followList: [],
            tradeModeOptions: [],
            tradeModeOptionsList: [],
            tradeModeOptionStatus: [],
            customerManagerList: [],
            searchfrom: {
                customerId: '',
                customerManagerId: null,
                customerName: '',
                startDate: '',
                endDate: '',
                trackStatusDictId: null,
                keywords: ''
            },
            addForm: {
                contactUserId: '',
                content: '',
                customerId: '',
                trackDate: '',
                trackStatusDictId: '',
                customerName: '',
                contactUserName: '',
                contactUserMobile: ''
            },
            pageNum: 1,
            pageSize: 10,
            itemTotal: 0,
            startDateOptions: {
                // disabledDate: (time) => {
                //     if (this.endDate) {
                //         return time.getTime() > this.endDate;
                //     }
                //     return time.getTime() > Date.now();
                // }
            },
            endDateOptions: {
                // disabledDate: (time) => {
                //     if (this.startDate) {
                //         return time.getTime() < this.s;
                //     }
                //     return time.getTime() > Date.now();
                // }
            }

        };
    },
    created () {
        this.getCollectionList(); // 跟进列表
        this.getCompanyLinkman(); // 获得公司
        this.getControllerStatus(); // 获得跟进状态
        this.getCustomerManager(); // 获得经理
    },
    methods: {
        // 获得经理
        getCustomerManager () {
            const me = this;
            let params = {
                companyId: this.companyId
            };
            me.$http.post(me.$api.customer.customermanager, params)
                .then(function (response) {
                    console.log(response);
                    if (response.data.code === 0) {
                        me.customerManagerList = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 获得跟进状态
        getControllerStatus () {
            const me = this;
            me.$http.get(me.$api.customer.dictionaryController + 'track_status')
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.tradeModeOptionStatus = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 获得公司
        getCompanyLinkman () {
            const me = this;
            me.$http.get(me.$api.customer.customerList)
                .then(function (response) {
                    // console.log(response);
                    if (response.data.code === 0) {
                        me.tradeModeOptions = response.data.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 跟进列表
        getCollectionList () {
            const me = this;
            let params = {
                data: {
                    customerId: this.searchfrom.contactUserId, // 公司名称
                    customerManagerId: this.searchfrom.customerManagerId, // 客户经理id
                    customerName: this.searchfrom.customerName, // 客户名称
                    startDate: this.searchfrom.startDate, // 开始时间
                    endDate: this.searchfrom.endDate, // 结束时间
                    trackStatusDictId: this.searchfrom.trackStatusDictId // 跟进状态id
                },
                pageNum: me.pageNum,
                pageSize: me.pageSize,
                keywords: me.searchfrom.keywords
            };
            me.$http.post(me.$api.customer.customersearch, params)
                .then(function (response) {
                    if (response.data.code === 0) {
                        let resData = response.data.data.list;
                        resData.forEach(item => {
                            item.payTime = me.$tools.parseDate(item.payTime);
                        });
                        resData.map(function (item) {
                            item.trackDate = filters.date(item.trackDate, true);
                        });
                        me.followList = resData;
                        me.itemTotal = response.data.data.total;
                        me.pageNum = response.data.data.pageNum;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 显示
        seniorSearch () {
            this.isSeniorSearch = !this.isSeniorSearch;
        },
        handleFocus () {
            this.isWeek = false;
            this.isMonth = false;
        },
        // 弹框
        addCustomer (option, row, formName) {
            console.log(option);
            this.dialog.kwidth = '50%';
            this.dialog.type = 1;
            if (option === 'add') {
                this.lookdispaly = true;
                this.input_disabled = false;
                this.dialogVisible = true;
                this.addForm = {
                    contactUserId: null,
                    content: null,
                    customerId: null,
                    trackDate: null,
                    trackStatusDictId: null
                };
            } else if (option === 'save') {
                this.lookdispaly = true;
                this.input_disabled = false;
                console.log(row.trackUserId);
                if (this.saveid === row.trackUserId) {
                    this.dialogVisible = true;
                    this.addForm = Object.assign({}, row);
                    this.addForm.customerId = Number(row.customerId);
                    this.addForm.contactUserId = Number(row.contactUserId);
                    this.customerSel(row.customerId, 'save');
                    console.log(row);
                    this.compileTrackId = row.id;
                } else {
                    this.$message.error('只能编辑自己录入的跟进信息');
                }
            } else {
                this.lookdispaly = false;
                console.log(row);
                this.input_disabled = true;
                console.log('aa');
                this.dialogVisible = true;
                this.addForm = Object.assign({}, row);
                this.addForm.customerId = row.customerName;
                this.addForm.contactUserId = row.contactUserName;
            }
        },
        // 动态获取公司里面的员工
        customerSel (val, save) {
            console.log(save);
            if (save !== 'save') {
                console.log('aa');
                this.addForm.contactUserId = '';
            }
            this.getCompanyLinkman();
            let value = this.tradeModeOptions.filter(function (x) {
                return x.id === val;
            });
            if (value[0].contacts) {
                this.tradeModeOptionsList = value[0].contacts;
            }
            console.log(this.tradeModeOptionsList);
        },
        changeSelect (pageNum) {
            this.pageNum = pageNum;
            this.getCollectionList();
        },
        sizeChange (val) {
            this.pageSize = val;
        },
        // 验证
        checkDialogData () {
            let flag = true;
            let data = [
                {value: this.addForm.customerId, msg: '客户名称不能为空'},
                {value: this.addForm.trackStatusDictId, msg: '跟进状态不能为空'},
                {value: this.addForm.contactUserId, msg: '联系人不能为空'},
                {value: this.addForm.trackDate, msg: '时间不能为空'},
                {value: this.addForm.content, msg: '跟进记录不能为空'}
            ];
            for (let i = 0; i < data.length; i++) {
                if (!data[i].value && data[i].value !== 0) {
                    this.$message({message: data[i].msg, type: 'error'});
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        // 新增
        notarizefloow (addform, saveId) {
            if (!this.checkDialogData()) {
                return false;
            }
            if (this.customertit === '编辑客户跟进') {
                console.log(saveId);
                this.$http.put(this.$api.customer.amendcustomer + this.compileTrackId, {
                    contactUserId: this.addForm.contactUserId,
                    content: this.addForm.content,
                    customerId: this.addForm.customerId,
                    trackDate: this.addForm.trackDate,
                    trackStatusDictId: this.addForm.trackStatusDictId
                }).then(res => {
                    // console.log(res.data);
                    if (res.data.code === 0) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.getCollectionList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            } else {
                this.$http.post(this.$api.customer.addcustomer, {
                    contactUserId: this.addForm.contactUserId,
                    content: this.addForm.content,
                    customerId: this.addForm.customerId,
                    trackDate: this.addForm.trackDate,
                    trackStatusDictId: this.addForm.trackStatusDictId
                }).then(res => {
                    // console.log(res);
                    if (res.data.code === 0) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.getCollectionList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            }
        },
        // 选择
        handleCheckChange (id) {
            let idx = this.companySelectedList.indexOf(id);
            idx >= 0 ? this.companySelectedList.splice(idx, 1) : this.companySelectedList.push(id);
            console.log(this.companySelectedList);
        },
        handleCheckAllChange () {
            this.checkAll = !this.checkAll;
            if (this.checkAll) {
                this.companySelectedList = [];
                this.followList.forEach(item => {
                    this.companySelectedList.push(item.id);
                }, this);
                console.log(this.companySelectedList);
                return;
            }
            this.companySelectedList = [];
        },
        // 批量删除
        deladdAll () {
            console.log(this.companySelectedList.length === 0);
            if (this.companySelectedList.length === 0) {
                this.$message({message: '请选择删除跟进客户', type: 'warning'});
                // .then(() => {
                // });
            } else {
                this.dialog.type = 0;
                this.dialogVisible = true;
                this.dialog.kwidth = '30%';
                // this.$alert('确认删除该角色？', '提示')
                // this.$confirm('请确认是否删除该条客户跟进信息', '提示', {
                //     confirmButtonText: '确定',
                //     confirmButtonClass: 'gy-button-extra',
                //     cancelButtonText: '取消',
                //     cancelButtonClass: 'gy-button-normal',
                //     type: 'warning'
                // })
                //     .then(() => {
                //         this.$http.put(this.$api.customer.customerdelete,
                //             this.companySelectedList
                //         ).then(res => {
                //             this.companySelectedList = [];
                //             if (res.data.code === 0) {
                //             // this.$alert('删除客户跟进信息成功', '提示')
                //             // .then(() => {
                //                 this.getCollectionList();
                //                 this.checkAll = false;
                //             // });
                //             } else {
                //                 this.$alert(res.data.message, '提示')
                //                     .then(() => {
                //                         this.checkAll = false;
                //                     });
                //             }
                //         });
                //     });
            }
        },
        romovefloow () {
            this.$http.put(this.$api.customer.customerdelete,
                this.companySelectedList
            ).then(res => {
                this.companySelectedList = [];
                if (res.data.code === 0) {
                    this.getCollectionList();
                    this.dialogVisible = false;
                    this.checkAll = false;
                    this.$message({message: '成功', type: 'success'});
                } else {
                    this.dialogVisible = false;
                    this.$alert(res.data.message, '提示')
                        .then(() => {
                            this.checkAll = false;
                        });
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
    .customertrack{
        .mr10{
            margin-right: 10px;
        }
        .customertrack-warp{
            padding: 20px 0;
            .search-btn {
                padding: 0 30px 0 0;
                text-align: right;
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
            .clearfixx {
                .gy-form-group{
                    padding: 6px 30px 6px 124px;
                    min-height: 35px;
                }
                .l{
                    width: auto;
                    padding-left: 30px;
                }
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
        .isrequired::before {
            content: "*";
            color: #e0370f;
            font-size: 12px;
            font-weight: 400;
            position: absolute;
            margin-left: -8px;
            left: 0px;
            top: 0;
        }
        .dele-wrap {
        img, div {
            display: inline-block;
            vertical-align: middle;
            }
        }
        .customertrack-tit{
            padding: 3px 16px;
            font-size: 16px;
            color: #333333;
            font-weight: bold;
            border-bottom: 1px solid #E7ECF1;
        }
        .customertrack-account-query-btns {
            margin: 20px 16px 10px 0;
            text-align: right;
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
            margin: 10px 16px 0 16px;
            input, span {
                vertical-align: middle;
            }
            .nowrap {
                width: 150px;
                display: block;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        .addDialog {
            .isrequired::before {
                left: 0px;
            }
            .gy-form-group{
                padding: 8px 30px 8px 108px;
                .l{
                    padding-left: 0;
                }
                .nowrap {
                    width: 332px;
                    display: block;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
            .adddialog-footer{
                width:100%;
                height:18px;
                padding: 0 30px;
                margin: 22px auto;
            };
            .confirmations {
                margin-right: 10px;
            }
        }

    }

</style>
<style lang="scss">
    .AddressManagement .el-dialog__header {
        border-bottom: 1px solid #DCE0E4;
        padding: 15px;
    }
    .customertrack .el-dialog__body {
        padding: 10px 0px 15px 30px;
    }
    .el-message-box__wrapper .el-button--primary{
        background:#e0370f;
        border-color:#e0370f;
    }
</style>
