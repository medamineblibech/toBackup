const fs = require('fs')
const express= require('express');
const cors =require('cors')
const app =express()
app.use(cors())
app.use(express.json())
const PORT=4000


const dir = '../backups'
const files = fs.readdirSync(dir)
console.log(files);
files.forEach(i => {
    app.get('/',(req,res)=>{
        let p= JSON.stringify(files[i]);
    
        res.send(p)
    }
        
        )
    
});


app.listen(PORT,()=>{
    console.log(`runnig on ${PORT}`);
})