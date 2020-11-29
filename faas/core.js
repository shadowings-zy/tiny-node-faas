const { generateCode } = require('./generateCode')
const vm = require('vm')

const DEFAULT_TIME_OUT = 5000

const DEFAULT_OPTIONS = {
  timeout: DEFAULT_TIME_OUT,
  microtaskMode: 'afterEvaluate',
}

const runFunction = async (ctx, func, options) => {
  let timer = null
  const faasOptions = Object.assign(DEFAULT_OPTIONS, options)
  const { id: funcId, scriptPath } = func

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
