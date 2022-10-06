import { LitElement, html, css } from "@dreamworld/pwa-helpers/lit.js";
import { classMap } from 'lit/directives/class-map.js';

import * as TypographyLiterals from "@dreamworld/material-styles/typography-literals";

export class DwFormField extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          cursor: pointer;
        }

        :host([disabled]) {
          cursor: default;
          pointer-events: none;
        }

        :host([disabled]) .dw-label {
          color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38));
        }

        :host([alignEnd]) .dw-form-field {
          flex-direction: row-reverse;
        }

        .dw-form-field {
          display: flex;
          font-size: inherit;
          line-height: inherit;
          font-family: inherit;
        }

        /* Removes label padding when label is not available */
        :host(:not([_hasLabel])) .dw-form-field > .dw-label {
          padding: 0;
        }

        .dw-label {
          flex: 1;
          align-self: center;
          padding: var(--dw-form-field-label-padding);
          color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));

          ${TypographyLiterals.body2};
          min-height: var(--dw-form-field-label-min-height, auto);
          cursor: pointer;
        }

        ::slotted :host([align-top]) .dw-label {
          align-self: flex-start;
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Represents Element label in String
       */
      label: {
        type: String,
      },

      /**
       * Set to true to disabled click
       */
      disabled: { type: Boolean },

      /**
       * Aligns label at top.
       */
      alignTop: { type: Boolean, reflect: true, attribute: "align-top" },

      /**
       * Align the component at the end of the label.
       */
      alignEnd: {
        type: Boolean,
        reflect: true,
      },

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
      "dw-form-field--align-end": this.alignEnd,
      "dw-form-field--space-between": this.spaceBetween,
      "dw-form-field--nowrap": this.nowrap,
    };
    return html` <div class="dw-form-field ${classMap(classes)}">
      <slot></slot>
      ${this._renderLabel()}
    </div>`;
  }

  _renderLabel() {
    if (this.label) {
      return html` <div class="dw-label" @click="${this._labelClick}">${this.label}</div> `;
    }

    return html`<div class="dw-label" @click="${this._labelClick}">
      <slot name="label"></slot>
    </div>`;
  }

  _labelClick() {
    let el = this.renderRoot.querySelector("slot").assignedElements({ flatten: true })[0];

    if (el) {
      el.focus();
      el.click();
      el.blur();
    }
  }

  set label(value) {
    const oldValue = this._label;
    let labelEl = this.renderRoot.querySelector(".dw-label");
    this._label = value;
    this._hasLabel = !!(value || labelEl);
    this.requestUpdate("label", oldValue);
  }

  get label() {
    return this._label;
  }
}

window.customElements.define("dw-form-field", DwFormField);
