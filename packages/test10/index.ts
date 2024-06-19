import Test10 from './src/test10'
import { App } from 'vue'

Test10.install = (app: App): void => {
  // 注册组件
  app.component(Test10.name ?? "", Test10)
}

export default Test10
