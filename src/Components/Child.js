import React, { useState } from 'react'
import { TextField } from './TextField';
import * as Yup from "yup";
import { Formik, Form, useFormikContext } from "formik";
export default function Child() {
  const [childs, setChilds] = useState([]);
  const [formikEdit, setFormikEdit] = useState(false)

  const [edit, setEdit] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const validate = Yup.object({

    name: Yup.string()
      .max(15, " Must be 15 characters or less")
      .required(" Name is required"),
    age: Yup.number()
      .min(3, "please enter valid no")
      .required(" required"),
    gender: Yup.string()
      .required("gender is required"),
  })
  function setForm() {
    setFormikEdit(false);
  }


  //  for add
  const addList = (values) => {
    console.log("values", values)
    const child = {
      
      name: values.name,
      age: values.age,
      gender: values.gender,
      

    }
    console.log("child",child)
    if (edit === true) {
console.log("edit",edit)
      childs[activeIndex] = child;
      console.log("childs",childs)
      console.log("child", child)
      console.log("index",activeIndex)
      setChilds([...childs])
      setEdit(false);
    } else {
      // if edit is true the n we we do add operations
      setChilds([...childs, child])
    }
  }


  const editList = (index) => {
    setActiveIndex(index)
    setEdit(true);
    setFormikEdit(true);
  }


  const deleteList = (index) => {
    let data1 = childs.filter((item, i) => i !== index);
    console.log("data1", data1)
    console.log("indxxx", index)
    console.log("....",setChilds)
    setChilds([...data1])
  }
  const MyApp = () => {
    const { values, submitForm, setFieldValue } = useFormikContext();
    React.useEffect(() => {
      if (formikEdit) {
        const data = childs[activeIndex];
        setFieldValue('name', data.name);
        setFieldValue('age', data.age);
        setFieldValue('gender', data.gender);
        setForm();
        console.log("data". data)
      }

    }, [values, submitForm, formikEdit]);
  }
  return (
    <div className='row'>
      <div className='col-sm-12 mt-4 text-center'>
        <h1> crud</h1>
      </div>
      <div className='col-6'>
        <Formik
          initialValues={{ name: '', age: '', gender: "" }}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            console.log('SUBMITTING VALUES', values);
            addList(values)
            actions.resetForm();
          }
          }
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextField label="name" name="name" type="text" />
              <TextField label="age" name="age" type="number" />
              <TextField label="gender" name="gender" type="text" />
              <button id="btn" className='btn btn-dark mb-4' type="submit"> {!edit ? 'Add' : 'Update'}</button>
              <MyApp />

            </Form>
          )}

        </Formik>
      </div>
      <div className='col-6'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>S.NO</th>
              <th> Name</th>
              <th> Age</th>
              <th> gender</th>
            </tr>
          </thead>
          <tbody>
            {
              childs.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
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
