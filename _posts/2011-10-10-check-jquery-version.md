---
layout: post
title: Проверить наличие jQuery и узнать её версию.
permalink: /blog/check-jquery-version.html
alias: [/blog/10-web-technology/javascript/jquery/1-check-jquery-version.html, /my-blog/check-jquery-version.html]
---
Иногда возникает необходимость проверить установлена ли на сайте **JavaScript библиотека jQuery** и если да, то какой она версии.

Предлагаю для этого маленький сниппет, который  нужно добавить в закладки браузера, а кликнув по этой закладке узнаете версию.

Или просто выполнить код в консоли браузера.
<!--more-->
Сниппет:

`javascript:(function(){var msg;if (window.jQuery) {msg = 'You are running jQuery version: ' + jQuery.fn.jquery;} else {msg = 'jQuery is not installed';}alert(msg);})();;`

Код, который нужно выполнить в консоли:

<pre>
var msg;
if (window.jQuery) {
    msg = 'You are running jQuery version: ' + jQuery.fn.jquery;
} else {
    msg = 'jQuery is not installed';
}
alert(msg);
</pre>
