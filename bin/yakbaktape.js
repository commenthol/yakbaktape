#!/usr/bin/env node

const {readTape, log} = require('..')

const HELP = `
    readtape [option] [files]

    options:

    -h|--help    this notice
`

const cmd = () => {
  const args = process.argv.slice(2)
  const o = { files: [] }
  while (args.length) {
    const arg = args.shift()
    if (/^(-h|--help|-?)$/.test(arg)) {
      o.help = true
    } else {
      o.files.push(arg)
    }
  }
  return o
}

const main = () => {
  const o = cmd()
  if (o.help) {
    console.log(HELP)
    process.exit(0)
  }
  if (o.files.length) {
    o.files.forEach(filename => {
      const s = readTape(filename)
      log(s, filename)
    })
  }
}

main()
