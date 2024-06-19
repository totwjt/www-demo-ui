import { ExtractPropTypes } from 'vue'

export const test11Props = {
} as const

export type Test11Props = ExtractPropTypes<typeof test11Props>
