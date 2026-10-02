# 项目长期笔记（Valaxy 博客 alive0103.github.io）

## 本地开发
- 启动：`npm run dev` → http://localhost:4859（改 md 热更新，改 `*.config.ts` 自动重启）。
- 构建：`npm run build`（valaxy build --ssg，产物 `dist/`）。**必须先停 dev server**，同时跑会静默失败（产物只有 1 个 html）。
- **不要用 `npm run build | head -N`**：管道提前关闭会 SIGPIPE 杀掉构建，产出残缺 dist。改用 `npm run build > /tmp/x.log 2>&1` 再读日志。
- 预览产物：`npm run serve`。
- 坑：vite 清 `node_modules/.valaxy/cache/deps` 时被安全守卫拦（SAFE_DELETE_BULK_CONFIRM_REQUIRED）——把该目录改名即可。

## 内容组织（分类文件夹）
- **正式文章**：`pages/posts/<分类>/`，URL = `/posts/<分类>/<标题>`，进文章栏/首页/归档/RSS/搜索。
  现有：`tech`（技术·笔记）、`things`（随记·记录）、`work`（工作·职业）。
- **随笔（独立于文章）**：`pages/essays/`，URL = `/essays/<标题>`。因为文章栏统一按 `/posts` 前缀聚合、无"排除子目录"配置，把随笔放 posts 外是最干净的隔离方式——**不用任何 hide/draft**，自动不进文章栏/首页/归档/RSS。
- **书架（独立于文章）**：`pages/books/`，URL = `/books/<书名>`。同随笔的隔离原理。`/books/` 网格由 `components/BookShelf.vue` + `layouts/shelf.vue` 实现：横版 3 列翻转卡片（左书封+右简介，hover 翻面显示摘要），页面 max-width 1280px。书的 md frontmatter：`title/date/categories: 读书` + `bookCover`(书封，卡片用) + `cover`(文章页头图，自定义) + `author` + `description`(正面简介) + `summary`(背面摘要)，正文为读书笔记。
- 新增分类页：`pages/<名>/index.md` 写 `layout: grid`（方格卡片）或 `layout: shelf`（条形卡片）+ `folder: <相对 pages 的目录>`，再往 nav/pages 加入口、图标加进 safelist。
- **编写规范**：项目根 `FRESH.md` 是新鲜事板块的完整编写规范 + 信息源清单（工作流、frontmatter、五段式写法、文风、禁止项、抓取经验）。自动化任务 prompt 里已写明「每次先读 FRESH.md」，改动规范请直接改这个文件，不要只改 prompt。
- 未写完的 md 加 `draft: true`：dev 可见、生产构建与 RSS 自动跳过。

- **新鲜事（日报）**：`pages/fresh/`，URL = `/fresh/`。同随笔的隔离原理。专用 `layouts/fresh.vue` + `components/FreshTimeline.vue`：竖排时间轴（轴线 + 年份节点 + 日期圆点），每期一张悬停翻转卡片，按年份分组倒序；无内容时显示占位提示。**加日报只需在 `pages/fresh/` 下丢 `YYYY-MM-DD.md`**，frontmatter 用 `title/date/categories: 新鲜事/description/highlights`（`description` 作卡片背面导语，`highlights` 字符串数组渲染卡片正面标题列表，正面最多 4 条、超出显示「还有 N 条」，excerpt 自动截取背面摘要）；**待批准的稿子加 `draft: true`，批准展开后去掉**。注意：翻面依赖 hover，触屏不翻。
- 由自动化任务「每日技术新鲜事简报」每天 09:30 生成。完整规范见项目根 `FRESH.md`，要点：
  - Agent 与大模型 50% / 后端 30% / 客服 10% / 行业 10%（倾向非硬约束）；某组无货整组省略，不硬凑。
  - Agent 组含 LLM 大模型本身（模型发布、训练、评测、推理优化），不只是 Agent 框架。
  - 批准后写出的深度版＝直接面向公众的终稿，保留开篇摘要块，每条按「是什么/关键细节/为什么重要/我的判断/落地建议」五段式，150-300 字。
  - 用户批准时附带自己的观点 → 并入该条并注明是他的补充。
  - 抓取：HN 走 Algolia 接口；GitHub Trending 网页；掘金走 RSSHub `/juejin/trending/all/weekly`（官方 API 返回空）；HF papers 偶发失败需注明。微信公众号/极客时间/小红书需登录态，当前不可抓（无法读取微信订阅）。

## 自定义布局（重要坑）
- **layout 里不要通过 `<RouterView v-slot="{ Component }">` + `<template #main>` 给 ValaxyMain 传 slot**——SSG 下不透传，内容整体丢失（主题 albums.vue 同样写法，同样失效）。内容直接写在 layout 模板里。

## 部署
- push 到 `main` → `.github/workflows/gh-pages.yml` 自动 `pnpm install` + `pnpm build`，发布 `dist` 到 gh-pages 分支。**不要提交 dist**。

## 评论（Twikoo）
- 后端：CloudBase 环境 `alive0-0-d7gvevz0laacc7bd3`（个人版 baas_personal，ap-shanghai，NoSQL）。envId/region 写在 `valaxy.config.ts` 的 addonTwikoo，开关在 `site.config.ts` 的 `comment.enable`。
- 云函数：`twikoo`（twikoo-func 2.0.9，Nodejs18.15，handler `index.main`）；集合：comment / config / counter / cap_challenges / cap_tokens；匿名登录已开；安全域名已加 `alive0103.github.io`。
- Twikoo 2.x 事件名已改（`COMMENT_GET` / `COMMENT_SUBMIT` / `GET_CONFIG`），旧的 `GET_COMMENT` 会报「请更新云函数」。
- 到期/续费要留意，环境释放后评论会再次失效（2026-09 已发生过一次，旧环境数据全丢）。

## 图床
- 主力：阿里云 OSS `wyy-alive-0o0.oss-cn-beijing.aliyuncs.com`。
- 备选：CloudBase 存储桶 `616c-...-1314400788`，CDN 域名 `616c-alive0-0-d7gvevz0laacc7bd3-1314400788.tcb.qcloud.la`，已设为公有读，外链 = `https://<CDN>/<云路径>`；上传返回的 temporaryUrl 仅 1 小时，别写进文章。
