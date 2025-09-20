---
layout: post
title: GitHub commit "Verified"
permalink: /blog/2024-07-02-gpg-signoff-at-github.html
keywords:
  - gpg
  - gpg-signoff
  - gpg-suite
  - macos
createdAt: 2024-07-02
description: Налаштування GPG підпису комітів для верифікації авторства в GitHub через створення та конфігурацію GPG ключів.
---

Ти можеш підписувати власні коміти і теги, щоб інші люди могли бути певними, що зробив їх саме ти.
Якщо коміт або тег містить GPG, SSH, або S/MIME підпис, GitHub помічає такі обʼєкти як "Verified" або "Partially verified."

![Приклад підписаного коміту в інтерфейсі GitHub](https://docs.github.com/assets/cb-17614/mw-1440/images/help/commits/verified-commit.webp)

<!--more-->

Встановлюємо утіліту для роботи із GPG криптографією.

Наприклад, на MacOS це може бути `gpg-suite`

- `brew install gpg-suite`

Генеруємо пару ключів

- `gpg --full-generate-key`

Дивимось на щойно згенерований ключ щоб далі використати його ID

- `gpg --list-secret-keys`

Якщо потрібно додати ще email, або відредагувати ключ

- `gpg --edit-key XXXXXXXXXXXXXX`

Щоб скопіювати public key до clipboard на MacOS

- `gpg --armor --export XXXXXXXXXXXXXX | pbcopy`

Заходимо на гітхаб у [розділ SSH and GPG keys](https://github.com/settings/keys)

- Тиснемо "**New GPG key**" та вставляємо у велике поле те, що раніше скопіювали до буфера.
- Скопіюємо значення "**Key ID**" тільки що доданого ключа.

Далі конфігуруємо git клієнт, для автоматичного пидпису.

- `git config --global user.signingkey <Key ID>`
- `git config --global commit.gpgsign true`
- `git config --global tag.gpgsign true`

Або, якщо використовуєш окремий файл конфігурації, наприклад `.gitconfig.local`, додаємо туди

```txt
[user]
	signingkey = <Key ID>
[commit]
	gpgsign = true
[tag]
	gpgsign = true
```

Всьо.

## Джерела

- [GitHub / About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)
