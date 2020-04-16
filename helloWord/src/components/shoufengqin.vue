<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
      <template slot-scope="scope">
<!--        <span v-if="scope.row.contractType === 1"></span>-->
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title" style="line-height: 23px!important;">
                {{scope.row.data[0].name}}0<br>
                {{scope.row.data[1].name}}1
<!--              <i class="header-icon el-icon-info"></i>-->
            </template>
            <template v-for="(item, idx) in scope.row.data">
                <div v-if="![0, 1].includes(idx)" :key="idx">{{item.name}}{{idx}}</div>
            </template>
          </el-collapse-item>
        </el-collapse>
      </template>
    </el-table-column>
<!--    <el-table-column-->
<!--      label="类别"-->
<!--      width="70">-->
<!--      <template slot-scope="scope">-->
<!--        <span v-if="scope.row.contractType === 1">采购<br>销售</span>-->
<!--        <span v-if="scope.row.contractType === 2">采购</span>-->
<!--        <span v-if="scope.row.contractType === 3">销售</span>-->
<!--      </template>-->
<!--    </el-table-column>-->
  </el-table>
</template>

<script>
    export default {
        name: "shoufengqin",
        data() {
          return {
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              data: [{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据2016-05-02'
              }]
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄',
              data: [{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据2016-05-04'
              }]
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              data: [{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据2016-05-01'
              }]
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
              data: [{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据'
              },{
                name: '数据2016-05-03'
              }]
            }]
          }
        }
    }
</script>

<style scoped lang='scss'>
  /deep/ .el-collapse-item__header {
    line-height: 23px!important;
  }
  /deep/ .el-collapse-item__content ,
  /deep/ .el-collapse-item__header{
    transition: background-color .25s ease;
    
  }
  /deep/ .el-table__body tr:hover > td .el-collapse-item__header,
  /deep/ .el-table__body tr:hover > td .el-collapse-item__content {
    background-color: #F5F7FA!important;
  }
  /deep/ .el-collapse {
    border-top-width: 0;
    border-bottom-width: 0;
  }
</style>
