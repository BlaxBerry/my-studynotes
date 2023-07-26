# HTML 表单标签

https://www.w3schools.com/html/html_form_elements.asp

## 输入框

### \<input>

<details class="details custom-block">
  <summary><code>type</code></summary>

可省略，默认值为`"text"`

::: details `type="text"`

<div :class="$style.playground">
  <input type="text" />
</div>

```html{0}
<input type="text" />
<input />
```

:::

::: details `type="password"`

<div :class="$style.playground">
  <input type="password" />
</div>

```html
<input type="password" />
```

:::

::: details `type="radio"`

<div :class="$style.playground">
  <label>
    <input
      type="radio"
      name="xxx"
      value="AAA"
    />
    AAA
  </label>
  
  <label>
    <input
      type="radio"
      name="xxx"
      value="BBB"
    />
    BBB
  </label>
</div>

::: code-group

```html [写法一]
<label>
  <input
    type="radio"
    name="xxx"
    value="AAA"
  />
  AAA
</label>

<label>
  <input
    type="radio"
    name="xxx"
    value="BBB"
  />
  BBB
</label>
```

```html [写法二]
<input
  type="radio"
  name="xxx"
  id="AAA"
  value="AAA"
/>
<label for="AAA">AAA</label>

<input
  type="radio"
  name="xxx"
  id="BBB"
  value="BBB"
/>
<label for="BBB">BBB</label>
```

:::

</details>

## 文本域

### \<textarea>

<!-- 本文中用到的样式 -->
<style module>
.playground {
    background-color: #f5f5f5;
    color: black;
    padding: 1rem;
}
.playground input {
    border: 1px solid grey;
}
</style>
