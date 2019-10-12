<template>
    <section class="edit-get-integral f-container">
        <div class="gy-h4">积分获取编辑</div>
        <el-form class="gy-detail-form" :model="info" ref="form" label-width="106px">
            <el-form-item label="商品类目" prop="type">
                {{info.categoryName}}
            </el-form-item>
            <!--<el-form-item class="half gy-label" label="获得升级积分">-->
                <!--<input type="text" class="gy-input" v-model="info.upgradePoints.value">-->
                <!--<span class="input-limit err-color" v-if="info.upgradePoints.status === 'error'">格式错误</span>-->
            <!--</el-form-item>-->
            <el-form-item class="half" label="获得积分">
                <input type="text" class="gy-input" v-model="info.consumptionPoints.value">
                <span class="input-limit err-color" v-if="info.consumptionPoints.status === 'error'">格式错误</span>
            </el-form-item>
        </el-form>
        <div class="gy-form-button submit-btn-group">
            <button class="gy-button-extra" @click="submit">保存</button>
            <button class="gy-button-normal" @click="cancel">取消</button>
        </div>
    </section>
</template>

<script>
import services from '@/services/';
import verify from '@/utils/verify.js';

const gen = (option = {}) => {
    const info = {
        consumptionPoints: {
            verCode: 'integer',
            notRequired: true,
            range: [0],
            value: option.consumptionPoints
        }
        // upgradePoints: {
        //     verCode: 'integer',
        //     notRequired: true,
        //     range: [0],
        //     value: option.upgradePoints
        // }
    };
    return verify(info);
};

export default {
    name: 'edit-get-integral',
    data () {
        return {
            id: this.$route.query.i,
            info: gen(),
            original: {}
        };
    },
    methods: {
        getIntegralWay (i) {
            services.integralLevel.getIntegralWay(i || this.id).then(result => {
                this.info = gen(result);
                this.original = result || { moduleId: this.id };
            }).catch(() => {
                this.$message.error('获取积分途径失败');
            });
        },
        submit () {
            const option = {};
            for (const key of Object.keys(this.info)) {
                const obj = this.info[key];
                obj.verification();
                if (obj.status !== 'error') {
                    option[key] = obj.value;
                } else {
                    this.$message.warning('设置参数有误');
                    return;
                }
            }
            services.integralLevel.setIntegralWay(Object.assign({}, this.original, option)).then(result => {
                this.$message.success('编辑成功');
                this.getIntegralWay();
            }).catch(() => {
                this.$message.error('编辑失败');
            });
        },
        cancel () {
            this.$router.go(-1);
        }
    },
    mounted () {
        this.getIntegralWay();
    }
};
</script>

<style lang="scss" scoped>
    .edit-get-integral {
        .submit-btn-group {
            margin-top: 60px;
        }
        .gy-form-button{
            padding-right:0;
        }
        .gy-detail-form{
            margin-top:0;
            .el-form-item{
                padding-left: 14px;
                padding-right: 0;
                margin: 0;
                width: 50%;
            }
        }
    }
</style>
