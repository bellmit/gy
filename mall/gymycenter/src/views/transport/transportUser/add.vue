<template>
    <div class="transport-wrap order">
        <h2>{{this.getModel.data.id ? '司机/押运员管理': '司机/押运员管理'}}</h2>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>姓名</span>
                <input type="text" v-model="findData.username">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>人员类型</span>
                <el-select v-model="findData.personnelType" placeholder="请选择类型">
                    <el-option
                        v-for="item in personnelTypeItems"
                        :key="item.initKeys"
                        :label="item.initValues"
                        :value="item.initKeys">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group cl">
                <span class="l"><strong>*</strong>性别</span>
                <label><input type="radio" v-model="findData.sex" name="sex" value="1">男</label>
                <label><input type="radio" v-model="findData.sex" name="sex" value="0">女</label>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>手机号</span>
                <input type="text" v-model="findData.phone">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>身份证号</span>
                <input type="text" v-model="findData.identityCode">
            </div>
            <div class="gy-form-group">
                <span class="l">从业资格证号</span>
                <input type="text" v-model="findData.qualificationCode">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>初次领证日期</span>
                <el-date-picker
                    v-model="findData.receiveDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>

            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>证件有效期</span>
                <el-date-picker
                    v-model="findData.validDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="gy-form-group cl">
                <span class="l">准驾车型</span>
                <el-select v-model="findData.vehicleModel" placeholder="请填写准驾车型">
                    <el-option
                        v-for="item in vehicleModelItems"
                        :key="item.initKeys"
                        :label="item.initValues"
                        :value="item.initKeys">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">状态</span>
                <el-select v-model="findData.valid" placeholder="请选择状态">
                    <el-option
                        v-for="item in validStateItems"
                        :key="item.initKeys"
                        :label="item.initValues"
                        :value="item.initKeys">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="gy-form-button" style="padding-bottom: 20px;">
            <button class="gy-button-extra" @click="submitData">提交</button>
            <button class="gy-button-normal" type="reset" @click="backToList">返回</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'add',
    data () {
        return {
            getModel: {
                pageNum: null,
                pageSize: null,
                data: {
                    id: this.$route.query.id
                }
            },
            findData: {
                id: null,
                username: null, // 姓名
                sex: 1, // 性别
                vehicleModel: null, // 准驾车型
                qualificationCode: null, // 从业资格证号
                identityCode: null, // 身份证号
                phone: null, // 手机号
                valid: 1, // 是否启用
                receiveDate: null, // 初次领证时间
                validDate: null, // 证件有效期
                personnelType: null// 人员类型
            },
            validStateItems: [
                {initKeys: 1, initValues: '已启用'},
                {initKeys: 0, initValues: '未启用'}
            ],
            personnelTypeItems: [
                {initKeys: 1, initValues: '驾驶人'},
                {initKeys: 2, initValues: '押运人'}
            ],
            vehicleModelItems: [
                {initKeys: 'A1', initValues: 'A1'},
                {initKeys: 'A2', initValues: 'A2'},
                {initKeys: 'A3', initValues: 'A3'},
                {initKeys: 'B1', initValues: 'B1'},
                {initKeys: 'B2', initValues: 'B2'},
                {initKeys: '其他', initValues: '其他'}
            ]
        };
    },
    created () {
        this.getModel.data.id && this.initInfo(); // 基础信息
        console.log(this.getModel.data.id);
    },
    methods: {
        submitData () {
            let that = this;
            if (!this.findData.username) {
                this.$message.error('请填写姓名');
                return;
            }
            if (this.findData.sex === '' || this.findData.sex === null || this.findData.sex === 'undefined') {
                this.$message.error('请选择性别');
                return;
            }
            if (!this.findData.personnelType) {
                this.$message.error('请选择人员类型');
                return;
            }
            if (!this.$tools.verifyMobile(this.findData.phone)) {
                this.$message.error('请填写正确手机号');
                return;
            }
            if (!this.$tools.verifyIdCard(this.findData.identityCode)) {
                this.$message.error('请填写正确身份证号');
                return;
            }
            if (!this.findData.receiveDate) {
                this.$message.error('请填写初次领证日期');
                return;
            }
            if (!this.findData.validDate) {
                this.$message.error('请填写证件有效期');
                return;
            }
            if (this.getModel.data.id) {
                this.findData.id = this.getModel.data.id;
                this.$http.put(this.$api.transport.transportUser, this.findData)
                    .then(res => {
                        console.log('修改返回：');
                        console.log(res);
                        if (res.data.code === 0) {
                            that.$alert('修改成功！', '提示', {type: 'success'}).then(function () {
                                that.$router.push({name: 'transportUser'});
                            });
                        } else {
                            that.$alert(res.data.message, '提示', {type: 'error'});
                        }
                    });
            } else {
                console.log('新增');
                this.$http.post(this.$api.transport.transportUser, this.findData)
                    .then(res => {
                        this.statusCount = res.data.data;
                        console.log('新增返回：');
                        console.log(res);
                        if (res.data.code === 0) {
                            that.$alert('新增成功！', '提示', {type: 'success'}).then(function () {
                                that.$router.push({name: 'transportUser'});
                            });
                            this.backToList();
                        } else {
                            that.$alert(res.data.message, '提示', {type: 'error'});
                        }
                    });
            }
        },
        initInfo () {
            console.log(this.getModel);
            this.$http.post(this.$api.transport.transportUserList, this.getModel)
                .then(res => {
                    this.findData = res.data.data.list[0];
                    console.log(res);
                    console.log('初始化返回：');
                    console.log(this.findData);
                });
        },
        explainPersonnelType (personnelType) {
            if (personnelType === 1) {
                return '驾驶人';
            } else if (personnelType === 2) {
                return '押运人';
            } else {
                return '未知';
            }
        },
        explainValidType (validType) {
            if (validType === 0) {
                return '已禁用';
            } else if (validType === 1) {
                return '已启用';
            } else {
                return '未知';
            }
        },
        backToList () {
            this.$router.push({name: 'transportUser'});
        }

    }
};
</script>
