import { html, css, LitElement } from '@dreamworld/pwa-helpers/lit.js';
import '../dw-form-field';


class DwFormFieldDemo extends LitElement {
  static get styles() {
    return [
      css`
        dw-form-field{
          margin-bottom: 24px;
        }

        .custom-theme{
          --mdc-theme-secondary: blue;
          --mdc-theme-text-primary: blue;
          font-size: 20px;
        }
      `
    ];
  }

  render() {
    
    return html`
      <h4>Basic</h4>
      <dw-form-field label="This is checkbox">
        <input type="checkbox">
      </dw-form-field>

      <h4>Disabled</h4>
      <dw-form-field label="This is disabled label" disabled>
        <input type="checkbox">
      </dw-form-field>

      <h4>Custom theme</h4>
      <dw-form-field >
        <input type="checkbox">
        <div slot="label">Hello Label, This is a slotted label</div>
      </dw-form-field>

      <h4>Custom theme</h4>
      <dw-form-field class="custom-theme" label="This is a custom label">
        <input type="checkbox">
      </dw-form-field>

      <h4>End aligned label</h4>
      <dw-form-field alignEnd  label="This is a end aligned label">
        <input type="checkbox">
      </dw-form-field>

      <h4>Custom Label label</h4>
      <dw-form-field alignEnd>
        <input type="checkbox">
        <div style="background-color:powderblue; color: red; font-size: 24px;" slot="label">Hello Label</div>
      </dw-form-field>
    `;
  }

}

customElements.define('dw-form-field-demo', DwFormFieldDemo);