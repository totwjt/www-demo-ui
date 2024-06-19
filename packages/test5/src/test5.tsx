import { defineComponent } from 'vue'
import { test5Props } from './types'

const NAME = 'www-test5'

export default defineComponent({
  name: NAME,
  props: test5Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test5
        </div>
      </div>
    )
  }
})
