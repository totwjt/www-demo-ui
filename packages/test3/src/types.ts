import { ExtractPropTypes } from 'vue'

export const test3Props = {
} as const

export type Test3Props = ExtractPropTypes<typeof test3Props>
