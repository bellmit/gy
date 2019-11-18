<template>
  <div class="commodity-main detail commodity-attribute">
    <div class="gy-h4">{{id ? '属性编辑' : '属性添加'}}</div>
    <form action="javascript:;" name="attributeAdd" class="gy-form-box-14">
      <div class="gy-form-group" style="height: 42px">
        <div class="l">属性名称</div>
        <input type="text" placeholder="请输入属性名称" v-model="attributeData.optionName">
      </div>
      <div class="gy-form-group">
        <div class="l">属性状态</div>
        <label><input type="radio" v-model="attributeData.valid" value="1" name="status">可用</label>
        <label><input type="radio" v-model="attributeData.valid" value="0" name="status">不可用</label>
      </div>
      <div class="gy-form-group">
        <div class="l">属性描述</div>
        <textarea v-model="attributeData.optionDescription" placeholder="请输入属性描述" class="gy-textarea"></textarea>
      </div>
      <div class="gy-form-group">
        <div class="l">属性值</div>
        <div class="add-item" v-for="(item, index) in attributeData.optionValueEntityList" :key="index">
          <el-row>
            <el-col :span="1"><i class="iconfont icon-minus" @click="remove(index)"></i></el-col>
            <el-col :span="20"><input type="text" placeholder="请输入属性值" v-model="item.optionValue"></el-col>
          </el-row>
          <!--<label><input type="radio" v-model="item.optionValueStatus" :name="'ov-status-' + index" value="1">可用</label>-->
          <!--<label><input type="radio" v-model="item.optionValueStatus" :name="'ov-status-' + index" value="0">不可用</label>-->
        </div>
        <i class="iconfont icon-add" @click="add"></i>
      </div>
      <div class="clear"></div>
      <div class="gy-button-group">
        <button href="javascript:;" class="gy-button-extra" @click="addAttribute">{{id ? '编辑' : '添加'}}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    data () {
        return {
            id: '',
            attributeData: {
                optionName: '',
                valid: 1,
                // skuRuleId: '',
                optionDescription: '',
                optionValueEntityList: []
            },
            categoryList: '',
            skuList: ''
        // isOptionValue: false
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.id && this.getDetail();
        this.getCategoryList();
        // this.getSkuList();
    },
    methods: {
        getCategoryList () {
            this.$http.post(this.$api.category.list)
                .then((res) => {
                    this.categoryList = res.data.data.list;
                });
        },
        // getSkuList () {
        //     let that = this;
        //     that.$http.post(that.$api.sku.list)
        //         .then((res) => {
        //             that.skuList = res.data.data.list;
        //         });
        // },
        getDetail () {
            this.$http.get(this.$api.attribute.add + '/' + this.id)
                .then((res) => {
                    let r = res.data.data;
                    this.attributeData = {
                        optionName: r.optionEntity.optionName,
                        // skuRuleId: r.optionEntity.skuRuleId,
                        valid: r.optionEntity.valid,
                        optionDescription: r.optionEntity.optionDescription,
                        optionValueEntityList: []
                    };
                    for (let i = 0; i < res.data.data.optionValueList.length; i++) {
                        this.attributeData.optionValueEntityList.push({'optionValue': r.optionValueList[i].optionValue});
                    }
                });
        },
        add () {
            this.attributeData.optionValueEntityList.push(
                {
                    optionValue: ''
                    // optionValueStatus: 1,
                    // id: ''
                }
            );
        },
        remove (idx) {
            this.attributeData.optionValueEntityList.splice(idx, 1);
        },
        addAttribute () {
            if (this.attributeData.optionName === '') {
                this.$message.error('请填写属性名称', '提示');
                return;
            }
            if (this.id) {
                this.attributeData.id = this.id;
                this.$http.put(this.$api.attribute.add, this.attributeData)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.$message.success('编辑成功');
                            this.$router.push({path: 'list'});
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                return;
            }
            this.$http.post(this.$api.attribute.add, this.attributeData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('添加成功');
                        this.$router.push({path: 'list'});
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.gy-form-box-14 {
   padding-top: 6px;
}
.gy-form-group {
    padding-left: 76px;
   .l {
      width: 66px;
   }
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 106px;
  .l {
    width: 96px;
    padding-left: 30px;
  }
}
.gy-button-group {
   padding: 10px 0 20px 0;
}
</style>
