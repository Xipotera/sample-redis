// eslint-disable-next-line no-extend-native
String.prototype.toHexadecimal = function () {
  const arr1 = []
  for (let n = 0, l = this.length; n < l; n++) {
    const hex = Number(this.charCodeAt(n))
      .toString(16)
    arr1.push(hex)
  }
  return arr1.join('')
}
