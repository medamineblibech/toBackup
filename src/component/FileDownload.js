import React from 'react'
import axios from 'axios';
import fileDownload from 'js-file-download';
function FileDownload() {

   const download=(e,_id)=>{
      e.preventDefault()
        axios({
          url:`http://127.0.0.1:4000/download/${_id}`,
          method:"GET",
          responseType:"blob"
        }).then((res)=>{
          console.log(res);
          fileDownload(res.data,"download.sql")
        })
      }

    
  return (
    <div>
    <button className='buttonDownload' onClick={(e)=>download(e)} >download</button>
    </div>
  )
}

export default FileDownload
