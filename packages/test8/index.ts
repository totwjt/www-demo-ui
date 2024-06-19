import Test8 from './src/test8'
import { App } from 'vue'

Test8.install = (app: App): void => {
  // 注册组件
  app.component(Test8.name ?? "", Test8)
}

export default Test8
