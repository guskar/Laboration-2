import { ChordProvider } from '../../../module/chordProvider.js'

/**
 * The my-display web component module.
 *
 * @author Gustav Karlberg <gk222iv@student.lnu.se>
 */

const template = document.createElement('template')
template.innerHTML = `
  
  <style>

    div{
      width: 500px;
      height: 300px;
      font-size: 20px;
      text-align: center;
      padding: 1rem;
      margin: 0;
    }

    #displayDiv{
      padding-top: 1rem;
    }
    </style>
  
  <div id='btnDiv'>
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
    <div id='displayDiv'></div>
  </div>

  
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
      this.div = this.shadowRoot.querySelector('#displayDiv')
      this.chordProvider = new ChordProvider()
      this.buttons = this.shadowRoot.querySelectorAll('my-button')
    }

    /**
     * Watches the attribute "show" for changes on the element.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['show']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'show' && newValue === 'Easy Chord') {
        console.log(name, newValue)
        this.buttons.forEach((button) => {
          button.removeEventListener('click', this.showSongStructure)
          button.addEventListener('click', this.showEasyChord)
        })
      }

      if (name === 'show' && newValue === 'Make a song') {
        console.log(name, newValue)
        this.buttons.forEach((button) => {
          button.removeEventListener('click', this.showEasyChord)
          button.addEventListener('click', this.showSongStructure)
        })
      }
    }

    /**
     * Responsible for handling the showEasyChord event.
     *
     * @param {object} event - Represents the event object.
     */
    showEasyChord = async (event) => {
      try {
        const chordString = await this.chordProvider.getChordAsString(event.target.getAttribute('text'))
        this.div.innerText = chordString
      } catch (error) {
        console.log(error.message)
        this.dispatchEvent(new CustomEvent('errorflash', { bubbles: true, composed: true }))
      }
    }

    /**
     * Responsible for handling the showSongStructure event.
     *
     * @param {object} event - Representing the event object.
     */
    showSongStructure = async (event) => {
      try {
        const chordsInSongStructure = await this.chordProvider.getRandomSongStructure(event.target.getAttribute('text'))
        this.div.innerText = this.crateEasySongString(chordsInSongStructure)
      } catch (error) {
        this.dispatchEvent(new CustomEvent('errorflash', { bubbles: true, composed: true }))
      }
    }

    /**
     * Responsible for formating the string.
     *
     * @param {object} chordsInSongStructure - Represents the object to make string from.
     * @returns {string} - Returns the formatted string.
     */
    crateEasySongString (chordsInSongStructure) {
      const easySongString = `Verse:\n ${chordsInSongStructure.verse}\nChorus:\n ${chordsInSongStructure.chorus}\nBridge:\n ${chordsInSongStructure.bridge}`
      return easySongString
    }
  })
