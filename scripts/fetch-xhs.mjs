/**
 * 小红书抓取：用你自己已登录的 Chrome 会话，避免接第三方工具。
 *
 *   node scripts/fetch-xhs.mjs login                 # 首次：弹出窗口，扫码登录一次
 *   node scripts/fetch-xhs.mjs fetch Agent 后端架构    # 按关键词抓笔记
 *
 * playwright-core 装在 WorkBuddy 的托管 node 工作区（不进项目依赖，保持 pnpm 锁文件干净）。
 *
 * 登录态保存在 scripts/.cache/chrome-xhs（独立 Chrome 配置，不影响你的日常浏览器）。
 */
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'

const { chromium } = await import('playwright-core')
  .catch(() => import('/Users/alive/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.js'))
  .then(m => m.default ?? m)

const [mode, ...keywords] = process.argv.slice(2)
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PROFILE = new URL('.cache/chrome-xhs/', import.meta.url).pathname
const CACHE = new URL('.cache/', import.meta.url)
const CDP = 'http://127.0.0.1:9222'

await mkdir(CACHE, { recursive: true })

const retry = async fn => {
  for (let i = 0; i < 40; i++) {
    try {
      return await fn()
    }
    catch {
      await new Promise(r => setTimeout(r, 500))
    }
  }
  throw new Error('Chrome 调试端口连不上')
}

const launch = (headless, startUrl) => {
  spawn(CHROME, [
    `--remote-debugging-port=${CDP.split(':').pop()}`,
    `--user-data-dir=${PROFILE}`,
    // 外层环境不允许 Chrome 初始化自己的沙箱，必须显式关闭
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    ...(headless ? ['--headless=new', '--disable-gpu'] : []),
    startUrl,
  ], { stdio: 'ignore', detached: true }).unref()

  return retry(() => chromium.connectOverCDP(CDP))
}

const logged = async ctx => (await ctx.cookies()).some(c => c.name === 'web_session')

if (mode === 'login') {
  const browser = await launch(false, 'https://www.xiaohongshu.com/explore')
  const ctx = browser.contexts()[0]

  process.stdout.write('请在弹出的窗口里扫码登录小红书，等待检测……')
  for (let i = 0; i < 240 && !await logged(ctx); i++) {
    await new Promise(r => setTimeout(r, 1500))
    if (i % 20 === 19)
      process.stdout.write(` ${Math.round(i * 1.5)}s`)
  }

  const ok = await logged(ctx)
  await writeFile(new URL('xhs-state.json', CACHE), JSON.stringify(await ctx.storageState(), null, 2))
  console.log(ok ? '\n✓ 登录态已保存' : '\n✗ 超时未登录，重跑一次 node scripts/fetch-xhs.mjs login')
  await browser.close()
  process.exit(ok ? 0 : 1)
}

const browser = await launch(process.argv.includes('--headless'), 'about:blank')
const ctx = browser.contexts()[0]
if (!await logged(ctx)) {
  console.log('未检测到小红书登录态，先执行：node scripts/fetch-xhs.mjs login')
  await browser.close()
  process.exit(1)
}

const results = []
for (const keyword of keywords) {
  const page = await ctx.newPage()
  await page.goto(`https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(keyword)}`, { waitUntil: 'domcontentloaded' })
  await retry(() => page.waitForSelector('a[href*="/search_result/"], a[href*="/explore/"]', { timeout: 3000 }))

  const items = await page.evaluate(() => [...document.querySelectorAll('section.note-item, .note-item')]
    .map(el => ({
      title: el.querySelector('a.title span, .title span, .title')?.textContent?.trim() ?? '',
      url: (href => href && new URL(href, location.href).href)(el.querySelector('a[href*="/search_result/"], a[href*="/explore/"]')?.getAttribute('href')),
      author: el.querySelector('.author-wrapper .name, .author .name')?.textContent?.trim() ?? '',
      stats: el.querySelector('.like-wrapper .count, .count')?.textContent?.trim() ?? '',
    }))
    .filter(i => i.title && i.url)
    .slice(0, 20))

  results.push({ keyword, items })
  await page.close()
}

console.log(`\n## 小红书`)
for (const { keyword, items } of results) {
  console.log(`\n### ${keyword}（${items.length}）`)
  for (const i of items)
    console.log(`- [${i.title}](${i.url})${i.author ? ` · ${i.author}` : ''}${i.stats ? ` · ${i.stats}` : ''}`)
}

await writeFile(new URL(`xhs-${new Date().toISOString().slice(0, 10)}.json`, CACHE), JSON.stringify(results, null, 2))
await browser.close()
