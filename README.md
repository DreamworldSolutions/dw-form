# dw-form

A form element which is used to get serialized data and to perform validation of it's local elements.

## Installation

```html
  npm install --save @dw/dw-form
```

## Usage

```html
  @import `@dw/dw-form/dw-form`;
```

## [Demo](https://dreamworldsolutions.github.io/dw-form/demo/index.html)

## Features

- serialized
  - Use to get key/value data of it's child elements

- validate
  - Use to validate chil elements

## Example

```html
  <dw-form>
    <dw-input name="name" label="Name" required></dw-input>
    <dw-checkbox name="isChecked" label="This is checkbox"></>
  </dw-form>
```


# dw-form-element

A parent element of custom form element.

## Installation

```html
  npm install --save @dw/dw-form
```

## Usage

```html
  @import `@dw/dw-form/dw-form-element`;
```

## Features

- Triggers `register-dw-form-element` on attach used by `dw-form`
- Triggers `unregister-dw-form-element` on attach used by `dw-form`
- Stops `register-dw-form-element`'s propagation of it's child element

## Example

```html
  class CustomElement extends DwFormElement(LitElement) {
    ...
  }
```