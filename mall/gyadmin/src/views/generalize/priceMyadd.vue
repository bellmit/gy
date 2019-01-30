<template>
  <div style="width: 800px;margin-top: 30px;margin-left: 50px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="260px" class="demo-ruleForm">
      <el-form-item label="价格日期" prop="date1">
        <el-date-picker
          v-model="ruleForm.date1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Nymex WTI(美元/桶)" prop="value1">
        <el-input v-model="ruleForm.value1" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="DOP-张家港(元/吨)" prop="value2">
        <el-input v-model="ruleForm.value2" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="乙二醇_CFR中国主港(美元/吨)" prop="value3">
        <el-input v-model="ruleForm.value3" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="乙二醇_华东出罐价(元/吨)" prop="value4">
        <el-input v-model="ruleForm.value4" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="甲醇_CFR中国主港(美元/吨)" prop="value5">
        <el-input v-model="ruleForm.value5" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="二乙二醇_华东江苏出罐价(元/吨)" prop="value6">
        <el-input v-model="ruleForm.value6" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="乙烯_CFR 东北亚(美元/吨)" prop="value7">
        <el-input v-model="ruleForm.value7" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="丙烯_华东_江苏(元/吨)" prop="value8">
        <el-input v-model="ruleForm.value8" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="甲醇_华东江苏出罐价(元/吨)" prop="value9">
        <el-input v-model="ruleForm.value9" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="纯苯_CFR 中国主港(美元/吨)" prop="value10">
        <el-input v-model="ruleForm.value10" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="甲苯_华东_江苏(元/吨)" prop="value11">
        <el-input v-model="ruleForm.value11" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="苯乙烯_CFR中国主港(美元/吨)" prop="value12">
        <el-input v-model="ruleForm.value12" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="混合二甲苯_异构级_华东_江苏(元/吨)" prop="value13">
        <el-input v-model="ruleForm.value13" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item label="苯乙烯_华东出罐价(元/吨)" prop="value14">
        <el-input v-model="ruleForm.value14" placeholder="请输入热门价格"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="float: right" type="primary" @click="submitForm('ruleForm')" class="gy-button-extra">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: 'priceMyadd',
    data () {
        return {
            ydatalist: [],
            ruleForm: {
                date1: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                value6: '',
                value7: '',
                value8: '',
                value9: '',
                value10: '',
                value11: '',
                value12: '',
                value13: '',
                value14: ''
            },
            rules: {
                value1: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value2: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value3: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value4: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value5: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value6: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value7: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value8: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value9: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value10: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value11: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value12: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value13: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                value14: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        submitForm (formName) {
            var that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ydatalist = [
                        {
                            'indexName': 'Nymex WTI',
                            'indexNum': this.ruleForm.value1,
                            'indexDate': this.ruleForm.date1,
                            'unit': '1'
                        },
                        {
                            'indexName': 'DOP_张家港',
                            'indexNum': this.ruleForm.value2,
                            'indexDate': this.ruleForm.date1,
                            'unit': '0'
                        },
                        {
                            'indexName': '乙二醇_CFR中国主港',
                            'indexNum': this.ruleForm.value3,
                            'indexDate': this.ruleForm.date1,
                            'unit': '2'
                        },
                        {
                            'indexName': '乙二醇_华东出罐价',
                            'indexNum': this.ruleForm.value4,
                            'indexDate': this.ruleForm.date1,
                            'unit': '0'
                        },
                        {
                            'indexName': '甲醇_CFR中国主港',
                            'indexNum': this.ruleForm.value5,
                            'indexDate': this.ruleForm.date1,
                            'unit': '2'
                        },
                        {
                            'indexName': '二乙二醇_华东江苏出罐价',
                            'indexNum': this.ruleForm.value6,
                            'indexDate': this.ruleForm.date1,
                            'unit': '0'
                        },
                        {
                            'indexName': '乙烯_CFR 东北亚',
                            'indexNum': this.ruleForm.value7,
                            'indexDate': this.ruleForm.date1,
                            'unit': '2'
                        },
                        {
                            'indexName': '丙烯_华东_江苏',
                            'indexNum': this.ruleForm.value8,
                            'indexDate': this.ruleForm.date1,
                            'unit': '0'
                        },
                        {
                            'indexName': '甲醇_华东江苏出罐价',
                            'indexNum': this.ruleForm.value9,
                            'indexDate': this.ruleForm.date1,
                            'unit': '0'
                        },
                        {
                            'indexName': '纯苯_CFR 中国主港',
                            'indexNum': this.ruleForm.value10,
                            'indexDate': this.ruleForm.date1,
                            'unit': '2'
                        },
                        {
                            'indexName': '甲苯_华东_江苏',
                            'indexNum': this.ruleForm.value11,
                            'indexDate': this.ruleForm.date1,
                            'unit': '0'
                        },
                        {
                            'indexName': '苯乙烯_CFR中国主港',
                            'indexNum': this.ruleForm.value12,
                            'indexDate': this.ruleForm.date1,
                            'unit': '2'
                        },
                        {
                            'indexName': '混合二甲苯_异构级_华东_江苏',
                            'indexNum': this.ruleForm.value13,
                            'indexDate': this.ruleForm.date1,
                            'unit': '0'
                        },
                        {
                            'indexName': '苯乙烯_华东出罐价',
                            'indexNum': this.ruleForm.value14,
                            'indexDate': this.ruleForm.date1,
                            'unit': '0'
                        }
                    ];
                    this.$http.post(this.$api.market.priceSave, {
                        indexValueList: this.ydatalist
                    }).then(function (res) {
                        if (res.data.code === 0) {
                            that.$alert('保存成功', '操作成功').then(() => {
                                that.$router.push({name: 'generalize-price'});
                            });
                        } else {
                            that.$alert(res.data.message, '出错了');
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>

</style>
