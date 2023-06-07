# JavaScript ES Module

多用于 JavaScript 在前端环境下的模块化开发

## import()

详见 [顶层 await](../async/async-await.md#顶层-await)

```js
const module = (await import("路径")).default;
```

```tsx
import React from "react";
const styles = (await import("styles/common.ts")).default;

export default function Compoent() {
  return <div style={{ color: styles.color }} />;
}
```

```tsx
import { useEffect } from "react";

export default function Compoent() {
  useEffect(() => {
    (async () => {
      try {
        await import("styles/index.scss");
      } catch {
        console.error("模块加载失败");
      }
    })();
  }, []);
  return <></>;
}
```
