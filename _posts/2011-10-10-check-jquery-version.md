---
layout: default
title: Проверить наличие jQuery и узнать её версию.
permalink: /blog/check-jquery-version.html
---
![JQuery logo](http://brand.jquery.org/resources/jquery-mark-dark.gif)

Иногда возникает необходимость проверить установлена ли на сайте JavaScript библиотека jQuery и если да, то какой она версии. Так вот для этого я предлагаю использовать маленький и простой скрипт, который можно выполнить в консоли небезызвестного дополнения Firebug для браузера Mozilla Firefox.

<!--more-->

А вот, собственно, и код этого скрипта:

`var msg;
if (window.jQuery) {
    msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
} else {
    msg = 'jQuery is not installed';
}
alert(msg);`

В результате его работы мы увидим модальное окно в котором будет либо написана версия установленной библиотеки, либо то, что библиотека не установлена.

**UPDATE**: А еще можно добавить простой сниппет в закладки вашего браузера и кликнув по этой закладке вы познаете тайну ;)

`javascript:(function(){var msg;if (window.jQuery) {msg = 'You are running jQuery version: ' + jQuery.fn.jquery;} else {msg = 'jQuery is not installed';}alert(msg);})();;`

Приятных вам экспериментов!
