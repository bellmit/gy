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
                    <div class="add-step" v-show="addDele === index">
                        <button v-if="items.nodeType==0" class="gy-button-normal delect-style" @click="dele(index)">删除步骤</button>
                        <button v-if="items.nodeType==0 || items.canAddBefNodeFlg==1" class="gy-button-normal add-style" @click="add(index)">新增步骤</button>
                    </div>
                    <div class="gy-form-group gy-execution-process" style="width: 100%">
                        <span class="l executionProcess">第{{index + 1}}步：</span>
                        <input style="width: 50%" type="text" placeholder="请输入执行环节描述" v-model="items.ruleName">
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
                    <div v-if="items.matchFlg == 3 && index !== 0" v-for="(vals, entryIdx) in items.entryList" class="matching-item" :key="entryIdx">
                        <div class="gy-form-group gy-approvaled matching-conditions-wrapper" v-for="(itemKey, idxKey) in vals.haveCondition" :key="idxKey">
                            <div class="l" v-if="idxKey === 0">条件{{entryIdx+1}}</div>
                            <div class="content">
                                <div class="matching-conditions">
                                    <div class="c mr-20">
                                        <el-select v-model="vals.haveCondition[idxKey]" @change="changeConditionKey($event, index, entryIdx, idxKey)">
                                            <el-option label="请选择匹配规则" value="0"></el-option>
                                            <el-option label="按商品划分" v-if="!vals.haveCondition.includes('productId') || itemKey === 'productId'" value="productId"></el-option>
                                            <el-option label="按执行人员分组" v-if="!vals.haveCondition.includes('executorId') || itemKey === 'executorId'" value="executorId"></el-option>
                                            <el-option label="按业务人员分组" v-if="!vals.haveCondition.includes('operatorId') || itemKey === 'operatorId'" value="operatorId"></el-option>
                                            <el-option label="按我方公司划分" v-if="!vals.haveCondition.includes('targetCorpId') || itemKey === 'targetCorpId'" value="targetCorpId"></el-option>
                                            <el-option label="按业务类型划分" v-if="!vals.haveCondition.includes('bizTradeType') || itemKey === 'bizTradeType'" value="bizTradeType"></el-option>
                                        </el-select>
                                    </div>
                                    <div class="c w">
                                        <div class="el-select nameKey-content selects" v-if="itemKey === 'targetCorpId'" @click.stop="listShow(`${items.id}${entryIdx}${idxKey}`)">
                                            <div style="line-height: 1">
                                                    <span v-for="(name, nameIdx) in vals.condition.targetCorpNames" :key="nameIdx" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                        class="el-select__tags-text">{{name}}</span><i
                                                        class="el-tag__close el-icon-close" @click.stop="deleteNameKey(index, entryIdx, nameIdx, 'targetCorpId')"></i></span>
                                            </div>
                                            <div class="el-select-dropdown el-popper is-multiple gy-ul" style="display: none" :id="`${items.id}${entryIdx}${idxKey}`" v-clickOutside="listHide">
                                                <ul class="el-scrollbar__view el-select-dropdown__list">
                                                    <li class="el-select-dropdown__item"
                                                        @click="changeConditionVal(index, entryIdx, targetCorp, 'targetCorpId')"
                                                        v-for="targetCorp in apprData.conditionValue.targetCorp"
                                                        :class="{'selected' : vals.condition.targetCorpId.includes(targetCorp.id)}"
                                                        :key="targetCorp.id">
                                                        <span>{{targetCorp.name}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="el-select nameKey-content selects" v-else-if="itemKey === 'bizTradeType'" @click.stop="listShow(`${items.id}${entryIdx}${idxKey}`)">
                                            <div style="line-height: 1">
                                                    <span v-for="(name, nameKey)  in vals.condition.bizTradeTypeNames" :key="nameKey" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                        class="el-select__tags-text">{{name}}</span><i
                                                        class="el-tag__close el-icon-close" @click.stop="deleteNameKey(index, entryIdx, nameKey, 'bizTradeType')"></i></span>
                                            </div>
                                            <div class="el-select-dropdown el-popper is-multiple gy-ul" style="display: none" :id="`${items.id}${entryIdx}${idxKey}`" v-clickOutside="listHide">
                                                <ul class="el-scrollbar__view el-select-dropdown__list">
                                                    <li class="el-select-dropdown__item"
                                                        @click="changeConditionVal(index, entryIdx, bizTradeType, 'bizTradeType')"
                                                        v-for="bizTradeType in apprData.conditionValue.bizTradeType"
                                                        :class="{'selected' : vals.condition.bizTradeType.includes(bizTradeType.id)}"
                                                        :key="bizTradeType.id">
                                                        <span>{{bizTradeType.name}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!--选择产品-->
                                        <div class="el-select nameKey-content" v-else-if="itemKey === 'productId'" @click="productChange(index, entryIdx, idxKey, 'productId')">
                                            <div style="line-height: 1">
                                                <span v-for="(name, nameKey) in vals.condition.productNames" :key="nameKey" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                    class="el-select__tags-text">{{name}}</span><i
                                                    class="el-tag__close el-icon-close" @click.stop="deleteNameKey(index, entryIdx, nameKey, 'productId')"></i></span>
                                            </div>
                                        </div>
                                        <!--执行人员-->
                                        <div class="el-select nameKey-content" v-else-if="itemKey === 'executorId'" @click="openUsrSelDlg(3, index, 3, entryIdx, idxKey, 'executorId')">
                                            <div style="line-height: 1">
                                                <span v-for="(name, nameKey) in vals.condition.executorNames" :key="nameKey" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                    class="el-select__tags-text">{{name}}</span><i
                                                    class="el-tag__close el-icon-close" @click.stop="deleteNameKey(index, entryIdx, nameKey, 'executorId')"></i></span>
                                            </div>
                                        </div>
                                        <!--业务人员-->
                                        <div class="el-select nameKey-content" v-else-if="itemKey === 'operatorId'" @click="openUsrSelDlg(3, index, 3, entryIdx, idxKey, 'operatorId')">
                                            <div style="line-height: 1">
                                                <span v-for="(name, nameKey) in vals.condition.operatorNames" :key="nameKey" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                    class="el-select__tags-text">{{name}}</span><i
                                                    class="el-tag__close el-icon-close" @click.stop="deleteNameKey(index, entryIdx, nameKey, 'operatorId')"></i></span>
                                            </div>
                                        </div>
                                        <el-select v-model="vals.condition.val" v-else>
                                        </el-select>
                                    </div>
                                    <i class="iconfont icon-dele icon-del-span" v-if="vals.haveCondition.length > 1" @click="doDeleteConditionKey(index, entryIdx, idxKey, itemKey)"></i>
                                </div>
                                <i class="iconfont icon-add icon-add-span" v-if="idxKey === vals.haveCondition.length - 1" @click="doAddConditionKey(index, entryIdx)"></i>
                            </div>
                        </div>
                        <div class="gy-form-group gy-approvaled">
                            <div class="l">审批人</div>
                            <div class="examiner">
                                <div class="c w">
                                    <input type="text" style="padding-left:20px" placeholder="请选择人员" @click="openUsrSelDlg(2, index, 3, entryIdx)" v-model="vals.userNames">
                                </div>
                            </div>
                            <i class="iconfont icon-del1 icon-del-span" v-if="items.entryList.length > 1" @click="deleCondition(index, entryIdx, items.entryList)"></i>
                            <i v-if="items.entryList.length==entryIdx+1" class="iconfont icon-add1 icon-add-span" @click="addCondition(index, entryIdx, items.entryList)"></i>
                        </div>
                    </div>
                </li>
                <li class="clearfix" v-if="apprData.canAddNodeFlg === 1">
                    <div class="gy-form-group"></div>
                    <div class="gy-form-group add-step">
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
            <div class="sele checkNextProc" v-if="hasNextProc">
                <div class="gy-form-group gy-approval">
                  <span class="l">
                    <el-select v-model="nextProcObj.matchFlg" @change="onChangeMatchType($event, nextProcObj, true)">
                      <el-option v-for="(item, index) in $constant.distMatchTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </span>
                  <input class="gy-input r" type="text" v-if="nextProcObj.matchFlg == 1" placeholder="请选择人员" :value="nextProcObj.userNames" @click="openUsrSelDlg(0, 1)">
                  <input class="gy-input r" type="text" v-if="nextProcObj.matchFlg == 2" placeholder="请选择岗位" :value="nextProcObj.roleNames" @click="openRoleSelDlg(0, 2)">
                </div>
                <div class="" v-if="nextProcObj.matchFlg == 3" v-for="(vals, entryIdx) in nextProcObj.entryList" :key="entryIdx">
                    <div class="gy-form-group gy-approvaled matching-conditions-wrapper" v-for="(itemKey, idxKey) in vals.haveCondition" :key="idxKey">
                        <div class="l" v-if="idxKey === 0">条件{{entryIdx+1}}</div>
                        <div class="content">
                            <div class="matching-conditions">
                                <div class="c mr-20">
                                    <el-select v-model="vals.haveCondition[idxKey]" @change="changeConditionKey($event, -1, entryIdx, idxKey)">
                                        <el-option label="请选择匹配规则" value="0"></el-option>
                                        <el-option label="按商品划分" v-if="!vals.haveCondition.includes('productId') || itemKey === 'productId'" value="productId"></el-option>
                                        <el-option label="按执行人员分组" v-if="!vals.haveCondition.includes('executorId') || itemKey === 'executorId'" value="executorId"></el-option>
                                        <el-option label="按业务人员分组" v-if="!vals.haveCondition.includes('operatorId') || itemKey === 'operatorId'" value="operatorId"></el-option>
                                        <el-option label="按我方公司划分" v-if="!vals.haveCondition.includes('targetCorpId') || itemKey === 'targetCorpId'" value="targetCorpId"></el-option>
                                        <el-option label="按业务类型划分" v-if="!vals.haveCondition.includes('bizTradeType') || itemKey === 'bizTradeType'" value="bizTradeType"></el-option>
                                    </el-select>
                                </div>
                                <div class="c w">
                                    <div class="el-select nameKey-content selects" v-if="itemKey === 'targetCorpId'" @click.stop="listShow(`nextProcObj${entryIdx}${idxKey}`)">
                                        <div style="line-height: 1">
                                                    <span v-for="(name, nameIdx) in vals.condition.targetCorpNames" :key="nameIdx" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                        class="el-select__tags-text">{{name}}</span><i
                                                        class="el-tag__close el-icon-close" @click.stop="deleteNameKey('nextProcObj', entryIdx, nameIdx, 'targetCorpId')"></i></span>
                                        </div>
                                        <div class="el-select-dropdown el-popper is-multiple gy-ul" style="display: none" :id="`nextProcObj${entryIdx}${idxKey}`" v-clickOutside="listHide">
                                            <ul class="el-scrollbar__view el-select-dropdown__list">
                                                <li class="el-select-dropdown__item"
                                                    @click="changeConditionVal('nextProcObj', entryIdx, targetCorp, 'targetCorpId')"
                                                    v-for="targetCorp in apprData.conditionValue.targetCorp"
                                                    :class="{'selected' : vals.condition.targetCorpId.includes(targetCorp.id)}"
                                                    :key="targetCorp.id">
                                                    <span>{{targetCorp.name}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="el-select nameKey-content selects" v-else-if="itemKey === 'bizTradeType'" @click.stop="listShow(`nextProcObj${entryIdx}${idxKey}`)">
                                        <div style="line-height: 1">
                                                    <span v-for="(name, nameKey) in vals.condition.bizTradeTypeNames" :key="nameKey" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                        class="el-select__tags-text">{{name}}</span><i
                                                        class="el-tag__close el-icon-close" @click.stop="deleteNameKey('nextProcObj', entryIdx, nameKey, 'bizTradeType')"></i></span>
                                        </div>
                                        <div class="el-select-dropdown el-popper is-multiple gy-ul" style="display: none" :id="`nextProcObj${entryIdx}${idxKey}`" v-clickOutside="listHide">
                                            <ul class="el-scrollbar__view el-select-dropdown__list">
                                                <li class="el-select-dropdown__item"
                                                    @click="changeConditionVal('nextProcObj', entryIdx, bizTradeType, 'bizTradeType')"
                                                    v-for="bizTradeType in apprData.conditionValue.bizTradeType"
                                                    :class="{'selected' : vals.condition.bizTradeType.includes(bizTradeType.id)}"
                                                    :key="bizTradeType.id">
                                                    <span>{{bizTradeType.name}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--选择产品-->
                                    <div class="el-select nameKey-content" v-else-if="itemKey === 'productId'" @click="productChange('nextProcObj', entryIdx, idxKey, 'productId')">
                                        <div style="line-height: 1">
                                                <span v-for="(name, nameKey) in vals.condition.productNames" :key="nameKey" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                    class="el-select__tags-text">{{name}}</span><i
                                                    class="el-tag__close el-icon-close" @click.stop="deleteNameKey('nextProcObj', entryIdx, nameKey, 'productId')"></i></span>
                                        </div>
                                    </div>
                                    <!--执行人员-->
                                    <div class="el-select nameKey-content" v-else-if="itemKey === 'executorId'" @click="openUsrSelDlg(5, -1, 3, entryIdx, idxKey, 'executorId')">
                                        <div style="line-height: 1">
                                                <span v-for="(name, nameKey) in vals.condition.executorNames" :key="nameKey" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                    class="el-select__tags-text">{{name}}</span><i
                                                    class="el-tag__close el-icon-close" @click.stop="deleteNameKey('nextProcObj', entryIdx, nameKey, 'executorId')"></i></span>
                                        </div>
                                    </div>
                                    <!--业务人员-->
                                    <div class="el-select nameKey-content" v-else-if="itemKey === 'operatorId'" @click="openUsrSelDlg(5, -1, 3, entryIdx, idxKey, 'operatorId')">
                                        <div style="line-height: 1">
                                                <span v-for="(name, nameKey) in vals.condition.operatorNames" :key="nameKey" class="el-tag el-tag--info el-tag--small el-tag--light"><span
                                                    class="el-select__tags-text">{{name}}</span><i
                                                    class="el-tag__close el-icon-close" @click.stop="deleteNameKey('nextProcObj', entryIdx, nameKey, 'operatorId')"></i></span>
                                        </div>
                                    </div>
                                    <el-select v-model="vals.condition.val" v-else>
                                    </el-select>
                                </div>
                                <i class="iconfont icon-dele icon-del-span" v-if="vals.haveCondition.length > 1" @click="doDeleteConditionKey('nextProcObj', entryIdx, idxKey, itemKey)"></i>
                            </div>
                            <i class="iconfont icon-add icon-add-span" v-if="idxKey === vals.haveCondition.length - 1" @click="doAddConditionKey('nextProcObj', entryIdx)"></i>
                        </div>
                    </div>
                    <div class="gy-form-group gy-approvaled">
                        <div class="l">审批人</div>
                        <div class="examiner">
                            <div class="c w">
                                <input type="text" style="padding-left:20px" placeholder="请选择人员" @click="openUsrSelDlg(4, -1, 3, entryIdx)" v-model="vals.userNames">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <!-- 保存 -->
        <div class="submit-wrap clearfix">
            <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
            <button class="gy-button-extra" @click="saveApprInfo">保存</button>
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
        <el-dialog title="选择产品" :visible.sync="dialogProduct" width="600px">
            <div>
                <div>
                    <div class="gy-form-group gy-form-group1">
                        <span class="l">产品名称</span>
                        <span>
                            <input type="text" v-model="productSearch.productName" class="gy-input" placeholder="请输入产品名称">
                        </span>
                    </div>
                    <div class="gy-form-group gy-form-group1">
                        <span class="l">关键字</span>
                        <span>
                            <input type="text" v-model="productSearch.keywords" class="gy-input" placeholder="请输入产品名称">
                        </span>
                    </div>
                </div>
                <div class="gy-table" style="clear: both">
                    <el-table
                        :data="productList"
                        highlight-current-row
                        @current-change="productCheck"
                        style="width: 100%">
                        <el-table-column
                            property="productId"
                            label="产品ID"
                            width="120"
                        >
                        </el-table-column>
                        <el-table-column
                            property="productName"
                            label="产品名称">
                        </el-table-column>
                    </el-table>
                </div>
                <div>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="productSearch.total"
                        @current-change="currentChange"
                        style="text-align: center">
                    </el-pagination>
                </div>
                <div class="gy-btn-group">
                    <button type="button" class="gy-button-normal" @click="productClose">取消</button><button
                    type="button" style="margin-left: 10px;" class="gy-button-extra" @click="productChk">确定</button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import userList from '@/components/selectPersonnel';
import roleList from '@/components/selectRole';
// import index from "../../store";

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
    components: {
        userList, roleList
    },
    directives: {
        clickOutside
    },
    data () {
        return {
            ref: null,
            conditionType: ['productId', 'executorId', 'operatorId', 'targetCorpId', 'bizTradeType'],
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
            nextProcObj: null, // 下个关联流程的数据
            idxKey: null,
            conditionPerType: null,
            dialogProduct: false,
            productChked: null,
            productSearch: {
                pageNo: 1,
                pageSize: 10,
                productName: null,
                keywords: null,
                total: 0
            },
            productList: []
        };
    },
    created () {
        this.canEdit = this.$route.query.canEdit;
        this.getApproveInfo();
    },
    methods: {
        currentChange (val) {
            this.productSearch.pageNo = val;
            this.getProduct();
        },
        productClose () {
            this.conditionPerType = null;
            this.currSelRowIdx = null;
            this.currSelEntryIdx = null;
            this.idxKey = null;
            this.productChked = null;
            this.dialogProduct = false;
        },
        productChange (tblIdx, entryIdx, idxKey, conditionPerType) {
            this.conditionPerType = conditionPerType;
            this.currSelRowIdx = tblIdx;
            this.currSelEntryIdx = entryIdx;
            this.idxKey = idxKey;
            this.productSearch = {
                pageNo: 1,
                pageSize: 10,
                productName: null,
                keywords: null,
                total: 0
            };
            this.dialogProduct = true;
            this.getProduct();
        },
        productCheck (val) {
            this.productChked = val;
        },
        productChk () {
            if (!this.productChked) {
                this.$message.error('请先选择产品');
                return;
            }
            if (this.currSelRowIdx === 'nextProcObj') {
                if (this.nextProcObj.entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType].includes(this.productChked.productId)) {
                    this.$message('该产品已添加');
                    return;
                }
                //
                this.nextProcObj.entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType].push(this.productChked.productId);
                this.nextProcObj.entryList[this.currSelEntryIdx]
                    .condition.productNames.push(this.productChked.productName);
            } else {
                if (this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType].includes(this.productChked.productId)) {
                    this.$message('该产品已添加');
                    return;
                }
                // 条件匹配时，设置产品
                this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType].push(this.productChked.productId);
                this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx]
                    .condition.productNames.push(this.productChked.productName);
            }

            this.productClose();
        },
        getProduct () {
            this.$http.post(this.$api.workbench.getProdList, this.productSearch)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.productList = res.data.data.rows;
                        this.productSearch.total = res.data.data.total;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        listHide () {
            if (this.ref) {
                document.getElementById(this.ref).style.display = 'none';
                this.ref = null;
            }
        },
        listShow (id) {
            this.listHide();
            document.getElementById(id).style.display = 'block';
            this.ref = id;
        },
        changeConditionVal (index, entryIdx, item, type) {
            if (index === 'nextProcObj') {
                switch (type) {
                case 'productId':
                    if (this.nextProcObj.entryList[entryIdx].condition.productId.includes(item.id)) {
                        this.nextProcObj.entryList[entryIdx].condition.productId =
                                Array.filter(this.nextProcObj.entryList[entryIdx].condition.productId, val => val !== item.id);
                        this.nextProcObj.entryList[entryIdx].condition.productNames =
                                Array.filter(this.nextProcObj.entryList[entryIdx].condition.productNames, val => val !== item.name);
                    } else {
                        this.nextProcObj.entryList[entryIdx].condition.productId.push(item.id);
                        this.nextProcObj.entryList[entryIdx].condition.productNames.push(item.name);
                    }
                    break;
                case 'executorId':
                    break;
                case 'operatorId':
                    break;
                case 'targetCorpId':
                    if (this.nextProcObj.entryList[entryIdx].condition.targetCorpId.includes(item.id)) {
                        this.nextProcObj.entryList[entryIdx].condition.targetCorpId =
                                Array.filter(this.nextProcObj.entryList[entryIdx].condition.targetCorpId, val => val !== item.id);
                        this.nextProcObj.entryList[entryIdx].condition.targetCorpNames =
                                Array.filter(this.nextProcObj.entryList[entryIdx].condition.targetCorpNames, val => val !== item.name);
                    } else {
                        this.nextProcObj.entryList[entryIdx].condition.targetCorpId.push(item.id);
                        this.nextProcObj.entryList[entryIdx].condition.targetCorpNames.push(item.name);
                    }
                    break;
                case 'bizTradeType':
                    if (this.nextProcObj.entryList[entryIdx].condition.bizTradeType.includes(item.id)) {
                        this.nextProcObj.entryList[entryIdx].condition.bizTradeType =
                                Array.filter(this.nextProcObj.entryList[entryIdx].condition.bizTradeType, val => val !== item.id);
                        this.nextProcObj.entryList[entryIdx].condition.bizTradeTypeNames =
                                Array.filter(this.nextProcObj.entryList[entryIdx].condition.bizTradeTypeNames, val => val !== item.name);
                    } else {
                        this.nextProcObj.entryList[entryIdx].condition.bizTradeType.push(item.id);
                        this.nextProcObj.entryList[entryIdx].condition.bizTradeTypeNames.push(item.name);
                    }
                    break;
                default:
                    break;
                }
            } else {
                switch (type) {
                case 'productId':
                    if (this.apprData.itemList[index].entryList[entryIdx].condition.productId.includes(item.id)) {
                        this.apprData.itemList[index].entryList[entryIdx].condition.productId =
                                Array.filter(this.apprData.itemList[index].entryList[entryIdx].condition.productId, val => val !== item.id);
                        this.apprData.itemList[index].entryList[entryIdx].condition.productNames =
                                Array.filter(this.apprData.itemList[index].entryList[entryIdx].condition.productNames, val => val !== item.name);
                    } else {
                        this.apprData.itemList[index].entryList[entryIdx].condition.productId.push(item.id);
                        this.apprData.itemList[index].entryList[entryIdx].condition.productNames.push(item.name);
                    }
                    break;
                case 'executorId':
                    break;
                case 'operatorId':
                    break;
                case 'targetCorpId':
                    if (this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpId.includes(item.id)) {
                        this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpId =
                                Array.filter(this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpId, val => val !== item.id);
                        this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpNames =
                                Array.filter(this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpNames, val => val !== item.name);
                    } else {
                        this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpId.push(item.id);
                        this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpNames.push(item.name);
                    }
                    break;
                case 'bizTradeType':
                    if (this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeType.includes(item.id)) {
                        this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeType =
                                Array.filter(this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeType, val => val !== item.id);
                        this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeTypeNames =
                                Array.filter(this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeTypeNames, val => val !== item.name);
                    } else {
                        this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeType.push(item.id);
                        this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeTypeNames.push(item.name);
                    }
                    break;
                default:
                    break;
                }
            }
        },
        deleteNameKey (index, entryIdx, idxKey, type) {
            if (index === 'nextProcObj') {
                this.nextProcObj.entryList[entryIdx].condition[type].splice(idxKey, 1);
                switch (type) {
                case 'productId':
                    this.nextProcObj.entryList[entryIdx].condition.productNames.splice(idxKey, 1);
                    break;
                case 'executorId':
                    this.nextProcObj.entryList[entryIdx].condition.executorNames.splice(idxKey, 1);
                    break;
                case 'operatorId':
                    this.nextProcObj.entryList[entryIdx].condition.operatorNames.splice(idxKey, 1);
                    break;
                case 'targetCorpId':
                    this.nextProcObj.entryList[entryIdx].condition.targetCorpNames.splice(idxKey, 1);
                    break;
                case 'bizTradeType':
                    this.nextProcObj.entryList[entryIdx].condition.bizTradeTypeNames.splice(idxKey, 1);
                    break;
                }
            } else {
                this.apprData.itemList[index].entryList[entryIdx].condition[type].splice(idxKey, 1);
                switch (type) {
                case 'productId':
                    this.apprData.itemList[index].entryList[entryIdx].condition.productNames.splice(idxKey, 1);
                    break;
                case 'executorId':
                    this.apprData.itemList[index].entryList[entryIdx].condition.executorNames.splice(idxKey, 1);
                    break;
                case 'operatorId':
                    this.apprData.itemList[index].entryList[entryIdx].condition.operatorNames.splice(idxKey, 1);
                    break;
                case 'targetCorpId':
                    this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpNames.splice(idxKey, 1);
                    break;
                case 'bizTradeType':
                    this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeTypeNames.splice(idxKey, 1);
                    break;
                }
            }
        },
        changeConditionKey (key, index, entryIdx, idxKey) {
        },
        doAddConditionKey (index, entryIdx) {
            if (index === 'nextProcObj') {
                this.nextProcObj.entryList[entryIdx].condition.val = null;
                this.nextProcObj.entryList[entryIdx].haveCondition.push('');
            } else {
                this.apprData.itemList[index].entryList[entryIdx].condition.val = null;
                this.apprData.itemList[index].entryList[entryIdx].haveCondition.push('');
            }
        },
        doDeleteConditionKey (index, entryIdx, indexKey, itemKey) {
            if (index === 'nextProcObj') {
                this.nextProcObj.entryList[entryIdx].haveCondition.splice(indexKey, 1);
                switch (itemKey) {
                case 'productId':
                    this.nextProcObj.entryList[entryIdx].condition.productId = [];
                    this.nextProcObj.entryList[entryIdx].condition.productNames = [];
                    break;
                case 'executorId':
                    this.nextProcObj.entryList[entryIdx].condition.executorId = [];
                    this.nextProcObj.entryList[entryIdx].condition.executorNames = [];
                    break;
                case 'operatorId':
                    this.nextProcObj.entryList[entryIdx].condition.operatorId = [];
                    this.nextProcObj.entryList[entryIdx].condition.operatorNames = [];
                    break;
                case 'targetCorpId':
                    this.nextProcObj.entryList[entryIdx].condition.targetCorpId = [];
                    this.nextProcObj.entryList[entryIdx].condition.targetCorpNames = [];
                    break;
                case 'bizTradeType':
                    this.nextProcObj.entryList[entryIdx].condition.bizTradeType = [];
                    this.nextProcObj.entryList[entryIdx].condition.bizTradeTypeNames = [];
                    break;
                default:
                    break;
                }
            } else {
                this.apprData.itemList[index].entryList[entryIdx].haveCondition.splice(indexKey, 1);
                switch (itemKey) {
                case 'productId':
                    this.apprData.itemList[index].entryList[entryIdx].condition.productId = [];
                    this.apprData.itemList[index].entryList[entryIdx].condition.productNames = [];
                    break;
                case 'executorId':
                    this.apprData.itemList[index].entryList[entryIdx].condition.executorId = [];
                    this.apprData.itemList[index].entryList[entryIdx].condition.executorNames = [];
                    break;
                case 'operatorId':
                    this.apprData.itemList[index].entryList[entryIdx].condition.operatorId = [];
                    this.apprData.itemList[index].entryList[entryIdx].condition.operatorNames = [];
                    break;
                case 'targetCorpId':
                    this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpId = [];
                    this.apprData.itemList[index].entryList[entryIdx].condition.targetCorpNames = [];
                    break;
                case 'bizTradeType':
                    this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeType = [];
                    this.apprData.itemList[index].entryList[entryIdx].condition.bizTradeTypeNames = [];
                    break;
                default:
                    break;
                }
            }
        },
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
                        condition: {
                            'productId': [],
                            'productNames': [],
                            'executorId': [],
                            'executorNames': [],
                            'operatorId': [],
                            'operatorNames': [],
                            'targetCorpId': [],
                            'targetCorpNames': [],
                            'bizTradeType': [],
                            'bizTradeTypeNames': []
                        },
                        haveCondition: [''],
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
                condition: {
                    'productId': [],
                    'productNames': [],
                    'executorId': [],
                    'executorNames': [],
                    'operatorId': [],
                    'operatorNames': [],
                    'targetCorpId': [],
                    'targetCorpNames': [],
                    'bizTradeType': [],
                    'bizTradeTypeNames': []
                },
                haveCondition: [''],
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
            switch (this.addUsrFlg) {
            case 0:
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
                break;
            case 1:
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
                break;
            case 2:
                // 条件匹配时，设置审批人
                this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx].userIds.push(data.usrUserId);
                this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx].userNames.push(data.userName);
                break;
            case 3:
                if (this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType === 'executorId' ? 'executorId' : 'operatorId'].includes(data.usrUserId)) {
                    return;
                }
                // 条件匹配时，设置执行人员/业务人员
                this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType === 'executorId' ? 'executorId' : 'operatorId'].push(data.usrUserId);
                this.apprData.itemList[this.currSelRowIdx].entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType === 'executorId' ? 'executorNames' : 'operatorNames'].push(data.userName);
                break;
            case 4:
                this.nextProcObj.entryList[this.currSelEntryIdx].userNames.push(data.userName);
                this.nextProcObj.entryList[this.currSelEntryIdx].userIds.push(data.usrUserId);
                break;
            case 5:
                if (this.nextProcObj.entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType === 'executorId' ? 'executorId' : 'operatorId'].includes(data.usrUserId)) {
                    return;
                }
                this.nextProcObj.entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType === 'executorId' ? 'executorId' : 'operatorId'].push(data.usrUserId);
                this.nextProcObj.entryList[this.currSelEntryIdx]
                    .condition[this.conditionPerType === 'executorId' ? 'executorNames' : 'operatorNames'].push(data.userName);
                break;
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
        openUsrSelDlg (flg, tblIdx, matchFlg, entryIdx, idxKey, conditionPerType) {
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
            } else if (flg === 3) {
                this.addUsrFlg = 3;
                this.conditionPerType = conditionPerType;
                this.currSelRowIdx = tblIdx;
                this.currSelEntryIdx = entryIdx;
                this.idxKey = idxKey;
            } else if (flg === 4) {
                if (parseInt(matchFlg) !== 3) {
                    return false;
                }
                this.addUsrFlg = 4;
                this.currSelRowIdx = tblIdx;
                this.currSelEntryIdx = entryIdx;
            } else if (flg === 5) {
                if (parseInt(matchFlg) !== 3) {
                    return false;
                }
                this.addUsrFlg = 5;
                this.conditionPerType = conditionPerType;
                this.currSelRowIdx = tblIdx;
                this.currSelEntryIdx = entryIdx;
                this.idxKey = idxKey;
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
                    let itemList = [];
                    const condition = {
                        bizTradeType: [],
                        bizTradeTypeNames: [],
                        executorId: [],
                        executorNames: [],
                        operatorId: [],
                        operatorNames: [],
                        productId: [],
                        productNames: [],
                        targetCorpId: [],
                        targetCorpNames: []
                    };
                    this.apprData.itemList.map((item) => {
                        let entryList = [];
                        if (item.entryList) {
                            item.entryList.map((val) => {
                                entryList.push({
                                    ...val,
                                    condition: Object.assign({}, condition, val.condition)
                                });
                            });
                        }
                        itemList.push({
                            ...item,
                            entryList
                        });
                    });
                    this.apprData.itemList = itemList;
                    this.nextProcObj = this.apprData.nextNode;
                    let nextProcObjEntryList = [];
                    this.nextProcObj.entryList.map((val) => {
                        nextProcObjEntryList.push({
                            ...val,
                            condition: Object.assign({}, condition, val.condition)
                        });
                    });
                    this.nextProcObj.entryList = nextProcObjEntryList;
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
                let itemList = [];
                that.apprData.itemList.map((item) => {
                    let entryList = [];
                    item.entryList.map((val) => {
                        let condition = {
                        };
                        val.haveCondition.map((key) => {
                            switch (key) {
                            case 'productId':
                                condition.productId = val.condition.productId;
                                condition.productNames = val.condition.productNames;
                                break;
                            case 'executorId':
                                condition.executorId = val.condition.executorId;
                                condition.executorNames = val.condition.executorNames;
                                break;
                            case 'operatorId':
                                condition.operatorId = val.condition.operatorId;
                                condition.operatorNames = val.condition.operatorNames;
                                break;
                            case 'targetCorpId':
                                condition.targetCorpId = val.condition.targetCorpId;
                                condition.targetCorpNames = val.condition.targetCorpNames;
                                break;
                            case 'bizTradeType':
                                condition.bizTradeType = val.condition.bizTradeType;
                                condition.bizTradeTypeNames = val.condition.bizTradeTypeNames;
                                break;
                            default:
                                break;
                            }
                        });
                        entryList.push({
                            ...val,
                            haveCondition: val.haveCondition,
                            condition
                        });
                    });
                    itemList.push({
                        ...item,
                        entryList
                    });
                });
                that.apprData.itemList = itemList;
                let nextProcObjEntryList = [];
                that.nextProcObj.entryList.map((val) => {
                    let condition = {
                    };
                    val.haveCondition.map((key) => {
                        switch (key) {
                        case 'productId':
                            condition.productId = val.condition.productId;
                            condition.productNames = val.condition.productNames;
                            break;
                        case 'executorId':
                            condition.executorId = val.condition.executorId;
                            condition.executorNames = val.condition.executorNames;
                            break;
                        case 'operatorId':
                            condition.operatorId = val.condition.operatorId;
                            condition.operatorNames = val.condition.operatorNames;
                            break;
                        case 'targetCorpId':
                            condition.targetCorpId = val.condition.targetCorpId;
                            condition.targetCorpNames = val.condition.targetCorpNames;
                            break;
                        case 'bizTradeType':
                            condition.bizTradeType = val.condition.bizTradeType;
                            condition.bizTradeTypeNames = val.condition.bizTradeTypeNames;
                            break;
                        default:
                            break;
                        }
                    });
                    nextProcObjEntryList.push({
                        ...val,
                        haveCondition: val.haveCondition,
                        condition
                    });
                });
                that.nextProcObj.entryList = nextProcObjEntryList;
                that.apprData.nextNode = that.nextProcObj;
                // 保存审批流程定义数据
                that.$http.post(that.$api.apprProc.saveApproveInfo, that.apprData).then((res) => {
                    if (res.data.code === 0) {
                        that.$message({
                            message: '保存成功',
                            type: 'success'
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
        overflow-x: hidden;
        .title {
            font-size: 18px;
            color: #333333;
            margin: 20px 0;
        }
        .base {
          .title {
            margin: 20px 16px;
          }
        }
        .approval {
            margin: 23px 16px 0;
            .add {
                margin-top: 20px;
            }
            .copy {
                padding: 0 40px 0 8px;
                .my-select {
                    padding-left: 24px;
                }
            }
        }
        .submit-wrap {
            margin: 30px 16px 0;
            text-align: right;
            button:nth-child(1) {
              margin-right: 10px;
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
            width: 100px;
            padding-left: 15px;
        }
        .gy-execution-process{
            padding: 6px 40px 6px 80px
        }
        .gy-approval{
            padding: 6px 40px 6px 140px;
            margin-left: 60px;
            .r{
                width: 202px!important;
            }
        }
        .gy-approvaled{
            width: 100%;
            padding: 6px 40px 6px 200px;
            .l {
                width: 278px;
                padding-left: 150px;
            }
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
    .matching-item {
        position: relative;
        clear: both;
        &:after{
            display: block;
            content: ' ';
            clear: both;
        }
    }
    .matching-conditions-wrapper {
    }
    .matching-conditions {
        width: 630px;
        display: flex;
        min-height: 30px;
        .mr-20 {
            margin-right: 20px;
        }
        .c {
            flex: 0 0 165px;
            width: 165px;
            .nameKey-content {
                min-height: 30px;
                height: auto!important;
                border-bottom: 1px solid $color-border;
            }
        }
        .w {
            flex: 0 0 445px;
            width: 445px;
        }
    }
    .examiner {
        width: 630px;
    }
    .selects{
        position: relative;
        .selectsed{
            background-color: #4a90e2;
        }
    }
    .gy-ul {
        list-style: none;
        position: absolute;
        top: 24px;
        left: 0;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        border-radius: 3px;
        .el-select-dropdown__item:hover {
            background-color: #F5F7FA;
        }
    }
    .gy-btn-group{
        text-align: right;
    }
    /deep/ .el-table__body .el-table__row .cell {
        text-align: center;
    }
    .gy-form-group1 {
        padding-left: 80px;
        padding-right: 0;
        &:nth-child(1){
            padding-right: 30px;
        }
        &:nth-child(2){
            .l{
                padding-left: 30px;
            }
        }
        .l{
            padding-left: 0;
            width: 80px;
        }
    }
    .content{
        position: relative;
    }
    .icon-del-span{
        position: absolute;
        top: auto;
        bottom: 8px;
        right: 31px;
        color: #E0370F;
        height: 16px!important;
        line-height: 1;
    }
    .icon-add-span{
        position: absolute;
        top: auto;
        bottom: 8px;
        right: 1px;
        color: #4C97FC;
        height: 16px!important;
        line-height: 1;
    }
    .icon-del1 {
        bottom: 14px;
        right: 40px;
    }
    .icon-add1 {
        bottom: 14px;
        right: 10px;
    }
    .checkNextProc {
        .icon-add-span {
            right: -49px;
        }
        .icon-del-span {
            right: -19px;
        }
    }
    .clearfix {
        position: relative;
        .add-step {
            position: absolute;
            top: 0;
            right: -11px;
            width: 600px;
            height: 30px;
            z-index: 999;
        }
    }
    .el-select {
        display: block;
    }
</style>
