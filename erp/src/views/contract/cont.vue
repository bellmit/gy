<template>
  <div class="essential-wrapper essential-row-float">
    <div class="essential-item">
      <div class="essential-title">合同要素ID</div>
      <div class="essential-text">{{list.id}}</div>
    </div>
    <div class="essential-item" v-if="isZXFP === 1">
      <div class="essential-title">
        <span class="isMust">*</span>执行操作人
      </div>
      <div class="essential-text">
        <input type="text" @click="chkPerson" v-model="list.executiveName" placeholder="请选择执行操作人" />
      </div>
    </div>
    <div class="essential-item" v-else>
      <div class="essential-title">执行操作人</div>
      <div class="essential-text">{{list.executiveName}}</div>
    </div>
    <div class="essential-item">
      <div class="essential-title">业务类型</div>
      <div class="essential-text">
        {{list.bizType | businessTradeType}}
        <span
          v-if="list.contractType !== 1"
          class="contractType"
        >{{list.contractType|contractTradeType(list.bizType)}}</span>
      </div>
    </div>
    <div class="essential-item" v-if="isZXFP === 1">
      <div class="essential-title">
        <span class="isMust">*</span>我方公司
      </div>
      <div class="essential-text">
        <el-select
          v-model="list.targetCorpName"
          class="mycorp"
          placeholder="请选择"
          @change="checktargetCorpbuy"
        >
          <el-option
            v-for="(item, index) in relatedCompany"
            :key="index"
            :label="item.targetCorpName"
            :value="item.targetCorpId"
          >
            <span>{{item.targetCorpName}}</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="essential-item" v-else>
      <div class="essential-title">我方公司</div>
      <div class="essential-text">{{list.targetCorpName}}</div>
    </div>
    <div class="essential-item">
      <div class="essential-title">产品名称</div>
      <div class="essential-text">{{list.prodName}}</div>
    </div>
    <div class="essential-item" v-if="isZXFP === 1">
      <div class="essential-title">
        <span class="isMust">*</span>交易类型
      </div>
      <div class="essential-text">
        <el-select
          v-model="list.transactionType"
          class="mycorp"
          placeholder="请选择"
          @change="checkTransactionType"
        >
          <el-option
            v-for="(item, index) in $constant.contractTradeTypeList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="essential-item" v-else>
      <div class="essential-title">交易类型</div>
      <div class="essential-text">{{list.transactionType|contractTransactionTypeList}}</div>
    </div>
    <div class="essential-item">
      <div class="essential-title">业务操作人</div>
      <div class="essential-text">{{list.businessManagerName}}</div>
    </div>
    <div class="essential-item">
      <div class="essential-title">业务组</div>
      <div class="essential-text">{{list.organizationName}}</div>
    </div>

    <div class="essential-item">
      <div class="essential-title">创建时间</div>
      <div class="essential-text">{{list.createdDate | date(list.createdDate)}}</div>
    </div>
    <div class="essential-item">
      <div class="essential-title">状态</div>
      <div class="essential-text">{{$constant.orderStatus[list.approveStatus]}}</div>
    </div>
    <div
      class="essential-item"
      v-if="list.correlatedEssenceId !== null && list.correlatedEssenceId !== undefined"
    >
      <div class="essential-title">关联合同要素ID</div>
      <div class="essential-text">{{list.correlatedEssenceId}}</div>
    </div>
    <selectPersonnel ref="myUserDlg" @affirmUser="affirmUser"></selectPersonnel>
  </div>
</template>

<script>
import selectPersonnel from '@/components/selectPersonnel';

export default {
    props: {
        list: {
            default: null
        },
        isZXFP: Number
    },
    data () {
        return {
            relatedCompany: []
        };
    },
    created () {
        this.getRelatedCompany();
    },
    methods: {
        // 获取我方公司
        getRelatedCompany () {
            this.$http.get(this.$api.contract.getRelatedCompany).then((res) => {
                if (res.data.code === 0) {
                    this.relatedCompany = res.data.data.targetCorpList;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        checktargetCorpbuy (item) {
            this.$emit('chkCompany', this.relatedCompany.find((e) => (e.targetCorpId === item)));
        },
        checkTransactionType (item) {
            // 更改合同交易类型
            this.$emit('onChangeTransactionType', item);
        },
        chkPerson () {
            this.$refs.myUserDlg.getUsers(null, this.list.executiveId);
        },
        affirmUser (item) {
            this.list.executiveId = item.usrUserId;
            this.list.executiveName = item.userName;
            this.$emit('chkPerson', item);
        }
    },
    components: {selectPersonnel}
};
</script>

<style lang="scss" scoped>
  .contractType {
    background-color: yellow;
  }

  .essential-row-float .essential-item .essential-title {
    flex: 0 0 90px;
  }

  .isMust {
    left: -10px;
  }

</style>
<style lang="scss">
  .essential-wrapper {
    .mycorp {
      .el-input__inner {
        font-size: 14px;
      }
    }
  }
</style>
