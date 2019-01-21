<template>
    <div id="exchange">
        <div class="collectGoods">
            <i class="iconfont icon-address iconTu"></i>
            <div class="new-title-public">
                收货地址
            </div>
            <span class="addAddress" @click="addAdressShow()">添加新地址</span>
            <div class="tablebox">
              <table class="gy-table messageAddress">
                  <tbody>
                      <tr class="" v-for="(item,index) in messageList" :key="index" @mouseenter = "mouseen(index)" @mouseleave = "mousele(index)">
                          <td style="position: relative;cursor: pointer" @click = "setDefault(item)">
                              <span v-if="item.defaults === 1" class="frame" :class="activeClass">{{item.receiveName}}</span>
                              <span v-if="item.defaults !== 1" class="frame" :class="[showUpdate === index ? activeClass  : '']">{{item.receiveName}}</span>
                              <i v-show="item.defaults === 1" class="iconfont icon-cornerMark" style="color: red;position: absolute;top: 22px;left: 144px;"></i>
                          </td>
                          <td>
                              {{item.receiveName}}&nbsp;&nbsp;&nbsp;{{item.provinceName}}&nbsp;{{item.cityName}}&nbsp;{{item.districtName}}&nbsp;{{item.address}}&nbsp;{{item.receivePhone}}
                              <span v-show="item.defaults === 1" class="defaultsd">默认地址</span>
                          </td>
                          <td class="addres" @click="setDefault(item)" v-show="showUpdate === index">设为默认地址</td>
                          <td class="addres" @click="editOdr(item)" v-show="showUpdate === index">编辑</td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>
        <div class="confirmationOrder">
            <i class="iconfont icon-confirm-point iconTu"></i>
            <div class="new-title-public">
                确认兑换单
            </div>
            <div class="tableboxtwo">
            <table class="gy-table">
                <thead>
                    <tr>
                        <td>兑换品详情信息</td>
                        <td>数量</td>
                        <td>单价</td>
                        <td>总价</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span class="imgPhone">
                                <img :src = "odrDetailList.filePath">
                            </span>
                            <span>{{odrDetailList.redemptionName}}</span>
                        </td>
                        <td>{{redemptionQuantity}}{{odrDetailList.redemptionUnit}}</td>
                        <td>{{odrDetailList.redemptionPrice}}积分</td>
                        <td>{{redemptionQuantity * odrDetailList.redemptionPrice}}积分</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <button class="gy-button-extra confirmation" @click="confirmExchanges()">确认兑换</button>
        </div>
        <el-dialog width="30%" class="addDialog"
                   :visible.sync="dialogVisible">
            <div class="addPerson"><h4>新增收货人信息</h4></div>
            <div class="formbox">
              <div class="gy-form">
                  <div class="gy-form-group">
                      <span class="l"><i>*</i>省份城区:</span>
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
              </div>
              <div class="gy-form">
                  <div class="gy-form-group">
                      <span class="l"><i>*</i>详细地址:</span>
                      <input type="text" v-model="addAdressList.address">
                  </div>
              </div>
              <div class="gy-form">
                  <div class="gy-form-group">
                      <span class="l"><i>*</i>邮政编码:</span>
                      <input type="text" v-model="addAdressList.postCode">
                  </div>
              </div>
              <div class="gy-form">
                  <div class="gy-form-group">
                      <span class="l"><i>*</i>收货人姓名:</span>
                      <input type="text" v-model="addAdressList.receiveName">
                  </div>
              </div>
              <div class="gy-form">
                  <div class="gy-form-group">
                      <span class="l"><i>*</i>手机号码:</span>
                      <input type="text" v-model="addAdressList.receivePhone">
                  </div>
              </div>
            </div>
            <div class="adddialog-footer">
                <span slot="footer" class="dialog-footer fr">
                    <button class="gy-button-extra confirmations" @click="addAdress()">确定</button>
                </span>
            </div>

        </el-dialog>
        <el-dialog width="509px" class="addDialogs"
                   :visible.sync="dialogVisibles">
            <div class="addPerson"><h4>提示</h4></div>
            <h4 class="notAddre">您还没有添加收货地址</h4>
            <button class="gy-button-extra confirmationsd" @click = "confirmSure()">确定</button>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'exchange',
    data () {
        return {
            dialogVisible: false,
            dialogVisibles: false,
            id: null,
            odrDetailList: {},
            addAdressList: {
                provinceId: null,
                cityId: null,
                districtId: null,
                address: null,
                postCode: null,
                receiveName: null,
                receivePhone: null
            },
            districtId: null,
            Provinces: [],
            Citys: [],
            CitysObj: {
                id: '0',
                name: ''
            },
            Districts: [],
            DistrictsObj: {},
            messageList: [],
            isShow: false,
            edit: false,
            showUpdate: null,
            showDefault: 1,
            activeClass: 'active',
            redemptionQuantity: 0,
            confirmOrder: {
                ictAddressId: null,
                odrPointNoteItemModelList: [{
                    prdRedemptionId: null,
                    redemptionQuantity: null
                }]
            },
            ictAddressIds: null,
            queryId: null,
            pointNoteCodeId: null
        };
    },
    mounted () {
        this.id = this.$route.query.id;
        this.redemptionQuantity = this.$route.query.count;
        this.odrDetail();
        this.region(0, 'province');
        this.messageAdd();
    },
    methods: {
        // 确认收货地址
        confirmSure () {
            this.dialogVisibles = false;
        },
        addAdressShow () {
            this.districtId = null;
            this.addAdressList = {};
            this.dialogVisible = true;
        },
        // 移入移出
        mouseen (index) {
            this.showUpdate = index;
        },
        mousele () {
            this.showUpdate = null;
        },
        // 设为默认
        setDefault (item) {
            this.edit = true;
            this.addAdressList = item;
            this.districtId = item.districtId;
            this.addAdressList.defaults = 1;
            this.addAdress();
            this.messageAdd();
        },
        // 编辑
        editOdr (item) {
            this.$http.get(this.$api.exchange.odrProvince + '/' + item.provinceId)
                .then(res => {
                    if (res.data.code === 0) {
                        this.Citys = res.data.data;
                        this.editAddressDistrictId(item);
                    }
                });
            this.dialogVisible = true;
            this.edit = true;
        },
        editAddressDistrictId (items) {
            this.$http.get(this.$api.exchange.odrProvince + '/' + items.cityId)
                .then(res => {
                    if (res.data.code === 0) {
                        this.districtId = items.districtId;
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
                    }
                });
        },
        // 管理地址列表
        messageAdd () {
            let that = this;
            that.$http.get(that.$api.exchange.searchAdd)
                .then(function (res) {
                    that.messageList = res.data.data;
                    console.log(that.messageList);
                }).catch(function (error) {
                    that.$message(error);
                });
        },
        // 省市区联动
        region (id, type) {
            let that = this;
            that.$http.get(that.$api.exchange.odrProvince + '/' + id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        console.log(res.data.data);
                        if (type === 'province') {
                            that.Provinces = res.data.data;
                        } else if (type === 'city') {
                            that.Citys = res.data.data;
                            that.address(that.deliveryCity[0].id, 'district');
                        } else if (type === 'district') {
                            that.Districts = res.data.data;
                            that.info.districtName = that.deliveryDistrict[0];
                        } else {
                            console.log('地址接口有误');
                        }
                    }
                }).catch(function (error) {
                    that.$message(error);
                });
        },
        Province (item) {
            let that = this;
            that.Citys = [];
            that.addAdressList.cityId = null;
            that.districtId = null;
            that.region(item, 'city');
        },
        City (item) {
            let that = this;
            that.districtId = null;
            that.region(item, 'district');
        },
        District (item) {
            // let that = this;
            // that.addAdressList.deliveryDistrictId = item;
        },
        // 新增收货地址
        addAdress () {
            let that = this;
            if (that.addAdressList.provinceId === null || that.addAdressList.provinceId === '' || that.addAdressList.provinceId === undefined) {
                that.$message('请选择省份');
                return;
            }
            if (that.addAdressList.cityId === null || that.addAdressList.cityId === '' || that.addAdressList.cityId === undefined) {
                that.$message('请选择城市');
                return;
            }
            if (that.districtId === null || that.districtId === '' || that.districtId === undefined) {
                that.$message('请选择城区');
                return;
            }
            if (that.addAdressList.address === null || that.addAdressList.address === '') {
                that.$message('请填写详细地址');
                return;
            }
            if (that.addAdressList.postCode === null || that.addAdressList.postCode === '') {
                that.$message('请填写邮政编码');
                return;
            }
            if (that.addAdressList.postCode !== null || that.addAdressList.postCode !== '') {
                if (!that.$tools.verzipCode(that.addAdressList.postCode)) {
                    that.$message('邮编格式错误，请重新填写');
                    return;
                }
            }
            if (that.addAdressList.receivePhone === null || that.addAdressList.receivePhone === '') {
                that.$message('请填写手机号');
                return;
            }
            if (that.addAdressList.receivePhone !== null || that.addAdressList.receivePhone !== '') {
                if (!that.$tools.verifyMobile(that.addAdressList.receivePhone)) {
                    that.$message('手机号码格式错误，请重新填写');
                    return;
                }
            }
            that.addAdressList.districtId = that.districtId;
            if (that.edit) {
                that.edit = false;
                that.$http.put(that.$api.exchange.ictAddress, that.addAdressList)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            that.dialogVisible = false;
                            that.messageAdd();
                        }
                    });
            } else {
                that.$http.post(that.$api.exchange.odrAddress, that.addAdressList)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            that.dialogVisible = false;
                            that.messageAdd();
                        }
                    }).catch(function (error) {
                        that.$message(error);
                    });
            }
        },
        // 确认订单列表
        odrDetail () {
            let that = this;
            that.$http.get(that.$api.exchange.odrPointNoteDetail + '/' + that.id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.odrDetailList = res.data.data;
                        console.log(that.odrDetailList);
                    }
                }).catch(function (error) {
                    that.$message(error);
                });
        },
        // 确认兑换
        confirmExchanges () {
            let that = this;
            if (that.messageList.length === 0) {
                that.dialogVisibles = true;
                return;
            } else {
                that.dialogVisibles = false;
            }
            for (let i = 0; i < that.messageList.length; i++) {
                if (that.messageList[i].defaults === 1) {
                    that.ictAddressIds = that.messageList[i].id;
                }
            }
            if (that.ictAddressIds === null) {
                that.$message('请选择默认收货地址');
                return;
            }
            that.confirmOrder.ictAddressId = that.ictAddressIds;
            that.confirmOrder.odrPointNoteItemModelList[0].prdRedemptionId = that.id;
            that.confirmOrder.odrPointNoteItemModelList[0].redemptionQuantity = that.redemptionQuantity;
            that.$http.post(that.$api.exchange.confirmExchange, that.confirmOrder)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.queryId = res.data.data.ictAddressId;
                        that.pointNoteCodeId = res.data.data.id;
                        that.$router.push({name: 'exchangeFish', query: {id: that.queryId, pointNoteCode: that.pointNoteCodeId}});
                    }
                });
        }
    }
};
</script>

<style lang="scss">
    #exchange{
        width: 1200px;
        height: auto;
        margin: 20px auto;
        padding-top: 1px;
        background-color: $color-white;
        .iconTu{
            position: absolute;
            top: 3px;
            left: 10px;
        }
        // 页面的标题栏
        .new-title-public{
            line-height: 35px;
            padding: 0 30px;
            border-bottom: 1px solid #e6eaea;
            font-size: 16px;
            font-weight: bold;
            color: $color-title;
        }
        h4{
            margin-top: 10px;
            margin-bottom: 10px;
            padding-left: 13px;
        }
        .addDialog{
            .el-dialog__header {
                padding: 0;
            }
            .el-dialog__body {
                padding: 3px;
            }
            input {
                width: 100%;
            }
            .addPerson {
                border-bottom: 1px solid $color-light;
            }
            .formbox{
              padding-top: 17px;
              .gy-form{
                  position: relative;
                  padding: 0px 0 0px 0px;
                  .gy-form-group{
                      width: 100%;
                  }
                  .l{
                      i{
                          position:absolute;
                          color: $color-highlight;
                          line-height: 10px;
                          top: 12px;
                          left: 20px;
                      }
                  }
              }
            }

            .adddialog-footer{
                width:100%;
                height:18px;
                padding: 0 30px;
                margin: 22px auto;
            };
        }
        .addDialogs{
            .addPerson {
                border-bottom: 1px solid $color-light;
            }
            .el-dialog__header {
                padding: 0;
            }
            .el-dialog__body {
                padding: 3px;
            }
            .notAddre{
                text-align: center;
            }
            .confirmationsd{
                margin: 20px 0 20px 0;
                margin-left: 415px;
            }
        }
        .collectGoods{
            position: relative;
            .addAddress{
                display: inline-block;
                color: $color-input-focus;
                margin:20px 0  20px 30px;
                cursor: pointer;
            }
            .tablebox{
              padding: 0 30px 20px 30px;
              .messageAddress{
                  border: none;
                  .gy{
                      display: inline-block;
                      height: 30px;
                      background-color: red;
                  }
                  .frame{
                      display: inline-block;
                      width: 150px;
                      height: 30px;
                      border: 1px solid #E2E2E2;
                      text-align: center;
                      line-height: 30px;
                  }
                  .active{
                      border: 1px solid $color-a-hover;
                  }
                  .defaultsd{
                      display: inline-block;
                      text-align:center;
                      width: 68px;
                      height: 26px;
                      background: #ABABAB;
                      color: $color-white;
                      font-size: 12px;
                      line-height: 26px;
                  }
                  .addres{
                      color: $color-input-focus;
                      cursor: pointer;
                  }
                  td{
                      border: none;
                  }
              }
            }

        }
        .confirmationOrder{
            position: relative;
            .tableboxtwo{
                padding: 20px 16px;
                .gy-table{
                  .imgPhone{
                      border: 1px solid $color-light;
                      display: inline-block;
                      text-align: center;
                      line-height: 85px;
                      img{
                          width: 70px;
                          margin: 10px;
                      }
                  }
              }
            }

            .confirmation{
                margin: 10px 0px 30px 1090px;
            }
        }
    }
</style>
