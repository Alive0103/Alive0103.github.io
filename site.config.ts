import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://alive0103.github.io/',
  lang: 'zh-CN',
  title: '温铮的小站',
  author: {
    name: '王越洋',
    email: '972477867@qq.com',
    avatar: 'http://wyy-alive-0o0.oss-cn-beijing.aliyuncs.com/avatar.png',
    status: {
      emoji: '❤️',
      message: 'NLP爱好者，拓宽边界中......',
    },
    intro: '这有关于产品、设计、开发相关的问题和看法，还有对新奇世界的记录。\n 有思想的灵魂永远炽热，而恰恰我们是如此志同道合。'
  },
  description: '我于荒颓中睁眼，亦在灰烬里重燃',
  subtitle: '和有意思的人，做有意义的事！',
  favicon: 'http://wyy-alive-0o0.oss-cn-beijing.aliyuncs.com/avatar.png',
  social: [
    // {
    //   name: 'RSS',
    //   link: '/atom.xml',
    //   icon: 'i-ri-rss-line',
    //   color: 'orange',
    // },
    {
      name: 'GitHub',
      link: 'https://github.com/Alive0103',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'QQ 972477867',
      link: 'http://wyy-alive-0o0.oss-cn-beijing.aliyuncs.com/QQ.jpg',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    },
    {
      name: '微信',
      link: 'http://wyy-alive-0o0.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1.jpg',
      icon: 'i-ri-wechat-2-line',
      color: '#1AAD19',
    },
    // {
    //   name: '微博',
    //   link: 'https://weibo.com/jizhideyunyoujun',
    //   icon: 'i-ri-weibo-line',
    //   color: '#E6162D',
    // },
    // {
    //   name: '豆瓣',
    //   link: 'https://www.douban.com/people/yunyoujun/',
    //   icon: 'i-ri-douban-line',
    //   color: '#007722',
    // },
    // {
    //   name: '网易云音乐',
    //   link: 'https://music.163.com/#/user/home?id=247102977',
    //   icon: 'i-ri-netease-cloud-music-line',
    //   color: '#C20C0C',
    // },
    // {
    //   name: '知乎',
    //   link: 'https://www.zhihu.com/people/yunyoujun/',
    //   icon: 'i-ri-zhihu-line',
    //   color: '#0084FF',
    // },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/1509553238?spm_id_from=333.1007.0.0',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    // {
    //   name: '微信公众号',
    //   link: 'https://cdn.yunyoujun.cn/img/about/white-qrcode-and-search.jpg',
    //   icon: 'i-ri-wechat-2-line',
    //   color: '#1AAD19',
    // },
    // {
    //   name: 'Twitter',
    //   link: 'https://twitter.com/YunYouJun',
    //   icon: 'i-ri-twitter-x-fill',
    //   color: 'black',
    // },
    // {
    //   name: 'Telegram Channel',
    //   link: 'https://t.me/elpsycn',
    //   icon: 'i-ri-telegram-line',
    //   color: '#0088CC',
    // },
    {
      name: 'E-Mail',
      link: 'mailto:972477867@qq.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: 'Travelling',
      link: 'https://www.travellings.cn/go.html',
      icon: 'i-ri-train-line',
      color: 'var(--va-c-text)',
    },
  ],

  search: {
    enable: true,
    /**
     * Search Type
     * - algolia: Algolia Search
     * - engine: Engine Search, like Google/Baidu
     * - fuse: Local Search by fuse.js
     * - local: Local Search by MiniSearch
     */
    provider: 'local'
  },
  /**
   * 开启阅读统计
   */
  statistics: {
    enable: true,
    readTime: {
      /**
       * 阅读速度
       */
      speed: {
        cn: 300,
        en: 200,
      },
    },
  },
  /**
   * Excerpt configuration
   * @description:en-US Global excerpt settings for posts
   * @description:zh-CN 全局摘要配置
   */
  excerpt: {
    /**
     * @description:en-US Default excerpt render type for `<!-- more -->` and auto-generated excerpts.
     * Can be overridden per-post via frontmatter `excerpt_type`.
     * Does not apply when frontmatter `excerpt` is set manually (used as-is).
     * @description:zh-CN `<!-- more -->` 及自动摘要的默认渲染类型，可通过 frontmatter `excerpt_type` 逐篇覆盖。
     * 当 frontmatter 手动指定 `excerpt` 时不生效（直接使用原始字符串）。
     * @default 'html'
     */
    type: 'html',
    /**
     * @description:en-US Auto-generate excerpt from post content when no manual excerpt is provided
     * @description:zh-CN 当没有手动指定摘要时，自动从文章内容截取摘要
     * @default false
     */
    auto: true,
    /**
     * @description:en-US Maximum length of auto-generated excerpt (in characters)
     * @description:zh-CN 自动摘要的最大长度（字符数）
     * @default 200
     */
    length: 200
  },
  /**
 * The license of your posts
 * @description 文章所使用的协议，默认使用 Creative Commons
 * @default https://creativecommons.org/licenses/
 */
  license: {
    /**
     * Whether to show at the bottom of the article
     * @description 是否显示在文章底部
     * @default true
     */
    enabled: true,
    /**
     * Creative License Language, same with your config.lang
     * when lang === 'zh-CN', use 'zh'
     * @description 默认与站点语言相同
     * @default 'en'
     */
    language: 'zh-CN',
    /**
     * Type of license
     * @description 证书类型
     * @default 'by-nc-sa'
     */
    type: 'by-nc-sa'
  },

  // 代码块高度限制
  codeHeightLimit: 300,
  /**
   * image preview by medium-zoom
   * @url https://github.com/francoischalifour/medium-zoom
   */
  mediumZoom: {
    /**
     * @zh 启用图片预览
     */
    enable: true
    /**
     * For example: '.markdown-body img'
     * @default '' content.value querySelectorAll('img')
     */
    // selector: '',
    /**
     * @zh 配置项
     * @see https://github.com/francoischalifour/medium-zoom#options
     */
    // options: ZoomOptions
  },
  // 开启图片懒加载
  vanillaLazyload: {
    // 默认不开启
    enable: true,
  },
  /**
   * Floating Vue configuration for floating footnote tooltips.
   * @see https://floating-vue.starpad.dev/guide/config
   */
  floatingVue: {}, // FloatingVueConfig is an alias of any, consult the documentation for actual type

  /**
   * displayed posts length in every page
   * @default 7
   */
  pageSize: 7,

  comment: {
    enable: true,
  },

  sponsor: {
    enable: true,
    title: '喝杯咖啡，交流一下~',
    description: '喝杯咖啡，交流一下~',
    methods: [
      {
        name: '支付宝',
        url: 'http://wyy-alive-0o0.oss-cn-beijing.aliyuncs.com/%E6%94%AF%E4%BB%98%E5%AE%9D.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      // {
      //   name: 'QQ 支付',
      //   url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
      //   color: '#12B7F5',
      //   icon: 'i-ri-qq-line',
      // },
      {
        name: '微信支付',
        url: 'http://wyy-alive-0o0.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})
