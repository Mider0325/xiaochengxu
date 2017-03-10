//index.js
//获取应用实例
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    longitude:100,
    latitude:25,
    markers:[{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
     qqmapsdk = new QQMapWX({
            key: 'J6MBZ-MVCCW-S4YR3-OKKZA-VT4HS-NEBKB'
        });
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
      })
    })
    this.getLocation();
     qqmapsdk.search({
            keyword: '停车场',
            success: function (res) {
              console.log(res,tempArr);
              var tempArr=[];
              for(var i=0;i<res.data.length;i++){
                var tempObj={};
                tempObj.id=res.data[i].id;
                tempObj.title=res.data[i].title;
                tempObj.latitude=res.data[i].location.lat;
                tempObj.longitude=res.data[i].location.lng;
                tempObj.iconPath= "../../images/maker_normal.png";
                tempArr.push(tempObj);
              }
                that.setData({
                  markers:tempArr
              })
            },
            fail: function (res) {
                console.log(res);
            },
      });
    console.log(qqmapsdk);
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
         that.getMarkers(res.longitude,res.latitude);
      },
      "fail":function(res){
         wx.showToast({
          title:"定位失败",
          icon:'loading',
        })
      }
    })
  },
  getMarkers:function(longitude,latitude){
    // 获取覆盖物
    wx.request({
        url: 'https://127.0.0.1/mock/map.json', 
        data: {
          x: longitude,
          y: latitude
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data)
        }
    })
    console.log('get')
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123'
    }
  }
})
