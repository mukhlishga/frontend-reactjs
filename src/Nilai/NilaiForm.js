import React, { useContext } from "react";
import { NilaiContext } from "./NilaiContext"

const NilaiForm = () => {
  const {dataMahasiswa, setDataMahasiswa, input, setInput, currentId, setCurrentId, fetchStatus, setFetchStatus, functions} = useContext(NilaiContext)
  const {fetchData, getScore, functionSubmitCreate, functionSubmitEdit, functionDelete} = functions

  const handleChange = (event) =>{
    let varValue = event.target.value
    let varName = event.target.name
    setInput({...input, [varName] : varValue})
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    if (currentId === null){
      functionSubmitCreate()
    } else {
      functionSubmitEdit(currentId)
    }
    setInput({
      id: -1,
      name: "",
      course: "",
      score: 0
    })
    setCurrentId(null)
  }

  return (
    <>
      <br/>
      <h1 style={{textAlign:"center"}}>Student Score Form</h1>
      <br/>
      <form method="post" onSubmit={handleSubmit} style={{width:"30%", border:"1px solid #aaa", margin:"auto", padding:"25px", marginBottom:"20px"}} onSubmit={handleSubmit}>
        <label>Nama: </label>          
        <input type="text" name="name" required style={{float:"right"}} value={input.name} onChange={handleChange}/> <br/>
        <label>Mata Kuliah: </label>          
        <input type="text" name="course" required style={{float:"right"}} value={input.course} onChange={handleChange}/> <br/>
        <label>Nilai: </label>          
        <input type="number" name="score" required min={0} max={100} style={{float:"right"}} value={input.score} onChange={handleChange}/> <br/>
        <input type="submit" style={{float:"right"}} value="Submit" />
      </form>
    </>
  )
}

export default NilaiForm