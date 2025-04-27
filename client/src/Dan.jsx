import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { qFunction } from './features/danSlice'

const Dan = () => {
    const {title} = useSelector(state=>state.dan)
    const [dantitle,setDanTitle] = useState("")
    const dispatch = useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(dantitle)
        dispatch(qFunction(dantitle))
    }
  return (
    <div>

        <h1>this is dan title { title }</h1>

        <form action="" onSubmit={handleSubmit}> 
            <input placeholder='dan title' type="text" onChange={(e)=>setDanTitle(e.target.value)}  />
            <button type='submit' >submit </button>
        </form>

    </div>
  )
}

export default Dan