const {resolve} = require('path')

class Response {
  constructor () {
    this._headers = {}
    this._buffer = Buffer.from('')
  }
  set statusCode (statusCode) {
    this._statusCode = statusCode
  }
  setHeader (key, value) {
    this._headers[key] = value
  }
  write (buffer) {
    this._buffer = Buffer.concat([this._buffer, buffer])
  }
  end (buffer) {
    buffer && this.write(buffer)
    this.out = {
      statusCode: this._statusCode,
      headers: this._headers,
      body: this._buffer.toString()
    }
  }
}

function readTape (filename) {
  const _filename = resolve(process.cwd(), filename)
  const res = new Response()
  require(_filename)({}, res)
  res.out = Object.assign({filename}, res.out)
  return res.out
}

function log (obj, filename) {
  const SEP = '--------'
  if (filename) {
    console.error(filename)
  }
  Object.keys(obj).forEach((key) => {
    console.log('')
    console.log(`${SEP} ${key} ${SEP}`)
    console.log('')
    if (/statusCode/.test(key)) {
      console.log(`${key}:`, obj[key])
    } else {
      console.log(obj[key])
    }
  })
}

module.exports = {
  Response,
  readTape,
  log
}
