const path = require('path')
const { runFunction } = require('../core')

const ctx = { a: 1, b: 2 }
const func = {
  id: 1,
  scriptPath: path.join(__dirname, './getLength.js'),
}

const main = async () => {
  const res = await runFunction(ctx, func)
  console.log('res: ', res);
}

main()
