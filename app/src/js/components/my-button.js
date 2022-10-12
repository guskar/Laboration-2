
/**
 * The my-button web component module.
 *
 * @author Gustav Karlberg <gk222iv@student.lnu.se>
 */

const template = document.createElement('template')
template.innerHTML = `
 <button id='btn'></button>
 
 <style>
   button{
     border-radius: 90px;
     border: none;
     width: 60px;
     height: 60px;
     font-size: 12px;
     padding: 0;
     margin: 2px;
   }

   button:hover{
     background-color: lightgrey;
   }

 </style>
 
 `

customElements.define('my-button',
  /**
   * Represents a my-button element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.button = this.shadowRoot.querySelector('#btn')
    }

    /**
     * Watches the attribute "text" for changes on the element.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['text']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'text') {
        this.button.innerText = newValue
      }
    }
  })
