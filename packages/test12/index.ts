import Test12 from './src/test12'
import { App } from 'vue'

Test12.install = (app: App): void => {
  // 注册组件
  app.component(Test12.name ?? "", Test12)
}

export default Test12
