
import React, { useState } from 'react'

export default function Hospital() {

    const obj = [
        {
       name: " naveen",
       age : 23,
       salary : 10000,
    },
    {
       name: " shilpa",
       age : 43,
       salary : 50000,
    },
    {
          
       name: " roohi",
       age : 13,
       salary : 40000,
    
    },
    {
          
       name: " madhuri",
       age : 23,
       salary : 60000,
    
    }
      
    ]

    const  [data, setDataList] = useState(obj);

      // for add
    const addList=(index) =>  {
        setDataList(
        [  ...data, 
            {  name: "raju", age: '10', salary : "50000"},
            //  {  name: "monu", age: '80', salary : "50000"},
        ])
        
    }

      const updateList=(index)=>{
         let obj1 = {
            name: "kajal",
            age: '14',
            salary : "70000"
        }
        data[index] = obj1
        console.log('data',)
        setDataList([...data]);
    }

    // for get
    const getList =()=>{
        return data.map((item,index)=>{
             return(
             <tr key = {index}>
                <th scope="row">{index +1}.</th>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.salary }</td>
                <td>
                  
                    <button  className="btn btn-primary ml-2"  onClick={event => addList()}>Add List</button>
                    <button className='btn btn-success' onClick={event => updateList(index)} >Update List</button>
                    <button className='btn btn-danger' onClick={event => deleteList(index)}>Delete List</button>
                </td>
                </tr>
                )
    
//                   <div key={index} className='col-sm-12'>
//                 <div className='row mt-5'>
//                     <div className='col-sm-2'>
//                         <label className=''>{item.name}</label>
// s                    </div>
//                     <div className='col-sm-2'>
//                         <label className=''>{item.age}</label>
//                     </div>
//                     <div className='col-sm-2'>
//                         <label className=''>{item.salary}</label>
//                     </div>
//                     <div className='col-sm-2'>
//                         <button  className="btn btn-primary ml-2"  onClick={event => addList()}>Add List</button>
//                     </div>
//                     <div className='col-sm-2'>
//                         <button className='btn btn-success' onClick={event => updateList(index)} >Update List</button>
//                     </div>
//                     <div className='col-sm-2'>
//                         <button className='btn btn-danger' onClick={event => deleteList(index)}>Delete List</button>
//                     </div>
//                 </div>
//             </div>

//             )
        }
        )
    }

     // for delete
    const deleteList = (index) => {
        let data1 = data.filter((item, i) => i !== index);
        setDataList(data1);
    }
  return (
  
        <div className='row'>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Salary</th>
       <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   {getList()}
  </tbody>
</table>
{/* edit ka form bnega yha  */}
            
        
    </div>
   
  )
}
