
/**
 * The my-counter web component module.
 *
 * @author Gustav Karlberg <gk222iv@student.lnu.se>
 */

const template = document.createElement('template')
template.innerHTML = `
<div>
  <h1>hej</h1>
</div>

<style>
  div{
    width: 500px;
    height: 500px;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
</style>

`

customElements.define('my-div',
  /**
   * Represents a my-counter element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.text = this.shadowRoot.querySelector('h1')
    }

    /**
     * Watches the attribute "limit" for changes on the element.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['limit']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'limit') {
        this.count = newValue
      }
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      this.text.innerText = 'hej'
    }
  })
