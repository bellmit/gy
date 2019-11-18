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
                        <span class="l">企业名称</span>
                        <input v-model="search.data.customerName" class="gy-input" type="text" placeholder="请输入">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">企业编号</span>
                        <input v-model="search.data.customerId" class="gy-input" type="text" placeholder="请输入">
                    </div>
                    <div class="gy-form-group cl">
                        <span class="l">交易品种</span>
                        <input v-model="search.data.products" class="gy-input" type="text" placeholder="请输入">
                    </div>
                    <div class="gy-form-group" v-if="pageType === '2'">
                        <span class="l">客户经理</span>
                        <el-select v-model="search.data.followUserId">
                            <el-option label="全部" :value="whole"></el-option>
                            <el-option
                            v-for="(item, index) in managerlistSearch"
                            :key="index"
                            :label="item.userName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">企业类型</span>
                        <el-select v-model="search.data.companyType">
                            <el-option label="全部" :value="whole"></el-option>
                            <el-option
                            v-for="(item, index) in companyTypes"
                            :key="index"
                            :label="item.dictName"
                            :value="item.dictId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">客户来源</span>
                        <el-select v-model="search.data.customerFrom">
                            <el-option label="全部" :value="whole"></el-option>
                            <el-option
                                v-for="(item, index) in customerSourceList"
                                :key="index"
                                :label="item"
                                :value="item">
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
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">跟进组</span>
                        <el-popover
                            width="400"
                            ref="menuListPopover"
                            placement="bottom-start"
                            trigger="click">
                            <el-tree
                                :data="menuList"
                                show-checkbox
                                :props="menuListTreeProps"
                                node-key="id"
                                ref="menuListTree"
                                @check-change="menuListTreeCurrentChangeHandle"
                                :highlight-current="true"
                                :expand-on-click-node="false"><!--:default-expand-all="true"-->
                            </el-tree>
                        </el-popover>
                        <el-input v-model="search.data.usrOrganizationId" v-popover:menuListPopover :readonly="true" placeholder="请选择" class="menu-list__input"></el-input>
                        <!-- <el-select v-model="search.data.usrOrganizationId">
                            <el-option label="全部" :value="whole"></el-option>
                            <el-option
                            v-for="(item, index) in followUpGroupList"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select> -->
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">现场签约</span>
                        <el-select v-model="search.data.spotContract">
                            <el-option label="全部" :value="whole"></el-option>
                            <el-option
                            v-for="(item, index) in spotContracttype"
                            :key="index"
                            :label="item.spotContName"
                            :value="item.spotContractId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group last" v-if="Number(pageType) === 2">
                        <span class="l">跟进状态</span>
                        <el-select v-model="search.data.trackStatusDictId">
                            <el-option label="全部" :value="whole"></el-option>
                            <el-option
                                v-for="item in tradeModeOptionStatusList"
                                :key="item.dictId"
                                :label="item.dictName"
                                :value="item.dictId">
                            </el-option>
                        </el-select>
                    </div>
                     <div class="gy-form-group cl">
                        <span class="l">录入开始时间</span>
                        <div class="date-picker">
                            <el-date-picker
                                v-model="search.data.startDate"
                                type="datetime"
                                @focus="handleFocus"
                                :picker-options="startDateOptions"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="gy-form-group last">
                        <span class="l">录入结束时间</span>
                        <div class="date-picker">
                            <el-date-picker
                                v-model="search.data.endDate"
                                type="datetime"
                                @focus="handleFocus"
                                :picker-options="endDateOptions"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder = "请选择">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="gy-form-group last ">
                        <span class="l">入驻意向</span>
                        <el-select v-model="search.data.enterIntention">
                            <el-option label="全部" :value="whole"></el-option>
                            <el-option
                            v-for="(item, index) in enterIntentiontype"
                            :key="index"
                            :label="item.enterIntentionName"
                            :value="item.enterIntentionId">
                            </el-option>
                        </el-select>
                        <span class="searchicon" @click="turnPage(1)"><i class="iconfont icon-search"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 功能键 -->
        <div class="clearfix">
            <!-- 客户列表页 -->
            <div class="button-wrap" v-if="Number(pageType) === 2">
                <button class="gy-button-extra" @click="jump(0)">新增客户</button>
                <!-- <button class="gy-button-extra" @click="newFollow()">跟进</button> -->
                <button class="gy-button-normal" @click="dialogVisibles(idS(list), '请选择要删除的客户', dialog.type = 0, '删除', dialog.title = '提示')">删除</button>
                <button class="gy-button-normal" @click="dialogVisibles(null, dialog.title = '导入客户', dialog.type = 1)">导入</button>
                <button class="gy-button-normal" @click="exportDoc" v-if="isCrmCustomersExport === '1'">导出</button>
                <button class="gy-button-normal" @click="dialogVisibles(idS(list), '请选择客户', dialog.type = 2, '更换客户经理')" v-if="isCrmCustomersChangeManager === '1'">
                    <span >更换客户经理</span>
                </button>
                <button class="gy-button-normal" @click="dialogVisibles(null, dialog.title = '自定义列表', dialog.type = 3)">自定义列表</button>
            </div>
            <!-- 客户分配页 -->
            <div class="button-wrap" v-if="Number(pageType) === 1">
                <button class="gy-button-normal" @click="dialogVisibles(idS(list), '请选择要删除的客户', dialog.type = 0, '删除', dialog.title = '提示')" v-if="isDelect === '1'">删除</button>
                <button class="gy-button-normal" @click="exportDoc" v-if="isexport === '1'">导出</button>
                <button class="gy-button-normal" @click="dialogVisibles(idS(list), '请选择客户', dialog.type = 2, '指派客户经理')" v-if="isAppointChangeManager === '1'">
                    <span>指派客户经理</span>
                </button>
                <button class="gy-button-normal" @click="dialogVisibles(null, dialog.title = '自定义列表', dialog.type = 3)">自定义列表</button>
            </div>
        </div>
        <!-- 动态列表 -->
        <div class="table-wraps">
            <div class="table-box table-wrap">
                <table class="table-client">
                    <thead>
                        <tr>
                            <th class="operationList">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items, indexd) in list" :key="indexd">
                            <td class="operation-tr">
                                <span>
                                    <button class="gy-button-view" v-if="items[1] === 0" @click="jump(1, items.id, 1)">查看</button>
                                    <button class="gy-button-view" v-if="items[1] === 1" @click="jump(2, items.id)">编辑</button>
                                    <button class="gy-button-view" v-if="items[1] === 1 && Number(pageType) === 2" @click="newFollow(items[3])">跟进</button>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="gy-table customer-list">
                    <thead>
                        <tr>
                            <th class="tt">
                                <input name="" type="checkbox" :checked="isAll" @click="allCheck(list)" />
                            </th>
                            <th>企业编号</th>
                            <th v-for="(item, index) in titleList" :key="index">{{item.cnName}}</th>
                            <th class="last-td">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items, index) in list" :key="index" class="listHeight">
                            <td class="text-c">
                                <input name="" type="checkbox" :checked="items.check" @click="baseSelect(items, list)" />
                            </td>
                            <td @click="lookCustomer(items.id, pageType)" v-for="(item, idx) in items" :key="idx" v-show="idx > 1" :class="{'text-r': titleList[idx - 3] && titleList[idx - 3].fieldType === 3}">
                                <span v-if="titleList[idx - 3] && titleList[idx - 3].fieldType === 4">
                                    <span v-if="item !== '-'">{{item | date}}</span>
                                    <span v-else>{{'-'}}</span>
                                </span>
                                <span v-else-if="titleList[idx - 3] && titleList[idx - 3].fieldType === 3">
                                    <span v-if="item">{{item | numToCash(4)}}</span>
                                    <span v-else>{{'-'}}</span>
                                </span>
                                <span class="nowrap" v-else-if="titleList[idx - 3] && titleList[idx - 3].enName === 'products'">{{item}}</span>
                                <span v-else>{{item || '-'}}</span>
                            </td>
                            <td class="last-td">
                                <!-- // 由于数据结构的问题 items[0]不会变动 为id -->
                                <button class="gy-button-view" v-if="items[1] === 0" @click="jump(1, items.id, 1)">查看</button>
                                <button class="gy-button-view" v-if="items[1] === 1" @click="jump(2, items.id)">编辑</button>
                                <button class="gy-button-view">跟进</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="null-msg" v-if="list.length === 0">没有找到可显示的数据...</div>
            </div>
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
    <!-- 弹出框 -->
    <el-dialog width="50%" class="addDialog AddressManagement" :title="customertit"
            :visible.sync="dialogVisible" v-if="dialogVisible">
        <div class="gy-form-group">
            <span class="l" :class="{'isrequired':input_disabled}">客户名称</span>
            <div class="product-list">
                <input  placeholder="请输入"  type="text" class="gy-input" v-model="keywords" @keyup="getList"  @keyup.13="handleGetList" @click="empty" :disabled="forbidden">
                <ul v-show="showList" v-clickOutside="handleHiddenList">
                    <li v-for="(item, index) in listUp" :key="index" @click="handleList(item)" v-if="listUp.length > 0">{{item.customerName}}</li>
                    <li class="none-tips" v-if="listUp.length === 0">没有搜到相关公司</li>
                </ul>
                <i v-if="!forbidden" class="iconfont icon-mySearch my-icon-jj" @click="handleGetList"></i>
            </div>
        </div>
        <div class="gy-form-group">
            <span class="l" :class="{'isrequired':input_disabled}">跟进状态</span>
            <el-select v-model="addForm.trackStatusDictId"  placeholder="请选择">
                <el-option
                    v-for="item in tradeModeOptionStatus"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                </el-option>
            </el-select>
        </div>
        <div class="gy-form-group clearfix">
            <span class="l" :class="{'isrequired':input_disabled}">联系人</span>
            <el-select v-model="addForm.contactUserId" placeholder="请选择">
                <el-option
                    v-for="itemcontacts in tradeModeOptionsList"
                    :key="itemcontacts.id"
                    :label="itemcontacts.contactName"
                    :value="itemcontacts.id">
                </el-option>
            </el-select>
        </div>
        <div class="gy-form-group single-row clearfix">
            <span class="l" :class="{'isrequired':input_disabled}">跟进记录</span>
            <textarea placeholder="请填写" class="gy-textarea" v-model="addForm.content" cols="30" rows="10"></textarea>
        </div>
        <div style="clear:both"></div>

        <div class="adddialog-footer clearfix">
                <!-- 新增确定 -->
            <button class="gy-button-extra confirmations" @click="notarizefloow('addform')" v-if="customertit === '新增跟进'">确定</button>
            <button class="gy-button-extra confirmations" @click="customersList()" v-if="customertit === '编辑'">确定</button>
            <button class="gy-button-normal" @click="dialogVisible = false">取消</button>
        </div>
        <div style="clear:both"></div>
    </el-dialog>
    <!-- 弹出框   跟进记录 -->
    <el-dialog width="50%" top="0" class="addDialog AddressManagement follow-up-record" title="跟进记录"
            :visible.sync="dialogVisibleFollow">
        <table class="gy-table">
            <thead>
                <!-- <th></th> -->
                <th>跟进时间</th>
                <th>联系人</th>
                <th>跟进状态</th>
                <th>跟进记录</th>
                <th>跟进人</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in recordList" :key="index">
                    <!-- <td style="text-align:right;"><i class="iconfont icon-shanchu" @click="removefollow(item)"></i></td> -->
                    <td>{{item.createdDate | date(true)}}</td>
                    <td>{{item.contactUserName}}</td>
                    <td>{{item.trackStatusDictName}}</td>
                    <td class="wid450">
                        <el-tooltip poper-class="test" :content="item.content" :disabled="(item.content && item.content.replace(/[^x00-xff]/g, 'aa').length > 12)? disabled : !disabled" placement="top" effect="light">
                            <span class="nowrap">{{item.content?item.content:"-"}}</span>
                        </el-tooltip>
                    </td>
                    <td>{{item.trackUserName}}</td>
                    <td class="option">
                        <button class="gy-button-view" v-show="item.trackUserId===saveid" @click="addCustomers(item)">编辑</button>
                        <button class="gy-button-view" v-show="item.trackUserId===saveid" @click="removefollow(item)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </el-dialog>
  </div>
</template>

<script>

const clickOutside = {
    bind (el, binding) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind (el) {
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    }
};
export default {
    directives: {
        clickOutside
    },
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
                    label: '未认证',
                    value: 0
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
            erpSystemtype: [{erpSystemId: 0, erpSystemName: '无'}, {erpSystemId: 1, erpSystemName: '有'}], // ERP系统
            oaSystemtype: [{oaSystemId: 0, oaSystemName: '无'}, {oaSystemId: 1, oaSystemName: '有'}], // OA系统
            spotContracttype: [{spotContractId: 0, spotContName: '否'}, {spotContractId: 1, spotContName: '是'}], // 现场签约
            enterIntentiontype: [{enterIntentionId: 0, enterIntentionName: '否'}, {enterIntentionId: 1, enterIntentionName: '是'}], // 入驻意向
            search: {
                pageNum: 1,
                pageSize: 10,
                keywords: '',
                data: {
                    customerId: null,
                    customerName: null,
                    followUserId: JSON.parse(localStorage.getItem('userInfo')).id,
                    companyType: null,
                    dataCategory: this.pageType, // 区分列表
                    products: null,
                    customerScale: null,
                    customerStatus: null,
                    moduleName: null,
                    erpSystem: null, // ERP系统  0 无；1 有
                    oaSystem: null, // OA系统  0 无；1 有
                    spotContract: null, //  现场签约 0 否；1 是
                    enterIntention: null, // 入驻意向 0 否；1 是
                    trackStatusDictId: null, // 跟进状态
                    organizationIdList: [] // 跟进组
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
            isAppointChangeManager: null, // 指定客户经理
            isDelect: null, // 删除
            isexport: null, // 导出
            params: null, // 需要转移的客户
            managerlist: [], // 客户经理列表
            managerlistSearch: [], // 客户经理-列表-搜索
            userInfo: null, // 缓存中个人信息
            endDateOptions: {
                disabledDate: (time) => {
                    if (this.search.data.startDate) {
                        return time.getTime() < this.search.data.startDate;
                    }
                    return time.getTime() < this.search.data.startDate;
                }
            },
            startDateOptions: {},
            dialogVisible: false,
            dialogVisibleFollow: false,
            input_disabled: true,
            customertit: '新增跟进',
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
            tradeModeOptionStatus: [],
            tradeModeOptionStatusList: [], // 列表
            tradeModeOptionsList: [],
            customerSourceList: [], // 客户来源
            followUpGroupList: [], // 跟进组
            menuList: [],
            menuListTreeProps: {
                children: 'list',
                label: 'name'
            },
            listUp: [],
            showList: false,
            keywords: '',
            forbidden: false,
            recordId: null,
            detailfollow: false,
            recordList: [],
            disabled: false,
            saveid: JSON.parse(localStorage.getItem('userInfo')).id,
            checkBoer: false,
            valudId: null,
            whole: null
        };
    },
    watch: {
        recordId (newval, oldval) {
            this.detailfollow = true;
        }
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
            this.getCustomerManagerSearch();
            this.getCompanyTypes();
            this.getMinList();
            this.getPersonScale();
            this.getControllerStatus(); // 获得跟进状态
            this.getcustomerSource(); // 获取客户来源
            this.followUpGroup(); // 获取跟进组
            this.getOrganizationList();
        },
        // ------------------------新增跟进--------------------------
        // 新增跟进
        newFollow (value) {
            this.dialogVisible = true;
            this.input_disabled = true;
            this.keywords = '';
            this.tradeModeOptionsList = [];
            this.addForm.contactUserId = null;
            this.addForm.trackStatusDictId = null;
            this.addForm.content = null;
            if (value) {
                this.keywords = value;
                this.handleGetList('false');
            }
        },
        // 客户来源
        getcustomerSource () {
            this.$http.get(this.$api.customer.customerFrom)
                .then(res => {
                    if (res.data.code === 0) {
                        this.customerSourceList = res.data.data;
                        console.log(this.customerSourceList);
                    }
                });
        },
        // 跟进组
        followUpGroup () {
            this.$http.get(this.$api.customer.floorOrganizations)
                .then(res => {
                    if (res.data.code === 0) {
                        this.followUpGroupList = res.data.data;
                    }
                });
        },
        // 跟进组
        getOrganizationList () {
            this.$http.get(this.$api.organizational.organizationalList + '/' + 0)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.menuList = res.data.data[0].list;
                    }
                });
        },
        // 根据客户id获取客户跟
        lookCustomer (customerId, value) {
            this.recordId = customerId;
            this.detailfollow = !this.detailfollow;
            this.$http.get(this.$api.customer.amendcustomer + customerId)
                .then(response => {
                    if (response.data.code === 0) {
                        if (response.data.data.length === 0) {
                            this.recordList = [];
                            if (this.dialogVisibleFollow === true) {
                                this.dialogVisibleFollow = false;
                                return;
                            }
                            if (value === '2') {
                                this.$message.error('暂时没有跟进记录!');
                            }
                        } else {
                            this.recordList = response.data.data;
                            if (value === '2') {
                                this.dialogVisibleFollow = true;
                            }
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
        },
        getList (e) {
            this.lastTime = e.timeStamp;
            setTimeout(() => {
                if (this.lastTime === e.timeStamp && this.keywords && this.keywords.length > 2) {
                    this.handleGetList();
                }
            }, 500);
        },
        handleGetList (value) {
            this.$http.get(this.$api.customer.customerSearchList + '?name=' + encodeURI(this.keywords)).then(res => {
                this.listUp = res.data.data.data;
                if (value === 'false') {
                    this.showList = false;
                    this.tradeModeOptionsList = this.listUp[0].contacts;
                    this.addForm.customerName = this.listUp[0].customerName;
                    this.addForm.customerId = this.listUp[0].id;
                } else {
                    this.showList = true;
                }
            });
        },
        handleHiddenList () {
            this.showList = false;
        },
        handleList (value) {
            this.keywords = value.customerName;
            this.addForm.customerName = value.customerName;
            this.addForm.customerId = value.id;
            this.showList = false;
            if (value.contacts) {
                this.tradeModeOptionsList = value.contacts;
            } else {
                this.tradeModeOptionsList = [];
                this.addForm.contactUserId = '';
            }
        },
        empty () {
            this.keywords = '';
            this.addForm.customerName = null;
            this.addForm.customerId = null;
            this.tradeModeOptionsList = [];
            this.addForm.contactUserId = '';
            this.showList = false;
        },
        // 获得跟进状态
        getControllerStatus () {
            const me = this;
            me.$http.get(me.$api.customer.dictionaryController + 'track_status')
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.tradeModeOptionStatus = response.data.data.concat();
                        me.tradeModeOptionStatusList = response.data.data;
                        let trade = {
                            dictCategory: 'track_status',
                            dictId: 0,
                            dictName: '未跟进'
                        };
                        me.tradeModeOptionStatusList.push(trade);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 验证
        checkDialogData () {
            let flag = true;
            let data = [
                {value: this.addForm.customerId, msg: '客户名称不能为空'},
                {value: this.addForm.trackStatusDictId, msg: '跟进状态不能为空'},
                {value: this.addForm.contactUserId, msg: '联系人不能为空'},
                // {value: this.addForm.trackDate, msg: '时间不能为空'},
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
        // 跟进组树选中
        menuListTreeCurrentChangeHandle (data, node, ziterr) {
            console.log(data, node, ziterr);
            this.search.data.organizationIdList = this.$refs.menuListTree.getCheckedKeys();
            // this.search.data.usrOrganizationId = data.name;
        },
        notarizefloow () {
            if (!this.checkDialogData()) {
                return false;
            }
            this.$http.post(this.$api.customer.addcustomer, {
                contactUserId: this.addForm.contactUserId,
                content: this.addForm.content,
                customerId: this.addForm.customerId,
                trackDate: this.addForm.trackDate,
                trackStatusDictId: this.addForm.trackStatusDictId
            }).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.getCustom();
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 全选
        handleSelectionChange () {
            console.log('全选');
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
                if (e === 'customer:allocationFollowup') {
                    this.isAppointChangeManager = '1';
                }
                if (e === 'customer:allocationDelete') {
                    this.isDelect = '1';
                }
                if (e === 'customer: export') {
                    this.isexport = '1';
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
                    // let titleObj = [];
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
        handleFocus () {
            this.isWeek = false;
            this.isMonth = false;
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
        // 客户列表-客户经理-搜索
        getCustomerManagerSearch () {
            this.$http.get(this.$api.client.operations).then(res => {
                if (res.data.code === 0) {
                    this.managerlistSearch = res.data.data;
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
        dialogVisibles (par, msg, type, value) {
            // 选中选项点击负责人
            console.log(par, 'this.par');
            let params = [];
            if (par !== null) {
                if (par.length > 0) {
                    par.forEach(item => {
                        if (item[1] === 0) {
                            this.checkBoer = true;
                        } else {
                            params.push(item.id);
                        }
                    });
                    if (this.checkBoer === true && value === '删除') {
                        this.checkBoer = false;
                        this.$message.error('操作失败：您没有删除的权限。');
                        return false;
                    }
                    if (this.checkBoer === true && value === '更换客户经理') {
                        this.checkBoer = false;
                        this.$message.error('操作失败：您没有更换客户经理的权限。');
                        return false;
                    }
                    if (this.checkBoer === true && value === '指派客户经理') {
                        this.checkBoer = false;
                        this.$message.error('操作失败：您没有指派客户经理的权限。');
                        return false;
                    }
                }
            } else {
                params = null;
            }
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
        jump (type, id, isShowOrName) {
            if (type === 0) {
                if (this.title === '潜在客户') {
                    this.$router.push({name: 'addLurking'});
                } else {
                    this.$router.push({name: 'add'});
                }
            }
            if (this.type !== '1') {
                isShowOrName = '';
            }
            if (type === 1) {
                let routerData = this.$router.resolve({name: 'detail', query: {viewType: '1', id: id, isShowOrName}});
                window.open(routerData.href, '_blank');
            }
            if (type === 2) {
                let routerData = this.$router.resolve({name: 'detail', query: {viewType: '2', id: id, isShowOrName}});
                window.open(routerData.href, '_blank');
            }
        },
        msgWarning (params, msg) {
            if (!params.length) {
                this.$message.warning(msg);
                return false;
            }
            return true;
        },
        // 删除单个记录
        removefollow (value) {
            console.log(value);
            this.$confirm('请确认是否删除该条跟进信息。', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                cancelButtonClass: 'btn-custom-cancel',
                type: 'warning'
            }).then(() => {
                this.$http.put(this.$api.customer.customerdelete,
                    [value.id]
                ).then(res => {
                    console.log(res);
                    if (res.data.code === 0) {
                        this.lookCustomer(value.customerId);
                        this.$message({message: '成功', type: 'success'});
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 编辑
        addCustomers (value) {
            this.customertit = '编辑';
            this.valudId = value.id;
            this.dialogVisible = true;
            this.keywords = value.customerName;
            this.forbidden = true;
            this.handleGetList('false');
            this.addForm.contactUserId = value.contactUserId;
            this.addForm.content = value.content;
            this.addForm.customerId = value.customerId;
            this.addForm.trackDate = value.trackDate;
            this.addForm.trackStatusDictId = value.trackStatusDictId;
        },
        customersList () {
            this.$http.put(this.$api.customer.amendcustomer + this.valudId, {
                contactUserId: this.addForm.contactUserId,
                content: this.addForm.content,
                customerId: this.addForm.customerId,
                trackDate: this.addForm.trackDate,
                trackStatusDictId: this.addForm.trackStatusDictId
            }).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.lookCustomer(this.addForm.customerId);
                    this.dialogVisible = false;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 获取选中的id
        idS (list) {
            let params = [];
            list.forEach(e => {
                if (e.check) {
                    params.push(e);
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
                _this.$http.post(_this.$api.client.import, formData, {timeout: 1000 * 60 * 10}, headers)
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
    .listHeight{
        height: 44px;
    }
    .operationList{
        width: 84px;
        text-align: center;
        background-color:#edf3f7;
        border-bottom: 1px solid #f2f2f2;
    }
    .operation-tr{
        text-align: center;
        line-height: 42px;
    }
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
            clear: both;
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
    .isrequired::before {
        content: "*";
        color: #e0370f;
        font-size: 12px;
        font-weight: 400;
        position: absolute;
        margin-left: 4px;
        left: 0px;
        top: 0;
    }
    .table-wraps{
        position: relative;
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
            .table-client{
                z-index: 100;
                position: absolute;
                top: -2px;
                right: -3px;
                background: #ffffff;
                td, th{
                    padding: 10px;
                    line-height: 20px;
                    font-size: 12px;
                    // border-bottom: 1px solid #f2f2f2;
                }
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
        width: 84px;
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
    .gy-form-group {
        padding-left: 118px;
        .l {
            width: 148px;
        }
    }
    .product-list{
        position: relative;
        ul{
            background-color: #fff;
            width: 100%;
            max-height: 190px;
            overflow: auto;
            position: absolute;
            left: 0;
            top: 32px;
            z-index: 9;
            border: 1px solid $color-border;
            border-top: none;
            li{
                padding: 5px 10px;
                cursor: pointer;
                &:hover{
                    background-color: #f5f7fa;
                    color: $color-extra;
                }
                &.none-tips{
                    font-size: $small-font;
                    text-align: center;
                }
            }
        }
        .my-icon-jj{
            cursor:pointer;
            position: absolute;
            right: 7px;
            top: 0px;
        }
    }
}
</style>
<style lang="scss">
    .client{
        .icon-shanchu{
            cursor: pointer;
        }
        .follow-up-record{
            .el-dialog{
                margin: 0 auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            .option{
                text-align: center;
            }
        }
        .AddressManagement{
            .el-dialog__header {
                border-bottom: 1px solid #DCE0E4;
                padding: 15px;
                .el-dialog__title{
                    position: absolute;
                    top:2px;
                }
            }
            .el-dialog__body {
                padding:30px;
            }
            .el-message-box__wrapper .el-button--primary{
                background:#e0370f;
                border-color:#e0370f;
            }
        }
        .adddialog-footer{
            width: 100%;
            text-align: right;
            padding: 8px 32px;
            button:nth-child(1) {
                margin-right: 8px;
            }

        }
    }
</style>
