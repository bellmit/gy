<template>
    <div class="invoiceInfo">
        <div class="prompt">请正确填写以下公司信息，该信息将在开票时使用。</div>
        <div class="title"><i class="iconfont icon-dingdanxinxi"></i>开票必填信息</div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>发票抬头</span>
            <input v-model="addFrom.title" type="text" placeholder="请输入您营业执照上的全称">
        </div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>税号／信用代码</span>
            <input v-model="addFrom.taxpayerno" maxlength="20" type="text" placeholder="请输入税号或信用代码">
        </div>
        <div class="title cl" style="padding-top:15px;"><i class="iconfont icon-info"></i>开具专用发票所须额外信息</div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>注册地址</span>
            <input v-model="addFrom.registeredAddress" type="text" placeholder="请输入注册地址">
        </div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>注册电话</span>
            <input v-model="addFrom.phone" type="text" placeholder="请输入注册电话">
        </div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>开户行</span>
            <input v-model="addFrom.bank" type="text" placeholder="请输入开户行">
        </div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>银行账号</span>
            <input v-model="addFrom.bankAccount" maxlength="19" @input="addFrom.bankAccount=addFrom.bankAccount.replace(/[^\d]/g,'')" type="text" placeholder="请输入银行账号">
        </div>
        <div class="title cl"><i class="iconfont icon-dingdanxinxi"></i>发票邮寄地址信息</div>
        <div class="gy-form-group">
            <span class="l">姓名</span>
            <input v-model="addFrom.name" type="text" placeholder="请输入发票接收人姓名">
        </div>
        <div class="gy-form-group">
            <span class="l">手机号</span>
            <input v-model="addFrom.mobile" type="text" placeholder="请输入发票接收人手机号">
        </div>
        <div class="gy-form-group">
            <span class="l">邮箱地址</span>
            <input v-model="addFrom.email" type="text" placeholder="请输入发票接收人邮箱地址">
        </div>
        <div class="gy-form-group">
            <span class="l">地址</span>
            <input v-model="addFrom.address" type="text" placeholder="请输入发票接收人地址">
        </div>
        <div class="footer cl">
            <button class="gy-button-normal" @click="reset">重置</button>
            <button v-if="!buttonType" class="gy-button-extra" @click="submit">保存</button>
            <button v-if="buttonType" class="gy-button-extra" @click="modification">保存</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'invoiceInfo',
    data () {
        return {
            buttonType: false,
            addFrom: {
                title: null, // 抬头
                taxpayerno: null, // 税号
                registeredAddress: null, // 注册地址
                phone: null, // 注册电话
                bank: null, // 开户行
                bankAccount: null, // 银行账号
                name: null, // 发票接收人姓名
                mobile: null, // 发票接收人手机号
                email: null, // 发票接收人邮箱地址
                address: null // 发票接收人地址
            }
        };
    },
    mounted () {
        this.getInvoiceInfo();
    },
    methods: {
        // 详情
        getInvoiceInfo () {
            this.$http.get(this.$api.invoice.getInfo + JSON.parse(localStorage.getItem('userInfo')).companyId)
                .then(res => {
                    console.log(res.data.data);
                    this.addFrom = res.data.data || {
                        title: JSON.parse(localStorage.getItem('userInfo')).companyName
                    };
                    res.data.data ? this.buttonType = true : this.buttonType = false;
                });
        },
        // 通过正则过滤小数点后两位
        handleInput (e) {
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,0})/g)[0]) || null;
            this.addFrom.bankAccount = e.target.value;
        },
        // 重置
        reset () {
            this.addFrom.title = ''; // 税号
            this.addFrom.taxpayerno = ''; // 税号
            this.addFrom.registeredAddress = ''; // 注册地址
            this.addFrom.phone = ''; // 注册电话
            this.addFrom.bank = ''; // 开户行
            this.addFrom.bankAccount = ''; // 银行账号
            this.addFrom.name = ''; // 发票接收人姓名
            this.addFrom.mobile = ''; // 发票接收人手机号
            this.addFrom.email = ''; // 发票接收人邮箱地址
            this.addFrom.address = ''; // 发票接收人地址
        },
        // 保存
        submit () {
            if (!this.check()) return false;
            this.$http.post(this.$api.invoice.info, this.addFrom)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('保存成功', '提示', {type: 'success'});
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        },
        // 修改
        modification () {
            if (!this.check()) return false;
            this.$http.post(this.$api.invoice.modify, this.addFrom)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('保存成功', '提示', {type: 'success'});
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        },
        check () {
            // if (!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(this.addFrom.email)) {
            //     this.$message.error('邮箱不正确');
            //     return;
            // }
            if (!this.addFrom.title) {
                this.$message.error('发票抬头不能为空');
                return false;
            }
            if (!this.addFrom.taxpayerno) {
                this.$message.error('税号／信用代码不能为空');
                return false;
            }
            if (!this.addFrom.registeredAddress) {
                this.$message.error('注册地址不能为空');
                return false;
            }
            if (!this.addFrom.phone) {
                this.$message.error('注册电话不能为空');
                return false;
            }
            if (!this.addFrom.bank) {
                this.$message.error('开户行不能为空');
                return false;
            }
            if (!this.addFrom.bankAccount) {
                this.$message.error('银行账号不能为空');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.invoiceInfo{
    .prompt{
        padding: 20px 0 20px 30px;
        font-size: 14px;
        color: #333333;
    }
    .title{
        padding-left: 30px;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        position: relative;
        i{
            font-weight: 100;
            position: absolute;
            font-size: 14px;
            left: 12px;
        }
    }
    .footer{
        padding: 22px 30px 0 0;
        float: right;
    }
}
</style>
