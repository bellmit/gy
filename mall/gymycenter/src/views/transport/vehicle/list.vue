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
                    <input type="text" placeholder="请输入车牌号" v-model="searchData.data.licensePlateNumber">
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
        <div class="clearfix">
            <div class="search-form" v-if="disflag">
                <div class="gy-form-group">
                    <span class="l">行驶证有效期</span>
                    <!-- TODO -->
                    <!-- <el-date-picker
                        v-model="searchData.data.endTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker> -->
                    <el-date-picker
                        v-model="createDate"
                        type="daterange"
                        align="center"
                        unlink-panels
                        range-separator="至"
                        start-placeholder = '开始日期'
                        end-placeholder= '结束日期'
                        >
                    </el-date-picker>
                </div>
                <div class="gy-form-group">
                    <span class="l">车型</span>
                    <!-- TODO -->
                    <el-select v-model="searchData.data.infLogisticsDictionaryIdVehicleType" placeholder="请选择">
                        <el-option label='全部' value=''></el-option>
                        <el-option
                            v-for="item in carrierTypeStaus"
                            :key="item.id"
                            :label="item.logisticsDictionaryName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="searchicon" @click="getVehicleList"><i class="iconfont icon-search"></i></span>
                </div>
            </div>
        </div>
        <span class="button-box"><router-link :to="{ name: 'vehicleAdd' }"
                                              class="gy-button-extra">添加</router-link></span>
        <div style="padding: 0 16px">
           <table class="gy-table list bid-list">
            <thead>
            <tr>
                <td>车牌号码</td>
                <td>车型</td>
                <td>行驶证有效期至</td>
                <td>车辆道路运输证有效期至</td>
                <td>车辆隶属关系</td>
                <td>投保金额(万元)</td>
                <td>状态</td>
                <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in vehicleInfo.data.list" :key="item.id">
                    <td>{{item.licensePlateNumber}}</td>
                    <td>{{item.infLogisticsDictionaryIdVehicleTypeStr}}</td>
                    <td>{{item.drivingLicenseValid | date}}</td>
                    <td>{{item.transportLicenseValidTime | date}}</td>
                    <td>{{item.vehicleMembershipRelationship === 1 ? '自有车辆' : '合作车辆'}}</td>
                    <td class="align-r">{{item.vehicleInsuredAmount}}</td>
                    <td>{{item.valid === 1 ? '已启用' : '已禁用'}}</td>
                    <td class="align-c">
                        <router-link :to="{name:'vehicleDetail', query:{vehicleId: item.id}}"
                                     class="gy-button-view">查看
                        </router-link>
                        <router-link :to="{name:'vehicleAdd', query:{vehicleId: item.id}}"
                                     class="gy-button-view">编辑
                        </router-link>
                        <!--  <a class="gy-button-view" @click="deleteVehicle(item.id);">删除</a>-->
                         <span class="gy-button-view" v-if="item.valid==1"
                          @click="handleTransportUser(item)">禁用</span>
                    <span class="gy-button-view" v-if="item.valid==0"
                          @click="handleTransportUser(item)">启用</span>
                    </td>
            </tr>
            <tr v-if="vehicleInfo.data.list.length === 0">
                <td colspan="8" class="note align-c">暂无数据</td>
            </tr>
            </tbody>
        </table>
        <div class="departmentName">共 {{searchData.total}} 条记录</div>
        <el-pagination
            background
            @current-change="changeSelect"
            @size-change="sizeChange"
            layout="prev, pager, next"
            style="margin: 20px 0 30px 0;"
            :current-page.sync="searchData.pageNum"
            :page-size="searchData.pageSize"
            :total="searchData.total">
        </el-pagination>
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
                total: 0,
                data: {
                    infLogisticsDictionaryIdVehicleType: null,
                    licensePlateNumber: null,
                    startTime: null,
                    endTime: null,
                    valid: null,
                    keywords: null
                }
            },
            createDate: null, // 存时间
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
            this.searchData.data.startTime = '';
            this.searchData.data.endTime = '';
            if (this.createDate) {
                this.searchData.data.startTime = this.createDate[0];
                this.searchData.data.endTime = this.createDate[1];
            }
            var that = this;
            that.$http.post(that.$api.transport.vehicleList, that.searchData)
                .then(res => {
                    that.vehicleInfo = res.data.data;
                    console.log(res.data.data);
                    that.searchData.total = res.data.data.data.total;
                    that.getVehicleValidCount();
                });
        },
        // 查询车辆类型列表
        getinfCarrierTypeStatus () {
            this.$http.get(this.$api.transport.vehicleType, this.searchData)
                .then(res => {
                    console.log('车辆类型列表数据：');
                    console.log(res.data);
                    this.carrierTypeStaus = res.data.data;
                });
        },
        // 查询车辆状态数量
        getVehicleValidCount () {
            // console.log(this.searchData);
            this.$http.post(this.$api.transport.carriersStatus, this.searchData.data)
                .then(res => {
                    // console.log('车辆状态数量');
                    // console.log(res);
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
        // 禁用
        handleTransportUser (item) {
            let valids;
            if (item.valid === 0) {
                valids = 1;
            } else {
                valids = 0;
            }
            this.$http.put(this.$api.transport.vehicleState, {id: item.id, valid: valids})
                .then(res => {
                    console.log(res);
                    if (!res.data.success) {
                        this.$message.error(res.data.message);
                    }
                    this.getVehicleList();
                });
        },
        changeSelect (pageNo) {
            this.searchData.pageNum = pageNo;
            this.getVehicleList();
        },
        sizeChange (val) {
            console.log(val);
            this.searchData.pageSize = val;
            this.getVehicleList();
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
    .order{
        .gy-form-group{
            padding: 8px 30px 8px 122px;
            .searchicon {
                position: absolute;
                right: 10px;
                bottom: 7px;
                .icon-search:before {
                    color: #000;
                    font-size: 16px;
                }
            }
        }
        .button-box {
            display: block;
            text-align: right;
            margin: 10px 30px 10px;
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
       .td-100 {
            width: 100px;
        }
        .td-136 {
            width: 136px;
        }
    }

</style>
<style lang="scss">
    .order{
        .el-radio+.el-radio{
            margin-left:20px;
            color:#666666;
        }
        .el-range-separator, .el-input__icon{
            line-height: 24px;
        }
        .el-input__inner{
           height: 30px;
           font-size: 14px;
        }
    }
</style>
