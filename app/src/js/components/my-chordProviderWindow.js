
import './my-button.js'
import './my-display.js'
import { ChordProvider } from '../../../module/chordProvider.js'
/**
 * The my-chordProviderWindow web component module.
 *
 * @author Gustav Karlberg <gk222iv@student.lnu.se>
 */

const template = document.createElement('template')
template.innerHTML = `

<style>
  #theDiv{
   
    font-size: 35px;
    text-align: center;
    display: grid;
    justify-content: center;
    margin: 0;
    /* border: 1px solid black; */
  }

  #btnDiv{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  my-button {
    margin-bottom: 1rem;
  }

  </style>

<div id='theDiv'>

  <h1></h1>

  <div id='btnDiv'>
    <my-button id='chordBtn'text='chord'></my-button>
    <my-button id='chordsInKeyBtn' text='chords in key'></my-button>
  </div>
  
  <my-display id='display'></my-display>
  

</div>
`

customElements.define('my-chordproviderwindow',
  /**
   * Represents a my-div element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.chordProvider = new ChordProvider()
      this.text = this.shadowRoot.querySelector('h1')
      this.display = this.shadowRoot.querySelector('#display')
      this.chordButton = this.shadowRoot.querySelector('#chordBtn')
      this.chordsInKeyBtn = this.shadowRoot.querySelector('#chordsInKeyBtn')

      this.chordButton.addEventListener('click', () => {
        this.display.setAttribute('show', this.chordButton.getAttribute('text'))
      })

      this.chordsInKeyBtn.addEventListener('click', () => {
        this.display.setAttribute('show', this.chordsInKeyBtn.getAttribute('text'))
      })
    }

    /**
     * Watches the attribute "headline" for changes on the element.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['headline']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'headline') {
        this.text.innerText = newValue
      }
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      // this.text.innerText = 'ChordProvider'
    }
  })
