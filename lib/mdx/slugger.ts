let slug = require('github-slugger').slug

export default (input: string) => slug(input)
