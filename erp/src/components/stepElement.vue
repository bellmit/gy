<template>
    <div class="setpElementMain">
        <div class="setpElementTop">
            <span>操作流程</span>
        </div>
        <el-steps class="setpElementCenter" direction="vertical" :active="1">
            <el-step v-for="(item, index) in elStepList" :title="item.username" :key="index">
                 <template slot="description">
                     <div>{{item.actionDesc}}</div>
                 </template>
            </el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
    name: 'stepElement',
    props: {
        elStepList: Array
    },
    data () {
        return {
            showProcStep: false
        };
    },
    methods: {
        // 打开/关闭操作流程
        operationProcessClick () {
            this.showProcStep = !this.showProcStep;
        }
    }
};
</script>

<style lang="scss" scoped>
    .setpElementMain{
        margin-top: 20px;
        height: 100%;
        .setpElementTop{
            margin-bottom: 20px;
            padding-left: 16px;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
            color: #333;
            font-weight: bold;
        }
    }
</style>
<style lang="scss">
    .setpElementCenter{
        padding-left: 32px;
        .is-finish{
            color: red;
            border-color:red;
        }
        .is-vertical{
            .is-process{
                .el-step__icon{
                    color: #c0c4cc!important;
                    border-color:#c0c4cc!important;
                }
            }
        }
        .el-step.is-vertical{
            .el-step__line{
                width: 1px;
            }
        }
        .el-step__icon{
                border: 1px solid;
        }
        .el-step__icon-inner{
            font-weight: 10!important;
        }
        .el-step__title{
            font-size: 14px;
        }
        .el-step__main{
            .is-process{
                font-weight: 10;
            }
            .el-step__title{
                color: black;
            }
            .el-step__description{
                color: black;
            }
        }
    }
</style>
