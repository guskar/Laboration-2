
import '../components/my-button.js'
import '../components/my-display.js'
import { ChordProvider } from '../../../module/chordProvider.js'
/**
 * The my-div web component module.
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
    border: 1px solid black;
  }

  #btnDiv{
    display: flex;
  }
  </style>

<div id='theDiv'>
  <h1></h1>
  <div id='btnDiv'>
    <my-button id='chordBtn'text='chord'></my-button>
    <my-button id='chordsInKeyBtn' text='chords in key'></my-button>
  </div>
  <!-- <div id='btnDiv'>
    <my-button text='A'></my-button>
    <my-button text='Bb'></my-button>
    <my-button text='B'></my-button>
    <my-button text='C'></my-button>
    <my-button text='Db'></my-button>
    <my-button text='D'></my-button>
    <my-button text='Eb'></my-button>
    <my-button text='E'></my-button>
    <my-button text='F'></my-button>
    <my-button text='Gb'></my-button>
    <my-button text='G'></my-button>
    <my-button text='Ab'></my-button>
  </div> -->

  
    <my-display id='displayEasyChord'></my-display>
  

</div>
`

customElements.define('my-div',
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
      this.display = this.shadowRoot.querySelector('#displayEasyChord')
      this.chordButton = this.shadowRoot.querySelector('#chordBtn')
      this.chordsInKeyBtn = this.shadowRoot.querySelector('#chordsInKeyBtn')

      this.chordButton.addEventListener('click', () => {
        this.display.setAttribute('show', this.chordButton.getAttribute('text'))
      })

      this.chordsInKeyBtn.addEventListener('click', () => {
        this.display.setAttribute('show', this.chordsInKeyBtn.getAttribute('text'))
      })
    }
      // this.buttons = this.shadowRoot.querySelectorAll('my-button')

    //   this.buttons.forEach((button) => {
    //     button.addEventListener('click', async (event) => {
    //       const chordString = await this.chordProvider.getChordAsString(button.getAttribute('text'))
    //       this.display.setAttribute('text', chordString)
    //       event.preventDefault()
    //     })
    //   })
    // }

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
