import React, { useEffect, useState } from 'react'
import { Formik, Field, ErrorMessage, Form, useFormikContext } from "formik";
import { TextField } from './TextField';

import * as Yup from "yup";

export default function Record() {
  const [users, setUsers] = useState([]);
  const [formikEdit, setFormikEdit] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [edit, setEdit] = useState(false);


  const validate = Yup.object({
    name: Yup.string()
      .max(15, " Must be 15 characters or less")
      .required(" Name is required"),
    email: Yup.string()
      .max(15, " Must be 15 characters or less")
      .required(" email is required"),
    salary: Yup.string()
      .max(15, " Must be 15 characters or less")
      .required(" salary is required"),

    occupation: Yup.string()
      .max(15, " Must be 15 characters or less")
      .required(" occupation is required"),
  })


  const MyApp = () => {
    const { values, submitForm, setFieldValue } = useFormikContext();
    React.useEffect(() => {
      if (formikEdit) {
        const data = users[activeIndex]
        console.log("data",data)

        setFieldValue('name', data.name);
        setFieldValue('email', data.email);
        setFieldValue('salary', data.salary);
        setFieldValue('occupation', data.occupation);
        setForm();
      }


    }, [values, submitForm, formikEdit]
    )
  }

  function setForm() {
    setFormikEdit(false)
  }

  const addList = (values) => {
    console.log("values", values)
    const user = {
      name: values.name,
      email: values.email,
      salary: values.salary,
      occupation: values.occupation,
    }
    console.log("edit",edit)
    if (edit === true) {
      users[activeIndex] = user;
      setUsers([...users]);
      setEdit(false)

    } else {
      setUsers([...users, user]);

    }
  }
  const editList = (index) => {
    const user = users[index];
    setActiveIndex(index)
    setEdit(true);
    setFormikEdit(true);
  }

  const deleteList = (index) => {
    let data1 = users.filter((item, i) => i !== index);
    console.log("data1", data1)
    setUsers([...data1])
  }


  return (
    <div className='row'>
      <div className='col-sm-12'>
        <h1> DATA</h1>

      </div>
      <div className='col-sm-6'>
        hfghjkl
        <Formik
          initialValues={{ name: "", email: "", salary: "", occupation: "" }}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            console.log("mmmmmmmmmm",values,actions)
            addList(values);
            actions.resetForm();
          }
          }

        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField label="Name" name="name" type="text" />
              <TextField label="email" name="email" type="text" />
              <TextField label="salary" name="salary" type="text" />
              <TextField label="occupation" name="occupation" type="text" />

              <button id="btn" className='btn btn-dark mb-4 ' type="submit"> {!edit ? 'Add' : 'Update'}</button>

              <MyApp />

            </form>
          )}

        </Formik>

      </div>
      <div className='col-sm-6'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th> S.NO</th>
              <th>Name</th>
              <th> Email</th>
              <th> Salary</th>
              <th> Occupation</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((item, index) => {
                console.log()
                return (
                  <tr key={index}>
                    <th>{index + 1}.</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.salary}</td>
                    <td>{item.occupation}</td>
                    <td>
                      <button className="btn btn-primary m-3" onClick={() => editList(index)} >Edit</button>
                      <button className='btn btn-success' onClick={() => deleteList(index)} > Delete</button>
                    </td>

                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
