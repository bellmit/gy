<!--suppress ALL -->
<template>
    <div class="organization-structure">
        <div class="user-box">
            <div class="new-title-public">组织架构管理</div>
            <div class="btn-group">
                <button type="button" class="gy-button-extra" v-show="!isFirst" @click="addPerson">添加人员</button>
                <button type="button" class="gy-button-normal" v-show="!isFirst" @click="deleteDepartmentPerson">删除人员</button>
                <button type="button" :class="isFirst ? 'gy-button-extra' : 'gy-button-normal'" @click="addDepartmentClick">添加部门</button>
                <button type="button" v-show="!isFirst" class="gy-button-normal" @click="editDepartmentClick">修改部门</button>
                <button type="button" v-show="!isFirst" class="gy-button-normal" @click="deleteDepartment">删除部门</button>
            </div>
        </div>
        <div class="organization-wrapper" :style="{minHeight: dragWrapperHeight}" :class="{'eResize' : mouseOver}">
            <div class="organization-menu" id="dragBox">
                <div class="dragLine" id="dragLine"></div>
                <div class="menuData" v-if="menuData" id="dragMenu">
                    <items :checkedId="[organizationId]" :defaultOpen="true" :type="2" :menuData="menuData[0]" :left="10"></items>
                </div>
            </div>
            <div class="organization-content user-box" id="dragContent">
                <div style="padding: 10px 9px 10px 4px">
                    <div class="gy-table" v-if="departmentData.list">
                        <el-table
                            :data="departmentData.list"
                            style="width: 100%"
                            tooltip-effect="light"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                class-name="align-c"
                                width="36">
                            </el-table-column>
                            <el-table-column
                                prop="employeeNo"
                                label="员工编号"
                                :show-overflow-tooltip="true"
                                width="75">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                :show-overflow-tooltip="true"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="positionName"
                                label="岗位"
                                :show-overflow-tooltip="true"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                label="移动电话"
                                :show-overflow-tooltip="true"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="organizationName"
                                label="部门"
                                :show-overflow-tooltip="true"
                                width="120">
                                <template slot-scope="scope">
                                    <span>
                                        {{scope.row.organizationModelList | organizationIds}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                :show-overflow-tooltip="true"
                                width="80">
                                <template slot-scope="scope">
                                    {{scope.row.status ? staffStatus[scope.row.status - 1].name : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="managerName"
                                label="直接上级"
                                :show-overflow-tooltip="true"
                                width="100">
                                <template slot-scope="scope">
                                    {{scope.row.managerName ? scope.row.managerName : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="email"
                                label="邮箱"
                                :show-overflow-tooltip="true"
                                width="160">
                                <template slot-scope="scope">
                                    {{scope.row.email ? scope.row.email : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="officePhone"
                                label="办公电话"
                                :show-overflow-tooltip="true"
                                width="120">
                                <template slot-scope="scope">
                                    {{scope.row.officePhone ? scope.row.officePhone : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="otherPhone"
                                label="其他电话"
                                :show-overflow-tooltip="true"
                                width="120">
                                <template slot-scope="scope">
                                    {{scope.row.otherPhone ? scope.row.otherPhone : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="officeAddress"
                                label="办公地点"
                                :show-overflow-tooltip="true"
                                width="160">
                                <template slot-scope="scope">
                                    {{scope.row.officeAddress ? scope.row.officeAddress : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="gender"
                                label="性别"
                                :show-overflow-tooltip="true"
                                width="70">
                                <template slot-scope="scope">
                                    {{scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="jobDescription"
                                label="职责描述"
                                :show-overflow-tooltip="true"
                                width="160">
                                <template slot-scope="scope">
                                    {{scope.row.jobDescription ? scope.row.jobDescription : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                class-name="align-c"
                                width="71">
                                <template slot-scope="scope">
                                    <button type="button" class="gy-button-view" @click="editPerson(scope.row)">编辑</button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="departmentName" v-if="departmentData.personNum">{{'当前部门及子部门共计: ' + departmentData.personNum + '人'}}</div>
                <div class="departmentName" v-else>当前部门及子部门共计: 0人</div>
            </div>
        </div>
        <el-dialog width="800px" :title="departmentClick === 'add' ? '添加部门' : '修改部门'" :visible.sync="dialogAddDepartment"
                   :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="dialog-add-department">
                <div class="gy-form-group" style="height: 50px">
                    <span class="l"><strong>*</strong>名称</span>
                    <input type="text" v-model="addDepartment.name" placeholder="请输入名称">
                </div>
                <div class="gy-form-group">
                    <span class="l">上级部门</span>
                    <div class="chkHigherAuthorities">
                        <input type="text" placeholder="请选择" v-model="addDepartment.parentName" @click="showAddDepartment">
                        <i class="el-icon-arrow-down" :class="{'el-rotate' : (chkHigherAuthorities && menuData)}" @click="chkHigherAuthorities = true" style="position: absolute;right: 0;top: 7px;"></i>
                        <div v-if="chkHigherAuthorities && menuData" class="chkOrganization-content">
                            <items :checkedId="[addDepartmentChk]" :defaultOpen="false" :type="3" :menuData="menuData[0]" :left="0"></items>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group ipt-number" style="display: none">
                    <span class="l"><strong>*</strong>排序</span>
                    <el-input-number controls-position="right" v-model="addDepartment.orderNum" :min="0" :max="10"></el-input-number>
                </div>
                <div style="clear: both"></div>
                <div style="text-align: right">
                    <span class="gy-button-extra" @click="doAddDepartment">保存</span>
                    <span class="gy-button-normal" @click="dialogAddDepartment = false">取消</span>
                </div>
            </div>
        </el-dialog>
        <el-dialog width="800px" :title="staffTitle" :visible.sync="dialogAddPerson"
                   :close-on-click-modal="false" :close-on-press-escape="false">
            <div v-if="dialogAddPerson">
                <div class="dialogAddPerson-content">
                    <div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>员工编号</span>
                            <input type="text" v-model="staff.employeeNo" placeholder="请输入">
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>姓名</span>
                            <input type="text" v-model="staff.name" placeholder="请输入">
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>岗位</span>
                            <input type="text" v-model="staff.positionName" placeholder="请输入">
                            <i class="iconfont icon-mySearch" @click.stop="searchManager"></i>
                            <i class="iconfont icon-add-no-border" @click="dialogAddManager = true"></i>
                            <div class="managerList" v-if="onelist1Show" v-clickOutside="handleHiddenList">
                                <ul>
                                    <li v-for="(item,index) in managerList" :key="index" @click="managerselect(item)" v-if="managerList && managerList.length > 0">
                                        {{item.name}}
                                    </li>
                                    <li class="managerEmpty" @click="onelist1Show = false" v-if="managerList && managerList.length === 0">没有搜到相关岗位</li>
                                </ul>
                            </div>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>移动电话</span>
                            <input type="text" v-model="staff.phone" placeholder="请输入">
                        </div>
                        <div class="gy-form-group" style="height: 46px">
                            <span class="l"><strong>*</strong>部门</span>
                            <input type="text" v-show="staff.organizationIds && staff.organizationIds.length === 0" @click="dialogAddOrganizationIds" placeholder="请输入">
                            <div v-if="staff.organizationIds && staff.organizationIds.length > 0" @click="dialogAddOrganizationIds" class="staff-organizationIds">
                                <span class="el-tag el-tag--info el-tag--small">
                                    <span class="el-select__tags-text">{{staff.organizationIds[0].name}}</span>
                                    <i class="el-tag__close el-icon-close" @click.stop="removeOrganizationIds(staff.organizationIds[0])"></i>
                                </span>
                                <span v-if="staff.organizationIds.length > 1" class="el-tag el-tag--info el-tag--small">
                                    <span class="el-select__tags-text">+{{staff.organizationIds.length - 1}}</span>
                                </span>
                            </div>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">状态</span>
                            <el-select type="text" v-model="staff.status" placeholder="请选择">
                                <el-option
                                    v-for="item in staffStatus"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">直接上级</span>
                            <el-select type="text" v-model="staff.managerId" placeholder="请选择">
                                <el-option
                                    v-for="item in companyPersonList"
                                    :key="item.managerId"
                                    :label="item.managerName"
                                    :value="item.managerId"
                                    :disabled="item.managerId === staff.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">办公电话</span>
                            <input type="text" v-model="staff.officePhone" placeholder="请输入">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">其他电话</span>
                            <input type="text" v-model="staff.otherPhone" placeholder="请输入">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">邮箱地址</span>
                            <input type="text" v-model="staff.email" placeholder="请输入">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">办公地点</span>
                            <input type="text" v-model="staff.officeAddress" placeholder="请输入">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">性别</span>
                            <el-select type="text" v-model="staff.gender" placeholder="请选择">
                                <el-option
                                    v-for="item in genderList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    v-show="item.id !== 0">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">职责描述</span>
                            <input type="text" v-model="staff.jobDescription" placeholder="请输入">
                        </div>
                    </div>
                </div>
                <div class="dialogAddPerson-btn-groups">
                    <span class="gy-button-extra" @click="doAddStaff">保存并继续添加</span>
                    <span class="gy-button-normal" @click="addStaff">保存</span>
                    <span class="gy-button-normal" @click="dialogAddPerson = false;">取消</span>
                </div>
            </div>
        </el-dialog>
        <el-dialog width="800px" title="更改部门" :visible.sync="dialogDepartment" append-to-body
                   :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="change-department">
                <div class="l">
                    <div class="change-department-title">选择</div>
                    <ul>
                        <items :checkedId="checkedId" :defaultOpen="true" :type="1" :menuData="menuData[0]" :left="0"></items>
                    </ul>
                </div>
                <div class="c"></div>
                <div class="r">
                    <div class="change-department-title">已选</div>
                    <div class="content">
                        <div v-for="(item, index) in checkedId" :key="index">
                            {{item.name}}
                            <i class="iconfont icon-minus" @click="removeOrganizationId(item)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialogAddPerson-btn-groups">
                <span class="gy-button-extra" @click="doCheckedId">确定</span>
                <span class="gy-button-normal" @click="dialogDepartment = false;">取消</span>
            </div>
        </el-dialog>
        <add-manager :dialogAddManager="dialogAddManager" :title="'新增岗位'" :addAndEdit="add" :showmodel="true" @closeAddManger="closeAddManger" @doAddManager="doAddManager"></add-manager>
    </div>
</template>

<script>
import addManager from './addManager';
import items from './items';
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
    data () {
        return {
            genderList: [
                {
                    name: '请选择',
                    id: 0
                },
                {
                    name: '男',
                    id: 1
                },
                {
                    name: '女',
                    id: 2
                }
            ],
            staffTitle: '添加人员',
            dialogDepartment: false,
            managerList: [],
            dialogAddPerson: false,
            onelist1Show: false,
            menuData: [],
            defaultProps: {
                children: 'list',
                label: 'name'
            },
            departmentName: null,
            departmentData: {
                'organizationId': null,
                'id': null,
                'employeeNo': null,
                'userId': null,
                'companyId': null,
                'name': null,
                'phone': null,
                'positionId': null,
                'jobDescription': null,
                'status': null,
                'managerId': null,
                'officePhone': null,
                'otherPhone': null,
                'email': null,
                'officeAddress': null,
                'gender': null,
                'createdBy': null,
                'updatedBy': null,
                'positionName': null,
                'managerName': null,
                'organizationName': null,
                'list': null,
                'personNum': null
            },
            dialogAddDepartment: false,
            chkHigherAuthorities: false,
            deletePerson: {
                companyId: null,
                roleIdList: [],
                valid: 0
            },
            chkPersonList: [],
            add: {
                name: null,
                positionDesc: null,
                remark: null
            },
            addDepartment: {
                desc: null,
                level: null,
                name: null,
                orderNum: null,
                parentId: null,
                parentName: null,
                usrCompanyId: null
            },
            addDepartmentChk: null,
            organizationId: null,
            departmentClick: null,
            companyPersonList: [],
            companyName: null,
            isFirst: false,
            mouseOver: false,
            dragWrapperHeight: 0,
            checkedId: [],
            dialogAddManager: false,
            idEditStaff: false,
            staff: {
                id: null,
                employeeNo: null, // 员工编号
                email: null, // 邮箱
                gender: null, // 性别
                jobDescription: null, // 工作描述
                managerId: null, // 直接上级
                name: null, // 员工姓名
                officeAddress: null, // 办公地址
                officePhone: null, // 办公电话
                otherPhone: null, // 其他电话
                phone: null, // 移动电话
                positionId: null, // 岗位id
                positionName: null, // 岗位名称
                organizationIds: [], // 部门id
                status: null // 员工状态(离职，在职…)
            },
            staffStatus: [
                // {
                //     name: '在职',
                //     id: null
                // }
            ]
        };
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            this.deletePerson.companyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            this.addDepartment.usrCompanyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            this.companyName = JSON.parse(localStorage.getItem('userInfo')).companyName;
        }
        this.init();
    },
    mounted () {
        this.drag();
        this.getListAll();
    },
    methods: {
        handleHiddenList () {
            this.onelist1Show = false;
        },
        init () {
            this.getOrganizationList();
            this.getStatus();
            this.getAllCompangPerson();
            this.getList();
        },
        showAddDepartment () {
            this.chkHigherAuthorities = true;
        },
        getStatus () {
            this.$http.get(this.$api.organizational.getStatus)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.staffStatus = res.data.data;
                    }
                })
                .catch((e) => {});
        },
        editPerson (row) {
            this.staffTitle = '编辑人员';
            this.idEditStaff = true;
            this.onelist1Show = false;
            Object.keys(this.staff).map((e) => {
                this.staff[e] = row[e];
            });
            let arr = [];
            row.organizationModelList.forEach((i) => {
                arr.push({
                    name: i.organizationName,
                    id: i.organizationId
                });
            });
            [...this.checkedId] = arr;
            [...this.staff.organizationIds] = arr;
            this.dialogAddPerson = true;
        },
        dialogAddOrganizationIds () {
            this.dialogDepartment = true;
            [...this.checkedId] = this.staff.organizationIds;
        },
        doCheckedId () {
            this.dialogDepartment = false;
            [...this.staff.organizationIds] = this.checkedId;
        },
        removeOrganizationIds (item) {
            this.staff.organizationIds.splice(this.staff.organizationIds.findIndex(v => v === item), 1);
        },
        removeOrganizationId (item) {
            this.checkedId.splice(this.checkedId.findIndex(v => v === item), 1);
        },
        getList () {
            let params = {
                name: this.staff.positionName,
                pageSize: null,
                pageNum: null
            };
            this.$http.post(this.$api.organizational.getManagerList, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.managerList = res.data.data.list;
                    }
                })
                .catch((e) => {});
        },
        getListAll () {
            let params = {
                name: null,
                pageSize: null,
                pageNum: null
            };
            this.$http.post(this.$api.organizational.getManagerList, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.managerListAll = res.data.data.list;
                    }
                })
                .catch((e) => {});
        },
        doAddStaff () {
            this.addStaff(1);
        },
        addStaff (type) {
            if (!this.staff.employeeNo) {
                this.$message.error('请先填写员工编号');
                return;
            }
            if (!this.staff.name) {
                this.$message.error('请先填写员工姓名');
                return;
            }
            if (!this.staff.positionId || !this.staff.positionName) {
                this.$message.error('请先选择岗位');
                return;
            }
            let manager = this.managerListAll.filter((e) => e.id === this.staff.positionId);
            if (manager[0].name !== this.staff.positionName) {
                this.$message.error('所选岗位不存在，请重新选择');
                return;
            }
            if (!(this.staff.organizationIds.length > 0)) {
                this.$message.error('请先选择部门');
                return;
            }
            if (!this.staff.phone) {
                this.$message.error('请先填写移动电话');
                return;
            }
            if (!this.$tools.verifyMobile(this.staff.phone)) {
                this.$message.error('请填写正确移动电话');
                return;
            }
            if (this.staff.email && !(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).test(this.staff.email)) {
                this.$message.error('请填写正确邮箱');
                return;
            }
            this.testStaffNum(type);
        },
        staffSub (type) {
            let params = this.staff;
            [...params.organizationIds] = Array.from(params.organizationIds, e => e.id);
            this.$http[this.idEditStaff ? 'put' : 'post'](this.$api.organizational[this.idEditStaff ? 'editStaff' : 'addStaff'], params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success(res.data.message);
                        if (type !== 1) {
                            this.dialogAddPerson = false;
                        }
                        this.resetStaff();
                        if (type === 1) {
                            this.staffTitle = '添加人员';
                            this.staff.organizationIds = [JSON.parse(JSON.stringify(this.organizationId))];
                        }
                        this.getDepartmentList();
                        this.getAllCompangPerson();
                    }
                })
                .catch(() => {});
        },
        resetStaff () {
            Object.keys(this.staff).map((e) => {
                this.staff[e] = null;
            });
            this.staff.organizationIds = [];
        },
        testStaffNum (type) {
            this.$http.post(this.$api.organizational.testStaffNum, {employeeNo: this.staff.employeeNo, id: this.staff.id})
                .then((res) => {
                    if (res.data.code === -1) {
                        this.$message.error(res.data.message);
                        this.staff.employeeNo = null;
                        return false;
                    }
                    this.testPhone(type);
                })
                .catch(() => {});
        },
        testPhone (type) {
            this.$http.post(this.$api.organizational.testPhone, {phone: this.staff.phone, id: this.staff.id})
                .then((res) => {
                    if (res.data.code === 0 && res.data.data.isExits) {
                        this.$message.error('手机号已存在');
                        this.staff.phone = null;
                        return false;
                    }
                    this.staffSub(type);
                })
                .catch((e) => {});
        },
        checkedD (item) {
            if (Array.from(this.checkedId, e => e.id).includes(item.id) || item.id === 0) return;
            this.checkedId.push(item);
        },
        searchManager () {
            this.onelist1Show = true;
            this.getList();
        },
        managerselect (item) {
            this.onelist1Show = false;
            this.staff.positionId = item.id;
            this.staff.positionName = item.name;
        },
        resetHeight () {
            Promise.resolve().then(() => {
                this.dragWrapperHeight = document.getElementById('dragMenu').offsetHeight + 'px';
            });
        },
        drag () {
            let oBox = document.getElementById('dragBox');
            let oLine = document.getElementById('dragLine');
            let oContent = document.getElementById('dragContent');
            oLine.onmousedown = (ev) => {
                let iEvent = ev || event;
                let dx = iEvent.clientX;
                let dw = oBox.offsetWidth;
                this.mouseOver = true;
                document.onmousemove = (ev) => {
                    let iEvent = ev || event;
                    if (dw + (iEvent.clientX - dx) < 190) {
                        oBox.style.width = '190px';
                        oLine.style.left = '185px';
                        oContent.style.paddingLeft = '195px';
                    } else if (dw + (iEvent.clientX - dx) > 460) {
                        oBox.style.width = '460px';
                        oLine.style.left = '455px';
                        oContent.style.paddingLeft = '465px';
                    } else {
                        oBox.style.width = dw + (iEvent.clientX - dx) + 'px';
                        oLine.style.left = dw + (iEvent.clientX - dx) - 5 + 'px';
                        oContent.style.paddingLeft = dw + (iEvent.clientX - dx) + 5 + 'px';
                    }
                };
                document.onmouseup = () => {
                    this.mouseOver = false;
                    document.onmousedown = null;
                    document.onmousemove = null;
                };
                return false;
            };
        },
        // 部门选中
        handleNodeClick (item) {
            this.organizationId = item;
            this.getDepartmentList();
            this.departmentName = item.name;
        },
        // 获取组织结构列表
        getOrganizationList () {
            this.$http.get(this.$api.organizational.organizationalList + '/' + 0)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.menuData = res.data.data;
                        this.handleNodeClick(res.data.data[0]);
                        this.resetHeight();
                    }
                });
        },
        // 获取选中部门下员工
        getDepartmentList () {
            if (!this.organizationId.id) {
                this.organizationId.id = 0;
            }
            this.$http.get(this.$api.organizational.employeeList + '/' + this.organizationId.id)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.departmentData = res.data.data;
                        if (this.departmentData.list === null) {
                            this.departmentData.list = [];
                        }
                    }
                })
                .catch((e) => {
                    console.log('出错了' + e);
                });
        },
        // 部门人员列表选中（全选）
        handleSelectionChange (val) {
            this.chkPersonList = val;
        },
        // 添加（修改部门）选中上级部门
        higherAuthoritiesClick (item) {
            this.addDepartment.parentId = item.id;
            this.addDepartment.parentName = item.name;
            this.addDepartmentChk = item;
            this.chkHigherAuthorities = false;
        },
        // 添加部门
        addDepartmentClick () {
            this.departmentClick = 'add';
            this.dialogAddDepartment = true;
            this.chkHigherAuthorities = false;
            this.addDepartmentChk = JSON.parse(JSON.stringify(this.organizationId));
            this.addDepartment = {
                desc: null,
                level: null,
                name: null,
                orderNum: null,
                parentId: this.organizationId.id,
                parentName: this.organizationId.name,
                usrCompanyId: null
            };
        },
        // 添加（修改）部门保存
        doAddDepartment () {
            if (this.departmentClick === 'edit' && this.organizationId && this.addDepartment.parentId && this.organizationId.id === this.addDepartment.parentId) {
                this.$message.error('不能设置自身部门为上级部门！');
                return;
            }
            if (this.addDepartment.name === null) {
                this.$message.error('名称不能为空！');
                return;
            }
            this.addDepartment.parentId = this.addDepartment.parentId === null ? 0 : this.addDepartment.parentId;
            if (this.addDepartment.orderNum === null) {
                this.$message.error('请先设置部门排序！');
                return;
            }
            if (this.departmentClick === 'add') {
                this.$http.post(this.$api.organizational.addDepartment, this.addDepartment)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.dialogAddDepartment = false;
                            this.$message.success('添加成功！');
                            this.getOrganizationList();
                        } else if (res.data.code === -1) {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
            if (this.departmentClick === 'edit') {
                this.$http.put(this.$api.organizational.addDepartment, this.addDepartment)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.dialogAddDepartment = false;
                            this.$message.success('修改成功！');
                            this.getOrganizationList();
                        } else if (res.data.code === -1) {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        // 删除部门（确认提示）
        deleteDepartment () {
            if (this.organizationId === null) {
                this.$message.error('请先选择部门！');
                return;
            }
            if (this.organizationId.id === null) {
                this.$message.error('最上级部门无法删除！');
                return;
            }
            this.$confirm('确认删除该部门?', '提示', {
                type: 'warning',
                confirmButtonText: '确定',
                confirmButtonClass: 'gy-button-extra',
                cancelButtonText: '取消',
                cancelButtonClass: 'gy-button-normal',
                callback: this.doDeleteDepartment
            });
        },
        // 删除部门确认提示 确认/取消回调
        doDeleteDepartment (type) {
            if (type === 'cancel') return;
            this.$http.put(this.$api.organizational.deleteDepartment, {id: this.organizationId.id})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('删除成功！');
                        this.getOrganizationList();
                    } else if (res.data.code === -1) {
                        this.$message.error(res.data.message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 修改部门(按钮)
        editDepartmentClick () {
            this.departmentClick = 'edit';
            this.dialogAddDepartment = true;
            this.chkHigherAuthorities = false;
            this.addDepartmentChk = JSON.parse(JSON.stringify(this.organizationId));
            this.addDepartmentChk.id = this.organizationId.parentId;
            this.addDepartment = JSON.parse(JSON.stringify(this.organizationId));
        },
        // 部门添加人员（按钮）
        addPerson () {
            if (this.organizationId === null) {
                this.$message.error('请先选择部门！');
                return;
            }
            this.staffTitle = '添加人员';
            this.idEditStaff = false;
            this.onelist1Show = false;
            this.resetStaff();
            this.dialogAddPerson = true;
            this.staff.organizationIds = [JSON.parse(JSON.stringify(this.organizationId))];
        },
        // 获取可添加人员列表（公司全员）
        getAllCompangPerson () {
            this.$http.get(this.$api.organizational.directSuperior)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.companyPersonList = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        deleteDepartmentPerson () {
            this.$confirm('确认删除所选人员?', '提示', {
                type: 'warning',
                confirmButtonText: '确定',
                confirmButtonClass: 'gy-button-extra',
                cancelButtonText: '取消',
                cancelButtonClass: 'gy-button-normal',
                callback: this.doDeleteDepartmentPerson
            });
        },
        doDeleteDepartmentPerson (type) {
            if (type === 'cancel') return;
            if (this.organizationId === null) {
                this.$message.error('请先选择部门！');
                return;
            }
            if (this.chkPersonList.length === 0) {
                this.$message.error('请先选择要删除的人员！');
                return;
            }
            let params = {
                organizationIds: [this.organizationId.id],
                ids: Array.from(this.chkPersonList, e => e.id)
            };
            this.$http.put(this.$api.organizational.deletePerson, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('删除成功！');
                        this.getDepartmentList();
                        this.getAllCompangPerson();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        doAddPerson () {
            let userIdList = [];
            this.companyPersonList.forEach((e) => {
                if (e.isOrganization === 1) {
                    userIdList.push(e.userId);
                }
            });
            if (userIdList.length === 0) {
                this.$message.error('请先选择人员！');
            }
            let params = {
                userIdList: userIdList,
                usrOrganizationId: this.organizationId.id
            };
            this.$http.put(this.$api.organizational.doAddPerson, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.dialogAddPerson = false;
                        this.$message.success('添加成功！');
                        this.getDepartmentList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        doAddManager (e) {
            let params = e.params;
            if (!params.name || params.name.replace(/(^\s+)|(\s+$)/g, '').length === 0) {
                this.$message.error('请先填写岗位名称');
                return;
            }
            this.$http.post(this.$api.organizational.addManager, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功!');
                        this.staff.positionId = res.data.data.id;
                        this.staff.positionName = res.data.data.name;
                        this.clearData();
                        if (e.type === 1) return;
                        this.dialogAddManager = false;
                        this.onelist1Show = false;
                        this.getListAll();
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {});
        },
        closeAddManger () {
            this.dialogAddManager = false;
            this.clearData();
        },
        clearData () {
            Object.keys(this.add).map((e) => {
                this.add[e] = null;
            });
        }
    },
    watch: {
        organizationId () {
            this.isFirst = (this.organizationId.id === 0);
        }
    },
    components: {addManager, items},
    provide () {
        return {
            checkedD: this.checkedD,
            handleNodeClick: this.handleNodeClick,
            higherAuthoritiesClick: this.higherAuthoritiesClick
        };
    },
    filters: {
        organizationIds (list) {
            if (!list) {
                return '';
            }
            let ids = '';
            list.map((e) => {
                ids += e.organizationName + ',';
            });
            return ids.substr(0, ids.length - 1);
        }
    },
    directives: {
        clickOutside
    }
};
</script>

<style lang="scss" scoped>
    .user-box {
        position: relative;
        margin-bottom: 0;
        .btn-group {
            position: absolute;
            top: -1px;
            right: 0;
            height: 100%;
            padding: 8px 15px;
            button {
                margin-left: 8px;
            }
        }
    }
    .organization-wrapper {
        position: relative;
        .organization-menu {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9;
            width: 190px;
            padding-top: 10px;
            padding-bottom: 10000px;
            margin-bottom: -9999px;
            border-right: 1px solid $color-border;
            font-size: 14px;
            .dragLine {
                width: 10px;
                height: 1000px;
                position: absolute;
                left: 185px;
                top: 0;
                cursor: ew-resize;
            }
            .company-name {
                padding: 5px 10px;
            }
            .menuData {
                width: 100%;
                height: 100%;
                padding: 0 10px 50px 0;
                overflow-x: hidden;
            }
        }
        .organization-content {
            width: 953px;
            padding-left: 195px;
            height: auto;
            .departmentName {
                line-height: 1;
                margin: 0;
                color: #333;
                text-align: right;
                padding: 10px 9px 30px 0;
                font-weight: normal;
            }
            .btn-group1 {
                text-align: right;
                padding: 5px 15px;
            }
        }
    }
    /deep/ .ipt-number {
        .el-input {
            border: 1px solid #e6eaea;
        }
        input {
            border-bottom: 0;
        }
    }
    .chkHigherAuthorities {
        position: relative;
        .chkOrganization-content {
            position: absolute;
            width: 100%;
            padding-bottom: 20px;
            background: #fff;
        }
        .el-icon-arrow-down {
            transition: all 0.3s;
        }
        .el-rotate {
            transform: rotate(180deg);
        }
    }
    /deep/ .el-table .cell {
        line-height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /deep/ .gy-table td {
        line-height: 20px;
    }
    /deep/ .gy-table th {
        line-height: 18px;
        font-weight: 600;
    }
    /deep/ .el-table_1_column_1 {
        line-height: 1;
        .cell {
            line-height: 1;
        }
    }
    /deep/ .el-table__body tr.hover-row>td {
        background-color: #f9f9f9;
    }
    .eResize {
        cursor: ew-resize !important;
    }
    .new-title-public {
        padding: 5px 16px;
    }
    .dialogAddPerson-content {
         &:after {
             display: block;
             clear: both;
             content: ' ';
         }
        .gy-form-group {
            padding-left: 74px;
            height: 46px;
            .l {
                width: 64px;
                padding-left: 8px;
                strong {
                    left: 0;
                }
            }
            .icon-mySearch {
                position: absolute;
                right: 30px;
                top: 10px;
            }
            .icon-add-no-border {
                position: absolute;
                right: 5px;
                top: 10px;
            }
        }
        .gy-form-group:nth-child(even) {
            padding-left: 104px;
            padding-right: 0;
            .l {
                width: 94px;
                padding-left: 38px;
                strong {
                    left: 28px;
                }
            }
        }
        .managerList {
            position: absolute;
            left: 74px;
            top: 38px;
            z-index: 999;
            width: calc(100% - 104px);
            background: #fff;
            overflow: auto;
            ul {
                max-height: 260px;
                overflow: auto;
                padding: 10px 0;
                border: 1px solid $color-border;
                li {
                    padding: 0 10px;
                    cursor: pointer;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    &:hover {
                        background-color: #f5f7fa;
                        color: #4a90e2;
                    }
                }
            }
        }
    }
    .dialogAddPerson-btn-groups {
        text-align: right;
        margin-top: 20px;
        &>span {
            margin-left: 8px;
        }
    }
    /deep/ .el-dialog__body {
        padding: 20px 30px;
    }
    /deep/ .el-table__row td:last-child {
        padding: 0 0 0 10px;
        .cell {
            line-height: 40px;
        }
    }
    .change-department {
        &:after {
            clear: both;
            display: block;
            content: ' ';
        }
        .w {
            width: calc(50% - 25px);
            float: left;
        }
        .p {
            height: 400px;
            overflow: auto;
            border-radius: 3px;
            padding: 10px 16px;
            border: 1px solid $color-border;
        }
        .l {
            @extend .w;
            ul {
                @extend .p;
            }
        }
        .c {
            float: left;
            width: 50px;
            height: 1px;
        }
        .r {
            @extend .w;
            .content {
                @extend .p;
                &>div{
                    position: relative;
                    .icon-minus {
                        position: absolute;
                        right: 0;
                        top: 0;
                        cursor: pointer;
                    }
                }
            }

        }
        .change-department-title {
            padding-bottom: 20px;
            line-height: 1;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .staff-organizationIds {
        height: 32px;
        overflow: hidden;
        border-bottom: 1px solid $color-border;
        .el-tag--small {
            margin-left: 5px;
        }
    }
    .dialog-add-department {
        .gy-form-group {
            padding-left: 74px;
            .l {
                width: 64px;
            }
        }
        .gy-form-group:nth-child(even) {
            padding-left: 104px;
            padding-right: 0;
            .l {
                width: 94px;
                padding-left: 38px;
                strong {
                    left: 28px;
                }
            }
        }
    }
    /deep/ .el-button:hover {
        background-color: #fff;
    }
    /deep/ .el-table tr td:nth-child(1) .cell,
    /deep/ .el-table tr th:nth-child(1) .cell,
    /deep/ .el-table tr td:nth-child(2) .cell,
    /deep/ .el-table tr th:nth-child(2) .cell{
        padding: 0!important;
    }
    /deep/ .el-table tr td:nth-child(1) .cell,
    /deep/ .el-table tr th:nth-child(1) .cell{
        overflow: visible!important;
    }
    /deep/ .el-table button {
        background-color: #fff;
    }
    /deep/ .el-table__empty-text {
        text-align: left;
        left: 370px;
    }
</style>
<style lang="scss">
.el-message-box__btns {
    .gy-button-normal {
        float: right;
        padding: 0 16px;
    }
    .gy-button-normal:hover {
        background: #fff;
    }
    .gy-button-extra {
        background-color: #e0370f!important;
        color: #fff!important;
        border-color: #e0370f!important;
        float: right;
        margin-right: 10px;
    }
}
.organization-structure {
    .el-dialog__header {
        border-bottom: 1px solid #e6eaea;
    }
    .el-input-number.is-controls-right .el-input__inner {
        font-size: 16px;
    }
}
</style>
