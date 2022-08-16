const fs = require('fs')
const express = require('express');
const cors = require('cors')
const cp = require('child_process').spawn
const livereload = require('livereload');
const connectLiveReload = require("connect-livereload");
const path = require('path');
const app = express()
app.use(cors())
app.use(express.json())
app.use(connectLiveReload())
const PORT = 4000
const dir = '../public/backups'
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname,'public'))
liveReloadServer.server.once('connection',()=>{
    setTimeout(()=>{
        liveReloadServer.refresh("/")
    },100)
})

/*app.get('/restore', (req, res) => {
    cp.exec('restore.sh', (err, stdout, stderr) => {
        if (err) {
            return res.status(400).send({ message: err.message || "something wrong"})
        }
        res.status(200).send()
    })
})*/
app.get('/restore', function(req, res) {
    var command = spawn(__dirname + '/restore.sh', [ req.query.color || '' ]);
    var output  = [];
  
    command.stdout.on('data', function(chunk) {
      output.push(chunk);
    }); 
  
    command.on('close', function(code) {
      if (code === 0)
        res.send(Buffer.concat(output));
      else
        res.send(500); //when the script fails, generate a Server Error HTTP response
    });
  });





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







app.listen(PORT, () => {
    console.log(`runnig on ${PORT}`);
})