const ghpages = require('gh-pages')

const files = [
  'index.html',
  'main.js'
]

ghpages.publish('.', {src: files}, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Published')
  }
})
