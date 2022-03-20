---
layout: post
title: Віддалений бекап та оновлення RouterOS (Mikrotik) через ssh
permalink: /blog/ssh-remote-backup-upgrade-router-os-mikrotik.html
---

Перш за все, для того щоб взаємодіяти з пристроєм **Mikrotik** на базі **RouterOS**, ми маємо встановити на нього публічний ssh ключ того пристрою, з якого будемо виконувати команди.

```sh
ssh <mikrotik-address> "/file print file=id_rsa.pub; file set id_rsa.pub contents=\"`cat ~/.ssh/id_rsa.pub`\"; /user ssh-keys import public-key-file=id_rsa.pub.txt user=admin;"
```

Де `<mikrotik-address>` - адреса вашого mikrotik пристрою.

Після цього підключаємось до mikrotik пристрою за допомогою ключа

<!--more-->

```sh
ssh <mikrotik-address>
```

Власне, робимо бекап

```sh
/system backup save dont-encrypt=yes
```

Перевіряємо, що файл бекапу створено

```sh
/file print
```

Завантажуємо файл бекапу

```sh
scp <mikrotik-address>:/flash/hostname-20220320-1838.backup ./
```

Змінюємо канал оновлення, якщо потрібно

```sh
/system package update set channel=testing
```

Перевіряємо наявність оновлень

```sh
/system package update check-for-updates
```

Завантажуємо пакет оновлення

```sh
/system package update download
```

Встановлюємо, після чого пристрій автоматично перезавантажується

```sh
/system package update install
```

Чекаємо деякий час та заходимо на пристрій знову

```sh
ssh <mikrotik-address>
```

Кожен девайс має власну прошивку, тож ця прошивка має бути оновлена після оновлення RouterOS (операційної системи)

```sh
/system routerboard upgrade
```

-_Джерела:_-
- https://mivilisnet.wordpress.com/2020/03/31/updating-mikrotik-router-from-the-command-line/
- https://interface31.ru/tech_it/2020/02/bezopasnyy-rezhim-v-mikrotik-ili-kak-vsegda-ostavatsya-na-svyazi.html
