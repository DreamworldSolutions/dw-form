# dw-form

A form element which is used to get serialized data and to perform validation of it's local elements.

## Installation

```html
  npm install --save @dreamworld/dw-form
```

## Usage

```html
  @import `@dreamworld/dw-form/dw-form`;
```

## [Demo](https://dreamworldsolutions.github.io/dw-form/demo/index.html)

## Features

- `serialize()` Used to get key/value data of it's children form elements as JSON Object.
- `validate()` Used to validate child elements
  - Invokes `validate()` method on each form element if it's defined/available.
  - Returns `true` if all elements `validate` has returned `true`.

## Example

```html
  <dw-form>
    <dw-input name="name" label="Name" required></dw-input>
    <dw-checkbox name="isChecked" label="This is checkbox"></>
  </dw-form>
```


# dw-form-element

A Mixin used to create custom form element.

## Installation

```html
  npm install --save @dreamworld/dw-form
```

## Usage

```html
  @import `@dreamworld/dw-form/dw-form-element`;
```

## How it works?

- Triggers `register-dw-form-element` when attached (from `connectedCallback`). `dw-form` uses this event to register
 this element as custom form element.
- Triggers `unregister-dw-form-element` when detached (from `disconnectedCallback`). `dw-form` on this event removes
this element from the custom elements registry it has.
- Stops propagation of `register-dw-form-element` event from child elements (from local dom or light dom). It allows to
create composite form elements. Only most souter form element is registered with `dw-form`.

## Example

```html
  class CustomElement extends DwFormElement(LitElement) {
    ...
  }
```

** NOTE: Do not forget to call `super.connectedCallback()` and `super.disconnectedCallback()` in your element **

# dw-form-field

It's used to show label for checkbox & radio buttons. Used by `dw-checkbox` and `dw-radio-button`.
And allows user to select by clicking on the label too.
It also activates a ripple effect upon interacting with the label. For more detail visit
 https://github.com/material-components/material-web/tree/master/packages/formfield.


## Installation
```html
  npm install --save @dreamworld/dw-form-field
```

## Usage

```js
  @import '@dreamworld/dw-form-field'
```


```html
<dw-form-field label="Name" disabled>
  <my-form-element></my-form-element>
</dw-form-field>
```

```html
// Slotted Label
<dw-form-field>
  <my-form-element></my-form-element>
  <div slot="label" style="background-color:powderblue; color: red; font-size: 24px;">Hello Slotted Label</div>
</dw-form-field>
```

## [Demo](https://dreamworldsolutions.github.io/dw-form-field/demo/index.html)

## Enhancements in addition to `mwc-formfield`

> Earlier (in 1.x version) this element was an extension of `mwc-formfield` but it's no longer uses it.
> But, it implements all the behaviours of it with additional behaviours as described below.

- Adds `disabled` property
  - When set to `true`, text will be rendered in `--dw-theme-disabled-text-color`
  - Deactivates ripple on click
- Removes left padding from label When label is not available
- Adds a way to change font style. By default it inherits font style from parent element
- Provides a way to align label to top through `alignTop` property.
- From version 3.x it allows you to render label through slotted element.

## Properties

- label
- alignEnd
- alignTop
- disabled

## Custom CSS Properties

| Name | Default | Description |
| ---- | ------ | --------- |
| `--mdc-theme-text-primary-on-background` | `rgba(0, 0, 0, 0.87)` | Color of the label text. |
| `--mdc-theme-text-disabled-on-background` | `rgba(0, 0, 0, 0.38)` | Text color of a disabled form-field |
| `--dw-form-field-label-min-height` | auto | Minimum height to label |
| `--dw-form-field-label-padding` | 0 | Padding of the label (Note: won't work if label is not available) |

#### Example css to change label style

```
dw-form-field {
  --mdc-theme-text-primary-on-background: blue;
  --dw-form-field-label-min-height: 40px;
  font-size: 18px;
}
```

# dw-composite-form-element
- It's a custom form element. As it's name suggests, used to create a form-element which is composed of other form-elements.
- All the elements for the composition are identified from either local-dom (When used by extending this class) or light-dom.
- Data-type of the `value` property is `Object`. Object's key represents name of the inner form-element & value represents value of that inner form element.
- When `validate()` of this element is called, it invokes `validate()` of all the inner form elements.
- Fires `value-changed` event when it's value is changed. (OR in other word, `value` of any inner form element is changed).

## Installation
```html
  npm install --save @dreamworld/dw-form
```

## Usage (Composition or light-dom)

```js
  @import '@dreamworld/dw-form/dw-composite-form-element'
```

```html
<dw-composite-form-element>
  <dw-input></dw-input>
</dw-composite-form-element>
```

## Usage (Extension)
- Create a new form element by extending the class `DwCompositeFormElement` and in the `render()` template render all the children elements.
