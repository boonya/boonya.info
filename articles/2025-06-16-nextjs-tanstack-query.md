---
layout: post
title: Як обʼєднати nextjs server functions із tanstack query і мати з того зиск.
permalink: /blog/2025-06-16-nextjs-tanstack-query.html
tags: #nextjs #tanstack-query #integration
---

Останнім часом я часто працюю зі стеком [`Next.js`](https://nextjs.org/docs) + [`TanStack Query`](https://tanstack.com/query/latest/docs/framework/react/overview). Колись вигадав для себе підхід до структурування модулів, щоб мати змогу використовувати серверні функції як безпосередньо, так і в клієнтських компонентах.

Це дуже зручно, коли потрібна вся потужність TanStack Query з його кешуванням, гідрацією, мутаціями тощо, але водночас хочеться “приховати” бізнес-логіку, структуру бази даних або стороннє API від зайвих очей.

<!--more-->

## 🔧 У чому концепція

- Чіткий модульний поділ
- Усі звернення до бази даних, зовнішніх API та потужна бізнес‑логіка містяться в окремому шарі — серверному модулі.
- Це дозволяє контролювати, що та як передається далі у клієнт.
- Універсальні серверні функції.
- Пишете універсальні функції типу `fetchUser()`, `updatePost()`, які використовуються одразу в pages/api (або app-роутингу - next.js) і в клієнтських компонентах через TanStack Query.
- Таким чином одна й та ж функція грає роль і API-ендпоінту, і запиту з клієнта з кешем, мутаціями, гідрацією.
- Максимум переваг TanStack Query
- Надійне кешування, оновлення після мутацій, гідрація тощо — без дублювання логіки чи повторних запитів.
- Простота масштабування — адже клієнт запускає ті самі функції, що й сервер, без дублювання коду.
- Ізоляція бізнес‑логіки
- Витягуєте всю сутність запитів у захищений шар.
- Клієнт не бачить внутрішнього влаштування — тільки обмежений інтерфейс.

## Спочатку це виглядало це наступним чином

### @/api/entity/server.ts

Файл із серверною функцією яка доступна виключно на сервері. Далі її можна використовувати у серверних модулях.

```ts
'use server';

export async function getEntity(id: number) {
  const entities = {
    1: {title: 'Entity #1'},
    2: {title: 'Entity #2'},
  };
  // Це імітація взаємодії із БД чи стороннім API
  return Promise.resolve(entities[id]);
}
```

### @/api/entity/index.ts

Модуль із функцією, що інстанціює мінімально необхідний обʼєкт query. Далі його можна використовувати у клієнтських модулях.

```ts
import {queryOptions} from '@tanstack/react-query';
import {getEntity} from './server';

export const GET_ENTITY_KEY_BASE = ['entity'];

export function getEntityQuery(id: number) {
  return queryOptions({
    queryKey: [...GET_ENTITY_KEY_BASE, id],
    queryFn: () => getEntity(id),
  });
}
```

### @/app/page.tsx

Модуль сторінки, що буде пререндеритись на сервері, а також гідрувати QueryClient даними зібраними на сервері.

```ts
import {HydrationBoundary, dehydrate} from '@tanstack/react-query';
import {getEntityQuery, GET_ENTITY_KEY_BASE} from '@/api/entity';
import {getEntity} from '@/api/entity/server';

type PageProps = {
  params: Promise<{id: string}>;
}

export async function generateMetadata({params}: PageProps) {
  const id = Number((await params).id);

  const entity = await getEntity(id);

  return {title: entity.title};
}

export default async function Page({params}: PageProps) {
  const queryClient = getQueryClient();

  const id = Number((await params).id);

  await queryClient.prefetchQuery(getEntityQuery(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container  />
    </HydrationBoundary>
  );
}
```

### Проблеми

Як видно, коли таких кверів стає багато, будемо мати велику кількисть фактично однакових функцій. Єдина різниця, це `queryKey` і `queryFn`.

То ж на днях вигадав абстракцію, щоб трошки спростити собі життя в цьому. Із профіту - менше однакового коду, повна підтримка типів, максимальна гнучкість, а також не потрібно вигадувати імена константам що зберігають базовий ключ квері. Це може знадобитись для оновлення чи інвалідації кеша кверів, після успішної мутації цих даних.

## Тепер ось так

### @/api/entity/server.ts

Модуль із серверною функцією лишається без змін.

```ts
'use server';

export async function getEntity(id: number) {
  const entities = {
    1: {title: 'Entity #1'},
    2: {title: 'Entity #2'},
  };
  // Це імітація взаємодії із БД чи стороннім API
  return Promise.resolve(entities[id]);
}
```

### @/utils/query.ts

Власне сама імплементація класа утиліти

```ts
import {QueryKey} from '@tanstack/react-query';

export class Query<
  QueryFn extends (params: any) => any,
  Key extends QueryKey = QueryKey,
  Params = Parameters<QueryFn>[0],
  Data = ReturnType<QueryFn>,
> {
  public queryFn: QueryFn;
  public baseKey: Key;

  constructor(queryFn: QueryFn, baseKey: Readonly<Key>) {
    this.baseKey = baseKey;
    this.queryFn = queryFn;
  }

  public getKey = (params: Partial<Params>) => {
    return [...this.baseKey, params] as const;
  };

  public getQuery = (params: Params) => {
    return {
      queryKey: this.getKey(params),
      queryFn: () => this.queryFn(params) as Data,
    };
  };
}
```

Із типами ще до кінця не розібрався, щоб було максимально гарно, але цим вже можна користуватись.

### @/api/entity/index.ts

Обʼєкт квері інстанціюється за допомогою того класу утиліти.

```ts
import {Query} from '@/utils/query';
import {getEntity} from './server';

export const getEntityQuery = new Query(getEntity, ['entity'] as const);
```

Тепер із обʼєкта `getEntityQuery` маємо доступ до:

- Серверної функції за допомогою `getEntityQuery.queryFn(id)`.
- Обʼєкта квері через `getEntityQuery.getQuery(id)`.
- Бази ключа, завдяки `getEntityQuery.baseKey`
- А також, можемо згенерувати повний ключ. `getEntityQuery.getKey(id)`

### @/app/page.tsx

Модуль сторінки з якого видно різницю. Тепер достатно імпортувати обʼєкт з якого маємо доступ одразу і до серверної функції, і до саомї квері, а також базового ключа чи повного за необхідності.

```ts
import {HydrationBoundary, dehydrate} from '@tanstack/react-query';
import {getEntityQuery} from '@/api/entity';

type PageProps = {
  params: Promise<{id: string}>;
}

export async function generateMetadata({params}: PageProps) {
  const id = Number((await params).id);

  const entity = await getEntityQuery.queryFn(id);

  return {title: entity.title};
}

export default async function Page({params}: PageProps) {
  const queryClient = getQueryClient();

  const id = Number((await params).id);

  await queryClient.prefetchQuery(getEntityQuery.getQuery(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container  />
    </HydrationBoundary>
  );
}
```

Такий підхід гарантує використання тої самої серверної функції як в клієнтських модулях так і в серверних. Типи повністю синхронізовані, тобто якщо серверна функція змінить свій API це вплине і на всі клієнтські квері похідні від неї. Ключ квері також синхронізований із кверею.

В разі якщо необхідно змінити логіку за якою формується повний ключ, можна віднаслідуватись від класу `Query` змінити імплементацію метода і вуаля...

Питання/пропозиції/обурення в коментарі, якщо раптом.
