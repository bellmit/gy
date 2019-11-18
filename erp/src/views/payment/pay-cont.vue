<template>
  <div class="essential-wrapper pay-detail essential-row-float">
    <div class="essential-item">
      <div class="essential-title">合同要素ID</div>
      <div class="essential-text">{{list.id}}</div>
    </div>
    <div class="essential-item">
      <div class="essential-title">执行操作人</div>
      <div class="essential-text">{{list.executiveName}}</div>
    </div>
    <div class="essential-item">
      <div class="essential-title">业务类型</div>
      <div class="essential-text"><span>{{list.bizType|businessTradeType}}  <span v-if="list.contractType !== 1"
                                                                                  class="contractType">{{list.contractType|contractTradeType(list.bizType)}}</span></span>
      </div>
    </div>
    <div class="essential-item">
      <div class="essential-title">我方公司</div>
      <div class="essential-text">{{list.targetCorpName}}</div>
    </div>
      <div class="essential-item">
          <div class="essential-title">产品名称</div>
          <div class="essential-text">{{list.prodName}}</div>
      </div>
      <div class="essential-item">
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
    <!-- 单边采购是不显示此字段 -->
    <div class="essential-item" v-if="list.contractType != 2">
      <div class="essential-title">盖章销售合同</div>
      <div class="essential-text">
        <div class="essential-text">
          <span v-if="list.downstreamInfo.fileAttachCertifiedList && list.downstreamInfo.fileAttachCertifiedList.length !== 0"
              @click="showContFile4Obj(list.downstreamInfo.fileAttachCertifiedList)"><i class="iconfont icon-photo"></i></span>
          <span v-else><i class="iconfont icon-photo-null"></i></span>
        </div>
      </div>
    </div>
      <!-- 单边销售是不显示此字段 -->
      <div class="essential-item" v-if="list.contractType != 3">
      <div class="essential-title">盖章采购合同</div>
      <div class="essential-text">
        <div class="essential-text">
          <span v-if="list.upstreamInfo.fileAttachCertifiedList && list.upstreamInfo.fileAttachCertifiedList.length !== 0"
              @click="showContFile4Obj(list.upstreamInfo.fileAttachCertifiedList)"><i class="iconfont icon-photo"></i></span>
          <span v-else><i class="iconfont icon-photo-null"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    inject: ['showImg'],
    props: {
        list: {
            default: null
        }
    },
    methods: {
        showContFile4Obj (val) {
            let arr = [];
            val.forEach((e) => {
                arr.push(e.filepath);
            });
            this.showImg(arr);
        }
    }
};
</script>

<style lang="scss" scoped>
  .contractType {
    background-color: yellow;
  }

  .essential-row-float .essential-item .essential-title {
    flex: 0 0 110px;
  }
</style>
