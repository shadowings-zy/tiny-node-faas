const vm = require('vm')
const { DEFAULT_FUNCTION_EXEC_OPTIONS } = require('./constants')
const { generateCode } = require('./generateCode')
const { checkFunctionValid } = require('./checkFunction')

const runFunction = async (ctx, func, options) => {
  let timer = null
  const faasOptions = Object.assign(DEFAULT_FUNCTION_EXEC_OPTIONS, options)
  const { id: funcId, scriptPath } = func
  const functionValid = await checkFunctionValid(scriptPath)

  if (!functionValid) {
    throw Error(`invalid function, you can not use module 'os'`)
  }

  const result = await new Promise((resolve, reject) => {
    const sandbox = {
      require,
      console,
      ctx,
    }

    try {
      timer = setTimeout(() => {
        reject(new Error('Execute function time out'))
      }, faasOptions.timeout)

      vm.createContext(sandbox)

      const data = vm.runInNewContext(generateCode(scriptPath), sandbox, {
        filename: funcId.toString(),
        timeout: faasOptions.timeout,
        microtaskMode: faasOptions.microtaskMode,
      })

      resolve(data)
    } catch (error) {
      reject(error)
    }
  }).catch((err) => {
    return err instanceof Error ? err : new Error(err.stack)
  })

  if (timer) {
    clearTimeout(timer)
    timer = null
  }

  return result
}

module.exports = {
  runFunction,
}
