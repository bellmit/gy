<template>
    <div class="flow-detail">
        <!-- 基本信息 -->
        <div class="base clearfix">
            <div class="title">基本信息</div>
            <div class="gy-form-group">
                <span class="l">类别</span>
                <el-select v-model="apprData.processType" :disabled="editDisableRule">
                    <el-option
                            v-for="(item, index) in categoryList"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">详情</span>
                <input class="gy-input" type="text" v-model="apprData.processName">
            </div>
            <div class="gy-form-group">
                <span class="l">匹配条件</span>
                <input class="gy-input" type="text" v-model="apprData.processExpress">
            </div>
            <div class="gy-form-group">
                <span class="l">备注</span>
                <input class="gy-input" type="text" v-model="apprData.remarks">
            </div>
        </div>
        <!-- 审批流程 -->
        <div class="approval clearfix">
            <div class="title">执行流程</div>
            <ul>
                <li v-for="(items, index) in apprData.itemList" :key="index" class="clearfix" @mouseover="onInter(index)" @mouseout="onOut(index)">
                    <div class="gy-form-group gy-execution-process" style="width: 100%">
                        <span class="l executionProcess">第{{index + 1}}步：</span>
                        <input style="width: 50%" type="text" placeholder="请输入执行环节描述" v-model="items.ruleName">
                    </div>
                    <div v-if="addDele === index">
                        <button v-if="items.nodeType==0" class="gy-button-normal delect-style" @click="dele(index)">删除步骤</button>
                        <button v-if="items.nodeType==0 || items.canAddBefNodeFlg==1" class="gy-button-normal add-style" @click="add(index)">新增步骤</button>
                    </div>
                    <div class="gy-form-group gy-approval" v-if="index !== 0">
                        <span class="l" v-if="items.nodeType!=1">
                          <el-select v-model="items.matchFlg" @change="onChangeMatchType($event, items)">
                            <el-option label="请选择" value="0"></el-option>
                            <el-option label="指定人员" value="1"></el-option>
                            <el-option label="按岗位" value="2"></el-option>
                            <el-option label="条件匹配" value="3"></el-option>
                          </el-select>
                        </span>
                        <input class="gy-input r" type="text" v-if="items.matchFlg == 1 " placeholder="请选择人员" :value="items.userNames" @click="openUsrSelDlg(0, index, 1)">
                        <input class="gy-input r" type="text" v-if="items.matchFlg == 2 && items.nodeType!=2" placeholder="请选择岗位" :value="items.roleNames" @click="openRoleSelDlg(0, index, 2)">
                    </div>
                    <div class="gy-form-group gy-approvaled" v-if="items.matchFlg == 3 && index !== 0" v-for="(vals,entryIdx) in items.entryList" :key="entryIdx">
                        <span class="l">条件{{entryIdx+1}}</span>
                        <input type="text" style="width: 250px" placeholder="请输入匹配条件" v-model="vals.condition">
                          <input type="text" style="width:80px;margin-left:20px" placeholder="请选择人员" @click="openUsrSelDlg(2, index, 3, entryIdx)" v-model="vals.userNames">
                        <i class="iconfont icon-dele icon-del-span" @click="deleCondition(index, entryIdx, items.entryList)"></i>
                        <i v-if="items.entryList.length==entryIdx+1" class="iconfont icon-add icon-add-span" @click="addCondition(index, entryIdx, items.entryList)"></i>
                    </div>
                </li>
                <li class="clearfix" v-if="apprData.canAddNodeFlg === 1">
                    <div class="gy-form-group"></div>
                    <div class="gy-form-group">
                        <button class="gy-button-normal add-style" @click="add(-1)">新增步骤</button>
                    </div>
                </li>
            </ul>
            <!-- 添加审批流程 -->
            <div class="add clearfix" @click="add()" v-if="showAddRuleBtn"><i class="iconfont icon-add" style="margin-left:8px;margin-right:8px"></i>添加审批环节</div>
            <!-- 抄送此流程审核 -->
            <div class="copy" style="margin-top:25px" v-if="canEdit==1">
                <el-checkbox v-model="checked">流程审批通过后抄送以下人员</el-checkbox>
                <div class="sele" v-if="checked">
                    <div class="" style="max-width: 1009px;margin-top:5px">
                      <span>
                        <span class="el-tag el-tag--info el-tag--small" style="margin-left:5px" v-for="(items, index) in apprData.ccList" :key="index">
                          <span class="el-select__tags-text">{{items.userName}}</span><i class="el-tag__close el-icon-close" @click="deleCC(index)"></i>
                        </span>
                        <div class="iconfont icon-add" style="color:#4C97FC;margin-left:2px" @click="openUsrSelDlg(1)"><span style="font-size:small;margin-left:8px">添加抄送人</span></div>
                      </span>
                    </div>
                </div>
            </div>
          <!-- 设置关联的下一个流程 -->
          <div class="copy" style="margin-top:25px" v-if="canEdit==1">
            <el-checkbox v-model="hasNextProc" @change="checkNextProc">指派下一个关联流程的执行发起人</el-checkbox>
            <div class="sele" v-if="hasNextProc">
                <div class="gy-form-group gy-approval">
                  <span class="l">
                    <el-select v-model="nextProcObj.matchFlg" @change="onChangeMatchType($event, nextProcObj, true)">
                      <el-option v-for="(item, index) in $constant.distMatchTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </span>
                  <input class="gy-input r" type="text" v-if="nextProcObj.matchFlg == 1" placeholder="请选择人员" :value="nextProcObj.userNames" @click="openUsrSelDlg(0, 1)">
                  <input class="gy-input r" type="text" v-if="nextProcObj.matchFlg == 2" placeholder="请选择岗位" :value="nextProcObj.roleNames" @click="openRoleSelDlg(0, 2)">
                </div>
                <div class="gy-form-group gy-approvaled" v-if="nextProcObj.matchFlg == 3" v-for="(vals, entryIdx) in nextProcObj.entryList" :key="entryIdx">
                  <span class="l">条件{{entryIdx+1}}</span>
                  <input type="text" style="width: 250px" placeholder="请输入匹配条件" v-model="vals.condition">
                  <input type="text" style="width:80px;margin-left:20px" placeholder="请选择人员" @click="openUsrSelDlg(2, -1, 3, entryIdx)" v-model="vals.userNames">
                  <i class="iconfont icon-dele icon-del-span" @click="deleCondition(-1, entryIdx, nextProcObj.entryList)"></i>
                  <i v-if="nextProcObj.entryList.length==entryIdx+1" class="iconfont icon-add icon-add-span" @click="addCondition(-1, entryIdx, nextProcObj.entryList)"></i>
                </div>
            </div>
          </div>
        </div>
        <!-- 保存 -->
        <div class="submit-wrap clearfix">
            <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
            <button class="gy-button-normal my-botton" @click="saveApprInfo">保存</button>
        </div>
        <!-- userList 弹窗组件 -->
        <userList ref="myUserDlg" @affirmUser="affirmUser"></userList>
        <roleList ref="myRoleDlg" @affirmRole="affirmRole"></roleList>
        <el-dialog title="请选择规则类型" :visible.sync="outerVisible" width="450px">
          <div style="margin-left: 30px">
              <div>
                <el-button type="text" @click="setNewConditionType(1)">1、商品名称</el-button>
              </div>
              <div>
                <el-button type="text" @click="setNewConditionType(2)">2、按执行人员分组</el-button>
              </div>
              <div>
                <el-button type="text" @click="setNewConditionType(3)">3、按业务人员分组</el-button>
              </div>
              <div>
                <el-button type="text" @click="setNewConditionType(4)">4、不限制人员分组</el-button>
              </div>
              <div>
                <el-button type="text" @click="setNewConditionType(5)">5、我方公司</el-button>
              </div>
              <div>
                <el-button type="text" @click="setNewConditionType(6)">6、业务类型</el-button>
              </div>
              <div>
                <el-button type="text" @click="setNewConditionType(7)">7、固定表达式(目前仅用于无进项票的开票审批)</el-button>
              </div>
              <div>
                <el-button type="text" @click="setNewConditionType(8)">8、直接输入表达式</el-button>
              </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import userList from '@/components/selectPersonnel';
import roleList from '@/components/selectRole';
// import index from "../../store";
export default {
    components: {
        userList, roleList
    },
    data () {
        return {
            outerVisible: false,
            checked: false, // 是否抄送
            categoryList: this.$constant.apprProcTypeCateList,
            // 抄送selete
            showAddRuleBtn: 0,
            editDisableRule: true,
            apprData: {},
            dialogTableVisible: false,
            userList: [],
            userTotal: 0,
            addUsrFlg: 0, // 判断是添加审批人还是抄送
            userform: {
                pageNum: 1,
                pageSize: 10,
                userName: ''
            },
            currSelUser: null,
            currSelRowIdx: null,
            currSelEntryIdx: null,
            defaultNameVal: '默认为审批流程发起人',
            canEdit: 1,
            addDele: null,
            apprLength: null,
            hasNextProc: false, // 是否有下个关联流程
            nextProcObj: null // 下个关联流程的数据
        };
    },
    created () {
        this.canEdit = this.$route.query.canEdit;
        this.getApproveInfo();
    },
    methods: {
        // 鼠标进入
        onInter (val) {
            this.addDele = val;
        },
        // 鼠标滑出
        onOut (val) {
            this.addDele = (val + 999);
        },
        onChangeMatchType (event, items) {
            if (parseInt(event) === 3) {
                if (items.entryList === undefined || items.entryList === null) {
                    items.entryList = [];
                }
                if (items.entryList.length === 0) {
                    let entryItem = {
                        condition: '',
                        userIds: [],
                        userNames: []
                    };
                    items.entryList.push(entryItem);
                }
            }
        },
        // 条件---删除
        deleCondition (liIdx, entryIdx, entryList) {
            entryList.splice(entryIdx, 1);
            if (entryList.length === 0) {
                // 如果删空了
                let entryItem = {
                    condition: '',
                    userIds: [],
                    userNames: []
                };
                entryList.push(entryItem);
            }
        },
        // 条件---新增
        addCondition (liIdx, entryIdx, entryList) {
            if (entryList === null) {
                entryList = [];
            }
            let entryItem = {
                condition: '',
                userIds: [],
                userNames: []
            };
            entryList.push(entryItem);
        },
        /* userList 弹窗组件 - 返回数据 */
        affirmUser (data) {
            // 0 取消 1 确定
            if (data.type === 0) {
                return false;
            }
            /* 先判断是添加审批人还是抄送人 */
            if (this.addUsrFlg === 1) {
                // 添加抄送人
                let usrObj = {
                    userId: data.usrUserId,
                    userName: data.userName
                };
                if (this.apprData.ccList == null || this.apprData.ccList === undefined) {
                    this.apprData.ccList = [];
                }
                if (usrObj.userId !== null && usrObj.userName !== null) {
                    this.apprData.ccList.push(usrObj);
                }
            } else if (this.addUsrFlg === 0) {
                // 添加审批人
                if (this.apprData.itemList[this.currSelRowIdx].userIds === null || this.apprData.itemList[this.currSelRowIdx].userIds === undefined) {
                    this.apprData.itemList[this.currSelRowIdx].userIds = [];
                }
                this.apprData.itemList[this.currSelRowIdx].userIds.pop();
                this.apprData.itemList[this.currSelRowIdx].userIds.push(data.usrUserId);

                if (this.apprData.itemList[this.currSelRowIdx].userNames === null || this.apprData.itemList[this.currSelRowIdx].userNames === undefined) {
                    this.apprData.itemList[this.currSelRowIdx].userNames = [];
                }
                this.apprData.itemList[this.currSelRowIdx].userNames.pop();
                this.apprData.itemList[this.currSelRowIdx].userNames.push(data.userName);
            } else if (this.addUsrFlg === 2) {
                // 条件匹配时，设置审批人
                this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx].userIds.push(data.usrUserId);
                this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx].userNames.push(data.userName);
            }
        },
        /* roleList 弹窗组件 - 返回数据 */
        affirmRole (data) {
            // 0 取消 1 确定
            if (data.type === 0) {
                return false;
            }
            // 设置岗位ID
            if (this.apprData.itemList[this.currSelRowIdx].roleIds === null || this.apprData.itemList[this.currSelRowIdx].roleIds === undefined) {
                this.apprData.itemList[this.currSelRowIdx].roleIds = [];
            }
            this.apprData.itemList[this.currSelRowIdx].roleIds.pop();
            this.apprData.itemList[this.currSelRowIdx].roleIds.push(data.id);
            // 设置岗位名称
            if (this.apprData.itemList[this.currSelRowIdx].roleNames === null || this.apprData.itemList[this.currSelRowIdx].roleNames === undefined) {
                this.apprData.itemList[this.currSelRowIdx].roleNames = [];
            }
            this.apprData.itemList[this.currSelRowIdx].roleNames.pop();
            this.apprData.itemList[this.currSelRowIdx].roleNames.push(data.name);
        },
        checkCopy (val) {
            // 设置流程抄送
            this.checked = val;
        },
        checkNextProc (val) {
            if (val && this.hasNextProc && (this.nextProcObj == null || this.nextProcObj === undefined)) {
                this.nextProcObj = {};
                this.nextProcObj.entryList = [];
            }
        },
        openUsrSelDlg (flg, tblIdx, matchFlg, entryIdx) {
            if (this.canEdit === 0) {
                return false;
            }
            this.userform.userName = null;
            if (flg === 1) {
                // 添加抄送人
                this.addUsrFlg = 1;
            } else if (flg === 0) {
                // 添加审批人
                if (parseInt(matchFlg) !== 1) {
                    return false;
                }
                this.addUsrFlg = 0;
                this.currSelRowIdx = tblIdx;
            } else if (flg === 2) {
                // 条件匹配中添加审批人
                if (parseInt(matchFlg) !== 3) {
                    return false;
                }
                this.addUsrFlg = 2;
                this.currSelRowIdx = tblIdx;
                this.currSelEntryIdx = entryIdx;
            }
            this.$refs.myUserDlg.getUsers();
        },
        openRoleSelDlg (flg, tblIdx, matchFlg) {
            if (this.canEdit === 0) {
                return false;
            }
            if (parseInt(matchFlg) !== 2) {
                return false;
            }
            this.currSelRowIdx = tblIdx;
            this.$refs.myRoleDlg.getRoles();
        },
        add (v) {
            // 添加审批环节
            console.log(v);
            let params = {ruleName: '', nodeType: 0};
            if (v === -1) {
                this.apprData.itemList.push(params);
            } else {
                this.apprData.itemList.splice(v, 0, params);
            }
            this.showAddRuleBtn = 0;
        },
        dele (v) {
            // 删除审批环节
            this.apprData.itemList.splice(v, 1);
            if (this.apprData.itemList.length === 0) {
                this.showAddRuleBtn = 1;
            }
        },
        getApproveInfo () {
            // 获取审批流程定义数据
            this.$http.get(this.$api.apprProc.getApproveInfo + this.$route.query.apprRuleId).then((res) => {
                if (res.data.code === 0) {
                    this.apprData = res.data.data;
                    this.nextProcObj = this.apprData.nextNode;
                    if (this.nextProcObj && this.nextProcObj.matchFlg) {
                        this.hasNextProc = true;
                    }
                    if (this.apprData.itemList) {
                        this.apprLength = this.apprData.itemList.length;
                        this.apprData.itemList.forEach(item => {
                            item.matchFlg = String(item.matchFlg); // 注意：提交保存的时候要再把matchFlg转换为数字类型
                            item.showOptBtn = 0;
                        });
                    }
                    if (this.apprData.ccFlg === 1) {
                        if (this.apprData.itemList.length === 0) {
                            this.showAddRuleBtn = 1;
                        }
                        this.checked = true;
                    }
                } else {
                    this.$alert(res.data.code + ' ' + res.data.message);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        saveApprInfo () {
            let that = this;
            that.$confirm('确定修改流程定义？此操作不可恢复，请确认。', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 保存审批流程定义数据
                that.$http.post(that.$api.apprProc.saveApproveInfo, that.apprData).then((res) => {
                    if (res.data.code === 0) {
                        that.$message({
                            message: '保存成功',
                            type: 'warning'
                        });
                    } else {
                        that.$alert(res.data.code + ' ' + res.data.message);
                    }
                });
            });
        },
        deleCC (v) {
            // 删除抄送人
            this.apprData.ccList.splice(v, 1);
        },
        changeXrefUser () {
            // 先判断是添加审批人还是抄送
            if (this.addUsrFlg === 1) {
                // 添加抄送人
                if (this.currSelUser) {
                    let usrObj = {
                        userId: this.currSelUser.usrUserId,
                        userName: this.currSelUser.userName
                    };
                    if (this.apprData.ccList == null || this.apprData.ccList === undefined) {
                        this.apprData.ccList = [];
                    }
                    this.apprData.ccList.push(usrObj);
                }
            } else {
                // 添加审批人
                if (this.apprData.itemList[this.currSelRowIdx].userIds === null || this.apprData.itemList[this.currSelRowIdx].userIds === undefined) {
                    this.apprData.itemList[this.currSelRowIdx].userIds = [];
                }
                this.apprData.itemList[this.currSelRowIdx].userIds.pop();
                this.apprData.itemList[this.currSelRowIdx].userIds.push(this.currSelUser.usrUserId);

                if (this.apprData.itemList[this.currSelRowIdx].userNames === null || this.apprData.itemList[this.currSelRowIdx].userNames === undefined) {
                    this.apprData.itemList[this.currSelRowIdx].userNames = [];
                }
                this.apprData.itemList[this.currSelRowIdx].userNames.pop();
                this.apprData.itemList[this.currSelRowIdx].userNames.push(this.currSelUser.userName);
            }

            this.dialogTableVisible = false;
        },
        openNewConditionTypeDlg (newType) {
            this.outerVisible = true;
        },
        setNewConditionType (newType) {
            this.outerVisible = false;
        }
    }
};
</script>
<style lang="scss" scoped>
    .flow-detail {
        margin: 0 20px 0 20px;
        .title {
            font-size: 18px;
            color: #333333;
            margin: 20px 0;
        }
        .approval {
            margin-top: 23px;
            li {
                position: relative;
                .icon-dele:before {
                    color: #E0370F;
                }
                .icon-del-span {
                    right: 430px;
                }
                .icon-add-span {
                    right: 400px;
                }
                .icon-add:before {
                    color: #4C97FC;
                }
                .iconfont {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-left: 40px;
                }
            }
            .add {
                margin-top: 20px;

                .icon-add:before {
                    color: #4C97FC;
                }
            }
            .copy {
                padding: 0 40px 0 8px;
                .my-select {
                    padding-left: 24px;
                }
            }
        }
        .submit-wrap {
            margin-top: 30px;
            text-align: center;
            .my-botton {
                width: 70px;
                height: 35px;
                color: #fff;
                border: 0;
                background-color: #F2AC4C;
            }
        }
        .icon-search {
            position: absolute;
            top: auto;
            left: auto;
            right: 17px;
            bottom: 17px;
        }
        .elRow {
            margin-top: 20px;
        }
        .executionProcess{
            width: 60px;
        }
        .gy-execution-process{
            padding: 6px 40px 6px 80px
        }
        .gy-approval{
            padding: 6px 40px 6px 140px;
            margin-left: 60px;
            r{
                width: 202px!important;
            }
        }
        .gy-approvaled{
            width: 100%;
            padding: 6px 40px 6px 80px;
            margin-left: 120px;
        }
        .add-style{
            position: absolute;
            right: 120px;
        }
        .delect-style{
            position: absolute;
            right: 20px;
        }
    }
</style>
