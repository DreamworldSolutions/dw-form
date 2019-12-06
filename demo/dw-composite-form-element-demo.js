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
import '../dw-composite-form-element';
import '@dreamworld/dw-input';
import { flexLayout } from '@dreamworld/flex-layout/flex-layout';

export class DwCompositeFormElementDemo extends LitElement {
  static get styles() {
    return [
      flexLayout,
      css`
        :host {
          display: block;
        }
        .seprator {
          margin-right: 24px;
        }
        dw-input {
          width: 300px;
        }
      `
    ];
  }

  static get properties() {
    return {
      _inputs: { type: Object }
    };
  }


  render() {
    return html`
      <dw-composite-form-element @value-changed="${this._onValueChanged}" .value="${this._inputs}">
        <section class="layout horizontal">
          <dw-input
            class="seprator"
            label="Input text"
            required
            errorMessage="required"
            placeholder="Enter text"
            name="input1">
          </dw-input>
          <dw-input
           class="seprator"
            label="Input text"
            placeholder="Enter text"
            name="input2">
          </dw-input>
          <dw-input
            label="Input text"
            placeholder="Enter text"
            name="input3">
          </dw-input>
        </section>
      </dw-composite-form-element>
    `
  }

  _onValueChanged(e) {
    console.log(e.detail.value);
  }

  constructor() {
    super();

    this._inputs = {
      'input1': 'input 1',
      'input2': 'input 2',
      'input3': 'input 2'
    }
  }
}

window.customElements.define('dw-composite-form-element-demo', DwCompositeFormElementDemo);