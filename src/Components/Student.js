import React, { useState } from 'react'
import { TextField } from './TextField';
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form, useFormikContext } from "formik";

export default function Student() {
  const [student, setstudent] = useState([])
  const [formikEdit, setFormikEdit] = useState(false)
  const [edit, setEdit] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const MyApp = () => {
    const { values, submitForm, setFieldValue } = useFormikContext();
    React.useEffect(() => {
      if (formikEdit) {
        const data = student[activeIndex];
        setFieldValue('name', data.name);
        setFieldValue('lastName', data.lastName);
        setFieldValue('marks', data.marks);

        setForm();
      }

    }, [values, submitForm, formikEdit]);


  }

  function setForm() {
    setFormikEdit(false);
  }


  //  for add
  const addList = (values) => {
    console.log("add" , values)
    const student1 = {
      name: values.name,
      lastName: values.lastName,
      marks: values.marks,

    }
    if (edit === true) {

      student[activeIndex] = student1;
      setstudent([...student])
      setEdit(false);
    } else {
      // if edit is true the n we we do add operations
      setstudent([...student, student1])
    }
  }


  const editList = (index) => {
    setActiveIndex(index)
    setEdit(true);
    setFormikEdit(true);
  }


  const deleteList = (index) => {
    let data1 = student.filter((item, i) => i !== index);
    setstudent([...data1])
  }


  const validate = Yup.object({
    name: Yup.string()
      .max(15, " Must be 15 characters or less")
      .required(" Name is required"),
    lastName: Yup.number()
      .min(3, "please enter valid no")
      .required(" required"),
    marks: Yup.string()
      .required("publisher is required"),
  })
  return (
    <div className='row'>
      <div className='col-sm-12 text-center '>CRUD</div>
      <div className='col-sm-6'>
        <Formik
          initialValues={{ name: '', lastName: '', marks: "" }}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            addList(values)
            actions.resetForm();
          }
          }
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextField label="name" name="name" type="text" />
              <TextField label="lastName" name="lastName" type="text" />
              <TextField label="marks" name="marks" type="text" />
              <button id="btn" className='btn btn-dark mb-4 ' type="submit"> {!edit ? 'Add' : 'Update'}</button>
              <MyApp />

            </Form>
          )
          }





        </Formik>
      </div>
      <div className='col-sm-6'>
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th> Name</th>
              <th> Last Name</th>
              <th> Marks </th>
            </tr>
          </thead>
          <tbody>
            {
              student.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.lastName}</td>
                    <td>{item.marks}</td>
                    <td>
                      <button className='btn btn-primary' onClick={() => editList(index)}>Edit</button>
                      <button className='btn btn-primary' onClick={() => deleteList(index)}>Delete</button>
                    </td>

                  </tr>
                )
              }
              )
            }


          </tbody>
        </table>


      </div>

    </div>
  )
}
