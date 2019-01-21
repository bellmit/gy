<template>
    <section class="integral-order-detail f-container">
        <h3 class="gy-h3">兑换单详情</h3>
        <el-form class="gy-detail-form short clearfix" :model="info" ref="form" label-width="106px">
            <el-form-item class="half" label="兑换单状态" prop="status">
                {{info.status | status}}
            </el-form-item>
            <el-form-item class="half" label="收货人" prop="type">
                {{info.receiveName}}
            </el-form-item>
            <el-form-item class="half" label="兑换单编号" prop="imgs">
                {{info.pointNoteCode}}
            </el-form-item>
            <el-form-item class="half" label="电话号码" prop="name">
                {{info.receivePhone}}
            </el-form-item>
            <el-form-item class="half" label="兑换时间" prop="price">
                {{info.createdDate | formatDate('YYYY-MM-DD hh:mm:ss')}}
            </el-form-item>
            <el-form-item class="half" label="收货地址" prop="count">
                {{info.provinceName}} {{info.cityName}} {{info.districtName}}
            </el-form-item>
        </el-form>
        <div class="gy-tab-list">
            <div :class="['gy-tab-item', { active: item.code === tabCode }]"
                v-for="(item, index) of tabList"
                :key="index"
                @click="tabCode = item.code">
                {{item.name}}
            </div>
        </div>
        <table class="gy-custom-table" v-if="tabCode === 'detail'">
            <tr>
                <th>商品图片</th>
                <th>商品名称</th>
                <th>商品数量</th>
                <th>商品价格</th>
            </tr>
            <tr v-for="(item, index) of (info.odrPointNoteItemModelList || [])" :key="index">
                <td><img class="td-img" :src="item.redemptionFilePath" alt="商品图片" v-if="item.redemptionFilePath"></td>
                <td>{{item.redemptionName}}</td>
                <td>× {{item.redemptionQuantity}}</td>
                <td>{{item.redemptionPrice | toMoney}} 元</td>
            </tr>
        </table>
        <table class="gy-custom-table" v-else>
            <tr>
                <th></th>
                <th>状态</th>
            </tr>
            <tr v-if="!info.logisticsInfo">
                <td>暂无物流信息</td>
                <td>待发货</td>
            </tr>
            <template v-else>
                <tr v-for="(item, index) of info.logisticsInfo.data" :key="index">
                    <td class="tal">{{item.context}}</td>
                    <td>{{item.ftime}}</td>
                </tr>
            </template>
        </table>
        <p class="total-price">总价： {{totalPrice | toMoney}} 元</p>
    </section>
</template>

<script>
import services from '@/services';
const classifyMap = {
    all: {
        name: '全部',
        value: ''
    },
    waiting: {
        name: '待发货',
        count: 0,
        value: 1
    },
    sent: {
        name: '已发货',
        count: 0,
        value: 2
    },
    done: {
        name: '已完成',
        count: 0,
        value: 3
    }
};

export default {
    name: 'order-detail',
    data () {
        return {
            info: {},
            tabCode: 'detail',
            tabList: [
                {
                    code: 'detail',
                    name: '订单详情'
                },
                {
                    code: 'logistics',
                    name: '物流信息'
                }
            ]
        };
    },
    methods: {
        getDetail (id) {
            services.integral.getOrder(id).then(res => {
                this.info = res;
                if (res.logisticsInfo) {
                    this.info.logisticsInfo = JSON.parse(res.logisticsInfo);
                }
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
    computed: {
        totalPrice () {
            const list = this.info.odrPointNoteItemModelList || [];
            if (!list.length) {
                return 0;
            } else if (list.length === 1) {
                return list[0].redemptionPrice * list[0].redemptionQuantity;
            }
            return list.reduce((n, m) => (n.redemptionPrice * n.redemptionQuantity) + (m.redemptionPrice * m.redemptionQuantity));
        }
    },
    filters: {
        status (val) {
            const list = classifyMap;
            let item = {};
            for (const value of Object.values(list)) {
                if (value.value === val) {
                    item = value;
                }
            }
            return item.name;
        }
    },
    mounted () {
        this.getDetail(this.$route.query.i);
    }
};
</script>

<style lang="scss">
    .integral-order-detail {
        .gy-tab-list {
            display: flex;
            width: 100%;
            margin-top: 30px;
        }
        .gy-tab-item {
            padding: 5px 10px;
            border-radius: 5px 5px 0 0;
            font-size: 16px;
            cursor: pointer;
            &.active {
                color: #333;
                border: 1px solid #ddd;
                border-bottom-width: 0;
            }
        }
        .gy-custom-table {
            width: 100%;
            border: 1px solid #ddd;
            border-collapse:collapse;
            th {
                height: 40px;
                background: #d4d4d4;
            }
            td {
                height: 40px;
                text-align: center;
            }
        }
        .td-img {
            width: 75px;
        }
        .gy-custom-table .tal {
            padding-left: 5em;
            text-align: left;
        }
        .total-price {
            padding-right: 88px;
            text-align: right;
            font-size: 16px;
            font-weight: 700;
            color: #333;
        }
    }
</style>
