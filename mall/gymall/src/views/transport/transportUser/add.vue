<template>
    <div class="transport-wrap order">
        <h2>{{this.getModel.data.id ? '编辑运输人员': '新增运输人员'}}</h2>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">姓名</span>
                <input type="text" v-model="findData.username">
            </div>
            <div class="gy-form-group">
                <span class="l">人员类型</span>
                <el-select v-model="findData.personnelType" placeholder="请选择类型">
                    <el-option
                        v-for="item in personnelTypeState"
                        :key="item.initKeys"
                        :label="item.initValues"
                        :value="item.initKeys">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group cl">
                <span class="l">性别</span>
                <label><input type="radio" v-model="findData.sex" name="sex" value="1">男</label>
                <label><input type="radio" v-model="findData.sex" name="sex" value="0">女</label>
            </div>
            <div class="gy-form-group">
                <span class="l">手机号</span>
                <input type="text" v-model="findData.phone">
            </div>
            <div class="gy-form-group">
                <span class="l">身份证号</span>
                <input type="text" v-model="findData.identityCode">
            </div>
            <div class="gy-form-group">
                <span class="l">从业资格证号</span>
                <input type="text" v-model="findData.qualificationCode">
            </div>
            <div class="gy-form-group">
                <span class="l">初次领证日期</span>
                <el-date-picker
                    v-model="findData.receiveDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>

            </div>
            <div class="gy-form-group">
                <span class="l">证件有效期</span>
                <el-date-picker
                    v-model="findData.validDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="gy-form-group cl">
                <span class="l">准驾车型</span>
                <input type="text" v-model="findData.vehicleModel" placeholder="请填写准驾车型">
            </div>
            <div class="gy-form-group">
                <span class="l">状态</span>
                <el-select v-model="findData.valid" placeholder="请选择状态">
                    <el-option
                        v-for="item in validState"
                        :key="item.initKeys"
                        :label="item.initValues"
                        :value="item.initKeys">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="gy-form-button" style="padding-bottom: 20px;">
            <button class="gy-button-extra" @click="submitData">提交</button>
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
                    id: this.$route.params.id
                }
            },
            findData: {
                id: null,
                username: null, // 姓名
                sex: null, // 性别
                vehicleModel: null, // 准驾车型
                qualificationCode: null, // 从业资格证号
                identityCode: null, // 身份证号
                phone: null, // 手机号
                valid: null, // 是否启用
                receiveDate: null, // 初次领证时间
                validDate: null, // 证件有效期
                personnelType: null// 人员类型
            },
            validState: [
                {initKeys: 1, initValues: '已启用'},
                {initKeys: 0, initValues: '未启用'}
            ],
            personnelTypeState: [
                {initKeys: 1, initValues: '驾驶人'},
                {initKeys: 2, initValues: '押运人'}
            ]
        };
    },
    created () {
        this.getModel.data.id && this.initInfo(); // 基础信息
        console.log(this.getModel.data.id);
    },
    methods: {
        submitData () {
            console.log(this.getModel.data.id);
            if (this.getModel.data.id) {
                console.log('编辑');
                this.findData.id = this.getModel.data.id;
                this.$http.put(this.$api.transport.transportUser, this.findData)
                    .then(res => {
                        this.statusCount = res.data.data;
                        console.log('修改返回：' + res);
                    });
            } else {
                console.log('新增');
                this.$http.post(this.$api.transport.transportUser, this.findData)
                    .then(res => {
                        this.statusCount = res.data.data;
                        console.log('新增返回：' + res);
                    });
            }
        },
        initInfo () {
            console.log(this.getModel);
            this.$http.post(this.$api.transport.transportUserList, this.getModel)
                .then(res => {
                    this.findData = res.data.data.list[0];
                    console.log(res);
                    console.log('初始化返回：' + this.findData);
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
        }

    }
};
</script>
