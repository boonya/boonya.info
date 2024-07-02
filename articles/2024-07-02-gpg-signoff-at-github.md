
---
layout: post
title: Як автоматисчно підписувати коміти та бачити це github
permalink: /blog/2024-07-02-gpg-signoff-at-github.html
---

#gpg #gpg-signoff #gpg-suite #macos

---

- `brew install gpg-suite`
- `gpg --full-generate-key` щоб згенерувати пару ключів
- `gpg --list-secret-keys` щоб побачити id згенерованого ключа
- `gpg --edit-key XXXXXXXXXXXXXX` щоб редагувати цей ключ (якщо треба)
- `gpg --armor --export XXXXXXXXXXXXXX | pbcopy` щоб скопіювати public key до clipboard
- Перейди на гітхаб у [розділ SSH and GPG keys](https://github.com/settings/keys)
  - Натисни "New GPG key" та встав у велике поле те що раніше скопіював до буфера.
  - Скопіюй значення "Key ID" тільки що доданого ключа
- `git config --global user.signingkey <Key ID>`
- `git config --global commit.gpgsign true`
- `git config --global tag.gpgsign true`
- Або додай три попередні опції до свого кастомного `.gitconfig.local`
