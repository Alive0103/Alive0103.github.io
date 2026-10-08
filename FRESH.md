# 新鲜事 · 编写规范

适用目录 `pages/fresh/`。**每篇日报的最终形态就是给公众看的成品**，不是给自己看的内部素材稿——批准后写出来的那一版不允许有半成品痕迹。

## 一、工作流

| 阶段 | 触发 | 产物 | 状态 |
| --- | --- | --- | --- |
| 抓取 | 每天 09:30 定时任务 | 候选条目 | 内部 |
| 简报 | 抓取后自动生成 | md 草稿 + 推送询问 | `draft: true` |
| 加工 | 用户回复批准 | 展开为深度版 | 去掉 `draft` |
| 发布 | 加工完成后 push | GitHub Pages | 线上 |

用户批准时可以附加自己的观点，我会并入该条的「我的判断」，并注明这是他的补充。

## 二、frontmatter 约定

```yaml
---
title: 新鲜事 · YYYY-MM-DD
date: YYYY-MM-DD
categories: 新鲜事
description: 一句话导语，点出当天最重要的两三个看点
highlights:
  - 热点短标题（不超过 20 字，不带序号和链接）
draft: true        # 待批准；批准后删除此行
---
```

`highlights` 渲染卡片正面的标题列表，`description` 渲染卡片背面标题。两者都要写。

## 三、正文结构

1. **开篇摘要块**（保留，不改格式）
   ```
   > 今日简报，共 14 条。
   > 权重：Agent 6 / 后端 4 / 客服 1 / 行业 3。
   ```
2. **四个分组**，顺序固定：Agent 与大模型 / 后端 / 客服与对话系统 / 行业资讯
3. **某组当天没有值得写的内容就整组省略**，不写「今日无更新」，不用旧闻凑数
4. **结尾抓取说明**：哪些源失败了、用了什么方式补位，如实注明

## 四、每条的写法（五段式）

| 段落 | 要求 |
| --- | --- |
| 是什么 | 一句话讲清发生了什么，不带评价 |
| 关键细节 | 版本号、数据、时间点、架构变化；数据必须能追溯到原文 |
| 为什么重要 | 对技术方向或行业的影响，说清影响路径 |
| 我的判断 | 明确这是观点，用「我的判断」起句；用户提供的观点单独注明是他的补充 |
| 落地建议 | 对客服 / Agent 方向有没有用，怎么用，成本多高 |

篇幅：每条 150–300 字，整篇 2000–4000 字。宁可少写几条写好，不要条条浅尝辄止。

## 五、文风

- 面向公众：不假设读者认识我，不用内部代号，不说「我们团队」
- 事实与观点分离：事实给来源，观点标明是我的判断
- 中文标点，标题不用 emoji，正文不堆砌 emoji
- 不写「值得注意的是」「众所周知」这类套话
- 链接一律原文链接，正文里标明来源名称，不用短链和聚合站链接充数

## 六、禁止

- 不编造标题、链接、数据
- 超过 48 小时的消息不写，除非是重大事件的后续进展
- 抓取失败的源在结尾注明，不静默跳过
- 不留 TODO、不留「待补充」

## 七、信息源

**A 档 · 稳定可抓**

| 领域 | 源 |
| --- | --- |
| 通用 / 后端 | GitHub Trending、Hacker News、InfoQ、High Scalability、ByteByteGo、Go / Java / Rust / PostgreSQL / Kafka / Kubernetes 官方 release notes |
| Agent 与大模型 | arXiv（cs.AI / cs.CL / cs.LG）、OpenAI / DeepMind / Anthropic 官方博客、LangChain / LlamaIndex / AutoGen changelog、Hugging Face Daily Papers、机器之心、量子位 |
| 客服与对话系统 | Intercom / Zendesk 工程博客、Rasa、ISG / CX Foundation 报告 |
| 行业 | 36 氪、虎嗅、TechCrunch、The Verge、Reuters Technology |
| 中文技术社区 | 掘金各分榜（后端、人工智能）、V2EX、知乎热榜 |

**B 档 · 需登录态或自建中间件**

| 源 | 现状与方案 |
| --- | --- |
| 微信公众号 | 无法读取微信订阅列表。可行路径：自建 RSSHub + wewe-rss；或用户把文章链接投递到指定邮箱，我读邮件取链接 |
| 极客时间 | 付费墙 + 需登录。可行路径：浏览器自动化走用户已登录的会话；或用户投递链接 |
| 小红书 | 强反爬 + 需登录。可行路径：浏览器自动化配合用户自己的登录态，按关键词抓 |
| Hugging Face | `huggingface.co/papers` 偶发抓取失败，失败就在结尾注明，次日重试 |

**C 档 · 当前不可行**

读取用户的微信订阅号列表、聊天记录、收藏——没有这个能力，不做承诺。

**权重参考**：Agent 与大模型 50% / 后端 30% / 客服 10% / 行业 10%。这是倾向不是硬约束，某天后端出大事就多写后端。

## 八、抓取工具

所有源统一收在 `scripts/fresh-sources.json`，用脚本批量抓：

```bash
node scripts/fetch-fresh.mjs                    # 抓全部启用的源
node scripts/fetch-fresh.mjs openai cloudflare   # 只抓指定源
```

输出按领域分组的候选条目，末尾列出失败源——**失败源要照抄进日报的「抓取说明」**。候选 JSON 落到 `scripts/.cache/fresh-<日期>.json`。

源支持三种类型：`rss`（RSS/Atom）、`json`（JSON 接口，用 `list` 指定数组路径、`fields` 映射字段）、`html`（正则抽标题链接，`pattern` 第 1 组取链接、第 2 组取标题）。

已知环境限制：

- `github.com` 在脚本的网络环境里不可达，GitHub Trending 需要我用浏览器通道单独抓
- `hnrss.org`、`huggingface.co` 同理不稳定，走 HN 的 Algolia 接口或次日重试

## 九、公众号订阅与 RSS 阅读

2026-10-03 改为 FreshRSS 订阅 Wechat2RSS 免费公众号源。启动：

```bash
docker compose -f scripts/docker-compose.channels.yml up -d freshrss
```

打开 <http://localhost:8080>。用户名为 `admin`，密码和聚合 RSS 输出地址保存在本机 `scripts/.cache/freshrss-login.txt`（已忽略，不提交）。

- FreshRSS 仅监听本机 8080 端口，SQLite 数据与扩展保存在 Docker 卷中。
- 每小时第 13、43 分钟检查更新；Docker Desktop 和电脑需要保持运行。
- 在「订阅管理」中添加其他 RSS；「用户查询」里的「Fresh 全部订阅」支持聚合后再输出 RSS。
- 免费公众号列表：<https://wechat2rss.xlab.app/list/all>。
- 补充目录：<https://github.com/ginobefun/BestBlogs/blob/main/opml/bestblogs_wechat2rss_opml_all.opml>。

| 公众号 | 领域 | 订阅源 | 验证结果 |
| --- | --- | --- | --- |
| Datawhale | Agent | <https://wechat2rss.xlab.app/feed/4d620d988cb21cfeefd2263207221f0dc70df9ff.xml> | 导入 20 篇带正文的文章；最新日期为 2026-09-27，缺少已确认的 2026-10-02 文章，更新及时性尚未通过验证 |

FreshRSS 容器抓取此源返回 HTTP 200；本机 Python 请求曾返回 403，不能据此判断源失效。RSS 中原文链接和发布时间正常，聚合输出已验证包含 20 篇文章。

2026-10-03 核对新增的 56 个公众号：两个公开目录匹配到 15 个，均返回 HTTP 200、名称匹配的 RSS 和文章正文，已导入「技术公众号」分类。选源优先考虑最新收录日期，同日期优先保留更多文章。字节跳动Seed 最新收录为 2026-08-05，转转技术为 2026-06-02，近期更新完整性待确认；其余 41 个未被这两个目录收录，不代表无法订阅。未将「腾讯技术」视为「腾讯技术工程」，也未自动改写「Al寒武纪」。

本机逐项结果：`scripts/.cache/wechat-subscription-audit.html`；机器可读结果：`scripts/.cache/wechat-audit.json`；已验证的导入文件：`scripts/.cache/wechat-verified.opml`。最新收录日期只是源中现有文章的日期，不能证明此源没有漏掉更新。完整覆盖需要补充能自行添加公众号的采集服务，FreshRSS 继续负责阅读和 RSS 输出。

原 WeRSS 服务仍保留在 8001 端口供排查，未迁移或删除其数据。微信读书授权不能用于它的公众平台搜索；实测 Datawhale 的微信读书通道返回另一篇文章且正文为空，因此暂不作为主订阅源。`fresh-sources.json` 中博客的公众号占位仍禁用，避免把延迟源自动用于当日资讯。

同日补充：已用未被公开目录收录的 JavaGuide 跑通自采验证。公众号 ID 为 `MP_WXS_3869046948`，微信读书封面接口返回正确账号与一篇文章；正文接口获取约 2300 字正文。原文发布时间为 2026-09-30 14:25:10，原文链接为 <https://mp.weixin.qq.com/s/3A7am-SiCFxiaw-8XhFRLQ>。

- 本机 RSS：<http://localhost:8001/feed/MP_WXS_3869046948.rss?limit=20>。
- FreshRSS 容器使用 `http://host.docker.internal:8001/feed/MP_WXS_3869046948.rss?limit=20`，内网访问白名单仅放行 `host.docker.internal:8001`；分类为「自行采集验证」。使用 `.rss` 扩展名可避免 WeRSS 1.5.3 的 `.xml` 响应类型错误。
- WeRSS 使用 `weread_mp` 模式并采集正文，RSS 指向微信原文；JavaGuide 每小时第 7、37 分钟检查，FreshRSS 在第 13、43 分钟读取。任务未配置消息发送地址。
- `patch-werss-weread.py` 在容器启动时修正 1.5.3 的原文时间解析、空正文重试和无发送地址的纯采集任务。
- 限制：实测文章列表接口返回 `-2041`，当前只使用封面接口返回的单篇文章。此接口的文章可能滞后，不能保证每次返回最新文章，也不能回补列表；初次采集成功不代表完整持续追踪已经验证。

**极客时间**：配置条目已就绪（`geektime-latest`），把登录 cookie 写进环境变量 `GEEKTIME_COOKIE` 后启用。

**小红书**：不走 RSSHub，改用本机浏览器自动化，复用你自己登录的小红书会话：

```bash
node scripts/fetch-xhs.mjs login                  # 首次：弹出窗口扫码登录一次，之后长期有效
node scripts/fetch-xhs.mjs fetch Agent 后端架构     # 按关键词抓笔记
```

实现要点：独立 Chrome 配置目录 `scripts/.cache/chrome-xhs`（不影响日常浏览器），通过 CDP 连上去驱动，登录态落在持久配置里。抓取时默认有头模式（无头容易被风控拦），加 `--headless` 可切无头。外层环境不允许 Chrome 起自己的沙箱，脚本已固定加 `--no-sandbox`。

playwright-core 装在 WorkBuddy 托管 node 工作区，不进项目依赖，避免污染 pnpm 锁文件。
