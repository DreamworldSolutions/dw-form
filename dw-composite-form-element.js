/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css, LitElement, html } from 'lit-element';

// These are lodash element needed by this element.
import debounce  from 'lodash-es/debounce';

// These are dw element needed by this element.
import { DwFormElement } from './dw-form-element';

export class DwCompositeFormElement extends DwFormElement(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * value of element
       */
      value: { type: Object }
    }
  }

  render() {
    return html`
      <slot></slot>
    `
  }

  constructor() {
    super();
    this._elements = [];
    this.value = {};
    this._dispatchValueChangeEvent = debounce(this._dispatchValueChangeEvent, 100);
    this._onElementValueChange = this._onElementValueChange.bind(this);
    this._onElementCheckedChange = this._onElementCheckedChange.bind(this);
    this._onRegisterDwFormElement = this._onRegisterDwFormElement.bind(this);
    this._onUnregisterDwFormElement = this._onUnregisterDwFormElement.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('register-dw-form-element', this._onRegisterDwFormElement);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener('register-dw-form-element', this._onRegisterDwFormElement);
    this._elements.forEach((element) => {
      this._unbindValueChangedEvents(element);
    });
    this._elements = [];
  }

  /**
   * @param {Object} val 
   */
  set value(val) {
    if (val === this._value) {
      return;
    }
    let oldValue = this._value;
    this._value = val;
    this._setChildElementValue();
    this.requestUpdate('value', oldValue);
  }

  /**
   * get value
   */
  get value() {
    return this._value;
  }

  _onRegisterDwFormElement(e) {
    let element = e.composedPath()[0];

    if (element === this) {
      return;
    }

    element.addEventListener('value-changed', this._onElementValueChange);
    element.addEventListener('checked-changed', this._onElementCheckedChange);
    element.addEventListener('unregister-dw-form-element', this._onUnregisterDwFormElement);
    this._elements.push(element);
    this._setChildElementValue();
  }

  _onUnregisterDwFormElement(e) {
    let element = e.target;
    if (this._elements.indexOf(element) != -1) {
      this._elements.splice(element.index, 1);
    }
    this._unbindValueChangedEvents(element);

  }

  _unbindValueChangedEvents(element) {
    element.removeEventListener('value-changed', this._onElementValueChange);
    element.removeEventListener('checked-changed', this._onElementCheckedChange);
  }

  /**
   * set child element value.
   */
  _setChildElementValue() {
    if (!this.value || !Object.keys(this.value).length) {
      return;
    }

    this._elements.forEach((element) => {
      let name = element.name;
      element.value = this.value[name];
    });
  }

  /**
   * fire `form-value-changed` event and set `value` property.
   * @param {Object} e - Event data. 
   */
  _onElementValueChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.value[name] = value;
    this._dispatchValueChangeEvent();
  }

  /**
  * fire `form-value-changed` event and set `value` property.
  * @param {Object} e - Event data. 
  */
  _onElementCheckedChange(e) {
    let value = e.target.checked;
    let name = e.target.name;

    this.value[name] = value;
    this._dispatchValueChangeEvent();
  }

  /**
   * dispatch `form-value-changed` event.
   */
  _dispatchValueChangeEvent() {
    this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.value } }));
  }

  /**
   * It's return true if all children element validate method is true, otherwise return false.
   * @return {Boolean}
   */
  validate() {
    let bValidate = true;

    this._elements.forEach((element) => {
      if (!element.validate || typeof element.validate !== 'function') {
        return;
      }

      if (!element.validate()) {
        bValidate = false;
      }
    });

    return bValidate;
  }
}

window.customElements.define('dw-composite-form-element', DwCompositeFormElement);