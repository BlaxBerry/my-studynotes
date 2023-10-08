方法一：客户端方法

```tsx
"use client";

import React, { useEffect, useState } from "react";

export default function Page() {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.fact); // 仅浏览器控制台打印
        setResult(data.fact);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>{result}</div>;
}
```

方法二：服务端异步

```tsx
import React from "react";

const requestData = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.fact); // 仅服务器中断打印
      return data.fact;
    })
    .catch((err) => console.log(err));

export default async function Page() {
  const result = await requestData("https://catfact.ninja/fact");

  return <div>{result}</div>;
}
```
