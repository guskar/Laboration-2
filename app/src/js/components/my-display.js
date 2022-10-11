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
      width: 700px;
      height: 300px;
      font-size: 20px;
      text-align: left;
      /* border: 1px solid black; */
      padding: 0;
      margin: 0;
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
      if (name === 'show' && newValue === 'chord') {
        console.log(name, newValue)
        this.buttons.forEach((button) => {
          button.removeEventListener('click', this.showSongStructure)
          button.addEventListener('click', this.showEasyChord)
        })
      }

      if (name === 'show' && newValue === 'chords in key') {
        console.log(name, newValue)
        this.buttons.forEach((button) => {
          button.removeEventListener('click', this.showEasyChord)
          button.addEventListener('click', this.showSongStructure)
        })
      }
    }

    /**
     * Called when the element is added to the DOM.
     */
    async connectedCallback () {
      // const chordString = await this.chordProvider.getChordAsString('A')
      // this.div.innerText = chordString
    }

    showEasyChord = async (event) => {
      const chordString = await this.chordProvider.getChordAsString(event.target.getAttribute('text'))
      this.div.innerText = chordString
    }

    showSongStructure = async (event) => {
      const chords = await this.chordProvider.getRandomSongStructure(event.target.getAttribute('text'))
      this.div.innerText = `Verse:\n ${chords.verse}\nRefrain:\n ${chords.chorus}\nBridge:\n ${chords.bridge}`
    }
  })
