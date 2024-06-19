import Test7 from './src/test7'
import { App } from 'vue'

Test7.install = (app: App): void => {
  // 注册组件
  app.component(Test7.name ?? "", Test7)
}

export default Test7
