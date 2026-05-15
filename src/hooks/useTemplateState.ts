import { useState } from 'react'
import i18n from '../i18n'
import type { CardConfig, Locale, SnsPlatform } from '../types/card'

const FIELD_MAX_LENGTH = {
  name: 30,
  company: 40,
  title: 40,
  bio: 60,
} as const

const initialConfig: CardConfig = {
  templateSetId: 1,
  name: '',
  company: '',
  title: '',
  bio: '',
  snsLinks: [],
  locale: 'ja',
}

export function useTemplateState() {
  const [config, setConfig] = useState<CardConfig>(initialConfig)

  function setTemplateSetId(id: number): void {
    setConfig((prev) => ({ ...prev, templateSetId: id }))
  }

  function setProfileField(
    field: 'name' | 'company' | 'title' | 'bio',
    value: string,
  ): void {
    if (value.length > FIELD_MAX_LENGTH[field]) return
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  function toggleSnsLink(platform: SnsPlatform, url: string): void {
    setConfig((prev) => {
      const exists = prev.snsLinks.some((link) => link.platform === platform)
      const snsLinks = exists
        ? prev.snsLinks.filter((link) => link.platform !== platform)
        : [...prev.snsLinks, { platform, url }]
      return { ...prev, snsLinks }
    })
  }

  function updateSnsUrl(platform: SnsPlatform, url: string): void {
    setConfig((prev) => ({
      ...prev,
      snsLinks: prev.snsLinks.map((link) =>
        link.platform === platform ? { ...link, url } : link,
      ),
    }))
  }

  function setLocale(locale: Locale): void {
    i18n.changeLanguage(locale)
    setConfig((prev) => ({ ...prev, locale }))
  }

  return {
    config,
    setTemplateSetId,
    setProfileField,
    toggleSnsLink,
    updateSnsUrl,
    setLocale,
  }
}
