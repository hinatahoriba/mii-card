import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { encodeCardConfig } from '../utils/encodeParams'
import { decodeCardConfig } from '../utils/decodeParams'
import type { CardConfig } from '../types/card'

export function generateCardUrl(config: CardConfig): string {
  const encoded = encodeCardConfig(config)
  return `${window.location.origin}/card/${encoded}`
}

export function useDecodedCard(): CardConfig | null {
  const { encoded } = useParams<{ encoded: string }>()
  return useMemo(() => {
    if (!encoded) return null
    return decodeCardConfig(encoded)
  }, [encoded])
}
