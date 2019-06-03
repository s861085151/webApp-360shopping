//common.js规范
const Name = require('./controllers/Name')     //引入js
const aaTpl = require('./views/aa.art')
const { list } = require('./controllers/position')

//ES6
// import { name } from './controllers/name'

list()

async function getName() {
    console.log(Name.name)
    const name = await Name.getName()
    console.log(name)
    console.log(name)
}
getName()

const str = template.render(aaTpl, {title: 'fffffff'})
console.log(str)