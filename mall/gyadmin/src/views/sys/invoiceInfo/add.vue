<template>
    <div class="invoiceAdd">
        <div class="gy-form-group" style="margin-top: 20px;">
            <span class="l">公司名称</span>
            <!-- <input v-model="addFrom.title" type="text" placeholder="请选择您营业执照上的全称"> -->
            <div><gy-company-select v-if="companyName" @change="change" :selected.sync="selectedProduct" :defaultProduct="companyName"></gy-company-select></div>
            <div v-if="!companyName" ><gy-company-select @change="change" :selected.sync="selectedProduct" :defaultProduct="companyName"></gy-company-select></div>
        </div>
        <div class="title cl" style="padding-top:24px;"><i class="iconfont icon-info"></i>开票必填信息</div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>发票抬头</span>
            <input v-model="addFrom.title" type="text" placeholder="请选择您营业执照上的全称">
        </div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>税号／信用代码</span>
            <input v-model="addFrom.taxpayerno" type="text" maxlength="20" placeholder="请输入税号或信用代码">
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
        <div class="title cl"><i class="iconfont icon-info"></i>发票邮寄地址信息</div>
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
        <div class="onlinekp">
            <el-checkbox v-model="checkFrom.onlineInvoice" @change="assignment('onlineInvoice')">在线开票开通</el-checkbox>
        </div>
        <div v-if="onlineInvoice">
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>税控盘编号</span>
            <input v-model="addFrom.deviceno" type="text" placeholder="请输入税控盘编号">
        </div>
        <div class="gy-form-group">
            <span class="l"><strong>*</strong>开票类型</span>
            <div>
                <el-checkbox v-model="checkFrom.specialInvoice" @change="assignment('specialInvoice')">增值税专用发票</el-checkbox>
                <el-checkbox v-model="checkFrom.ordinaryInvoice" @change="assignment('ordinaryInvoice')">增值税普通发票纸质发票</el-checkbox>
                <!-- <el-checkbox v-model="checkFrom.electronicInvoice" @change="assignment('electronicInvoice')">增值税普通发票电子发票</el-checkbox> -->
            </div>
        </div>
        <div class="gy-form-group cl">
            <span class="l">百望云APPKEY</span>
            <textarea v-model="addFrom.appkey" cols="30" rows="10" class="gy-textarea"></textarea>
        </div>
        </div>
        <div class="footer cl">
            <button class="gy-button-normal" @click="reset">重置</button>
            <button v-if="!this.$route.query.companyId" class="gy-button-extra" @click="submit">保存</button>
            <button v-if="this.$route.query.companyId" class="gy-button-extra" @click="modification">保存</button>
        </div>
    </div>
</template>

<script>
import gyCompanySelect from '@/components/company-select';
export default {
    name: 'invoiceInfo',
    components: {
        gyCompanySelect
    },
    data () {
        return {
            onlineInvoice: false,
            companyName: null,
            selectedProduct: {},
            checkFrom: {
                onlineInvoice: null,
                specialInvoice: null,
                ordinaryInvoice: null,
                electronicInvoice: null
            },
            addFrom: {
                companyId: null,
                companyName: null,
                title: null, // 抬头
                taxpayerno: null, // 税号
                registeredAddress: null, // 注册地址
                phone: null, // 注册电话
                bank: null, // 开户行
                bankAccount: null, // 银行账号
                name: null, // 发票接收人姓名
                mobile: null, // 发票接收人手机号
                email: null, // 发票接收人邮箱地址
                address: null, // 发票接收人地址
                onlineInvoice: 0, // 是否开通在线开票
                deviceno: null, // 设备号
                specialInvoice: 0, // 是否可开增值税专用发票0:否1：是
                ordinaryInvoice: 0, // 是否可开增值税普通发票（纸质）0：否1：是
                electronicInvoice: 0, // 是否可开增值税电子发票0：否1：是
                appkey: null

            }
        };
    },
    mounted () {
        if (this.$route.query.companyId) {
            this.getInvoiceInfo();
        }
    },
    methods: {
        // 详情多选赋值
        checkassignment () {
            let that = this;
            Object.keys(that.checkFrom).forEach(function (key) {
                that.addFrom[key] === 1 ? that.checkFrom[key] = true : that.checkFrom[key] = false;
            });
            this.Isshow();
        },
        // 详情
        getInvoiceInfo () {
            this.$http.get(this.$api.invoice.getInfo + this.$route.query.companyId)
                .then(res => {
                    console.log(res.data.data);
                    this.addFrom = res.data.data;
                    this.companyName = this.addFrom.companyName;
                    console.log(this.addFrom);
                    this.checkassignment();
                });
        },
        // 组件买方
        change (item) {
            console.log(item);
            this.addFrom.companyId = item.companyId;
            this.addFrom.companyName = item.companyName;
            this.companyName = item.companyName;
            this.addFrom.title = item.companyName;
        },
        // 赋值
        assignment (value) {
            this.checkFrom[value] ? this.addFrom[value] = 1 : this.addFrom[value] = 0;
            this.Isshow();
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
            this.addFrom.deviceno = ''; // 税控盘编号
            this.addFrom.appkey = ''; // 百望云APPKEY
            this.checkFrom = {
                onlineInvoice: null,
                specialInvoice: null,
                ordinaryInvoice: null,
                electronicInvoice: null
            };
        },
        // 发票shouhide
        Isshow () {
            if (this.addFrom.onlineInvoice === 1) {
                this.onlineInvoice = true;
            } else {
                this.onlineInvoice = false;
            }
        },
        // 保存
        submit () {
            if (!this.check()) return false;
            this.$http.post(this.$api.invoice.insert, this.addFrom)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('保存成功', '提示', {type: 'success'});
                        this.$router.push({name: 'invoiceList'});
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
                        this.$router.push({name: 'invoiceList'});
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
            if (this.checkFrom.onlineInvoice) {
                if (!this.addFrom.deviceno) {
                    this.$message.error('税控盘编号不能为空');
                    return false;
                }
                console.log(this.checkFrom.specialInvoice || this.checkFrom.ordinaryInvoice || this.checkFrom.electronicInvoice);
                if (!(this.checkFrom.specialInvoice || this.checkFrom.ordinaryInvoice || this.checkFrom.electronicInvoice)) {
                    this.$message.error('开票类型不能为空');
                    return false;
                }
            } else {
                this.addFrom.deviceno = '';
                this.addFrom.specialInvoice = 0;
                this.addFrom.ordinaryInvoice = 0;
                this.addFrom.electronicInvoice = 0;
                this.addFrom.appkey = '';
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.invoiceAdd{
    .title{
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        position: relative;
        i{
            font-weight: 100;
            font-size: 14px;
            position: relative;
            top: -1px;
            margin-right: 8px;
        }
    }
    .chongzhi{
        .l{
            padding-left: 0px;
        }
    }
    .gy-form-group{
        padding: 8px 30px 8px 138px;
        .l{
            position: absolute;
            top: 8px;
            color: $color-title;
            width: 128px;
            padding-left: 30px;
            strong{
                left: 15px;
                top: 10px;
                font-size: 14px;
                color: #E0370F;
            }
        }
        &:after{
            content: "";
            display: block;
            clear: both;
        }
    }
    .onlinekp{
        clear: both;
        padding-top: 50px;
    }
    .footer{
        padding: 22px 30px 0 0;
        float: right;
    }
}
</style>
<style lang="scss">
    .invoiceAdd{
        .onlinekp .el-checkbox__label{
            font-weight: bold;
            color: #333333;
        }
        .onlinekp .el-checkbox__input.is-checked+.el-checkbox__label{
            color: #333333;
            font-weight: bold;
        }
        .gy-form-group .el-checkbox__input.is-checked+.el-checkbox__label{
            color: #666666;
        }
    }
</style>
