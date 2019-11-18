<template>
    <div style="padding-bottom: 30px">
        <div class="page-title">数据统计</div>
        <super-admin></super-admin>
    </div>
</template>

<script>
import superAdmin from './super-admin.vue';

export default {
    data () {
        return {
            gyItem: {
                title: '客户数据',
                active: '本月',
                titleType: '',
                isBig: 'charts-item2',
                resetData: 1
            }
        };
    },
    created () {
    },
    mounted () {
    },
    methods: {
        resetList () {
        }
    },
    provide () {
        return {
            resetList: this.resetList
        };
    },
    components: {
        superAdmin
    }
};
</script>

<style lang="scss" scoped>
    .page-title {
        margin-bottom: 5px;
        padding: 5px 20px;
        border-bottom: 1px solid $color-border;
        font-size: 16px;
        color: $color-title;
        font-weight: bold;
    }

    .company-wrapper {
        padding: 10px 5px 0 15px;
        height: 46px;
        display: flex;
        .company-item {
            flex: 1;
            display: flex;
            .title {
                flex: 0 0 98px;
            }
            .company-name {
                width: 450px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .search-ipt {
                flex: 1;
                padding:0 10px 0 80px;
                position: relative;
                .icon-search {
                    position: absolute;
                    right: 12px;
                    top: 0;
                }
                .managerList {
                    position: absolute;
                    right: 10px;
                    top: 30px;
                    z-index: 999;
                    width: calc(100% - 90px);
                    max-height: 260px;
                    background: #fff;
                    overflow-y: auto;
                    ul {
                        max-height: 260px;
                        overflow: auto;
                        padding: 10px 0;
                        border: 1px solid $color-border;
                        li {
                            padding: 0 10px;
                            cursor: pointer;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            &:hover {
                                background-color: #f5f7fa;
                                color: #4a90e2;
                            }
                        }
                    }
                }
            }
        }
    }

    /deep/ .charts-row {
        display: flex;
        min-height: 260px;
        padding: 10px 5px 0 15px;
        .charts-item {
            flex: 1;
            margin-right: 10px;
            box-sizing: border-box;
            border: 1px solid $color-border;
            display: flex;
            flex-direction: column;
            .item-header {
                flex: 0 0 40px;
                border-bottom: 1px solid $color-border;
                display: flex;
                .item-header-item {
                    flex: 1;
                    line-height: 40px;
                    .title {
                        padding-left: 15px;
                        font-size: 16px;
                        font-weight: bold;
                        color: $color-title;
                    }
                    ul {
                        display: flex;
                        justify-content: flex-end;
                        li {
                            flex: 0 0 30px;
                            line-height: 39px;
                            text-align: center;
                            margin: 0 8px;
                            cursor: default;
                        }
                        .active {
                            color: $color-a-active;
                            border-bottom: 2px solid $color-a-active;
                        }
                    }
                }
            }
            .item-content {
                flex: 1;
                min-width: 380px;
                min-height: 208px;
                position: relative;
                .item-content-item {
                  /*position: absolute;*/
                  /*left: 0;*/
                  /*top: 0;*/
                  width: 480px;
                  height: 208px;
                  margin: 0 auto;
                }
                .item-content-item1 {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 208px;
                }
                .number {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    font-size: 24px;
                    font-weight: 600;
                    text-align: center;
                    color: $color-a-active;
                    .space {
                        flex: 1;
                    }
                    .text-num {
                        flex: 0 0 35px;
                    }
                }
            }
            @media (min-width: 1400px) {
              /deep/ .item-content {
                min-width: 480px;
                .data-item {
                    flex: 0 0 150px;
                    height: 150px;
                    margin: 30px auto;
                    padding-top: 50px;
                }
                .data-item1 {
                    width: 180px;
                    height: 180px;
                    margin: 0;
                    top: 15px;
                    padding-top: 65px;
                }
                .data-item1-left {
                  left: calc((100% - 360px)/3);
                }
                .data-item1-right {
                  right: calc((100% - 360px)/3);
                }
              }
            }
        }
        .charts-item1 {
            @extend .charts-item;
            flex: 2;
        }
        .charts-item2 {
            @extend .charts-item;
            flex: 1;
        }
        .charts-item3 {
          .item-content {
            min-height: 408px;
            .item-content-item1 {
              height: 408px;
            }
          }
        }
    }

    /deep/ .charts-row1 {
        .charts-item {
            .item-content {
                min-height: 400px;
            }
        }
    }

    /deep/ .zwsj {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
</style>
