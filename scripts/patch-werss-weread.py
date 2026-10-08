"""Correct WeRSS 1.5.3 WeRead article timestamps and allow empty-body retries."""
from pathlib import Path

path = Path('/app/core/wx/model/weread_mp.py')
source = path.read_text()
if 'import time, re' in source:
    raise SystemExit()
source = source.replace('import time\n', 'import time, re\n')
source = source.replace(
    '        return extract_mp_content(response.text)',
    '        self._article_publish_time = int(re.search(r"var oriCreateTime = \'(\\d+)\'", response.text)[1])\n'
    '        return extract_mp_content(response.text)',
)
source = source.replace(
    '                        item["content"] = self._get_mp_content(review_id)',
    '                        item["content"] = self._get_mp_content(review_id)\n'
    '                        item["create_time"] = item["update_time"] = self._article_publish_time',
)
source = source.replace(
    '                Article.id == stored_id,',
    '                Article.id == stored_id,\n                Article.content != "",',
)
path.write_text(source)

path = Path('/app/jobs/webhook.py')
source = path.read_text().replace(
    'def web_hook(hook:MessageWebHook, is_test:bool = False):\n',
    'def web_hook(hook:MessageWebHook, is_test:bool = False):\n'
    '    if not hook.task.web_hook_url:\n        return\n',
)
path.write_text(source)
