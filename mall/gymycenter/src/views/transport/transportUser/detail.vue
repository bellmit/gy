<template>
    <div class="transport-wrap order">
        <h2>司机详情</h2>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">姓名</span>
                <span class="2" v-if="Model!=null">{{Model.username}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">人员类型</span>
                <span class="2" v-if="Model!=null" v-text="explainPersonnelType(Model.personnelType)"></span>
            </div>
            <div class="gy-form-group cl">
                <span class="l">性别</span>
                <label v-if="Model!=null" v-text="explainSexType(Model.sex)"></label>
            </div>
            <div class="gy-form-group">
                <span class="l">手机号</span>
                <span class="2" v-if="Model!=null">{{Model.phone}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">身份证号</span>
                <span class="2" v-if="Model!=null">{{Model.identityCode}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">从业资格证号</span>
                <span class="2" v-if="Model!=null">{{Model.qualificationCode}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">初次领证日期</span>
                <span class="2" v-if="Model!=null">{{Model.receiveDate | date}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">证件有效期</span>
                <span class="2" v-if="Model!=null">{{Model.validDate | date}}</span>
            </div>
            <div class="gy-form-group cl">
                <span class="l">准驾车型</span>
                <span class="2" v-if="Model!=null">{{Model.vehicleModel}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">状态</span>
                <span class="2" v-if="Model!=null" v-text="explainValidType(Model.valid)"></span>
            </div>
        </div>
        <div class="gy-form-button" style="padding-bottom: 20px;">
            <button class="gy-button-normal" type="reset" @click="backToList">取消</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detail',
    data () {
        return {
            getModel: {
                pageNum: null,
                pageSize: null,
                data: {
                    id: this.$route.query.id
                }
            },
            Model: null,
            validState: [
                {initKeys: '1', initValues: '已启用'},
                {initKeys: '0', initValues: '未启用'}
            ],
            personnelTypeState: [
                {initKeys: '1', initValues: '驾驶人'},
                {initKeys: '2', initValues: '押运人'}
            ]
        };
    },
    created () {
        this.initData();
    },
    methods: {
        initData () {
            // alert(this.getModel.id);
            this.$http.post(this.$api.transport.transportUserList, this.getModel)
                .then(res => {
                    this.Model = res.data.data.list[0];
                    console.log(res);
                    console.log(this.Model);
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
        explainSexType (sexType) {
            if (sexType === 0) {
                return '女';
            } else if (sexType === 1) {
                return '男';
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
