import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'
import { addonWaline } from 'valaxy-addon-waline'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
  'i-ri-home-4-line',
  'i-ri-article-line',
  'i-ri-gallery-view',
  'i-ri-gallery-line',
  'i-ri-link',
  'i-ri-user-line',
  'i-ri-code-s-slash-line',
  'i-ri-code-box-line',
  'i-ri-genderless-line',
  'i-ri-group-line',
  'i-ri-women-line',
  'i-ri-heart-line',
  'i-ri-earth-line',
  'i-ri-qq-line',
  'i-ri-wechat-pay-line',
  'i-ri-alipay-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    // 'nimbo'（默认）或 'strato'
    type: 'nimbo',
    banner: {
      enable: true,
      title: '温铮的小站',
    },

    nav: [
      {
        text: '博客',
        link: '/posts/',
        icon: 'i-ri-article-line',
      },
      {
        text: '项目',
        link: '/projects/',
        icon: 'i-ri-code-box-line',
      },
      {
        text: '相册',
        link: '/albums/',
        icon: 'i-ri-gallery-line',
      },
      {
        text: '友链',
        link: '/links/',
        icon: 'i-ri-genderless-line',
      },
      {
        text: '看世界',
        link: '/world/',
        icon: 'i-ri-earth-line',
      },
      {
        text: '关于我',
        link: '/about/',
        icon: 'i-ri-user-line',
      }
    ],

    pages: [
      {
        name: '关于我',
        url: '/about/',
        icon: 'i-ri-user-line',
        color: '#6B8DE3',
      },
      {
        name: '项目',
        url: '/projects/',
        icon: 'i-ri-code-box-line',
        color: '#6B8DE3',
      },
      {
        name: '相册',
        url: '/albums/',
        icon: 'i-ri-gallery-line',
        color: '#67c23a',
      },
      {
        name: '友链',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '看世界',
        url: '/world/',
        icon: 'i-ri-earth-line',
        color: '#E74C3C',
      },
    ],

    footer: {
      since: 2022,
      beian: {
        enable: false,
        icp: '苏ICP备17038157号',
        police: '苏公网安备xxxxxx号',
      },
    },
  },

  unocss: { safelist },
  
  markdown: {
    // default material-theme-palenight
    // theme: 'material-theme-palenight',
    theme: {
      // light: 'material-theme-lighter',
      light: 'github-light',
      // dark: 'material-theme-darker',
      dark: 'github-dark',
    },

    blocks: {
      tip: {
        icon: 'i-carbon-thumbs-up',
        text: '提示',
        // langs: {
        //   'zh-CN': '提示',
        // },
      },
      warning: {
        icon: 'i-carbon-warning-alt',
        text: '注意',
      },
      danger: {
        icon: 'i-carbon-warning',
        text: '警告',
      },
      info: {
        text: 'información',
      },
    },

    codeTransformers: [
      // We use `[!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[!!code/g, '[!code')
        },
      },
    ],

    config(md) {
      // md.use(xxx)
    }
  },
  addons: [
    addonWaline({
      serverURL: 'https://waline-qiji.vercel.app',
      lang: 'zh-CN',
    }),
  ],
})
