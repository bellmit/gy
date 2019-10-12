<template>
    <section class="integral-order f-container">
        <div class="gy-h4">兑换单管理</div>
        <div class="selected gy-search advanced-search">
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
                    <span class="input-limit" @click="getOrders">
                        <i class="iconfont icon-search"></i>
                    </span>
                </label>
                <span class="advanced" @click="advancedShow = !advancedShow">
                    高级搜索 <i class="el-icon-arrow-down"></i>
                </span>
            </div>
        </div>
        <div class="selected-box" v-show="advancedShow">
            <el-row :gutter="40" style="margin-top: 15px;">
                <el-col :span="12">
                    <el-row>
                        <el-col :span="4">交割仓库</el-col>
                        <el-col :span="19">
                            <input type="text" placeholder="请输入" v-model="advancedOption.id">
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="4">收货人手机</el-col>
                        <el-col :span="19">
                            <input type="text" placeholder="请输入" v-model="advancedOption.phone">
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="40" style="margin-top: 15px;">
                <el-col :span="12">
                    <el-row>
                        <el-col :span="4">兑换日期</el-col>
                        <el-col :span="19">
                            <el-date-picker
                                    v-model="advancedOption.date"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="4">收货人</el-col>
                        <el-col :span="19">
                            <input type="text" placeholder="请输入" v-model="advancedOption.username">
                        </el-col>
                        <el-col :span="1"><i class="iconfont icon-search" @click="getOrders" style="margin-left:10px;"></i></el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <el-table
            class="gy-table"
            :data="orderList"
            stripe
            :style="{ marginTop: advancedShow ? '20px' : '10px' }">
            <el-table-column prop="pointNoteCode" label="兑换单号" width="200"></el-table-column>
            <!--<el-table-column prop="receiveName" label="用户" width="100"></el-table-column>-->
            <el-table-column label="兑换品"  width="200">
                <span slot-scope="{row}">
                    {{row.odrPointNoteItemModelList[0].redemptionName}} × {{row.odrPointNoteItemModelList[0].redemptionQuantity}}
                </span>
            </el-table-column>
          <el-table-column label="总价(积分)" width="160">
                <div slot-scope="{row}" class="align-r">
                    {{row.gross}}
                </div>
          </el-table-column>
          <el-table-column label="兑换时间" width="200">
                <span slot-scope="{row}">
                    {{row.createdDate | formatDate('YYYY-MM-DD hh:mm')}}
                </span>
          </el-table-column>
            <el-table-column prop="companyName" label="兑换公司" width="230"></el-table-column>
            <el-table-column prop="userName" label="管理员" width="150"></el-table-column>
            <el-table-column prop="phone" label="管理员手机" width="150"></el-table-column>
            <el-table-column prop="receiveName" label="收货人" width="150"></el-table-column>
            <el-table-column prop="receivePhone" label="收货人手机" width="150"></el-table-column>
            <el-table-column label="兑换单状态" width="120">
                <span slot-scope="{row}">
                    {{row.status | status}}
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
                date: '',
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
                    startTime: this.advancedOption.date ? this.advancedOption.date[0] : '',
                    endTime: this.advancedOption.date ? this.advancedOption.date[1].setTime(this.advancedOption.date[1].getTime() + (24 * 60 * 60 * 1000 - 1)) : ''
                });
            }
            services.integral.getOrders(option).then(result => {
                console.log(result);
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
        .el-input__inner{
            height:30px;
        }
        .el-range-separator, .el-input__icon{
            line-height: 24px;
        }
    }
</style>
