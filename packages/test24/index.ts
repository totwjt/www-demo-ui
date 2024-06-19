import Test24 from './src/test24'
import { App } from 'vue'

Test24.install = (app: App): void => {
  // 注册组件
  app.component(Test24.name ?? "", Test24)
}

export default Test24
