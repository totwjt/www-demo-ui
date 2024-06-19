import { defineComponent } from 'vue'
import { test12Props } from './types'

const NAME = 'www-test12'

export default defineComponent({
  name: NAME,
  props: test12Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test12
        </div>
      </div>
    )
  }
})
