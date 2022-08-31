import React from 'react'
import axios from 'axios';
import fileDownload from 'js-file-download';

function FileDownload({ id, name }) {
  const download = (e) => {
    e.preventDefault()
    axios({
      url: `http://127.0.0.1:4000/download/${id}`,
      method: "GET",
      responseType: "blob"
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, `${name}`)
    })
  }
  return (
    <div>
      <button className='buttonDownload' onClick={(e) => download(e)} >DOWNLOAD</button>
    </div>
  )

  }
export default FileDownload

