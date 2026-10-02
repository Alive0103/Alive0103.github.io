/**
 * 新鲜事候选抓取。用法：node scripts/fetch-fresh.mjs [sourceId...]
 * 源清单在 scripts/fresh-sources.json，支持 rss / json / html 三类。
 * 抓取失败会列在输出末尾，按 FRESH.md 要求写进日报的「抓取说明」。
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { readFile } from 'node:fs/promises'

const cfg = JSON.parse(await readFile(new URL('fresh-sources.json', import.meta.url), 'utf8'))
const env = { ...cfg.env, ...process.env }
const wanted = process.argv.slice(2)
const sources = cfg.sources.filter(s => s.enabled !== false && (!wanted.length || wanted.includes(s.id)))

const fill = tpl => tpl.replace(/\$\{(\w+)}/g, (_, k) => env[k] ?? '')
const strip = html => html
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&(?:amp|#38);/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
const dig = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj)
const interpolate = (tpl, item) => tpl.replace(/\{(\w+)}/g, (_, k) => item[k] ?? '')

const request = async (s) => {
  const res = await fetch(fill(s.url), {
    headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36', cookie: env[s.cookieEnv] ?? '' },
    signal: AbortSignal.timeout(+env.FETCH_TIMEOUT),
  })
  if (!res.ok)
    throw new Error(`HTTP ${res.status}`)
  return res.text()
}

const entry = (block, re) => strip(block.match(re)?.[1] ?? '')

const parseRSS = (xml, limit) => [...xml.matchAll(/<(?:item|entry)[\s\S]*?<\/(?:item|entry)>/g)]
  .slice(0, limit)
  .map(([block]) => ({
    title: entry(block, /<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/),
    url: entry(block, /<link[^>]*href="([^"]+)"/) || entry(block, /<link>([\s\S]*?)<\/link>/),
    summary: entry(block, /<(?:description|summary)[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\//).slice(0, 180),
    published: entry(block, /<(?:pubDate|updated|published)>([\s\S]*?)</),
  }))
  .filter(i => i.title && i.url)

const parseSource = (body, s) => {
  const limit = s.limit ?? 10
  if (s.type === 'rss')
    return parseRSS(body, limit)

  if (s.type === 'json') {
    const { title, summary, url, urlTemplate, published } = s.fields
    return (dig(JSON.parse(body), s.list) ?? []).slice(0, limit).map(i => ({
      title: strip(i[title] ?? ''),
      url: urlTemplate ? interpolate(urlTemplate, i) : i[url],
      summary: strip(i[summary] ?? '').slice(0, 180),
      published: published ? i[published] : undefined,
    }))
  }

  return [...body.matchAll(new RegExp(s.pattern, 'g'))].slice(0, limit).map(m => ({
    title: strip(m[2]),
    url: new URL(m[1], s.base ?? s.url).href,
    summary: '',
    published: undefined,
  }))
}

const results = await Promise.all(sources.map(async (s) => {
  try {
    return { ...s, items: parseSource(await request(s), s) }
  }
  catch (e) {
    return { ...s, error: e.message, items: [] }
  }
}))

const groups = results
  .filter(s => s.items.length)
  .reduce((acc, s) => ({ ...acc, [s.tag]: [...(acc[s.tag] ?? []), s] }), {})

for (const [tag, list] of Object.entries(groups)) {
  console.log(`\n## ${tag}`)
  for (const s of list) {
    console.log(`\n### ${s.name}（${s.items.length}）`)
    for (const i of s.items)
      console.log(`- [${i.title}](${i.url})${i.published ? ` · ${i.published}` : ''}\n  ${i.summary}`)
  }
}

const failed = results.filter(s => s.error)
console.log(`\n## 抓取结果\n成功 ${results.length - failed.length} / 共 ${results.length}`)
for (const s of failed)
  console.log(`- ${s.name}：${s.error}`)

await mkdir(new URL('.cache/', import.meta.url), { recursive: true })
await writeFile(new URL(`.cache/fresh-${new Date().toISOString().slice(0, 10)}.json`, import.meta.url), JSON.stringify(results, null, 2))
