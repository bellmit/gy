<template>
    <div class="application-wrapper">
        <div class="application-item1">
            <div class="item-title">申请单号</div>
            <div class="item-text">{{scsAppModel.code}}</div>
        </div>
        <div class="application-item2">
            <div class="item-title">申请时间</div>
            <div class="item-text">{{scsAppModel.createdDate | date(1)}}</div>
        </div>
        <div class="application-item3">
            <div class="item-title">申请状态</div>
            <div class="item-text" :style="statusName"><span>{{scsAppModel.statusName}}</span>
                <template v-if="isRemark && scsAppModel.statusName === '已拒绝'">
                    <el-tooltip placement="bottom" :disabled="(scsAppModel.refusalCause && scsAppModel.refusalCause.replace(/[^x00-xff]/g, 'aa').length > 40) ? disabled : !disabled" effect="light">
                        <div class="tootip" slot="content">{{scsAppModel.refusalCause}}</div>
                        <div v-if="scsAppModel.refusalCause" class="refusalCause" :class="{'refusalCause1': (scsAppModel.refusalCause && scsAppModel.refusalCause.replace(/[^x00-xff]/g, 'aa').length > 40)}"><span
                        class="t">(</span><span class="c">{{scsAppModel.refusalCause}}</span><span class="t">)</span></div>
                        <div v-else style="float: right;width: 290px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">--</div>
                    </el-tooltip>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'application',
    props: {
        scsAppModel: Object,
        statusName: String,
        isRemark: {
            default: false
        }
    },
    data () {
        return {
            disabled: false
        };
    }
};
</script>

<style lang="scss" scoped>
    .application-wrapper {
        width: 100%;
        height: 48px;
        line-height: 14px;
        padding: 17px 16px;
        display: flex;
        .application-item {
            display: flex;
            .item-title {
                flex: 0 0 72px;
                color: #000;
            }
            .item-text {
                flex: 1;
            }
        }
        .application-item1 {
            flex: 0 0 260px;
            @extend .application-item;
            .item-text {
                color: #999999;
            }
        }
        .application-item2 {
            flex: 0 0 242px;
            @extend .application-item;
            .item-text {
                color: #999999;
            }
        }
        .application-item3 {
            flex: 1;
            @extend .application-item;
        }
    }
    .refusalCause {
        float: right;
        width: 290px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .refusalCause1 {
        display: flex;
        .t{
            flex: 0 0 7px;
        }
        .c {
            flex: 1;
            max-width: 276px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>
