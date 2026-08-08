# Twikoo 评论系统部署指南

> 项目现在挂在腾讯云开发（CloudBase）环境的 Twikoo 上，报错 `EXCEED_AUTHORITY` 与 `RESOURCE_NOT_FOUND`。这份文档把根因讲清楚，并给出**可照着做的修复步骤**。

---

## 一、报错根因（包月环境版）

你的环境是**包年包月**（不是按量计费），所以数据库额度不是问题。真正的根因是：

| 报错 | 真实原因 |
| --- | --- |
| 前端 `Request exceeds granted authority` (EXCEED_AUTHORITY) | CloudBase 默认**关闭匿名登录**，前端通过 `tcb.callFunction` 调用云函数时被拒绝 |
| 后端 `TcbError: the reource is not found` (RESOURCE_NOT_FOUND)，每次请求都重试 6 次 | CloudBase 包月环境**不会自动创建集合**，Twikoo 尝试 `createCollection` 时找不到 `comment` 和 `config` 集合 |

> 你截图里 WEB 安全域名已经配置了 `alive0103.github.io`，所以白名单不是根因。包月环境的 DB 额度也足够，所以额度也不是根因。

---

## 二、修复步骤（按顺序做，缺一不可）

### Step 1: 启用匿名登录（解决 EXCEED_AUTHORITY）

1. 打开 [CloudBase 登录授权](https://console.cloud.tencent.com/tcb/env/login)
2. 选择环境 `alive-blog`
3. 找到「匿名登录」，点**启用**
4. 保存

> 这是最常见的遗漏。CloudBase 默认关闭匿名登录，不开的话所有前端调用都会被拒绝。

### Step 2: 手动创建数据库集合（解决 RESOURCE_NOT_FOUND）

1. 打开 [CloudBase 数据库](https://console.cloud.tencent.com/tcb/db/index)
2. 选择环境 `alive-blog`
3. 点「添加集合」，创建以下两个集合：
   - `comment`
   - `config`
4. 权限设置保持默认（所有用户可读，仅创建者可写）

### Step 3: 验证云函数

1. 打开 [CloudBase 云函数](https://console.cloud.tencent.com/tcb/scf/index)
2. 选择环境 `alive-blog`
3. 确认有名为 `twikoo` 的函数
4. 点进去看「日志」，确认最近的请求不再报 RESOURCE_NOT_FOUND

### Step 4: 重新测试

1. 打开你的博客页面
2. 按 F12 打开 DevTools → Network
3. 刷新页面，看 Twikoo 请求是否返回 200
4. 尝试发一条评论

---

## 三、如果以上都做了还是报错

### 排查 1: 云函数环境变量

Twikoo 云函数内部使用 `tcb.SYMBOL_CURRENT_ENV` 来定位环境，但如果部署时配置了环境变量 `TWIKOO_ENV_ID`，它会覆盖默认值。检查：

1. 云函数 → twikoo → 函数配置 → 环境变量
2. 如果有 `TWIKOO_ENV_ID`，确认它的值是 `alive-blog-d1givpp6t9b8f6d4c`

### 排查 2: 云函数版本

1. 云函数 → twikoo → 函数代码
2. 确认 `package.json` 里的 `twikoo-func` 版本是 `1.7.15`（与前端 CDN 版本一致）

### 排查 3: 前端 region

确认 `valaxy.config.ts` 里的 `region` 与环境实际地域一致：
- 上海 = `ap-shanghai`（你的环境是上海 1，所以是对的）
- 广州 = `ap-guangzhou`

---

## 四、备选方案（如果 CloudBase 实在搞不定）

| 平台 | 推荐度 | 大陆访问 | 费用 | 数据库 |
| --- | --- | --- | --- | --- |
| **Netlify** | ★★★★☆ | 不错 | 免费额度够用 | 需自带 MongoDB Atlas |
| **Hugging Face** | ★★★★☆ | 不错 | 免费 | 需自带 MongoDB Atlas |
| **Vercel** | ★★★☆☆ | 较慢甚至不可达 | 免费额度够用 | 需自带 MongoDB Atlas |
| **自建 Docker** | ★★★☆☆ | 看你的服务器 | 需 VPS | lokijs 自带 |

> 你说 Netlify 号被封了，那 Hugging Face 是下一个最优选择（免费、大陆访问不错，但邮件功能被屏蔽）。

---

## 五、FAQ

### Q: 我能不能直接删掉 CloudBase 上的 Twikoo 云函数？
可以，环境里没有别的服务在用就放心删，避免产生不必要的费用。

### Q: envId 这一项到底填什么？
- 腾讯云 CloudBase：填 **裸环境 ID**（如 `alive-blog-d1givpp6t9b8f6d4c`），并且**必须**额外指定 `region`
- 其他平台（Vercel / Netlify / Hugging Face / 自建）：填 **完整 https URL**（如 `https://xxx.netlify.app/.netlify/functions/twikoo`）

### Q: 为什么 Twikoo 加载的是 all 版本？
`valaxy-addon-twikoo` 默认从 jsdelivr 加载 `twikoo@latest/dist/twikoo.all.min.js`（包含腾讯云 SDK）。如果你不再用 CloudBase，可以把加载换成精简版，体积更小。
