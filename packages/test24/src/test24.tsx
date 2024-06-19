import { defineComponent } from 'vue'
import { test24Props } from './types'

const NAME = 'www-test24'

export default defineComponent({
  name: NAME,
  props: test24Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test24
        </div>
      </div>
    )
  }
})
