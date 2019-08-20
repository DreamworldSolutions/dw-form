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
import '@dw/dw-form/dw-form-field';
import '@material/mwc-checkbox';


class DwFormFieldDemo extends LitElement {
  static get styles() {
    return [
      css`
        dw-form-field{
          margin-bottom: 24px;
        }

        .custom-theme{
          --primary-text-color: blue;
          --accent-color: blue;
          font-size: 20px;
        }
      `
    ];
  }

  render() {
    
    return html`
      <h4>Basic</h4>
      <dw-form-field label="This is checkbox">
        <mwc-checkbox></mwc-checkbox>
      </dw-form-field>

      <h4>Disabled</h4>
      <dw-form-field label="This is disabled label" disabled>
        <mwc-checkbox></mwc-checkbox>
      </dw-form-field>

      <h4>Custom theme</h4>
      <dw-form-field class="custom-theme" label="This is a custom label">
        <mwc-checkbox checked></mwc-checkbox>
      </dw-form-field>

      <h4>End aligned label</h4>
      <dw-form-field alignEnd  label="This is a end aligned label">
        <mwc-checkbox></mwc-checkbox>
      </dw-form-field>
    `;
  }

}

window.customElements.define('dw-form-field-demo', DwFormFieldDemo);