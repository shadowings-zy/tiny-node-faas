const fs = require('fs-extra')
const { INVALID_STR } = require('./constants')

const checkFunctionValid = async (scriptPath) => {
  const scriptBuffer = await fs.readFile(scriptPath)
  const script = scriptBuffer.toString()
  return !INVALID_STR.some(item => script.includes(item))
}

module.exports = {
  checkFunctionValid
}