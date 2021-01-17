// 因为nginx中代理的url会变成//，所以我们需要去掉一个/
const checkUrl = async (ctx, next) => {
  ctx.url = ctx.url.replace('//', '/')
  await next()
}

module.exports = {
  checkUrl,
}
