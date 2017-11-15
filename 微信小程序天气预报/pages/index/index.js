//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    weekday:'周五',
    weekdays: ['周日','周一','周二','周三','周四','周五','周六'],
    district:'天河区',
    street:'林和路',
    now:{},
    forecast:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   var date = new Date();//当前系统时间
   date.setDate(date.getDate()+2);//将时间设成2天后
   var i = date.getDay();//星期几
   this.setData({//自动重新渲染页面
     weekday:this.data.weekdays[i]
   });

   //调用getAddress函数
   this.getAddress();
  },

  getAddress : function(){
    var that = this;
    wx.getLocation({
      type:'wgs84',
      success: function(res) {
        var lat = res.latitude;//纬度
        var lng = res.longitude;//经度

        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/', //接口地址
          data: {
            location:lat+','+lng,
            output: 'json',
            ak:'QgDjg59KnbdsL14plwnoP5rUAGKyDYPe'
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              district:res.data.result.addressComponent.district,
              street: res.data.result.addressComponent.street
            });

            //调用getWeather函数获取天气数据
            that.getWeather(res.data.result.addressComponent.district);
          }
        })
      }
    })
  },



  getWeather : function(city){
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.com/v5/weather',
      /*和风天气预报接口 */
      data: {
        city: city,
        key: '0db0ec37f8f84611ae94e49f17a6bd47'
      },
      header:{
        'content-type': 'application/json'
      },
      success : function(res){
        console.log(res);
        that.setData({
          now:res.data.HeWeather5["0"].now,
          forecast:res.data.HeWeather5["0"].daily_forecast
        })
      }
    })
  }
})
