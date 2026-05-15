import { decompressFromEncodedURIComponent } from 'lz-string'
import type { CardConfig } from '../types/card'

export function decodeCardConfig(encoded: string): CardConfig | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded)
    if (!json) return null
    return JSON.parse(json) as CardConfig
  } catch {
    return null
  }
}
