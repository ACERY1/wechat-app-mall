module.exports = {
  version: "1.0",
  note: '初始化',
  subDomain: "helloyzy", // https://admin.it120.cc 登录后台首页的专属域名
  appid: "wx80e4a6a3cacdd492", // 您的小程序的appid，购物单功能需要使用
  shareProfile: '精选高质量商品, 实现每个人对于生活的期待', // 首页转发的时候话术
  // requireBindMobile: true, // 是否强制绑定手机号码才能使用
  // kanjiaRequirePlayAd: true // 是否必须要观看视频广告后才可以砍价
}
/*
根据自己需要修改下单时候的模板消息内容设置，可增加关闭订单、收货时候模板消息提醒；
1、/pages/to-pay-order/index.js 中已添加关闭订单、商家发货后提醒消费者；
2、/pages/order-details/index.js 中已添加用户确认收货后提供用户参与评价；评价后提醒消费者好评奖励积分已到账；
3、请自行修改上面几处的模板消息ID，参数为您自己的变量设置即可。  
*/