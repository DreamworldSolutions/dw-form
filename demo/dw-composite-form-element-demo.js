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

  render() {
    return html`
      <dw-composite-form-element @form-value-changed="${this._onValueChanged}">
        <section class="layout horizontal">
          <dw-input
            class="seprator"
            label="Input text"
            required
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

  _onValueChanged(e){
    console.log(e.detail.value);
  }
}

window.customElements.define('dw-composite-form-element-demo', DwCompositeFormElementDemo);