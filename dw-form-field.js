/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css } from "lit-element";
import { Formfield } from "@material/mwc-formfield";
import { classMap } from "lit-html/directives/class-map";
import { html, property, query } from "lit-element";

export class DwFormField extends Formfield {
  static get styles() {
    return [
      Formfield.styles,
      css`
        :host {
          display: inline-block;
          cursor: pointer;
          --mdc-theme-text-primary-on-background: var(--mdc-theme-text-primary);
        }

        :host([disabled]) {
          cursor: default;
          pointer-events: none;
        }

        :host([disabled]) .mdc-form-field {
          color: var(--mdc-theme-disabled-text-color, rgba(0, 0, 0, 0.38));
        }

        .mdc-form-field {
          font-size: inherit;
          line-height: inherit;
          font-family: inherit;
        }

        /* Removes label padding when label is not available */
        :host(:not([_hasLabel])) .mdc-form-field > label {
          padding-left: 0px;
          /* for alignEnd label */
          padding-right: 0px;
        }

        :host([disabled]) label {
          cursor: default;
        }

        label {
          min-height: var(--dw-form-field-label-min-height, auto);
          cursor: pointer;
        }

        :host([align-top]) .mdc-label {
          align-self: flex-start;
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Set to true to disabled click
       */
      disabled: { type: Boolean },

      /**
       * Aligns label at top.
       */
      alignTop: { type: Boolean, reflect: true, attribute: "align-top" },

      /**
       *  True if label is available
       */
      _hasLabel: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    const classes = {
      "mdc-form-field--align-end": this.alignEnd,
      "mdc-form-field--space-between": this.spaceBetween,
      "mdc-form-field--nowrap": this.nowrap,
    };
    return html` <div class="mdc-form-field ${classMap(classes)}">
      <slot></slot>
      ${this._renderLabel()}
    </div>`;
  }

  _renderLabel() {
    if (this.label) {
      return html`<label class="mdc-label" @click="${this._labelClick}"
        >${this.label}</label
      >`;
    }

    return html`<slot
      name="label"
      class="mdc-label"
      @click="${this._labelClick}"
    ></slot>`;
  }

  set label(value) {
    const oldValue = this._label;
    this._label = value;
    this._hasLabel = !!value;
    this.requestUpdate("label", oldValue);
  }

  get label() {
    return this._label;
  }
}

window.customElements.define("dw-form-field", DwFormField);
