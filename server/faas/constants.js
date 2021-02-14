const INVALID_STR = [`'os'`]
const DEFAULT_FUNCTION_EXECUTE_TIME_OUT = 5000
const DEFAULT_FUNCTION_EXEC_OPTIONS = {
  description: '',
  timeout: DEFAULT_FUNCTION_EXECUTE_TIME_OUT,
  microtaskMode: 'afterEvaluate',
  allowMethod: ['GET'],
}

module.exports = {
  INVALID_STR,
  DEFAULT_FUNCTION_EXECUTE_TIME_OUT,
  DEFAULT_FUNCTION_EXEC_OPTIONS,
}
