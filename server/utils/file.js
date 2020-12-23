const fs = require('fs-extra')

// 过滤出符合条件的函数目录
const filterTargetFuncDir = async (funcRootDirPath, funcInfo) => {
  const fileList = await fs.readdir(funcRootDirPath)
  return fileList.filter((item) => matchFileList(item, funcInfo))
}

// 根据funcDir名，获取到函数信息
const getFuncBasicInfo = (funcDir) => {
  const [id, author, namespace] = funcDir.split('|')
  return {
    id,
    author,
    namespace
  }
}

// 匹配函数信息和当前filePath是否匹配
const matchFileList = (filePath, funcInfo) => {
  const { id: targetId, author: targetAuthor, namespace: targetNamespace } = funcInfo
  const { id: currentId, author: currentAuthor, namespace: currentNamespace } = getFuncBasicInfo(filePath)
  let idMatch = false
  let authorMatch = false
  let namespaceMatch = false

  // 若为空，则匹配失败
  if (!targetId && !targetAuthor && !targetNamespace) {
    return false
  }
  if (!targetId || targetId === currentId) {
    idMatch = true
  }
  if (!targetAuthor || targetAuthor === currentAuthor) {
    authorMatch = true
  }
  if (!targetNamespace || targetNamespace === currentNamespace) {
    namespaceMatch = true
  }
  return idMatch && authorMatch && namespaceMatch
}


module.exports = {
  filterTargetFuncDir,
  getFuncBasicInfo
}