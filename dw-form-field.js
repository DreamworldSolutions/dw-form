/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css } from 'lit-element';
import { Formfield } from '@material/mwc-formfield';

export class DwFormField extends Formfield {
  static get styles() {
    return [
      Formfield.styles,
      css`
        :host {
          display: block;
          --mdc-theme-text-primary-on-background: var(--mdc-theme-text-primary);
        }

        :host([disabled]) {
          pointer-events: none;
        }

        :host([disabled]) .mdc-form-field {
          color: var(--mdc-theme-disabled-text-color, rgba(0,0,0,0.38));
        }

        .mdc-form-field {
          font-size: inherit;
          line-height: inherit;
          font-family: inherit;
        }
        
        /* Removes label padding when label is not available */
        :host(:not([_hasLabel])) .mdc-form-field > label{
          padding-left: 0px;
          /* for alignEnd label */
          padding-right: 0px;
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * Set to true to disabled click
       */
      disabled: { type: Boolean },
      
      /**
       *  True if label is available
       */
      _hasLabel: {
        type: Boolean,
        reflect: true
      }
    }
  }

  constructor() {
    super();
    this.disabled = false;
  }

  set label(value) {
    const oldValue = this._label;
    this._label = value;
    this._hasLabel = !!value;
    this.requestUpdate('label', oldValue);
  }

  get label() {
    return this._label;
  }

}

window.customElements.define('dw-form-field', DwFormField);