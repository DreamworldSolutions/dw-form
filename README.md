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
  - Use to validate child elements

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

# dw-form-field

It's a wrapper of `mwc-formfield` which aligns form-field with it's label. It also activates a ripple effect upon interacting with the label. For more detail visit https://github.com/material-components/material-components-web-components/tree/master/packages/formfield.

## Installation
```html
  npm install --save @dw/dw-form-field
```

## Usage

```html
  @import '@dw/dw-form-field'
```

## [Demo](https://dreamworldsolutions.github.io/dw-form-field/demo/index.html)

## Enhancements in addition to `mwc-formfield`

- Add `disabled` property
  - When set to true, text will be rendered in `--disabled-text-color`
  - Deactivates ripple on click
- Remove left padding from label When label is not available
- Add a way to change font style. By default it inherits font style from parent element

## Properties

- label

- alignEnd

- disabled

## Theme

- `--primary-text-color` - use this to customize label color

- `--disabled-text-color` - use this to customize disabled label color

#### Example css to change label style

```
dw-form-field{
  --primary-text-color: blue;
  font-size: 18px;
}
```

## Example

```html
<dw-form-field label="Name" disabled>
  <dw-checkbox disabled></dw-checkbox>
</dw-form-field>
```