/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
export const DwFormElement = (baseElement) => class extends baseElement {

  /**
    * Called every time the element is inserted into the DOM. Useful for 
    * running setup code, such as fetching resources or rendering.
    * Generally, you should try to delay work until this time.
    */
  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    
    //Setting timeout because it's called before parent's "connectedCallback".
    setTimeout(() => {
      this._triggerFormElementRegisterEvent();
      this._stopInnerElementRegisterEvent();
    }, 1);
  }
    
  /**
    * Called every time the element is removed from the DOM. Useful for 
    * running clean up code (removing event listeners, etc.).
    * Triggers `unregister-dw-form-element` event
    */
  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    let event = new CustomEvent('unregister-dw-form-element', {
      detail: this,
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(event);
  }

  /**
   * Listens `register-dw-form-element` event
   * Stop event propagation if it's inner form element's event
   */
  _stopInnerElementRegisterEvent() { 
    this.addEventListener('register-dw-form-element', (e) => { 
      if (e.path[0] !== this) { 
        e.stopPropagation();
        return;
      }
    });
  }

  /**
   * Triggers `register-dw-form-element` event
   */
  _triggerFormElementRegisterEvent() { 
    let event = new CustomEvent('register-dw-form-element', { 
      detail: this,
      bubbles: true, 
      composed: true
    });
    
    this.dispatchEvent(event); 
  }
};