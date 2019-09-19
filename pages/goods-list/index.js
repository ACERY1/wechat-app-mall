const WXAPI = require("../../wxapi/main");
const app = getApp();
const WxParse = require("../../wxParse/wxParse.js");
const regeneratorRuntime = require("../../utils/runtime");
const CONFIG = require("../../config.js");
const SelectSizePrefix = "选择：";

let videoAd = null; // 视频激励广告
Page({
  data: {
    shopList: [],
    nowFocus: 0,
    cateList: [],
    nowFocusCate: 0,
    goodsList: []
  },

  //事件处理函数
  swiperchange: function(e) {},
  async onLoad(e) {
    const that = this;
    const result = await WXAPI.getShopList();
    console.log(result.data);
    that.setData({
      shopList: result.data || []
    });

    const resp = await WXAPI.goodsCategory();
    console.log(resp);
    that.setData({
      cateList: resp.data || []
    });

    // 进页面默认触发 1 1
    that.getSefGoods();
  },
  async onShow() {
    if (app.globalData.nowFocus !== undefined && app.globalData.nowFocusCate !== undefined) {
      const that = this;
    const result = await WXAPI.getShopList();
    console.log(result.data);
    that.setData({
      shopList: result.data || []
    });

    const resp = await WXAPI.goodsCategory();
    console.log(resp);
    that.setData({
      cateList: resp.data || []
    });
    console.log(app.globalData);
    that.setData({
      nowFocus: app.globalData.nowFocus || 0,
      nowFocusCate: app.globalData.nowFocusCate || 0
    });
    that.getSefGoods();
    app.globalData.nowFocus = undefined
    app.globalData.nowFocusCate = undefined
    }
  },

  changeFocus: function(e) {
    this.setData({
      nowFocus: e.currentTarget.dataset.index
    });
    this.getSefGoods();
  },
  changeFocusCate: function(e) {
    this.setData({
      nowFocusCate: e.currentTarget.dataset.index
    });
    this.getSefGoods();
  },
  // 获取指定类别+店铺产品
  getSefGoods: async function() {
    const { shopList, cateList, nowFocus, nowFocusCate } = this.data;
    const result = await WXAPI.goods({
      shopId: shopList[nowFocus].id,
      categoryId: cateList[nowFocusCate].id
    });
    console.log(result.data);
    this.setData({
      goodsList: result.data || []
    });
  },
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    });
  }
});
