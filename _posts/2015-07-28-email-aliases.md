---
layout: post
title: Создаем email aliases в вашем домене.
permalink: /blog/email-aliases.html
---
Допустим, вы являетесь счастливым обладателем доменного имени `john.name` и
вам захотелось принимать почту на адрес `me@john.name`. Но читать вы её хотите
в ящике `john@gmail.com`.

Или еще ситуация - вы популярный блоггер, которому люди задают много вопросов
на имейл. Вы можете создать для этого специальный, например `askme@john.name`.
А письма отправленные на этот адрес будут пересылаться в ваш старый добрый
`john@gmail.com`. Но при этом вы настраиваете фильтр, который будет сортировать
эти письма в отдельную категорию.

В общем придумывать можно долго. Давайте лучше посмотрим как это сделать.
За одно и для себя сберегу инструкцию, чтобы не гуглить много если снова
понадобится.

<!--more-->

Итак приступим.
Для начала нужно установить [postfix](http://www.postfix.org/).
Это такой почтовый сервер. Умеет он много чего и еще маленкая тележка,
но я разбирался только с сабжем.

#### Устанавливаем postfix:
`sudo apt-get update`

`sudo apt-get install postfix`

_Это в случае если у вас Ubuntu на сервере. Если какой-то другой дистрибутив, то
поищите инструкцию для вашего него._

#### Модифячим конфиг:
`sudo vim /etc/postfix/main.cf`

#### Его содержимое должно быть +/- следующим:
```virtual_alias_domains = your-first-domain.com, your-second-domain.com
virtual_alias_maps = hash:/etc/postfix/virtual
myorigin = /etc/mailname
inet_protocols = all
```

_Доменные имена замените на свои. Или одно имя без запятой._

#### Сопоставляем алиасы с целями:
Редактируем файл: `sudo vim /etc/postfix/virtual`

Начинка в нем, что-то типа вот этого. Пары ключ/значение через пробел.
Каждая пара на новой строке. Первое - это алиас, второе - это цель.

```name1@your-first-domain.com some-name@destination.com
name2@your-first-domain.com some-name@destination.com
name@your-second-domain.com some-name@destination.com
```

#### Обновляем таблицу имен:
Эта команда применяет карту алиасов к базе данных сервиса `postfix`.

`sudo postmap /etc/postfix/virtual`

#### Перезагрузить сервис:
`sudo service postfix restart`

#### Ах да! Забыл сказать об DNS конфигурации вашего домена.

В общем, нужно создать `A` запись для поддомена `mail` (по вашему желанию),
которая будет смотреть на IP адрес сервера, где "крутится" `postfix`.

А так же создать `MX` запись с подходящим приоритетом (у меня - 1) которая
будет смотреть на почтовый поддомен. Например `mail.domain.com.`.
Точка в конце адреса обязательна.

Ну вот как бы и все, должно работать. По крайней мере у меня работает - отличная штука.