import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ListBackups = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    async function getData() {
      const results = await axios.get('http://127.0.0.1:8000/');
      console.log(results);
      setData(results)
    }
    getData()
  }, [])


  return (
    <div className='container App'>
      <br />
      <h1>list of backups mysql</h1>
      {data && data
        .map((item) => {
          return (
            <React.Fragment >
              <div className='col backupBg'>
                {item.files}
              </div>
            </React.Fragment>
          )
        })}
    </div>
  );
}

export default ListBackups
