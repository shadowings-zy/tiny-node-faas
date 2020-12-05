const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

module.exports.func = async (ctx) => {
  console.log('This is demo func, to get time after 1s.')
  await wait(1000)
  return `currentTime: ${Date.now()}`
}
