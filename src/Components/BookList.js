import React, { useState } from 'react'
import { TextField } from './TextField';
import { Formik, Field, ErrorMessage, Form, useFormikContext } from "formik";
import * as Yup from "yup";

export default function BookList() {
  const [books, setBooks] = useState([])
  const [edit, setEdit] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const [formikEdit, setFormikEdit] = useState(false);


  const validate = Yup.object({
    name: Yup.string()
      .max(15, " Must be 15 characters or less")
      .required(" Name is required"),
    noOfBooks: Yup.number()
      .min(3, "please enter valid no")
      .required(" required"),
    publisher: Yup.string()
      .required("publisher is required"),
  })

  const MyApp = () => {
    const { values, submitForm, setFieldValue } = useFormikContext();
    console.log("vvvv", values)
    React.useEffect(() => {
      if (formikEdit) {
        const data = books[activeIndex];
        setFieldValue('name', data.name);
        setFieldValue('noOfBooks', data.noOfBooks);
        setFieldValue('publisher', data.publisher);

        setForm();
      }
    }, [values, submitForm, formikEdit]);
  }
  function setForm() {
    setFormikEdit(false);
  }


  //  for add
  const addList = (values) => {
    const book = {
      name: values.name,
      noOfBooks: values.noOfBooks,
      publisher: values.publisher,

    }
    if (edit === true) {

      books[activeIndex] = book;
      setBooks([...books])
      setEdit(false);
    } else {
      // if edit is true the n we we do add operations
      setBooks([...books, book])
    }
  }
  const editList = (index) => {
    const book = books[index];
    setActiveIndex(index)
    setEdit(true);
    setFormikEdit(true);
  }
  const deleteList = (index) => {
    let data1 = books.filter((item, i) => i !== index);
    setBooks([...data1])
  }
  return (
    <div className='row'>
      <div className='col-sm-12 mt-5 text-center'><h1> BOOK LIST </h1></div>
      <div className='col-sm-6'>
        <Formik

          initialValues={{ name: "", noOfBooks: "", publisher: "" }}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            addList(values)
            actions.resetForm();
          }}  >

          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextField label="Name" name="name" type="text" />
              <TextField label="noOfBooks" name="noOfBooks" type="number" />
              <TextField label="publisher" name="publisher" type="text" />
              <button id="btn" className='btn btn-dark mb-4 ' type="submit"> {!edit ? 'Add' : 'Update'}</button>
              <MyApp />
            </Form>
          )}
        </Formik>
      </div>
      <div className='col-sm-6'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th> S.No</th>
              <th> Name</th>
              <th> no of books</th>
              <th> publisher</th>
            </tr>
          </thead>
          <tbody>
            {
              books.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{item.name}</td>
                  <td>{item.noOfBooks}</td>
                  <td>{item.publisher}</td>
                  <td>
                    <button className='btn btn-primary m-3' onClick={() => editList(index)}> Edit</button>
                    <button className='btn btn-primary m-3' onClick={() => deleteList(index)}> Delete</button>
                  </td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
