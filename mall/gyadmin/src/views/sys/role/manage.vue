<template>
    <div class="page">
        <div class="detail-info" id="detail-info">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
              <el-row>
                <el-col :span="12">
                <el-form-item label="角色名称" prop="name" class="mr-60">
                    <el-input v-model="form.name" :disabled="disable" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="角色编码" prop="roleCode">
                    <el-input v-model="form.roleCode" :disabled="disable" placeholder="请输入角色编码"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                <el-form-item label="企业类型" class="mr-60">
                    <el-select v-model="form.companyType" placeholder="请选择公司类型" :disabled="disable">
                        <el-option
                          v-for="item in form.companyTypeList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="是否系统" style="text-align:left;">
                    <el-radio-group v-model="form.isSys">
                        <el-radio :label="0" :disabled="disable">非系统</el-radio>
                        <el-radio :label="1" :disabled="disable">是系统</el-radio>
                    </el-radio-group>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="角色类型" class="mr-60" style="text-align:left;">
                      <el-radio-group v-model="form.roleType">
                          <el-radio :label="0" @change="switchOption(0)">前台</el-radio>
                          <el-radio :label="1" @change="switchOption(1)">后台</el-radio>
                      </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注" class="mr-60">
                      <el-input type="textarea" v-model="form.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                <div style="display: none;">
                    <el-form-item label="角色类型">
                        <el-input v-model="form.roleType"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input v-model="form.createdBy"></el-input>
                    </el-form-item>
                    <el-form-item label="修改人id">
                        <el-input v-model="form.updatedBy"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input v-model="form.createDate"></el-input>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <el-input v-model="form.updateDate"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单列表">
                        <el-input v-model="form.menuList"></el-input>
                    </el-form-item>
                </div>
                <el-form-item size="mini" label="授权">
                  <div v-bind:key="index" style="float: left" v-for="(item,index) in menuList">
                    <el-tree class="newTree"
                      :data="item"
                      :props="menuListTreeProps"
                       ref="menuListTree"
                      node-key="id"
                      :default-expand-all="true"
                      :default-checked-keys="defaultData[index]"
                      show-checkbox>
                    </el-tree>
                  </div>
                </el-form-item>
                <el-form-item class="gy-button-group">
                    <button type="button" @click.stop="submitForm('form')" class="gy-button-extra">保存</button>
                    <button type="button" @click="$router.push({path: 'list'})" class="gy-button-normal">取消</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { treeDataTranslate } from '@/utils';
export default {
    data () {
        return {
            defaultData: [],
            form: {
                name: '', // 测试人
                remark: '', // 备注
                roleType: 0, // 角色类型（0：前台角色 1：后台角色）
                createdBy: '1', // 创建人id
                isSys: 0, // 是否系统角色（0：否 1：是）
                updatedBy: '1', // 修改人id
                createDate: '', // 创建时间
                updateDate: '', // 修改时间
                roleCode: '', // 角色编码
                companyTypeList: [],
                companyType: ''
            },
            id: 0, // 主键id
            menuList: [], // 菜单列表
            menuListTreeProps: {
                children: 'children',
                label: 'name'
            },
            menuArr: [{name: '前台-商城菜单管理', id: 0, menuItems: [], menuIds: [], mycode: []}, {name: '后台角色', id: 1, menuItems: [], menuIds: [], mycode: []}],
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                roleCode: [
                    { required: true, message: '请输入角色编码', trigger: 'blur' }
                ]
            },
            tempKey: -666666,
            disable: false,
            menuListTree: false,
            mydata1: [],
            resourceAccessCategoryModelList: [{resourceAccessIdList: ''}],
            selectValue: ''
        };
    },

    watch: {
        // 'form.isSys' (newValue, oldValue) {
        //     console.log(newValue);
        //     console.log(oldValue);
        //     this.disable = (newValue === 1) ? true : false;
        // }
    },
    methods: {
        getCompanyType () {
            this.$http.get(this.$api.memberCompany.companyType)
                .then((res) => {
                    this.form.companyTypeList = res.data.data;
                    this.form.companyTypeList.push({'id': 0, 'name': '所有公司'});
                    this.form.companyTypeList.push({'id': -1, 'name': '无'});
                    this.form.companyTypeList.reverse();
                });
        },
        submitForm (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.toSubmit();
                } else {
                    return false;
                }
            });
        },
        switchOption (typeId) {
            this.selectValue = typeId;
            this.menuList = this.menuArr[typeId].menuItems; // 设置数据
            let menuId = this.menuArr.menuIds;
            // 循环遍历
            for (let k = 0; k < menuId.length; k++) {
                menuId[k].resourceAccessIdList.splice(menuId[k].resourceAccessIdList.indexOf(this.tempKey), menuId[k].resourceAccessIdList.length - menuId[k].resourceAccessIdList.indexOf(this.tempKey));
            }
            if (menuId === undefined || menuId === null || menuId === '') {
            } else {
                for (let i = 0; i < this.menuList.length; i++) {
                    for (let j = 0; j < menuId.length; j++) {
                        if (this.menuList[i][0].category === menuId[j].category) {
                            this.defaultData[i] = menuId[j].resourceAccessIdList;
                        }
                    }
                }
            }
            // 设置勾选
        },
        toSubmit () {
            this.resourceAccessCategoryModelList = [];
            for (let i = 0; i < this.menuList.length; i++) {
                this.resourceAccessCategoryModelList.push({
                    'resourceAccessIdList': [].concat(this.$refs.menuListTree[i].getCheckedKeys(), [this.tempKey], this.$refs.menuListTree[i].getHalfCheckedKeys()),
                    'category': this.menuArr[this.selectValue].mycode[i]
                });
            }
            let method = this.id ? 'put' : 'post';
            let dataObj = {
                'isSys': this.form.isSys, // 是否系统角色（0：否 1：是）
                'resourceAccessCategoryModelList': this.resourceAccessCategoryModelList,
                'name': this.form.name, // 测试人
                'remark': this.form.remark, // 备注
                'roleCode': this.form.roleCode, // 角色编码
                'companyTypeId': this.form.companyType, // 企业ID
                'roleType': this.form.roleType // 角色类型（0：前台-商城菜单管理 1：后台角色）
            };
            if (this.id) {
                dataObj.id = this.id;
            }
            this.$http({
                url: this.$api.role.manage,
                method: method,
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.$router.push({path: 'list'});
                    this.$message.success('保存成功!');
                }
            }).catch(() => {
            });
        },
        getData (id) {
            if (id) {
                this.id = id;
            }
            let p1 = new Promise((resolve, reject) => {
                this.$http.get(this.$api.menu.roles + this.menuArr[0].id).then(({data}) => {
                    if (data.code === 0) {
                        for (let i = 0; i < data.data.length; i++) {
                            this.menuArr[0].menuItems.push(treeDataTranslate(data.data[i].resourceAccessModelList, 'id'));
                            this.menuArr[0].mycode.push(data.data[i].category);
                        }
                        resolve(data);
                    }
                });
            });
            let p2 = new Promise((resolve, reject) => {
                this.$http.get(this.$api.menu.roles + this.menuArr[1].id).then(({data}) => {
                    if (data.code === 0) {
                        for (let i = 0; i < data.data.length; i++) {
                            this.menuArr[1].menuItems.push(treeDataTranslate(data.data[i].resourceAccessModelList, 'id'));
                            this.menuArr[1].mycode.push(data.data[i].category);
                        }
                        resolve(data);
                    }
                });
            });
            let p3 = new Promise((resolve, reject) => {
                if (this.id) { // ID有值说明为修改
                    this.$http.get(this.$api.role.info + this.id).then(({data}) => {
                        if (data.code === 0) {
                            resolve(data);
                        }
                    });
                } else { // 无ID说明是添加
                    resolve(null);
                }
            });
            Promise.all([p1, p2, p3]).then((results) => {
                let data = results[2];
                if (data) { // 修改
                    this.form = data.data;
                    this.menuArr.menuIds = data.data.resourceAccessCategoryModelList;
                    this.switchOption(data.data.roleType);
                    this.disable = (this.form.isSys === 1); // 是系统的时候不允许修改前四项
                } else { // 添加
                    this.switchOption(this.form.roleType);
                }
            });
        }
    },
    created () {
        let id = this.$route.query.id;
        this.getData(id);
        this.getCompanyType(); // 公司类型
    }
};
</script>
<style scoped lang="scss">
.page {
    padding-bottom: 25px;
}
.detail-info {
    padding: 20px 0 0 0;
}
.el-textarea{
    width: 100%;
}
</style>
