const app = getApp()
const CONFIG = require('../../config.js')
const WXAPI = require('../../wxapi/main')
Page({
	data: {
    balance:0.00,
    freeze:0,
    score:0,
    score_sign_continuous:0,
    rechargeOpen: false // 是否开启充值[预存]功能
  },
	onLoad() {
    let rechargeOpen = wx.getStorageSync('RECHARGE_OPEN')
    if (rechargeOpen && rechargeOpen == "1") {
      rechargeOpen = true
    } else {
      rechargeOpen = false
    }
    this.setData({
      rechargeOpen: rechargeOpen
    })
	},	
  onShow() {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      app.goLoginPageTimeOut()
    } else {
      that.setData({
        userInfo: userInfo,
        version: CONFIG.version,
        vipLevel: app.globalData.vipLevel
      })
    }
    this.getUserApiInfo();
    this.getUserAmount();
  },
  aboutUs : function () {
    wx.showModal({
      title: '关于我们',
      content: '我们是深圳谷品生活科技（深圳）有限公司，依托于创办人多年来从事3C数码行业的丰富经验和深厚技术储备，谷品具有着行业最顶尖的技术和产品研发能力。',
      showCancel:false
    })
  },
  getPhoneNumber: function(e) {
    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        title: '提示',
        content: '无法获取手机号码:' + e.detail.errMsg,
        showCancel: false
      })
      return;
    }
    var that = this;
    WXAPI.bindMobile({
      token: wx.getStorageSync('token'),
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    }).then(function (res) {
      if (res.code === 10002) {
        app.goLoginPageTimeOut()
        return
      }
      if (res.code == 0) {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
        that.getUserApiInfo();
      } else {
        wx.showModal({
          title: '提示',
          content: '绑定失败',
          showCancel: false
        })
      }
    })
  },
  goLoginPageTimeOut: function() {
    if (this.navigateToLogin){
      return
    }
    wx.removeStorageSync('token')
    this.navigateToLogin = true
    setTimeout(function() {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)
  },
  getUserApiInfo: function () {
    var that = this;
    if (!wx.getStorageSync('token')) {
      that.goLoginPageTimeOut()
      return;
    }
    WXAPI.userDetail(wx.getStorageSync('token')).then(function (res) {
      if (res.code == 0) {
        let _data = {}
        _data.apiUserInfoMap = res.data
        if (res.data.base.mobile) {
          _data.userMobile = res.data.base.mobile
        }
        that.setData(_data);
      }
      if(res.code === 2000) {
        wx.navigateTo({
          url: "/pages/authorize/bindmobile"
        })
      } 
    })
  },
  getUserAmount: function () {
    var that = this;
    WXAPI.userAmount(wx.getStorageSync('token')).then(function (res) {
      if (res.code == 0) {
        that.setData({
          balance: res.data.balance.toFixed(2),
          freeze: res.data.freeze.toFixed(2),
          score: res.data.score
        });
      }
    })
  },
  relogin:function(){
    app.navigateToLogin = false;
    app.goLoginPageTimeOut()
  },
  goAsset: function () {
    wx.navigateTo({
      url: "/pages/asset/index"
    })
  },
  goScore: function () {
    wx.navigateTo({
      url: "/pages/score/index"
    })
  },
  goOrder: function (e) {
    wx.navigateTo({
      url: "/pages/order-list/index?type=" + e.currentTarget.dataset.type
    })
  }
})