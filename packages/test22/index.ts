import Test22 from './src/test22'
import { App } from 'vue'

Test22.install = (app: App): void => {
  // 注册组件
  app.component(Test22.name ?? "", Test22)
}

export default Test22
