<template>
    <div class="">
        <div class="new-title-public">
            积分说明
        </div>
        <!--<el-card class="box-card">-->
            <!--<div slot="header" class="clearfix">-->
                <!--<span class="title">积分说明</span>-->
            <!--</div>-->
        <div style="padding: 20px 16px">
            <div class="head">国烨积分规则公示</div>
            <div class="intro">
                <p>国烨网为鼓励用户通过国烨平台进行线上交易，推出积分奖励活动。同时，增加企业会员等级制度，企业会员等级会跟着积分增加而提升。具体积分规则及条款如下：</p>
                <dl>
                    <dt style="color:#333;">1. 企业会员等级：</dt>
                    <dd>
                        <p>国烨企业会员分为：普通会员、白银会员、黄金会员、铂金会员、钻石会员五个等级；当达到某个级别后，除了可以享受平台提供的其他增值服务及活动外，所进行的交易获取的积分将乘以该级别的积分系数。</p>
                        <p>会员升级积分及积分系数，如下表所示：</p>
                        <table class="gy-table">
                            <thead>
                                <tr class="trTitle">
                                    <td>企业会员等级</td>
                                    <td>等级积分门槛</td>
                                    <td>等级系数</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>普通会员</td>
                                    <td>0</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>白银会员</td>
                                    <td>10000</td>
                                    <td>1.1</td>
                                </tr>
                                <tr>
                                    <td>黄金会员</td>
                                    <td>50000</td>
                                    <td>1.2</td>
                                </tr>
                                <tr>
                                    <td>铂金会员</td>
                                    <td>200000</td>
                                    <td>1.3</td>
                                </tr>
                                <tr>
                                    <td>钻石会员</td>
                                    <td>500000</td>
                                    <td>1.4</td>
                                </tr>
                            </tbody>
                        </table>
                    </dd>
                </dl>
                <dl>
                    <dt style="color:#333;">2.积分获取方式：</dt>
                    <dd>
                        <p>平台用户分为交易用户及物流用户，具体获取方式如下表所示：</p>
                        <table class="gy-table">
                            <thead>
                                <tr class="trTitle">
                                    <td>用户类型</td>
                                    <td>业务类型</td>
                                    <td>积分获取条件</td>
                                    <td>获取积分</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border-right: 1px solid #f2f2f2;">交易用户物流用户</td>
                                    <td>企业开户</td>
                                    <td>1.企业通过认证 <br>2.开通CA <br>3.开通线上支付银行</td>
                                    <td>7500分</td>
                                </tr>
                                <tr>
                                    <td rowspan="2" style="border-right: 1px solid #f2f2f2;">交易用户</td>
                                    <td>线上交易</td>
                                    <td>1.线上CA合同签订 <br>2.线上支付 <br>3.上传货权单 <br>4.上传发票</td>
                                    <td>买家交易10000元=1积分<br>卖家交易20000元=1积分</td>
                                </tr>
                                <tr>
                                    <td>智运物流</td>
                                    <td>线上订单交易后并通过平台找物流完成配送</td>
                                    <td>200分/单</td>
                                </tr>
                                <tr>
                                    <td rowspan="2" style="border-right: 1px solid #f2f2f2;">物流用户</td>
                                    <td rowspan="2" style="border-right: 1px solid #f2f2f2;">智运物流</td>
                                    <td>1.线上CA合同 <br>2.线上支付 <br>3.物流状态更新 <br>4.上传单据（提货单、卸货单） <br>5.上传发票</td>
                                    <td>船运：2000分/船次 <br>车运：200分/车次</td>
                                </tr>
                                <tr>
                                    <td>首单奖励</td>
                                    <td>船运：3000分/船次 <br>车运：500分/车次</td>
                                </tr>
                            </tbody>
                        </table>
                    </dd>
                </dl>
                <dl>
                    <dt style="color:#333;">3.积分获取说明：</dt>
                    <dd>1)积分功能上线前，已开通全功能的企业会员用户上线后直接获得认证奖励7500积分；<br>2)平台交易用户所获得的积分需达到积分激活条件方可使用，激活规则如下： <br>
                        <table class="gy-table">
                            <thead>
                            <tr class="trTitle">
                                <td>激活等级</td>
                                <td>积分激活条件</td>
                                <td>积分激活分值</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style="border-right: 1px solid #f2f2f2;">一级激活</td>
                                <td>交易额累积达到1亿</td>
                                <td>10000积分</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #f2f2f2;">二级激活</td>
                                <td>交易额累积达到2亿</td>
                                <td>10000积分</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #f2f2f2;">全激活</td>
                                <td>交易额累积达到3亿或以上</td>
                                <td>所有积分</td>
                            </tr>
                            </tbody>
                        </table>
                        3)线上物流交易产生的积分达到10000积分起兑，即累积满足船运5船次，车运50车次； <br>4)有下列行为之一的，平台有权采取积分锁定、积分清零等措施。并保留进一步追索的权利： <br>利用系统漏洞，恶意骗取积分的； <br>交易不真实，上传假凭证的； <br>违反国家法律规定、《国烨平台服务协议》及相关互联网规则的。</dd>
                </dl>
                <dl>
                    <dt style="color:#333;">4.积分兑换说明：</dt>
                    <dd>1)企业会员登陆后，点击用户名-进入积分中心-等级和积分即可查询积分，积分兑换商品后，平台将扣减相应积分； <br>2)积分兑换成功通过快递形式邮寄，一旦签收后如无质量问题，商品恕不可退换和取消，所兑换商品不提供发票； <br>3)兑换商品的配送仅限于中国大陆地区（不包含港、澳、台），国外及港、澳、台会员兑换奖励品收件地址请指定中国大陆地区； <br>4)兑换正常的处理周期为正常7-10个工作日内，如遇节假日自动顺延； <br>5)兑换活动所提供的商品，由供应商提供，平台不提供任何形式的担保和承诺； <br>6)平台中的商品图片仅供参考，请以实物为准； <br>7)平台保留本规则的最终解释权。</dd>
                </dl>
            </div>
        </div>
        <!--</el-card>-->
    </div>
</template>

<script>
export default {
    name: 'IntegralExplanation'
};
</script>

<style lang="scss" scoped>
    .el-card__header {
        padding: 10px 20px;
    }
    .head{
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        color: #333;
    }
    .intro{
        p{
            margin: 10px 0;
        }
        table{
            margin-bottom: 20px;
        }
        dt{
            font-weight: bold;
        }
    }
    .trTitle {
        background-color: #EEF3F8;
        border: 1px solid $color-border;
        border-bottom: 0;
        color:#666;
        font-size: 14px;
        font-weight:bold;

    }
    th, td {
        text-align: center;
    }
</style>
