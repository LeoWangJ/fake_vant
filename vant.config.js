module.exports = {
  name: 'fake_vant',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/fake_vant/',
    },
  },
  site: {
    title: 'fake_vant',
    logo: 'https://img.yzcdn.cn/vant/logo.png',
    nav: [
      {
        title: '開發指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮',
          },
        ],
      },
      {
        title: '源碼研究',
        items: [
          {
            path: 'create',
            title: '開發組件',
          }
        ],
      },
    ],
  },
};
