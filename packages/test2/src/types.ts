import { ExtractPropTypes } from 'vue'

export const test2Props = {
} as const

export type Test2Props = ExtractPropTypes<typeof test2Props>
