<template>
    <div class="vehicle-wrap vehicle-list">
        <div class="gy-h4">
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
                <div class="gy-form-group" style="height: 42px">
                  <span class="l">承运商</span>
                  <label>
                    <input @click="blur11" placeholder="请选择承运商" type="text" class="gy-input" v-model="companyNamenew" @keyup.enter="onelist1click">
                  </label>
                  <ul class="listul" v-show="onelist1Show">
                    <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                      {{item.companyName}}
                    </li>
                    <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
                  </ul>
                  <i class="iconfont icon-mySearch" @click="onelist1click"></i>
                </div>
                <div class="gy-form-group">
                    <span class="l">行驶证检验有效期</span>
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
                                              class="gy-button-extra-gyadmin">添加</router-link></span>
        <div style="padding-right:16px">
           <table class="gy-table list bid-list">
            <thead>
            <tr>
                <td>承运商</td>
                <td>车牌号码</td>
                <td>车型</td>
                <td>行驶证检验有效期至</td>
                <td>车辆道路运输证有效期至</td>
                <td>车辆隶属关系</td>
                <td>投保金额</td>
                <td>状态</td>
                <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in vehicleInfo.data.list" :key="item.id"
                v-if="vehicleInfo != null && vehicleInfo.data != null && vehicleInfo.data.list != null && vehicleInfo.data.list.length > 0">
                    <td>{{item.companyName}}</td>
                    <td>{{item.licensePlateNumber}}</td>
                    <td>{{item.infLogisticsDictionaryIdVehicleTypeStr}}</td>
                    <td>{{item.drivingLicenseValid | date}}</td>
                    <td>{{item.transportLicenseValidTime | date}}</td>
                    <td>{{item.vehicleMembershipRelationship === 1 ? '自有车辆' : '合作车辆'}}</td>
                    <td class="align-r">{{item.vehicleInsuredAmount}}万</td>
                    <td>{{item.valid === 1 ? '已启用' : '已禁用'}}</td>
                    <td class="align-c">
                        <router-link :to="{name:'vehicleDetail', query:{vehicleId: item.id}}"
                                     class="gy-button-view mr6">查看
                        </router-link>
                        <router-link :to="{name:'vehicleAdd', query:{vehicleId: item.id}}"
                                     class="gy-button-view mr6">编辑
                        </router-link>
                        <!--  <a class="gy-button-view" @click="deleteVehicle(item.id);">删除</a>-->
                         <span class="gy-button-view" v-if="item.valid==1"
                          @click="handleTransportUser(item)">禁用</span>
                    <span class="gy-button-view" v-if="item.valid==0"
                          @click="handleTransportUser(item)">启用</span>
                    </td>
            </tr>
            <tr v-if="vehicleInfo != null && vehicleInfo.data != null && vehicleInfo.data.list != null && vehicleInfo.data.list.length === 0">
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
            companyNamenew: '',
            disflag: false,
            onelist1Show: false,
            onelist1: [],
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
                    companyId: '',
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
            carrierCompanyList: [],
            vehicleStatusList: [
                {initKeys: '1', initValues: '已启用', initCountValues: ''},
                {initKeys: '0', initValues: '已禁用', initCountValues: ''}
            ]
        };
    },
    created () {
        this.getVehicleList();
        this.getinfCarrierTypeStatus();
        this.getCarryierCompany();
    },
    methods: {
        onelist1click () {
            this.onelist1Show = true;
            this.$http.post(this.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 2, // 1:交易公司  2：承运商
                'name': this.companyNamenew
            })
                .then((res) => {
                    this.onelist1 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            this.searchData.data.companyId = '';
        },
        onelist1select (item) {
            this.companyNamenew = item.companyName;
            this.searchData.data.companyId = item.companyId;
            this.onelist1Show = false;
        },
        blur11 () {
            this.companyNamenew = '';
            this.onelist1Show = false;
            this.searchData.data.companyId = '';
        },
        // 查找所有承运商
        getCarryierCompany () {
            this.$http.get(this.$api.transport.carryierCompany)
                .then(res => {
                    this.carrierCompanyList = res.data.data;
                });
        },
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
            let url;
            //  item.valid 1 为启用，0为禁用
            if (item.valid === 0) {
                valids = 1;
                url = this.$api.transport.vehicleState;
            } else {
                valids = 0;
                url = this.$api.transport.prohibit;
            }
            this.$http.put(url, {id: item.id, valid: valids})
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

<style lang="scss">
    .vehicle-list{
        .el-radio+.el-radio{
            margin-left:20px;
            color:#666666;
        }
        .el-range-separator, .el-input__icon{
            line-height: 24px;
            width:8%;
        }
        .el-input__inner{
           height: 30px;
           font-size: 14px;
        }
    }
</style>
