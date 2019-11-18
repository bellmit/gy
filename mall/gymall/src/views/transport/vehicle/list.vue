<template>
    <div class="transport-wrap order">
        <h2>车辆列表</h2>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(1,-1)"><a
                    href="javascript:;">全部</a></li>
                <li class="all" @click="tabChange(1,1)"><a href="javascript:;">已启用</a></li>
                <li class="all" @click="tabChange(1,0)"><a href="javascript:;">已禁用</a></li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" v-model="vehicleData.data.licensePlateNumber" placeholder="请输入车牌号" class="gy-input">
            </div>
        </div>

        <div class="date-picker-box clearfix search-area">
            <div class="date-picker fl">
                <span class="l">行驶证有效期</span>
                <el-date-picker
                    v-model="vehicleData.data.startTime"
                    type="date"
                    style="width: 30%;"
                    placeholder="选择日期">
                </el-date-picker>
                <span>  至  </span>
                <el-date-picker
                    v-model="vehicleData.data.endTime"
                    type="date"
                    style="width: 30%;"
                    placeholder="选择日期">
                </el-date-picker>
            </div>

            <div>
                <span class="payment-list-content-item-tit">车型</span>
                <el-select v-model="vehicleData.data.infCarrierTypeId" class="select-plugin" placeholder="请选择">
                    <el-option
                        v-for="item in carrierTypeStaus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <i class="iconfont icon-search" @click="getVehicleList"></i>
            </div>
        </div>
        <span class="button-box"><router-link :to="{ name: 'vehicleAdd' }"
                                              class="gy-button-extra">新建</router-link></span>
        <table class="gy-table list bid-list">
            <thead>
            <tr>
                <td class="td-100">车牌号</td>
                <td class="td-100">车型</td>
                <td class="td-100">注册日期</td>
                <td class="td-100">行驶证有效期</td>
                <td class="td-150">发动机号</td>
                <td class="td-100">VIN</td>
                <td class="td-100">状态</td>
                <td class="td-180">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in vehicleInfo.data.list" :key="item.id" v-if="vehicleInfo.data.list.length > 0">
                <td colspan="8" class="item">
                    <table class="gy-table">
                        <tr>
                            <td class="td-100">{{item.licensePlateNumber}}</td>
                            <td class="td-100">{{item.infCarrierName}}</td>
                            <td class="td-100">{{item.registerDate | date}}</td>
                            <td class="td-100">{{item.drivingLicenseValid | date}}</td>
                            <td class="td-150">{{item.engineNumber}}</td>
                            <td class="td-100">{{item.vin}}</td>
                            <td class="td-100">{{item.valid === 1 ? '可用' : '不可用'}}</td>
                            <td class="td-180">
                                <router-link :to="{name:'vehicleDetail', query:{vehicleId: item.id}}"
                                             class="gy-button-view">查看
                                </router-link>
                                <router-link :to="{name:'vehicleAdd', query:{vehicleId: item.id}}"
                                             class="gy-button-view">编辑
                                </router-link>
                                <!--  <a class="gy-button-view" @click="deleteVehicle(item.id);">删除</a>-->

                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
            <tr v-if="vehicleInfo.data.list.length === 0">
                <td colspan="8" class="note">暂无数据</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            vehicleInfo: {
                list: {
                    vehicleNoteItemList: []
                }
            },
            tabIdx: -1,
            priceList: [],
            vehicleData: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    infCarrierTypeId: null,
                    licensePlateNumber: null,
                    startTime: null,
                    endTime: null,
                    valid: null,
                    keywords: null
                }
            },
            carrierTypeStaus: []
        };
    },
    created () {
        this.getVehicleList();
        this.getinfCarrierTypeStatus();
    },
    methods: {
        getVehicleList () {
            console.log(this.vehicleData);
            this.$http.post(this.$api.transport.vehicleList, this.vehicleData)
                .then(res => {
                    this.vehicleInfo = res.data.data;
                });
        },
        getinfCarrierTypeStatus () {
            this.$http.post(this.$api.transport.carriersList, this.vehicleData)
                .then(res => {
                    console.log(res);
                    this.carrierTypeStaus = res.data.data.list;
                });
        },
        deleteVehicle (id) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // this.doDelete(row.id);
                this.$http.post(this.$api.transport.deleteVehicle, this.vehicleData)
                    .then(res => {
                        // this.carrierTypeStaus = res.data.data.list;
                    });
            }).catch(() => {
            });
        },
        tabChange (idx, status) {
            this.vehicleData.data.valid = null;
            if (status !== -1) {
                this.vehicleData.data.valid = status;
            }
            this.vehicleData.pageNum = idx;
            this.getVehicleList();
        }
    }
};
</script>

<style>

</style>
<style lang="scss" scoped>

    .button-box {
        display: block;
        text-align: right;
        padding: 0 20px 10px;
    }

    .bid-list {
        thead {
            td {
                padding-right: 0;
            }
        }
        tbody {
            td {
                background-color: #fbfbfc;
                border-bottom: 5px solid #fff;
                padding-right: 0;
            }
            tr:last-child {
                td {
                    border: none;
                }
            }
        }
    }

    .td-180 {
        width: 180px;
    }

    .td-100 {
        width: 100px;
    }

    .td-126 {
        width: 126px;
    }

    .gy-button-view {
        margin-right: 6px;
    }

    .gy-button-view i {
        font-size: 12px;
        line-height: 8px;
        transform: scale(0.8);
        display: inline-block;
    }

    .link-im {
        color: $color-extra;
        margin-left: 10px;
    }

    .search-area {
        padding: 10px 20px
    }

    .select-plugin {
        width: 20%
    }

</style>
