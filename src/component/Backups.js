import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ListBackups = () => {

  const [data, setData] = useState([])
  useEffect(() => {
      setInterval(()=>{axios.get('http://127.0.0.1:4000/')
      .then(res =>setData(res.data))
      .catch(err=>console.log(err))},1000);

  }, [])


  return (
    <div className='container App'>
      <br />
      <h1>list of backups mysql</h1>
      {data.map((item) => {
          return (
            <React.Fragment >
              <div className='col backupBg' >
                {item}
                <button>Restore</button>
              </div>
            </React.Fragment>
          )
        })}
    </div>
  );
}

export default ListBackups
