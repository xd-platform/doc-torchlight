Modal: {
  type: '悬浮窗 - 装备精简信息',
  use: [
    '/inventory', // 装备页
  ]
}

Desc: {
  type: '详情 - 装备的描述',  // 【由于不通用，归属于Equip独有的组件】
  use: [
    '/inventory/:id/detail', // 装备详情页
  ]
}

AffixList: {
  type: '装备的描述 - 词缀列表',  // 【由于需要点击，显示词缀显示，所以抽离出来】
  use: [
    '/inventory', // 装备详情页 - modal
    '/inventory/:id/detail', // 装备详情页
  ]
}