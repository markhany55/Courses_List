import React, { useState } from "react"
import './CrudApp.scss'
const CrudApp =()=>{
    const [data,setdata]=useState([
        {name:"Html" ,edit:false},
        {name:"css",edit:false},
        {name:"javascript",edit:false}
    ])
    const show = data.map((ele,id)=>{
return(ele.edit?
<div className="courses" >

<input type="text" defaultValue={ele.name} onChange={HandelData} />
<button onClick={()=>HandelUpdateCourse(id)} >Update course</button>
</div>        
:
<div className="courses" key={id}>
                
                {ele.name}
                <div>

                <button onClick={()=>HandelEdit(id)}>Editcourse</button>
                <button onClick={()=>HandelDelete(ele.name)}>Deletecourse</button>
                </div>
            </div>
        )
    })
    // Add Items
    const [newdata,setnewdata]=useState({})
    const HandelInput =(e)=>{
        setnewdata({...newdata,name:e.target.value})
}
const HandelAdd=(e)=>{
    e.preventDefault()
    setdata([...data,newdata])
}
// Delete Items
const HandelDelete =(name)=>{
const alldata=[...data]
const del=data.findIndex((e)=>{
    return name === e.name
})
alldata.splice(del,1)
setdata(alldata)
   }
// Edit Items
const HandelEdit= (index)=>{
    const all = data.map((e,id)=>{
        return {...e,edit:id===index ? true : false}
    })
    setdata(all)
}
const [editdata,seteditdata]=useState({})
function HandelData (e){
    seteditdata({...editdata,name:e.target.value})
}
function HandelUpdateCourse (index){
    const all = data.map((e,id)=>{
        return(
            {...e,name:id===index ? editdata.name || e.name : e.name
                ,edit:id === index ? false : e.edit}
            ) 
    })
    setdata(all)
}
console.log(data)
    return(
        <div className="container">

        <div className="contain">
            <p>Courses</p>
            {show}
            <form onSubmit={HandelAdd}>
                <input type="text" id="name" onChange={HandelInput}/>
                <button>Add course</button>
            </form>
        </div>
        </div>
    )
}
export default CrudApp