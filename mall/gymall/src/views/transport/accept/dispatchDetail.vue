<template>
    <div class="transport-wrap">
        <h2>调度单跟踪<span>调度单号：{{dispatchCode}}</span></h2>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">调度时间</span>
                <span>{{traceInfo.createdDate | date(0)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">车牌号</span>
                <span>{{traceInfo.licensePlateNumber}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">司机（电话）</span>
                <span>{{traceInfo.driverUsername || '东庆司机'}}({{traceInfo.driverPhone || '15121139860'}})</span>
            </div>
            <div class="gy-form-group">
                <span class="l">押运员（电话）</span>
                <span>{{traceInfo.escortUsername || '东庆司机'}}({{traceInfo.escortPhone || '15121139862'}})</span>
            </div>
            <div class="gy-form-group">
                <span class="l">调度量</span>
                <span>{{traceInfo.quantityLoading || '30'}}吨</span>
            </div>
        </div>
        <div class="trace">
            <div class="step">
                <div class="item" v-for="(item, index) in stepList" :class="{'active': item.time}" :key="index">
                    <span class="line" :class="{'done': index < activeList.length - 1}" v-if="index < stepList.length - 1"></span>
                    <i class="iconfont icon-car-right" v-if="index === activeList.length - 1"></i>
                    <i class="iconfont icon-right" v-if="item.time"></i>
                    <i class="circle" v-else></i>
                    <dl>
                        <dt>{{item.name}}</dt>
                        <dd v-if="item.time">{{item.time | date(0)}}</dd>
                    </dl>
                </div>
            </div>
            <img src="../../../assets/images/trace.jpg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            stepList: [
                {
                    id: 0,
                    time: null,
                    name: '待发车'
                },
                {
                    id: 1,
                    time: null,
                    name: '已发车'
                },
                {
                    id: 2,
                    time: null,
                    name: '到达装货点'
                },
                {
                    id: 3,
                    time: null,
                    name: '装货完成'
                },
                {
                    id: 4,
                    time: null,
                    name: '到达卸货点'
                },
                {
                    id: 5,
                    time: null,
                    name: '卸货完成'
                }
            ],
            activeList: [],
            traceInfo: {},
            dispatchCode: null
        };
    },
    created () {
        this.dispatchCode = this.$route.query.dispatchCode;
        this.getTraceInfo();
        this.getTraceDetail();
    },
    methods: {
        getTraceDetail () {
            this.$http.get(this.$api.transport.dispatchDetail + '/' + this.dispatchCode)
                .then(res => {
                    this.activeList = res.data.data;
                    res.data.data.forEach((item, index) => {
                        this.stepList[index].time = item.createdDate;
                    });
                });
        },
        getTraceInfo () {
            this.$http.get(this.$api.transport.diapatchTraceInfo + '/' + this.dispatchCode)
                .then(res => {
                    this.traceInfo = res.data.data;
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .gy-form{
        overflow: hidden;
        .gy-form-group{
            padding-left: 115px;
        }
        .l{
            width: 110px;
            padding-left: 0;
        }
    }
    .trace{
        padding: 0 40px 20px;
        .step{
            overflow: hidden;
            margin-bottom: 30px;
            line-height: 1;
            position: relative;
            padding-left: 10px;
            .item{
                float: left;
                width: 16%;
                font-size: $small-font;
                position: relative;
                z-index: 2;
                padding-top: 40px;
                dl{
                    margin-left: -8px;
                }
                dt{
                    color: $color-title;
                    margin: 15px 0 10px;
                }
                .icon-car-right{
                    position: absolute;
                    left: -10px;
                    top: -2px;
                    font-size: 26px;
                    color: #f5a623;
                }
                .line{
                    height: 4px;
                    content: '';
                    background-color: #dce0e4;
                    position: absolute;
                    left: 0;
                    top: 30px;
                    width: 100%;
                    z-index: -1;
                    &.done{
                        background-color: #f5a623;
                    }
                }
                .icon-right, .circle{
                    position: absolute;
                    left: -10px;
                    top: 22px;
                }
                .circle{
                    background-color: #dce0e4;
                    height: 16px;
                    width: 16px;
                    border-radius: 16px;
                }
                .icon-right{
                    color: #f5a623;
                    font-size: 21px;
                }
            }
        }
        img{
            width: 80%;
            height: auto;
        }
    }
</style>
