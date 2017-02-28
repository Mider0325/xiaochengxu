//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    longitude:100,
    latitude:25
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
      })
    })
    this.getLocation();
  },
  getLocation:function(){
    // 获得当前位置
    var that = this
    wx.getLocation({
      "type":'wgs84',
      "success":function(res){
         that.setData({
           longitude:res.longitude,
           latitude:res.latitude
         });
      },
      "fail":function(res){
         wx.showToast({
          title:"定位失败",
          icon:'loading',
        })
      },
      "complete":function(res){
        console.log(res)
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123'
    }
  }
})
