const {resolve} = require('path')
const {Response} = require('mock-http')

function readTape (filename) {
  const _filename = resolve(process.cwd(), filename)
  const res = new Response()
  require(_filename)({}, res)
  return {
    filename,
    statusCode: res.statusCode,
    headers: res._headers,
    body: res._internal.buffer.toString()
  }
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
  readTape,
  log
}
