import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FileDownload from 'js-file-download'

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


  
  const download=(e)=>{
    axios({
      url:'http://127.0.0.1:4000/download',
      method:"GET",
      responseType:"blob"
    }).then((res)=>{
      console.log(res);
      FileDownload(res.data,"download.sql")
    })
  }

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
              <button className='buttonRestore' >restore</button>
              <button className='buttonDownload' onClick={(e)=>download(e)} >download</button>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default ListBackups
