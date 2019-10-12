<template>
    <section class="integral-goods f-container">
        <div class="gy-h4">兑换品管理</div>
        <div class="selected gy-search advanced-search">
            <ul class="classify">
                <li
                    v-for="(item, key) of classifyList"
                    :class="['classify-item', { active: key === classifyType }]"
                    :key="key"
                    @click="classifyType = key">
                    {{item.name}}
                    <template v-if="key !== 'all'">({{item.number}})</template>
                </li>
            </ul>
            <label class="gy-label">
                <input v-model="searchStr" type="text" class="gy-input" placeholder="请输入品名" maxlength="30" @keydown.13="getGoods">
                <span class="input-limit" @click="getGoods">
                    <i class="iconfont icon-search"></i>
                </span>
            </label>
        </div>
        <div class="gy-form-button">
            <button class="gy-button-extra" @click="$router.push(`/index/integral/addGoods`)">新增</button>
            <button class="gy-button-normal" @click="editDel('edit')">编辑</button>
            <button class="gy-button-normal" @click="editDel">删除</button>
        </div>
        <el-table
            class="gy-table"
            :data="goodsList"
            stripe
            ref="categoryTable">
            <el-table-column type="selection" width="80"></el-table-column>
            <el-table-column prop="redemptionCode" label="编号" width="130"></el-table-column>
            <el-table-column prop="name" label="信息" show-overflow-tooltip>
                <span slot-scope="{row}">
                    <img class="td-img" :src="row.filePath" alt="商品图片" v-if="row.filePath"> {{row.redemptionName}}
                </span>
            </el-table-column>
            <el-table-column label="价格" width="150">
                <span slot-scope="{row}">{{row.redemptionPrice}} 积分</span>
            </el-table-column>
            <el-table-column prop="categoryName" label="类目" width="150"></el-table-column>
            <el-table-column prop="inventory" label="库存" width="120"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="{row}">
                    <div class="centerItem">
                        <span class="gy-button-view" @click="$router.push(`/index/integral/goodsDetail?i=${row.id}`)">查看</span>
                        <!-- <span class="gy-button-view" @click="$router.push(`/index/integral/addGoods?i=${row.id}`)">编辑</span> -->
                        <span class="gy-button-view" v-if="row.status" @click="editGoods({ id: row.id, status: 0,redemptionName: row.redemptionName}, '下架')">下架</span>
                        <span class="gy-button-view" v-else @click="editGoods({ id: row.id, status: 1 ,redemptionName: row.redemptionName}, '上架')">上架</span>
                        <!-- <span class="gy-button-view" @click="editGoods({ id: row.id, valid: 0 }, '删除')">删除</span> -->
                    </div>
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
import goodsConst from './const';
import services from '@/services';

export default {
    name: 'integral-goods',
    data () {
        return {
            searchStr: '',
            classifyList: {
                all: {
                    name: '全部',
                    value: ''
                },
                on: {
                    name: '上架',
                    number: 0,
                    value: 1
                },
                off: {
                    name: '下架',
                    number: 0,
                    value: 0
                }
            },
            classifyType: 'all',
            goodsList: [],
            pageInfo: {
                total: 5,
                pageSize: 10,
                pageNum: 1
            }
        };
    },
    methods: {
        getGoods () {
            services.integral.getGoods({
                name: this.searchStr,
                status: this.classifyList[this.classifyType].value,
                ...this.pageInfo
            }).then(result => {
                this.goodsList = result.list;
                this.pageInfo = result.page;
            });
            services.integral.getGoodsStatus({
                name: this.searchStr,
                status: this.classifyList[this.classifyType].value
            }).then(result => {
                this.classifyList.on.number = result.onShelve;
                this.classifyList.off.number = result.offShelve;
            }).catch(() => {
                this.$message.error(`获取商品状态统计失败`);
            });
        },
        edltGoods (params, str) {
            services.integral.delGoods(params).then(result => {
                this.$message.success(`${str}成功`);
                this.getGoods();
            }).catch(() => {
                this.$message.error(`${str}失败`);
            });
        },
        editGoods (params, str) {
            if (params.status === 0) {
                services.integral.lowerGoods(params).then(result => {
                    this.$message.success(`${str}成功`);
                    this.getGoods();
                }).catch(() => {
                    this.$message.error(`${str}失败`);
                });
            } else {
                services.integral.upGoods(params).then(result => {
                    this.$message.success(`${str}成功`);
                    this.getGoods();
                }).catch(() => {
                    this.$message.error(`${str}失败`);
                });
            }
        },
        async editDel (type) {
            if (!this.selection.length) {
                this.$alert('请选择兑换品');
            } else if (this.selection.length > 1) {
                this.$alert('不能选择多项');
            } else if (type === 'edit') {
                this.$router.push(`/index/integral/addGoods?i=${this.selection[0].id}`);
            } else {
                await this.$confirm('确定删除所选兑换品');
                this.edltGoods({ id: this.selection[0].id, valid: 0 }, '删除');
            }
        },
        pageChange (pageNum) {
            this.pageInfo.pageNum = pageNum;
            this.getGoods();
        }
    },
    computed: {
        selection () {
            return this.$refs.categoryTable.selection;
        }
    },
    watch: {
        classifyType () {
            this.getGoods();
        }
    },
    filters: {
        type (val) {
            return goodsConst.types[val];
        },
        status (val) {
            return goodsConst.statuses[val];
        }
    },
    mounted () {
        this.getGoods();
    }
};
</script>

<style lang="scss">
    .integral-goods {
        .advanced-search {
            input {
                padding-right: 50px;
            }
        }
        .gy-form-button {
            padding-right: 0;
        }
        .td-img {
            width: 30px;
        }
        .centerItem{
            width:100%;
            text-align: center;
        }
    }
</style>
