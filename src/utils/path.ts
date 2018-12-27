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
