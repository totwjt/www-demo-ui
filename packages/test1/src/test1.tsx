import { defineComponent } from 'vue'
import { test1Props } from './types'

const NAME = 'www-test1'

export default defineComponent({
  name: NAME,
  props: test1Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test1
        </div>
      </div>
    )
  }
})
