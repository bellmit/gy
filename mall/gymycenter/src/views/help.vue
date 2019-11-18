<template>
  <div class="help-page">
     <div class="help-left">
          <div class="help-item" v-for="(item, index) in navData" :key="index">
              <div :class="activeIndex==index?'current': ''" >
                 <div @click='changeNav(index)' class="help-title">{{item.name}}</div>
                 <ul class="sub-list">
                   <li @click="selectHelp(subItem.name,subItem.id,item.name)" v-for="(subItem,subIndex) in item.helpTopicsModelList" :key="subIndex">{{subItem.name}}</li>
                 </ul>
              </div>
          </div>
     </div>
      <div class="help-right">
        <div class="help-right-top">
           <span>首页&nbsp;>&nbsp;帮助中心&nbsp;>&nbsp;{{navName.name}}</span><span style="color:#333">&nbsp;{{navName.subName?'> '+navName.subName: ''}}</span>
        </div>
        <div class="help-right-title">{{navName.subName}}</div>
        <div class="ql-editor help-content" v-html="helpContent"></div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            activeIndex: '',
            helpContent: '',
            navData: [
                {
                    name: '账户问题',
                    suhelpTopicsModelList: [
                        {
                            name: '钱多久到账',
                            path: ''
                        },
                        {
                            name: '钱是否安全',
                            path: ''
                        },
                        {
                            name: '钱有多少',
                            path: ''
                        }
                    ]
                },
                {
                    name: '账户问题',
                    helpTopicsModelList: [
                        {
                            name: '钱多久到账',
                            path: ''
                        },
                        {
                            name: '钱是否安全',
                            path: ''
                        },
                        {
                            name: '钱有多少',
                            path: ''
                        }
                    ]
                }
            ],
            navName: {
                name: '',
                subName: ''
            }
        };
    },
    methods: {
        changeNav (index) {
            (!this.navName.subName) && (this.navName.name = this.navData[index].name);
            if (this.activeIndex === index) {
                this.activeIndex = -1;
            } else {
                this.activeIndex = index;
            }
        },
        getHelpList () {
            this.$http.get(this.$api.helps.helpList)
                .then(res => {
                    if (res.data.code === 0) {
                        this.navData = res.data.data;
                        this.navName.name = this.navData[0].name;
                        let list = this.navData[0].helpTopicsModelList;
                        list.length > 0 && (this.navName.subName = list[0].name);
                        list.length > 0 && this.selectHelp(this.navName.subName, list[0].id, this.navName.name);
                    }
                });
        },
        selectHelp (name, id, parentName) {
            this.navName.subName = name;
            this.navName.name = parentName;
            this.$http.get(this.$api.helps.helpItem + id)
                .then(res => {
                    if (res.data.code === 0) {
                        if (res.data.data.content === null) {
                            this.helpContent = res.data.data.content;
                        } else {
                            let help = '';
                            help = res.data.data.content;
                            this.helpContent = help.replace(/&nbsp;/ig, '');
                        }
                    }
                });
        }
    },
    created () {
        this.getHelpList();
    }
};

</script>
<style lang="scss" scoped>
    .help-page {
     width: 1200px;
     margin: 10px auto;
     .help-left {
      width: 240px;
      display: inline-block;
      background: #E1E1E1;
      font-size: 16px;
      color: #333;
      vertical-align: top;
      .help-item {
          cursor: pointer;
          &>div {
              max-height: 44px;
              overflow: hidden;
             transition: max-height .2s;

          }
        .current {
             max-height:2000px!important;
            transition: max-height 1s;

         }
         .help-title{
          height: 44px;
          line-height: 44px;
          padding: 0 15px;
          border-bottom:1px solid #fff;
        }
        .sub-list li {
          border-bottom:1px dashed #ccc;
           height: 44px;
          line-height: 44px;
          padding: 0 30px;
          color: #2A2A2A ;
          background-color: #fff;
          &:last-child {
               border-bottom: none;
          }
        }
      }
     }
     .help-right {
         width: 940px;
         margin-left:7px ;
         display: inline-block;
         vertical-align: top;
         .help-right-top {
             width: 100%;
             background-color: #fff;
             padding-left: 16px;
             line-height: 35px;

         }
         .help-right-title {
             width: 100%;
              background-color: #fff;
             padding-left: 16px;
             line-height: 35px;
             color: #333;
             font-size: 16px;
             margin: 7px 0px ;
         }
        .help-content {
            background-color: #fff;
            width: 100%;
            min-height: 800px;
            padding: 15px;
            /deep/ *{
                font-size: 14px !important;
                font-family: 'Microsoft YaHei' !important;
            }
            /deep/ img{
                width: 100% !important;
                height: auto !important;
            }
        }
     }
   }
</style>
