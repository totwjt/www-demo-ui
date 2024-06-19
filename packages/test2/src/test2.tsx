import { defineComponent } from 'vue'
import { test2Props } from './types'

const NAME = 'www-test2'

export default defineComponent({
  name: NAME,
  props: test2Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test2
        </div>
      </div>
    )
  }
})
