const { STATUS_CODE } = require('./constants')

const formatResponse = async (ctx, next) => {
  try {
    await next()
    if (!ctx.rawResponse) {
      ctx.body = {
        status: STATUS_CODE.OK,
        message: 'successful',
        data: ctx.body
      }
    }
  } catch (e) {
    ctx.body = {
      status: STATUS_CODE.ERROR,
      message: e.toString(),
      data: {}
    }
  }
}

module.exports = {
  formatResponse
}
