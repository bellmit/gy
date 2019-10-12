<template>
    <div class="myrole">
        <div class="new-title-public">
            角色管理
        </div>
        <div class="div2">
            <!--搜索按钮-->
            <!--<div class="box1"></div>-->
            <div class="box1">
                <div class="search-box">
                    <input type="search" v-model="keywords" placeholder="输入角色名称搜索">
                    <i  @click="search" class="iconfont icon-search"></i>
                </div>
            </div>
            <div class="box2">
                <div>
                    <span @click="newadd" class="gy-button-extra">新增</span>
                    <span @click="deladdAll" class="gy-button-normal">删除</span>
                </div>
            </div>
        </div>
        <div class="div3">
            <div>
                <table class="gy-table">
                    <thead>
                    <tr class="title">
                        <td style="width: 50px;text-align: center"><input type="checkbox" :checked="companySelectedList.length === dataList.length"
                                   @change="handleCheckAllChange"></td>
                        <td style="width: 100px;">ID</td>
                        <td style="width: 200px;">角色名称</td>
                        <td style="width: 150px;">类型</td>
                        <td style="width: 200px;">创建时间</td>
                        <td style="width: 100px;">操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item , index) in dataList" :key="index">
                        <td style="width: 50px;text-align: center"><input type="checkbox" :checked="companySelectedList.indexOf(item.id) >= 0"
                                   @change="handleCheckChange(item.id)"></td>
                        <td style="width: 100px;"><div>{{item.id}}</div></td>
                        <td style="width: 200px;"><div>{{item.name}}</div></td>
                        <td style="width: 150px;"><div>{{item.companyId===null?'系统':'自定义'}}</div></td>
                        <td style="width: 200px;"><div>{{item.createDate | date}}</div></td>
                        <td style="width: 100px;text-align: center">
                            <a @click="goPage(10,item.id)" class="gy-button-view">查看</a>
                            <a v-show="item.companyId!=null" @click="goPage(20,item.id)" class="gy-button-view">编辑</a>
                            <!--<a v-show="item.companyId!=null" @click="goPage(30,item.id)" class="gy-button-view">删除</a>-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="totaljl">
                    共 {{total}} 条记录
                </div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :total=total>
                </el-pagination>
            </div>
        </div>
        <!--新增-->
        <div class="newAdd">
            <el-dialog @close="closeDialog('ruleForm')" v-if="newAddShow" :title='myValue' :visible="newAddShow">
                <el-form :rules="rules" ref="ruleForm" :model="mydata">
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <el-row>
                                <el-col class="left-span" :span="3"> <span class="left-red">*</span> 角色名称</el-col>
                                <el-col :span="20" style="margin-left: 1.2%;">
                                    <el-form-item style="margin-top: -6px;" label="" prop="myname">
                                        <el-input placeholder="请输入" v-model="mydata.myname" autocomplete="off" :disabled="input_disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <el-row>
                                <el-col class="left-span2" :span="3">备注</el-col>
                                <el-col :span="20">
                                    <textarea placeholder="请输入" class="gy-textarea" v-model="mydata.remark" :disabled="input_disabled"></textarea>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" style="margin-top: 20px;padding-bottom: 10px">
                        <el-col :span="24">
                            <el-row>
                                <el-col :span="3" class="left-span"> <span  class="left-red">*</span> 授权</el-col>
                                <el-col :span="20" style="margin-left: 1.5%;">
                                    <div class="myTree">
                                        <div class="top">
                                            <ul>
                                                <li :class="{'liActive':liActives === 0}" @click="tabClick(0)">商城</li>
                                                <li :class="{'liActive':liActives === 2}" @click="tabClick(2)">ERP</li>
                                                <li :class="{'liActive':liActives === 3}" @click="tabClick(3)">CRM</li>
                                            </ul>
                                        </div>
                                        <!--tree-->
                                        <div class="mytree">
                                            <div class="new_tree1" v-show="liActives === 0">
                                                <el-tree class="newTree"
                                                         :data="treeData1"
                                                         :props="treeProps1"
                                                         ref="menuListTree1"
                                                         node-key="id"
                                                         empty-text=""
                                                         :default-expand-all="true"
                                                         :default-checked-keys="defaultData1"
                                                         show-checkbox>
                                                </el-tree>
                                            </div>
                                            <div class="new_tree1" v-show="liActives === 2">
                                                <el-tree class="newTree"
                                                         :data="treeData2"
                                                         :props="treeProps2"
                                                         ref="menuListTree2"
                                                         node-key="id"
                                                         empty-text=""
                                                         :default-expand-all="true"
                                                         :default-checked-keys="defaultData2"
                                                         show-checkbox>
                                                </el-tree>
                                            </div>
                                            <div class="new_tree1" v-show="liActives === 3">
                                                <el-tree class="newTree"
                                                         :data="treeData3"
                                                         :props="treeProps3"
                                                         ref="menuListTree3"
                                                         node-key="id"
                                                         empty-text=""
                                                         :default-expand-all="true"
                                                         :default-checked-keys="defaultData3"
                                                         show-checkbox>
                                                </el-tree>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-form>
                <div v-if="viewbtnShow" style="text-align: right;margin-right: 2.5%;margin-top: 10px">
                    <button class="gy-button-extra" @click="newAddBtn('ruleForm')">确定</button>
                    <button class="gy-button-normal" @click="closeDialog('ruleForm')">取消</button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { treeDataTranslate } from '@/utils';
export default {
    data () {
        return {
            total: 0, // 总条数
            pageNum: 1, // 当前条数
            keywords: '', // 当前条数
            dataList: [],
            data: [],
            mydata: {
                myname: '',
                remark: ''
            },
            newAddShow: false,
            treeData: [],
            treeData1: [],
            treeData2: [],
            treeData3: [],
            defaultData1: [],
            defaultData2: [],
            defaultData3: [],
            viewbtnShow: true,
            resourceAccessIdList1: [],
            resourceAccessIdList2: [],
            resourceAccessIdList3: [],
            liActives: 0,
            treeProps1: {
                children: 'children',
                label: 'name'
            },
            treeProps2: {
                children: 'children',
                label: 'name'
            },
            treeProps3: {
                children: 'children',
                label: 'name'
            },
            tempKey: -666666,
            myV: '',
            myValue: '',
            input_disabled: false,
            myid: '',
            companySelectedList: [],
            checkAll: false,
            rules: {
                myname: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ]
            }
        };
    },
    created () {
        this.getInfo();
        this.getInfoTree(0);
        this.getInfoTree(2);
        this.getInfoTree(3);
    },
    methods: {
        handleCheckChange (id) {
            let idx = this.companySelectedList.indexOf(id);
            idx >= 0 ? this.companySelectedList.splice(idx, 1) : this.companySelectedList.push(id);
            console.log(this.companySelectedList);
        },
        handleCheckAllChange () {
            this.checkAll = !this.checkAll;
            if (this.checkAll) {
                this.companySelectedList = [];
                this.dataList.forEach(item => {
                    this.companySelectedList.push(item.id);
                }, this);
                console.log(this.companySelectedList);
                return;
            }
            this.companySelectedList = [];
        },
        getInfo () { // 获取信息
            this.mydata = {
                'name': this.keywords,
                'pageNum': this.pageNum,
                'pageSize': 10
            };
            this.$http.post(this.$api.account.roleList, this.mydata).then(res => {
                if (res.data.code === 0) {
                    this.dataList = res.data.data.list;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                }
            });
        },
        // 搜索
        search () {
            this.getInfo();
        },
        // 树1
        getInfoTree (v) {
            //    请求tree 数据列表
            this.$http.post(this.$api.account.rolemenuList, {
                'category': v
            }).then(res => {
                if (res.data.code === 0) {
                    if (v === 0) {
                        this.treeData1 = treeDataTranslate(res.data.data, 'id', 'parentId');
                    } else if (v === 2) {
                        this.treeData2 = treeDataTranslate(res.data.data, 'id', 'parentId');
                    } else if (v === 3) {
                        this.treeData3 = treeDataTranslate(res.data.data, 'id', 'parentId');
                    }
                }
            });
        },
        // 打开弹窗
        newadd () {
            this.myV = 1000;
            this.myValue = '新增角色';
            this.newAddShow = true;
        },
        tabClick (v) {
            this.liActives = v;
        },
        // 确认新增的弹窗
        newAddBtn (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.myValue === '新增角色') {
                        //  获取树1的接口
                        this.$http.post(this.$api.account.newAddrole, {
                            'name': this.mydata.myname,
                            'remark': this.mydata.remark,
                            'resourceAccessCategoryModelList': [{
                                'category': this.treeData1[0] ? this.treeData1[0].category : '',
                                'resourceAccessIdList': [].concat(this.$refs.menuListTree1.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree1.getHalfCheckedKeys())
                            }, {
                                'category': this.treeData2[0] ? this.treeData2[0].category : '',
                                'resourceAccessIdList': [].concat(this.$refs.menuListTree2.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree2.getHalfCheckedKeys())
                            }, {
                                'category': this.treeData3[0] ? this.treeData3[0].category : '',
                                'resourceAccessIdList': [].concat(this.$refs.menuListTree3.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree3.getHalfCheckedKeys())
                            }]
                        }).then(res => {
                            if (res.data.code === 0) {
                                this.$alert('新增角色成功', '提示')
                                    .then(() => {
                                        this.newAddShow = false;
                                        this.getInfo();
                                        this.liActives = 0;
                                        this.defaultData1 = this.$refs.menuListTree1.setCheckedKeys([]);
                                        this.defaultData2 = this.$refs.menuListTree2.setCheckedKeys([]);
                                        this.defaultData3 = this.$refs.menuListTree3.setCheckedKeys([]);
                                    });
                            } else {
                                this.$alert(res.data.message, '提示')
                                    .then(() => {});
                            }
                        });
                    } else if (this.myValue === '编辑角色') {
                        this.$http.put(this.$api.account.newAddrole, {
                            'name': this.mydata.myname,
                            'remark': this.mydata.remark,
                            'id': this.mydata.myid,
                            'resourceAccessCategoryModelList': [{
                                'category': this.treeData1[0] ? this.treeData1[0].category : '',
                                'resourceAccessIdList': [].concat(this.$refs.menuListTree1.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree1.getHalfCheckedKeys())
                            }, {
                                'category': this.treeData2[0] ? this.treeData2[0].category : '',
                                'resourceAccessIdList': [].concat(this.$refs.menuListTree2.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree2.getHalfCheckedKeys())
                            }, {
                                'category': this.treeData3[0] ? this.treeData3[0].category : '',
                                'resourceAccessIdList': [].concat(this.$refs.menuListTree3.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree3.getHalfCheckedKeys())
                            }]
                        }).then(res => {
                            if (res.data.code === 0) {
                                this.$alert('编辑角色成功', '提示')
                                    .then(() => {
                                        this.newAddShow = false;
                                        this.getInfo();
                                        this.liActives = 0;
                                        this.defaultData1 = this.$refs.menuListTree1.setCheckedKeys([]);
                                        this.defaultData2 = this.$refs.menuListTree2.setCheckedKeys([]);
                                        this.defaultData3 = this.$refs.menuListTree3.setCheckedKeys([]);
                                    });
                            } else {
                                this.$alert(res.data.message, '提示')
                                    .then(() => {});
                            }
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        // 关闭新增的弹窗
        closeDialog (formName) {
            this.newAddShow = false;
            this.mydata.myname = ''; // 清空输入的值
            this.mydata.remark = '';
            this.viewbtnShow = true;
            this.defaultData1 = this.$refs.menuListTree1.setCheckedKeys([]);
            this.defaultData2 = this.$refs.menuListTree2.setCheckedKeys([]);
            this.defaultData3 = this.$refs.menuListTree3.setCheckedKeys([]);
            this.liActives = 0;
            this.myV = '';
            this.input_disabled = false;
            this.$refs[formName].resetFields();
            this.getInfo();
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            // this.parameter.pageNum = this.pageNum;
            this.getInfo();
        },
        //    编辑  删除 查看
        goPage (v, k) {
            this.myV = v;
            if (v === 10) {
                this.myValue = '查看角色';
                this.viewbtnShow = false;
                this.input_disabled = true;
                this.$http.get(this.$api.account.rolesDetail + '/' + k).then(res => {
                    if (res.data.code === 0) {
                        this.mydata.myname = res.data.data.name;
                        this.mydata.remark = res.data.data.remark;
                        console.log(res.data.data.resourceAccessCategoryModelList);
                        if (res.data.data.resourceAccessCategoryModelList === null) {
                            this.$refs.menuListTree1.setCheckedKeys([]);
                            this.$refs.menuListTree2.setCheckedKeys([]);
                            this.$refs.menuListTree3.setCheckedKeys([]);
                        } else {
                            this.defaultData1 = res.data.data.resourceAccessCategoryModelList[0].resourceAccessIdList;
                            this.defaultData1.splice(this.defaultData1.indexOf(this.tempKey), this.defaultData1.length - this.defaultData1.indexOf(this.tempKey));
                            this.defaultData2 = res.data.data.resourceAccessCategoryModelList[1] ? res.data.data.resourceAccessCategoryModelList[1].resourceAccessIdList : [];
                            this.defaultData2.splice(this.defaultData2.indexOf(this.tempKey), this.defaultData2.length - this.defaultData2.indexOf(this.tempKey));
                            this.defaultData3 = res.data.data.resourceAccessCategoryModelList[2] ? res.data.data.resourceAccessCategoryModelList[2].resourceAccessIdList : [];
                            this.defaultData3.splice(this.defaultData3.indexOf(this.tempKey), this.defaultData3.length - this.defaultData3.indexOf(this.tempKey));
                        }
                        this.newAddShow = true; // 打开弹窗
                    }
                });
            } else if (v === 20) {
                this.myValue = '编辑角色';
                this.input_disabled = false;
                this.$http.get(this.$api.account.rolesDetail + '/' + k).then(res => {
                    if (res.data.code === 0) {
                        this.mydata.myname = res.data.data.name;
                        this.mydata.remark = res.data.data.remark;
                        this.mydata.myid = res.data.data.id;
                        if (res.data.data.resourceAccessCategoryModelList === null) {
                            this.$refs.menuListTree1.setCheckedKeys([]);
                            this.$refs.menuListTree2.setCheckedKeys([]);
                            this.$refs.menuListTree3.setCheckedKeys([]);
                        } else {
                            this.defaultData1 = res.data.data.resourceAccessCategoryModelList[0].resourceAccessIdList;
                            this.defaultData1.splice(this.defaultData1.indexOf(this.tempKey), this.defaultData1.length - this.defaultData1.indexOf(this.tempKey));
                            this.defaultData2 = res.data.data.resourceAccessCategoryModelList[1] ? res.data.data.resourceAccessCategoryModelList[1].resourceAccessIdList : [];
                            this.defaultData2.splice(this.defaultData2.indexOf(this.tempKey), this.defaultData2.length - this.defaultData2.indexOf(this.tempKey));
                            this.defaultData3 = res.data.data.resourceAccessCategoryModelList[2] ? res.data.data.resourceAccessCategoryModelList[2].resourceAccessIdList : [];
                            this.defaultData3.splice(this.defaultData3.indexOf(this.tempKey), this.defaultData3.length - this.defaultData3.indexOf(this.tempKey));
                        }
                        this.newAddShow = true;
                    }
                });
            }
        },
        deladdAll () {
            if (this.companySelectedList.length === 0) {
                this.$alert('请选择角色', '提示', {type: 'warning'})
                    .then(() => {
                    });
            } else {
                this.$alert('确认删除该角色？', '提示', {type: 'warning'})
                    .then(() => {
                        this.$http.put(this.$api.account.validDel, {
                            'roleIdList': this.companySelectedList
                        }).then(res => {
                            this.companySelectedList = [];
                            if (res.data.code === 0) {
                                this.$alert('删除角色成功', '提示')
                                    .then(() => {
                                        this.getInfo();
                                        this.checkAll = false;
                                    });
                            } else {
                                this.$alert(res.data.message, '提示')
                                    .then(() => {
                                        this.checkAll = false;
                                    });
                            }
                        });
                    });
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .myrole{
        .topAA{
            margin-top: 10px;
        }
        .div1{
            height: 47px;
            border-bottom: 1px solid #ebeef5;
            font-size: 16px;
            margin-right: 24px;
            line-height: 47px;
            padding-left: 20px;
            color: #333;
            font-weight: bold;
        }
        .div2{
            .box1{
                margin-right: 20px;
                overflow: hidden;
                margin-top: 20px;
                .search-box {
                    float: right;
                    display: inline-block;
                    width: 216px;
                    border-bottom: 1px solid $color-light;
                    input {
                        width: 190px;
                        height: 30px;
                        color: $color-light;
                        border: none;
                    }
                    button {
                        display: inline-block;
                        width: 60px;
                        color: $color-main;
                        border: none;
                        background-color: #fff;
                        text-align: right;
                    }
                }
            }
            .box2{
                overflow: hidden;
                margin-right: 20px;
                margin-top: 20px;
                div{
                    float: right;
                    span{
                        margin-left: 10px;
                    }
                }
            }
        }
        .div3{
            padding: 0 16px 20px;
            table {
                width: 100%;
                margin-top: 15px;
                border-collapse: collapse;
                td {
                    color: $color-main;
                    font-size: 12px
                }
            }
        }
        .myTree{
            .top{
                ul{
                    overflow: hidden;
                    li{
                        float: left;
                        width: 40px;
                        text-align: center;
                        margin-right: 10px;
                        padding:0 5px;
                    }
                    .liActive {
                        color: #E0370F;
                        border-bottom: 2px solid #E0370F;
                    }
                }
                li:hover{
                    cursor: pointer;
                }
            }
            .mytree{
                margin-top: 10px;
                border: 1px solid #e6eaea;
                height: 380px;
                overflow: auto;
                .new_tree1{
                    float: left;
                }
            }
        }
        .totaljl{
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
        .left-red{
            color: red;
        }
        .left-span{
            color: #333;
        }
        .left-span2{
            color: #333;
            margin-left: 1.3%;
            margin-right: 1px
        }
    }
</style>
<style lang="scss">
    .myrole{
        .el-dialog__body{
            padding: 20px 10px 30px 20px;
        }
        .el-dialog__footer{
            padding: 0;
            /*padding: 10px 20px 30px;*/
        }
        .newAdd{
            .el-dialog{
                width: 750px;
            }
            .el-dialog__headerbtn{
                right:16px;
            }
        }
    }
</style>
