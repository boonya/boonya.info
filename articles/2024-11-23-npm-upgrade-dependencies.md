---
layout: post
title: Як швидко оновити npm залежності
permalink: /blog/2024-11-23-npm-upgrade-dependencies.html
tags: #npm
---

Короткий пост-шпаргалка для самого себе про те, як швидко оновити всі npm залежності проекта, бо npm "із коробки" такої можливості наразі не надає.

<!--more-->

### повертає список залежностей, їх поточних версій, і версій до яких їх можна оновити

```sh
npx npm-check-updates
```

### робить все теж саме + відповідно оновлює файл package.json

```sh
npx npm-check-updates -u
```

Ну і якщо все путьом, то встановлюємо

```sh
npm install
```
