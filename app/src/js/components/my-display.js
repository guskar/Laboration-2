
/**
 * The my-display web component module.
 *
 * @author Gustav Karlberg <gk222iv@student.lnu.se>
 */

const template = document.createElement('template')
template.innerHTML = `
  
  <style>
    div{
      width: 600px;
      height: 100px;
      font-size: 20px;
      border: 1px solid black;
      padding: 0;
      margin: 0;
    }
    </style>
  
  <div></div>
  `

customElements.define('my-display',
  /**
   * Represents a my-dispaly element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.div = this.shadowRoot.querySelector('div')
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
        this.div.innerText = newValue
      }
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {

    }
  })
