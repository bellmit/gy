<template>
  <div class="commodity-main">
    <div class="gy-h4">参数查看</div>
    <div class="gy-form-box-14">
      <div class="gy-form-group">
        <span class="l">参数名称</span>
        <span>{{parameterInfo.propertyEntity.propertyName}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">参数状态</span>
        <span>{{parameterInfo.propertyEntity.valid === 1 ? '可用' : '不可用'}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">参数描述</span>
        <span>{{parameterInfo.propertyEntity.propertyDesc}}</span>
      </div>
    </div>
    <table class="gy-table">
      <thead>
      <tr>
        <th>参数值</th>
        <td>参数值状态</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in parameterInfo.propertyEntityList" :key="index">
        <th>{{item.propertyValue}}</th>
        <th>可用</th>
        <!--<td>{{item.propertyValueStatus === 1 ? '可用' : '不可用'}}</td>-->
      </tr>
      </tbody>
    </table>
    <div class="gy-button-group">
      <button type="button" @click="$router.push({path: 'list'})" class="gy-button-extra">返回列表</button>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            id: '',
            parameterInfo: {}
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
                    this.parameterInfo = res.data.data;
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.gy-form-group {
  padding-left: 76px;
  .l {
    width: 56px;
  }
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 106px;
  .l {
    width: 86px;
    padding-left: 30px;
  }
}
.gy-form-box-14 {
  padding: 5px 14px;
  &:after {
    display: block;
    content: ' ';
    clear: both;
  }
}
.gy-button-group {
  padding: 20px 0;
}
</style>
