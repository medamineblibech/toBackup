const fs = require('fs')
const express = require('express');
const cors = require('cors')
/*const livereload = require('livereload');
const connectLiveReload = require("connect-livereload");

/*app.set('view engine','ejs')

const path = require('path');*/
import mysql from 'mysql';


///////////////



// executes `pwd`
/*child = exec("pwd", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});*/


// or more concisely
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec(' mysql -u $USER -p$PASSWORD  $db  < $BACKUP_PATH/$db-$date.sql', puts);





///////////////
const app = express()
app.use(cors())
app.use(express.json())
/*app.use(connectLiveReload())*/
const PORT = 4000
const arrayt=[] 
 myArray1=[]
 myArray2=[]
 myArray3=[]


var data1 = {}
data1.table = []
var  id=1 



const dir = '/home/houda/stage_i4tech/toBackup/backups'
/*const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname,'back'))

liveReloadServer.server.once('connection',()=>{
    setTimeout(()=>{
        liveReloadServer.refresh("/")
    },100)
})*/
let files = fs.readdirSync(dir)
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
        obj.name=myArray3[0],
        obj.date=myArray3[1]+'-'+myArray3[2]+'-'+myArray3[3]
        
        
    
        data1.table.push(obj)
    
    } 
}

setInterval(()=>{
    app.get('/', (req, res) => {

        let p = JSON.stringify( data1.table);
        console.log(p)

        
        res.send(p)
    }
    )
},1000)



app.get('/restore', (req, res) => {
    cp.exec('mysql -u')
})
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