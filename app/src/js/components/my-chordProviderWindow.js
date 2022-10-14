
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
    background-image: url('https://indiebandguru.com/wp-content/uploads/2022/05/guitar.webp');
    font-size: 35px;
    color: white;
    text-align: center;
    display: grid;
    height: 100%;
    justify-content: center;
    margin: 0;
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
  <h4 id='flash'></h4>

  <div id='btnDiv'>
    <my-button id='chordBtn'text='Easy Chord'></my-button>
    <my-button id='chordsInKeyBtn' text='Make a song'></my-button>
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
      this.flash = this.shadowRoot.querySelector('#flash')

      this.chordButton.addEventListener('click', () => {
        this.flash.innerText = 'Go ahead and pick a chord'
        this.display.setAttribute('show', this.chordButton.getAttribute('text'))
      })

      this.chordsInKeyBtn.addEventListener('click', () => {
        this.flash.innerText = 'Go ahead and pick a chord for a song'
        this.display.setAttribute('show', this.chordsInKeyBtn.getAttribute('text'))
      })

      this.addEventListener('errorflash', (e) => {
        this.flash.innerText = 'Something went wrong trying to fetch api'
        this.flash.style.color = 'red'
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
  })
