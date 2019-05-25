(() => {
  const application = Stimulus.Application.start()

  application.register('cipher', class extends Stimulus.Controller {
    static targets = [ 'key', 'text' ]

    get alphabet() { return 'abcdefghijklmnopqrstuvwxyz'.split('') }
    get key() { return this.keyTarget.value }
    get text() { return this.textTarget.value }

    offset() {
      if (!this.key) { return }
      axios({
        method: 'post',
        url: 'http://localhost:3000/',
        data: {
          key: this.key
        }
      }).then(data => {
        this.data.set('offset', data.data.offset)
      }).catch(err => {
        console.log(err)
      })
    }

    encode() {
      const offset = parseInt(this.data.get('offset'))
      this.code(offset)
    }

    decode() {
      const offset = parseInt(this.data.get('offset'))
      this.code(this.alphabet.length - offset)
    }

    code(offset) {
      if (!this.text) { return }
      const text = this.text
      let coded = ''
      
      for (var i = 0; i < text.length; i++) {
        const char = text.charAt(i)
        let shifted
        if (char == ' ') {
          shifted = char
        } else if (this.check(char)) {
          shifted = this.shift(char, offset)
        } else { return }
        coded = coded.concat(shifted)
      }
      alert(coded)
    }

    shift(value, offset) {
      const alphabet = this.alphabet
      const isCapital = !alphabet.includes(value)
      const index = (alphabet.indexOf(value.toLowerCase()) + offset) % alphabet.length
      let shifted = alphabet[index]
      if (isCapital) { shifted = shifted.toUpperCase() }
      return shifted
    }

    check(char) {
      if (this.alphabet.includes(char.toLowerCase())) { return true }
      alert('Error: invalid text')
      return false     
    }
  })
})()
