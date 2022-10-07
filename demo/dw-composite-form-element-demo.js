import { css, html, LitElement } from '@dreamworld/pwa-helpers/lit.js';
import '../dw-composite-form-element'; 
import '@dreamworld/dw-input';

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
        .horizontal{
          flex-direction: row;
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
            .index="${0}"
            errorMessage="required"
            placeholder="Enter text"
            name="input1">
          </dw-input>
          <dw-input
           class="seprator"
            label="Input text"
            .index="${1}"
            placeholder="Enter text"
            name="input2">
          </dw-input>
          <dw-input
            label="Input text"
            .index="${2}"
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