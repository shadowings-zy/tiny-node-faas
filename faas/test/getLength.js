const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

module.exports.func = async (ctx) => {
  console.log('This faas function will get ctx after 1s');
  await wait(1000)
  return ctx
}