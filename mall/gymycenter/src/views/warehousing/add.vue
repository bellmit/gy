<template>
    <div class="requisition-add">
        <div class="new-title-public">发布仓储需求</div>
        <div class="title"><i class="iconfont icon-icon_shenqing"></i>需求信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>品名</span>
                <product-search :selected.sync="selectedProduct"></product-search>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>数量</span>
                <input class="gy-input" type="text" style="width:90%;" v-model="searchfrom.quantity" placeholder="请输入"> 吨
                </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>计划入库日期</span>
                <div class="date-picker">
                    <el-date-picker
                        v-model="searchfrom.expectEntryDate"
                        type="date"
                        placeholder="请选择">
                    </el-date-picker>
                </div>
            </div>
            <div class="gy-form-group">
            <span class="l"><strong>*</strong>仓储地区</span>
                <el-select v-model="searchfrom.areaCategory">
                <el-option
                        v-for="item in areaCategoryList"
                        :key="item.id"
                        :label="item.areaCategoryName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group form-width-new cl">
                <span class="l"><strong>*</strong>仓储单价</span>
                <input type="text" style="width:50%;" placeholder="请输入" v-model="intentPrice" @focus="ismianmin = true">
                <span class="search-span">元/立方*月</span>
                <el-radio-group v-model="ismianmin" @change="change">
                    <el-radio label="面议"></el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="gy-form-button">
            <button class="gy-button-extra" @click="submit">提交</button>
        </div>
    </div>
</template>

<script>
import productSearch from './productSearch';
export default {
    components: {
        productSearch
    },
    data () {
        return {
            listShow: false, // 起始港口下拉框展示
            listShow01: false, // 目的港口下拉框展示
            harbouList: [], // 港口查询列表
            searchfrom: {
                expectEntryDate: '',
                prdProductId: '',
                quantity: '',
                price: ''
            },
            selectedProduct: {},
            ismianmin: true, // 面议
            intentPrice: null,
            areaCategoryList: [
                {
                    id: 1,
                    areaCategoryName: '东北'
                },
                {
                    id: 2,
                    areaCategoryName: '华北'
                },
                {
                    id: 3,
                    areaCategoryName: '华东'
                },
                {
                    id: 4,
                    areaCategoryName: '华南'
                },
                {
                    id: 5,
                    areaCategoryName: '华中'
                },
                {
                    id: 6,
                    areaCategoryName: '西南'
                }
            ]
        };
    },
    created () {
    },
    watch: {
        selectedProduct: function (val) {
            console.log(val);
            this.searchfrom.prdProductId = val.id;
        }
    },
    methods: {
        change () {
            if (this.ismianmin) {
                this.intentPrice = '';
            }
        },
        // 提交
        submit () {
            if (!this.check()) {
                return;
            }
            if (this.ismianmin !== true) {
                this.searchfrom.price = 0;
            } else {
                this.searchfrom.price = this.intentPrice;
            }
            if (this.searchfrom.areaCategory) {
                console.log(this.searchfrom.areaCategory);
                this.searchfrom.areaCategoryId = this.searchfrom.areaCategory;
                this.areaCategoryList.map((item1) => {
                    if (this.searchfrom.areaCategory === item1.id) {
                        this.searchfrom.areaCategoryName = item1.areaCategoryName;
                    }
                });
            }
            console.log(this.searchfrom);
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
            this.searchfrom.consignorName = userInfo.companyName;
            this.$http.post(this.$api.warehouse.offers, this.searchfrom)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.$router.push({name: 'requisition'});
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        // 验证
        check () {
            if (!this.searchfrom.prdProductId) {
                this.$message.error('请输入品名');
                return false;
            } else if (!this.searchfrom.quantity) {
                this.$message.error('请输入数量');
                return false;
            } else if (!this.searchfrom.expectEntryDate) {
                this.$message.error('请选择计划入库日期');
                return false;
            } else if (!this.searchfrom.areaCategory) {
                this.$message.error('请选择仓储地区');
                return false;
            } else if (this.ismianmin === true && !this.intentPrice) {
                console.log(this.ismianmin);
                this.$message.error('请输入意向价格');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.requisition-add{
    padding-bottom: 30px;
    .title{
        padding:20px 30px 0 30px;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        position: relative;
        i{
            font-size: 14px;
            margin-right: 5px;
            line-height: 14px;
            text-align: center;
            position: absolute;
            top: 26px;
            left: 11px;
            color: #666666;
            font-weight: normal;
        }
    }
    .searchposition{
        position: absolute;
        top: 10px;
        right: 37px;
    }
    .searchpositionitem{
        position: absolute;
        top: 10px;
        right: 30px;
    }
    .listulaaa{
        background-color: #fff;
        width: 65%;
        max-height: 200px;
        overflow: auto;
        position: absolute;
        top: 41px;
        z-index: 9;
        border: 1px solid #e6eaea;
        border-top: none;
        li{
            padding: 5px 10px;
        }
        li:hover{
            cursor: pointer;
            background-color: #f5f7fa;
            color: #4a90e2;
        }
    }
    .width-new{
        input{
            width:93%;
        }
    }
    .form-width-new{
        input{
            width:72%;
        }
        .search-span{
            margin-right: 10px;
        }
    }
}
</style>
