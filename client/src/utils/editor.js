// 函数编辑器单例
import * as monaco from "monaco-editor"

const INIT_CODE = `// the function must named "func" and exported.
// the function param "ctx" is the ctx of the request, see Koa2 ctx.
module.exports.func = async (ctx) => {
  // write your code here
  return ctx
}`;

let codeEditor = null

export const initializeCodeEditor = (dom) => {
  if (!codeEditor) {
    codeEditor = monaco.editor.create(dom, {
      language: "javascript",
      value: INIT_CODE,
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