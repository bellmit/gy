<template>
    <div>
        <table class="gy-table" border="true">
            <tr>
                <td colspan="7"><div class="head">(*为必填或必上传文件)</div></td>
            </tr>
            <tr class="font">
                <td></td>
                <td colspan="2"><div>资质名称</div></td>
                <td><div>文件模板</div></td>
                <td><div>是否邮寄正本</div></td>
                <td><div>是否上传电子版</div></td>
                <td><div>备注</div></td>
            </tr>
            <tr class="tab-row1">
                <td rowspan="10"><div class="font">公司认证</div></td>
                <td><div>三证合一</div></td>
                <td><div class="text"><span>*</span>三证合一照</div></td>
                <td><div>-</div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td rowspan="3"><div>非三证合一</div></td>
                <td><div class="text"><span>*</span>工商营业执照</div></td>
                <td><div>-</div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td><div class="text"><span>*</span>组织机构代码证</div></td>
                <td><div>-</div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td><div class="text"><span>*</span>税务登记证</div></td>
                <td><div>-</div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td rowspan="2"><div>交易公司</div></td>
                <td><div class="text">
                    <!--<span>*</span>-->
                    管理员账号授权书
                </div></td>
                <td><div><a :href="loadUrl1">下载《管理员账号授权书》模板</a></div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td><div class="text">危化品资质</div></td>
                <td><div>-</div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td rowspan="2"><div>承运商</div></td>
                <td><div class="text">
                    <!--<span>*</span>-->
                    管理员账号授权书
                </div></td>
                <td><div><a :href="loadUrl2">下载《管理员账号授权书》模板</a></div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td><div class="text"><span>*</span>运输资料</div></td>
                <td><div>-</div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td rowspan="2"><div>仓储服务商</div></td>
                <td><div class="text">
                    <!--<span>*</span>-->
                    管理员账号授权书
                </div></td>
                <td><div><a :href="loadUrl3">下载《管理员账号授权书》模板</a></div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row1">
                <td><div class="text"><span>*</span>仓储资质</div></td>
                <td><div>-</div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row2">
                <td rowspan="3"><div class="font">电子签章功能</div></td>
                <td colspan="2"><div class="text"><span>*</span>CA认证申请书</div></td>
                <td><div><a :href="loadUrl4">下载《CA认证申请书》模板</a></div></td>
                <td><div>是</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row2">
                <td colspan="2"><div class="text"><span>*</span>CA认证授权书</div></td>
                <td><div><a :href="loadUrl5">下载《CA认证授权书》模板</a></div></td>
                <td><div>是</div></td>
                <td><div>是</div></td>
                <td><div>-</div></td>
            </tr>
            <tr class="tab-row2">
                <td colspan="2"><div class="text"><span>*</span>法人身份证</div></td>
                <td><div>-</div></td>
                <td><div>是</div></td>
                <td><div>是</div></td>
                <td><div>身份证正反面</div></td>
            </tr>
            <tr class="tab-row3">
                <td><div class="font">签约银行功能</div></td>
                <td colspan="2"><div class="text"><span>*</span>法人身份证</div></td>
                <td><div>-</div></td>
                <td><div>否</div></td>
                <td><div>是</div></td>
                <td><div>身份证正反面</div></td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            loadUrl1: process.env.API_ROOT_MAIN + this.$api.account.downLoad + '1',
            loadUrl2: process.env.API_ROOT_MAIN + this.$api.account.downLoad + '4',
            loadUrl3: process.env.API_ROOT_MAIN + this.$api.account.downLoad + '5',
            loadUrl4: process.env.API_ROOT_MAIN + this.$api.account.downLoad + '2',
            loadUrl5: process.env.API_ROOT_MAIN + this.$api.account.downLoad + '3'
        };
    }
};
</script>

<style scoped lang="scss">
    .gy-table{
        td, th {
            padding-left: 0;
            border-color: rgba(lightgray,.4);
        }

        tr.selected, tr:hover{
            background-color: white;
        }

        div {
            text-align: center;
        }

        span {
            color: $color-highlight;
        }

        a {
            color: $color-extra;
        }

        a:hover, a:visited {
            color: $color-extra;
        }

        .head {
            text-align: left;
            text-indent: 20px;
            color: $color-warning;
        }

        .tab-row1 td{
            background-color: rgba(238,245,255,1);
        }

        .tab-row2 td{
            background-color: rgba(250,246,237,1);
        }

        .tab-row3 td{
            background-color: rgba(252,240,240,1);
        }

        .text {
            color: #333;
            text-align: left;
            text-indent: 15px;
        }

        .font{
            font-size: 16px;
        }
    }
</style>
