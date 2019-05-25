(() => {
  const application = Stimulus.Application.start()

  application.register('offset', class extends Stimulus.Controller {
    static targets = [ 'key' ]

    get() {
      if (!this.key) { return }
      axios({
        method: 'post',
        url: 'http://localhost:3000/',
        data: {
          key: this.key
        }
      }).then(data => {
        this.data.set('value', data.data.offset)
      }).catch(err => {
        console.log(err)
      })
    }

    get key() {
      return this.keyTarget.value
    }
  })
})()
