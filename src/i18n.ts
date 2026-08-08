import ar from './locales/ar.json'

type LocaleFile = {
  language: string
  direction: 'rtl' | 'ltr'
  translations: Record<string, string>
}

const locale = ar as LocaleFile
const dictionary = locale.translations
const sortedKeys = Object.keys(dictionary).sort((a, b) => b.length - a.length)

export const appLocale = {
  language: locale.language,
  direction: locale.direction,
}

export function translateText(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return value

  const exact = dictionary[trimmed]
  if (exact) return value.replace(trimmed, exact)

  return sortedKeys.reduce((current, key) => current.replaceAll(key, dictionary[key]), value)
}

export function translateDom(root: ParentNode = document.body) {
  document.documentElement.lang = appLocale.language
  document.documentElement.dir = appLocale.direction

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []

  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    if (node.parentElement?.closest('script, style, code')) continue
    textNodes.push(node)
  }

  textNodes.forEach((node) => {
    const translated = translateText(node.nodeValue ?? '')
    if (translated !== node.nodeValue) node.nodeValue = translated
  })

  root.querySelectorAll<HTMLElement>('[placeholder], [aria-label], [title]').forEach((element) => {
    ;['placeholder', 'aria-label', 'title'].forEach((attribute) => {
      const value = element.getAttribute(attribute)
      if (!value) return
      const translated = translateText(value)
      if (translated !== value) element.setAttribute(attribute, translated)
    })
  })
}
