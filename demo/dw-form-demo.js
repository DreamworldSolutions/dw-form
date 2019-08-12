/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css} from 'lit-element';
import '../dw-form.js';
import '@dw/dw-checkbox/dw-checkbox';
import '@dw/dw-input/dw-input';
import { DwFormElement } from '../dw-form-element';

class DwFormDemo extends DwFormElement(LitElement) {
  static get styles() {
    return [
      css`
        :host{
          --accent-color: #6200ee;
        }
        .row{
          margin-bottom: 16px;
        }

        .agree{
          display: block;
        }

        button{
          width: 200px;
          background: #6200ee;
          padding: 8px;
          border: none;
          color: #fff;
          font-size: 16px;
          margin-right: 16px;
        }

        h4{
          margin-bottom: 8px;
        }
      `
    ];
  }

  static get properties() { 
    return {
      test: {type : Boolean}
    }
  }


  render() {
    return html`
      <dw-form>
        <dw-input class="row" name="firstName" label="First name" required></dw-input>
        <dw-input class="row" name="lastName" label="Last name" required></dw-input>
        <dw-input class="row" name="schoolName" label="School name"></dw-input>
        <h4>Fruit</h4>
        <dw-checkbox value="grapes" class="row" name="fruit" label="Grapes"></dw-checkbox>
        <dw-checkbox value="apple" class="row" name="fruit" label="Apple"></dw-checkbox>
        <dw-checkbox value="banana" class="row" name="fruit" label="Banana"></dw-checkbox>
        <dw-checkbox class="row agree" name="agree" label="Are you agree?"></dw-checkbox>
      </dw-form>

      <section>
        <button @click="${this.validate}">Validate</button>
        <button @click="${this.serialize}">Serialize</button>
      </section>
    `;
  }

  validate() { 
    let el = this.shadowRoot.querySelector('dw-form');
    el.validate();
  }

  serialize() { 
    let el = this.shadowRoot.querySelector('dw-form');
    let json = el.serialize();

    alert('Open console to see serialize data');
    console.log(json);
  }

}

window.customElements.define('dw-form-demo', DwFormDemo);