import React from "react"
import {NilaiProvider} from "./NilaiContext"
import NilaiList from "./NilaiList"
import NilaiForm from "./NilaiForm"

const Nilai = () =>{
  return(
    <NilaiProvider>
      <NilaiList/>
      <NilaiForm/>
    </NilaiProvider>
  )
}

export default Nilai
