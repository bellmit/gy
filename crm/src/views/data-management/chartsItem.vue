<template>
    <div class="charts-item" :class="isBig">
        <div class="item-header">
            <div class="item-header-item">
                <div class="title">{{title}}</div>
            </div>
            <div class="item-header-item">
                <ul v-if="titleType === 'date'">
                    <li :class="{'active' : (active === '当日')}" @click="chkData(resetData, 1)">当日</li>
                    <li :class="{'active' : (active === '当周')}" @click="chkData(resetData, 2)">当周</li>
                    <li :class="{'active' : (active === '当月')}" @click="chkData(resetData, 3)">当月</li>
                    <li :class="{'active' : (active === '总体')}" @click="chkData(resetData, 4)">总体</li>
                </ul>
                <!-- 客户组 -->
                <ul v-if="titleType === 'dateCustomer'">
                    <li :class="{'active' : (active === '当日')}" @click="chkData(resetData, 1)">当日</li>
                    <li :class="{'active' : (active === '当周')}" @click="chkData(resetData, 2)">当周</li>
                    <li :class="{'active' : (active === '当月')}" @click="chkData(resetData, 3)">当月</li>
                    <li :class="{'active' : (active === '总体')}" @click="chkData(resetData, 4)">总体</li>
                </ul>
                <ul v-if="titleType === 'area'">
                    <li :class="{'active' : (active === '中国')}">中国</li>
                    <li :class="{'active' : (active === '全球')}">全球</li>
                </ul>
                <ul v-if="titleType === 'date1'">
                    <li :class="{'active' : (active === '本月')}" @click="chkData(resetData, 1)">本月</li>
                    <li :class="{'active' : (active === '本年')}" @click="chkData(resetData, 2)">本年</li>
                </ul>
                <ul v-if="titleType === 'date2'">
                    <li :class="{'active' : (active === '当日')}" @click="chkData(resetData, 1)">当日</li>
                    <li :class="{'active' : (active === '当周')}" @click="chkData(resetData, 2)">当周</li>
                    <li :class="{'active' : (active === '当月')}" @click="chkData(resetData, 3)">当月</li>
                    <li :class="{'active' : (active === '当年')}" @click="chkData(resetData, 5)">当年</li>
                    <li :class="{'active' : (active === '总体')}" @click="chkData(resetData, 4)">总体</li>
                </ul>
                <span class="isMore" v-if="titleType === 'router'" @click="$router.push({name : routerData.link})">{{routerData.text}}</span>
            </div>
        </div>
        <div class="item-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['resetList'],
    props: {
        title: '',
        isBig: String,
        active: String,
        titleType: String,
        resetData: Number,
        routerData: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    mounted () {
    },
    methods: {
        chkData (e, t) {
            switch (e) {
            case 1 :
                this.resetList(t);
                break;
            case 2 :
                this.resetList(2, t);
                break;
            case 3 :
                this.resetList(3, t);
                break;
            case 4 :
                this.resetList(4, t);
                break;
            default :
                break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.isMore {
    position: absolute;
    right: 15px;
    top: 0;
    line-height: 39px;
    font-size: 14px;
    font-weight: 100;
    cursor: pointer;
    &:hover {
        color: $color-a-active;
    }
}
.item-header-item {
    position: relative;
}
</style>
