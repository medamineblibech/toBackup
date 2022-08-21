import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FileDownload from './FileDownload';

const ListBackups = () => {


  /* Show Loading Screen While Fetching API Data In React*/
  /*const[loading,setLoading] = useState(false) */

  const [list, setList] = useState([])
  useEffect(() => {
  async function fetchAPI(){
    const res = await axios.get('http://127.0.0.1:4000/')
    console.log(res.data);
    setList(res.data)
  }
  fetchAPI()
  }, [])


  

  return (
    <div className='container App'>
      <br />
      <h1>list of backups mysql </h1>
      {list.map((item) => {
        return (
          <React.Fragment >
            <div className='col backupBg' key={list._id}>
              <div>
                {item.files}
              <button className='buttonRestore' >restore</button>
              <FileDownload key={list._id}/>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default ListBackups
