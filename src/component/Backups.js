import React, { useEffect, useState } from 'react'
import axios from 'axios';


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
     axios.get('http://127.0.0.1:4000/restore')
    .then(res => setData(res.data))
    .catch(err => console.log(err))

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
                <button className="buttonRestore" onClick={restore()}>restore</button>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default ListBackups
