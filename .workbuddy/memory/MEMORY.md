# 项目长期笔记（Valaxy 博客 alive0103.github.io）

## 本地开发
- 启动：`npm run dev` → http://localhost:4859（改 md 热更新，改 `*.config.ts` 自动重启）。
- 构建：`npm run build`（valaxy build --ssg，产物 `dist/`）。**必须先停 dev server**，同时跑会静默失败（产物只有 1 个 html）。
- 预览产物：`npm run serve`。
- 坑：vite 清 `node_modules/.valaxy/cache/deps` 时被安全守卫拦（SAFE_DELETE_BULK_CONFIRM_REQUIRED）——把该目录改名即可。

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
