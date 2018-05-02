const http = require('http')
const yakbak = require('yakbak')

const setup = (url = 'http://api.flickr.com') => http.createServer(yakbak(url, {
  dirname: `${__dirname}/tapes`
}))

module.exports = setup
