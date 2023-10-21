import React, { useEffect, useState } from 'react'
import { Formik, Field, ErrorMessage, Form, useFormikContext } from "formik";
import { TextField } from './TextField';

import * as Yup from "yup";

export default function SchoolRecord() {
  const [edit, setEdit] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [users, setUsers] = useState([]);
  const [formikEdit, setFormikEdit] = useState(false);

  const validate = Yup.object({
    name: Yup.string()
      .max(15, " Must be 15 characters or less")
      .required(" Name is required"),
    age: Yup.number()
      .min(2, "please enter valid age")
      .required("Age is required"),
    gender: Yup.string()
      .required("Gender is required"),
    address: Yup.string()

      .max(30, " Must be 30 characters or less")
      .required(" Address is required"),

  })
  // This function is used for get all the formik values and function which is used in formik form.
  const MyApp = () => {
    const { values, submitForm, setFieldValue } = useFormikContext();
    React.useEffect(() => {
      if (formikEdit) {
        const data = users[activeIndex];
        setFieldValue('name', data.name);
        setFieldValue('age', data.age);
        setFieldValue('gender', data.gender);
        setFieldValue('address', data.address);
        setForm();
      }
    }, [values, submitForm, formikEdit]);// these values is changed than use effect is called
  }
  function setForm() {
    setFormikEdit(false);
  }

  //  for add
  const addList = (values) => {
    const user = {
      name: values.name,
      age: values.age,
      gender: values.gender,
      address: values.address,
    }
    if (edit === true) {
      // if edit is true the n we we do update operations
      users[activeIndex] = user;
      setUsers([...users])
      setEdit(false);
    } else {
      // if edit is true the n we we do add operations
      setUsers([...users, user])
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
    setUsers([...data1])
  }



  return (
    <div className='row'>
      <h1 id="h1" className='mt-5 col-sm-12 text-center mb-5'> CLASS  DATA  OF SECOND CLASS</h1>
      <div id="fom" className='col-sm-5 ' >
        dfghjkl
        <Formik
          initialValues={{ name: "", age: "", gender: "", address: "" }}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            console.log('SUBMITTING VALUES', values);
            addList(values);
            actions.resetForm();
          }}
        >
          {/* // handleSubmit is predefined formik form function which is called on submit function  */}
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextField label="Name" name="name" type="text" />
              <TextField label="Age" name="age" type="text" />
              <TextField label="Gender" name="gender" type="text" />
              <TextField label="Address" name="address" type="text" />
              {/* is edit condition is used for showing add or update string value */}
              <button id="btn" className='btn btn-dark mb-4 ' type="submit"> {!edit ? 'Add' : 'Update'}</button>
              {/* we use my in formik form */}
              <MyApp />
            </Form>
          )}
        </Formik>
      </div>
      <div className='col-sm-7'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>NAME</th>
              <th>AGE</th>
              <th>GENDER</th>
              <th>ADDRESS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className='mt-5'>
            {
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}.</th>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
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
