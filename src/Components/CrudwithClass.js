import React, { Component } from 'react'

export default class CrudwithClass extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      activeIndex: null,
      users: [],
      formikEdit: false,
      name: '',
      age: '',
      gender: '',
      address: '',
    }

    this.editList = this.editList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.addList = this.addList.bind(this);
    this.setForm = this.setForm.bind(this);
  }
  setForm() {
    this.setState({ formikEdit: false });
  }

  //  for add
  addList(values) {
    const user = {
      name: values.name,
      age: values.age,
      gender: values.gender,
      address: values.address,
    }
    if (edit === true) {
      // if edit is true the n we we do update operations
      const obj = this.state.users
      obj[activeIndex] = user;
      this.setState({ users: obj, edit: false })
    } else {
      // if edit is true the n we we do add operations
      const obj = [...this.state.users, user]
      this.setState({ users: obj })
    }
  }


  editList(index) {
    const user = this.state.users[index];
    this.setState({
      activeIndex: index,
      edit: true,
      name: user.name,
      age: user.age,
      address: user.address,
      gender: user.gender,
    })
  }


  deleteList(index) {
    let data1 = this.state.users.filter((item, i) => i !== index);
    this.setState({ users: data1 });
  }

  render() {
    return (
      <div className='row'>
        <h1 id="h1" className='mt-5 col-sm-12 text-center mb-5'> CLASS  DATA  OF SECOND CLASS</h1>
        <div id="fom" className='col-sm-5 ' >
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.name} />
            </label>
            <label>
              Age:
              <input type="text" value={this.state.age} />
            </label>
            <label>
              Address:
              <input type="text" value={this.state.address} />
            </label>
            <label>
              Gender:
              <input type="text" value={this.state.gender} />
            </label>
            <input type="submit" value="Submit" />
          </form>
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
                this.users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}.</th>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.gender}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn btn-primary m-3" onClick={() => this.editList(index)} >Edit</button>
                        <button className='btn btn-success' onClick={() => this.deleteList(index)} > Delete</button>
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
}
