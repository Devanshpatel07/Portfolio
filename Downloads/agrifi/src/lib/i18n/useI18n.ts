import { create } from 'zustand'
import { messages, Lang, Messages } from './messages'

interface I18nStore {
  lang:    Lang
  t:       Messages
  setLang: (lang: Lang) => void
}

export const useI18n = create<I18nStore>(set => ({
  lang:    'en',
  t:       messages.en,
  setLang: (lang) => set({ lang, t: messages[lang] }),
}))
