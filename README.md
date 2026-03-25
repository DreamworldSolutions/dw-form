# @dreamworld/dw-form

A LitElement-based Web Components library for building managed HTML forms. It provides a form container (`<dw-form>`) for serialization and validation, a mixin (`DwFormElement`) for authoring compatible custom inputs, a label wrapper (`<dw-form-field>`) for checkbox and radio inputs, and a composite element (`<dw-composite-form-element>`) for grouping multiple fields as a single logical unit.

---

## 1. User Guide

### Installation & Setup

```sh
npm install @dreamworld/dw-form
```

The package is distributed as ES modules only (`"type": "module"`). All imports must use ES module syntax.

**Dependencies** (installed automatically):

| Package | Version |
|---|---|
| `@dreamworld/pwa-helpers` | `^1.13.1` |
| `@dreamworld/material-styles` | `^3.0.0` |
| `lodash-es` | `^4.17.15` |

---

### Basic Usage

**Simple form with text inputs and checkboxes:**

```javascript
import '@dreamworld/dw-form/dw-form.js';

// In your LitElement template:
html`
  <dw-form>
    <dw-input name="firstName" label="First name" required></dw-input>
    <dw-input name="lastName"  label="Last name"></dw-input>

    <dw-checkbox value="grapes" name="fruit" label="Grapes"></dw-checkbox>
    <dw-checkbox value="apple"  name="fruit" label="Apple"></dw-checkbox>

    <dw-checkbox name="agree" label="I agree"></dw-checkbox>
  </dw-form>
`
```

**Validating and serializing a form:**

```javascript
const form = this.shadowRoot.querySelector('dw-form');

// Validate — triggers validate() on each registered child element
const isValid = form.validate(); // true | false

// Serialize — returns a plain object of name/value pairs
if (isValid) {
  const data = form.serialize();
  // Example output:
  // { firstName: 'Jane', lastName: 'Doe', fruit: ['grapes', 'apple'], agree: true }
}

// Get an array of elements that failed validation
const invalid = form.getInvalidElements(); // HTMLElement[]
```

**Composite form element with pre-filled values:**

```javascript
import '@dreamworld/dw-form/dw-composite-form-element.js';

// In your LitElement template:
html`
  <dw-composite-form-element
    .value="${{ input1: 'Hello', input2: 'World', input3: '' }}"
    @value-changed="${this._onValueChanged}">
    <dw-input name="input1" label="Field 1" required></dw-input>
    <dw-input name="input2" label="Field 2"></dw-input>
    <dw-input name="input3" label="Field 3"></dw-input>
  </dw-composite-form-element>
`

_onValueChanged(e) {
  console.log(e.detail.value);
  // { input1: 'Hello', input2: 'World', input3: '' }
}
```

---

### API Reference

#### `<dw-form>` — Form Container

```javascript
import '@dreamworld/dw-form/dw-form.js';
// or: import { DwForm } from '@dreamworld/dw-form/dw-form.js';
```

`<dw-form>` has no reactive properties. It manages its state internally by listening to registration events from child form elements.

**Methods**

| Method | Signature | Returns | Description |
|---|---|---|---|
| `validate()` | `validate(): boolean` | `boolean` | Calls `validate()` on every registered child element. Returns `true` only if all elements return `true`. Elements without a `validate` method are skipped. |
| `serialize()` | `serialize(): Object` | `Object` | Returns a plain object of `{ name: value }` pairs for all registered children. Children without a `name` attribute are skipped. Null/undefined values are omitted. If multiple elements share the same `name`, their values are aggregated into an array. For checkbox/radio elements (`checked` property is `true` or `false`): when checked, uses `el.value` (or `true` if `value` is absent); when unchecked, omits the entry. |
| `getInvalidElements()` | `getInvalidElements(): HTMLElement[]` | `HTMLElement[]` | Returns an array of all registered elements that fail validation by checking `checkValidity() === false` or `validate() === false`. |

**Slots**

| Slot | Description |
|---|---|
| *(default)* | Child form elements (`DwFormElement` instances). |

**Events (consumed)**

| Event | Description |
|---|---|
| `register-dw-form-element` | Fired by child elements on connect. `dw-form` uses the event's composed path to identify and register the element. |
| `unregister-dw-form-element` | Fired by child elements on disconnect. `dw-form` removes the element from its internal registry. |

---

#### `DwFormElement` — Form Element Mixin

```javascript
import { DwFormElement } from '@dreamworld/dw-form/dw-form-element.js';
```

`DwFormElement` is a **mixin function**, not a component. Apply it to any base class (typically `LitElement`) to make a custom element compatible with `<dw-form>` and `<dw-composite-form-element>`.

```javascript
import { LitElement } from '@dreamworld/pwa-helpers/lit.js';
import { DwFormElement } from '@dreamworld/dw-form/dw-form-element.js';

class MyInput extends DwFormElement(LitElement) {
  static get properties() {
    return {
      name:  { type: String },
      value: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback(); // Required — triggers registration
  }

  disconnectedCallback() {
    super.disconnectedCallback(); // Required — triggers unregistration
  }
}
customElements.define('my-input', MyInput);
```

> **Note:** You **must** call `super.connectedCallback()` and `super.disconnectedCallback()` in your element for the mixin to function correctly.

**Behavior**

| Lifecycle hook | Action |
|---|---|
| `connectedCallback` | Dispatches `register-dw-form-element` (bubbles, composed). Also attaches a listener to stop `register-dw-form-element` events that originate from inner child elements, preventing them from registering directly with a parent `<dw-form>`. |
| `disconnectedCallback` | Dispatches `unregister-dw-form-element` (bubbles, composed). |

**Events (dispatched)**

| Event | Bubbles | Composed | Description |
|---|---|---|---|
| `register-dw-form-element` | Yes | Yes | Fired when the element is connected to the DOM. |
| `unregister-dw-form-element` | Yes | Yes | Fired when the element is disconnected from the DOM. |

**Implementing class contract**

For `<dw-form>` to serialize and validate correctly, implementing classes should expose:

| Member | Type | Required | Used by |
|---|---|---|---|
| `name` | `String` attribute/property | For serialization | `serialize()` uses this as the output object key. |
| `value` | property | For serialization | `serialize()` reads this value. |
| `checked` | `Boolean` property | For checkbox/radio | When present, `serialize()` uses it instead of `value`. |
| `validate()` | method | For validation | Called by `dw-form.validate()` and `dw-composite-form-element.validate()`. |
| `checkValidity()` | method | For invalid detection | Called by `dw-form.getInvalidElements()`. |

---

#### `<dw-form-field>` — Label Wrapper

```javascript
import '@dreamworld/dw-form/dw-form-field.js';
// or: import { DwFormField } from '@dreamworld/dw-form/dw-form-field.js';
```

Wraps a form input (typically a checkbox or radio button) with an interactive label. Clicking the label programmatically calls `focus()`, `click()`, and `blur()` on the first slotted element.

**Properties**

| Name | Type | Default | Reflects | Attribute | Description |
|---|---|---|---|---|---|
| `label` | `String` | `undefined` | No | `label` | Text content for the label. If omitted, the `label` slot is rendered instead. |
| `disabled` | `Boolean` | `false` | No | `disabled` | Disables pointer events and renders the label in the disabled text color. |
| `alignTop` | `Boolean` | `false` | Yes | `align-top` | Aligns the label to the top of the flex container instead of center. |
| `alignEnd` | `Boolean` | `false` | Yes | `alignEnd` | Reverses flex direction, placing the label after (to the right of) the input. |

**Slots**

| Slot | Description |
|---|---|
| *(default)* | The form element (e.g., checkbox, radio button). |
| `label` | Custom slotted label element. Used only when the `label` property is not set. |

**CSS Custom Properties**

| Property | Default | Description |
|---|---|---|
| `--mdc-theme-text-primary-on-background` | `rgba(0, 0, 0, 0.87)` | Label text color in the enabled state. |
| `--mdc-theme-text-disabled-on-background` | `rgba(0, 0, 0, 0.38)` | Label text color when `disabled` is set. |
| `--dw-form-field-label-min-height` | `auto` | Minimum height of the label element. |
| `--dw-form-field-label-padding` | `0` | Padding applied to the label. Has no effect when no label is present. |

**Examples**

```html
<!-- String label -->
<dw-form-field label="I agree to the terms">
  <my-checkbox name="agree"></my-checkbox>
</dw-form-field>

<!-- Slotted HTML label -->
<dw-form-field>
  <my-checkbox name="agree"></my-checkbox>
  <div slot="label" style="color: red;">Custom <strong>HTML</strong> label</div>
</dw-form-field>

<!-- Disabled -->
<dw-form-field label="Disabled option" disabled>
  <my-checkbox name="opt"></my-checkbox>
</dw-form-field>

<!-- Label aligned to the end (right) -->
<dw-form-field label="Right-aligned label" alignEnd>
  <my-checkbox name="opt"></my-checkbox>
</dw-form-field>

<!-- Label aligned to the top -->
<dw-form-field label="Top-aligned label" align-top>
  <my-checkbox name="opt"></my-checkbox>
</dw-form-field>
```

**Custom CSS example**

```css
dw-form-field {
  --mdc-theme-text-primary-on-background: blue;
  --dw-form-field-label-min-height: 40px;
  font-size: 18px;
}
```

---

#### `<dw-composite-form-element>` — Composite Form Element

```javascript
import '@dreamworld/dw-form/dw-composite-form-element.js';
// or: import { DwCompositeFormElement } from '@dreamworld/dw-form/dw-composite-form-element.js';
```

A form element composed of multiple child form elements. Extends `DwFormElement(LitElement)`, so it self-registers with a parent `<dw-form>` and prevents its children from registering directly.

**Properties**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `Object` | `{}` | Composite value object. Keys are child element `name` attributes; values are the corresponding child element values. Setting this property propagates the values down to the matching child elements. |

**Methods**

| Method | Signature | Returns | Description |
|---|---|---|---|
| `validate()` | `validate(): boolean` | `boolean` | Calls `validate()` on each registered child element that exposes a `validate` function. Returns `true` only if all children return `true`. |

**Events (dispatched)**

| Event | Detail | Description |
|---|---|---|
| `value-changed` | `{ value: Object }` | Fired (debounced 100ms) whenever any child element's value changes. The `value` in detail is the full composite object. |

**Events (consumed from children)**

| Event | Source | Description |
|---|---|---|
| `value-changed` | Child element | Triggers composite value update via `e.target.value`. |
| `selected` | Child element | Treated identically to `value-changed`. |
| `checked-changed` | Child element | Triggers composite value update via `e.target.checked`. |

**Slots**

| Slot | Description |
|---|---|
| *(default)* | Child form elements. |

---

### Advanced Usage

#### Extending `DwCompositeFormElement`

For reusable grouped fields, extend the class and define child elements in the `render()` template:

```javascript
import { LitElement, html } from '@dreamworld/pwa-helpers/lit.js';
import { DwCompositeFormElement } from '@dreamworld/dw-form/dw-composite-form-element.js';

class AddressField extends DwCompositeFormElement {
  render() {
    return html`
      <dw-input name="street" label="Street" .value="${this.value?.street}"></dw-input>
      <dw-input name="city"   label="City"   .value="${this.value?.city}"></dw-input>
      <dw-input name="zip"    label="ZIP"    .value="${this.value?.zip}"></dw-input>
    `;
  }
}
customElements.define('address-field', AddressField);

// Usage inside dw-form:
html`
  <dw-form>
    <address-field name="shippingAddress" .value="${this._address}"></address-field>
  </dw-form>
`
```

#### Duplicate `name` aggregation in `serialize()`

When multiple elements share the same `name` attribute (e.g., a group of checkboxes), `serialize()` aggregates their values into an array:

```html
<dw-form id="fruitForm">
  <dw-checkbox value="grapes" name="fruit" label="Grapes"></dw-checkbox>
  <dw-checkbox value="apple"  name="fruit" label="Apple" checked></dw-checkbox>
  <dw-checkbox value="banana" name="fruit" label="Banana" checked></dw-checkbox>
</dw-form>
```

```javascript
form.serialize();
// { fruit: ['apple', 'banana'] }
// Unchecked elements are omitted entirely.
```

#### `checked` property handling in `serialize()`

For elements where `checked` is a boolean property (checkbox, radio):

- `checked === true`: uses `el.value` as the serialized value; falls back to `true` if `el.value` is absent.
- `checked === false`: the element is **omitted** from the serialized output entirely.

---

## 2. Developer Guide / Architecture

### Architecture Overview

The library is built entirely on the Web Components standard with LitElement as the rendering layer. No external state management is used — all coordination is done through DOM events.

#### Design Patterns

| Pattern | Where | Description |
|---|---|---|
| **Mixin (Higher-Order Class)** | `dw-form-element.js` | `DwFormElement` is a function `(baseElement) => class extends baseElement`. Enables composable, framework-agnostic form-element behavior on any class. |
| **Event-Driven Registration** | `dw-form.js`, `dw-form-element.js` | Elements announce themselves to their nearest form container via `register-dw-form-element` / `unregister-dw-form-element` custom events rather than through direct parent-child references. |
| **Event Propagation Control** | `dw-form-element.js` | Each `DwFormElement` intercepts `register-dw-form-element` events originating from its children and stops propagation, so only the outermost element registers with `<dw-form>`. This is what enables composites. |
| **Observer** | `dw-composite-form-element.js` | `DwCompositeFormElement` subscribes to `value-changed`, `selected`, and `checked-changed` on each registered child to maintain its aggregate `value` object. |
| **Debounce** | `dw-composite-form-element.js` | `_dispatchValueChangeEvent` is debounced at 100ms using `lodash-es/debounce` to batch rapid child updates into a single `value-changed` event. |
| **Immutability via Spread** | `dw-composite-form-element.js` | Value updates use `{ ...this.value }` to produce a new object reference, enabling LitElement's dirty-checking to detect changes correctly. |

#### Registration Flow

```
Child element connected to DOM
  │
  └─► dispatches `register-dw-form-element` (bubbles, composed)
        │
        ├─ Intercepted by intermediate DwFormElement:
        │    └─ e.stopPropagation()  (prevents double-registration)
        │
        └─ Received by <dw-form> or <dw-composite-form-element>:
             └─ composedPath()[0] added to internal _customElements / _elements array
                  └─ Listens for `unregister-dw-form-element` on that element
```

#### Validation Flow

```
dw-form.validate()
  └─► forEach _customElements:
        └─ el.validate && el.validate()   ← returns false → overall result = false
              │
              └─ (if el is DwCompositeFormElement)
                   └─► forEach _elements:
                         └─ child.validate && child.validate()
```

#### Serialization Flow

```
dw-form.serialize()
  └─► forEach _customElements:
        ├─ skip if no el.name
        ├─ skip if value is null/undefined
        ├─ if el.checked is boolean:
        │    checked=true  → value = el.value || true
        │    checked=false → skip
        └─ if name already in json:
             └─ aggregate into array: [existing, newValue]
```

#### Module Responsibilities

| File | Class / Export | Responsibility |
|---|---|---|
| `dw-form.js` | `DwForm` (`<dw-form>`) | Form container. Maintains child element registry; exposes `validate()`, `serialize()`, `getInvalidElements()`. |
| `dw-form-element.js` | `DwFormElement` (mixin) | Adds self-registration lifecycle to any element. Blocks inner child elements from self-registering. |
| `dw-form-field.js` | `DwFormField` (`<dw-form-field>`) | Label wrapper for checkbox/radio. Delegates label clicks to the first slotted element. |
| `dw-composite-form-element.js` | `DwCompositeFormElement` (`<dw-composite-form-element>`) | Groups child form elements; aggregates their values into a single `Object`; delegates validation to children. |
