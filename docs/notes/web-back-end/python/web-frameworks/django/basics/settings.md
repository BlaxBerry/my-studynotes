# Django 项目配置

## 位置

Django 项目的配置初始默认为主应用目录下的`settings.py`文件

但一般建议将配置根据环境区分并以一个包的形式定义

::: code-group

```shell [默认位置]
[项目目录]
|- [主应用]             // [!code focus]
    |- settings.py     // [!code focus]
    |- ...             // [!code focus]
|- [自定义应用]
|- manage.py
```

```shell [推荐位置]
[项目目录]
|- [主应用]                                 // [!code focus]
    |- settings                            // [!code focus]
        |- __init__.py                     // [!code focus]
        |- base.py          # 基本通用配置   // [!code focus]
        |- development.py   # 开发环境      // [!code focus]
        |- production.py    # 生产环境      // [!code focus]
        |- ...              # 其余环境      // [!code focus]
    |- ...                                 // [!code focus]
|- [自定义应用]
|- manage.py
```

:::

## 常用字段

### BASE_DIR

项目根目录

使用：`BASE_DIR / "子路径"`

:::code-group

```py [默认]
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent   //[!code focus]
```

:::

---

### SECRET_KEY

密钥

```py
SECRET_KEY = 'xxxxx'
```

---

### DEBUG

是否开启调试

:::code-group

```py [默认]
DEBUG = True    # 生产模式下必须为 False
```

:::

---

### ALLOWED_HOSTS

被允许的域名

在[`DEBUG = True`](#debug)时默认允许`localhost`、`127.0.0.1`、`[::1]]`

:::code-group

```py [默认]
ALLOWED_HOSTS = []
```

```py [例子]
ALLOWED_HOSTS = [
    "*",            # 匹配所有IP，生产环境下不要用
    "localhost",
    "127.0.0.1"
]
```

:::

---

### INSTALLED_APPS

注册本地的自定义应用与第三方包

:::code-group

```py [默认]
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

```py{0} [例子]
INSTALLED_APPS = [
    # Django 自带的包/模块
    # ...

    # 第三方应用
    "rest_framework",

    # 本地应用 ( 自定义应用 )
    "xxx",                      # [根目录]/xxx
    "apis.xxx.apps.XxxConfig",  # [根目录]/apis/xxx
    "apps.yyy.apps.YyyConfig",  # [根目录]/apps/yyy
]
```

:::

---

### MIDDLEWARE

中间件

:::code-group

```py [默认]
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

:::

---

### ROOT_URLCONF

主路由路径，主应用目录下的`urls.py`文件

:::code-group

```py [默认]
ROOT_URLCONF = '主应用名.urls'
```

:::

---

### TEMPLATES

模版

默认自动识别自定义应用目录下的`templates`目录

:::code-group

```py [默认]
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

:::

---

### DATABASES

数据库

默认使用 sqlite3，执行`python manage.py runserver`开启服务器后自动在根目录下生成`db.sqlite3`数据文件

只能用关系型数据库

:::code-group

```py [默认]
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

:::

---

### 静态资源

CSS、JS、图片等

:::code-group

```py [默认]
STATIC_URL = 'static/'
```

:::

---

### 国际化

:::code-group

```py [默认]
LANGUAGE_CODE = 'en-us'     # 语言，Django 管理系统

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True
```

:::

---

### DEFAULT_AUTO_FIELD

默认主键类型

:::code-group

```py [默认]
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```

:::
