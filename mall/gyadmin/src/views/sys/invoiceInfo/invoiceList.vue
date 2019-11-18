<template>
    <div class="invoiceList">
        <div class="right">
            <div class="search-box">
                <input type="text" style="width: 190px" v-model="searchFrom.data.keywords" placeholder="请输入公司名称、ID">
                <i class="iconfont icon-search" @click="getInvoiceList"></i>
            </div>
            <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i class="iconfont" :class="{'icon-arrow-down': !toggleSelect, 'icon-arrow-up': toggleSelect}"></i></span>
        </div>
        <div v-if="toggleSelect">
        <div class="gy-form-group cl">
            <span class="l">公司ID</span>
            <input type="text" v-model="searchFrom.data.companyId" placeholder="请输入公司ID">
        </div>
        <div class="gy-form-group">
            <span class="l">公司名称</span>
            <input type="text" v-model="searchFrom.data.companyName" placeholder="请输入公司名称">
        </div>
        <div class="gy-form-group">
            <span class="l">更新时间</span>
            <div class="date-picker">
                <el-date-picker
                    v-model="searchFrom.data.updatedDateStart"
                    type="date"
                    style="width: 48%;"
                    placeholder="开始日期"
                    >
                </el-date-picker>
                <span>  至  </span>
                <el-date-picker
                    v-model="searchFrom.data.updatedDateEnd"
                    type="date"
                    style="width: 48%;"
                    placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>
        <div class="gy-form-group">
            <span class="l">已开通类型</span>
            <el-select v-model="invoiceType" placeholder="请选择">
                <el-option :label="0" value="全部"></el-option>
                <el-option
                  v-for="item in invoiceTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
             <span class="search" @click="getInvoiceList"><i class="iconfont icon-search"></i></span>
        </div>
        </div>
        <div class="table-box cl">
            <div class="btn-box"><button class="gy-button-extra" @click="addInvoice">添加</button></div>
            <table class="gy-table">
                <thead>
                    <th>公司ID</th>
                    <th>公司名称</th>
                    <th>发票抬头</th>
                    <th>增值税普通纸质发票开具</th>
                    <th>增值税普通电子发票开具</th>
                    <th>增值税专用发票开具</th>
                    <th>更新时间</th>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in invoiceList" :key="index">
                        <td>{{item.companyId}}</td>
                        <td>{{item.companyName}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.ordinaryInvoice === 1 ? '已开通':'未开通'}}</td>
                        <td>{{item.electronicInvoice === 1 ? '已开通':'未开通'}}</td>
                        <td>{{item.specialInvoice === 1 ? '已开通':'未开通'}}</td>
                        <td>{{item.updatedDate|date(true)}}</td>
                        <td><button type="button" @click="look(item.companyId)" class="gy-button-view">查看</button></td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination-wrapper">
                <div class="pagination-total">共 {{total}} 条</div>
                <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="searchFrom.pageNum"
                :total='total'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'invoiceList',
    data () {
        return {
            toggleSelect: false,
            total: null,
            invoiceTypeList: [
                {value: 'ordinaryInvoice', label: '增值税普通纸质发票开具'},
                {value: 'electronicInvoice', label: '增值税普通电子发票开具'},
                {value: 'specialInvoice', label: '增值税专用发票开具'}
            ],
            invoiceType: null,
            searchFrom: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    companyId: null, // 公司id
                    companyName: null, // 公司名称
                    title: null, // 发票title
                    keywords: null, // 模糊搜索公司名称，公司id
                    updatedDateStart: null, // 更新时间开始
                    updatedDateEnd: null, // 更新时间结束
                    specialInvoice: null, // 是否可开增值税专用发票0:否1：是
                    ordinaryInvoice: null, // 是否可开增值税普通发票（纸质）0：否1：是
                    electronicInvoice: null // 是否可开增值税电子发票0：否1：是
                }
            },
            invoiceList: []
        };
    },
    mounted () {
        this.getInvoiceList();
    },
    methods: {
        // 获取列表
        getInvoiceList () {
            let that = this;
            console.log(that.invoiceType);
            if (that.invoiceType) {
                that.invoiceTypeList.map(function (item) {
                    console.log(item.value);
                    if (item.value === that.invoiceType) {
                        that.searchFrom.data[that.invoiceType] = 1;
                    } else {
                        that.searchFrom.data[item.value] = null;
                    }
                });
            }
            that.$http.post(that.$api.invoice.invoiceList, that.searchFrom)
                .then(res => {
                    console.log(res.data.data);
                    that.invoiceList = res.data.data.list;
                    this.total = res.data.data.total;
                });
        },
        // 翻页
        handleCurrentChange (e) {
            this.searchFrom.pageNum = e;
            this.getInvoiceList();
        },
        // 添加
        addInvoice () {
            this.$router.push({name: 'invoiceAdd'});
        },
        look (companyId) {
            console.log(companyId);
            this.$router.push({name: 'invoiceAdd', query: {companyId: companyId}});
        }
    }
};
</script>

<style lang="scss" scoped>
.invoiceList{
    .right{
        float: right;
        padding: 10px 30px 22px 0;
        .search-btn{
            cursor: pointer;
        }
    }
    .search-box {
      display: inline-block;
      width: 200px;
      font-size: 14px;
      position: relative;
      i{
          position: absolute;
          right: 10px;
      }
    }
    .gy-form-group{
        padding: 8px 30px 8px 138px;
        .l{
            position: absolute;
            top: 8px;
            color: $color-title;
            width: 128px;
            padding-left: 30px;
        }
        &:nth-child(2n){
            width: 47%;
        }
        &:after{
            content: "";
            display: block;
            clear: both;
        }
        .search{
            position: absolute;
            right: 0;
        }
    }
    .table-box{
        padding-right: 16px;
        .btn-box{
            float: right;
            padding: 20px 0 10px 0px;
        }
    }
}
</style>
