import Test3 from './src/test3'
import { App } from 'vue'

Test3.install = (app: App): void => {
  // 注册组件
  app.component(Test3.name ?? "", Test3)
}

export default Test3
