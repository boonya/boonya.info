---
layout: post
title: Заміна розташування кнопок на клавіатурі в MacOS
permalink: /blog/macos-keychange.html
---

Макбук з європейською клавіатурою відрізняється від американської розташуванням деяких клавіш.

![EU vs. US keyboard](/assets/img/macos-keyboards-layout.jpg)

І якщо форма клавіші "Enter" та розташування "Backslash" мене якось не зачіпають, то знак `~` для мене особисто одна з найчастіше використовуваних клавіш. І через те що вона розташована внизу замість гори, мені доводиться викручувати собі пальці кожного разу. Тож я знайшов спосіб як "повернути" її на своє нормальне місце.

<!--more-->

## Є така вбудована утиліта `​​hidutil`

За допомогою однієї єдиної команди можно перевизначити розташування клавіш.

```sh
hidutil property --set '{"UserKeyMapping":[{"HIDKeyboardModifierMappingSrc":0x700000035,"HIDKeyboardModifierMappingDst":0x700000064},{"HIDKeyboardModifierMappingSrc":0x700000064,"HIDKeyboardModifierMappingDst":0x700000035}]}'
```

Це перемикає клавішу з кодом `0x700000035` з клавішею з кодом `0x700000064`.

## Від ребута до ребута

Але, після перезавантаження операційки потрібно виконувати цю команду щоразу. Тож, маємо щось із цим робити.
Створюємо файл `~/Library/LaunchAgents/local.hidutilKeyMapping.plist` з наступним змістом:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>local.hidutilKeyMapping</string>
  <key>ProgramArguments</key>
  <array>
      <string>/usr/bin/hidutil</string>
      <string>property</string>
      <string>--set</string>
      <string>{
          "UserKeyMapping": [
            {
              "HIDKeyboardModifierMappingSrc":0x700000035,
              "HIDKeyboardModifierMappingDst":0x700000064
            },
            {
              "HIDKeyboardModifierMappingSrc":0x700000064,
              "HIDKeyboardModifierMappingDst":0x700000035
            }
          ]
      }</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
```

Далі потрібно завантажити цей файл та запустити сервіс

```sh
launchctl load ~/Library/LaunchAgents/local.hidutilKeyMapping.plist
launchctl start local.hidutilKeyMapping
```

## 👎 Update at 2023-12-12

Оновився сьогодні до MacOS версії **Sonoma 14.2** і всьо... Ворекераунд більше не працює. Наразі рішення не маю. Додано лінки про все що знайшов по темі, щоб слідкувати.

## 🤨 Update at 2024-01-23

Оновився до **Sonoma 14.3**, після чого виконав `hidutil property --set ...` із **sudo** привілеями і, о чудо, кнопки свапнулися. Залишається порішати чого воно при завантаженні системи не спрацювало.

## 👍 Update at 2024-02-19

```sh
sudo mv ~/Library/LaunchAgents/local.KeyRemapping.plist /Library/LaunchDaemons/
sudo chown root:wheel /Library/LaunchDaemons/local.KeyRemapping.plist
sudo launchctl load /Library/LaunchDaemons/local.KeyRemapping.plist
```

Порішало проблєму 👆

## 👎 Update at 2024-11-22

Оновився до **Sequoia 15.1**, знову не працює. Шукаю рішення.

## Джерела

- [Using hidutil to map macOS keyboard keys @rakhesh.com](https://rakhesh.com/mac/using-hidutil-to-map-macos-keyboard-keys/)
- [Simple tool to generate HIDUTIL key remapping configurations for MacOS](https://hidutil-generator.netlify.app/)
- [HIDUTIL key remapping generator for MacOS @github.com/amarsyla](https://github.com/amarsyla/hidutil-key-remapping-generator)
- [Cannot remap keys on Macbook Pro with hidutils in macos sonoma @reddit.com](https://www.reddit.com/r/MacOS/comments/18g4vxn/cannot_remap_keys_on_macbook_pro_with_hidutils_in/)
- [Remapping Keys in macOS 10.12 Sierra @developer.apple.com](https://developer.apple.com/library/archive/technotes/tn2450/_index.html)
- [HID Usage Tables for Universal Serial Bus (USB) Version 1.4 @usb.org](https://www.usb.org/sites/default/files/hut1_4.pdf)
