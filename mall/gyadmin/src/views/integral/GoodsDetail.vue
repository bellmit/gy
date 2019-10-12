<template>
    <section class="integral-goods-detail f-container">
        <h3 class="gy-h3">兑换品详情</h3>
        <el-form class="gy-detail-form" :model="info" ref="form" label-width="106px">
            <el-form-item class="half" label="商品类目" prop="categoryName">
                {{info.categoryName}}
            </el-form-item>
            <el-form-item class="half" label="兑换状态" prop="status">
                {{info.status | status}}
            </el-form-item>
            <el-form-item class="half" label="商品信息" prop="redemptionPrice">
                <img class="detail-img" :src="info.filePath" v-if="info.filePath">
            </el-form-item>
            <el-form-item class="half" label="商品名称" prop="redemptionName">
                {{info.redemptionName}}
            </el-form-item>
            <el-form-item class="half gy-label" label="商品所需积分" prop="redemptionPrice">
                {{info.redemptionPrice}}
            </el-form-item>
            <el-form-item class="half" label="商品库存" prop="inventory">
                {{info.inventory}} 件
            </el-form-item>
            <el-form-item label="商品描述" prop="description">
                <div class="goods-description" v-html="info.description"></div>
            </el-form-item>
        </el-form>
        <div class="gy-form-button">
            <button class="gy-button-extra" @click="$router.push(`/index/integral/addGoods?i=${$route.query.i}`)">
                编辑兑换品
            </button>
            <button class="gy-button-normal" @click="del">删除兑换品</button>
        </div>
    </section>
</template>

<script>
import goodsConst from './const';
import services from '@/services';

export default {
    name: 'integral-goods-detail',
    data () {
        return {
            info: {}
        };
    },
    methods: {
        getDetail (id) {
            services.integral.getGoodsDetail(id).then(res => {
                this.info = res;
            }).catch(err => {
                console.log(err);
            });
        },
        del () {
            this.$confirm('确定删除该兑换品吗？', '提示', {
                type: 'warning'
            }).then(() => {
                services.integral.editGoods({
                    id: this.$route.query.i,
                    valid: 0
                }).then(result => {
                    this.$message.success(`删除成功`);
                    this.$router.replace('/index/integral/goods');
                }).catch(() => {
                    this.$message.error(`删除失败`);
                });
            }).catch(() => {
                console.log('想想还是算了吧');
            });
        }
    },
    filters: {
        status (val) {
            return goodsConst.statuses[val];
        }
    },
    mounted () {
        this.getDetail(this.$route.query.i);
    }
};
</script>
