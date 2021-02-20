# @mr/emails-input

Zero-dependency reusable emails input component.

- IE 11 + latest versions of modern browsers

## Index

- [Installation](Installation)
- [Customization](Customization)
- [API Reference](API-Reference)

## Installation

- Include UMD bundle to the document:

```html
<script src="./node_modules/@mr/emails-input/dist/emails-input.umd.js"></script>
```

```ts
// (Optional) TypeScript support
import type EmailsInput from "@mr/emails-input/dist/index"

declare global {
    interface Window {
        mrEmailsInput: typeof EmailsInput
    }
}

// Library would be exposed as `mrEmailsInput`
const emailsInput = window.mrEmailsInput.render(app)
```

- Or using bundlers:

```js
import { render } from "@mr/emails-input"
```

## Customization

Visual customization is possible using css overrides:

```scss
#root {
  .mr-emails-input {
    color: white;
    background: black;
  }

  .mr-email-label {
    color: black;
    background: lightgray;
  }

  .mr-email-label--invalid {
    border-bottom: 1px solid red;
  }
}
```

## API Reference

Provides API to initialize emails-input component
and access & update its state.

```js
const app = document.getElementById("root")
const emailsInput = window.mrEmailsInput.render(app)

emailsInput.getAll() // ["user@some.mail", "invalid@"]
emailsInput.getValid() // ["user@some.mail"]

emailsInput.add("new@some.mail")
emailsInput.remove("invalid@")

emailsInput.destroy()
```

### Constructors

- [constructor](#constructor)

### Accessors

- [value](#value)

### Methods

- [add](#add)
- [destroy](#destroy)
- [getAll](#getall)
- [getValid](#getvalid)
- [remove](#remove)

## Constructors

### constructor

\+ **new EmailsInputApi**(`node`: Element): [*EmailsInputApi*](#classesemailsinputapimd)

Renders component into provided node

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`node` | Element | target element    |

**Returns:** [*EmailsInputApi*](#classesemailsinputapimd)

Defined in: [emails-input-api.ts:22](https://github.com/mtratsiuk/mr-task/blob/e5dea6b/packages/mr-emails-input/src/emails-input-api.ts#L22)

## Accessors

### value

• get **value**(): *string*[]

Returns the list of all typed emails

**`alias`** EmailsInputApi.getAll

**Returns:** *string*[]

Defined in: [emails-input-api.ts:42](https://github.com/mtratsiuk/mr-task/blob/e5dea6b/packages/mr-emails-input/src/emails-input-api.ts#L42)

## Methods

### add

▸ **add**(`email`: *string*): *void*

Adds provided email to the input

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`email` | *string* | email to add    |

**Returns:** *void*

Defined in: [emails-input-api.ts:69](https://github.com/mtratsiuk/mr-task/blob/e5dea6b/packages/mr-emails-input/src/emails-input-api.ts#L69)

___

### destroy

▸ **destroy**(): *void*

Destroys component and removes it from the DOM

**Returns:** *void*

Defined in: [emails-input-api.ts:85](https://github.com/mtratsiuk/mr-task/blob/e5dea6b/packages/mr-emails-input/src/emails-input-api.ts#L85)

___

### getAll

▸ **getAll**(): *string*[]

Returns the list of all typed emails

**`alias`** EmailsInputApi.value

**Returns:** *string*[]

Defined in: [emails-input-api.ts:51](https://github.com/mtratsiuk/mr-task/blob/e5dea6b/packages/mr-emails-input/src/emails-input-api.ts#L51)

___

### getValid

▸ **getValid**(): *string*[]

Returns the list of all typed emails that are _valid_

NOTE: Only simple email validation is performed

**Returns:** *string*[]

Defined in: [emails-input-api.ts:60](https://github.com/mtratsiuk/mr-task/blob/e5dea6b/packages/mr-emails-input/src/emails-input-api.ts#L60)

___

### remove

▸ **remove**(`email`: *string*): *void*

Removes provided email from the input

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`email` | *string* | email to remove    |

**Returns:** *void*

Defined in: [emails-input-api.ts:78](https://github.com/mtratsiuk/mr-task/blob/e5dea6b/packages/mr-emails-input/src/emails-input-api.ts#L78)
