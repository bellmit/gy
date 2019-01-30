<template>
    <section class="integral-order f-container">
        <h3 class="gy-h3">兑换单管理</h3>
        <div class="gy-form gy-search advanced-search">
            <ul class="classify">
                <li
                    v-for="(item, key) of classifyList"
                    :class="['classify-item', { active: key === classifyType }]"
                    :key="key"
                    @click="classifyType = key">
                    {{item.name}}
                    <template v-if="key !== 'all'">({{item.count}})</template>
                </li>
            </ul>
            <div class="advanced-wrapper">
                <label class="gy-label">
                    <input v-model="searchStr" type="text" class="gy-input" placeholder="请输入品名/兑换单号" maxlength="30" @keyup.13="getOrders">
                    <span class="input-limit" @click="getOrders">搜索</span>
                </label>
                <span class="advanced" @click="advancedShow = !advancedShow">
                    高级搜索 <i class="el-icon-arrow-down"></i>
                </span>
            </div>
        </div>
        <div class="advanced-box" v-show="advancedShow">
            <el-form class="gy-detail-form short" label-width="106px">
                <el-form-item class="half" label="兑换单号">
                    <el-input v-model="advancedOption.id"></el-input>
                </el-form-item>
                <el-form-item class="half" label="收货人手机">
                    <el-input v-model="advancedOption.phone"></el-input>
                </el-form-item>
                <el-form-item class="half" label="兑换日期">
                    <el-date-picker
                        v-model="advancedOption.date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="half" label="收货人">
                    <el-input v-model="advancedOption.username"></el-input>
                </el-form-item>
                <i class="iconfont icon-search search-button" @click="getOrders"></i>
            </el-form>
        </div>

        <el-table
            class="gy-table"
            :data="orderList"
            stripe
            :style="{ marginTop: advancedShow ? '48px' : '10px' }">
            <el-table-column prop="pointNoteCode" label="编号" width="200"></el-table-column>
            <el-table-column prop="receiveName" label="用户" width="120"></el-table-column>
            <el-table-column label="兑换品">
                <span slot-scope="{row}">
                    {{row.odrPointNoteItemModelList[0].redemptionName}} × {{row.odrPointNoteItemModelList[0].redemptionQuantity}}
                </span>
            </el-table-column>
            <el-table-column prop="receivePhone" label="收货人手机" width="150"></el-table-column>
            <el-table-column label="兑换单状态" width="120">
                <span slot-scope="{row}">
                    {{row.status | status}}
                </span>
            </el-table-column>
            <el-table-column label="兑换时间" width="180">
                <span slot-scope="{row}">
                    {{row.createdDate | formatDate('YYYY-MM-DD hh:mm')}}
                </span>
            </el-table-column>
            <el-table-column label="总价" width="140">
                <span slot-scope="{row}">
                    {{row.gross}} 积分
                </span>
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="{row}">
                    <span class="gy-button-view" @click="$router.push(`/index/integral/orderDetail?i=${row.id}`)">查看</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            :current-page="pageInfo.pageNum"
            :page-size="pageInfo.pageSize"
            layout="prev, pager, next"
            :total="pageInfo.total"
            @current-change="pageChange">
        </el-pagination>
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
    name: 'integral-order',
    data () {
        return {
            classifyList: classifyMap,
            classifyType: 'all',
            searchStr: '',
            advancedShow: false,
            advancedOption: {
                id: '',
                phone: '',
                date: [],
                username: ''
            },
            orderList: [],
            pageInfo: {
                total: 5,
                pageSize: 10,
                pageNum: 1
            }
        };
    },
    methods: {
        getOrders () {
            const option = {
                data: { status: this.classifyList[this.classifyType].value },
                ...this.pageInfo
            };
            if (this.searchStr) {
                option.keywords = this.searchStr;
            }
            if (this.advancedShow) {
                Object.assign(option.data, {
                    pointNoteCode: this.advancedOption.id,
                    receivePhone: this.advancedOption.phone,
                    receiveName: this.advancedOption.username,
                    startTime: this.advancedOption.date[0],
                    endTime: this.advancedOption.date[1].setTime(this.advancedOption.date[1].getTime() + (24 * 60 * 60 * 1000 - 1))
                });
            }
            services.integral.getOrders(option).then(result => {
                this.pageInfo = result.page;
                this.orderList = result.order;
            });
            services.integral.getOrderStatus(option).then(result => {
                const list = this.classifyList;
                for (const key of Object.keys(list)) {
                    if (list[key]) {
                        list[key].count = result[key] || 0;
                    }
                }
            });
        },
        pageChange (pageNum) {
            this.pageInfo.pageNum = pageNum;
            this.getOrders();
        }
    },
    watch: {
        classifyType () {
            this.getOrders();
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
        this.getOrders();
    }
};
</script>

<style lang="scss">
    .integral-order {
        width: 100%;
        .el-range-separator {
            width: 25px;
        }
        .gy-table td,
        .gy-table th {
            padding-left: 12px;
            padding-right: 12px;
        }
        .advanced-wrapper{
            input{
                padding-right: 50px;
            }
        }
    }
</style>
