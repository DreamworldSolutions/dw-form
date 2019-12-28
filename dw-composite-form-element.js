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
    this._debounceFn = this.debounce(this._dispatchValueChangeEvent, 100);
    this._onElementValueChange = this._onElementValueChange.bind(this);
    this._onElementCheckedChange = this._onElementCheckedChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

     this.addEventListener('register-dw-form-element', (e) => {
      let element = e.composedPath()[0];

      if (element === this) {
        return;
      }

      element.addEventListener('value-changed', this._onElementValueChange);
      element.addEventListener('checked-changed', this._onElementCheckedChange);
      element.addEventListener('unregister-dw-form-element', () => {
        if (this._elements.indexOf(element) != -1) {
          this._elements.splice(element.index, 1);
        }

        element.removeEventListener('value-changed', this._onElementValueChange);
        element.removeEventListener('checked-changed', this._onElementCheckedChange);
      });

      this._elements.push(element);
    });
  }

  /**
   * @param {Object} val 
   */
  set value(val) {
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

  /**
   * set child element value.
   */
  _setChildElementValue(){
    if(!this.value || !Object.keys(this.value).length){
      return;
    }

    setTimeout(() => {
      this._elements.forEach((element) => {
        let name = element.name; 
  
        element.value = this.value[name];
      });
    }, 50);
  }

  /**
   * fire `form-value-changed` event and set `value` property.
   * @param {Object} e - Event data. 
   */
  _onElementValueChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.value[name] = value;
    this._debounceFn(); 
  }

   /**
   * fire `form-value-changed` event and set `value` property.
   * @param {Object} e - Event data. 
   */
  _onElementCheckedChange(e){
    let value = e.target.checked;
    let name = e.target.name;

    this.value[name] = value;
    this._debounceFn();
  }

  /**
   * dispatch `form-value-changed` event.
   */
  _dispatchValueChangeEvent(){
    this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.value } }));
  }

  /**
   * 
   * @param {Function} func 
   * @param {Number} delay 
   */
  debounce(func, delay){
    let debounceTimer;

    return function() { 
      const context = this;
      const args = arguments;

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
  }  

  /**
   * It's return true if all children element validate method is true, otherwise return false.
   * @return {Boolean}
   */
  validate(){
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