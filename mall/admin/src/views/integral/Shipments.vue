<template>
    <section class="integral-shipments f-container">
        <h3 class="gy-h3">发货管理</h3>
        <div class="gy-form gy-search advanced-search">
            <ul class="classify"></ul>
            <div class="advanced-wrapper">
                <label class="gy-label">
                    <input v-model="searchStr" type="text" class="gy-input" placeholder="请输入品名" maxlength="30" @keyup.13="getShipments">
                    <span class="input-limit" @click="getShipments">搜索</span>
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
                <el-form-item class="half mr" label="收货人手机">
                    <el-input v-model="advancedOption.phone"></el-input>
                </el-form-item>
                <el-form-item class="half" label="用户名">
                    <el-input v-model="advancedOption.username"></el-input>
                </el-form-item>
                <i class="iconfont icon-search search-button" @click="getShipments"></i>
            </el-form>
        </div>
        <h3 class="gy-h3" :style="{ marginTop: advancedShow ? '48px' : '10px' }">待发货兑换单</h3>
        <el-table
            class="gy-table"
            :data="orderList"
            stripe>
            <el-table-column prop="pointNoteCode" label="编号" width="220"></el-table-column>
            <el-table-column prop="receiveName" label="用户" width="120"></el-table-column>
            <el-table-column label="兑换品">
                <span slot-scope="{row}">
                    {{row.odrPointNoteItemModelList[0].redemptionName}} × {{row.odrPointNoteItemModelList[0].redemptionQuantity}}
                </span>
            </el-table-column>
            <el-table-column prop="receiveName" label="收货人姓名" width="150"></el-table-column>
            <el-table-column prop="receivePhone" label="收货人手机" width="160"></el-table-column>
            <el-table-column label="收件地址" width="240">
                <span slot-scope="{row}">
                    {{row.provinceName}} {{row.cityName}} {{row.districtName}} {{row.address}}
                </span>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="{row}">
                    <span class="gy-button-view" @click="write(row.id)">填写发货单</span>
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

        <!-- 弹框，编辑和新增 -->
        <el-dialog title="兑换单发货" :visible.sync="dialogShow">
            <el-form class="gy-form">
                <el-form-item class="gy-label" label="物流公司">
                    <el-select v-model="sendForm.logistics">
                        <el-option
                            v-for="(item, index) of logistics"
                            :key="index"
                            :value="item.id"
                            :label="item.companyName">
                        </el-option>
                    </el-select>
                    <span class="input-limit" v-show="submited && !sendForm.logistics">请选择一个物流公司</span>
                </el-form-item>
                <el-form-item class="gy-label" label="快递单号">
                    <input type="text" v-model="sendForm.number">
                    <span class="input-limit" v-show="submited && !sendForm.number">内容不能为空</span>
                </el-form-item>
            </el-form>
            <div class="gy-form-button">
                <button class="gy-button-extra" @click="shipments">保存</button>
                <button class="gy-button-normal" @click="dialogShow = false">取消</button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import services from '@/services';

export default {
    name: 'integral-shipments',
    data () {
        return {
            searchStr: '',
            advancedShow: false,
            advancedOption: {
                id: '',
                phone: '',
                username: ''
            },
            orderList: [],
            logistics: [],
            sendForm: {
                logistics: '',
                number: ''
            },
            shipmentId: '',
            pageInfo: {
                total: 5,
                pageSize: 10,
                pageNum: 1
            },
            dialogShow: false,
            submited: false
        };
    },
    methods: {
        getShipments () {
            const option = {
                data: {},
                ...this.pageInfo
            };
            if (this.searchStr) {
                option.keywords = this.searchStr;
            }
            if (this.advancedShow) {
                option.data = {
                    pointNoteCode: this.advancedOption.id,
                    receivePhone: this.advancedOption.phone,
                    receiveName: this.advancedOption.username
                };
            }
            services.integral.getShipments(option).then(result => {
                this.pageInfo = result.page;
                this.orderList = result.order;
            });
        },
        getExpressCompanies () {
            services.integral.getExpressCompanies().then(result => {
                this.logistics = result;
            }).catch(() => {
                this.$message.error('获取快递公司失败');
            });
        },
        shipments () {
            const form = this.sendForm;
            if (Object.keys(form).some(key => form[key] === '')) {
                this.submited = true;
                return;
            }
            services.integral.shipments({
                id: this.shipmentId,
                lgsExpressCompanyId: form.logistics,
                logisticsNumber: form.number
            }).then(() => {
                this.$message.success('发货成功');
                this.getShipments();
                this.dialogShow = this.submited = false;
            }).catch(() => {
                this.$message.error('发货失败');
            });
        },
        write (id) {
            this.shipmentId = id;
            this.dialogShow = true;
        },
        pageChange (pageNum) {
            this.pageInfo.pageNum = pageNum;
            this.getShipments();
        }
    },
    watch: {
        dialogShow (newval) {
            if (!newval) {
                const form = this.sendForm;
                for (const key of Object.keys(form)) {
                    form[key] = '';
                }
            }
        }
    },
    mounted () {
        this.getShipments();
        this.getExpressCompanies();
    }
};
</script>

<style lang="scss">
    .integral-shipments {
        width: 100%;
        .advanced-wrapper{
            input{
                padding-right: 50px;
            }
        }
        .gy-label {
            display: flex;
            .el-form-item__content {
                flex: 1;
            }
        }
        .el-dialog .input-limit {
            color: #E03913 !important;
        }
    }
</style>
