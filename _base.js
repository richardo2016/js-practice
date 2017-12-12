exports.putstr = function putstr (str) {
  if (typeof process !== 'undefined') {
    process.stdout.write(str)
  } else {
    console.log(str)
  }
  return str
}