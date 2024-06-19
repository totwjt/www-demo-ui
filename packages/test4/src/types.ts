import { ExtractPropTypes } from 'vue'

export const test4Props = {
} as const

export type Test4Props = ExtractPropTypes<typeof test4Props>
