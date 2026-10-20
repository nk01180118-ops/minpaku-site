#!/bin/sh
# サイトを更新するたびに実行する。版番号を新しくして、
# スマホに残った古いページが自動で最新版に読み込み直されるようにする。
set -e
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M%S)
for f in index.html en/index.html pt/index.html; do
  sed -i -E "s/\?v=[0-9]+[a-z]?/?v=$V/g; s/var v = '[0-9]+[a-z]?';/var v = '$V';/" "$f"
done
printf '{"v":"%s"}\n' "$V" > version.json
echo "version $V"
