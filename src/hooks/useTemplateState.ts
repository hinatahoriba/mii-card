import { useState } from 'react'
import i18n from '../i18n'
import type { CardConfig, Locale, SnsPlatform, AnimationType } from '../types/card'

const FIELD_MAX_LENGTH = {
  name: 30,
  company: 40,
  title: 40,
  bio: 60,
} as const

const initialConfig: CardConfig = {
  templateSetId: 1, // keeping for backwards compatibility, maybe default to undefined but 1 is fine
  backgroundId: 1,
  avatarId: 1,
  name: '',
  company: '',
  title: '',
  bio: '',
  snsLinks: [],
  locale: 'ja',
  animationType: 'mystery',
}

export function useTemplateState() {
  const [config, setConfig] = useState<CardConfig>(initialConfig)

  function setTemplateSetId(id: number): void {
    setConfig((prev) => ({ ...prev, templateSetId: id, backgroundId: id, avatarId: id }))
  }

  function setBackgroundId(id: number): void {
    setConfig((prev) => ({ ...prev, backgroundId: id }))
  }

  function setAvatarId(id: number): void {
    setConfig((prev) => ({ ...prev, avatarId: id }))
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

  function setAnimationType(type: AnimationType): void {
    setConfig((prev) => ({ ...prev, animationType: type }))
  }

  return {
    config,
    setTemplateSetId,
    setBackgroundId,
    setAvatarId,
    setProfileField,
    toggleSnsLink,
    updateSnsUrl,
    setLocale,
    setAnimationType,
  }
}
