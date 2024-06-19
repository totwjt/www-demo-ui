import Test2 from './src/test2'
import { App } from 'vue'

Test2.install = (app: App): void => {
  // 注册组件
  app.component(Test2.name ?? "", Test2)
}

export default Test2
