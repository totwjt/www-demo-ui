import { App } from 'vue'
import Foo from '@www-demo-ui/foo'
import Test22 from '@www-demo-ui/test22'
import Test24 from '@www-demo-ui/test24'
// import component end
import '../scss/index.scss'

const components = [
  Foo,
  Test22,
  Test24
] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name ?? "", component)
  })
}

export default {
  install
}
