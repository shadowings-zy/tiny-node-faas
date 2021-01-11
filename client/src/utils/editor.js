// 函数编辑器单例
import * as monaco from "monaco-editor"

const INIT_CODE = `// the function must named "func" and exported.
// the function param "ctx" is the ctx of the request, see Koa2 ctx: https://koajs.com/#context.
// 函数名必须命名为func，并作为module.exports对象的属性。
// 函数参数仅有一个ctx对象，该对象是koa的ctx对象，详情请见：https://koajs.com/#context。
module.exports.func = async (ctx) => {
  // write your code here
  return ctx
}`;

let codeEditor = null

export const initializeCodeEditor = (dom, code) => {
  if (!codeEditor) {
    codeEditor = monaco.editor.create(dom, {
      language: "javascript",
      value: code ? code : INIT_CODE,
      automaticLayout: true,
    });
  }
}

export const getCodeEditor = () => {
  return codeEditor
}

export const destoryCodeEditor = () => {
  if (codeEditor) {
    codeEditor.dispose()
    codeEditor = null
  }
}