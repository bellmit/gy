<template>
    <div class="address-list" v-show="show">
        <div class="main">
            <h6>搜索地址库</h6>
            <div class="form-box">
                <div class="t">
                    <input type="text" v-model="keywords" @keyup.13="getList" placeholder="请输入要搜索的地址">
                    <i class="iconfont icon-search" @click="getList"></i>
                </div>
                <div class="list">
                    <div class="list-t-head">
                        <table class="gy-table">
                            <thead>
                                <tr>
                                    <td class="td-50">选择</td>
                                    <td class="td-150">公司名</td>
                                    <td class="td-100">省</td>
                                    <td class="td-100">市</td>
                                    <td class="td-100">区(县）</td>
                                    <td class="td-100">街道(镇）</td>
                                    <td>详细地址</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="list-t-body">
                        <table class="gy-table">
                            <tr v-for="item in list" :key="item.id">
                                <td class="td-50"><input type="radio" name="address" v-model="selectedId" :value="item.id"></td>
                                <td class="td-150">{{item.warehouseName}}</td>
                                <td class="td-100">{{item.provinceName}}</td>
                                <td class="td-100">{{item.cityName}}</td>
                                <td class="td-100">{{item.districtName}}</td>
                                <td class="td-100">{{item.townName}}</td>
                                <td>{{item.address}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="button-box">
                    <a href="javascript:;" class="gy-button-extra" @click="handleConfirmAddress">确定</a>
                </div>
            </div>
            <i class="iconfont icon-close" @click="handleClose"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'address-list',
    data () {
        return {
            keywords: '',
            list: [],
            selectedId: null,
            selectedAddress: {}
        };
    },
    props: {
        loadSelected: {
            type: Object,
            defalult: {}
        },
        unloadSelected: {
            type: Object,
            defalult: {}
        },
        show: Boolean,
        type: Number
    },
    methods: {
        getList () {
            this.$http.get(this.$api.account.addressLib + this.keywords)
                .then(res => {
                    this.list = res.data.data;
                });
        },
        handleClose () {
            this.keywords = '';
            this.list = [];
            this.selectedId = null;
            this.$emit('update:show', false);
        },
        handleConfirmAddress () {
            for (let item of this.list) {
                (item.id === this.selectedId) && (this.selectedAddress = item);
            }
            this.type === 0 ? this.$emit('update:loadSelected', this.selectedAddress) : this.$emit('update:unloadSelected', this.selectedAddress);
            this.$emit('update:show', false);
        }
    }
};
</script>

<style lang="scss" scoped>
    .address-list{
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 100;
        .main{
            position: absolute;
            background-color: #fff;
            width: 800px;
            height: 400px;
            left: 50%;
            top: 50%;
            border-radius: $border-radius-base;
            margin: -200px 0 0 -400px;
            h6{
                font-size: 16px;
                color: $color-title;
                border-bottom: 1px solid $color-border;
                line-height: 48px;
                margin: 0;
                padding: 0 15px;
            }
            .form-box{
                padding: 10px 15px;
                .t{
                    position: relative;
                    margin-bottom: 15px;
                    input{
                        font-size: 14px;
                    }
                    .icon-search{
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }
                .list{
                    .td-50{
                        width: 50px;
                    }
                    .td-100{
                        width: 100px;
                    }
                    .td-150{
                        width: 150px;
                    }
                    .list-t-body{
                        height: 185px;
                        overflow: auto;
                    }
                }
                .button-box{
                    text-align: right;
                    padding-top: 15px;
                }
            }
            .icon-close{
                position: absolute;
                right: 15px;
                top: 10px;
                color: $color-minor;
                font-size: 20px;
                cursor: pointer;
            }
        }
    }
</style>
