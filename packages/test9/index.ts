import Test9 from './src/test9'
import { App } from 'vue'

Test9.install = (app: App): void => {
  // 注册组件
  app.component(Test9.name ?? "", Test9)
}

export default Test9
