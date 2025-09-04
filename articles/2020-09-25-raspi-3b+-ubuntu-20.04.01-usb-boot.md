---
layout: post
title: Ubuntu Server 20.04.1 LTS (Focal Fossa)(ARM64) для Raspberry PI 3 B+ без использования SD карты.
permalink: /blog/raspi-3b+-ubuntu-20.04.01-usb-boot.html
createdAt: 2020-09-25
description: Обновленная инструкция по установке Ubuntu Server 20.04.1 на USB диск для Raspberry Pi 3 B+ с редактированием config.txt.
---

Продолжение истории [из предыдущей заметки](/blog/raspi-ubuntu-usb-boot.html)... Есть официальный подготовленный для "малины" образ [Ubuntu Server 20.04.1 LTS (Focal Fossa)](https://ubuntu.com/download/raspberry-pi), но, как обычно, его загрузчик подразумевает запись на MicroSD карту со всеми вытекающими. Поколупавшись некоторое время в интернатах я набросал вот такую шпаргалку.

Проверялось это на Ubuntu Server 20.04.1 LTS, RaspberryPi 3b+, SSD Samsung в "кармане" с USB интерфейсом.

**UPD**: [С Ubuntu Server 20.04.3 LTS вообще ничего делать не нужно. Записал и пользуешься](/blog/2021-10-23-raspi-ubuntu-20.04.03.html).

<!--more-->

## Пререквизиты

- Raspberry PI 3 B+
- USB носитель
- [ubuntu-20.04.1-preinstalled-server-arm64+raspi.img.xz](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.1-preinstalled-server-arm64+raspi.img.xz)
- [Balena Etcher](https://www.balena.io/etcher/) для записи образа на диск

## Решение

Скачиваем образ, записываем его на диск. После успешной записи Balena автоматически отмонтирует диск. Примонтируйте раздел `system-boot` снова и отредактируйте в нем один файл.

### config.txt

Можно удалить все секции pi4, pi3, pi2, а в секции "all" добавляем:

```txt
kernel=vmlinux
initramfs initrd.img followkernel
```

Файла `vmlinux` на самом деле нет, но есть `vmlinuz`. Именно его нужно "превратить" в целевой.

Переходим в дирректорию `system-boot` и выполняем.

```bash
sudo dd if=vmlinuz bs=1 | zcat > vmlinux
```

Ждем...
Готово.

Подключаем диск к “малине”, ждем пару минут, profit

[Источник - askubuntu.com](https://askubuntu.com/a/1255649/790519)
