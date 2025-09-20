---
layout: post
title: Налаштування HTTPS для localhost у Vite
description: Інструкція з налаштування HTTPS для локального середовища розробки Vite на macOS за допомогою mkcert для доступу до API, що вимагають безпечного з'єднання.
createdAt: 2025-09-20
permalink: /blog/https-localhost.html
keywords:
  - webdev
  - localhost
  - https
  - ssl
  - development
  - web
  - debugging
---
Працюючи над якимось вебпроєктом, іноді буває потрібно дебажити функціонал, браузерне API якого доступне тільки під з HTTPS. Мій кейс - macOS та проєкт на Vite.

Потрібно:
1. Встановити утиліту `mkcert` та локальний CA.
2. Згенерувати сертифікат.
3. Налаштувати Vite на використання цього SSL-сертифіката.

**Важливо!** Девайс та сервер, де запущено проєкт, мають бути в одній мережі.

## Утиліта `mkcert` та локальний CA

Спочатку знадобиться утиліта для створення сертифікатів. На macOS є проста і зручна утиліта `mkcert`. [Встановити можна через Homebrew](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation). Після інсталяції потрібно встановити локальний центр сертифікації (CA).

```sh
# Встановити утиліту mkcert
brew install mkcert
# Встановити локальний CA
mkcert -install
```

## Генерація SSL сертифіката

Далі потрібно створити сертифікат для localhost. 

```sh
# Створення сертифіката для localhost
mkcert localhost
```

Ця команда згенерує два файли: `localhost.pem` (сертифікат) та `localhost-key.pem` (приватний ключ).

## Конфігурація Vite

До файлу `vite.config.ts` потрібно внести наступні зміни:

```ts
import fs from 'node:fs';
import path from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem')),
    },
    // Щоб сервер був доступний всюди в локальній мережі
    host: '0.0.0.0',
  },
});
```

Тут ми вказуємо девсерверу Vite запускатися на HTTPS-порті та використовувати щойно згенеровані ключ і сертифікат. `host: '0.0.0.0'` знадобиться для того, щоб підключатись до цього сервера з інших пристроїв у локальній мережі. Інакше сервер буде доступний тільки на `localhost`, тобто на тій самій машині, де він запущений.

## Джерела

- [How to run a vite project over HTTPS and accessible by local network](https://laracasts.com/discuss/channels/vite/how-to-run-a-vite-project-over-https-and-accessible-by-local-network)
- [Homebrew formulae mkcert](https://formulae.brew.sh/formula/mkcert)
- [Github mkcert](https://github.com/FiloSottile/mkcert)
- [Certificate authority @en.wikipedia](https://en.wikipedia.org/wiki/Certificate_authority)
