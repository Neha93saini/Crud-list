import React, { useState } from 'react'

export default function Dashboard() {
    const object =[
        {
            name: "Himanshu",
            age: 40,
        },
        {
            name: "Neha",
            age: 22,
        },
        {
            name: "Madhuri",
            age: 55,
        },
    ]
    const [data, setDataList] = useState(object);
    
    // for add
    const addList=(index) =>  {
        setDataList(
        [ // with a new array
            ...data, // that contains all the old items
            {  name: "SumAN", age: '30'} // and one new item at the end
        ])
        
    }
    // for EDIT
    const updateList=(index)=>{
         let obj = {
            name: "SHUBMAN GILL",
            age: '34'
        }
        data[index] = obj
        console.log('data',)
        setDataList([...data]);
    }

    // FOR GET
    const getList =() => {
        console.log('data', data);
        return data.map((item, index) => {
            return (
            <div key={index} className='col-sm-12'>
                <div className='row mt-5'>
                    <div className='col-sm-2'>
                        <label className=''>{item.name}</label>
s                    </div>
                    <div className='col-sm-2'>
                        <label className=''>{item.age}</label>
                    </div>
                    <div className='col-sm-2'>
                        <button  className="btn btn-primary ml-2"  onClick={event => addList()}>Add List</button>
                    </div>
                    <div className='col-sm-2'>
                        <button className='btn btn-success' onClick={event => updateList(index)} >Update List</button>
                    </div>
                    <div className='col-sm-2'>
                        <button className='btn btn-danger' onClick={event => deleteList(index)}>Delete List</button>
                    </div>
                </div>
            </div>
            )
        })
    }

    // for delete
    const deleteList = (index) => {
        let data1 = data.filter((item, i) => i !== index);
        setDataList(data1);
    }

    return (
    <div className='row'>
        {getList()}
    </div>
    )
}