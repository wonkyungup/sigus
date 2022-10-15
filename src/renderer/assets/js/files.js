import store from '@/store'
import fs from 'fs'
import path from 'path'

const Defs = store.state.Constants

export default class Files {
    constructor() {
        if (!fs.existsSync(Defs.DB_PATH)) {
            fs.mkdirSync(Defs.DB_PATH, { recursive: true })
        }
    }

    isExistFiles () {
        return fs.existsSync(path.join(Defs.DB_PATH, path.sep, Defs.DB_NAME)) && fs.existsSync(path.join(Defs.DB_PATH, path.sep, Defs.SETUP_NAME))
    }

    readINIFile () {
        return new Promise(resolve => {
            const masterFilePath = path.join(Defs.DB_PATH, path.sep, Defs.SETUP_NAME)

            fs.readFile(masterFilePath, 'utf8',(err, content) => {
                if (err) {
                    console.log(err)
                }
                content = JSON.parse(content)
                resolve(content)
            })
        })
    }

    createINIFile (val) {
        return new Promise(resolve => {
            const content = { master: val }
            const masterFilePath = path.join(Defs.DB_PATH, path.sep, Defs.SETUP_NAME)

            if (fs.existsSync(masterFilePath)) resolve(true)
            else {
                fs.writeFileSync(masterFilePath, JSON.stringify(content), (err) => {
                    if (err) {
                        console.log(err.message)
                    }
                })

                resolve(false)
            }
        })
    }

    getDBFilePath () {
        return path.join(Defs.DB_PATH, path.sep, Defs.DB_NAME)
    }

    createDBFile () {
        return new Promise(resolve => {
            if (!fs.existsSync(this.getDBFilePath())) {
                fs.writeFileSync(this.getDBFilePath(), '', (err) => {
                    if (err) {
                        console.log(err.message)
                        resolve(false)
                    }
                })
            }

            resolve()
        })
    }
}


// const pathUserData = remote.app.getPath('userData')
// const dbFolderPath = path.join(pathUserData, path.sep, Defs.DB_NAME.split('.')[0])
//
// if (!fs.existsSync(dbFolderPath)) {
//     fs.mkdirSync(dbFolderPath, { recursive: true })
// }
//
// const pathDB = path.join(dbFolderPath, path.sep, Defs.DB_NAME)
// if (!fs.existsSync(pathDB)) {
//     fs.writeFileSync(pathDB, '', (err) => {
//         if (err) {
//             this.handleDBErrorIfExists('createDataBaseFile', err)
//         }
//     })
// }
//
// return pathDB