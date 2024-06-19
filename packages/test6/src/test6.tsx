import { defineComponent } from 'vue'
import { test6Props } from './types'

const NAME = 'www-test6'

export default defineComponent({
  name: NAME,
  props: test6Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test6
        </div>
      </div>
    )
  }
})
