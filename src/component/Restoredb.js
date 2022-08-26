import React from 'react'
import axios from 'axios'

const Restoredb = ({id}) => {
  const restore = (e) => {
    e.preventDefault()
    axios({
      url: `http://127.0.0.1:4000/restoredb/${id}`,
      method: "GET",
      responseType: "blob"
    }).then((res) => {
      console.log(res.data)
    })
  }


  return (
    <div>
      <button className='buttonRestore' onClick={(e)=>restore(e)}>RESTORE</button>
    </div>
  )
}

export default Restoredb