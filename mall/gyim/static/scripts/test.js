var saveobj = {
  fromUserId: '123',
  toUserId: '1234',
  fromMobile: 18221205241,
  toMobile: 18221209341,
  content: '测试'
};
var jsonsave = JSON.stringify(saveobj);
$.ajax({
  type: "POST",
  url: 'http://192.168.33.232:8081/trade/logistics/v1/consignments/imInfos/single',
  async: true,
  dataType: "json",
  data: jsonsave,
  contentType: "application/json",
  success: function (datas) {
      console.log(datas);
  },
  error: function (data) {}
});
// $.ajax({
//   url:"http://goodfatherapp.com/classify/children?classifyId=2",
//   type:"get",
//   dataType: 'json',
//   success:function(data){
//     console.log(data);
//   }
// })
