
/**
 * An error class responsible for throwing errors.
 */
export class ErrorHandler {
  /**
   * Cheks if input is of type string.
   *
   * @param {string}inputToCheck - the input value to check.
   * @throws {Error} - Throws error if input isn´t of type string.
   */
  errorCheckString (inputToCheck) {
    if (typeof inputToCheck !== 'string') {
      throw new Error('The input has to be a string')
    }
    this.errorCheckChord(inputToCheck)
  }

  /**
   * Checks if input is of type Array and if the array is empty.
   *
   * @param {string[]}inputToCheck - the input value to check.
   * @throws {Error} - Throws error if array is empty.
   */
  errorCheckArray (inputToCheck) {
    if (!Array.isArray(inputToCheck)) {
      throw new Error('The input has to be an array')
    }
    if (!inputToCheck.length) {
      throw new Error('The array is empty')
    }
    inputToCheck.forEach(element => {
      this.errorCheckChord(element)
    })
  }

  /**
   * Cheks if input is of type number.
   *
   * @param {number} inputToCheck - the input value to check.
   * @throws {Error} - Throws error input isn´t of type number or isn´t between 1-11.
   */
  errorCheckNumber (inputToCheck) {
    if (typeof inputToCheck !== 'number') {
      throw new Error('The input has to be a number')
    }
    if (inputToCheck < 1 || inputToCheck > 11) {
      throw new Error('The input has to be a number between 1 and 11')
    }
  }

  /**
   * Cheks if input is in the CHORD_SCALE array.
   *
   * @param {number} inputToCheck - the input value to check.
   * @throws {Error} - Throws error input isn´t isn´t in CHORD_SCALE array.
   */
  errorCheckChord (inputToCheck) {
    const chordsAvailable = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G']
    if (!chordsAvailable.includes(inputToCheck)) {
      throw new Error('The input has to be one of the elements in CHORD_SCALE')
    }
  }
}
