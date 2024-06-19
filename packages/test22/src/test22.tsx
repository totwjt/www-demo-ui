import { defineComponent } from 'vue'
import { test22Props } from './types'

const NAME = 'www-test22'

export default defineComponent({
  name: NAME,
  props: test22Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test22
        </div>
      </div>
    )
  }
})
