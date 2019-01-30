<template>
    <div class="transport-wrap order">
        <h2>运输结算单</h2>
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
        <consign-table :orderList="chargeList" :theadList="theadList" :No="No"></consign-table>
    </div>
</template>
<script>
import consignTable from '@/components/consignTable';
export default {
    data () {
        return {
            statusValue: ['进行中', '已完成', '已失效'],
            tabIdx: -1,
            statusList: [],
            chargeList: [],
            chargeData: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    settleStatus: null
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
                    value: '承运方名称',
                    width: '150'
                },
                {
                    id: 3,
                    value: '支付方式',
                    width: '100'
                },
                {
                    id: 4,
                    value: '结算金额(元)',
                    width: '100'
                },
                {
                    id: 5,
                    value: '装卸货数量',
                    width: '108'
                },
                {
                    id: 6,
                    value: '状态',
                    width: '108'
                },
                {
                    id: 7,
                    value: '操作',
                    width: '100'
                }
            ],
            No: 3
        };
    },
    created () {
        this.getChargeList(1, 10);
        this.getChargeStatus();
    },
    components: {
        consignTable
    },
    methods: {
        getChargeList () {
            let that = this;
            that.$http.post(that.$api.transport.chargeList, that.chargeData)
                .then(res => {
                    that.chargeList = res.data.data.list;
                });
        },
        getChargeStatus () {
            let that = this;
            that.$http.post(that.$api.transport.chargeStatus, {carrierId: 69})
                .then(res => {
                    that.statusList = res.data.data;
                });
        },
        tabChange (idx, status) {
            this.tabIdx = idx;
            this.chargeData.data.settleStatus = status;
            this.getChargeList();
        }
    }
};
</script>
