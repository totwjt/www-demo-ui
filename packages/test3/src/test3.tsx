import { defineComponent } from 'vue'
import { test3Props } from './types'

const NAME = 'www-test3'

export default defineComponent({
  name: NAME,
  props: test3Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test3
        </div>
      </div>
    )
  }
})
