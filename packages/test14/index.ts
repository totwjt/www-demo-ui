import Test14 from './src/test14'
import { App } from 'vue'

Test14.install = (app: App): void => {
  // 注册组件
  app.component(Test14.name ?? "", Test14)
}

export default Test14
