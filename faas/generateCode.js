const generateCode = (scriptPath) => {
  return `
    (async () => {
      const { func } = require ('${scriptPath}')
      return await func(this.ctx)
    })()
  `
}

module.exports = { 
  generateCode 
}
