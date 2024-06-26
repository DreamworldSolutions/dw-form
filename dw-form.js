import { html, css, LitElement } from '@dreamworld/pwa-helpers/lit.js';

export class DwForm extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          outline:none;
        }

        :host[hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  constructor() { 
    super();
    this._customElements = [];
    this._onUnregister = this._onUnregister.bind(this);
  }

  /**
    * Called every time the element is inserted into the DOM. 
    * Listens `register-dw-form-element` and `unregister-dw-form-element` event
    */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('register-dw-form-element', this._onRegister);
  }

  /**
    * Called every time the element is removed from the DOM.
    * Removes event listeners for `register-dw-form-element` and `unregister-dw-form-element`
    */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('register-dw-form-element', this._onRegister);
    this._customElements.forEach((el) => {
      el.removeEventListener('unregister-dw-form-element', this._onUnregister);
    });
    this._customElements = [];
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
   * components. If there are elements with duplicate names, then their values will get aggregated into an
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
   * Validates all the registred elements in the form.
   * @return {Array} of invalid elements.
   */
  getInvalidElements() {
    let invalidEements = [];

    this._customElements.forEach((el) => {
      if (el && el.checkValidity && el.checkValidity() === false) {
        invalidEements.push(el);
      }
    });

    return invalidEements;
  }

  /**
   * @param {HTMLElement} - registered element
   * Binds `unregister-dw-form-element` event listeners
   */
  _listenUnregisterEvent(el) { 
    el.addEventListener('unregister-dw-form-element', this._onUnregister);
  }

  /**
   * @param {Event} e 
   * Adds element in to the customElement's list
   */
  _onRegister(e) { 
    this._customElements.push(e.composedPath()[0]);
    this._listenUnregisterEvent(e.composedPath()[0]);
  }

  /**
   * @param {Event} e 
   * Removes element from the customElement's list
   */
  _onUnregister(e) { 
    let index = this._customElements.indexOf(e.composedPath()[0]);

    if (index > -1) { 
      this._customElements[index].removeEventListener('unregister-dw-form-element', this._onUnregister);
      this._customElements.splice(index, 1);
    }
  }
  
}

customElements.define('dw-form', DwForm);