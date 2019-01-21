<template>
  <div class="approval">
      <div class="gy-form first_div">
        <h3><i class="el-icon-tickets"></i> 公司信息</h3>
        <div class="gy-form-group">
            <span class="l"> <strong v-if="groupId===0">*</strong>注册日期:</span>
            <el-date-picker
                class="form-date"
                v-model="form.registrationDate"
                type="date"
                placeholder="选择日期"
                v-if="groupId===0">
            </el-date-picker>
            <span v-else>{{form.registrationDate | date|dataFormat}}</span>
        </div>
        <div class="gy-form-group ">
            <span class="l"> <strong v-if="groupId===0">*</strong>注册资本(万元):</span>
            <div   v-if="groupId===0">
                  <input class="gy-input row_half" type="number" v-model.number="form.registeredCapital" placeholder="请填写">
                  <el-select  class="row_half" v-model="form.registeredCapitalCurrencyId"  placeholder="请填写">
                        <el-option
                        v-for="item in currencyList"
                        :key="item.id"
                        :label="item.displayName"
                        :value="item.id">
                        </el-option>
                 </el-select>
            </div>
            <span v-else>{{form.registeredCapital|dataFormat}}{{filterCurrency(form.registeredCapitalCurrencyId)}}</span>
        </div>
         <div class="gy-form-group">
            <span class="l">工商登记异常:</span>
            <input v-if="groupId===0" class="gy-input" v-model.number="form.registrationAbnormality" placeholder="请填写">
            <span v-else>{{form.registrationAbnormality|dataFormat}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">实缴资本(万元):</span>
            <div   v-if="groupId===0">
                  <input class="gy-input row_half" type="number" v-model.number="form.realCapital" placeholder="请填写">
                 <el-select  class="row_half" v-model="form.realCapitalCurrencyId"  placeholder="请填写">
                        <el-option
                        v-for="item in currencyList"
                        :key="item.id"
                        :label="item.displayName"
                        :value="item.id">
                        </el-option>
                </el-select>
            </div>
            <span v-else>{{form.realCapital|dataFormat}}{{filterCurrency(form.realCapitalCurrencyId)}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">法定代表人姓名:</span>
            <input v-if="groupId===0" class="gy-input" v-model="form.legalPerson" placeholder="请填写">
            <span v-else>{{form.legalPerson|dataFormat}}</span>
        </div>
    </div>
     <div class="gy-form myDashed" v-for="(item, index) in form.ratingApprovalShareholderModel" :key="index+100">
            <h3><i class="el-icon-tickets"></i> 股东情况</h3>
            <div class="gy-form-group">
                <span class="l">股东姓名{{index+1}}:</span>
                <input v-if="groupId===0" class="gy-input" v-model="item.shareholderName"  placeholder="请填写">
                <span v-else>{{item.shareholderName|dataFormat}}</span>
            </div>
            <div class="gy-form-group ">
                <span class="l">股东类型:</span>
                <el-select  v-if="groupId===0" v-model="item.shareholderTypeId"  placeholder="请填写">
                        <el-option
                        v-for="item in shareholderList"
                        :key="item.id"
                        :label="item.shareholderTypeName"
                        :value="item.id">
                        </el-option>
                </el-select>
                <span v-else>{{filterShareholder(item.shareholderTypeId)|dataFormat}}</span>
            </div>
             <div class="gy-form-group">
                <span class="l">认缴金额(万元):</span>
                <div   v-if="groupId===0">
                    <input class="gy-input row_half" type="number" v-model.number="item.subscribedAmount" placeholder="请填写">
                    <el-select  class="row_half" v-model="item.subscribedAmountCurrencyId"  placeholder="请填写">
                            <el-option
                            v-for="item in currencyList"
                            :key="item.id"
                            :label="item.displayName"
                            :value="item.id">
                            </el-option>
                    </el-select>
                </div>
                <span v-else>{{item.subscribedAmount|dataFormat}}{{filterCurrency(item.subscribedAmountCurrencyId)}}</span>
            </div>
             <div class="gy-form-group">
                <span class="l">认缴占比(%):</span>
                <input v-if="groupId===0" class="gy-input" v-model.number="item.subscribedRatio"  placeholder="请填写">
                <span v-else>{{item.subscribedRatio|dataFormat}}</span>
            </div>
             <div class="gy-form-group">
                <span class="l">实缴金额(万元):</span>
                 <div   v-if="groupId===0">
                    <input class="gy-input row_half" type="number" v-model.number="item.realAmount" placeholder="请填写">
                    <el-select  class="row_half" v-model="item.realAmountCurrencyId"  placeholder="请填写">
                            <el-option
                            v-for="item in currencyList"
                            :key="item.id"
                            :label="item.displayName"
                            :value="item.id">
                            </el-option>
                    </el-select>
                </div>
                <span v-else>{{item.realAmount|dataFormat}}{{filterCurrency(item.realAmountCurrencyId)}}</span>
            </div>
             <div class="gy-form-group">
                <span class="l">实缴占比(%):</span>
                <input v-if="groupId===0" class="gy-input" v-model.number="item.realRatio"  placeholder="请填写">
                <span v-else>{{item.realRatio|dataFormat}}</span>
            </div>
             <div class="gy-form-group">
                <span class="l">缴纳类型:</span>
                 <el-select   v-if="groupId===0" v-model="item.payTypeId"  placeholder="请填写">
                        <el-option
                        v-for="item in payTypeList"
                        :key="item.id"
                        :label="item.payTypeName"
                        :value="item.id">
                        </el-option>
                </el-select>
                <span v-else>{{filterpayType(item.payTypeId)|dataFormat}}</span>
            </div>
          <div class="plus_share_holder" v-if="form.ratingApprovalShareholderModel.length>1&&groupId===0"><i  @click="deleteShareHolder(index)" class="el-icon-remove"></i></div>
    </div>
     <div class="plus_share_holder" v-if="groupId===0" ><i @click="addShareHolder" class="el-icon-circle-plus"></i></div>
     <div class="gy-form myDashed" v-for="(item, index) in form.ratingApprovalCompanyXrefModel" :key="index+1">
        <h3><i class="el-icon-tickets"></i> 关联公司情况</h3>
        <div class="gy-form-group">
            <span class="l">关联公司{{index+1}}:</span>
            <input v-if="groupId===0" class="gy-input" v-model="item.relCompanyName"  placeholder="请填写">
            <span v-else>{{item.relCompanyName|dataFormat}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">类型:</span>
            <input v-if="groupId===0" class="gy-input" v-model="item.relCompanyType" cols="30" rows="10" placeholder="请填写">
            <span v-else>{{item.relCompanyType|dataFormat}}</span>
        </div>
         <div class="gy-form-group">
            <span class="l">注册资本(万元):</span>
             <div   v-if="groupId===0">
                <input class="gy-input row_half" type="number" v-model.number="item.registeredCapital" placeholder="请填写">
                <el-select  class="row_half" v-model="item.registeredCapitalCurrencyId"  placeholder="请填写">
                        <el-option
                        v-for="item in currencyList"
                        :key="item.id"
                        :label="item.displayName"
                        :value="item.id">
                        </el-option>
                </el-select>
            </div>
            <span v-else>{{item.registeredCapital|dataFormat}}{{filterCurrency(item.registeredCapitalCurrencyId)|dataFormat}}</span>
        </div>
         <div class="gy-form-group">
            <span class="l">法人:</span>
            <input v-if="groupId===0" class="gy-input" v-model="item.legalPerson" cols="30" rows="10" placeholder="请填写">
            <span v-else>{{item.legalPerson|dataFormat}}</span>
        </div>
         <div class="gy-form-group">
            <span class="l">注册时间:</span>
            <el-date-picker
                class="form-date"
                v-model="form.registrationDate"
                type="date"
                placeholder="选择日期"
                v-if="groupId===0">
            </el-date-picker>
            <span v-else>{{form.registrationDate | date|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">备注:</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="item.remark" cols="30" rows="10" placeholder="请填写"></textarea>
            <span  class="set_border" v-else>{{item.remark|dataFormat}}</span>
        </div>
        <div class="plus_share_holder" v-if="form.ratingApprovalCompanyXrefModel.length>1&&groupId===0"><i  @click="deleteCompany(index)" class="el-icon-remove"></i></div>
    </div>
     <div class="plus_share_holder" v-if="groupId===0"><i  @click="addCompany" class="el-icon-circle-plus"></i></div>
     <div class="gy-form" >
        <div class="gy-form-group single-row ">
            <span class="l">企业经营范围:</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.productionStatus" cols="30" rows="10" placeholder="请填写"></textarea>
            <span class="set_border" v-else>{{form.productionStatus|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">对外投资或集团化公司关联关系:</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.companyInvestmentRelation" cols="30" rows="10" placeholder="请填写"></textarea>
            <span  class="set_border" v-else>{{form.companyInvestmentRelation|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">实际控制公司关联关系:</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.realControlCompanyRelation" cols="30" rows="10" placeholder="请填写"></textarea>
            <span  class="set_border" v-else>{{form.realControlCompanyRelation|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">其他疑似关联公司:</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.otherRelationCompany" cols="30" rows="10" placeholder="请填写"></textarea>
            <span  class="set_border" v-else>{{form.otherRelationCompany|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">动产融资情况:</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.movableFinancing" cols="30" rows="10" placeholder="请填写"></textarea>
            <span  class="set_border" v-else>{{form.movableFinancing|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">股权质押情况:</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.equityPledge" cols="30" rows="10" placeholder="请填写"></textarea>
            <span   class="set_border" v-else>{{form.equityPledge|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">担保与被担保情况:</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.guarantee" cols="30" rows="10" placeholder="请填写"></textarea>
            <span  class="set_border" v-else>{{form.guarantee|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">涉诉及执行情况(重大经济合同纠纷):</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.litigation" cols="30" rows="10" placeholder="请填写"></textarea>
            <span   class="set_border" v-else>{{form.litigation|dataFormat}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">行政处罚情况(税务及环保等):</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.administrativePenalties" cols="30" rows="10" placeholder="请填写"></textarea>
            <span  class="set_border" v-else>{{form.administrativePenalties|dataFormat}}</span>
        </div>
      </div>
      <div v-if="groupId === 0" class="gy-form-group single-row btn-wrap">
            <button class="gy-button-normal bgColor m-l" @click="submit(1)">保存</button>
     </div>
  </div>
</template>
<script>
export default {
    props: ['groupId'], // 0经理   1总监   2总经理
    data () {
        return {
            form: {
                companyId: this.$route.query.ratingCompanyId,
                currentUserId: JSON.parse(localStorage.getItem('userInfo')).id,
                // rskRatingTaskId: this.$route.query.rskRatingTaskId, // 评级任务ID
                registrationDate: '', // 注册日期
                registeredCapital: '', // 注册资本
                registeredCapitalCurrencyId: '', // 注册资本币种
                realCapital: '', // 实缴资本
                realCapitalCurrencyId: '', // 实缴资本币种
                registrationAbnormality: '', // 工商登记异常
                legalPerson: '', // 法人
                shareholder: '', // 股东情况
                movableFinancing: '', // 动产融资情况
                productionStatus: '', // 企业生产情况介绍
                companyInvestmentRelation: '', // 对外投资或集团化公司关联关系
                otherRelationCompany: '', // 其他疑似关联公司
                iSubmit: '',
                realControlCompanyRelation: '',
                ratingApprovalShareholderModel: [
                    {
                        payTypeId: '', // "缴纳类型",
                        realAmount: '', //  "实缴金额",
                        realAmountCurrencyId: '', // 实缴金额币种
                        realRatio: '', // "实缴占比",
                        shareholderName: '', //  "股东姓名",
                        shareholderTypeId: '', // "股东类型",
                        subscribedAmount: '', //  "认缴金额",
                        subscribedAmountCurrencyId: '', //  "认缴金额币种",
                        subscribedRatio: '' //  "认缴占比",
                    }
                ],
                ratingApprovalCompanyXrefModel: [
                    {
                        relCompanyName: '', // "关联公司名称",
                        relCompanyType: '', // "关联公司类型",
                        registeredCapital: '', // 注册资本
                        legalPerson: '', // 法人
                        registrationDate: '', // 注册时间
                        remark: '' //  备注
                    }
                ]
            },
            // 当前评级
            // groupId: 0, // 0经理   1总监   2总经理
            ratingApprovalShareholderModel: [
                {
                    payType: '', // "缴纳类型",
                    realAmount: '', //  "实缴金额",
                    realRatio: '', // "实缴占比",
                    shareholderName: '', //  "股东姓名",
                    shareholderType: '', // "股东类型",
                    subscribedAmount: '', //  "认缴金额",
                    subscribedRatio: '' //  "认缴占比",
                }
            ],
            ratingApprovalCompanyXrefModel: [
                {
                    relCompanyName: '', // "关联公司名称",
                    relCompanyType: '' // "关联公司类型",
                }
            ],
            companyId: '',
            shareholderList: [],
            payTypeList: [],
            currencyList: [{currencyMark: '¥'}, {currencyMark: '$'}]
        };
    },
    methods: {
        // 总监初始化页面
        initRatingInfo () {
            this.companyId = this.$route.query.ratingCompanyId;
            this.$http.get(this.$api.approval.ratingInfo + this.companyId).then((res) => {
                if (res.data.code === 0) {
                    this.form = res.data.data;
                    this.form.companyId = this.$route.query.ratingCompanyId;
                    this.form.applyCompanyId = this.$route.params.applyCompanyId;
                    if (!this.form.ratingApprovalShareholderModel) {
                        this.form.ratingApprovalShareholderModel = this.ratingApprovalShareholderModel;
                    }
                    if (!this.form.ratingApprovalCompanyXrefModel) {
                        this.form.ratingApprovalCompanyXrefModel = this.ratingApprovalCompanyXrefModel;
                    }
                } else if (this.groupId === 0) {
                    this.$message(res.data.message);
                }
                this.searchCurrencyList();
                this.searchShareholderType();
                this.searchPayTypeList();
            });
        },
        searchShareholderType () {
            this.$http.get(this.$api.approval.searchShareholderType).then((res) => {
                if (res.data.code === 0) {
                    this.shareholderList = res.data.data;
                } else if (this.groupId === 0) {
                    this.$message(res.data.message);
                }
            });
        },
        searchPayTypeList () {
            this.$http.get(this.$api.approval.payTypeList).then((res) => {
                if (res.data.code === 0) {
                    this.payTypeList = res.data.data;
                } else if (this.groupId === 0) {
                    this.$message(res.data.message);
                }
            });
        },
        searchCurrencyList () {
            this.$http.get(this.$api.approval.currencyList).then((res) => {
                if (res.data.code === 0) {
                    this.currencyList = res.data.data;
                } else if (this.groupId === 0) {
                    this.$message(res.data.message);
                }
            });
        },
        addShareHolder () {
            let data = {
                payType: '', // "缴纳类型",
                realAmount: '', //  "实缴金额",
                realRatio: '', // "实缴占比",
                shareholderName: '', //  "股东姓名",
                shareholderType: '', // "股东类型",
                subscribedAmount: '', //  "认缴金额",
                subscribedRatio: '' //  "认缴占比",
            };
            this.form.ratingApprovalShareholderModel.push(data);
        },
        deleteShareHolder (index) {
            this.form.ratingApprovalShareholderModel.splice(index, 1);
        },
        addCompany () {
            let data = {
                relCompanyName: '', // "关联公司名称",
                relCompanyType: '' // "关联公司类型",
            };
            this.form.ratingApprovalCompanyXrefModel.push(data);
        },
        deleteCompany (index) {
            this.form.ratingApprovalCompanyXrefModel.splice(index, 1);
        },
        filterCurrency (id) {
            let data = '';
            this.currencyList.forEach((element, index, arr) => {
                if (id === element.id) {
                    data = element.currencyMark;
                }
            });
            return data;
        },
        filterpayType (id) {
            let data = '';
            this.payTypeList.forEach((element, index, arr) => {
                if (id === element.id) {
                    data = element.payTypeName;
                }
            });
            return data;
        },
        filterShareholder (id) {
            let data = '';
            this.shareholderList.forEach((element, index, arr) => {
                if (id === element.id) {
                    data = element.shareholderTypeName;
                }
            });
            return data;
        },
        // 提交弹出层form
        submit (type) {
            if (!this.form.registrationDate) {
                this.$message('日期不能为空');
                return false;
            } else if (!this.form.registeredCapital) {
                this.$message('注册资本不能为空');
                return false;
            } else if (!this.form.companyId) {
                this.$message('被核准的公司不能为空');
                return false;
            }
            // 1.保存 2提交
            // if (type === 1) {
            //     this.form.iSubmit = 1;
            // } else {
            this.form.iSubmit = 2;
            // }
            this.$http.post(this.$api.approval.addForm, this.form).then((res) => {
                if (res.data.code === 0) {
                    this.$message('提交成功');
                    this.$router.push({name: 'checkList'});
                } else {
                    this.$message(res.data.message);
                }
            });
        }
    },
    created () {
        this.initRatingInfo();
    },
    filters: {
        dataFormat (data) {
            if (!data) {
                return '-';
            } else {
                return data;
            }
        }
    }
};
</script>
<style scoped lang="scss">
    h3{margin: 13px 0 5px; font-size: 16px;}
.approval {
  height: 100%;
  min-width: 800px;
  background-color: #fff;
  padding-bottom: 100px;
  .form-date,input,textarea {
    color: #999999;
    background-color: #fff;
  }
  textarea{font-family: "Microsoft YaHei"}

  /*.isRequired::before {*/
        /*content: "*";*/
        /*color: #f56c6c;*/
        /*margin-right: 4px;*/
    /*}*/
   .first_div {
        padding-top: 0;
   }
  .gy-form-group {
    padding: 0px 40px 30px 108px;
 }
 .row_half {
     width: 49%;
 }
  .btn-wrap {
    text-align: right;
    .m-l {
      font-size: 14px;
      color: #666666;
      margin-right: 10px;
    }
    .m-r {
      border-radius: 2px;
    }
    .bgColor {
      color: #fff;
      background: #F2AC4C;
    }
  }
  .tips {
      padding-top: 10px;
      font-size: 12px;
      float: left;
      .t {
        color: #F2AC4C;
      }
  }
  .my-form {
      padding: 0;
  }
  .my-dialog {
      .title {
          font-size: 18px;
          color: #333333;
          margin-bottom: 10px;
      }
      .t-2 {
        margin-top: 20px;
      }
  }
  .gy-form-group {
      padding:  0px 40px 10px 134px;;
      .l {
        width: 128px;
        top:0;
       }
  }
  .myDashed {
     border-top:1px dashed #E7ECF1;
    //  border-bottom:1px dashed #E7ECF1;
  }
  .plus_share_holder {
    text-align: right;
    font-size: 30px;
    color: #ccc;
    cursor:pointer;
  }
   .set_border {
     display: inline-block;
     width: 80%;
     min-height: 50px;
     border:1px solid #E7ECF1;
     margin-top:10px ;
     white-space:pre-wrap;
  }
}
</style>
