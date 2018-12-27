export function joinPath (path: string, key: string | number) {
  const strKey = key + ''
  if (/^[a-z_]\w*$/i.test(strKey)) {
    return `${path}.${strKey}`
  } else if (/^\d+$/.test(strKey)) {
    return `${path}[${strKey}]`
  } else {
    return `${path}[${JSON.stringify(strKey)}]`
  }
}

export function parsePath (path: string): string[] {
  const result: string[] = []
  if (!path.startsWith('[')) {
    path = '.' + path
  }

  let i = 0

  function test (re: RegExp | string) {
    return path[i] && (typeof re === 'string'
      ? re === path[i]
      : re.test(path[i])
    )
  }

  function accept (re?: RegExp | string) {
    if (re && !test(re)) {
      return false
    } else {
      const char = path[i++]
      return char
    }
  }

  function expect (re: RegExp | string) {
    if (!test(re)) {
      throw new SyntaxError('Invalid path')
    } else {
      const char = path[i++]
      return char
    }
  }

  while (i < path.length) {
    let name = ''

    if (accept('.')) {
      name += expect(/[a-zA-Z_]/)
      while (test(/\w/)) {
        name += accept()
      }
    } else {
      expect('[')
      if (test(/\d/)) {
        while (test(/\d/)) {
          name += accept()
        }
      } else {
        expect('"')
        let escaped = false
        while (escaped || !test(/\"/)) {
          if (accept('\\')) {
            if (escaped) {
              name += '\\'
              escaped = false
            } else {
              escaped = true
            }
          } else if (escaped) {
            escaped = false
            name += expect('"')
          } else {
            name += accept()
          }
        }
        expect('"')
      }
      expect(']')
    }
    result.push(name)
  }

  return result
}
