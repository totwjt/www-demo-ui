import { defineComponent } from 'vue'
import { test14Props } from './types'

const NAME = 'www-test14'

export default defineComponent({
  name: NAME,
  props: test14Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>
          www-test14
        </div>
      </div>
    )
  }
})
