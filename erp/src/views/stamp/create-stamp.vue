<!-- 创建用印申请 -->
<template>
    <div class="add-stamp">
        <div class="paydetail-title">基本信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>业务类型</span>
                <el-select @change="assignment(seleForm.business, 'businessType', 'businessTypeDesc')" v-model="seleForm.business">
                    <el-option
                            v-for="(item, index) in businessData"
                            :key="index"
                            :label="item.value"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>印章种类</span>
                <el-select @change="assignment(seleForm.stamp, 'stampType', 'stampTypeDesc')" v-model="seleForm.stamp">
                    <el-option
                            v-for="(item, index) in stampData"
                            :key="index"
                            :label="item.value"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>用印单位</span>
                <el-select @change="assignment1(seleForm.company, 'companyId', 'companyName')" value-key="targetCorpName" v-model="seleForm.company">
                    <el-option
                            v-for="(item, index) in relatedCompanyList"
                            :key="index"
                            :label="item.targetCorpName"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group" style="height:auto;">
                <span class="l"><strong>*</strong>单据类型</span>
                <div>
                    <el-select @change="assignment(seleForm.document, 'documentType', 'documentTypeDesc')" v-model="seleForm.document">
                        <el-option
                                v-for="(item, index) in documentData"
                                :key="index"
                                :label="item.value"
                                :value="item">
                        </el-option>
                    </el-select>
                    <input type="text" v-if="addFrom.documentType==4" maxlength="50" placeholder="请输入" v-model="addFrom.documentTypeDesc">
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>用印文件名称</span>
                <input type="text" placeholder="请输入" v-model="addFrom.stampFileDescription">
            </div>
            <div class="gy-form-group" style="height:auto">
                <span class="l"><strong>*</strong>单据去向</span>
                <div>
                    <el-checkbox-group v-model="documentDirection">
                        <el-checkbox label="第三方仓库"></el-checkbox>
                        <el-checkbox label="卖方"></el-checkbox>
                        <el-checkbox label="买方"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                    <input type="text" v-if="documentDirection.indexOf('其他')!==-1 || documentDirection.indexOf('第三方仓库')!==-1" maxlength="50" placeholder="请输入" v-model="documentDirectionDesc">
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>使用日期</span>
                <div class="d">
                    <el-date-picker
                        v-model="addFrom.usedDate"
                        type="date"
                        value-format="timestamp"
                        placeholder="日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>申请人员</span>
                <input type="text" placeholder="请输入" disabled v-model="addFrom.userName">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>所在部门</span>
                <input type="text" placeholder="请输入" disabled v-model="addFrom.userDepartmentName">
            </div>
        </div>
        <div class="paydetail-title">业务信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>合同类型</span>
                <el-select @change="contracType(addFrom.contractType)" v-model="addFrom.contractType">
                    <el-option
                            v-for="(item, index) in contractData"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <!-- 现有业务-ERP合同 -->
            <template v-if="addFrom.businessType===null || addFrom.businessType===2">
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>合同要素ID</span>
                    <input type="text" placeholder="请选择合同要素ID" v-model="addFrom.essenceId" :disabled="!!this.$route.query.orderDetailList"
                            readonly="true" @click="checkContract(addFrom.contractType)">
                </div>
            </template>
            <!-- 现有业务-非ERP合同 和 新业务-->
            <template v-if="addFrom.businessType==1 || addFrom.businessType==3">
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>合同编号</span>
                    <input type="text" placeholder="请输入" v-model="addFrom.contractCode">
                </div>
            </template>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>我方公司</span>
                <el-select @change="assignment1(seleForm.ourCompany, 'ourCompanyId', 'ourCompanyName')" value-key="targetCorpName" v-model="seleForm.ourCompany">
                    <el-option
                            v-for="(item, index) in relatedCompanyList"
                            :key="index"
                            :label="item.targetCorpName"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>客户名称</span>
                <input type="text" placeholder="请输入" v-model="addFrom.othersideCompanyName">
            </div>
            <!-- 现有业务-非ERP合同 和 现有业务-ERP合同-->
            <div class="gy-form-group" v-if="addFrom.businessType!==1">
                <span class="l"><strong>*</strong>业务进度</span>
                <el-select v-model="addFrom.businessProgress">
                    <el-option
                            v-for="(item, index) in progressData"
                            :key="index"
                            :label="item.value"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>业务人员</span>
                <input type="text" placeholder="请输入" @click="openUsrSelDlg()" v-model="businessUser">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>产品名称</span>
                <el-select v-model="product" @change="changeProduct(product)" placeholder="请选择" value-key="productName">
                    <el-option
                            v-for="(item, index) in proType"
                            :key="index"
                            :label="item.productName"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">备注</span>
                <input type="text" placeholder="请输入" v-model="addFrom.remark">
            </div>
        </div>
        <div class="paydetail-title">附件信息</div>
        <div class="gy-form">
            <div class="gy-form-group" style="width:100%;">
                <span class="l"><strong>*</strong>附件</span>
                <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
            </div>
        </div>
        <div class="foot">
            <button type="button" class="gy-button-extra confirmations" @click="onsubmit">提交</button>
        </div>
        <!-- 业务人员弹框 -->
        <userList ref="myUserDlg" @affirmUser="affirmUser"></userList>
        <!-- 合同要素ID弹框 -->
        <el-dialog v-if="dialogVisible" width="900px" class="addDialog" title="选择合同"
                   :visible.sync="dialogVisible">
            <div class="gy-form-group">
                <span class="l">合同要素ID</span>
                <div>
                    <input type="text" v-focus v-model="dialogSearch.essenceId"
                           placeholder="请输入">
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">客户名称</span>
                <div>
                    <input type="text" v-focus v-model="dialogSearch.customerName"
                           placeholder="请输入">
                </div>
                <span class="search1" @click="getContract">
                    <i class="iconfont icon-search"></i>
                </span>
            </div>
            <div class="gy-form-group">
                <span class="l">我方公司</span>
                <div>
                    <el-select filterable v-model="dialogSearch.targetCorpName" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                                v-for="(item, index) in relatedCompanyList"
                                :key="index"
                                :label="item.targetCorpName"
                                :value="item.targetCorpName">
                        </el-option>
                    </el-select>
                    <!-- <input type="text" v-focus v-model="dialogSearch.targetCorpName"
                           placeholder="请输入"> -->
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">产品名称</span>
                <!-- <div>
                    <input type="text" v-focus v-model="dialogSearch.prodName"
                           placeholder="请输入">
                </div> -->
                <div>
                    <el-select filterable v-model="dialogSearch.prodName" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                                v-for="(item, index) in proType"
                                :key="index"
                                :label="item.productName"
                                :value="item.productName">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="dialog-table">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>合同要素ID</th>
                        <th>类别</th>
                        <th>品类</th>
                        <th>合同数量(吨)</th>
                        <th>我方公司</th>
                        <th>客户名称</th>
                        <th>合同编号</th>
                        <th>创建时间</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dialogCompanyList" :key="index">
                            <td style="width: 50px;">
                            <span class="el-radio__input" :class="index === activeIndex ? 'is-checked' : ''" @click="checked(index)">
                                <span class="el-radio__inner"></span>
                            </span>
                            </td>
                            <td style="width: 360px;">{{item.essenceId}}</td>
                            <td style="width: 240px;">{{item.contractTypeDesc}}</td>
                            <td>
                                <el-tooltip poper-class="test" :content="item.prodName" :disabled="(item.prodName && item.prodName.replace(/[^x00-xff]/g, 'aa').length > 16)? disabled : !disabled" placement="bottom">
                                    <div class="wid-overflow" style="width:85px;">
                                        {{item.prodName}}
                                    </div>
                                </el-tooltip>
                            </td>
                            <td style="width: 358px;text-align:right;">{{item.contractNumber|numToQuantity}}</td>
                            <td>
                                <el-tooltip poper-class="test" :content="item.targetCorpName" placement="top">
                                    <span class="conceal">{{item.targetCorpName||"--"}}</span>
                                </el-tooltip>
                            </td>
                            <td>
                                <el-tooltip poper-class="test" :content="item.customerName" placement="top">
                                    <span class="conceal">{{item.customerName||"--"}}</span>
                                </el-tooltip>
                            </td>
                            <td><span class="conceal">{{item.contractCode||"--"}}</span></td>
                            <td style="width: 358px;">{{item.createdDate||"--"}}</td>
                        </tr>
                        <tr v-if="dialogCompanyList.length == 0">
                            <td colspan="9" style="text-align: center;">暂无数据</td>
                        </tr>
                    </tbody>
                </table>
                <!-- 分页 -->
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :current-page.sync="dialogSearch.pageNum"
                        :page-size="dialogSearch.pageSize"
                        :total="total"
                        @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <button class="gy-button-normal" @click="dialogVisible = false">取消</button>
                <button class="gy-button-extra confirmations" @click="checkSales()" style="margin-left: 8px">确定</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import gyFileUpload from '../components/gyFileUpload';
import userList from '@/components/selectPersonnel';
export default {
    components: {gyFileUpload, userList},
    data () {
        return {
            disabled: false,
            createStampList: null,
            total: null,
            companyName: null,
            activeIndex: null,
            dialogVisible: false,
            documentDirection: [], // 单据去向
            proType: [], // 产品名称
            documentDirectionDesc: null, // 单据去向描述
            seleForm: {
                business: null, // 业务类型
                stamp: null, // 印章种类
                company: null, // 用印单位
                document: null, // 单据类型
                ourCompany: null // 我方公司
            },
            addFrom: {
                orderId: null, // 订单ID(根据合同类型确认上下游订单)
                productId: null, // 产品id
                productName: null, // 产品名称
                contractType: null, // 合同类型
                businessType: null, // 业务类型id
                businessTypeDesc: null, // 业务类型描述
                stampType: null, // 印章类型id
                stampTypeDesc: null, // 印章类型描述
                companyId: null, // 用印单位ID
                companyName: null, // 用印单位名称
                documentType: null, // 单据类型id
                documentTypeDesc: null, // 单据类型描述
                stampFileDescription: null, // 用印文件名称
                documentDirection: [], // 单据去向
                documentDirectionDesc: null, // 单据去向描述
                usedDate: new Date().getTime(), // 使用日期
                userId: JSON.parse(localStorage.getItem('userInfo')).id, // 申请id
                userName: JSON.parse(localStorage.getItem('userInfo')).username, // 申请人员
                userDepartmentId: JSON.parse(localStorage.getItem('userInfo')).organizationId, // 部门id
                userDepartmentName: JSON.parse(localStorage.getItem('userInfo')).orgName, // 部门
                essenceId: null, // 合同要素ID
                ourCompanyId: null, // 我方公司ID
                ourCompanyName: null, // 我方公司名称
                othersideCompanyId: null, // 客户公司ID
                othersideCompanyName: null, // 客户公司名称
                contractCode: null, // 合同编号，格式为（^YY(\d{6})(\d{3,})$）。e.g YY19062700
                businessProgress: null, // 业务进度
                businessUserId: null, // 业务人员ID
                remark: null, // 备注
                stampApplicationFiles: [] // 附件
            },
            dialogSearch: { // 弹出合同要素id搜索
                pageNo: 1,
                pageSize: 10,
                contractType: null, // 合同类型
                essenceId: null, // 合同要素ID
                customerName: null, // 客户名称
                targetCorpName: null, // 我方公司
                prodName: null // 产品名称
            },
            dialogCompanyList: [],
            relatedCompanyList: [], // 用印单位列表
            relatedCompany: null, // （我方公司）
            product: null, // 产品
            stampCompany: null, // 用印单位
            businessPersonnel: null, // 业务人员
            businessUser: null, // 业务人员
            businessManager: [ // 业务操作人列表
                // {
                //     username: null,
                //     id: null
                // }
            ],
            businessData: [ // 业务类型
                {
                    id: 1,
                    value: '新业务'
                },
                {
                    id: 2,
                    value: '现有业务-ERP合同'
                },
                {
                    id: 3,
                    value: '现有业务-非ERP合同'
                }
            ],
            stampData: [ // 印章种类
                {
                    id: 1,
                    value: '合同章'
                },
                {
                    id: 2,
                    value: '提货章'
                }
            ],
            progressData: [ // 业务进度
                {
                    id: 1,
                    value: '已签约'
                },
                {
                    id: 2,
                    value: '已收款'
                },
                {
                    id: 3,
                    value: '已付款'
                }
            ],
            contractData: [ // 合同类型
                {
                    id: 2,
                    value: '采购合同'
                },
                {
                    id: 3,
                    value: '销售合同'
                }
            ],
            documentData: [ // 单据类型
                {
                    id: 1,
                    value: '提货单据'
                },
                {
                    id: 2,
                    value: '货转单据'
                },
                {
                    id: 3,
                    value: '银行证明'
                },
                {
                    id: 4,
                    value: '其他'
                }
            ],
            Verification: [
                {
                    name: 'businessType',
                    msg: '请先选择业务类型'
                },
                {
                    name: 'stampType',
                    msg: '请先选择印章类型'
                },
                {
                    name: 'companyId',
                    msg: '请先选择用印单位'
                },
                {
                    name: 'documentType',
                    msg: '请先选择单据类型'
                },
                {
                    name: 'stampFileDescription',
                    msg: '请先填写用印文件名称'
                },
                {
                    name: 'usedDate',
                    msg: '请先选择使用日期'
                },
                {
                    name: 'contractType',
                    msg: '请先选择合同类型'
                },
                {
                    name: 'othersideCompanyName',
                    msg: '请先填写客户公司名称'
                },
                {
                    name: 'productName',
                    msg: '请先选择产品名称'
                }
            ]
        };
    },
    mounted () {
        this.createStampList = this.$route.query.orderDetailList;
        this.getRelatedCompany();
        this.getGoodsList();
        this.suring();
    },
    methods: {
        // 从交易详情页-用印申请tab页进来
        suring () {
            console.log(this.$route.query.orderDetailList);
            if (this.$route.query.orderDetailList) {
                this.seleForm.business = {
                    id: 2,
                    value: '现有业务-ERP合同'
                };
                this.addFrom.businessType = 2;
                this.addFrom.businessTypeDesc = '现有业务-ERP合同';
                this.seleForm.company = {
                    targetCorpId: this.createStampList.targetCorpId,
                    targetCorpName: this.createStampList.targetCorpName
                };
                this.addFrom.companyId = this.createStampList.targetCorpId;
                this.addFrom.companyName = this.createStampList.targetCorpName;
                this.seleForm.ourCompany = {
                    targetCorpId: this.createStampList.targetCorpId,
                    targetCorpName: this.createStampList.targetCorpName
                };
                this.addFrom.ourCompanyId = this.createStampList.targetCorpId;
                this.addFrom.ourCompanyName = this.createStampList.targetCorpName;
                if (this.createStampList.contractType === 2) {
                    // 采购
                    this.addFrom.contractType = this.createStampList.contractType;
                    this.addFrom.othersideCompanyId = this.createStampList.sellerCompanyId;
                    this.addFrom.othersideCompanyName = this.createStampList.sellerCompanyName;
                }
                if (this.createStampList.contractType === 3) {
                    // 销售
                    this.addFrom.contractType = this.createStampList.contractType;
                    this.addFrom.othersideCompanyId = this.createStampList.buyerCompanyId;
                    this.addFrom.othersideCompanyName = this.createStampList.buyerCompanyName;
                }
                this.product = this.createStampList.prodName;
                this.addFrom.productName = this.createStampList.prodName;
                this.addFrom.productId = this.createStampList.productId;
                this.businessUser = this.createStampList.businessManagerName;
                this.addFrom.businessUserId = this.createStampList.businessManagerId;
                this.addFrom.essenceId = this.createStampList.id;
            }
        },
        // 获取我方公司
        getRelatedCompany () {
            this.$http.get(this.$api.contract.getRelatedCompany).then(res => {
                this.relatedCompanyList = res.data.data.targetCorpList;
            }).catch((e) => {
                console.log(e);
            });
        },
        // 获得产品
        getGoodsList () {
            this.$http.post(this.$api.workbench.getProdList, {}).then(res => {
                this.proType = res.data.data.rows;
            }).catch((e) => {
                console.log(e);
            });
        },
        // 选择合同id获取买卖方公司
        getContract () {
            let that = this;
            that.$http.post(that.$api.stamp.selectContract, that.dialogSearch).then(res => {
                console.log(res);
                that.dialogCompanyList = res.data.data.list;
                this.total = res.data.data.total;
            }).catch((e) => {
                console.log(e);
            });
        },
        // 选择赋值id和value
        assignment (item, id, value) {
            this.addFrom[id] = item.id;
            this.addFrom[value] = item.value;
            if (this.addFrom.documentType === 4) {
                this.addFrom.documentTypeDesc = null;
            }
        },
        // 用印单位选择赋值id和value
        assignment1 (item, id, value) {
            console.log(item);
            this.addFrom[id] = item.targetCorpId;
            this.addFrom[value] = item.targetCorpName;
        },
        // 选择产品赋值id 和name
        changeProduct (item) {
            console.log(item);
            this.addFrom.productId = item.productId;
            this.addFrom.productName = item.productName;
        },
        // 根据合同类型选择客户名称
        contracType (item) {
            console.log(item);
            if (this.createStampList) {
                if (this.createStampList.contractType === 1) {
                    if (item === 2) {
                        // 采购
                        this.addFrom.othersideCompanyId = this.createStampList.sellerCompanyId;
                        this.addFrom.othersideCompanyName = this.createStampList.sellerCompanyName;
                        this.addFrom.orderId = this.createStampList.purchaseOrderId;
                    }
                    if (item === 3) {
                        // 销售
                        this.addFrom.othersideCompanyId = this.createStampList.buyerCompanyId;
                        this.addFrom.othersideCompanyName = this.createStampList.buyerCompanyName;
                        this.addFrom.orderId = this.createStampList.saleOrderId;
                    }
                }
            } else {
                this.activeIndex = null;
                this.seleForm.ourCompany = null;
                this.addFrom.essenceId = null;
                this.addFrom.ourCompanyName = null;
                this.addFrom.ourCompanyId = null;
                this.addFrom.othersideCompanyId = null;
                this.addFrom.othersideCompanyName = null;
            }
        },
        // 分页
        handleCurrentChange (v) {
            this.dialogSearch.pageNo = v;
            this.getContract();
        },
        // 弹窗
        checkContract (type) {
            // 1 采购合同  2销售合同
            if (this.addFrom.contractType === null || this.addFrom.contractType === '') {
                this.$message.error('请先选择合同类型');
                return;
            }
            this.dialogVisible = true;
            this.dialogSearch.contractType = type;
            this.getContract();
        },
        // 选中公司(采购销售)
        checked (idx) {
            this.activeIndex = idx;
        },
        // 公司选中
        checkSales () {
            if (this.activeIndex === null) {
                this.$message({
                    message: '请先选择公司',
                    type: 'error'
                });
                return;
            }
            console.log(this.dialogCompanyList[this.activeIndex]);
            this.seleForm.ourCompany = this.dialogCompanyList[this.activeIndex].targetCorpName;
            this.addFrom.essenceId = this.dialogCompanyList[this.activeIndex].essenceId;
            this.addFrom.ourCompanyName = this.dialogCompanyList[this.activeIndex].targetCorpName; // 我方公司名字customerName
            this.addFrom.ourCompanyId = this.dialogCompanyList[this.activeIndex].targetCorpId; // 我方公司id customerId
            this.addFrom.othersideCompanyName = this.dialogCompanyList[this.activeIndex].customerName; // 客户名称targetCorpName
            this.addFrom.othersideCompanyId = this.dialogCompanyList[this.activeIndex].customerId; // 客户id targetCorpId
            this.product = this.dialogCompanyList[this.activeIndex].prodName; // 产品
            this.addFrom.productId = this.dialogCompanyList[this.activeIndex].prodId; // 产品名称productId
            this.addFrom.productName = this.dialogCompanyList[this.activeIndex].prodName; // 产品id productName
            this.businessUser = this.dialogCompanyList[this.activeIndex].businessManagerName; // 业务人员 businessManagerName
            this.addFrom.businessUserId = this.dialogCompanyList[this.activeIndex].businessManagerId; // 业务人员id businessManagerId
            if (this.addFrom.contractType === 2) { // contractType=2采购 purchaseOrderId
                this.addFrom.orderId = this.dialogCompanyList[this.activeIndex].purchaseOrderId; // 订单ID(根据合同类型确认上下游订单)
            }
            if (this.addFrom.contractType === 3) { // contractType=3销售saleOrderId
                this.addFrom.orderId = this.dialogCompanyList[this.activeIndex].saleOrderId; // 订单ID(根据合同类型确认上下游订单)
            }
            this.dialogVisible = false;
        },
        // 附件
        onCallbackSaleFileUpload (fileList) {
            console.log(fileList);
            this.addFrom.stampApplicationFiles = [];
            fileList.forEach((e) => {
                this.addFrom.stampApplicationFiles.push(e.fileUrl);
            });
        },
        /* userList业务人员 id赋值 */
        affirmUser (data) {
            // 0 取消 1 确定
            if (data.type === 0) {
                return false;
            }
            this.businessUser = data.userName;
            this.addFrom.businessUserId = data.usrUserId;
            console.log(data);
        },
        openUsrSelDlg (flg, tblIdx, matchFlg, entryIdx) {
            this.$refs.myUserDlg.getUsers();
        },
        onsubmit () {
            console.log(this.addFrom);
            if (!this.testForm(this.Verification)) return false;
            if (!this.check()) return false;
            this.$http.post(this.$api.stamp.createStamp, this.addFrom).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    if (this.$route.query.orderDetailList) {
                        this.$router.push({name: 'orderDetails', query: {id: this.createStampList.id, saleOrderId: this.createStampList.saleOrderId, purchaseOrderId: this.createStampList.purchaseOrderId, tabsIndex: 5}});
                    } else {
                        this.$router.push({name: 'stampApplyList'});
                    }
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 表单验证
        testForm (type) {
            let that = this;
            let list = that.addFrom;
            for (let i = 0; i < type.length; i++) {
                if (list[type[i].name] === null || list[type[i].name] === '') {
                    that.$message({
                        message: type[i].msg,
                        type: 'error'
                    });
                    return false;
                }
            }
            return true;
        },
        // 表单验证
        check () {
            if (this.documentDirection.length === 0) {
                this.$message.error('请先选择单据去向');
                return false;
            } else {
                if (this.documentDirection.indexOf('其他') !== -1) {
                    if (!this.documentDirectionDesc) {
                        this.$message.error('请先输入单据去向');
                        return false;
                    } else {
                        let regex = '^,*|,*$';
                        this.addFrom.documentDirection = this.documentDirection.toString();
                        this.addFrom.documentDirection = this.addFrom.documentDirection.replace(regex, '').replace(/其他/, this.documentDirectionDesc);
                        console.log(this.addFrom.documentDirection);
                        this.addFrom.documentDirectionDesc = this.addFrom.documentDirection;
                    }
                } else if (this.documentDirection.indexOf('第三方仓库') !== -1) {
                    this.addFrom.documentDirection = this.documentDirection.toString();
                    if (this.documentDirectionDesc) {
                        this.addFrom.documentDirection = this.addFrom.documentDirection + ',' + this.documentDirectionDesc;
                    }
                    console.log(this.addFrom.documentDirection);
                    this.addFrom.documentDirectionDesc = this.addFrom.documentDirection;
                } else {
                    this.addFrom.documentDirection = this.documentDirection.toString();
                    this.addFrom.documentDirectionDesc = this.addFrom.documentDirection;
                }
            }
            console.log(this.addFrom);
            if (this.addFrom.stampApplicationFiles.length === 0) {
                this.$message.error('请先选择附件');
                return false;
            }
            if (this.addFrom.companyName !== this.addFrom.ourCompanyName) {
                this.$message.error('用印单位和我方公司不一致,请修改');
                return false;
            }
            if (this.addFrom.businessType !== 1) { // 新业务
                if (!this.addFrom.businessProgress) { // 新业务
                    this.$message.error('请先选择业务进度');
                    return false;
                }
            }
            if (!this.businessUser) {
                this.$message.error('业务人员不能为空');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.add-stamp{
    padding: 20px 0 30px 0;
    .paydetail-title{
        font-size: 14px;
    }
    .gy-form-group{
        height: 46px;
        .checkboxput{
            width: 40%;
            position: absolute;
            top: 38px;
            right: 80px;
        }
    }
    .addDialog{
        .search1 {
            position: absolute;
            right: 0;
            bottom: 10px;
            line-height: 1;
        }
    }
    .dialog-table{
        .conceal{
            cursor: pointer;
            width: 100px;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
    /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #666;
    }
</style>
<style lang="scss">
  .add-stamp {
    .el-dialog__header {
      .el-dialog__headerbtn {
        top: 10px;
        right: 16px;
      }
    }
    .el-checkbox {
      color: $color-minor;
      line-height: 30px;
      margin-right: 14px;
    }
    .el-checkbox+.el-checkbox{
        margin-left:0px;
    }
    .el-input__inner{
        font-size: 14px;
    }
  }
</style>
