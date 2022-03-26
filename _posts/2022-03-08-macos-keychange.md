---
layout: post
title: Заміна розташування кнопок на клавіатурі в MacOS
permalink: /blog/macos-keychange.html
---

Макбук з європейською клавіатурою відрізняється від американської розташуванням деяких клавіш.

![EU vs. US keyboard](/assets/img/macos-keyboards-layout.jpg)

І якщо форма клавіші "Enter" та розташування "Backslash" мене якось не зачіпають, то знак `~` для мене особисто одна з найчастіше використовуваних клавіш. І через те що вона розташована внизу замість гори мені доводиться викручувати собі пальці кожного разу. Тож я знайшов спосіб як повернути її на своє нормальне місце.

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

-_Джерела:_-
- https://rakhesh.com/mac/using-hidutil-to-map-macos-keyboard-keys/
