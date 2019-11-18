<template>
    <div class="fieldsmanage">
        <div class="fieldsmanage-tit">
            字段管理
        </div>
        <div class="fieldsmanage-btns">
            <button class="gy-button-extra" @click="addFields('add', '', fieldstit = '新增自定义字段')">新增</button>
        </div>
        <div class="table-box">
            <table class="gy-table">
                <thead>
                    <tr>
                        <th>中文名称</th>
                        <th>英文名称</th>
                        <th>类型</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in fieldsList" :key="index">
                    <tr>
                        <td>{{item.cnName}}</td>
                        <td>{{item.enName}}</td>
                        <td>{{type[item.fieldType]}}</td>
                        <td>{{item.valid==1?'显示':'隐藏'}}</td>
                        <td class="align-c">
                            <button class="gy-button-view" @click="addFields('save', item, fieldstit = '新增自定义字段')">编辑</button>
                            <button v-if="item.valid==1" class="gy-button-view" @click="isShow(item.id)">显示</button>
                            <button v-if="item.valid==0" class="gy-button-view" @click="isHide(item.id)">隐藏</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="departmentName">共计{{total}}条记录</div>
        </div>
        <div>
            <el-pagination
                v-if="total !== 0"
                class="pagination-box"
                background
                @current-change="changeSelect"
                @size-change="sizeChange"
                layout="prev, pager, next"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
        </div>
        <!-- 弹出框 -->
        <el-dialog :width="dialog.kwidth" class="addDialog AddressManagement" :title="fieldstit"
            :visible.sync="dialog.Visible">
                <!-- 开始 -->
                <div class="adrd-warp clearfix">
                    <div class="gy-form-group">
                        <span class="l is-required">中文名称</span>
                        <input class="gy-input" maxlength="20" v-model="addForm.cnName" placeholder="请输入" type="text">
                    </div>
                    <div class="gy-form-group">
                        <span class="l is-required">英文名称</span>
                        <input class="gy-input" maxlength="40" v-model="addForm.enName" placeholder="请输入" type="text">
                    </div>
                    <div class="gy-form-group">
                        <span class="l is-required">类型</span>
                        <el-select v-model="addForm.fieldType"  placeholder="请选择">
                            <el-option
                                v-for="item in fieldTypeList"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <i
                        v-if="addForm.fieldType ==3"
                        @click="addEnumerated"
                        class="el-icon-circle-plus add_contact"
                        ></i>
                    </div>
                    <div v-if="addForm.fieldType ==3">
                    <div >
                       <div class="gy-form-group cl" v-for="(item, index) in addForm.options" :key="index">
                            <span class="l">下拉选项{{index+1}}</span>
                            <input class="gy-input" maxlength="20" v-model="addForm.options[index]" placeholder="请输入" type="text">
                            <i
                            @click="delEnumerated(index)"
                            class="el-icon-remove delete_bank"
                            ></i>
                        </div>
                    </div>
                    </div>
                    <!-- 结束 -->
                    <div class="adddialog-footer cl">
                        <span slot="footer" class="dialog-footer fr">
                            <!-- 新增确定 -->
                            <button v-if="dialog.type == 1" class="gy-button-extra mr10" @click="confirmfields()">确定</button>
                            <!-- 编辑确定 -->
                            <button v-if="dialog.type == 2" class="gy-button-extra mr10" @click="compilefields()">确定</button>
                            <!-- 删除确定 -->
                            <button class="gy-button-normal" @click="dialog.Visible = false">取消</button>
                        </span>
                    </div>
                </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'fieldsManage',
    data () {
        return {
            fieldstit: null,
            fieldsList: [],
            dialog: {
                type: null,
                title: null,
                open: false,
                kwidth: null,
                Visible: null
            },
            addForm: {
                cnName: null,
                enName: null,
                fieldType: null,
                options: []
            },
            seachForm: {
                pageNum: 1,
                pageSize: 10
            },
            pageNum: 1,
            pageSize: 10,
            total: 0,
            type: ['', '字符串', '数值', '枚举', '日期'],
            fieldTypeList: [
                {id: 1, type: '字符串'},
                {id: 2, type: '数值'},
                {id: 3, type: '枚举'},
                {id: 4, type: '日期'}
            ],
            tradeModeOptionStatus: []
        };
    },
    created () {
        this.getfieldsPage(); // 获取扩展字段分页列表
    },
    methods: {
        // 获取扩展字段分页列表
        getfieldsPage () {
            this.$http.get(this.$api.role.fieldsPage, {params: {pageNum: this.pageNum, pageSize: this.pageSize}}).then((res) => {
                if (res.data.code === 0) {
                    console.log(res.data.data.list);
                    this.fieldsList = res.data.data.list;
                    this.total = res.data.data.total;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        addFields (option, row, formName) {
            this.dialog.kwidth = '50%';
            this.dialog.Visible = true;
            if (option === 'add') {
                this.dialog.type = 1;
                this.addForm = {
                    cnName: null,
                    enName: null,
                    fieldType: null,
                    options: []
                };
            } else if (option === 'save') {
                this.addForm = Object.assign({}, row);
                this.dialog.type = 2;
            }
        },
        // 显示
        isShow (valid) {
            this.$http.put(this.$api.role.obtainfields + '/' + valid + '/hide').then((res) => {
                if (res.data.code === 0) {
                    this.getfieldsPage(); // 获取扩展字段分页列表
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 隐藏
        isHide (valid) {
            this.$http.put(this.$api.role.obtainfields + '/' + valid + '/show').then((res) => {
                if (res.data.code === 0) {
                    this.getfieldsPage(); // 获取扩展字段分页列表
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 添加枚举
        addEnumerated () {
            this.addForm.options.push('');
            // console.log(this.addForm.options);
        },
        // 新增确定
        confirmfields () {
            if (!this.check()) {
                return false;
            }
            this.$http.post(this.$api.role.obtainfields, this.addForm).then((res) => {
                if (res.data.code === 0) {
                    this.dialog.Visible = false;
                    this.getfieldsPage();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 编辑确定
        compilefields () {
            console.log(this.addForm);
            if (!this.check()) {
                return false;
            }
            this.$http.put(this.$api.role.obtainfields, this.addForm).then((res) => {
                if (res.data.code === 0) {
                    this.dialog.Visible = false;
                    this.getfieldsPage();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        delEnumerated (index) {
            this.addForm.options.splice(index, 1);
        },
        changeSelect (pageNum) {
            this.pageNum = pageNum;
            this.getfieldsPage();
        },
        sizeChange (val) {
            this.pageSize = val;
        },
        // 验证
        check () {
            // var rex = /^[a-zA-Z\s]+$/;
            var rex = /^[A-Za-z0-9-_]+$/;
            console.log(rex.test(this.addForm.enName));
            if (!rex.test(this.addForm.enName)) {
                this.$message('请输入英文');
                return false;
            }
            let nary = this.addForm.options.sort();
            for (var i = 0; i < this.addForm.options.length; i++) {
                if (nary[i] === nary[i + 1]) {
                    this.$message('下拉选项已存在');
                    return false;
                }
            }
            return true;
        }
    }
};
</script>
<style lang="scss" scoped>
.fieldsmanage {
    .fieldsmanage-tit{
        padding: 3px 16px;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        border-bottom: 1px solid #E7ECF1;
    }
    .fieldsmanage-btns {
        margin: 20px 16px 10px 0;
        text-align: right;
    }
    .table-box {
        margin: 10px 16px 0 16px;
        input, span {
            vertical-align: middle;
        }
        .gy-table {
            tr{
                cursor: pointer;
            }
            .wid60{
                width: 50px;
            }
            .wid150{
                width: 150px;
            }
        }
        .nowrap {
            width: 150px;
            display: block;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .departmentName{
            margin-top: 20px;
            font-size: 12px;
            color: #666;
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
            .add_contact {
                position: absolute;
                right: 5px;
                top: 12px;
                display: inline-block;
                font-size: 23px;
                color: #ccc;
                cursor: pointer;
            }
            .delete_bank {
                position: absolute;
                right: 5px;
                top: 12px;
                display: inline-block;
                font-size: 23px;
                color: #ccc;
                cursor: pointer;
            }
            .is-required::before {
                content: "*";
                color: #e0370f;
                font-size: 12px;
                font-weight: 400;
                position: absolute;
                margin-left: -8px;
                left: 0px;
                top: 0;
            }
        }
        .adddialog-footer{
            width:100%;
            height:18px;
            padding: 0 30px;
            margin: 22px auto;
        };
        .mr10 {
            margin-right: 10px;
        }
    }
}
</style>
<style lang="scss">
.btn-custom-cancel {
    float: right;
    margin-left: 10px;
}
.fieldsmanage{
    .AddressManagement{
        .el-dialog__header {
            border-bottom: 1px solid #DCE0E4;
            padding: 15px;
        }
        .el-dialog__body {
            padding: 10px 0px 15px 30px;
        }
        .el-message-box__wrapper .el-button--primary{
            background:#e0370f;
            border-color:#e0370f;
        }
    }
}
</style>
