import { ExtractPropTypes } from 'vue'

export const test12Props = {
} as const

export type Test12Props = ExtractPropTypes<typeof test12Props>
