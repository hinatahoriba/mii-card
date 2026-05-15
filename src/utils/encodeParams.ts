import { compressToEncodedURIComponent } from 'lz-string'
import type { CardConfig } from '../types/card'

export function encodeCardConfig(config: CardConfig): string {
  const json = JSON.stringify(config)
  return compressToEncodedURIComponent(json)
}
