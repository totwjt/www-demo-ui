import Test11 from './src/test11'
import { App } from 'vue'

Test11.install = (app: App): void => {
  // 注册组件
  app.component(Test11.name ?? "", Test11)
}

export default Test11
