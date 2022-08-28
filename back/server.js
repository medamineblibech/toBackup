const fs = require('fs')
const express = require('express');
const cors = require('cors')
/*const livereload = require('livereload');
const connectLiveReload = require("connect-livereload");

/*app.set('view engine','ejs')

const path = require('path');*/

const app = express()
app.use(cors())
app.use(express.json())
/*app.use(connectLiveReload())*/
const PORT = 4000


const dir = '../backups'

/*const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname,'back'))

liveReloadServer.server.once('connection',()=>{
    setTimeout(()=>{
        liveReloadServer.refresh("/")
    },100)
})*/
let files = fs.readdirSync(dir)


console.log(files);
setInterval(()=>{
    app.get('/', (req, res) => {

        let p = JSON.stringify(files);
        res.send(p)
    }
    )
},1000)

/*app.use(express.static(join(__dirname, '../src')))*/



/*app.get('/restore', (req, res) => {
    cp.exec('./restore.sh', (err, stdout, stderr) => {
        if (err) {
            return res.status(400).json({ output: null, error: err.message })
        }

        res.status(200).json({ output: stdout, error: null })
    })
})*/



app.listen(PORT, () => {
    console.log(`runnig on ${PORT}`);
})