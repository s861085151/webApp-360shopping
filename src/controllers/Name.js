//common.js规范
// module.exports = 'songqiang'

//ES6
// export const name = 'songqiang'

module.exports = {
    name: "hahahah",
    getName: ()=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve('lalala')
            },2000)
        })
    }
}