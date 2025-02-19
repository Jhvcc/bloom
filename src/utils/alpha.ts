

/**
 * Remove non-alphabetic characters from the beginning and end of the string
 * @param str - The string to remove non-alphabetic characters from
 * @returns The string with non-alphabetic characters removed
 */
const removeNonAlpha = (str: string) => {
  return str.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
}

export { removeNonAlpha };
