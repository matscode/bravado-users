/**
 * Highlight part of a string based on where match found
 *
 * @param string
 * @param search
 * @returns {string}
 */
export const searchAndHighlight = (string, search) => {
  let returnString = ''
  const index = string.toLowerCase().indexOf(search)

  if (index > -1) {
    const sFirstHalf = string.slice(0, index)
    const sSecondHalf = string.slice(index + search.length)
    returnString = `${sFirstHalf}<span class="highlighter">${string.slice(
      index,
      index + search.length
    )}</span>${sSecondHalf}`
  }

  return returnString
}

export default (ctx, inject) => {
  inject('searchAndHighlight', searchAndHighlight)
}
