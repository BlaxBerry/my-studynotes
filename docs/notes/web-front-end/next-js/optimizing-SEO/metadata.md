# Next.js 元数据 ( MetaData )

https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata

## 静态元数据 ( Static Meta )

::: code-group

```tsx{0} [layout.tsx]
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面标题",
  description: "页面描述",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div></div>;
}
```

```tsx{0} [page.tsx]
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面标题",
  description: "页面描述",
};

export default function Page() {
  return <div>页面内容</div>;
}
```

:::

## 动态元数据 ( Dynamic Meta )

```tsx
import React from "react";
import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: { 参数名: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  props: PageProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // ...
  return {
    title: "页面标题",
    description: "页面描述",
  };
}

export default function Page() {
  return <div>页面内容</div>;
}
```
