<template>
    <div class="reviseSheet">
        <div class="gy-h4"><i class="iconfont icon-info"></i>修改仓储供应单</div>
        <div class="gy-form-box-14">
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>仓储公司</div>
                <div class="form-left">{{params.companyName}}</div>
            </div>
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>品名</div>
                <div class="form-left">{{params.productName}}</div>
            </div>
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>空容量</div>
                <div class="content">
                    <input type="text" v-model="params.emptyCapacity" placeholder="请输入"><span>m³</span>
                </div>
            </div>
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>仓储单价</div>
                <div class="group-content">
                    <div class="c"><input type="text" :disabled="intentionalPrice" v-model="params.intentionalPrice" placeholder="请输入"></div>
                    <div class="t">元/立方*月</div>
                    <div class="r">
                        <span class="el-radio__input" :class="intentionalPrice ? 'is-checked' : ''" @click="intentionalPrice = !intentionalPrice"><span class="el-radio__inner"></span></span>面议
                    </div>
                </div>
            </div>
            <div class="gy-form-group">
                <div class="l">联系人</div>
                <div class="">
                    <input type="text" v-model="params.contactName" placeholder="请输入">
                </div>
            </div>
            <div class="gy-form-group">
                <div class="l">联系人手机</div>
                <div class="">
                    <input type="text" v-model="params.contactMobile" placeholder="请输入">
                </div>
            </div>
        </div>
        <div class="button-wrapper">
            <button type="button" @click="onSubmit" class="gy-button-extra">提交</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            params: {
                companyName: '',
                companyId: null,
                productName: '',
                productId: null,
                emptyCapacity: null,
                depotName: null,
                intentionalPrice: null,
                contactName: null,
                contactMobile: null
            },
            intentionalPrice: false,
            reviseId: null
        };
    },
    created () {
        this.getData();
    },
    methods: {
        getData () {
            var that = this;
            that.reviseId = that.$route.query.reviseId;
            this.$http.get(this.$api.warehouse.reviseList + '/' + that.reviseId).then(function (res) {
                if (res.data.code === 0) {
                    that.params = res.data.data;
                    if (that.params.intentionalPrice === 0) {
                        that.intentionalPrice = true;
                        that.params.intentionalPrice = null;
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        onSubmit () {
            var that = this;
            let params = Object.assign({}, this.params);
            if (!this.params.emptyCapacity) {
                this.$message.error('请先填写空容量');
                return;
            }
            if (this.params.emptyCapacity && !/^(0|[1-9]\d*)(\.\d{0,6})?$/.test(this.params.emptyCapacity)) {
                this.$message.error('请填写正确空容量');
                return;
            }
            if (this.intentionalPrice) {
                params.intentionalPrice = 0;
            } else if (!this.params.intentionalPrice) {
                this.$message.error('请先填写仓储单价');
                return;
            }
            if (this.params.intentionalPrice && !/^(0|[1-9]\d*)(\.\d+)?$/.test(this.params.intentionalPrice)) {
                this.$message.error('请填写正确仓储单价');
                return;
            }
            if (this.params.contactMobile && !/^1([34578])\d{9}$/.test(this.params.contactMobile)) {
                this.$message.error('请填写正确手机号');
                return;
            }
            params.isDisplay = 0;
            this.$http.put(this.$api.warehouse.reviseList, params).then(function (res) {
                if (res.data.code === 0) {
                    that.$message.success('操作成功');
                    that.$router.push({name: 'warehouseIntentionSheet'});
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }
};
</script>

<style scoped lang="scss">
    .reviseSheet {
        .gy-h4{
            position: relative;
            padding-left:20px;
            .icon-info {
                font-size: 12px;
                color: #666;
                position: absolute;
                top:11px;
                left:0;
            }
        }
        .gy-form-box-14 {
            padding-top: 4px;
            &:after {
                display: block;
                content: ' ';
                clear: both;
            }
        }
        .gy-form-group {
            padding-left: 74px;
            height: 46px;
            .l {
                width: 64px;
                padding-left: 8px;
                strong {
                    left: 0;
                }
            }
            .icon-mySearch {
                position: absolute;
                right: 16px;
                top: 0;
            }
            .group-content {
                display: flex;
                .c {
                    flex: 1;
                }
                .t {
                    flex: 0 0 100px;
                }
                .r {
                    flex: 0 0 60px;
                    &>span{
                        margin-right: 10px;
                    }
                }
            }
            .content {
                display: flex;
                input {
                    flex: 1;
                }
                span {
                    flex: 0 0 10px;
                }
            }
        }
        .gy-form-group:nth-child(even) {
            padding-left: 118px;
            padding-right: 0;
            .l {
                width: 108px;
                padding-left: 38px;
                strong {
                    left: 28px;
                }
            }
            .managerList {
                left: 119px;
                width: calc(100% - 119px);
            }
        }
        .form-left{
            padding-left:10px;
        }
        .button-wrapper {
            margin: 15px 14px 0 0;
            text-align: right;
        }
    }
</style>
