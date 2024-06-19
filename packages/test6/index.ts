import Test6 from './src/test6'
import { App } from 'vue'

Test6.install = (app: App): void => {
  // 注册组件
  app.component(Test6.name ?? "", Test6)
}

export default Test6
