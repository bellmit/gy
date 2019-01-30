<template>
    <div class="commodity-main detail commodity-attribute">
        <div class="gy-h4">{{id ? '参数编辑' : '参数添加'}}</div>
        <form action="javascript:;" name="attributeAdd" class="gy-form-box-14">
          <div class="gy-form-group" style="height: 42px">
            <div class="l">参数名称</div>
            <input type="text" placeholder="请输入参数名称" v-model="parameterData.propertyName">
          </div>
          <div class="gy-form-group">
            <div class="l">参数状态</div>
            <label><input type="radio" v-model="parameterData.valid" value="1" name="status">可用</label>
            <label><input type="radio" v-model="parameterData.valid" value="0" name="status">不可用</label>
          </div>
          <div class="gy-form-group">
            <div class="l">参数描述</div>
            <textarea v-model="parameterData.propertyDesc" placeholder="请输入参数描述" class="gy-textarea"></textarea>
          </div>
          <div class="gy-form-group">
            <div class="l">参数值</div>
            <div class="add-item" v-for="(item, index) in parameterData.propertyValueEntityList" :key="index">
              <el-row>
                <el-col :span="1" style="width: 18px"><i class="iconfont icon-minus" @click="remove(index)"></i></el-col>
                <el-col :span="22"><input type="text" placeholder="请输入参数值" v-model="item.propertyValue"></el-col>
              </el-row>
              <!--<label><input type="radio" v-model="item.propertyValueStatus" :name="'pv-status-' + index" value="1">可用</label>-->
              <!--<label><input type="radio" v-model="item.propertyValueStatus" :name="'pv-status-' + index" value="0">不可用</label>-->
            </div>
            <i class="iconfont icon-add" @click="add"></i>
          </div>
          <div class="clear"></div>
          <div class="gy-button-group">
            <button class="gy-button-extra" @click="addParameter">{{id ? '编辑' : '添加'}}</button>
          </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            id: '',
            parameterData: {
                propertyName: '',
                valid: 1,
                propertyDesc: '',
                propertyValueEntityList: [
                    {
                        propertyValue: ''
                        // propertyValueStatus: 1,
                        // id: null
                    }
                ]
            }
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.id && this.getDetail();
    },
    methods: {
        getDetail () {
            this.$http.get(this.$api.parameter.add + '/' + this.id)
                .then((res) => {
                    let r = res.data.data;
                    this.parameterData = {
                        propertyName: r.propertyEntity.propertyName,
                        valid: r.propertyEntity.valid,
                        propertyDesc: r.propertyEntity.propertyDesc,
                        propertyValueEntityList: r.propertyEntityList
                    };
                });
        },
        add () {
            this.parameterData.propertyValueEntityList.push(
                {
                    propertyValue: ''
                    // propertyValueStatus: 1,
                    // id: null
                }
            );
        },
        remove (idx) {
            this.parameterData.propertyValueEntityList.splice(idx, 1);
        },
        addParameter () {
            // let isParameterValue = false;
            for (let i = 0; i < this.parameterData.propertyValueEntityList.length; i++) {
                if (!this.parameterData.propertyValueEntityList[i].propertyValue) {
                    // isParameterValue = false;
                    break;
                } else {
                    // isParameterValue = true;
                }
            }
            if (!this.parameterData.propertyName) {
                this.$message.error('请填写参数名称');
                return;
            }
            // if (!that.parameterData.propertyEntity.propertyDesc) {
            //     that.$message.error('请填写参数描述');
            //     return;
            // }
            // if (that.propertyValueList.length < 1 || !isParameterValue) {
            //     that.$message.error('请填写参数值');
            //     return;
            // }
            if (this.id) {
                this.parameterData.id = this.id;
                this.$http.put(this.$api.parameter.add, this.parameterData)
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
            this.$http.post(this.$api.parameter.add, this.parameterData)
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
.gy-form-group {
  padding-left: 66px;
  .l {
    width: 56px;
  }
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 96px;
  .l {
    width: 86px;
    padding-left: 30px;
  }
}
.gy-button-group {
  padding: 10px 0 20px 0;
}
.gy-form-box-14 {
   padding-top: 4px;
}
</style>
