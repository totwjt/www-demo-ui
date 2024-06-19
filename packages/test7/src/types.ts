import { ExtractPropTypes } from 'vue'

export const test7Props = {
} as const

export type Test7Props = ExtractPropTypes<typeof test7Props>
