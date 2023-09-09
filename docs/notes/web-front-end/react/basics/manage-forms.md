# React 表单管理

## 受控表单 ( Controlled )

通过`useState()`钩子函数与表单控件的`onChange`回调函数

会有重新渲染 ( re-render ) 问题

```tsx{0}
import { useState, FormEvent, ChangeEvent } from "react";

interface MyFormState {
  username: string;
  userage: string;
  usergender: string;
  usercountry: string;
}

const defaultFromData: MyFormState = {
  username: "",
  userage: "",
  usergender: "",
  usercountry: "",
};

export default function Component() {
  const [state, setState] = useState<MyFormState>(defaultFromData); // [!code hl]

  const onChange = ( // [!code hl]
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> // [!code hl]
  ): void => { // [!code hl]
    const value: MyFormState[keyof MyFormState] = e.target.value; // [!code hl]
    setState((s) => ({ ...s, [e.target.name]: value })); // [!code hl]
  }; // [!code hl]

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        onChange={onChange} // [!code hl]
      />
      <input
        name="userage"
        onChange={onChange} // [!code hl]
      />

      {["male", "female"].map((value) => (
        <input
          type="radio"
          name="usergender"
          id="usergender"
          value={value}
          key={value}
          onChange={onChange} // [!code hl]
        />
      ))}

      <select
        name="usercountry"
        onChange={onChange} // [!code hl]
      >
        {["JP", "UK", "CN"].map((option) => (
          <option
            value={option}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## 非控表单 ( Uncontrolled )

通过`<form>`的`onSubmit`回调函数在提交时获取各个控件的值

可有效避免受控表单的重新渲染 ( re-render ) 问题

---

### FormEvent

通过`onSubmit`回调函数的事件对象

::: code-group

```jsx{0} [event.target<Badge type="warning">不推荐</Badge>]
import { FormEvent } from "react";

export default function Component() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => { // [!code --]
    e.preventDefault();

    const formData = {
      username: e.target.username.value,              // [!code --] // TS报错，无法捕获 username 属性
      userage: e.target.userage.value,                // [!code --] // TS报错，无法捕获 userage 属性
      usergender: e.target.usergender.value,          // [!code --] // TS报错，无法捕获 usergender 属性
      usercountry: e.currentTarget.usercountry.value, // [!code --] // TS报错，无法捕获 usercountry 属性
    };
    console.log(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="username" />
      <input name="userage" />

      <input type="radio" name="usergender" id="usergender" value="male" />
      <input type="radio" name="usergender" id="usergender" value="female" />

      <select name="usercountry">
        <option value="JP">JP</option>
        <option value="UK">UK</option>
        <option value="CN">CN</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
```

```tsx{0} [event.currentTarget<Badge>推荐</Badge>]
import { FormEvent } from "react";

interface MyFormElements extends HTMLFormControlsCollection { // [!code ++]
  username: HTMLInputElement; // [!code ++]
  userage: HTMLInputElement; // [!code ++]
  usergender: HTMLInputElement; // [!code ++]
  usercountry: HTMLSelectElement; // [!code ++]
} // [!code ++]

interface MyForm extends HTMLFormElement { // [!code ++]
  readonly elements: MyFormElements; // [!code ++]
} // [!code ++]

export default function Component() {
  const onSubmit = (e: FormEvent<MyForm>) => { // [!code ++]
    e.preventDefault();

    const formData = {
      username: e.currentTarget.elements.username.value, // [!code ++]
      userage: e.currentTarget.elements.userage.value, // [!code ++]
      usergender: e.currentTarget.elements.usergender.value, // [!code ++]
      usercountry: e.currentTarget.elements.usercountry.value, // [!code ++]
    };
    console.log(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="username" />
      <input name="userage" />

      <input type="radio" name="usergender" id="usergender" value="male" />
      <input type="radio" name="usergender" id="usergender" value="female" />

      <select name="usercountry">
        <option value="JP">JP</option>
        <option value="UK">UK</option>
        <option value="CN">CN</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
```

:::

---

### Ref

通过`useRef()`钩子函数创建 Ref 并绑定到对应表单控件

需要逐一声明并绑定太过麻烦建议替换为[表单事件](#formevent)获取

```tsx{0}
import { useRef } from "react";

export default function Component() {
  const username = useRef<HTMLInputElement>(null); // [!code hl]
  const userage = useRef<HTMLInputElement>(null); // [!code hl]
  const usercountry = useRef<HTMLSelectElement>(null); // [!code hl]

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      username: username.current?.value, // [!code hl]
      userage: userage.current?.value, // [!code hl]
      usercountry: usercountry.current?.value, // [!code hl]
    };
    console.log(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        ref={username} // [!code hl]
      />
      <input
        name="userage"
        ref={userage} // [!code hl]
      />

      <select
        name="usercountry"
        ref={usercountry} // [!code hl]
      >
        <option value="JP">JP</option>
        <option value="UK">UK</option>
        <option value="CN">CN</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
```
