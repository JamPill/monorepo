export const locales = [
  {
    label: 'English',
    code: 'en',
  },
  {
    label: 'Español',
    code: 'es',
  },
  {
    label: 'Deutsch',
    code: 'de',
  },
  {
    label: 'Français',
    code: 'fr',
  },
  {
    label: 'Italiano',
    code: 'it',
  },
] as const

export const localeCodes = locales.map((l) => l.code)
export const defaultLocale = 'it'
