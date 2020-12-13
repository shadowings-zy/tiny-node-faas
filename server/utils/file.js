const fs = require('fs-extra')

// 过滤出符合条件的函数目录
const filterTargetFuncDir = async (funcRootDirPath, filename) => {
  const fileList = await fs.readdir(funcRootDirPath)
  return fileList.filter((item) => item.includes(filename))
}

module.exports = {
  filterTargetFuncDir
}