const http = require('http')
const assert = require('assert')
const support = require('./support')
const url = require('url')
const {readTape} = require('..')

const api = 'https://api.flickr.com/'
const server = support(api)
const uriplace = (uri, api) => uri.replace(api, 'http://localhost:3000/')

const fetch = ({href, method = 'GET'}) => new Promise((resolve, reject) => {
  const opts = url.parse(href)
  opts.method = method
  const req = http.request(opts, res => {
    const {statusCode} = res
    let body = ''
    res.on('data', (chunk) => (body += chunk))
    res.on('error', reject)
    res.on('end', () => resolve({statusCode, body}))
  })
  req.on('error', reject)
  req.end()
})

describe('#readTape', function () {
  before(done => server.listen(3000, done))
  after(() => server.close())

  it('should record a tape', function () {
    return fetch({href: uriplace('https://api.flickr.com/services/feeds/photos_public.gne', api)})
      .then(({statusCode, body}) => {
        assert.equal(statusCode, 200)
        // console.log(body)
      })
  })

  it('should record a tape json', function () {
    return fetch({href: uriplace('https://api.flickr.com/services/feeds/photos_public.gne?format=json', api)})
      .then(({statusCode, body}) => {
        assert.equal(statusCode, 200)
        // console.log(body)
      })
  })

  it('should read tape', function () {
    const out = readTape(`${__dirname}/../test/tapes/708d332e38b0a4952765819e2cfb3ced.js`)
    assert.ok(out.statusCode)
    assert.ok(out.headers)
    assert.ok(out.body)
  })

  it('should read tape json', function () {
    const out = readTape(`${__dirname}/../test/tapes/4edfe52cf41a6a64e96946c4d2de3038.js`)
    assert.ok(out.statusCode)
    assert.ok(out.headers)
    assert.ok(out.body)
  })
})
