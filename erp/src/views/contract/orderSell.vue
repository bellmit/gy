<template><!-- 采购信息 - 上游公司-->
    <div class="">
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">上游公司</div>
                <div class="essential-text">{{list.upstreamInfo.sellerCompanyName}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交易对手评级</div>
                <div class="essential-text">{{list.upstreamInfo.grade}}</div>
            </div>
        </div>
        <div class="essential-row" v-for="(item, index) in list.upstreamObjs" :key="index">
            <div class="essential-item" v-if="item.title === '备注'">
                <div class="essential-title">合同要素备注</div>
                <div class="essential-text text-overflow">{{item.value|showline}}</div>
            </div>
            <div class="essential-item" v-else-if="item.title === '出厂质检单'">
                <div class="essential-title">{{item.title}}</div>
                <div class="essential-text">
                    <span v-if="item.value && item.value.length !== 0"
                        @click="$refs.contFileView.open4MultiFile(item.value)"><i class="iconfont icon-photo"></i></span>
                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                </div>
            </div>
            <div class="essential-item" v-else>
                <div class="essential-title">{{item.title}}</div>
                <div class="essential-text">{{item.value|showline}}</div>
            </div>
        </div>
        <!--<div class="essential-row" v-if="list.bizType === 6">-->
            <!--<div class="essential-item">-->
                <!--<div class="essential-title">上游合约</div>-->
                <!--<div class="essential-text" v-if="list.upstreamInfo.longtermContractOrderId === null">无</div>-->
                <!--<div class="essential-text" v-else>{{list.upstreamInfo.longtermContractCode}}</div>-->
            <!--</div>-->
        <!--</div>-->
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyFileView from './../components/gyFileView';
export default {
    components: {
        gyFileView
    },
    props: {
        list: {
            default: {}
        },
        isCont: {
            default: String
        }
    }
};
</script>

<style lang="scss" scoped>
  .text-overflow {
      line-height: 30px;
  }
</style>
