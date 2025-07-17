---
layout: post
title: Готуємо та встановлюємо озвучку для робота пилососа Xiaomi STYTJ02YM (Viomi V8)
permalink: /blog/2025-07-17-vacuum-soundpack.html
tags: #vacuum #robot #soundpack #xiaomi #STYTJ02YM #Viomi V8
---

Тут треба якесь інтро

На прикладі [озвучки GLaDOS](https://github.com/KonstantinDev7/Voice_Packs_for_Mi_Robot_S10_Plus?tab=readme-ov-file#upd---%D0%B4%D0%BE%D0%B4%D0%B0%D0%BD%D0%BE-%D0%BE%D0%B7%D0%B2%D1%83%D1%87%D0%BA%D1%83-glados) від [Костянтина Давиденко](https://www.linkedin.com/in/kdavydenko7/).

<!--more-->

You can easily automate both conversion of .ogg files to .mp3 and creation of md5.ini using a simple shell script (Linux, macOS, or WSL) or PowerShell script (Windows).

## Linux/macOS shell script using FFmpeg and md5sum

1. Install tools if not present:

```bash
sudo apt install ffmpeg
```

2. Run the following script in the folder with .ogg files:

```bash
#!/bin/bash

target_dir="mp3_output"
md5_file_path="${target_dir}/md5.ini"
mkdir -p ${target_dir}
> mp3_output/md5.ini

for file in *.ogg; do
  base="${file%.ogg}"
  mp3_file="${base}.mp3"
  mp3_file_path="${target_dir}/${mp3_file}"

  ffmpeg -y -i "$file" -codec:a libmp3lame -qscale:a 2 "${mp3_file_path}"

  md5=$(md5sum "$mp3_file_path" | cut -d ' ' -f1)

  echo "[$(basename "$mp3_file")]" >> $md5_file_path
  echo "MD5=$md5" >> $md5_file_path
  echo "" >> $md5_file_path
done
```

## Output

- Converted .mp3 files go into mp3_output/.
- md5.ini contains lines like:

```bash
cd mp3_output
tar -czf GLaDOS.STYTJ02YM.tgz `ls -A`
md5sum GLaDOS.STYTJ02YM.tgz
```

| name                                                                                                                                              | md5                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [GLaDOS.STYTJ02YM.tgz](https://github.com/boonya/boonya.info/raw/refs/heads/vacuum-soundpack/public/assets/vacuum-stytj02ym/GLaDOS.STYTJ02YM.tgz) | `81677139424497319377e40e841a5ae2` |

#### Sources

- https://github.com/KonstantinDev7/Voice_Packs_for_Mi_Robot_S10_Plus/tree/main/Voice_Packs
- https://github.com/oleksandr-belei/dreame-vacuum-uk-voice-packs?tab=readme-ov-file
- https://dou.ua/forums/topic/49563/
