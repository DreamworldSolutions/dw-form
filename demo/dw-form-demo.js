import { html, css, LitElement} from '@dreamworld/pwa-helpers/lit.js';
import '../dw-form.js';
import '@dreamworld/dw-checkbox/dw-checkbox';
import '@dreamworld/dw-input/dw-input';
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

        .horizontal-layout{
          display: flex;
          flex-direction: row;
        }

        .horizontal-layout dw-input{
          margin-right: 24px;
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
        <section class="horizontal-layout">
          <dw-input class="row" name="firstName" label="First name" required></dw-input>
          <dw-input class="row" name="lastName" label="Last name"></dw-input>
        </section>
        <h4>Fruit</h4>
        <dw-checkbox value="grapes" class="row" name="fruit" label="Grapes"></dw-checkbox>
        <dw-checkbox value="apple" class="row" name="fruit" label="Apple"></dw-checkbox>
        <dw-checkbox value="banana" class="row" name="fruit" label="Banana"></dw-checkbox>

        <dw-checkbox alignEnd class="row agree" name="agree" label="Are you agree?"></dw-checkbox>
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