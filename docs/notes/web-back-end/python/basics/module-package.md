# Python 模块与包

https://www.tohoho-web.com/python/module.html

## 模块 ( Module )

模块

::: code-group

```python
from 模块 import 成员
from 模块 import 成员 as 自定义别名
from 模块 import *

import 模块.成员
import 模块.成员 as 自定义别名
```

:::

## 包 ( Package )

包可理解为多个包含有多个功能模块的目录

下有一个`__init__.py`文件，可理解为用于将其中的模块对外导出

::: code-group

```shell [目录]
|- 包
  |- __init__.py
  |- 模块.py
  |- 模块.py
  |- ...
```

```python [__init__.py]
from 路径 import 模块
from 路径 import 模块
```

:::
