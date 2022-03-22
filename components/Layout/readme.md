CardList: {
  type: '布局 - 卡片列表',
  use: [
    '/inventory', // 装备页
  ]
}

Cell: {
  type: '布局 - 标题内容Box',
  use: [
    '/inventory/:id/detail', // 装备详情页
  ]
}

Wrapper: {
  type: '布局 - 主体区域',
  use: [
    '/inventory', // 装备页
  ]
}