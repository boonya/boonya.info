---
layout: post
title: Сбивается время при перезагрузке из Ubuntu в Windows.
permalink: /blog/system-clock-trouble-ubuntu-windows.html
redirect_from: /my-blog/system-clock-trouble-ubuntu-windows.html
---

Недавно установил себе на переносной жесткий **Ubuntu 12.04**. Посмотрел что нового, порадовался изменениям и нововведениям, но... перезагрузившись в **Windows** обнаружил, что системные часы показывают на два часа меньше чем на самом деле. "Oooops" - подумал я - "что за дела"?

Но покумекав немного пришел к выводу, что не спроста разница составляет именно два часа. И действительно. Причиной тому было то, что _по умолчанию Ubuntu при загрузке устанавливает таймер BIOS в UTC 0_ ([Coordinated Universal Time - Координированное Универсальное Время](https://ru.wikipedia.org/wiki/%D0%92%D1%81%D0%B5%D0%BC%D0%B8%D1%80%D0%BD%D0%BE%D0%B5_%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%B2%D1%80%D0%B5%D0%BC%D1%8F)). То-есть отнимает от текущего времени системы два часа _(а именно такая разница во времени Украины от нулевого часового пояса)_ и устанавливает в BIOS это время. А Windows загрузившись воспринимает это время как локальное и показывает его как ни в чем не бывало.

<!--more-->

![карта часовых поясов](http://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Standard_time_zones_of_the_world.png/800px-Standard_time_zones_of_the_world.png)

_Для версий Ubuntu до 15.04:_

Нужно открыть файл переменных настроек с помощью команды:

`sudo gedit /etc/default/rcS`

или любой другой удобной вам и изменить значение параметра UTC с yes на no.

_Для версий Ubuntu 15.04 и выше:_

`timedatectl set-local-rtc 1`

Источник: [help.ubuntu.com](https://help.ubuntu.com/community/UbuntuTime#Make_Linux_use_.27Local.27_time)
