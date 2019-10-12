<template xmlns:v-popover="">
  <div>
    <div class="detail-info" id="detail-info">
      <el-form ref="form" :model="form" label-width="68px" :rules="rules">
        <el-form-item label="类型" style="text-align:left;">
          <el-radio-group v-model="form.radio">
            <el-radio :label="0" @change="switchOption(0)">目录</el-radio>
            <el-radio :label="1" @change="switchOption(1)">资源访问</el-radio>
            <el-radio :label="2" @change="switchOption(2)">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首菜单" style="text-align:left;" v-if="myoneMenu">
          <el-radio-group v-model="form.radio2">
          <el-radio :label="20" @change="switchOption2(20)">是</el-radio>
            <el-radio :label="10" @change="switchOption2(10)">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name" v-if="showName" class="mleft-none">
          <el-input v-model="form.name" :disabled="menuNShow" placeholder="请输入名称"></el-input>
        </el-form-item>
        <div v-if="!menuNShow">
          <el-form-item label="上级菜单" prop="parentName" class="last-style">
            <el-popover
              ref="menuListPopover"
              placement="bottom-start"
              trigger="click">
              <el-tree
                :data="menuList"
                :props="menuListTreeProps"
                node-key="id"
                ref="menuListTree"
                @current-change="menuListTreeCurrentChangeHandle"
                :highlight-current="true"
                :expand-on-click-node="false"><!--:default-expand-all="true"-->
              </el-tree>
            </el-popover>
            <el-input v-model="form.parentName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
          </el-form-item>
        </div>
        <div v-if="menuNShow&&myoneMenu">
          <el-form-item label="菜单类别" prop="parentName2">
            <el-popover
              ref="menuListPopover2"
              placement="bottom-start"
              trigger="click">
              <el-tree
                :data="menuList2"
                :props="menuListTreeProps2"
                node-key="id"
                ref="menuListTree2"
                @current-change="menuListTreeCurrentChangeHandle2"
                :highlight-current="true"
                :expand-on-click-node="false"><!--:default-expand-all="true"-->
              </el-tree>
            </el-popover>
            <el-input v-model="form.parentName2" v-popover:menuListPopover2 :readonly="true" placeholder="点击选择菜单类别" class="menu-list__input"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="菜单URL" v-if="showUrl">
          <el-input v-model="form.url" placeholder="请输入菜单URL"></el-input>
        </el-form-item>
        <el-form-item label="前端路由" v-if="showFrontUrl">
          <el-input v-model="form.frontUrl" placeholder="请输入前端路由"></el-input>
        </el-form-item>
        <el-form-item label="授权标识" v-if="showPermission">
          <el-input v-model="form.permission" placeholder="请输入授权标识"></el-input>
        </el-form-item>
        <el-form-item label="图标" v-if="showIcon">
          <el-input v-model="form.icon" placeholder="请输入图标"></el-input>
        </el-form-item>
        <!--<el-form-item label="上级菜单" style="text-align:left;">-->
        <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
        <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="授权标识">-->
        <!--<el-input v-model="form.name"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item style="clear: both;width: 100%;text-align: right;margin-top: 10px">
          <button type="button" class="gy-button-extra" @click.stop="submitForm('form')">保存</button>
          <button type="button" class="gy-button-normal" @click="$router.push({path: 'list'})">取消</button>
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
            form: {
                name: '',
                url: '',
                radio: 0,
                permission: '',
                parentId: 0,
                parentId2: 0,
                parentName: '',
                parentName2: '',
                icon: '',
                frontUrl: '',
                radio2: 10
            },
            id: '',
            menuList: [],
            menuList2: [],
            menuListTreeProps: {
                children: 'children',
                label: 'name'
            },
            menuListTreeProps2: {
                children: 'children',
                label: 'name'
            },
            // defaultProps: {
            //     children: 'children',
            //     label: 'label'
            // },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            showName: true,
            showUrl: true,
            showIcon: true,
            showPermission: true,
            showFrontUrl: true,
            menuNShow: false,
            myoneMenu: false
        };
    },
    methods: {
        switchOption (typeId) {
            this.showName = true;
            this.showUrl = true;
            this.showIcon = true;
            this.showPermission = true;
            this.showFrontUrl = true;
            switch (typeId) {
            case 0: // 目录
                this.showUrl = false;
                this.showPermission = false;
                this.showFrontUrl = false;
                if (this.id) {
                    this.form.radio2 = 10;
                    this.myoneMenu = false;
                } else {
                    this.myoneMenu = true;
                }
                this.menuNShow = (this.form.radio2 === 20);
                break;
            case 1 : // 资源访问
                this.showPermission = false;
                this.myoneMenu = false;
                this.menuNShow = false;
                break;
            case 2: // 按钮
                this.showUrl = false;
                this.showIcon = false;
                this.showFrontUrl = false;
                this.myoneMenu = false;
                this.menuNShow = false;
                break;
            default:
                break;
            }
        },
        switchOption2 (v) {
            this.menuNShow = (v === 20);
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
        // 菜单树选中
        menuListTreeCurrentChangeHandle (data, node) {
            this.form.parentId = data.id;
            this.form.parentName = data.name;
        },
        // 菜单树选中2
        menuListTreeCurrentChangeHandle2 (data, node) {
            this.form.parentId2 = data.categoryType;
            this.form.parentName2 = data.name;
            this.form.name = data.name;
        },
        menuListTreeSetCurrentNode () {
            this.$refs.menuListTree.setCurrentKey(this.form.parentId);
            this.form.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name'];
        },
        menuListTreeSetCurrentNode2 () {
            this.$refs.menuListTree2.setCurrentKey(this.form.parentId2);
            this.form.parentName2 = (this.$refs.menuListTree2.getCurrentNode() || {})['name'];
        },
        toSubmit () {
            let method = this.id ? 'put' : 'post';
            let dataObj = {
                'name': this.form.name, // 目录名称
                'url': this.form.url, // 菜单UR
                'parentId': this.form.parentId, // 父类ID
                'isLeaf': this.form.radio, // 类型
                // 'category': 0, // 必填字段，菜单类别 （0：前台菜单 1：后台菜单）
                'permission': this.form.permission,
                'icon': this.form.icon,
                'frontUrl': this.form.frontUrl, // 前端路由
                'category': this.form.parentId2 // 前端路由
            };
            if (this.id) {
                dataObj.id = this.id;
            }
            this.$http({
                url: this.$api.menu.manage,
                method: method,
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.$router.push({path: 'list'});
                    this.$message.success('保存成功!');
                }
            }).catch((e) => {
            });
        },
        getData (id) {
            // ID有值说明为修改
            if (id) {
                this.id = id;
                this.form.radio2 = 10;
                this.myoneMenu = false;
            }
            this.$http.get(this.$api.menu.manageList2).then(({data}) => {
                if (data.code === 0) {
                    this.menuList2 = treeDataTranslate(data.data, 'id');
                }
            });
            this.$http.get(this.$api.menu.manageList).then(({data}) => {
                if (data.code === 0) {
                    this.menuList = treeDataTranslate(data.data, 'id');
                }
            }).then(() => {
                if (this.id) { // 修改
                    this.$http.get(this.$api.menu.info + this.id).then((data) => {
                        if (data.data.code === 0) {
                            this.form.parentId = data.data.data.parentId;
                            this.form.radio = data.data.data.isLeaf;
                            // this.$refs.menuListTree.setCheckedKeys(arr);
                            this.form.name = data.data.data.name;
                            this.form.url = data.data.data.url;
                            this.form.permission = data.data.data.permission;
                            this.form.icon = data.data.data.icon;
                            this.form.frontUrl = data.data.data.frontUrl;
                            this.menuListTreeSetCurrentNode();
                            this.switchOption(data.data.data.isLeaf);
                        }
                    });
                } else { // 添加
                    this.switchOption(0);
                }
            }).catch((e) => {
            });
        }
    },
    created () {
        let id = this.$route.query.id;
        this.getData(id);
    }
};
</script>
<style scoped lang="scss">
.el-form-item {
    width: 50%;
    box-sizing: border-box;
    float: left;
}
.el-form-item:nth-child(odd) {
  padding-right: 60px;
}
/deep/ .el-form-item__label {
  width: 68px !important;
  margin-left:10px;
}
/deep/ .el-form-item__content {
  margin-left: 80px!important;
}
.mleft-none{
  /deep/ .el-form-item__label{
    margin-left:0;
  }
}
.detail-info {
    padding-top: 15px;
}
.gy-button-extra {
    margin-right: 8px;
}
.el-radio + .el-radio{
  margin-left: 25px;
}
.detail-info .last-style{
  padding-right:0;
}
</style>
