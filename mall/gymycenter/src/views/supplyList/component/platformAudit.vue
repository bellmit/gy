<template>
    <!--平台审核信息-->
    <div class="platform-audit-info">
        <div class="title-wrapper" @click="platformAuditInfo = !platformAuditInfo">
            <i class="iconfont icon-qianyue"></i><span
            class="gy-h5">平台审核信息<i
            class="el-icon-arrow-down"
            :class="{'el-rotate' : platformAuditInfo}"
        ></i></span>
        </div>
        <transition name="slide-fade">
            <div class="service-provider-audit-info-content" v-show="platformAuditInfo">
                <div class="gy-form-group1">
                    <span class="l">受理人</span>
                    <div class="c" v-if="supply.appPlatformModel.assigneeUserName">
                        {{supply.appPlatformModel.assigneeUserName || '--'}}
                    </div>
                    <div class="c" v-else>--</div>
                </div>
                <div class="gy-form-group1">
                    <span class="l">受理时间</span>
                    <div class="c" v-if="supply.appPlatformModel.acceptTime">{{supply.appPlatformModel.acceptTime | date(1)}}</div>
                    <div class="c" v-else>--</div>
                    <!--<div v-else class="c clock"><span class="alignment">{{ clock.applyDate + ' ' + clock.applyTime }}</span><img src="../../../assets/images/clock.gif" alt=""></div>-->
                </div>
                <div class="gy-form-group1">
                    <span class="l">申请公司评级</span>
                    <span class="c">
                        <template v-if="supply.appPlatformModel.chinayieRatingRank && supply.appPlatformModel.chinayieRatingRank !== '-'">
                            <span class="color-height">{{supply.appPlatformModel.chinayieRatingRank || '--'}}</span>
                            (最近更新:{{supply.appPlatformModel.chinayieRatingDate | date}})
                            <router-link class="gy-link" tag="a" target="_blank" :to="{name:'accessReplication',query: {companyId: $route.query.companyId}}">查看详情</router-link>
                        </template>
                        <template v-else>--</template>
                    </span>
                </div>
                <div class="gy-form-group1" v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId) && supply.scsAppModel.thirdPartyId">
                    <span class="l">供应商评级</span>
                    <span class="c">
                        <template v-if="supply.appPlatformModel.thirdPartyChinayieRatingRank && supply.appPlatformModel.thirdPartyChinayieRatingRank !== '-'">
                            <span class="color-height">{{supply.appPlatformModel.thirdPartyChinayieRatingRank || '--'}}</span>
                            (最近更新:{{supply.appPlatformModel.thirdPartyChinayieRatingDate | date}})
                            <router-link class="gy-link" tag="a" target="_blank" :to="{name:'accessReplication',query: {companyId: supply.scsAppModel.thirdPartyId}}">查看详情</router-link>
                        </template>
                        <template v-else>--</template>
                    </span>
                </div>
                <div class="gy-form-group1" v-if="supply.scsAppModel.serviceTypeId === 2">
                    <span class="l">采购公司评级</span>
                    <span class="c">
                        <template v-if="supply.appPlatformModel.thirdPartyChinayieRatingRank && supply.appPlatformModel.thirdPartyChinayieRatingRank !== '-'">
                            <span class="color-height">{{supply.appPlatformModel.thirdPartyChinayieRatingRank || '--'}}</span>
                            (最近更新:{{supply.appPlatformModel.thirdPartyChinayieRatingDate | date}})
                            <router-link class="gy-link" tag="a" target="_blank" :to="{name:'accessReplication',query: {companyId: supply.scsAppModel.thirdPartyId}}">查看详情</router-link>
                        </template>
                        <template v-else>--</template>
                    </span>
                </div>
                <div class="gy-form-group1">
                    <span class="l">平台审核意见</span>
                    <div class="c" v-if="supply.appPlatformModel.remark"><div style="border: 1px solid #f5f5f5;padding: 10px;word-break: break-word;">{{supply.appPlatformModel.remark}}</div></div>
                    <span class="c" v-else>--</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'platformAudit',
    props: {
        supply: Object
    },
    data () {
        return {
            platformAuditInfo: true,
            userName: null,
            timer: null,
            clock: {
                applyDate: '',
                applyTime: ''
            }
        };
    },
    mounted () {
        this.timer = setInterval(() => {
            this.setTime();
        }, 1000);
        this.userName = JSON.parse(localStorage.getItem('userInfo')).username;
    },
    beforeDestroy () {
        clearInterval(this.timer);
    },
    methods: {
        zeroPadding (num, digit) {
            let zero = '';
            for (let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        setTime () {
            let cd = new Date();
            this.clock.applyTime = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.clock.applyDate = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2);
        }
    },
    filters: {
        date: function (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '--';
            }
            let y, m, d, date, h, ms, s, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            data = y + '-' + format(m) + '-' + format(d);
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            if (hour) {
                return data + ' ' + hours;
            } else {
                return data;
            }
            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.clock{
    height: 20px;
    margin-top: -2px;
    img{
        height: 25px;
        width: 25px;
        margin-left: 5px;
        vertical-align: middle;;
    }
    .alignment{
        display: inline-block;
        vertical-align: middle;
        width: 145px;
    }
}
.gy-form-group1 {
    float: left;
    width: 50%;
    padding: 8px 30px 8px 0;
    min-height: 36px;
    color: #000;
    line-height: 20px;
    &:after{
        clear: both;
        content: ' ';
        display: block;
    }
    .l {
        float: left;
        display: inline-block;
        width: 114px;
        padding-left: 30px;
        position: relative;
        strong{
            color: #e0370f;
            font-size: 12px;
            font-weight: normal;
            width: 8px;
            position: absolute;
            left: 20px;
            text-align: left;
            top: 0;
        }
    }
    .c {
        float: left;
        display: inline-block;
        color: $color-main;
        width: calc(100% - 114px);
        padding-left: 24px;
    }
}
.title-wrapper {
    padding: 15px 16px 9px 20px!important;
    .iconfont {
        margin-left: -6px;
    }
}
/deep/ .service-provider-audit-info-content {
    padding-left: 10px;
    padding-right: 10px;
    .gy-link {
        padding-left: 15px;
    }
}
</style>
