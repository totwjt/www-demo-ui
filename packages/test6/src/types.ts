import { ExtractPropTypes } from 'vue'

export const test6Props = {
} as const

export type Test6Props = ExtractPropTypes<typeof test6Props>
