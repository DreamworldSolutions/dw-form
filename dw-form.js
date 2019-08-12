/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';

export class DwForm extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
          outline:none;
        }

        :host[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {

      /* List of registered elements */
      _customElements: {
        type: Array
      }
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  constructor() { 
    super();
    this._customElements = [];
  }

  /**
    * Called every time the element is inserted into the DOM. 
    */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('register-dw-form-element', this._registerEventHandler);
    this._listenUnregisterEvent();
  }

  /**
    * Called every time the element is removed from the DOM.
    */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._customElements = [];
    this.removeEventListener('register-dw-form-element', this._registerEventHandler);
    this.removeEventListener('unregister-dw-form-element', this._unregisterEventHandler);
  }

  /**
   * Validates all the registred elements in the form.
   * @return {boolean} True if all the elements are valid.
   */
  validate() { 
    let valid = true;
    this._customElements.forEach(el => {

      if (el && el.validate) {
        valid = !!el.validate() && valid;
      }

    });

    return valid;
  }

  /**
   * Returns a json object containing name/value pairs for all the registered
   * components. If there are elements
   * with duplicate names, then their values will get aggregated into an
   * array of values.
   *
   * @return {!Object}
   */
  serialize() { 
    let json = {};

    this._customElements.forEach(el => {

      if (!el.name) { 
        return;
      }

      let value = el.value;

      if (el.checked === true || el.checked === false) { 
        value = el.checked ? el.value || el.checked : null;
      }

      if (value === null || value === undefined) { 
        return;
      }

      // If the name doesn't exist, add it
      if (!json[el.name]) {
        json[el.name] = value;
        return;
      }

      json[el.name] = Array.isArray(json[el.name]) ? [...json[el.name], value] : [json[el.name], value];
    });

    return json;
  }

  /**
   * Binds `unregister-dw-form-element` event listeners
   * Here, binding listener on light dom as event is not propagating to parent when
   * it's triggers from light dom's `disconnectedCallback`
   */
  _listenUnregisterEvent() { 
    let elements = this.querySelectorAll('*');

    elements.forEach((el) => {
      el.addEventListener('unregister-dw-form-element', this._unregisterEventHandler.bind(this));
    });
  }

  /**
   * @param {Event} e 
   * Adds element in to the customElement's list
   */
  _registerEventHandler(e) { 
    this._customElements.push(e.detail);
  }

  /**
   * @param {Event} e 
   * Removes element from the customElement's list
   */
  _unregisterEventHandler(e) { 
    let index = this._customElements.indexOf(e.detail);

    if (index > -1) { 
      this._customElements.splice(index, 1);
    }
  }
  
}

window.customElements.define('dw-form', DwForm);