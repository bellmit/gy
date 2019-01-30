<template>
    <div class="transport-wrap order">
        <h2>物流询价单</h2>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="index" :class="{'selected': tabIdx === index}" @click="tabChange(index, index)">
                    <a href="javascript:;">{{statusValue[index]}}(<span>{{tab.count}}</span>)</a>
                </li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="请输入品名、单号" class="gy-input">
            </div>
        </div>
        <consign-table :orderList="enquiryInfo.list" :theadList="theadList" :No="No"></consign-table>
        <div class="pagination-box" v-if="enquiryInfo.total > enquiryData.pageSize">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page.sync = "enquiryInfo.pageNum"
              :page-size="enquiryInfo.pageSize"
              :total="enquiryInfo.total"
              @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import consignTable from '../../../components/consignTable';
export default {
    data () {
        return {
            statusValue: ['未报价', '已报价', '已签约', '竞价失败'],
            tabIdx: -1,
            statusList: [],
            enquiryInfo: {
                list: {
                    enquiryNoteItemList: []
                }
            },
            enquiryData: {
                pageNum: 1,
                pageSize: 5,
                data: {
                    keywords: null,
                    enquiryNoteStatus: null,
                    carrierId: null
                }
            },
            theadList: [
                {
                    id: 1,
                    value: '商品',
                    width: '300'
                },
                {
                    id: 2,
                    value: '托运方名称',
                    width: '150'
                },
                {
                    id: 3,
                    value: '数量',
                    width: '108'
                },
                {
                    id: 4,
                    value: '装货日期',
                    width: '108'
                },
                {
                    id: 5,
                    value: '装卸货地',
                    width: '192'
                },
                {
                    id: 6,
                    value: '操作',
                    width: '108'
                }
            ],
            No: 2
        };
    },
    components: {
        consignTable
    },
    created () {
        localStorage.getItem('userInfo') && (this.enquiryData.data.carrierId = JSON.parse(localStorage.getItem('userInfo')).companyId);
        this.getEnquiryList(1);
        this.getBidStatus();
    },
    methods: {
        getEnquiryList (n) {
            this.enquiryData.pageNum = n;
            this.$http.post(this.$api.transport.enquiryList, this.enquiryData)
                .then(res => {
                    this.enquiryInfo = res.data.data;
                });
        },
        getBidStatus () {
            this.$http.post(this.$api.transport.bidStatus, {carrierId: this.enquiryData.data.carrierId})
                .then(res => {
                    this.statusList = res.data.data;
                });
        },
        tabChange (idx, status) {
            this.tabIdx = idx;
            this.enquiryData.data.enquiryNoteStatus = status;
            this.getEnquiryList();
        },
        handleCurrentChange (r) {
            console.log(r);
            this.getEnquiryList(r);
        }
    }
};
</script>
