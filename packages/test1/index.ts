import Test1 from './src/test1'
import { App } from 'vue'

Test1.install = (app: App): void => {
  // 注册组件
  app.component(Test1.name ?? "", Test1)
}

export default Test1
