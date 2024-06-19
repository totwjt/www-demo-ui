import { defineComponent } from 'vue'
import { test9Props } from './types'

const NAME = 'www-test9'

export default defineComponent({
  name: NAME,
  props: test9Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test9
        </div>
      </div>
    )
  }
})
