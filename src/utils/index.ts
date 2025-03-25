import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale(ptBR)
dayjs.extend(relativeTime)

export function checkIsLink(link: string | undefined): boolean {
  const getValidUrl = /^https?:\/\/(?:www\.)?[-\w@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b[-\w()@:%\+.~#?&\/=]*$/
  return link ? getValidUrl.test(link) : false
}

export function formatRelativeTime(date: string) {
  return dayjs(date).fromNow()
}

export function getBrightness(hexColor: string) {
  const c = hexColor.substring(1)
  const rgb = Number.parseInt(c, 16)

  const r = (rgb >> 16) & 0xFF
  const g = (rgb >> 8) & 0xFF
  const b = (rgb) & 0xFF

  return (0.299 * r + 0.587 * g + 0.114 * b)
}

export function isTooBright(hexColor: string, threshold = 128) {
  return getBrightness(hexColor) > threshold
}
