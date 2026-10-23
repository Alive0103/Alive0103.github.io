# /// script
# requires-python = ">=3.9"
# dependencies = ["faster-whisper==1.2.1", "av==18.1.0"]
# ///
"""从 RSS 获取指定单集，在本机生成带时间戳的转写稿。"""

import argparse
import json
import subprocess
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

from faster_whisper import WhisperModel

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("feed", help="节目 RSS 地址")
parser.add_argument("guid", help="单集在 RSS 中的 guid")
parser.add_argument("slug", help="本地保存目录名")
parser.add_argument("--model", default="small")
args = parser.parse_args()

request = urllib.request.Request(args.feed, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(request, timeout=60) as response:
    root = ET.fromstring(response.read())
episode = next(item for item in root.findall("./channel/item") if item.findtext("guid") == args.guid)
folder = Path(__file__).parent / ".cache" / "podcasts" / args.slug
folder.mkdir(parents=True, exist_ok=True)
audio_url = episode.find("enclosure").attrib["url"]
audio = folder / "audio"
subprocess.run([
    "curl", "--location", "--fail", "--silent", "--show-error",
    "--output", str(audio), audio_url,
], check=True)

metadata = {
    "show": root.findtext("./channel/title"),
    "title": episode.findtext("title"),
    "guid": args.guid,
    "published": episode.findtext("pubDate"),
    "source": episode.findtext("link"),
    "feed": args.feed,
    "audio": audio_url,
    "model": args.model,
    "transcript_type": "machine-generated",
}
(folder / "metadata.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2), encoding="utf-8")

model = WhisperModel(args.model, device="cpu", compute_type="int8", cpu_threads=6)
segments, info = model.transcribe(str(audio), language="zh", beam_size=5, vad_filter=True, initial_prompt="简体中文。")
rows = []
with (folder / "transcript.txt").open("w", encoding="utf-8") as output:
    for segment in segments:
        rows.append({"start": segment.start, "end": segment.end, "text": segment.text})
        seconds = int(segment.start)
        line = f"[{seconds // 3600:02}:{seconds // 60 % 60:02}:{seconds % 60:02}] {segment.text.strip()}"
        print(line, flush=True)
        output.write(line + "\n")

(folder / "transcript.json").write_text(json.dumps({"duration": info.duration, "segments": rows}, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"转写完成：{folder}")
