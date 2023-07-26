# HTML 列表标签

## 无序列表

无序列表 ( Unordered List )

::: details 例子

<div :class="$style.playground">
  <ul>
    <li v-for="i in 3">item{{i}}</li>
  </ul>
</div>

::: code-group

```html [HTML]
<ul>
  <li>item1</li>
  <li>item2</li>
  <li>item3</li>
</ul>
```

```css [CSS]
ul > li {
  background-color: pink;
}
```

:::

---

### \<ul>

## 无序列表

无序列表 ( Ordered List )

::: details 例子:

<div :class="$style.playground">
  <ol>
    <li v-for="i in 3">item{{i}}</li>
  </ol>
</div>

::: code-group

```html [HTML]
<ol>
  <li>item1</li>
  <li>item2</li>
  <li>item3</li>
</ol>
```

```css [CSS]
ol > li {
  background-color: pink;
}
```

:::

---

### \<ol>

## 描述列表

描述列表 ( Description List )

::: details 例子:

<div :class="$style.playground">
  <dl>
    <dt v-for="i in 2">title{{i}}</dt>
    <dd v-for="i in 3">item{{i}}</dd>
  </dl>
</div>

::: code-group

```html [HTML]
<dl>
  <dt>title1</dt>
  <dt>title2</dt>
  <dd>item1</dd>
  <dd>item2</dd>
  <dd>item3</dd>
</dl>
```

```css [CSS]
dl > dt {
  background-color: pink;
}

dl > dd {
  background-color: skyblue;
}
```

:::

---

### \<dl>

---

### \<dt>

---

### \<dd>

## 列表元素

### \<li>

<style module>
.playground {
    background-color: #f5f5f5;
    color: black;
    padding: 1rem;
}
.playground > ul > li, 
.playground > ol > li, 
.playground > dl > dd {
    background-color: skyblue;
}
.playground > dl > dt {
    background-color: pink;
}
</style>
