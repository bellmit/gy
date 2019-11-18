<template>
    <div class="charts-item" :class="isBig">
        <div class="item-header">
            <div class="item-header-item">
                <div class="title">{{title}}</div>
            </div>
            <div class="item-header-item">
                <ul v-if="titleType === 'date'">
                    <li v-if="dateType != 2" :class="{'active' : (active === '当日')}" @click="chkData(resetData, 1)">当日</li>
                    <li v-if="dateType == 2" :class="{'active' : (active === '当周')}" @click="chkData(resetData, 2)">当周</li>
                    <li :class="{'active' : (active === '当月')}" @click="chkData(resetData, 3)">当月</li>
                    <li :class="{'active' : (active === '总体')}" @click="chkData(resetData, 4)">总体</li>
                </ul>
            </div>
        </div>
        <div :class='{"item-border": showLine}' class="item-content">
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
        dateType: Number,
        showLine: Boolean,
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
                this.resetList(1, t);
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
.charts-item4 {
  // min-width: 1200px;
  // height: 500px;
  position: relative;
  .item-border::after {
     content: '';
     position: absolute;
     top: 0;
     left: 456px;
     width: 1px;
     height: 100%;
     background-color: #e6eaea;
     z-index: 99999;
  }
  // .item-content {
  //     min-height: 360px;
  //     .item-content-item1 {
  //       height: 360px;
  //     }
  //   }
}
</style>
