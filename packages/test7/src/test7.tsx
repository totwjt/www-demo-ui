import { defineComponent } from 'vue'
import { test7Props } from './types'

const NAME = 'www-test7'

export default defineComponent({
  name: NAME,
  props: test7Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test7
        </div>
      </div>
    )
  }
})
