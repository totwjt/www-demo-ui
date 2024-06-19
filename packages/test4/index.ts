import Test4 from './src/test4'
import { App } from 'vue'

Test4.install = (app: App): void => {
  // 注册组件
  app.component(Test4.name ?? "", Test4)
}

export default Test4
