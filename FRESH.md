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

## 九、需登录态的源（已实现，需一次性激活）

运行环境在本机 `scripts/docker-compose.channels.yml`。Docker Desktop 已装好（2026-10-03，`/Applications/Docker.app`），CLI 已加进 `~/.zshrc` 的 PATH：

```bash
docker compose -f scripts/docker-compose.channels.yml up -d werss    # 只需公众号
docker compose -f scripts/docker-compose.channels.yml up -d          # 全部，含 rsshub（首次拉镜像较久）
```

| 服务 | 端口 | 用途 |
| --- | --- | --- |
| werss | 8001 | WeRSS 微信公众号订阅与 RSS 生成（自带微信授权，SQLite 存储） |
| rsshub | 1200 | 自建 RSSHub，备用（当前小红书已改走浏览器自动化） |

**接入一个新公众号（三步）**

1. 打开 `http://localhost:8001` → 用 compose 里的账号登录（admin / fresh2026）
2. 扫码授权（微信公众平台 / 微信读书授权，按界面提示）
3. 添加订阅 → 填公众号名称或粘贴文章链接 → 从订阅列表取 feed id，填进 `fresh-sources.json` 对应条目并把 `enabled` 改为 `true`

订阅地址格式 `/rss/{feed_id}`。

**监控中的公众号**

| 公众号 | 领域 | 状态 |
| --- | --- | --- |
| Datawhale | Agent | WeRSS 待启动完成，扫码 + 添加订阅后填 feed id |

> 2026-10-03 换掉 wewe-rss 的原因：它依赖第三方微信读书网关 `weread.111965.xyz`，实测返回 502，导致添加读书账号必定失败；且项目代码自 2024-12（v2.6.1）起停更，无修复希望。WeRSS（rachelos/we-mp-rss）自带微信授权、不依赖外部中转，2026 年仍在维护。 |

**接入一个新公众号（三步）**

1. 打开 `http://localhost:4000` → 账号管理 → 添加读书账号 → 微信扫码（不要勾「24 小时后自动退出」）
2. 公众号源 → 添加 → 粘贴该公众号任意一篇文章的分享链接
3. `curl http://localhost:4000/feeds` 拿到 id（形如 `MP_WXS_xxx`），填进 `fresh-sources.json` 对应条目并把 `enabled` 改为 `true`

单个订阅地址格式：`/feeds/{id}.rss`，支持 `?update=true` 强制刷新、`?title_include=Agent|LLM` 关键词过滤、`/feeds/all.rss` 聚合全部。

**监控中的公众号**

| 公众号 | 领域 | 状态 |
| --- | --- | --- |
| Datawhale | Agent | wewe-rss 已运行（AuthCode：fresh2026），待扫码 + 添加源后填 id |

> wewe-rss 状态说明：代码自 2024-12 起基本停更（最后版本 2.6.1，2026-03 只更新过 README）。能用先用；若微信读书接口失效或账号被风控，备选方案是 rachelos/we-mp-rss（Python + FastAPI，2026 年仍活跃，默认 SQLite，端口 8001，`docker run -d -p 8001:8001 -v $(pwd)/data/werss:/app/data ghcr.io/rachelos/we-mp-rss:latest`）。

新增公众号时照上面的格式复制一条配置，并在本表补一行。

**极客时间**：配置条目已就绪（`geektime-latest`），把登录 cookie 写进环境变量 `GEEKTIME_COOKIE` 后启用。

**小红书**：不走 RSSHub，改用本机浏览器自动化，复用你自己登录的小红书会话：

```bash
node scripts/fetch-xhs.mjs login                  # 首次：弹出窗口扫码登录一次，之后长期有效
node scripts/fetch-xhs.mjs fetch Agent 后端架构     # 按关键词抓笔记
```

实现要点：独立 Chrome 配置目录 `scripts/.cache/chrome-xhs`（不影响日常浏览器），通过 CDP 连上去驱动，登录态落在持久配置里。抓取时默认有头模式（无头容易被风控拦），加 `--headless` 可切无头。外层环境不允许 Chrome 起自己的沙箱，脚本已固定加 `--no-sandbox`。

playwright-core 装在 WorkBuddy 托管 node 工作区，不进项目依赖，避免污染 pnpm 锁文件。
