import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ListBackups = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    async function getData() {
      const results = await axios.get('http://127.0.0.1:1234/');
      console.log(results.data);
      setData(results.data);
    }
    getData()
  }, ['http://127.0.0.1:1234/'])


  return (
    <div className='container App'>
      <br />
      <h1>list of backups mysql</h1>
      {data.map((item) => {
          return (
            <React.Fragment >
              <div className='col backupBg'>
                {item}
              </div>
            </React.Fragment>
          )
        })}
    </div>
  );
}

export default ListBackups
