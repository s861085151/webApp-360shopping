//common.js规范
const aaTpl = require('./views/aa.art')
const { list } = require('./controllers/position')

//ES6
// import { name } from './controllers/name'

list()

const str = template.render(aaTpl, {title: 'fffffff'})
console.log(str)