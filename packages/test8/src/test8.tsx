import { defineComponent } from 'vue'
import { test8Props } from './types'

const NAME = 'www-test8'

export default defineComponent({
  name: NAME,
  props: test8Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test8
        </div>
      </div>
    )
  }
})
