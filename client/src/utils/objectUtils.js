export const cleanObject = (obj) => {
  const emptyValueList = ['', null, undefined]
  for (const item in obj) {
    if (emptyValueList.includes(obj[item])) {
      delete obj[item]
    }
  }
  return obj
}