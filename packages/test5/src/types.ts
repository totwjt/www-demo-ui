import { ExtractPropTypes } from 'vue'

export const test5Props = {
} as const

export type Test5Props = ExtractPropTypes<typeof test5Props>
