import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import PropTypes from 'prop-types'
//import { Button } from 'react'
//import { debug } from "webpack";
var sys = require('sys')

var exec = require('child_process').exec;
const spawn = require('child_process').spawn
var BACKUP_PATH='/home/houda/stage_i4tech/toBackup/backups'
var USER='root'      
var PASSWORD='houda' 
//const mysqldump = spawn('mysql', [ '-u', process.env.DB_USER, `-p${process.env.DB_PASSWORD}`, process.env.DB_NAME ])



function clickMe(db ,date)
{ 
 // function puts(error, stdout, stderr) { sys.puts(stdout) }

 // exec(' mysql -u $USER -p$PASSWORD  $db  < $BACKUP_PATH/$db-$date.sql', puts);
  
}
const ListBackups = () => {


  /* Show Loading Screen While Fetching API Data In React*/
  /*const[loading,setLoading] = useState(false) */

  const [data, setData] = useState([])
  useEffect(() => {
  async function fetchAPI(){
    const res = await axios.get('http://127.0.0.1:4000/')
    console.log(res.data);
    setData(res.data)
  }
  fetchAPI()
  }, [])


  const restore=()=>{
    for (i=0;i<data.length;i++){
      
    }
     axios.get('http://127.0.0.1:4000/restore')
    .then(res => setData(res.data))
    .catch(err => console.log(err))

  }

  /*const restore=()=>{
     axios.get('http://127.0.0.1:4000/restore')
    .then(res => setData(res.data))
    .catch(err => console.log(err))

  }*/


  return (
    <div className='container App'>
      <br />
      <h1>list of backups mysql </h1>
      {data.map((item) => {
        return (
          <React.Fragment >
            <div className='col backupBg' >
              <div>
                {item}    
    )
               <div>
                  <button onClick={clickMe}>
                        restore
                  </button>
               </div>
 


              </div>
             
            </div>
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default ListBackups
