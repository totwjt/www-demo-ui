import { defineComponent } from 'vue'
import { test11Props } from './types'

const NAME = 'www-test11'

export default defineComponent({
  name: NAME,
  props: test11Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test11
        </div>
      </div>
    )
  }
})
