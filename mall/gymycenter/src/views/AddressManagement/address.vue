<template>
    <div class="point-list">
        <div class="new-title-public">
            地址管理
        </div>
            <!--<div slot="header" class="clearfix">-->
                <!--<span class="title">地址管理</span>-->
            <!--</div>-->
            <div class="addAddress">
                <button class="gy-button gy-button-extra" @click="showaddAdress">添加新收货地址</button>
            </div>
            <div class="mytable">
                <table  class="gy-table">
                    <thead>
                    <tr class="title">
                        <td>收货人</td>
                        <td>所在地区</td>
                        <td>详细地址</td>
                        <td>邮编</td>
                        <td>手机</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr class="list-head" v-for="(item, index) in addressList" :key="index">
                            <td>
                                <div>{{item.receiveName}}</div>
                            </td>
                            <td>
                                <div>{{item.provinceName + ' ' + item.cityName + ' ' + item.districtName}}</div>
                            </td>
                            <td>
                                <div>{{item.address}}</div>
                            </td>
                            <td>
                                <div>{{item.postCode}}</div>
                            </td>
                            <td>
                                <div>{{item.receivePhone}}</div>
                            </td>
                            <td class="button-box align-c">
                                <span class="gy-button-view" @click="editAddress(item)">编辑</span>
                                <span class="gy-button-view" @click="deleteAddress(item.id)">删除</span>
                                <span class="gy-view" v-if="item.defaults === 1">默认地址</span>
                                <span class="gy-button-view" @click="setDefault(item)" v-else>设为默认</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <div class="totaljl">
                     共 {{addressList.length}} 条记录
                </div> -->
            </div>
        <el-dialog width="820px" class="addDialog AddressManagement" :title="isEdit?'编辑收货人信息':'新增收货人信息'"
                   :visible.sync="dialogVisible">
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>省份城区:</span>
                    <el-row>
                        <el-col :span="24">
                            <el-col :span="8">
                                <el-select v-model="addAdressList.provinceId" placeholder="请选择" @change="Province">
                                    <el-option
                                      v-for="item in Provinces"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-select v-model="addAdressList.cityId" placeholder="请选择" @change="City">
                                    <el-option
                                      v-for="item in Citys"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-select v-model="districtId" placeholder="请选择" @change="District">
                                    <el-option
                                      v-for="item in Districts"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                    </el-row>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>详细地址:</span>
                    <div class="r">
                        <input type="text" v-model="addAdressList.address">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>邮政编码:</span>
                    <div class="r">
                        <input type="text" v-model="addAdressList.postCode">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>收货人姓名:</span>
                    <div class="r">
                        <input type="text" v-model="addAdressList.receiveName">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>手机号码:</span>
                    <div class="r">
                        <input type="text" v-model="addAdressList.receivePhone">
                    </div>
                </div>
            <div slot="footer" class="dialog-footer">
                <button class="gy-button-extra confirmations" @click="addAdress()">确定</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'pointAddress',
    data () {
        return {
            total: 132,
            vip: '黄金会员',
            navActive: 0,
            iShowNav: true,
            ShowMore: true,
            dialogVisible: false,
            addressList: [],
            addressIdx: null,
            districtId: null,
            integralDetail: true,
            page: {
                pageNum: 1, // 当前页数
                pageSize: 10
            },
            addAdressList: {
                provinceId: null,
                cityId: null,
                districtId: null,
                address: null,
                postCode: null,
                receiveName: null,
                receivePhone: null
            },
            Provinces: [],
            Citys: [],
            Districts: [],
            isEdit: false
        };
    },
    created () {
        // this.getlist();
        this.getAddressList();
    },
    mounted () {
        this.region(0, 'province');
    },
    methods: {
        getAddressList () {
            this.$http.get(this.$api.point.addressList).then(res => {
                this.addressList = res.data.data;
            });
        },
        // 省市区联动
        region (id, type) {
            let that = this;
            that.$http.get(that.$api.point.odrProvince + '/' + id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        if (type === 'province') {
                            that.Provinces = res.data.data;
                            that.Citys = [];
                            that.Districts = [];
                        } else if (type === 'city') {
                            that.Citys = res.data.data;
                            that.Districts = [];
                            that.addAdressList.cityId = '';
                            that.addAdressList.districtId = '';
                            that.districtId = '';
                        } else if (type === 'district') {
                            that.Districts = res.data.data;
                            that.addAdressList.districtId = '';
                            that.districtId = '';
                        } else {
                            console.log('地址接口有误');
                        }
                    }
                });
        },
        Province (item) {
            let that = this;
            that.region(item, 'city');
        },
        City (item) {
            let that = this;
            that.region(item, 'district');
        },
        District (item) {
            let that = this;
            that.addAdressList.deliveryDistrictId = item;
            that.districtId = item;
        },
        showaddAdress () {
            this.dialogVisible = true;
            this.isEdit = false;
            this.addAdressList = {};
        },
        // 新增收货地址
        addAdress () {
            this.addAdressList.districtId = this.districtId;
            if (this.addAdressList.provinceId === '' || this.addAdressList.provinceId === null || this.addAdressList.cityId === '' || this.addAdressList.cityId === null || this.addAdressList.districtId === '' || this.addAdressList.districtId === null) {
                this.$message.error('省市区不能为空');
                return;
            }
            if (this.addAdressList.address === '' || this.addAdressList.address === null) {
                this.$message.error('请填写详细地址');
                return;
            }
            if (this.addAdressList.postCode === '' || this.addAdressList.postCode === null) {
                this.$message.error('请填写邮政号码');
                return;
            }
            if (!/^[0-9][0-9]{5}$/.test(this.addAdressList.postCode)) {
                this.$message.error('邮政号码不正确');
                return;
            }
            if (this.addAdressList.receiveName === '' || this.addAdressList.receiveName === null) {
                this.$message.error('请填写收货人姓名');
                return;
            }
            if (this.addAdressList.receivePhone === '' || this.addAdressList.receivePhone === null) {
                this.$message.error('请填写手机号码');
                return;
            }
            if (!this.$tools.verifyMobile(this.addAdressList.receivePhone)) {
                this.$message.error('手机号码不正确');
                return;
            }
            if (!this.isEdit) {
                this.$http.post(this.$api.point.addAddress, this.addAdressList)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$alert('提交成功', '提示', {type: 'success'}).then(() => {
                                this.dialogVisible = false;
                                this.getAddressList();
                            });
                            return;
                        }
                        this.$message.error(res.data.message);
                    });
                return;
            }
            this.$http.put(this.$api.point.addAddress, this.addAdressList)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('操作成功', '提示', {type: 'success'}).then(() => {
                            this.dialogVisible = false;
                            this.addAdressList = {
                                provinceId: null,
                                cityId: null,
                                districtId: null,
                                address: null,
                                postCode: null,
                                receiveName: null,
                                receivePhone: null
                            };
                            this.getAddressList();
                        });
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        setDefault (item) {
            this.$confirm('确定设置该条地址为默认地址吗？', '提示')
                .then(() => {
                    item.defaults = 1;
                    this.$http.put(this.$api.point.addAddress, item)
                        .then(res => {
                            if (res.data.code === 0) {
                                this.$alert('操作成功', '提示', {type: 'success'}).then(() => {
                                    this.getAddressList();
                                });
                                return;
                            }
                            this.$message.error(res.data.message);
                        });
                });
        },
        editAddress (item) {
            this.$http.get(this.$api.point.odrProvince + '/' + item.provinceId)
                .then(res => {
                    if (res.data.code === 0) {
                        this.Citys = res.data.data;
                        this.editAddressDistrictId(item);
                    }
                });
            // this.City(item.cityId);
            this.dialogVisible = true;
            this.isEdit = true;
        },
        editAddressDistrictId (items) {
            this.$http.get(this.$api.point.odrProvince + '/' + items.cityId)
                .then(res => {
                    if (res.data.code === 0) {
                        this.Districts = res.data.data;
                        this.addAdressList = {
                            id: items.id,
                            provinceId: items.provinceId,
                            cityId: items.cityId,
                            districtId: items.districtId,
                            address: items.address,
                            postCode: items.postCode,
                            receiveName: items.receiveName,
                            receivePhone: items.receivePhone
                        };
                        this.districtId = items.districtId;
                    }
                });
        },
        deleteAddress (id) {
            this.$confirm('确定删除该条地址吗？', '提示')
                .then(() => {
                    this.$http.post(this.$api.point.deleteAddress, {
                        id: id
                    })
                        .then(res => {
                            if (res.data.code === 0) {
                                this.$alert('操作成功', '提示', {type: 'success'}).then(() => {
                                    this.getAddressList();
                                });
                                return;
                            }
                            this.$message.error(res.data.message);
                        });
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .point-list {
        .el-card__header {
            padding: 10px 20px;
            .title {
                color: $color-title;
                font-size: 16px;
                margin-right: 24px;
                font-weight: 600;
            }
        }
    }

    .gy-button-view {
        max-height: 10px;
    }

    .addAddress {
        text-align: right;
        margin-right: 14px;
        margin-top: 20px;
    }
     .mytable{
         padding: 15px 16px;
         .title{
             font-weight: bold;
         }
     }
    .addDialog {
        .el-dialog__body {
            padding: 3px;
        }
        input {
            width: 100%;
        }
        .addPerson {
            h3 {
                margin: 10px 0;
            }
        }
        .gy-form {
            padding: 0px 0 0px 20px;
            .gy-form-group {
                width: 100%;
                display: flex;
                .l {
                    flex: 0 0 60px;
                }
                .r {
                    flex: 1;
                    .text {
                        position: absolute;
                        top: 0;
                        right: 40px;
                        color: $color-highlight;
                    }
                    .text1 {
                        position: absolute;
                        top: 0;
                        right: 200px;
                        color: $color-highlight;
                    }
                }
            }
        }
        .confirmations {
            // margin-right: 20px;
        }
    }

    .addDialogs {
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__body {
            padding: 3px;
        }
        .notAddre {
            text-align: center;
        }
        .confirmationsd {
            margin: 20px 0 20px 0;
            margin-left: 400px;
        }
    }

    .gy-view {
        color: $color-extra;
        cursor: default;
    }
    .button-box{
        span{
            margin-right: 10px;
        }
    }
    .dialog-footer {
        margin-top: 7rem ;
    }
</style>
<style lang="scss" scoped>
    .AddressManagement .el-dialog__header {
        border-bottom: 1px solid rgba($color-light, .4);
    }
    .totaljl{
        margin-top: 20px;
        font-size: 12px;
        color: #666;
    }
     .gy-form-group {
        padding: 8px 30px 8px 115px;
            .l {
            width: 105px;
        }
    }
</style>
<style lang="scss">
    .addDialog {
        // position: absolute;
        margin-top:25vh ;
        .el-dialog__body {
            padding: 0;
        }
        .el-dialog__footer {
            padding:30px;
        }
    }
</style>
