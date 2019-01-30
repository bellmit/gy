<template>
    <div class="transport-wrap order">
        <div class="new-title-public">
            车辆管理
        </div>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1,-1)"><a
                    href="javascript:;">全部</a></li>
                <li v-for="(statusItem,index) in vehicleStatusList"
                    @click="tabChange(index,statusItem.initKeys)"
                    :key="statusItem.initKeys"
                    :class="{'selected': tabIdx === index}">
                    <a href="javascript:;">
                        {{statusItem.initValues}}
                        (<span>{{statusItem.initCountValues}}</span>)</a>
                </li>
            </ul>
            <div class="search">
                <div class="se-left11">
                    <input type="text" placeholder="请输入车牌号" v-model="searchData.data.keywords">
                    <i class="iconfont icon-search" @click="getVehicleList"></i>
                </div>
                <div class="se-left2" @click="disflag = !disflag">
                    <span>高级搜索</span>
                    <i class="iconfont" :class="{'icon-arrow-down': !disflag, 'icon-arrow-up': disflag}"></i>
                </div>
            </div>
            <!--<div class="search-page-content-query-more fr" @click="disflag = !disflag">-->
                <!--<span>高级搜索</span>-->
                <!--<i slot="suffix" class="el-icon-arrow-down"></i>-->
            <!--</div>-->
            <!--<div class="search">-->
                <!--<i class="iconfont icon-search" @click="getVehicleList"></i>-->
                <!--<input type="text" v-model="searchData.data.keywords" placeholder="请输入车牌号" class="gy-input">-->
            <!--</div>-->
        </div>
        <div class="new_div" v-if="disflag">
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-row>
                        <el-col :span="5">行驶证有效期</el-col>
                        <el-col :span="9">
                            <el-date-picker
                                v-model="searchData.data.startTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="1">至</el-col>
                        <el-col :span="9">
                            <el-date-picker
                                v-model="searchData.data.endTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="4">车型</el-col>
                        <el-col :span="20">
                            <el-select v-model="searchData.data.infCarrierTypeId" placeholder="请选择">
                                <el-option
                                    v-for="item in carrierTypeStaus"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div>
                <i class="iconfont icon-search my_add" @click="getVehicleList"></i>
            </div>
        </div>
        <!--<div class="date-picker-box clearfix search-area" v-if="disflag">-->
            <!--<div class="date-picker fl">-->
                <!--<span class="l">行驶证有效期</span>-->
                <!--<el-date-picker-->
                    <!--v-model="searchData.data.startTime"-->
                    <!--type="date"-->
                    <!--style="width: 30%;"-->
                    <!--placeholder="选择日期">-->
                <!--</el-date-picker>-->
                <!--<span>  至  </span>-->
                <!--<el-date-picker-->
                    <!--v-model="searchData.data.endTime"-->
                    <!--type="date"-->
                    <!--style="width: 30%;"-->
                    <!--placeholder="选择日期">-->
                <!--</el-date-picker>-->
            <!--</div>-->

            <!--<div>-->
                <!--<span class="payment-list-content-item-tit">车型</span>-->
                <!--<el-select v-model="searchData.data.infCarrierTypeId" class="select-plugin" placeholder="请选择">-->
                    <!--<el-option-->
                        <!--v-for="item in carrierTypeStaus"-->
                        <!--:key="item.id"-->
                        <!--:label="item.name"-->
                        <!--:value="item.id">-->
                    <!--</el-option>-->
                <!--</el-select>-->
                <!--<i class="iconfont icon-search" @click="getVehicleList"></i>-->
            <!--</div>-->
        <!--</div>-->
        <span class="button-box"><router-link :to="{ name: 'vehicleAdd' }"
                                              class="gy-button-extra">新建</router-link></span>
        <div style="padding: 0 14px">
           <table class="gy-table list bid-list">
            <thead>
            <tr>
                <td class="td-100">车牌号</td>
                <td class="td-100">车型</td>
                <td width="140">注册日期</td>
                <td width="140">行驶证有效期</td>
                <td class="td-150">发动机号</td>
                <td class="td-100">VIN</td>
                <td width="70">状态</td>
                <td class="td-180">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in vehicleInfo.data.list" :key="item.id"
                v-if="vehicleInfo != null && vehicleInfo.data != null && vehicleInfo.data.list != null && vehicleInfo.data.list.length > 0">
                <td colspan="8" class="item">
                    <table class="gy-table">
                        <tr>
                            <td class="td-100">{{item.licensePlateNumber}}</td>
                            <td class="td-100">{{item.infCarrierName}}</td>
                            <td width="140">{{item.registerDate | date}}</td>
                            <td  width="140">{{item.drivingLicenseValid | date}}</td>
                            <td class="td-150">{{item.engineNumber}}</td>
                            <td class="td-100">{{item.vin}}</td>
                            <td width="70">{{item.valid === 1 ? '已启用' : '未启用'}}</td>
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
            <tr v-if="vehicleInfo != null && vehicleInfo.data != null && vehicleInfo.data.list != null && vehicleInfo.data.list.length === 0">
                <td colspan="8" class="note">暂无数据</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tabIdx: -1,
            disflag: false,
            vehicleInfo: {
                data: {
                    list: []
                }
            },
            priceList: [],
            searchData: {
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
            carrierTypeStaus: [],
            vehicleStatusList: [
                {initKeys: '1', initValues: '已启用', initCountValues: ''},
                {initKeys: '0', initValues: '已禁用', initCountValues: ''}
            ]
        };
    },
    created () {
        this.getVehicleList();
        this.getinfCarrierTypeStatus();
    },
    methods: {
        // 查询列表
        getVehicleList () {
            console.log(this.searchData);
            this.$http.post(this.$api.transport.vehicleList, this.searchData)
                .then(res => {
                    this.vehicleInfo = res.data.data;
                    console.log('列表数据');
                    console.log(this.vehicleInfo);
                    this.getVehicleValidCount();
                });
        },
        // 查询车辆类型列表
        getinfCarrierTypeStatus () {
            this.$http.post(this.$api.transport.carriersList, this.searchData)
                .then(res => {
                    console.log('车辆类型列表数据：');
                    console.log(res);
                    this.carrierTypeStaus.push({id: null, name: '未选择'});
                    for (let item of res.data.data.list) {
                        this.carrierTypeStaus.push(item);
                    }
                });
        },
        // 查询车辆状态数量
        getVehicleValidCount () {
            console.log(this.searchData);
            this.$http.post(this.$api.transport.carriersStatus, this.searchData.data)
                .then(res => {
                    console.log('车辆状态数量');
                    console.log(res);
                    this.vehicleStatusList[0].initCountValues = res.data.data.validCount;
                    this.vehicleStatusList[1].initCountValues = res.data.data.unValidCount;
                });
        },
        // 删除车辆
        deleteVehicle (id) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // this.doDelete(row.id);
                this.$http.post(this.$api.transport.deleteVehicle, this.searchData)
                    .then(res => {
                        // this.carrierTypeStaus = res.data.data.list;
                    });
            }).catch(() => {
            });
        },
        // 切换tab页
        tabChange (tabIdx, status) {
            this.tabIdx = tabIdx;
            this.searchData.data.valid = null;
            if (status !== -1) {
                this.searchData.data.valid = status;
            }
            this.searchData.pageNum = 1;
            this.getVehicleList();
        }
    }
};
</script>

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
                font-size: 12px;
                text-align: center;
            }
        }
        tbody {
            td {
                background-color: #fbfbfc;
                border-bottom: 5px solid #fff;
                padding-right: 0;
                font-size: 12px;
                text-align: center;
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
.new_div{
    padding: 0 30px 20px;
    position: relative;
    .my_add{
        position: absolute;
        top: 3px;
        right: 11px;
    }
}
</style>
