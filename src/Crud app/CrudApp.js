import React, { useState } from "react"
import {useFormik} from 'formik'
import './CrudApp.scss'
const CrudApp =()=>{
    const [data,setdata]=useState([
        {name:"Html" ,edit:false},
        {name:"css",edit:false},
        {name:"javascript",edit:false}
    ])
    const form = useFormik({
        initialValues:{
            name:'',
        },
        
    })
    const show = data.map((ele,id)=>{
        return(  ele.edit ?
<div className="courses"key={id} >

<form onSubmit={()=>HandelUpdateCourse(id)}>

<input type="text" id="name" onChange={form.handleChange}  />
<button   >Update course</button>
</form>


</div>        
:   <div className="courses" key={id}>
                
                {ele.name}
                <div>

                <button onClick={()=>HandelEdit(id)}>Editcourse</button>
                <button onClick={()=>HandelDelete(ele.name)}>Deletecourse</button>
                </div>
            </div>
        ) 
    }) 
    // Add Items
const formik = useFormik({
    initialValues:{
     name:''  
    },
    onSubmit:values=>{
        setdata([...data,{name:values.name}])
    }
})
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
function HandelUpdateCourse (index){
    const all = data.map((e,id)=>{
        return(
            {...e,name:id===index ? form.values.name || e.name : e.name
                ,edit:id === index ? false : e.edit}
            ) 
    })
    setdata(all)
}
    return(
        <div className="container">

        <div className="contain">
            <p>Courses</p>
            {show}
            <form onSubmit={formik.handleSubmit}>
                <input type="text" id="name" onChange={formik.handleChange} />
                <button>Add course</button>
            </form>
        </div>
        </div>
    )
}
export default CrudApp