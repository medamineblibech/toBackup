const fs = require('fs')
const express = require('express');
const cors = require('cors')
const mysql=require('mysql')
const livereload = require('livereload');
const connectLiveReload = require("connect-livereload");
const path = require('path');
const app = express()
app.use(cors())
app.use(express.json())
app.use(connectLiveReload())
const PORT = 4000
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname,'public'))
liveReloadServer.server.once('connection',()=>{
    setTimeout(()=>{
        liveReloadServer.refresh("/")
    },100)
})





const dir = '../public/backups'
const files = fs.readdirSync(dir)
console.log(files);

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Myp@ss123456789',
    database : 'Gestion_client'
  });
  connection.connect();

setInterval(()=>{
    app.get('/', (req, res) => {

        let p = JSON.stringify(files);
        res.send(p)
    }
    )
},1000)

/*app.use(express.static(join(__dirname, '../src')))*/



app.get('/download', (req, res) => {
    files.forEach((i)=>
    res.download(i)
    )
})



app.listen(PORT, () => {
    console.log(`runnig on ${PORT}`);
})

