import { ExtractPropTypes } from 'vue'

export const test10Props = {
} as const

export type Test10Props = ExtractPropTypes<typeof test10Props>
