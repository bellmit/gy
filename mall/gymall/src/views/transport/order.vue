<template>
    <div class="transport-wrap order">
        <h2>运输订单</h2>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="index" :class="{'selected': tabIdx === index}" @click="tabChange(index, index)"><a href="javascript:;">{{statusValue[index]}}(<span>{{tab}}</span>)</a></li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="请输入品名、单号" class="gy-input">
            </div>
        </div>
        <consign-table :orderList="orderInfo.list" :theadList="theadList" :No="No"></consign-table>
        <div class="pagination-box" v-if="orderInfo.total > orderInfo.pageSize">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page.sync = "orderInfo.pageNum"
              :page-size="orderInfo.pageSize"
              :total="orderInfo.total"
              @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import consignTable from '@/components/consignTable';
export default {
    data () {
        return {
            statusValue: ['签约中', '实施中', '结算中', '付款中', '已完成', '已失效'],
            tabIdx: -1,
            statusList: [],
            orderInfo: {
                list: {
                    enquiryNoteItemList: []
                }
            },
            orderData: {
                pageNum: 1,
                pageSize: 5,
                data: {
                    carrierId: null,
                    consignmentNoteStatus: null,
                    consignorId: null
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
                    value: '装货地',
                    width: '150'
                },
                {
                    id: 4,
                    value: '卸货地',
                    width: '150'
                },
                {
                    id: 5,
                    value: '状态',
                    width: '108'
                },
                {
                    id: 6,
                    value: '操作',
                    width: '108'
                }
            ],
            No: 0,
            socketId: ''
        };
    },
    sockets: {
        connect () {
            // this.socketId = this.$socket.id;
            // console.log(this.socketId);
        }
    },
    mounted () {
        // this.$socket.emit('test', '123');
    },
    components: {
        consignTable
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            let companyId = userInfo.companyId;
            userInfo.companyTypeId === 2 ? (this.orderData.data.carrierId = companyId) : (this.orderData.data.consignorId = companyId);
        }
        this.getOrderList(1);
        this.getOrderStatus();
    },
    methods: {
        getOrderList (n) {
            this.orderData.pageNum = n;
            this.$http.post(this.$api.transport.orderList, this.orderData)
                .then(res => {
                    this.orderInfo = res.data.data;
                });
        },
        getOrderStatus () {
            this.$http.post(this.$api.transport.orderStatus, {carrierId: this.orderData.data.carrierId})
                .then(res => {
                    this.statusList = res.data.data;
                });
        },
        tabChange (idx, status) {
            this.tabIdx = idx;
            this.orderData.data.consignmentNoteStatus = status;
            this.getOrderList(1);
        },
        handleCurrentChange (r) {
            this.getOrderList(r);
        }
    }
};
</script>
