const fs = require('fs')
const express = require('express');
const cors = require('cors')
//const { exec } = require('node:child_process')
//const spawn = require('child_process').spawn
//const mysql=require('mysql')
const config = require('config');
const Importer = require('mysql-import');

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


 myArray2=[]
 myArray3=[]
var data1 = {}
data1.table = []
var  id=1 
const dir = 'backups'
const files = fs.readdirSync(dir)
console.log(files);
table =[]
console.log("this is the file ",files);
console.log(files.length)
//table = p.split(",")
for(var i = 0; i < files.length; i++) {
    myArray1 = files[i].split(".sql")
    console.log( 'affichage de tableau '+myArray1)
    for (j=0; j <myArray1.length-1 ; j++){
        myArray2 = myArray1[j].split(/\s+/).join('')
        console.log( "this is array 2",myArray2)
        myArray3= myArray2.split("-") 
        console.log( myArray3)
        var obj = { } 
        obj.id=id++
        obj.files=myArray3[0]+'-'+myArray3[1]+'-'+myArray3[2]+'-'+myArray3[3]+'.sql'
        data1.table.push(obj)
    
    } 
}


/*let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Myp@ss123456789',
    database : 'Gestion_client'
  });
  connection.connect();*/

setInterval(()=>{
    app.get('/', (req, res) => {

        let p = JSON.stringify(data1.table);
        res.send(p)
    }
    )
},1000)

/*app.use(express.static(join(__dirname, '../src')))*/



//nodejs api find data with id (pass id througn url)
app.get('/download/:id',(req, res) =>{

    //   console.log(req);
    //   console.log(req.params);               
       const singleFile = data1.table.find((item) => item.id ===parseInt(req.params.id));
       if(!singleFile){
           return res.status(404).send('file not found')
       }
       console.log(singleFile);
      // let f=JSON.stringify(singleFile.files)
      // console.log(f);
 //      res.download(`backups/${f}`)
   res.download(`backups/${singleFile.files}`)        
   })

   /*exec(`mysql -uroot -h 127.0.0.1:3306 -pMyp@ss123456789 < ${singleFile.files}`,function(error, stdout, stderr) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.send(stdout);
        }
    })*/

    /*exec("ls -la", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });*/

const restore=(a,b)=>{
const importer = new Importer(b);
// New onProgress method, added in version 5.0!
importer.onProgress(progress=>{
  var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
  console.log(`${percent}% Completed`);
});


importer.import(a).then(()=>{
        var files_imported = importer.getImported();
        console.log(`${files_imported.length} SQL file(s) imported.`);
      }).catch(err=>{
        console.error(err);
      })

    }
     
 app.get('/restoredb/:id',(res,req)=>{
let singleFile = data1.table.find((item) => item.id ===parseInt(req.params.id));
let filename = `backups/${singleFile.files}`;
let connection = config.get("db");
res.send(`<script>${restore(filename,connection)}</script>`)

    });



app.listen(PORT, () => {
    console.log(`runnig on ${PORT}`);
})
