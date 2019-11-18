<template>
    <div class="boat-add">
        <div class="new-title-public">发布船运需求</div>
        <div class="title"><i class="iconfont icon-icon_shenqing"></i>申请信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>适装品种</span>
                <product-search :selected.sync="selectedProduct"></product-search>
            </div>
            <div class="gy-form-group width-new">
                <span class="l"><strong>*</strong>数量</span>
                <input type="text" placeholder="请输入" v-model="data.skuQuantity">
                <span class="searchpositionitem">吨</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>起始港</span>
                <input @click="blur" type="text" class="gy-input" placeholder="请输入" @keyup.enter="getlist1click" v-model="data.loadWrhHarbourName">
                <i class="iconfont icon-mySearch searchposition"  @click="getlist1click"></i>
                <ul class="listulaaa"  v-show="listShow">
                    <li v-for="(item,index) in harbouList" :key="index" @click="getlist1select(item)" v-if="harbouList.length>0">
                        {{item.harbourName}}
                    </li>
                    <li class="none-tips" v-if="harbouList.length === 0">没有搜到相关内容</li>
                </ul>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>目的港</span>
                <input @click="blur01" type="text" class="gy-input" placeholder="请输入" @keyup.enter="getlist1click01" v-model="data.unloadWrhHarbourName">
                <i class="iconfont icon-mySearch searchposition"  @click="getlist1click01"></i>
                <ul class="listulaaa"  v-show="listShow01">
                    <li v-for="(item,index) in harbouList" :key="index" @click="getlist1select01(item)" v-if="harbouList.length>0">
                        {{item.harbourName}}
                    </li>
                    <li class="none-tips" v-if="harbouList.length === 0">没有搜到相关内容</li>
                </ul>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>期望发货日期</span>
                <el-date-picker
                        v-model="data.estimatedLoadingDate"
                        type="date"
                        :picker-options="minDate"
                        placeholder="请选择">
                </el-date-picker>
            </div>
            <div class="gy-form-group form-width-new">
                <span class="l"><strong>*</strong>意向价格</span>
                <input type="text" placeholder="请输入" v-model="intentPrice" @focus="ismianmin = true">
                <span class="search-span">元</span>
                <el-radio-group v-model="ismianmin" @change="change">
                    <el-radio label="面议"></el-radio>
                </el-radio-group>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>联系人</span>
                <input type="text" placeholder="请输入"  v-model="data.contact">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>联系人手机号</span>
                <input type="text" placeholder="请输入"  v-model="data.contactMobile">
            </div>
        </div>
        <div class="gy-form-button">
            <button class="gy-button-extra" @click="submit">提交</button>
        </div>
    </div>
</template>

<script>
import productSearch from '@/components/productSearch';
export default {
    components: {
        productSearch
    },
    data () {
        return {
            minDate: {
                disabledDate (time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            listShow: false, // 起始港口下拉框展示
            listShow01: false, // 目的港口下拉框展示
            harbouList: [], // 港口查询列表
            data: {
                skuName: null, // 适装品种
                skuQuantity: null, // 数量
                loadWrhHarbourName: null, // 起始港
                unloadWrhHarbourName: null, // 目的港
                estimatedLoadingDate: null, // 期望发货日期
                contact: null, // 联系人
                contactMobile: null, // 联系人手机
                intentPrice: null, // 意向价格
                consignorName: null // 公司名
            },
            selectedProduct: {},
            ismianmin: true, // 面议
            intentPrice: null
        };
    },
    created () {
        this.init();
    },
    watch: {
        selectedProduct: function (val) {
            this.data.skuName = val.skuName;
        }
    },
    methods: {
        // 初始化 获取港口
        init (value = null) {
            let list = {
                harbourName: value
            };
            this.$http.post(this.$api.transport.harboursList, list)
                .then(res => {
                    if (res.data.code === 0) {
                        this.harbouList = res.data.data;
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
        // 起始港口 列表获取
        getlist1click () {
            this.listShow = true;
            this.init(this.data.loadWrhHarbourName);
        },
        getlist1select (item) {
            this.listShow = false;
            this.data.loadWrhHarbourName = item.harbourName;
        },
        blur () {
            this.listShow = false;
            this.data.loadWrhHarbourName = null;
        },
        // 目的港口 列表获取
        getlist1click01 () {
            this.listShow01 = true;
            this.init(this.data.unloadWrhHarbourName);
        },
        getlist1select01 (item) {
            this.listShow01 = false;
            this.data.unloadWrhHarbourName = item.harbourName;
        },
        blur01 () {
            this.listShow01 = false;
            this.data.unloadWrhHarbourName = null;
        },
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
                this.data.intentPrice = 0;
            } else {
                this.data.intentPrice = this.intentPrice;
            }
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
            this.data.consignorName = userInfo.companyName;
            this.$http.post(this.$api.transport.enquiryIntentAdd, this.data)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.$router.push({name: 'boatList'});
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
            if (!this.data.skuName) {
                this.$message.error('请选择适装品种');
                return false;
            } else if (!this.data.skuQuantity) {
                this.$message.error('请输入数量');
                return false;
            } else if (!this.data.loadWrhHarbourName) {
                this.$message.error('请选择起始港');
                return false;
            } else if (!this.data.unloadWrhHarbourName) {
                this.$message.error('请选择目的港');
                return false;
            } else if (!this.data.estimatedLoadingDate) {
                this.$message.error('请选择期望发货日期');
                return false;
            } else if (this.ismianmin === true && !this.intentPrice) {
                console.log(this.ismianmin);
                this.$message.error('请输入意向价格');
                return false;
            } else if (!this.data.contact) {
                this.$message.error('请输入联系人');
                return false;
            } else if (!this.$tools.verifyMobile(this.data.contactMobile)) {
                this.$message.error('请输入正确联系人手机号');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.boat-add{
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
