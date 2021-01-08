import SvgIcon from "../components/SvgIcon.vue"

export const componentPlugin = {
  install: function (vue, options) {
    if (
      options &&
      options.imports &&
      Array.isArray(options.imports) &&
      options.imports.length > 0
    ) {
      // 按需引入图标
      const { imports } = options
      imports.forEach((name) => {
        require(`@/assets/svg/${name}.svg`)
      })
    } else {
      // 全量引入图标
      const ctx = require.context("@/assets/svg", false, /\.svg$/)
      ctx.keys().forEach(path => {
        const temp = path.match(/\.\/([A-Za-z0-9\-_]+)\.svg$/)
        if (!temp) return
        const name = temp[1]
        require(`@/assets/svg/${name}.svg`)
      })
    }
    vue.component(SvgIcon.name, SvgIcon)
  }
}