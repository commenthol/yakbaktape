# yakbaktape

> Read yakbak tape files

Small CLI utility to (humanly) read tape files recorded with [yakbak][].

## Install

    npm i -g yakbaktape

## Usage

Single file

    yakbaktape tapes/4edfe52cf41a6a64e96946c4d2de3038.js

Grep through multiple files

    find tapes/ -type f | xargs yakbaktape | grep body

## Output

```
-------- filename --------

test/tapes/4edfe52cf41a6a64e96946c4d2de3038.js

-------- statusCode --------

statusCode: 200

-------- headers --------

{ date: 'Wed, 02 May 2018 17:01:20 GMT',
  'content-type': 'application/javascript;',
  ...

-------- body --------

  ...
```

## License

UNLICENSE https://unlicense.org

## References

- [yakbak][]

[yakbak]: https://npmjs.com/package/yakbak
