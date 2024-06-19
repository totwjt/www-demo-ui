import { ExtractPropTypes } from 'vue'

export const test1Props = {
} as const

export type Test1Props = ExtractPropTypes<typeof test1Props>
