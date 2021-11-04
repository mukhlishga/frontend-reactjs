import React, { useState, createContext } from "react";
import axios from "axios"

export const NilaiContext = createContext();

export const NilaiProvider = props => {
  const [dataMahasiswa, setDataMahasiswa] =  useState([])
  const [input, setInput] =  useState({
    id: null,
    name: "",
    course: "",
    score: 0
  })
  const [currentId, setCurrentId] =  useState(null)
  const [fetchStatus, setFetchStatus] = useState(false)

  const fetchData = async () => {
    const result = await axios.get(`https://backendexample.sanbercloud.com/api/student-scores`)

    setDataMahasiswa( result.data.map( x => { 
      return {
        id: x.id, 
        name: x.name, 
        course: x.course, 
        score:x.score
      } 
    }))
  }

  const getScore = (score) => {
    if (score >= 80) {
      return "A"
    } else if (score >= 70 && score < 80) {
      return "B"
    } else if (score >= 60 && score < 70) {
      return "C"
    } else if (score >= 50 && score < 60) {
      return "D"
    } else {
      return "E"
    }
  }

  const functionSubmitCreate = () => {
    
      axios.post(`https://backendexample.sanbercloud.com/api/student-scores`, {
        name: input.name,
        course: input.course,
        score: input.score
      })
      .then(res => {
          let data = res.data
          setDataMahasiswa([...dataMahasiswa, {
            id: data.id,
            name: data.name,
            course: data.course,
            score: data.score
          }])
      })
  }

  const functionSubmitEdit = (currentId) => {
    axios.put(`https://backendexample.sanbercloud.com/api/student-scores/${currentId}`, {
        name: input.name,
        course: input.course,
        score: input.score,
      })
      .then(() => {
          let singleMahasiswa = dataMahasiswa.find(el=> el.id === currentId)
          singleMahasiswa.name= input.name
          singleMahasiswa.course= input.course
          singleMahasiswa.score= input.score
          setDataMahasiswa([...dataMahasiswa])
      })      
  }

  const functionDelete = (idPeserta) => {
    axios.delete(`https://backendexample.sanbercloud.com/api/student-scores/${idPeserta}`)
    .then(() => {
      let newDataMahasiswa = dataMahasiswa.filter(el=> {return el.id !== idPeserta})
      setDataMahasiswa(newDataMahasiswa)
    })
  }

  const functions = {
    fetchData,
    getScore,
    functionSubmitCreate,
    functionSubmitEdit,
    functionDelete
  }

  return (
    <NilaiContext.Provider value={{ 
      dataMahasiswa, 
      setDataMahasiswa, 
      input, 
      setInput, 
      currentId, 
      setCurrentId,
      fetchStatus, 
      setFetchStatus,
      functions,
    }}>
      {props.children}
    </NilaiContext.Provider>
  );
};