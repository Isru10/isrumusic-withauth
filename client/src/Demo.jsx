import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { firstFunction } from './features/demoSlice'
const Demo = () => {
    const {isLoading ,error,currDemo} = useSelector((state) => state.demo )

    const dispatch  = useDispatch()
    const [demo,setDemo] = useState("")

    const handleSubmit = (e)=> {

        e.preventDefault();
        console.log(demo)
        dispatch(firstFunction(demo))
        // setDemo("")
        
    }

  return (
    <div>
        <h1>demo form </h1>
        <h3>our dynamic state {currDemo}</h3>
        <form action="" onSubmit={handleSubmit}>
                    <input type="text" onChange={(e)=>setDemo(e.target.value)} value={demo}/>
                    <button type='submit'> Submit</button>
        </form>
        
        
        </div>
  )
}

export default Demo