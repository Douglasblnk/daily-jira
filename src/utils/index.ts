export function checkIsLink(link: string | undefined): boolean {
  const getValidUrl = /^https?:\/\/(?:www\.)?[-\w@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b[-\w()@:%\+.~#?&\/=]*$/
  return link ? getValidUrl.test(link) : false
}
