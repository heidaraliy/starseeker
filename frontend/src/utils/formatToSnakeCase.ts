//snake_case format function
export const formatToSnakeCase = (str: string) => {
  return str
    .replace(/[+&]/g, 'and') //replace + and * with 'and'
    .replace(/[\s@#$%^*()\-+={}[\]\\|?/><,.:;"/]+/g, '_') //replace with underscores
    .replace(/_{2,}/g, '_') //truncate 2+ underscores to 1
    .replace(/['!]/g, '') //remove exclamations and apostrophes
    .toLowerCase()
    .replace(/^_+|_+$/g, ''); //remove leading and trailing underscores after all processing, if any
};
