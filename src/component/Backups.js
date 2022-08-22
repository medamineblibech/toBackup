import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FileDownload from './FileDownload';
import Restoredb from './Restoredb';

const ListBackups = () => {


  /* Show Loading Screen While Fetching API Data In React*/
  /*const[loading,setLoading] = useState(false) */

  const [list, setList] = useState([])
  useEffect(() => {
    async function fetchAPI() {
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
            <div className='col backupBg' >
              <div>
                {item.files}
                <Restoredb id={item._id} name={item.files} />
                <FileDownload id={item._id} name={item.files} />
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default ListBackups
