<template>
    <div class="list-statistics">
        <div class="list-statistics-title">
            <div class="list-statistics-date">统计周期: <template v-if="listUlIndex === 2">{{ new Date() | date1 }}-01 至 </template>{{ new Date() | date }}</div>
            <div class="list-ul-content">
                <ul>
                    <li :class="{ active: listUlIndex === 1 }" @click="toggleTab(1)">今日统计</li>
                    <li :class="{ active: listUlIndex === 2 }" @click="toggleTab(2)">本月统计</li>
                </ul>
            </div>
        </div>
        <div class="list-statistics-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'listStatistics',
    data () {
        return {
            listUlIndex: 1
        };
    },
    methods: {
        toggleTab (idx) {
            this.listUlIndex = idx;
            this.$emit('toggleTabs', idx);
        }
    },
    filters: {
        date1 (time) {
            if (!time) {
                return '';
            }
            let y, m, date, data;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            data = y + '-' + format(m);

            return data;
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
    .list-ul-content {
        overflow: hidden;
        ul{
            overflow: hidden;
            float: right;
        }
        li {
            float: left;
            padding: 0 5px;
            color: #666;
            &.active {
                color: $color-a-active;
                border-bottom: 2px solid $color-a-active;
            }
        }
        li:hover{
            cursor: pointer;
        }
        ul li:not(:first-child) {
            position: relative;
            margin-left: 10px;
        }
    }
    .list-statistics {
        background-color: #ecf5ff;
        padding: 5px 10px;
        font-size: 12px;
        .list-statistics-title {
            display: flex;
            height: 34px;
            line-height: 31px;
            &>div {
                flex: 1;
            }
            .list-ul-content {
                text-align: right;
            }
        }
        .list-statistics-content {
            .list-statistics-item {
                &>div{
                    width: 25%;
                    float: left;
                    position: relative;
                    span:last-child {
                        position: absolute;
                        left: 100px;
                        top: 0;
                    }
                    .span-money {
                        /*left: auto!important;*/
                        /*right: 15px!important;*/
                    }
                }
                .list-statistics-item-l {
                    width: 33.3%;
                }

                .list-statistics-item-r {
                    span:last-child {
                        left: 120px;
                    }
                }
            }
            &:after {
                display: block;
                content: ' ';
                clear: both;
            }
        }
    }
</style>
