<template>
    <div class="clearfix">
        <div class="title">基本信息</div>
        <div class="gy-form-group">
            <span class="l">合同要素ID</span>
            <span>{{query.id}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">执行操作人</span>
            <span>{{query.executiveName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">业务类型</span>
            <span>{{query.bizType|businessTradeType}}  <span v-if="query.contractType !== 1" class="contractType">{{query.contractType|contractTradeType(query.bizType)}}</span></span>
        </div>
        <div class="gy-form-group">
            <span class="l">我方公司</span>
            <span>{{query.targetCorpName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">产品名称</span>
            <span>{{query.prodName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">交易类型</span>
            <span>{{query.transactionType|contractTransactionTypeList}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">业务操作人</span>
            <span>{{query.businessManagerName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">业务组</span>
            <span>{{query.organizationName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">创建时间</span>
            <span>{{query.createdDate | date(1)}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contractBasic',
    data () {
        return {
        };
    },
    props: {
        query: Object
    }
};
</script>
<style lang="scss" scoped>
    .clearfix{
        .title{
            font-size: 14px;
            color: #333333;
            margin: 20px 16px;
            font-weight: bold;
        }
        .gy-form-group {
            padding: 8px 30px 8px 119px;
        }
        .wid100 {
            width: 100%;
        }
        .contractType {
            background-color: yellow;
        }
    }
</style>
