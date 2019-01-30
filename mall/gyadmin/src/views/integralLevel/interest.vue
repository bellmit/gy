<template>
    <section class="risk-control f-container">
        <!--<h3 class="gy-h3">积分风险控制</h3>-->
        <!--<el-form class="gy-detail-form clearfix short" :model="control" ref="controlForm" label-width="128px">-->
            <!--<el-form-item class="half gy-label" label="单笔交易最多获得">-->
                <!--<input type="text" class="gy-input" v-model="control.consumeEverytimeMostGet.value">-->
                <!--<span class="input-unit">消费积分</span>-->
                <!--<span class="input-limit err-color" v-if="control.consumeEverytimeMostGet.status === 'error'">格式错误</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item class="half gy-label" label="单笔交易最多获得">-->
                <!--<input type="text" class="gy-input" v-model="control.upgradeEverytimeMostGet.value">-->
                <!--<span class="input-unit">升级积分</span>-->
                <!--<span class="input-limit err-color" v-if="control.upgradeEverytimeMostGet.status === 'error'">格式错误</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item class="half gy-label" label="每月交易最多获得">-->
                <!--<input type="text" class="gy-input" v-model="control.consumeEverymonthMostGet.value">-->
                <!--<span class="input-unit">消费积分</span>-->
                <!--<span class="input-limit err-color" v-if="control.consumeEverymonthMostGet.status === 'error'">格式错误</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item class="half gy-label" label="每月交易最多获得">-->
                <!--<input type="text" class="gy-input" v-model="control.upgradeEverymonthMostGet.value">-->
                <!--<span class="input-unit">升级积分</span>-->
                <!--<span class="input-limit err-color" v-if="control.upgradeEverymonthMostGet.status === 'error'">格式错误</span>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <h3 class="gy-h3">会员等级权益</h3>
        <el-form class="gy-detail-form clearfix short" :model="speed" ref="speedForm" label-width="106px">
            <el-form-item class="half gy-label" label="普通会员">
                <!--<input type="text" class="gy-input" v-model="speed.commonRatio.value">-->
                <input type="text" class="gy-input" disabled="disabled" value="1">
                <span class="input-unit">倍</span>
                <span class="input-limit err-color short" v-if="speed.commonRatio.status === 'error'">格式错误</span>
            </el-form-item>
            <el-form-item class="half gy-label" label="白银会员">
                <input type="text" class="gy-input" v-model="speed.sliverRatio.value">
                <span class="input-unit">倍</span>
                <span class="input-limit err-color short" v-if="speed.sliverRatio.status === 'error'">格式错误</span>
            </el-form-item>
            <el-form-item class="half gy-label" label="黄金会员">
                <input type="text" class="gy-input" v-model="speed.goldRatio.value">
                <span class="input-unit">倍</span>
                <span class="input-limit err-color short" v-if="speed.goldRatio.status === 'error'">格式错误</span>
            </el-form-item>
            <el-form-item class="half gy-label" label="铂金会员">
                <input type="text" class="gy-input" v-model="speed.platinumRatio.value">
                <span class="input-unit">倍</span>
                <span class="input-limit err-color short" v-if="speed.platinumRatio.status === 'error'">格式错误</span>
            </el-form-item>
            <el-form-item class="half gy-label" label="钻石会员">
                <input type="text" class="gy-input" v-model="speed.diamondRatio.value">
                <span class="input-unit">倍</span>
                <span class="input-limit err-color short" v-if="speed.diamondRatio.status === 'error'">格式错误</span>
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

const genInteger = (option, str, type = 'integer', range = [0]) => {
    const options = {
        verCode: type,
        range: range,
        value: option[str]
    };
    if (type === 'float') {
        options.floatLength = 2;
    }
    return options;
};
const genControl = (option = {}) => {
    return verify({
        upgradeEverytimeMostGet: {
            name: '单笔交易最多获得',
            ...genInteger(option, 'upgradeEverytimeMostGet')
        },
        consumeEverytimeMostGet: {
            name: '单笔交易最多获得',
            ...genInteger(option, 'consumeEverytimeMostGet')
        },
        upgradeEverymonthMostGet: {
            name: '每月交易最多获得',
            ...genInteger(option, 'upgradeEverymonthMostGet')
        },
        consumeEverymonthMostGet: {
            name: '每月交易最多获得',
            ...genInteger(option, 'consumeEverymonthMostGet')
        }
    });
};
const genSpeed = (option = {}) => {
    return verify({
        commonRatio: {
            name: '普通会员',
            ...genInteger(option, 'commonRatio', 'float', [1, 2])
        },
        sliverRatio: {
            name: '白银会员',
            ...genInteger(option, 'sliverRatio', 'float', [1, 2])
        },
        goldRatio: {
            name: '黄金会员',
            ...genInteger(option, 'goldRatio', 'float', [1, 2])
        },
        platinumRatio: {
            name: '铂金会员',
            ...genInteger(option, 'platinumRatio', 'float', [1, 2])
        },
        diamondRatio: {
            name: '白金会员',
            ...genInteger(option, 'diamondRatio', 'float', [1, 2])
        }
    });
};

export default {
    name: 'interest',
    data () {
        return {
            // control: genControl(),
            speed: genSpeed(),
            id: ''
        };
    },
    methods: {
        getRisk () {
            services.integralLevel.getRisk().then(result => {
                this.control = genControl(result);
                this.speed = genSpeed(result);
                this.id = result.id;
            }).catch(() => {
                this.$message.error('获取风险控制失败');
            });
        },
        submit () {
            const option = { id: this.id };
            // const control = this.control;
            const speed = this.speed;
            // for (const key of Object.keys(control)) {
            //     control[key].verification();
            //     if (control[key].status !== 'error') {
            //         option[key] = +control[key].value;
            //     } else {
            //         this.$message.error('数据设置有误');
            //         return;
            //     }
            // }
            for (const key of Object.keys(speed)) {
                speed[key].verification();
                if (speed[key].status !== 'error') {
                    option[key] = +speed[key].value;
                } else {
                    this.$message.error('数据设置有误');
                    return;
                }
            }
            option.commonRatio = 1;
            services.integralLevel.setRisk(option).then(result => {
                this.$message.success('修改成功');
            }).catch(() => {
                this.$message.error('修改失败');
            });
        },
        cancel () {
        }
    },
    mounted () {
        this.getRisk();
    }
};
</script>
