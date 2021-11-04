import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import { NilaiContext } from './NilaiContext';

const NilaiList = () => {
  const {dataMahasiswa, setDataMahasiswa, input, setInput, currentId, setCurrentId, fetchStatus, setFetchStatus, functions} = useContext(NilaiContext)
  const {fetchData, getScore, functionSubmitCreate, functionSubmitEdit, functionDelete} = functions

  useEffect( () => {
    if (fetchStatus === false) {
      fetchData()
      setFetchStatus(true)
    }
  }, [fetchData])

  const handleEdit = (event) =>{
    let idMahasiswa = event.target.value
    axios.get(`https://backendexample.sanbercloud.com/api/student-scores/${idMahasiswa}`)
    .then(res => {
      let data = res.data
      setInput(data)
      setCurrentId(data.id)
    })
  }

  const handleDelete = (event) =>{
    let idPeserta = parseInt(event.target.value)
    functionDelete(idPeserta)
  }

  return(
    <>
      { dataMahasiswa !== null &&
        (<div style={{width: "70%", margin: "0 auto", textAlign: "center", padding: "15px"}}>
          <h1>Student Score List</h1>
          <table style={{margin:"auto"}} className="peserta-lomba">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Course</th>
                <th>Score</th>
                <th>Index</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  dataMahasiswa.map((item, index)=>{
                    return(                    
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.score}</td>
                        <td>{getScore(item.score)}</td>
                        <td>
                          <button onClick={handleEdit} value={item.id}>Edit</button>
                            &nbsp;
                          <button onClick={handleDelete} value={item.id}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>

        </div>)
      }

    </>
  )
}

export default NilaiList