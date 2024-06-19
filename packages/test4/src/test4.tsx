import { defineComponent } from 'vue'
import { test4Props } from './types'

const NAME = 'www-test4'

export default defineComponent({
  name: NAME,
  props: test4Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test4
        </div>
      </div>
    )
  }
})
