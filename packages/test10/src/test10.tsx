import { defineComponent } from 'vue'
import { test10Props } from './types'

const NAME = 'www-test10'

export default defineComponent({
  name: NAME,
  props: test10Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test10
        </div>
      </div>
    )
  }
})
