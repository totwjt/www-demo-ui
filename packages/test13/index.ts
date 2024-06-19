import Test13 from './src/test13'
import { App } from 'vue'

Test13.install = (app: App): void => {
  // 注册组件
  app.component(Test13.name ?? "", Test13)
}

export default Test13
