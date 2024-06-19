import { defineComponent } from 'vue'
import { test13Props } from './types'

const NAME = 'www-test13'

export default defineComponent({
  name: NAME,
  props: test13Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test13
        </div>
      </div>
    )
  }
})
