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
- `/essays/` 网格页：`components/PostGrid.vue` + `layouts/grid.vue`。新增分类页：`pages/<名>/index.md` 写 `layout: grid` + `folder: <相对 pages 的目录>` + `columns: 3`，再往 nav/pages 加入口。
- 未写完的 md 加 `draft: true`：dev 可见、生产构建与 RSS 自动跳过。

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
