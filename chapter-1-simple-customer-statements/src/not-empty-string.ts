export const notEmptyString = (candidate: any): boolean =>
  typeof candidate === 'string' && candidate.length > 0

/**************************
 * Testing notEmptyString *
 **************************/

console.assert(
  notEmptyString('') === false,
  'Expected nonEmptyString to return false when checking empty string ""'
)
console.assert(
  notEmptyString('one') === true,
  'Expected nonEmptyString to return true when checking string "Hello"'
)
