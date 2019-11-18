<!--suppress ALL -->
<template>
<div class="forensicServices">
    <div class="new-title-public">法务服务</div>
    <div class="fs-item">
        <div class="item-title"><i class="iconfont icon-dingdanxinxi"></i>免责条款</div>
        <div class="item-content">
            <p class="item-content-text">用户在国烨网交易过程中如与其他用户因交易产生纠纷，请求国烨网从中予以调处的，经国烨网审核后，国烨网将通过电子邮件等方式联系纠纷双方了解情况，并将所了解的情况通过电子邮件等方式向双方进行确认。因国烨网并非专业审判、仲裁机构，望您能理解和知悉，国烨网对证据的鉴别能力及对纠纷的处理能力有限，协调用户间的纠纷完全是基于会员的委托，并不保证纠纷处理结果完全符合您的期望。该处理结果仅系为解决双方纠纷的参考意见，并不具有任何强制力及执行力，国烨网也不承担任何法律责任。 如经生效法律文书确认用户存在违法或违反本协议行为的，或经国烨网判断用户涉嫌存在违法或违反本协议行为的，国烨网有权以发布公告的形式在国烨网上公布用户的违法行为，同时也有权对该用户在国烨网享有的权限采取一定的措施（包括但不限于限制权利、终止国烨网平台服务等）。</p>
        </div>
    </div>
    <!--<div class="fs-item">-->
        <!--<div class="item-title"><i class="iconfont icon-forensic-services"></i>法务服务</div>-->
        <!--<p class="item-content"></p>-->
    <!--</div>-->
    <div class="fs-item fs-item1">
        <div class="item-title"><i class="iconfont icon-qianyue"></i>提交信息</div>
        <div class="item-content">
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>问题类型</div>
                <div class="">
                    <el-radio-group v-model="params.proceedingsType">
                        <template v-for="item in proceedingsTypes">
                            <el-radio :label="item.id" :key="item.id">{{item.name}}</el-radio>
                        </template>
                    </el-radio-group>
                </div>
            </div>
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>问题描述</div>
                <div class="">
                    <textarea v-model="params.proceedingsText" class="gy-textarea" cols="30" rows="20"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="fs-foot">
        <button type="button" class="gy-button-extra" @click="onSub">提交</button>
        <button type="button" class="gy-button-normal">取消</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'forensicServices',
    data () {
        return {
            params: {
                usrUserId: null, // 用户id
                // odrOrderId: null, // 涉及订单id
                // odrOrderSn: null, // 涉及订单编号
                proceedingsText: null, // 事项/纠纷的文字说明
                proceedingsType: null, // 事项类型：1 提问(其他) 2 合同问题
                proceedingsTypeDesc: null,
                contactName: null, // 联系人
                contactPhone: null, // 联系电话
                contactEmail: null, // 联系邮箱
                lawProceedingsFiles: [] //  法务附件
            },
            proceedingsTypes: [
                {
                    name: '合同纠纷',
                    id: 2
                },
                {
                    name: '其他法律问题',
                    id: 1
                }
            ]
        };
    },
    created () {
        this.params.usrUserId = JSON.parse(localStorage.getItem('userInfo')).id || null;
        this.getInfo();
    },
    methods: {
        getInfo () {
            this.$http.post(this.$api.forensicServices.getInfo)
                .then((res) => {
                    if (res.data.code === 0) {
                        for (let key in this.params) {
                            this.params[key] = res.data.data[key] || this.params[key];
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        onSub () {
            if (!this.params.proceedingsType) {
                this.$message.error('请先选择问题类型!');
                return;
            }
            if (!this.params.proceedingsText) {
                this.$message.error('请先填写问题描述!');
                return;
            }
            let type = this.proceedingsTypes.filter(e => e.id === this.params.proceedingsType);
            this.params.proceedingsTypeDesc = type[0].name;
            this.$http.post(this.$api.forensicServices.sub, this.params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('提交成功!');
                        this.params.proceedingsType = null;
                        this.params.proceedingsText = null;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.forensicServices {
    .fs-item {
        margin: 20px 0;
        .item-title {
            margin: 20px 30px;
            line-height: 1;
            font-weight: bold;
            .iconfont {
                margin-right: 7px;
                font-weight: 200;
            }
        }
        .item-content {
            margin: 0 30px;
            .gy-form-group {
                float: none;
                width: 100%;
                padding: 8px 0 8px 106px;
                .l {
                    width: 86px;
                }
            }
            .item-content-text {
                text-indent: 2em;
            }
        }
    }
    .fs-item1 {
        margin-bottom: 8px;
        .item-title {
            margin-bottom: 8px;
        }
    }
    .fs-foot {
        text-align: right;
        margin: 20px 30px 30px;
        button{
            height: 30px;
            line-height: 30px;
        }
        .gy-button-extra {
            margin-right: 8px;
        }
    }
}

/deep/ .el-radio__input.is-checked+.el-radio__label ,/deep/ .el-radio{
    color: $color-main;
}

/deep/ .el-radio {
    margin-right: 60px;
    &:last-child {
        margin-right: 0;
    }
}
</style>
