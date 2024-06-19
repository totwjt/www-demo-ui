import Test5 from './src/test5'
import { App } from 'vue'

Test5.install = (app: App): void => {
  // 注册组件
  app.component(Test5.name ?? "", Test5)
}

export default Test5
